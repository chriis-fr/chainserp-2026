import type { NextApiRequest, NextApiResponse } from 'next';

/** Liveness for the server's deployer and Docker healthcheck. Reports the commit it was built from. */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ ok: true, service: 'chains-site', commit: process.env.BUILD_COMMIT ?? 'unknown' });
}
