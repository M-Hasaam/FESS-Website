import type { CompetitionName } from '../data/fessData';
import type { RegistrationRecord } from './fessLogic';

export interface ContactApiPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ContactApiResponse {
  ok: boolean;
  id?: string | null;
  error?: string;
  errors?: Record<string, string>;
  code?: string;
}

export interface RegistrationApiPayload {
  event: CompetitionName;
  fullName: string;
  phone: string;
  entityName?: string;
}

export interface RegistrationApiResponse {
  ok: boolean;
  record?: RegistrationRecord;
  emailNotified?: boolean;
  error?: string;
  errors?: Record<string, string>;
}

export async function sendContactMessage(
  payload: ContactApiPayload
): Promise<ContactApiResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as Partial<ContactApiResponse>;
  return {
    ok: response.ok && Boolean(data.ok),
    id: data.id ?? null,
    error: data.error,
    errors: data.errors,
    code: data.code,
  };
}

export async function fetchRegistrations(): Promise<RegistrationRecord[]> {
  const response = await fetch('/api/registrations', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) return [];
  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    records?: RegistrationRecord[];
  };
  return data.ok && Array.isArray(data.records) ? data.records : [];
}

export async function submitRegistration(
  payload: RegistrationApiPayload
): Promise<RegistrationApiResponse> {
  const response = await fetch('/api/registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as Partial<RegistrationApiResponse>;
  return {
    ok: response.ok && Boolean(data.ok),
    record: data.record,
    emailNotified: data.emailNotified,
    error: data.error,
    errors: data.errors,
  };
}

/**
 * Helper for calling any server-configured upstream API without exposing API keys
 * in browser bundles. Register services on the backend in server.ts.
 */
export async function callBackendService<TResponse = unknown>(
  service: 'external',
  endpointPath: string,
  options: { method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; body?: unknown } = {}
): Promise<TResponse> {
  const cleanPath = endpointPath.replace(/^\/+/, '');
  const url = cleanPath ? `/api/proxy/${service}/${cleanPath}` : `/api/proxy/${service}`;
  const method = options.method ?? 'GET';

  const response = await fetch(url, {
    method,
    headers: options.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof (data as { error?: string }).error === 'string'
        ? (data as { error: string }).error
        : `Backend call failed (${response.status})`;
    throw new Error(message);
  }
  return data as TResponse;
}
