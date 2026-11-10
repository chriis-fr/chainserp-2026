/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import DocsLayout, { Callout, Code } from 'components/docs/DocsLayout';

// The one file integrators copy into their own project. No package to install: fetch, their keys, Node's crypto.
const HELPER = `
// chains.ts: copy this file into your project. Server-side only: it reads your keys from the environment.
import { createHmac, timingSafeEqual } from 'node:crypto';

const API = 'https://api.progressusmavericks.co.ke';

/** Thrown for any non-2xx answer. \`errors\` holds the API's messages. */
export class ChainsApiError extends Error {
  constructor(public status: number, public errors: string[], public body: unknown) {
    super(\`Chains API \${status}: \${errors.join('; ') || 'request failed'}\`);
  }
}

type Query = Record<string, string | number | boolean | undefined>;

async function call<T>(base: string, key: string | undefined, method: string, path: string, body?: unknown, query?: Query): Promise<T> {
  if (!key) throw new Error('Missing API key: set it in your server environment');
  const url = new URL(\`\${base}/\${path.replace(/^\\//, '')}\`);
  for (const [k, v] of Object.entries(query ?? {})) if (v !== undefined) url.searchParams.set(k, String(v));

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: \`Bearer \${key}\`,
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30_000),
  });

  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const errors = Array.isArray(data?.errors) ? data.errors : [data?.error ?? res.statusText];
    throw new ChainsApiError(res.status, errors.map(String), data);
  }
  return data as T;
}

function client(base: string, envKey: string) {
  const key = () => process.env[envKey];
  return {
    get: <T = any>(path: string, query?: Query) => call<T>(base, key(), 'GET', path, undefined, query),
    post: <T = any>(path: string, body?: unknown) => call<T>(base, key(), 'POST', path, body ?? {}),
    put: <T = any>(path: string, body?: unknown) => call<T>(base, key(), 'PUT', path, body ?? {}),
    delete: <T = any>(path: string) => call<T>(base, key(), 'DELETE', path),
  };
}

/** FleetOps: orders, places, drivers, vehicles, webhooks… (key from CHAINS_LOGISTICS_KEY) */
export const fleet = client(\`\${API}/v1\`, 'CHAINS_LOGISTICS_KEY');

/** Storefront: products, carts, checkout… (key from CHAINS_STORE_KEY) */
export const store = client(\`\${API}/storefront/v1\`, 'CHAINS_STORE_KEY');

/**
 * Check a webhook's X-Fleetbase-Signature header: t=<unix seconds>,v1=<hex HMAC-SHA256(secret, t + "." + rawBody)>.
 * Pass the body exactly as received, before parsing. Rejects anything older than 5 minutes.
 */
export function verifyWebhook(rawBody: string, header: string | null | undefined, secret: string): boolean {
  if (!header || !secret) return false;
  let t = NaN;
  const sigs: string[] = [];
  for (const part of header.split(',')) {
    const [k, v] = part.trim().split('=');
    if (k === 't') t = Number(v);
    if (k === 'v1' && v) sigs.push(v);
  }
  if (!Number.isInteger(t) || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = Buffer.from(createHmac('sha256', secret).update(\`\${t}.\${rawBody}\`).digest('hex'));
  return sigs.some((sig) => sig.length === expected.length && timingSafeEqual(Buffer.from(sig), expected));
}
`;

export default function TypeScriptDocs() {
  return (
    <DocsLayout
      title="TypeScript quickstart"
      seoTitle="Connect to Chains FleetOps with TypeScript"
      description="Connect your TypeScript or Node.js system to Chains FleetOps with one copy-paste file: fetch, your API key, typed errors and webhook signature checks. No package to install."
      lead="One file, copied into your own project. It uses fetch and the API keys we give you, and checks webhook signatures with Node's built-in crypto. Nothing to install."
      keywords={['FleetOps TypeScript', 'logistics API TypeScript', 'delivery API Node.js', 'webhook signature TypeScript']}
    >
      <h2>Before you start</h2>
      <ul className="cx-list">
        <li>Node 18 or later (or Bun, Deno, or any runtime with <code>fetch</code> and <code>node:crypto</code>).</li>
        <li>
          Your keys from us, set as server environment variables: <code>CHAINS_LOGISTICS_KEY</code> (start with the test key),{' '}
          <code>CHAINS_STORE_KEY</code> if you use the Storefront, and <code>CHAINS_WEBHOOK_SECRET</code> for webhooks.
        </li>
      </ul>
      <Callout tone="warn" title="Server-side only">
        These keys can create orders and read customer details. Never put them in a browser, a mobile app or a public repository.
      </Callout>

      <h2>1. Add chains.ts to your project</h2>
      <Code lang="typescript">{HELPER}</Code>

      <h2>2. Create and dispatch an order</h2>
      <Code lang="typescript">{`
import { fleet, ChainsApiError } from './chains';

try {
  const order = await fleet.post('orders', {
    internal_id: 'SO-1001',                         // your own order number
    pickup: 'place_your_warehouse',                 // a saved place id from us
    dropoff: { name: 'Jane Wanjiku', street1: 'Ngong Road', city: 'Nairobi', country: 'KE', phone: '+254712345678' },
    entities: [{ name: 'Carton of 24', internal_id: 'SKU-24' }],
  });
  await fleet.post(\`orders/\${order.id}/dispatch\`);
  console.log('Created', order.id);
} catch (e) {
  if (e instanceof ChainsApiError) console.error(e.status, e.errors);
  throw e;
}
`}</Code>

      <h2>3. Follow it</h2>
      <Code lang="typescript">{`
const tracker = await fleet.get(\`orders/\${orderId}/tracker\`); // driver position and progress
const eta = await fleet.get(\`orders/\${orderId}/eta\`);
const recent = await fleet.get('orders', { limit: 20, sort: '-created_at' });
`}</Code>

      <h2>4. Receive webhooks</h2>
      <Code lang="typescript">{`
// app/api/chains/route.ts (Next.js), or any handler that gives you the raw body
import { verifyWebhook } from '@/lib/chains';

export async function POST(req: Request) {
  const raw = await req.text(); // the raw body, before parsing
  if (!verifyWebhook(raw, req.headers.get('x-fleetbase-signature'), process.env.CHAINS_WEBHOOK_SECRET!)) {
    return new Response('bad signature', { status: 400 });
  }
  const evt = JSON.parse(raw); // { id, api_version, event, created_at, data }
  if (evt.event === 'order.completed') {
    // mark evt.data.internal_id as delivered in your system
  }
  return new Response('ok');
}
`}</Code>
      <p>
        Events and retries are explained in <NextLink href="/logistics/docs/webhooks">Webhooks</NextLink>; every endpoint is in the{' '}
        <NextLink href="/logistics/docs/api">API reference</NextLink>.
      </p>

      <h2>5. Storefront (if we set one up for you)</h2>
      <Code lang="typescript">{`
import { store } from './chains';

const products = await store.get('products', { limit: 12 });
const cart = await store.get(\`carts/\${sessionId}\`); // your own session id
`}</Code>
    </DocsLayout>
  );
}
