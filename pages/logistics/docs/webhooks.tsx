/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import DocsLayout, { API_BASE, Callout, Code } from 'components/docs/DocsLayout';

const EVENTS: [string, string][] = [
  ['order.created', 'An order was created (from the API, the console or the Storefront)'],
  ['order.updated', 'Any change to an order'],
  ['order.ready', 'The order is ready for dispatch'],
  ['order.dispatched', 'Sent to a driver or to the drivers in range'],
  ['order.dispatch_failed', 'Dispatch did not go through, e.g. no driver available'],
  ['order.driver_assigned', 'A driver accepted or was assigned'],
  ['order.started', 'The driver started the job'],
  ['order.completed', 'Delivered'],
  ['order.canceled', 'Cancelled'],
  ['order.failed', 'The delivery failed'],
  ['order.deleted', 'The order was deleted'],
];

export default function WebhooksDocs() {
  return (
    <DocsLayout
      title="Webhooks"
      seoTitle="FleetOps webhooks — order events and signature verification"
      description="Get Chains FleetOps order events pushed to your server — order.dispatched, order.driver_assigned, order.completed and more — and verify the X-Fleetbase-Signature header in TypeScript."
      lead="Instead of polling, let FleetOps tell your system when something happens to an order. Every delivery is signed so you can prove it came from us."
      keywords={['delivery webhooks', 'order status webhook', 'X-Fleetbase-Signature', 'verify webhook signature TypeScript']}
    >
      <h2>Register an endpoint</h2>
      <p>
        Send us your HTTPS URL and the events you want, and we register it; or do it yourself. Each endpoint gets its own signing secret.
      </p>
      <Code lang="typescript">{`
const endpoint = await fleet.webhookEndpoints.create({
  url: 'https://erp.example.co.ke/hooks/chains',
  events: ['order.dispatched', 'order.driver_assigned', 'order.completed', 'order.canceled', 'order.failed'],
  description: 'ERP order status',
});
`}</Code>
      <Code lang="curl">{`
curl -X POST ${API_BASE}/webhook-endpoints \\
  -H "Authorization: Bearer $CHAINS_LOGISTICS_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "url": "https://erp.example.co.ke/hooks/chains", "events": ["order.completed"] }'
`}</Code>

      <h2>What we send</h2>
      <p>
        A <code>POST</code> with a JSON body. <code>event</code> is <code>{'<model>.<name>'}</code>; <code>data</code> is the resource as
        the API returns it, including your <code>internal_id</code> and <code>meta</code>.
      </p>
      <Code lang="json">{`
{
  "id": "…",
  "api_version": "v1",
  "event": "order.completed",
  "created_at": "2026-11-10T10:00:00.000000Z",
  "data": {
    "id": "order_…",
    "internal_id": "SO-1001",
    "status": "completed",
    "…": "the rest of the order"
  }
}
`}</Code>

      <h3>Order events</h3>
      <div className="cx-table-wrap">
        <table className="cx-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {EVENTS.map(([e, d]) => (
              <tr key={e}>
                <td>
                  <code>{e}</code>
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Other resources send <code>.created</code>, <code>.updated</code> and <code>.deleted</code> events too, and there are events for
        waypoints, items and geofences (entering, leaving and dwelling in a zone). Ask us for the ones you need.
      </p>

      <h2>Verify the signature</h2>
      <p>Every delivery carries this header:</p>
      <Code lang="http">{`
X-Fleetbase-Signature: t=1794300000,v1=5f2b…c9
`}</Code>
      <ol className="cx-list">
        <li>
          <code>t</code> is the unix time we signed at. Reject anything more than 5 minutes away from your clock.
        </li>
        <li>
          <code>v1</code> is <code>HMAC-SHA256(secret, t + "." + rawBody)</code> in hex, where <code>rawBody</code> is the body exactly as
          received, before you parse it.
        </li>
        <li>
          Compare in constant time. If the header carries more than one <code>v1</code>, accept when any of them matches.
        </li>
      </ol>
      <Code lang="typescript">{`
// app/api/chains/route.ts (Next.js), or any Fetch-API handler (Bun, Deno, Cloudflare, Hono)
import { parseWebhook, WebhookVerificationError } from '@chains-erp/logistics';

export async function POST(req: Request) {
  const raw = await req.text();
  try {
    const evt = await parseWebhook(raw, req.headers.get('x-fleetbase-signature'), process.env.CHAINS_WEBHOOK_SECRET!);

    if (await alreadyHandled(evt.id)) return new Response('ok'); // deliveries can repeat

    switch (evt.event) {
      case 'order.completed':
        await markDelivered(String(evt.data.internal_id));
        break;
      case 'order.canceled':
      case 'order.failed':
        await flagForFollowUp(String(evt.data.internal_id), evt.event);
        break;
    }
    return new Response('ok');
  } catch (e) {
    if (e instanceof WebhookVerificationError) return new Response('bad signature', { status: 400 });
    throw e;
  }
}
`}</Code>
      <p>Without the SDK, on Node:</p>
      <Code lang="typescript">{`
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verify(rawBody: string, header: string | undefined, secret: string): boolean {
  if (!header) return false;
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
`}</Code>
      <Callout tone="warn" title="Use the raw body">
        Verify before parsing, using the exact bytes we sent. Many frameworks parse JSON for you; re-serialising it changes spacing and
        the signature will not match. In Express use <code>express.raw({'{ type: \'application/json\' }'})</code> on the webhook route.
      </Callout>

      <h2>Answer fast, and expect repeats</h2>
      <ul className="cx-list">
        <li>Return a 2xx as soon as the signature checks out; do slow work in a queue.</li>
        <li>
          A delivery can arrive more than once. Store <code>id</code> and skip events you have already handled.
        </li>
        <li>Events can arrive out of order. Use the order's current status in <code>data</code>, not the arrival order.</li>
        <li>
          If a secret leaks, rotate it with <code>POST /v1/webhook-endpoints/{'{id}'}/rotate-secret</code> and update your receiver.
        </li>
      </ul>
    </DocsLayout>
  );
}
