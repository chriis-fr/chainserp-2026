import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Telegram relay for the Chains infra bot (chains-platform-controller).
 *
 * The VPS network (10.42.13.0/24) blocks api.telegram.org, while Vercel can reach it and the VPS can
 * reach Vercel. The controller sends each Bot API call here instead:
 *
 *   POST https://chains-erp.com/api/tg/<method>   header x-telegram-bot-token: <token>   body: JSON
 *
 * Only our own bot is relayed: the token must start with ALLOWED_BOT_ID (a bot's numeric id is public;
 * the secret is the part after the colon), so this is not an open Telegram proxy. The token travels in a
 * header so it never appears in request URLs or Vercel's path logs.
 */
const ALLOWED_BOT_IDS = ['8670911721'];
const METHOD_RE = /^[A-Za-z]{3,40}$/;

export const config = {
  api: { bodyParser: { sizeLimit: '1mb' } },
  // getUpdates long-polls; the controller asks for at most 25 s through the relay.
  maxDuration: 60,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, description: 'POST only' });
  }

  const method = String(req.query.method ?? '');
  const token = String(req.headers['x-telegram-bot-token'] ?? '');
  const botId = token.split(':')[0];

  if (!METHOD_RE.test(method)) return res.status(400).json({ ok: false, description: 'bad method' });
  if (!token.includes(':') || !ALLOWED_BOT_IDS.includes(botId)) {
    return res.status(403).json({ ok: false, description: 'bot not allowed' });
  }

  try {
    const upstream = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(req.body ?? {}),
      signal: AbortSignal.timeout(55_000),
    });
    const text = await upstream.text();
    res.status(upstream.status).setHeader('content-type', 'application/json').send(text);
  } catch (e) {
    res.status(502).json({ ok: false, description: `relay could not reach Telegram: ${(e as Error).name}` });
  }
}
