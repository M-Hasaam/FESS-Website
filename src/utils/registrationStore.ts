import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { ValidatedRegistration } from './backendSecurity.ts';

export interface StoredRegistrationRecord {
  id: string;
  event: ValidatedRegistration['event'];
  fullName: string;
  phone: string;
  entityName: string;
  feeLabel: string;
  timing: string;
  createdAt: string;
}

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'registrations.json');

export async function readStoredRegistrations(): Promise<StoredRegistrationRecord[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredRegistrationRecord[]) : [];
  } catch {
    return [];
  }
}

export async function appendStoredRegistration(
  validated: ValidatedRegistration
): Promise<StoredRegistrationRecord> {
  await mkdir(DATA_DIR, { recursive: true });
  const existing = await readStoredRegistrations();
  const sequence = String(existing.length + 1).padStart(3, '0');
  const record: StoredRegistrationRecord = {
    id: `FESS-${validated.codePrefix}-${sequence}`,
    event: validated.event,
    fullName: validated.fullName,
    phone: validated.phone,
    entityName: validated.entityName,
    feeLabel: validated.feeLabel,
    timing: validated.timing,
    createdAt: new Date().toISOString(),
  };

  const updated = [record, ...existing];
  const tempFile = `${DATA_FILE}.tmp`;
  await writeFile(tempFile, JSON.stringify(updated, null, 2), 'utf8');
  await rename(tempFile, DATA_FILE);
  return record;
}
