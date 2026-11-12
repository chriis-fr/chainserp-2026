import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from 'utils/email';

/**
 * The docs' "Request access" form posts here, and this emails the request to Chains. Nothing is
 * stored and the Chains API is not involved: Chains reviews the email, approves the business, and
 * generates and sends its key from the FleetOps admin.
 *
 * Uses the same mail settings as the contact form (SMTP_*), so there is nothing new to configure.
 */

const TO = 'hello@chains-erp.com';
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Per server instance; enough to stop one visitor flooding the inbox.
const hits = new Map<string, { n: number; resetAt: number }>();

function clientIp(req: NextApiRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  const first = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0]?.trim();
  return first || req.socket.remoteAddress || 'unknown';
}

function limited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.forEach((v, k) => v.resetAt <= now && hits.delete(k));
  const h = hits.get(ip);
  if (!h || h.resetAt <= now) {
    hits.set(ip, { n: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  h.n += 1;
  return h.n > MAX_PER_WINDOW;
}

const KIND_LABEL: Record<string, string> = { api: 'Delivery API', storefront: 'Storefront', both: 'Delivery API and Storefront' };
const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

/** Requests come from the public: everything they type is text, never markup. */
const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] as string);
const text = (raw: unknown, max: number) => (typeof raw === 'string' ? raw.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max) : '');
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (typeof req.body === 'object' && req.body) || {};

  // Bots fill every field and submit instantly; people don't. Pretend success so a bot learns nothing.
  const startedAt = Number(body.startedAt);
  if (body.company_site || !Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return res.status(200).json({ success: true });
  }

  if (limited(clientIp(req))) {
    return res.status(429).json({ error: 'Too many requests from this connection. Please try again in an hour, or message us on WhatsApp.' });
  }

  const name = text(body.name, 80);
  const business = text(body.business, 120);
  const email = text(body.email, 254).toLowerCase();
  const phone = text(body.phone, 30);
  const kind = text(body.kind, 20);
  const building = text(body.building, 1500);
  const website = text(body.website, 200);
  const browserOrigin = text(body.browserOrigin, 200);

  if (name.length < 2) return res.status(400).json({ error: 'Please enter your name.' });
  if (business.length < 2) return res.status(400).json({ error: 'Please enter your business name.' });
  if (!EMAIL.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (phone && !/^\+?[\d\s()-]{7,30}$/.test(phone)) return res.status(400).json({ error: 'Please enter a valid phone number, or leave it empty.' });
  if (!KIND_LABEL[kind]) return res.status(400).json({ error: 'Please choose what you need access to.' });
  if (building.length < 10) return res.status(400).json({ error: 'Tell us in a sentence or two what you are building.' });

  const kindLabel = KIND_LABEL[kind];
  const rows: [string, string][] = [
    ['Name', name],
    ['Business', business],
    ['Email', email],
    ['Phone', phone],
    ['Wants', kindLabel],
    ['Website', website],
    ['Browser domain', browserOrigin],
  ].filter(([, v]) => v) as [string, string][];

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
  <h1 style="margin:24px 0 6px;font-size:21px;font-weight:600;letter-spacing:-0.02em;">New API access request</h1>
  <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#64748b;">${esc(business)} would like access to the ${esc(kindLabel)}. Reply to this email to reach them.</p>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:12px;">
    ${rows.map(([k, v]) => `<tr><td style="padding:9px 14px;font-size:13px;color:#64748b;width:130px;border-bottom:1px solid #f1f5f9;">${k}</td><td style="padding:9px 14px;font-size:14px;border-bottom:1px solid #f1f5f9;">${esc(v)}</td></tr>`).join('')}
  </table>
  <div style="margin:16px 0 0;background:#f8fafc;border-radius:12px;padding:14px 16px;">
    <p style="margin:0 0 6px;font-size:10px;font-weight:600;letter-spacing:0.13em;text-transform:uppercase;color:#64748b;">What they are building</p>
    <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(building)}</p>
  </div>
  <p style="margin:18px 0 24px;font-size:12px;color:#94a3b8;">Sent from the Request access form on chains-erp.com/logistics/docs.</p>
</div>`;

  const plain = [
    `New API access request: ${business} wants the ${kindLabel}.`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'What they are building:',
    building,
  ].join('\n');

  try {
    await sendEmail({
      to: TO,
      from: process.env.SMTP_FROM || process.env.SMTP_USER || TO,
      replyTo: email,
      subject: `API access request: ${oneLine(business).slice(0, 80)}`,
      html,
      text: plain,
    });
    return res.status(200).json({ success: true });
  } catch {
    return res.status(502).json({ error: 'We could not send your request. Please try again, or message us on WhatsApp.' });
  }
}
