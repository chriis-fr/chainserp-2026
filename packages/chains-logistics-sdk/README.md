# @chains-erp/logistics

TypeScript SDK for **Chains FleetOps** (logistics) and the **Chains Storefront** API.

- Zero runtime dependencies. Uses the global `fetch` and Web Crypto, so it runs on Node 18+, Bun, Deno, edge runtimes and the browser.
- Typed resources for orders, places, contacts, drivers, vehicles, fleets, zones, service rates and quotes, tracking numbers and webhook endpoints.
- `verifyWebhook` / `parseWebhook` check the `X-Fleetbase-Signature` header in constant time.

Full docs: https://chains-erp.com/logistics/docs

## Access

API keys are issued by Chains. There is no self-serve sign-up yet: message us on
[WhatsApp](https://wa.me/254705343984) or email hello@chains-erp.com and we will send a **test key**
first, and a **live key** once your integration is signed off. Keep every key on your server.

## Install

Not on npm yet. Install it from the Chains ERP repository:

```bash
git clone https://github.com/chriis-fr/chainserp-2026.git
cd chainserp-2026/packages/chains-logistics-sdk
npm install && npm run build
# then, in your project:
npm install /path/to/chainserp-2026/packages/chains-logistics-sdk
```

## Create and dispatch an order

```ts
import { ChainsLogistics, ChainsApiError } from '@chains-erp/logistics';

const fleet = new ChainsLogistics({ apiKey: process.env.CHAINS_LOGISTICS_KEY! });

try {
  const order = await fleet.orders.create({
    internal_id: 'SO-1001', // your order number, echoed back on reads and webhooks
    pickup: 'place_abc123', // a saved place...
    dropoff: { name: 'Jane Wanjiru', street1: 'Ngong Road', city: 'Nairobi', country: 'KE', phone: '+254712345678' }, // ...or a new one
    entities: [{ name: 'Carton of 24', internal_id: 'SKU-24', weight: 12, weight_unit: 'kg' }],
    notes: 'Call on arrival',
  });

  await fleet.orders.dispatch(order.id);
  const progress = await fleet.orders.tracker(order.id);
  console.log(order.id, progress);
} catch (e) {
  if (e instanceof ChainsApiError) console.error(e.status, e.errors);
  else throw e;
}
```

## Receive webhooks

```ts
import { parseWebhook } from '@chains-erp/logistics';

// Next.js / any Fetch-API route handler
export async function POST(req: Request) {
  const raw = await req.text(); // the body exactly as sent, before JSON.parse
  try {
    const evt = await parseWebhook(raw, req.headers.get('x-fleetbase-signature'), process.env.CHAINS_WEBHOOK_SECRET!);
    if (evt.event === 'order.completed') {
      // mark your own order (evt.data.internal_id) as delivered
    }
    return new Response('ok');
  } catch {
    return new Response('bad signature', { status: 400 });
  }
}
```

## Storefront

```ts
import { Storefront } from '@chains-erp/logistics';

const store = new Storefront({ apiKey: process.env.CHAINS_STORE_KEY! }); // server-side only
const products = await store.products.list({ limit: 20 });
```

## API surface

| Client | Members |
|---|---|
| `ChainsLogistics` | `orders`, `places`, `contacts`, `drivers`, `vehicles`, `fleets`, `zones`, `serviceRates`, `serviceQuotes`, `trackingNumbers`, `webhookEndpoints`, `currentOrganization()`, `request()` |
| `orders` | `list`, `get`, `create`, `update`, `delete`, `dispatch`, `start`, `complete`, `cancel`, `schedule`, `tracker`, `eta`, `distanceAndTime`, `proofs`, `comments`, `nextActivity`, `updateActivity` |
| `places` | CRUD + `search` |
| `drivers` / `vehicles` | CRUD + `track` (drivers also `toggleOnline`) |
| `fleets` | CRUD + `addDriver`, `removeDriver`, `addVehicle`, `removeVehicle` |
| `webhookEndpoints` | CRUD + `rotateSecret` |
| `Storefront` | `about`, `products`, `categories`, `search`, `stores`, `carts`, `quoteFromCart`, `checkouts`, `customers`, `reviews`, `promotions`, `gateways`, `request()` |
| Webhooks | `verifyWebhook`, `parseWebhook`, `signatureHeader`, `computeSignature`, `SIGNATURE_HEADER` |

`request(method, path, { query, body })` reaches any endpoint the SDK does not wrap yet.

## Develop

```bash
npm run build   # tsc -> dist/
npm test        # builds, then runs the webhook and client tests
```
