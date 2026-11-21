import { sanitizeHeaderValue, type ContactEmailPayload } from './contactEmail';

export interface EmailJsEnvInput {
  VITE_EMAILJS_SERVICE_ID?: string;
  VITE_EMAILJS_TEMPLATE_ID?: string;
  VITE_EMAILJS_PUBLIC_KEY?: string;
  VITE_CONTACT_TO_EMAIL?: string;
}

export interface ResolvedEmailJsConfig {
  configured: boolean;
  missingFields: string[];
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PLACEHOLDER_TOKENS = new Set([
  'your_service_id',
  'your_template_id',
  'your_public_key',
  'your_contact_email@example.com',
  'email',
  'my_emailjs_service_id',
  'my_emailjs_template_id',
  'my_emailjs_public_key',
  'my_contact_to_email',
]);

export function isConfiguredEmailJsValue(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/[\r\n\0]/.test(trimmed)) return false;

  const lower = trimmed.toLowerCase();
  if (PLACEHOLDER_TOKENS.has(lower)) return false;
  if (lower.startsWith('your_') || lower.startsWith('my_emailjs_') || lower.startsWith('my_contact_')) {
    return false;
  }
  return true;
}

export function resolveEmailJsConfig(env: EmailJsEnvInput): ResolvedEmailJsConfig {
  const serviceId = isConfiguredEmailJsValue(env.VITE_EMAILJS_SERVICE_ID)
    ? env.VITE_EMAILJS_SERVICE_ID.trim()
    : '';
  const templateId = isConfiguredEmailJsValue(env.VITE_EMAILJS_TEMPLATE_ID)
    ? env.VITE_EMAILJS_TEMPLATE_ID.trim()
    : '';
  const publicKey = isConfiguredEmailJsValue(env.VITE_EMAILJS_PUBLIC_KEY)
    ? env.VITE_EMAILJS_PUBLIC_KEY.trim()
    : '';

  const rawToEmail = isConfiguredEmailJsValue(env.VITE_CONTACT_TO_EMAIL)
    ? sanitizeHeaderValue(env.VITE_CONTACT_TO_EMAIL)
    : '';
  const toEmail = EMAIL_REGEX.test(rawToEmail) && rawToEmail.length <= 254 ? rawToEmail : '';

  const missingFields: string[] = [];
  if (!serviceId) missingFields.push('VITE_EMAILJS_SERVICE_ID');
  if (!templateId) missingFields.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!publicKey) missingFields.push('VITE_EMAILJS_PUBLIC_KEY');
  if (!toEmail) missingFields.push('VITE_CONTACT_TO_EMAIL');

  return {
    configured: missingFields.length === 0,
    missingFields,
    serviceId,
    templateId,
    publicKey,
    toEmail,
  };
}

export function buildEmailJsTemplateParams(
  validated: ContactEmailPayload,
  toEmail: string
): Record<string, string> {
  const cleanRecipient = sanitizeHeaderValue(toEmail);

  return {
    to_email: cleanRecipient,
    from_name: validated.name,
    name: validated.name,
    from_email: validated.email,
    email: validated.email,
    reply_to: validated.email,
    topic: validated.topic,
    subject: validated.subject,
    message: validated.message,
  };
}
