/**
 * Server-side relay from the website to chains-API's logistics intake. The shared secret
 * (LOGISTICS_INTAKE_SECRET, the same value on both sides) never reaches the browser.
 */
const API = (process.env.CHAINS_API_URL || 'https://api.chains-erp.com').replace(/\/+$/, '');

export const intakeConfigured = () => !!process.env.LOGISTICS_INTAKE_SECRET;

export async function intake(path: string, init: { method?: 'GET' | 'POST'; body?: unknown } = {}) {
  const res = await fetch(`${API}/api/logistics${path}`, {
    method: init.method ?? 'GET',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      'x-intake-secret': process.env.LOGISTICS_INTAKE_SECRET ?? '',
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    signal: AbortSignal.timeout(15_000),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, ok: res.ok, json };
}
