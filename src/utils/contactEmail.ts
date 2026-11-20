export interface ContactEmailInput {
  name: unknown;
  email: unknown;
  topic: unknown;
  message: unknown;
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
  subject: string;
  html: string;
  text: string;
}

export type ContactEmailValidationResult =
  | { ok: true; data: ContactEmailPayload }
  | { ok: false; errors: Record<string, string>; message: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARS_REGEX = /[\r\n\0\u0001-\u001F\u007F]/g;

export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeHeaderValue(raw: string): string {
  return raw.replace(CONTROL_CHARS_REGEX, ' ').replace(/\s+/g, ' ').trim();
}

export function validateAndFormatContactEmail(
  input: ContactEmailInput
): ContactEmailValidationResult {
  const errors: Record<string, string> = {};

  const rawName = typeof input.name === 'string' ? input.name : '';
  const rawEmail = typeof input.email === 'string' ? input.email : '';
  const rawTopic = typeof input.topic === 'string' ? input.topic : '';
  const rawMessage = typeof input.message === 'string' ? input.message : '';

  const cleanName = sanitizeHeaderValue(rawName);
  const cleanEmail = sanitizeHeaderValue(rawEmail);
  const cleanTopic = sanitizeHeaderValue(rawTopic) || 'General FESS Society Inquiry';
  const cleanMessage = rawMessage.replace(/\0/g, '').trim();

  if (cleanName.length < 2 || cleanName.length > 120) {
    errors.name = 'Please enter your name (2–120 characters).';
  }

  if (/[\r\n]/.test(rawEmail) || !EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 254) {
    errors.email = 'Please enter a valid email address.';
  }

  if (cleanTopic.length > 160) {
    errors.topic = 'Topic must be 160 characters or fewer.';
  }

  if (cleanMessage.length < 5 || cleanMessage.length > 4000) {
    errors.message = 'Please enter a message between 5 and 4,000 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      message: Object.values(errors)[0],
    };
  }

  const subject = `[FESS Connect] ${cleanTopic} — ${cleanName}`;
  const escapedName = escapeHtml(cleanName);
  const escapedEmail = escapeHtml(cleanEmail);
  const escapedTopic = escapeHtml(cleanTopic);
  const escapedMessage = escapeHtml(cleanMessage).replace(/\r?\n/g, '<br />');

  const html = `
<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#FAF6F0;font-family:Arial,Helvetica,sans-serif;color:#141923;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:#141923;padding:24px 28px;color:#FFFFFF;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#FCD34D;">FESS Direct Desk</p>
          <h1 style="margin:0;font-size:20px;line-height:1.3;">New Connect Inquiry</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 12px;font-size:14px;"><strong>Sender:</strong> ${escapedName} (&lt;${escapedEmail}&gt;)</p>
          <p style="margin:0 0 16px;font-size:14px;"><strong>Topic:</strong> <span style="color:#991B1B;font-weight:bold;">${escapedTopic}</span></p>
          <div style="padding:16px;background:#FAF6F0;border-left:4px solid #991B1B;border-radius:8px;font-size:14px;line-height:1.6;color:#1E293B;">
            ${escapedMessage}
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();

  const text = [
    'FESS Direct Desk — New Connect Inquiry',
    '--------------------------------------',
    `Sender: ${cleanName} <${cleanEmail}>`,
    `Topic: ${cleanTopic}`,
    '',
    'Message:',
    cleanMessage,
  ].join('\n');

  return {
    ok: true,
    data: {
      name: cleanName,
      email: cleanEmail,
      topic: cleanTopic,
      message: cleanMessage,
      subject,
      html,
      text,
    },
  };
}
