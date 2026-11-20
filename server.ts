import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';
import { validateAndFormatContactEmail } from './src/utils/contactEmail.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLACEHOLDER_KEYS = new Set(['', 'MY_RESEND_API_KEY']);

function getResendConfig() {
  const apiKey = (process.env.RESEND_API_KEY ?? '').trim();
  const configured = Boolean(apiKey) && !PLACEHOLDER_KEYS.has(apiKey);
  const from =
    (process.env.RESEND_FROM_EMAIL ?? '').trim() ||
    'FESS Contact Desk <onboarding@resend.dev>';
  const to =
    (process.env.RESEND_TO_EMAIL ?? '').trim() || 'salmanahmed32121@gmail.com';

  return { apiKey, configured, from, to };
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));

  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).json({ error: 'Invalid JSON request body.' });
      return;
    }
    next(err);
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    const { configured } = getResendConfig();
    res.json({ ok: true, resendConfigured: configured });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
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
    if (!configured) {
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
        console.error('[POST /api/contact] Resend API rejected request:', error.name, error.message);
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
      console.error('[POST /api/contact] Unexpected server error:', err);
      res.status(500).json({
        code: 'CONTACT_SEND_ERROR',
        error: 'Unable to send your message right now. Please try again shortly.',
      });
    }
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
    console.log(`FESS server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start FESS server:', err);
  process.exit(1);
});
