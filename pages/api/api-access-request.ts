import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * The docs' "Request access" form posts here; this forwards it to the Chains API, which stores it,
 * emails Chains and shows it in the admin dashboard. The API only accepts requests that carry the
 * shared secret, so this server is the only way in, and it does the per-visitor checks the API
 * can't (the API only ever sees this server's address).
 *
 * Settings: CHAINS_API_URL (the API's base address) and API_ACCESS_FORM_SECRET (same value as on
 * the API). Without them the form answers that requests are not switched on yet.
 */

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Per server instance. Serverless instances don't share this, which is why the API keeps its own limits.
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

const FIELDS = ['name', 'business', 'email', 'phone', 'kind', 'building', 'website', 'browserOrigin'] as const;

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

  const apiUrl = process.env.CHAINS_API_URL?.replace(/\/$/, '');
  const secret = process.env.API_ACCESS_FORM_SECRET;
  if (!apiUrl || !secret) {
    return res.status(503).json({ error: 'Online requests are not switched on yet. Please message us on WhatsApp instead.' });
  }

  // Forward only the fields we know, as strings.
  const payload: Record<string, string> = {};
  for (const f of FIELDS) if (typeof body[f] === 'string') payload[f] = body[f].slice(0, 2000);

  try {
    const r = await fetch(`${apiUrl}/api/public/api-access-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-chains-site-secret': secret },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (r.ok) return res.status(200).json({ success: true });
    // Show the API's own validation message; hide anything that isn't meant for a visitor.
    const msg = r.status === 400 || r.status === 429 ? data.error : undefined;
    return res.status(r.status === 400 || r.status === 429 ? r.status : 502).json({ error: msg || 'We could not send your request. Please try again, or message us on WhatsApp.' });
  } catch {
    return res.status(502).json({ error: 'We could not send your request. Please try again, or message us on WhatsApp.' });
  }
}
