export type ServerCompetitionName =
  | 'Enterprise Expo'
  | 'Pitch Arena'
  | 'Sell Me This Pen';

export interface ServerRegistrationInput {
  event: unknown;
  fullName: unknown;
  phone: unknown;
  entityName?: unknown;
}

export interface ValidatedRegistration {
  event: ServerCompetitionName;
  fullName: string;
  phone: string;
  entityName: string;
  feeLabel: string;
  timing: string;
  codePrefix: string;
}

const COMPETITION_META: Record<
  ServerCompetitionName,
  { feeLabel: string; timing: string; codePrefix: string }
> = {
  'Enterprise Expo': {
    feeLabel: 'PKR 8,000 per stall',
    timing: '10:30 AM – 10:00 PM',
    codePrefix: 'EE',
  },
  'Pitch Arena': {
    feeLabel: 'PKR 3,000',
    timing: 'Day 1 | 2:00 PM – 4:00 PM',
    codePrefix: 'PA',
  },
  'Sell Me This Pen': {
    feeLabel: 'PKR 2,500',
    timing: 'Day 2 | 3:00 PM – 5:00 PM',
    codePrefix: 'SP',
  },
};

export function validateRegistrationPayload(
  input: ServerRegistrationInput
):
  | { ok: true; data: ValidatedRegistration }
  | { ok: false; message: string; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const eventRaw = typeof input.event === 'string' ? input.event.trim() : '';
  const fullNameRaw =
    typeof input.fullName === 'string'
      ? input.fullName.replace(/[\r\n\0]/g, ' ').trim()
      : '';
  const phoneRaw =
    typeof input.phone === 'string'
      ? input.phone.replace(/[\r\n\0]/g, '').trim()
      : '';
  const entityRaw =
    typeof input.entityName === 'string'
      ? input.entityName.replace(/[\r\n\0]/g, ' ').trim()
      : '';

  if (!(eventRaw in COMPETITION_META)) {
    errors.event = 'Please select a valid FESS competition.';
  }

  if (fullNameRaw.length < 2 || fullNameRaw.length > 100) {
    errors.fullName = 'Please enter a valid full name (2–100 characters).';
  }

  const digitsOnly = phoneRaw.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    errors.phone =
      'Please enter a valid contact number (10–15 digits, e.g. 0300-1234567).';
  }

  if (entityRaw.length > 120) {
    errors.entityName = 'Business / Team name must be 120 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      message: Object.values(errors)[0],
    };
  }

  const event = eventRaw as ServerCompetitionName;
  const meta = COMPETITION_META[event];

  return {
    ok: true,
    data: {
      event,
      fullName: fullNameRaw,
      phone: phoneRaw,
      entityName: entityRaw || 'Individual Participant',
      feeLabel: meta.feeLabel,
      timing: meta.timing,
      codePrefix: meta.codePrefix,
    },
  };
}

export interface UpstreamServiceConfig {
  baseUrl: string;
  apiKey: string;
  authHeader?: string;
}

export function resolveAllowedUpstreamUrl(
  serviceName: string,
  subPath: string,
  registry: Record<string, UpstreamServiceConfig | undefined>
):
  | { ok: true; url: string; config: UpstreamServiceConfig }
  | { ok: false; status: number; code: string; error: string } {
  const normalizedService = serviceName.trim().toLowerCase();
  if (!/^[a-z0-9_-]{2,40}$/.test(normalizedService)) {
    return {
      ok: false,
      status: 400,
      code: 'INVALID_SERVICE_NAME',
      error: 'Invalid service identifier.',
    };
  }

  const config = registry[normalizedService];
  if (!config) {
    return {
      ok: false,
      status: 404,
      code: 'UNKNOWN_SERVICE',
      error: `Backend service '${normalizedService}' is not registered.`,
    };
  }

  if (!config.baseUrl || !config.apiKey) {
    return {
      ok: false,
      status: 503,
      code: 'SERVICE_NOT_CONFIGURED',
      error: `Backend credentials for '${normalizedService}' are not configured on the server.`,
    };
  }

  let parsedBase: URL;
  try {
    parsedBase = new URL(config.baseUrl);
  } catch {
    return {
      ok: false,
      status: 500,
      code: 'INVALID_UPSTREAM_CONFIG',
      error: 'Server upstream base URL configuration is invalid.',
    };
  }

  if (parsedBase.protocol !== 'https:' && parsedBase.hostname !== 'localhost') {
    return {
      ok: false,
      status: 500,
      code: 'INSECURE_UPSTREAM_CONFIG',
      error: 'Upstream service URL must use HTTPS.',
    };
  }

  const cleanedSubPath = subPath.replace(/^\/+/, '');
  if (
    cleanedSubPath.includes('..') ||
    cleanedSubPath.includes('://') ||
    cleanedSubPath.startsWith('//') ||
    /[\r\n\0]/.test(cleanedSubPath)
  ) {
    return {
      ok: false,
      status: 400,
      code: 'INVALID_UPSTREAM_PATH',
      error: 'Invalid upstream endpoint path.',
    };
  }

  const normalizedBase = parsedBase.toString().replace(/\/+$/, '');
  const targetUrl = cleanedSubPath
    ? `${normalizedBase}/${cleanedSubPath}`
    : normalizedBase;

  const parsedTarget = new URL(targetUrl);
  if (parsedTarget.origin !== parsedBase.origin) {
    return {
      ok: false,
      status: 400,
      code: 'ORIGIN_MISMATCH',
      error: 'Upstream path cannot escape the configured service origin.',
    };
  }

  return {
    ok: true,
    url: parsedTarget.toString(),
    config,
  };
}
