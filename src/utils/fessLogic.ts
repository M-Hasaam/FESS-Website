import {
  COMPETITIONS,
  type CompetitionName,
  type DayFilter,
  type PageId,
  type ScheduleItem,
} from '../data/fessData';

export interface RegistrationFormInput {
  event: CompetitionName;
  fullName: string;
  phone: string;
  entityName?: string;
}

export interface RegistrationRecord {
  id: string;
  event: CompetitionName;
  fullName: string;
  phone: string;
  entityName: string;
  feeLabel: string;
  timing: string;
  createdAt: string;
}

export interface ConnectFormInput {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const VALID_PAGES: PageId[] = ['home', 'events', 'teams', 'connect'];

export function parsePageFromHash(hash: string): PageId {
  const cleaned = hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (VALID_PAGES.includes(cleaned as PageId)) {
    return cleaned as PageId;
  }
  return 'home';
}

export function filterScheduleByDay(items: ScheduleItem[], filter: DayFilter): ScheduleItem[] {
  if (filter === 'all') {
    return items;
  }
  return items.filter((item) => item.day === filter);
}

export function formatCurrencyPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-US')}`;
}

export function getCompetitionMeta(eventName: CompetitionName) {
  return COMPETITIONS.find((c) => c.id === eventName) ?? COMPETITIONS[1];
}

export function validateRegistrationForm(input: RegistrationFormInput): ValidationResult {
  const errors: Record<string, string> = {};
  const trimmedName = input.fullName.trim();
  const digitsOnly = input.phone.replace(/\D/g, '');

  if (trimmedName.length < 2) {
    errors.fullName = 'Please enter a valid full name (at least 2 characters).';
  }

  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    errors.phone = 'Please enter a valid contact number (10–15 digits, e.g. 0300-1234567).';
  }

  const validEvent = COMPETITIONS.some((c) => c.id === input.event);
  if (!validEvent) {
    errors.event = 'Please select a valid FESS competition.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createRegistrationRecord(
  input: RegistrationFormInput,
  existingCount: number,
  now = new Date()
): RegistrationRecord {
  const meta = getCompetitionMeta(input.event);
  const codeMap: Record<CompetitionName, string> = {
    'Enterprise Expo': 'EE',
    'Pitch Arena': 'PA',
    'Sell Me This Pen': 'SP',
  };
  const sequence = String(existingCount + 1).padStart(3, '0');
  const id = `FESS-${codeMap[input.event]}-${sequence}`;

  return {
    id,
    event: input.event,
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    entityName: input.entityName?.trim() || 'Individual Participant',
    feeLabel: meta.feeLabel,
    timing: meta.timing,
    createdAt: now.toISOString(),
  };
}

export function validateConnectForm(input: ConnectFormInput): ValidationResult {
  const errors: Record<string, string> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMsg = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (trimmedMsg.length < 5) {
    errors.message = 'Please enter a short message (at least 5 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
