/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import DocsLayout, { API_BASE, Callout, Code } from 'components/docs/DocsLayout';

type Row = [string, string, string];

const GROUPS: { id: string; title: string; intro: string; rows: Row[] }[] = [
  {
    id: 'orders',
    title: 'Orders',
    intro: 'A delivery job: pickup, dropoff, optional stops, items, customer and driver.',
    rows: [
      ['GET', '/orders', 'List orders'],
      ['POST', '/orders', 'Create an order'],
      ['GET', '/orders/{id}', 'Get an order'],
      ['PUT', '/orders/{id}', 'Update an order'],
      ['DELETE', '/orders/{id}', 'Delete an order'],
      ['POST', '/orders/{id}/dispatch', 'Dispatch to drivers or to the assigned driver'],
      ['POST', '/orders/{id}/schedule', 'Schedule or reschedule'],
      ['POST', '/orders/{id}/start', 'Start the order'],
      ['POST', '/orders/{id}/update-activity', 'Move the order to its next status'],
      ['GET', '/orders/{id}/next-activity', 'What the next status will be'],
      ['POST', '/orders/{id}/complete', 'Complete the order'],
      ['DELETE', '/orders/{id}/cancel', 'Cancel the order'],
      ['GET', '/orders/{id}/tracker', 'Live progress and driver position'],
      ['GET', '/orders/{id}/eta', 'Estimated arrival'],
      ['GET', '/orders/{id}/distance-and-time', 'Route distance and time'],
      ['GET', '/orders/{id}/proofs', 'Proof of delivery captured by the driver'],
      ['POST', '/orders/{id}/capture-photo, /capture-signature, /capture-qr', 'Attach proof of delivery'],
      ['GET', '/orders/{id}/comments', 'Comments on the order'],
    ],
  },
  {
    id: 'places',
    title: 'Places',
    intro: 'Addresses: your pickup locations and customer drop-offs. Save once, refer to them by id.',
    rows: [
      ['GET', '/places', 'List places'],
      ['GET', '/places/search', 'Search places and addresses'],
      ['POST', '/places', 'Create a place'],
      ['GET / PUT / DELETE', '/places/{id}', 'Get, update or delete'],
    ],
  },
  {
    id: 'contacts',
    title: 'Contacts',
    intro: 'Customers and other people on an order.',
    rows: [
      ['GET / POST', '/contacts', 'List or create'],
      ['GET / PUT / DELETE', '/contacts/{id}', 'Get, update or delete'],
    ],
  },
  {
    id: 'drivers',
    title: 'Drivers',
    intro: 'Your riders and drivers. They work orders in the driver app.',
    rows: [
      ['GET / POST', '/drivers', 'List or create'],
      ['GET / PUT / DELETE', '/drivers/{id}', 'Get, update or delete'],
      ['POST', '/drivers/{id}/track', 'Push a position from your own telematics'],
      ['POST', '/drivers/{id}/toggle-online', 'Set a driver online or offline'],
    ],
  },
  {
    id: 'vehicles',
    title: 'Vehicles and fleets',
    intro: 'Vehicles, and fleets that group drivers and vehicles.',
    rows: [
      ['GET / POST', '/vehicles', 'List or create vehicles'],
      ['GET / PUT / DELETE', '/vehicles/{id}', 'Get, update or delete'],
      ['POST', '/vehicles/{id}/track', 'Push a vehicle position'],
      ['GET / POST', '/fleets', 'List or create fleets'],
      ['GET / PUT / DELETE', '/fleets/{id}', 'Get, update or delete'],
      ['POST / DELETE', '/fleets/{id}/drivers/{driver}', 'Add or remove a driver'],
      ['POST / DELETE', '/fleets/{id}/vehicles/{vehicle}', 'Add or remove a vehicle'],
    ],
  },
  {
    id: 'pricing',
    title: 'Rates and quotes',
    intro: 'How deliveries are priced, and quotes for a pickup and dropoff before you create the order.',
    rows: [
      ['GET / POST', '/service-rates', 'List or create service rates'],
      ['GET / PUT / DELETE', '/service-rates/{id}', 'Get, update or delete'],
      ['GET', '/service-quotes', 'Get quotes'],
      ['GET', '/service-quotes/{id}', 'Get one quote'],
      ['GET / POST', '/purchase-rates', 'Buy a quote'],
      ['GET / POST', '/zones', 'Service areas'],
    ],
  },
  {
    id: 'tracking',
    title: 'Tracking',
    intro: 'Tracking numbers, statuses and labels.',
    rows: [
      ['GET / POST', '/tracking-numbers', 'List or create'],
      ['POST', '/tracking-numbers/from-qr', 'Resolve a scanned QR code'],
      ['GET / POST', '/tracking-statuses', 'List or add a status'],
      ['GET', '/labels/{id}', 'Shipping label'],
    ],
  },
  {
    id: 'more',
    title: 'Items, payloads and your organisation',
    intro: 'Lower-level pieces of an order, and a cheap way to check your key.',
    rows: [
      ['GET / POST', '/entities', 'Items being delivered'],
      ['GET / POST', '/payloads', 'The pickup, dropoff and items of an order'],
      ['GET', '/organizations/current', 'The organisation your key belongs to'],
      ['GET / POST', '/webhook-endpoints', 'List or register webhook endpoints'],
      ['POST', '/webhook-endpoints/{id}/rotate-secret', 'Issue a new signing secret'],
    ],
  },
];

export default function ApiReference() {
  return (
    <DocsLayout
      title="API reference"
      seoTitle="FleetOps REST API reference — Chains logistics"
      description="Chains FleetOps REST API: authentication, errors and every resource — orders, places, contacts, drivers, vehicles, fleets, service rates and quotes, tracking and webhook endpoints."
      lead="A REST API over HTTPS that answers JSON. Everything you can do in the FleetOps console, your system can do here."
      keywords={['FleetOps API reference', 'delivery API endpoints', 'logistics REST API', 'order tracking API']}
    >
      <h2>Base URL and keys</h2>
      <p>
        All endpoints live under <code>{API_BASE}</code>. Send your key in the <code>Authorization</code> header on every request.
      </p>
      <Code lang="http">{`
GET /v1/organizations/current HTTP/1.1
Host: api.progressusmavericks.co.ke
Authorization: Bearer <your API key>
Accept: application/json
`}</Code>
      <p>
        Chains issues two kinds of key: a <strong>test</strong> key for your sandbox organisation and a <strong>live</strong> key for real
        deliveries. Data created with one is not visible with the other.
      </p>

      <h2>Errors</h2>
      <p>
        Errors use normal HTTP status codes and a JSON body with an <code>errors</code> array. These two are real answers from the API:
      </p>
      <Code lang="json">{`
// 401, no key sent
{ "errors": ["Oops! No api credentials found with this request"] }

// 401, wrong or revoked key
{ "errors": ["Oops! The api credentials provided were not valid"] }
`}</Code>
      <ul className="cx-list">
        <li>
          <code>400</code> / <code>422</code>: the request is missing something or a field is not valid. Fix it before retrying.
        </li>
        <li>
          <code>401</code>: no key, or a key that is not valid.
        </li>
        <li>
          <code>404</code>: no such resource for your organisation (check you are using the right key: test or live).
        </li>
        <li>
          <code>429</code>: too many requests. Wait and retry with backoff.
        </li>
        <li>
          <code>5xx</code>: our side. Retry with backoff; tell us if it persists.
        </li>
      </ul>
      <p>
        The <code>chains.ts</code> file in the TypeScript quickstart turns every non-2xx answer into a <code>ChainsApiError</code> with{' '}
        <code>status</code> and <code>errors</code>.
      </p>

      <h2>Ids, your ids, and lists</h2>
      <ul className="cx-list">
        <li>
          Every resource has a public <code>id</code> such as <code>order_…</code>, <code>place_…</code> or <code>driver_…</code>.
        </li>
        <li>
          Put your own reference in <code>internal_id</code> and anything extra in <code>meta</code>. Both come back on every read and in
          every webhook.
        </li>
        <li>
          Lists accept <code>limit</code>, <code>page</code>, <code>sort</code> (for example <code>-created_at</code>) and{' '}
          <code>query</code> for text search.
        </li>
      </ul>

      <h2>Create an order</h2>
      <Code lang="typescript">{`
const order = await fleet.orders.create({
  internal_id: 'SO-1001',
  pickup: 'place_your_warehouse',               // id of a saved place
  dropoff: {                                     // or a new address
    name: 'Jane Wanjiru',
    street1: 'Ngong Road, Adams Arcade',
    city: 'Nairobi',
    country: 'KE',
    phone: '+254712345678',
  },
  entities: [{ name: 'Carton of 24', internal_id: 'SKU-24', weight: 12, weight_unit: 'kg' }],
  scheduled_at: '2026-11-12T09:00:00+03:00',     // leave out for as soon as possible
  notes: 'Call on arrival',
});

await fleet.orders.dispatch(order.id);
const live = await fleet.orders.tracker(order.id);
`}</Code>

      {GROUPS.map((g) => (
        <section key={g.id}>
          <h2 id={g.id}>{g.title}</h2>
          <p>{g.intro}</p>
          <div className="cx-table-wrap">
            <table className="cx-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Path (under /v1)</th>
                  <th>What it does</th>
                </tr>
              </thead>
              <tbody>
                {g.rows.map(([m, p, d]) => (
                  <tr key={m + p}>
                    <td>
                      <span className={`cx-verb ${m.split(' ')[0]!.toLowerCase()}`}>{m}</span>
                    </td>
                    <td>
                      <code>{p}</code>
                    </td>
                    <td>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <Callout title="Driver endpoints">
        The driver app also uses driver sign-in endpoints (<code>/drivers/login</code>, <code>/drivers/login-with-sms</code>,{' '}
        <code>/drivers/verify-code</code>). You only need them if you are building your own driver app; talk to us first.
      </Callout>
    </DocsLayout>
  );
}
