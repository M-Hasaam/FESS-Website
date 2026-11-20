import test from 'node:test';
import assert from 'node:assert/strict';
import { SCHEDULE_ITEMS } from '../data/fessData';
import {
  createRegistrationRecord,
  filterScheduleByDay,
  formatCurrencyPKR,
  getTeamIdFromPage,
  parsePageFromHash,
  validateConnectForm,
  validateRegistrationForm,
} from './fessLogic';
import {
  escapeHtml,
  sanitizeHeaderValue,
  validateAndFormatContactEmail,
} from './contactEmail';
import {
  resolveAllowedUpstreamUrl,
  validateRegistrationPayload,
} from './backendSecurity';
import { SlidingWindowRateLimiter } from './rateLimiter';

test('parsePageFromHash resolves valid routes including team detail pages and falls back to home', () => {
  assert.equal(parsePageFromHash('#events'), 'events');
  assert.equal(parsePageFromHash('#/teams'), 'teams');
  assert.equal(parsePageFromHash('#teams/executive'), 'teams/executive');
  assert.equal(parsePageFromHash('#/teams/tech/'), 'teams/tech');
  assert.equal(parsePageFromHash('#connect'), 'connect');
  assert.equal(parsePageFromHash(''), 'home');
  assert.equal(parsePageFromHash('#unknown'), 'home');

  assert.equal(getTeamIdFromPage('teams/executive'), 'executive');
  assert.equal(getTeamIdFromPage('teams/tech'), 'tech');
  assert.equal(getTeamIdFromPage('teams'), null);
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

test('escapeHtml and sanitizeHeaderValue neutralize HTML and control characters', () => {
  assert.equal(
    escapeHtml('<script>alert("xss")</script> & \'test\''),
    '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#39;test&#39;'
  );
  assert.equal(sanitizeHeaderValue("Ali\r\nBcc: attacker@evil.com"), 'Ali Bcc: attacker@evil.com');
});

test('validateAndFormatContactEmail escapes XSS, blocks header CRLF in email, and builds safe payload', () => {
  const injectedEmail = validateAndFormatContactEmail({
    name: 'Tester',
    email: "user@fast.edu.pk\r\nBcc: evil@example.com",
    topic: 'General',
    message: 'Hello FESS team!',
  });
  assert.equal(injectedEmail.ok, false);

  const safeResult = validateAndFormatContactEmail({
    name: '<b>Salman</b>',
    email: 'salman@fast.edu.pk',
    topic: "Pitch Arena\nInquiry",
    message: '<img src=x onerror=alert(1)> Looking forward to pitching!',
  });
  assert.equal(safeResult.ok, true);
  if (safeResult.ok) {
    assert.equal(safeResult.data.subject, '[FESS Connect] Pitch Arena Inquiry — <b>Salman</b>');
    assert.ok(!safeResult.data.html.includes('<img src=x'));
    assert.ok(safeResult.data.html.includes('&lt;img src=x onerror=alert(1)&gt;'));
    assert.ok(safeResult.data.html.includes('&lt;b&gt;Salman&lt;/b&gt;'));
  }
});

test('SlidingWindowRateLimiter enforces request ceiling and recovers after window expires', () => {
  const limiter = new SlidingWindowRateLimiter(2, 1000);
  assert.equal(limiter.check('1.2.3.4', 100).allowed, true);
  assert.equal(limiter.check('1.2.3.4', 200).allowed, true);
  const blocked = limiter.check('1.2.3.4', 300);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 1);

  assert.equal(limiter.check('1.2.3.4', 1301).allowed, true);
});

test('validateRegistrationPayload validates fields and maps fee/prefix metadata', () => {
  const bad = validateRegistrationPayload({
    event: 'Invalid Event',
    fullName: 'A',
    phone: '12',
  });
  assert.equal(bad.ok, false);

  const good = validateRegistrationPayload({
    event: 'Enterprise Expo',
    fullName: 'Sara Khan',
    phone: '0300-1234567',
    entityName: '',
  });
  assert.equal(good.ok, true);
  if (good.ok) {
    assert.equal(good.data.codePrefix, 'EE');
    assert.equal(good.data.entityName, 'Individual Participant');
    assert.equal(good.data.feeLabel, 'PKR 8,000 per stall');
  }
});

test('resolveAllowedUpstreamUrl blocks unknown services, traversal, and origin escapes', () => {
  const registry = {
    external: {
      baseUrl: 'https://api.partner.example/v1',
      apiKey: 'secret-token',
    },
  };

  assert.equal(resolveAllowedUpstreamUrl('unknown', 'items', registry).ok, false);
  assert.equal(resolveAllowedUpstreamUrl('external', '../secret', registry).ok, false);
  assert.equal(resolveAllowedUpstreamUrl('external', 'https://evil.com', registry).ok, false);

  const valid = resolveAllowedUpstreamUrl('external', 'events/list', registry);
  assert.equal(valid.ok, true);
  if (valid.ok) {
    assert.equal(valid.url, 'https://api.partner.example/v1/events/list');
  }
});


