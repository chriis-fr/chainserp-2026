/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import DocsLayout, { Callout, Code } from 'components/docs/DocsLayout';

const SURFACE: [string, string][] = [
  ['new ChainsLogistics({ apiKey, baseUrl?, timeoutMs?, fetch?, headers? })', 'FleetOps client for /v1'],
  ['orders', 'list, get, create, update, delete, dispatch, start, complete, cancel, schedule, tracker, eta, distanceAndTime, proofs, comments, nextActivity, updateActivity'],
  ['places', 'list, get, create, update, delete, search'],
  ['contacts, zones, serviceRates', 'list, get, create, update, delete'],
  ['drivers', 'CRUD + track, toggleOnline'],
  ['vehicles', 'CRUD + track'],
  ['fleets', 'CRUD + addDriver, removeDriver, addVehicle, removeVehicle'],
  ['serviceQuotes', 'list, get'],
  ['trackingNumbers', 'list, get, create, delete, fromQr'],
  ['webhookEndpoints', 'CRUD + rotateSecret'],
  ['currentOrganization(), request(method, path, { query, body })', 'Check a key; call any endpoint not wrapped yet'],
  ['new Storefront({ apiKey })', 'about, products, categories, search, stores, carts, quoteFromCart, checkouts, customers, reviews, promotions, gateways, request'],
  ['verifyWebhook(raw, header, secret, { toleranceSeconds })', 'true or false'],
  ['parseWebhook(raw, header, secret)', 'The typed event, or throws WebhookVerificationError'],
  ['ChainsApiError', 'status, errors[], body for every non-2xx answer'],
];

export default function SdkDocs() {
  return (
    <DocsLayout
      title="TypeScript SDK"
      seoTitle="@chains-erp/logistics — TypeScript SDK for Chains FleetOps"
      description="The Chains FleetOps TypeScript SDK: a typed client for orders, places, drivers, vehicles and webhooks, a Storefront client, and webhook signature verification. Zero dependencies; Node 18+, Bun, Deno and edge."
      lead="@chains-erp/logistics wraps the FleetOps and Storefront APIs with types, and verifies webhooks for you. No runtime dependencies: it uses fetch and Web Crypto."
      keywords={['logistics SDK TypeScript', 'delivery API SDK', 'FleetOps SDK', 'Fleetbase TypeScript']}
    >
      <h2>Install</h2>
      <Callout title="Install from the repository">
        <code>@chains-erp/logistics</code> is not on npm. Build it from the Chains ERP repository and install it into your project from that folder.
      </Callout>
      <Code lang="bash">{`
git clone https://github.com/chriis-fr/chainserp-2026.git
cd chainserp-2026/packages/chains-logistics-sdk
npm install && npm run build

# in your project
npm install /path/to/chainserp-2026/packages/chains-logistics-sdk
`}</Code>
      <p>Runs on Node 18 or newer, Bun, Deno and edge runtimes. Keep it on the server: it carries your key.</p>

      <h2>Configure</h2>
      <Code lang="typescript">{`
import { ChainsLogistics } from '@chains-erp/logistics';

export const fleet = new ChainsLogistics({
  apiKey: process.env.CHAINS_LOGISTICS_KEY!, // test key while building, live key after sign-off
  timeoutMs: 20_000,                          // optional, default 30 s
});

console.log(await fleet.currentOrganization()); // quick check that the key works
`}</Code>

      <h2>Orders end to end</h2>
      <Code lang="typescript">{`
const order = await fleet.orders.create({
  internal_id: 'SO-1001',
  pickup: 'place_your_warehouse',
  dropoff: { street1: 'Ngong Road', city: 'Nairobi', country: 'KE', phone: '+254712345678' },
  entities: [{ name: 'Carton of 24', internal_id: 'SKU-24' }],
});

await fleet.orders.dispatch(order.id);

const progress = await fleet.orders.tracker(order.id);
const proof = await fleet.orders.proofs(order.id); // after delivery

const recent = await fleet.orders.list({ limit: 20, sort: '-created_at' });
`}</Code>

      <h2>Errors</h2>
      <Code lang="typescript">{`
import { ChainsApiError } from '@chains-erp/logistics';

try {
  await fleet.orders.get('order_does_not_exist');
} catch (e) {
  if (e instanceof ChainsApiError) {
    console.error(e.status, e.errors); // e.g. 401 ['Oops! The api credentials provided were not valid']
  }
}
`}</Code>

      <h2>Webhooks</h2>
      <Code lang="typescript">{`
import { parseWebhook } from '@chains-erp/logistics';

const evt = await parseWebhook(rawBody, headers['x-fleetbase-signature'], process.env.CHAINS_WEBHOOK_SECRET!);
if (evt.event === 'order.completed') { /* … */ }
`}</Code>

      <h2>Storefront</h2>
      <Code lang="typescript">{`
import { Storefront } from '@chains-erp/logistics';

const store = new Storefront({ apiKey: process.env.CHAINS_STORE_KEY! });
const products = await store.products.list({ limit: 12 });
`}</Code>

      <h2>Everything in the SDK</h2>
      <div className="cx-table-wrap">
        <table className="cx-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Does</th>
            </tr>
          </thead>
          <tbody>
            {SURFACE.map(([m, d]) => (
              <tr key={m}>
                <td>
                  <code>{m}</code>
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocsLayout>
  );
}
