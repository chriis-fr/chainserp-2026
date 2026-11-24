import type { NextApiRequest, NextApiResponse } from 'next';
import { intake, intakeConfigured } from 'utils/chains-intake';

/**
 * The "complete your details" link in our emails opens /logistics/docs/complete?token=…;
 * that page reads and saves through here. The token is the only key; chains-API checks it.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!intakeConfigured()) return res.status(503).json({ error: 'This form is not available right now. Reply to our email instead.' });
  try {
    if (req.method === 'GET') {
      const token = typeof req.query.token === 'string' ? req.query.token : '';
      const r = await intake(`/access-requests/details?token=${encodeURIComponent(token)}`);
      return res.status(r.status).json(r.json);
    }
    if (req.method === 'POST') {
      const body = (typeof req.body === 'object' && req.body) || {};
      const r = await intake('/access-requests/details', { method: 'POST', body });
      return res.status(r.status).json(r.json);
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch {
    return res.status(502).json({ error: 'We could not reach our servers. Please try again, or reply to our email.' });
  }
}
