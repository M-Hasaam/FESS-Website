import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';
import {
  resolveAllowedUpstreamUrl,
  validateRegistrationPayload,
  type UpstreamServiceConfig,
} from './src/utils/backendSecurity.ts';
import { escapeHtml, validateAndFormatContactEmail } from './src/utils/contactEmail.ts';
import { SlidingWindowRateLimiter } from './src/utils/rateLimiter.ts';
import {
  appendStoredRegistration,
  readStoredRegistrations,
} from './src/utils/registrationStore.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLACEHOLDER_KEYS = new Set([
  '',
  'MY_RESEND_API_KEY',
  'MY_EXTERNAL_API_KEY',
  'MY_GEMINI_API_KEY',
]);

function isValidSecret(value: string | undefined): string | null {
  const trimmed = (value ?? '').trim();
  if (!trimmed || PLACEHOLDER_KEYS.has(trimmed)) {
    return null;
  }
  return trimmed;
}

function getResendConfig() {
  const apiKey = isValidSecret(process.env.RESEND_API_KEY);
  const from =
    (process.env.RESEND_FROM_EMAIL ?? '').trim() ||
    'FESS Contact Desk <onboarding@resend.dev>';
  const to =
    (process.env.RESEND_TO_EMAIL ?? '').trim() || 'salmanahmed32121@gmail.com';

  return { apiKey, configured: Boolean(apiKey), from, to };
}

function getUpstreamRegistry(): Record<string, UpstreamServiceConfig | undefined> {
  const extBase = (process.env.EXTERNAL_API_BASE_URL ?? '').trim();
  const extKey = isValidSecret(process.env.EXTERNAL_API_KEY) ?? '';

  return {
    external:
      extBase && extBase !== 'https://api.example.com'
        ? {
            baseUrl: extBase,
            apiKey: extKey,
            authHeader: 'Authorization',
          }
        : extBase === 'https://api.example.com' && extKey
          ? {
              baseUrl: extBase,
              apiKey: extKey,
              authHeader: 'Authorization',
            }
          : undefined,
  };
}

const writeRateLimiter = new SlidingWindowRateLimiter(25, 60_000);

function enforceRateLimit(req: Request, res: Response, next: NextFunction) {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const decision = writeRateLimiter.check(clientIp);
  res.setHeader('X-RateLimit-Remaining', String(decision.remaining));
  if (!decision.allowed) {
    res.setHeader('Retry-After', String(decision.retryAfterSeconds));
    res.status(429).json({
      code: 'RATE_LIMITED',
      error: `Too many requests. Please wait ${decision.retryAfterSeconds}s before trying again.`,
    });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use('/api', (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).json({ error: 'Invalid JSON request body.' });
      return;
    }
    next(err);
  });

  // Health & service readiness (boolean flags only, never exposes secrets or URLs)
  app.get('/api/health', (_req: Request, res: Response) => {
    const { configured: resendConfigured } = getResendConfig();
    const registry = getUpstreamRegistry();
    const externalConfigured = Boolean(
      registry.external?.baseUrl && registry.external?.apiKey
    );

    res.json({
      ok: true,
      resendConfigured,
      services: {
        resend: resendConfigured,
        external: externalConfigured,
      },
    });
  });

  // 1. Resend Contact Desk Route (server-side RESEND_API_KEY)
  app.post('/api/contact', enforceRateLimit, async (req: Request, res: Response) => {
    const body =
      typeof req.body === 'object' && req.body !== null
        ? (req.body as Record<string, unknown>)
        : {};

    const validation = validateAndFormatContactEmail({
      name: body.name,
      email: body.email,
      topic: body.topic,
      message: body.message,
    });

    if (!validation.ok) {
      res.status(400).json({
        error: validation.message,
        errors: validation.errors,
      });
      return;
    }

    const { apiKey, configured, from, to } = getResendConfig();
    if (!configured || !apiKey) {
      res.status(503).json({
        code: 'RESEND_NOT_CONFIGURED',
        error:
          'Resend email service is not configured yet. Add RESEND_API_KEY in Settings -> Secrets to enable sending messages.',
      });
      return;
    }

    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: validation.data.email,
        subject: validation.data.subject,
        html: validation.data.html,
        text: validation.data.text,
      });

      if (error) {
        console.error('[POST /api/contact] Resend API error:', error.name, error.message);
        res.status(502).json({
          code: 'RESEND_DELIVERY_FAILED',
          error: error.message || 'Resend rejected the email delivery request.',
        });
        return;
      }

      res.status(200).json({
        ok: true,
        id: data?.id ?? null,
      });
    } catch (err) {
      console.error('[POST /api/contact] Unexpected error:', err);
      res.status(500).json({
        code: 'CONTACT_SEND_ERROR',
        error: 'Unable to send your message right now. Please try again shortly.',
      });
    }
  });

  // 2. Flagship Event Registrations API (persisted on server)
  app.get('/api/registrations', async (_req: Request, res: Response) => {
    const records = await readStoredRegistrations();
    res.json({ ok: true, records });
  });

  app.post(
    '/api/registrations',
    enforceRateLimit,
    async (req: Request, res: Response) => {
      const body =
        typeof req.body === 'object' && req.body !== null
          ? (req.body as Record<string, unknown>)
          : {};

      const validation = validateRegistrationPayload({
        event: body.event,
        fullName: body.fullName,
        phone: body.phone,
        entityName: body.entityName,
      });

      if (!validation.ok) {
        res.status(400).json({
          error: validation.message,
          errors: validation.errors,
        });
        return;
      }

      try {
        const record = await appendStoredRegistration(validation.data);
        let emailNotified = false;

        // Best-effort notification to organizer inbox when Resend is configured
        const { apiKey, configured, from, to } = getResendConfig();
        if (configured && apiKey) {
          try {
            const resend = new Resend(apiKey);
            const { error } = await resend.emails.send({
              from,
              to: [to],
              subject: `[FESS Pass ${record.id}] ${record.event} — ${record.fullName}`,
              html: `<p><strong>Pass ID:</strong> ${escapeHtml(record.id)}</p>
<p><strong>Event:</strong> ${escapeHtml(record.event)} (${escapeHtml(record.feeLabel)})</p>
<p><strong>Lead:</strong> ${escapeHtml(record.fullName)}</p>
<p><strong>Team / Business:</strong> ${escapeHtml(record.entityName)}</p>
<p><strong>Phone:</strong> ${escapeHtml(record.phone)}</p>`,
              text: `Pass ID: ${record.id}\nEvent: ${record.event} (${record.feeLabel})\nLead: ${record.fullName}\nTeam / Business: ${record.entityName}\nPhone: ${record.phone}`,
            });
            emailNotified = !error;
          } catch {
            emailNotified = false;
          }
        }

        res.status(201).json({
          ok: true,
          record,
          emailNotified,
        });
      } catch (err) {
        console.error('[POST /api/registrations] Failed to save registration:', err);
        res.status(500).json({
          code: 'REGISTRATION_SAVE_ERROR',
          error: 'Could not save your registration right now. Please try again.',
        });
      }
    }
  );

  // 3. Generic Allowlisted Server-Side API Proxy (/api/proxy/:service/*)
  // Keeps upstream URLs and Bearer API keys strictly on the server.
  app.all('/api/proxy/:service', enforceRateLimit, handleUpstreamProxy);
  app.all('/api/proxy/:service/*', enforceRateLimit, handleUpstreamProxy);

  async function handleUpstreamProxy(req: Request, res: Response) {
    const service = String(req.params.service ?? '');
    const wildcardParam = (req.params as Record<string, string | undefined>)['0'] ?? '';
    const registry = getUpstreamRegistry();

    const resolved = resolveAllowedUpstreamUrl(service, wildcardParam, registry);
    if (!resolved.ok) {
      res.status(resolved.status).json({
        code: resolved.code,
        error: resolved.error,
      });
      return;
    }

    const allowedMethods = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
    if (!allowedMethods.has(req.method.toUpperCase())) {
      res.status(405).json({ error: 'Method not allowed on backend proxy.' });
      return;
    }

    try {
      const headers: Record<string, string> = {
        Accept: 'application/json',
        [resolved.config.authHeader || 'Authorization']: `Bearer ${resolved.config.apiKey}`,
      };

      const hasBody = !['GET', 'HEAD'].includes(req.method.toUpperCase());
      if (hasBody) {
        headers['Content-Type'] = 'application/json';
      }

      const upstreamRes = await fetch(resolved.url, {
        method: req.method,
        headers,
        body: hasBody ? JSON.stringify(req.body ?? {}) : undefined,
        signal: AbortSignal.timeout(10_000),
      });

      const contentType = upstreamRes.headers.get('content-type') ?? 'application/json';
      const rawText = await upstreamRes.text();

      res.status(upstreamRes.status);
      if (contentType.includes('application/json')) {
        try {
          res.json(JSON.parse(rawText));
          return;
        } catch {
          // Fallback to safe text response
        }
      }
      res.type('text/plain').send(rawText);
    } catch (err) {
      console.error('[Proxy Error]', err);
      res.status(502).json({
        code: 'UPSTREAM_PROXY_ERROR',
        error: 'Upstream service did not respond in time.',
      });
    }
  }

  // Ensure unknown /api/* paths return clean JSON rather than SPA index.html
  app.all('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({ code: 'API_NOT_FOUND', error: 'API endpoint not found.' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`FESS backend server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start FESS server:', err);
  process.exit(1);
});
