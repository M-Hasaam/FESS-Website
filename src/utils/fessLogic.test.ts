import test from 'node:test';
import assert from 'node:assert/strict';
import { SCHEDULE_ITEMS } from '../data/fessData';
import {
  createRegistrationRecord,
  filterScheduleByDay,
  formatCurrencyPKR,
  parsePageFromHash,
  validateConnectForm,
  validateRegistrationForm,
} from './fessLogic';

test('parsePageFromHash resolves valid routes and falls back to home', () => {
  assert.equal(parsePageFromHash('#events'), 'events');
  assert.equal(parsePageFromHash('#/teams'), 'teams');
  assert.equal(parsePageFromHash('#connect'), 'connect');
  assert.equal(parsePageFromHash(''), 'home');
  assert.equal(parsePageFromHash('#unknown'), 'home');
});

test('filterScheduleByDay returns full list or specific day items accurately', () => {
  const all = filterScheduleByDay(SCHEDULE_ITEMS, 'all');
  const day1 = filterScheduleByDay(SCHEDULE_ITEMS, '1');
  const day2 = filterScheduleByDay(SCHEDULE_ITEMS, '2');

  assert.equal(all.length, 6);
  assert.equal(day1.length, 3);
  assert.equal(day2.length, 3);
  assert.ok(day1.every((item) => item.day === '1'));
  assert.ok(day2.every((item) => item.day === '2'));
  assert.equal(day1[1].title, 'Pitch Arena');
  assert.equal(day2[1].title, 'Sell Me This Pen');
});

test('formatCurrencyPKR formats amounts with commas', () => {
  assert.equal(formatCurrencyPKR(8000), 'PKR 8,000');
  assert.equal(formatCurrencyPKR(15000), 'PKR 15,000');
});

test('validateRegistrationForm rejects empty names and invalid phone numbers', () => {
  const invalid = validateRegistrationForm({
    event: 'Pitch Arena',
    fullName: ' ',
    phone: '123',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);

  const valid = validateRegistrationForm({
    event: 'Enterprise Expo',
    fullName: 'Zainab Khan',
    phone: '0300-1234567',
    entityName: 'Glow Craft',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('createRegistrationRecord builds deterministic receipt ID and preserves competition metadata', () => {
  const rec = createRegistrationRecord(
    {
      event: 'Pitch Arena',
      fullName: 'Zainab Khan',
      phone: '0300-1234567',
      entityName: 'NovaLabs',
    },
    2,
    new Date('2026-11-20T12:00:00Z')
  );

  assert.equal(rec.id, 'FESS-PA-003');
  assert.equal(rec.feeLabel, 'PKR 3,000');
  assert.equal(rec.timing, 'Day 1 | 2:00 PM – 4:00 PM');
  assert.equal(rec.entityName, 'NovaLabs');
});

test('validateConnectForm validates email, name, and message length', () => {
  const bad = validateConnectForm({
    name: 'A',
    email: 'not-an-email',
    topic: 'General FESS Society Inquiry',
    message: 'Hi',
  });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.name);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.message);

  const good = validateConnectForm({
    name: 'Ali Raza',
    email: 'ali@fast.edu.pk',
    topic: 'Pitch Arena Inquiry (PKR 3,000)',
    message: 'Can our 3-member team bring a hardware prototype?',
  });
  assert.equal(good.valid, true);
});
