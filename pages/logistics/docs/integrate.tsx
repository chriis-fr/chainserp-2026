/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import DocsLayout, { ACCESS_LINK, API_BASE, Callout, Code } from 'components/docs/DocsLayout';
import { Icon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

const NEED: { title: string; detail: string }[] = [
  { title: 'Company and an operations contact', detail: 'Legal name, trading name, and the person we talk to about deliveries day to day (name, phone, email).' },
  { title: 'A technical contact', detail: 'Who builds the integration on your side, and who should receive the keys. Keys only go to that person.' },
  { title: 'Your system', detail: 'What you run (ERP, e-commerce platform, order management system or your own app) and the language it is written in.' },
  { title: 'Pickup locations', detail: 'Your warehouses, branches or stores: name, address, phone and, if you have them, coordinates. We save them as places so orders can refer to them by id.' },
  { title: 'Your drop-off address format', detail: 'How customer addresses look in your system (street, area, city, landmark, coordinates, phone). Send two or three real examples with personal details removed.' },
  { title: 'The order fields you need', detail: 'What travels with a delivery: items, weights, sizes, notes, cash to collect, delivery windows.' },
  { title: 'Your own ids', detail: 'Your order number (we store it as internal_id) and anything else you want echoed back on every read and webhook (we store it in meta).' },
  { title: 'Webhook endpoint', detail: 'The HTTPS URL that should receive order events, and which events you want (all, or a list such as order.dispatched and order.completed).' },
  { title: 'IP allowlist, if you use one', detail: 'If your firewall only accepts known senders, tell us and we will confirm the addresses webhooks come from.' },
  { title: 'Dates', detail: 'When you want to start testing, and your target go-live date.' },
];

const GIVE: { title: string; detail: string }[] = [
  { title: 'A sandbox organisation', detail: 'Your own FleetOps organisation in test mode, with your pickup places saved.' },
  { title: 'A test API key', detail: 'Build and test against the real API without dispatching real drivers.' },
  { title: 'Console logins', detail: 'For your operations team, to watch orders on the map, dispatch and manage drivers and vehicles.' },
  { title: 'Webhook signing secret', detail: 'For each endpoint we register, so you can verify every delivery is from us.' },
  { title: 'A live API key', detail: 'After one test order goes through end to end and we both sign off.' },
  { title: 'Support', detail: 'A WhatsApp line and email for integration questions and day-to-day issues.' },
];

export default function IntegratePage() {
  return (
    <DocsLayout
      title="Connect your own system to FleetOps"
      seoTitle="Integrate your ERP or shop with Chains FleetOps logistics"
      description="Already have an ERP, e-commerce or order system? Connect it to Chains FleetOps with our REST API and signed webhooks. What we need from you, what we give you, and the go-live checklist."
      lead="Keep the system you run today. Your system creates delivery orders in FleetOps, and FleetOps tells your system what happens to them."
      keywords={['ERP delivery integration', 'e-commerce delivery API Kenya', 'logistics integration', 'order management delivery webhook']}
    >
      <h2>How the connection works</h2>
      <ol className="cx-steps">
        <li>
          <b>Your system creates an order</b> with <code>POST /v1/orders</code> when a sale needs delivering: pickup, dropoff, items and
          your own order number.
        </li>
        <li>
          <b>FleetOps dispatches it</b> to a driver, automatically or from the console, and the driver works it in the Fleetbase Navigator app on their phone.
        </li>
        <li>
          <b>We call your webhook</b> on each change (<code>order.dispatched</code>, <code>order.started</code>,{' '}
          <code>order.completed</code> and so on), signed so you can trust it.
        </li>
        <li>
          <b>You update your records</b>: mark the sale delivered, notify the customer, or reconcile cash.
        </li>
      </ol>

      <h2>What we need from you</h2>
      <p>Send these on WhatsApp or email. The more of it you have on day one, the faster we get you a test key.</p>
      <ul className="cx-check">
        {NEED.map((n) => (
          <li key={n.title}>
            <Icon name="check" />
            <span>
              <strong>{n.title}.</strong> {n.detail}
            </span>
          </li>
        ))}
      </ul>

      <h2>What we give you</h2>
      <ul className="cx-check">
        {GIVE.map((n) => (
          <li key={n.title}>
            <Icon name="check" />
            <span>
              <strong>{n.title}.</strong> {n.detail}
            </span>
          </li>
        ))}
      </ul>
      <Callout tone="warn" title="Keep keys on your server">
        API keys and Store keys can create orders and read customer details. Store them as server environment variables, never in a
        browser, mobile app or public repository. If a key leaks, tell us and we will revoke it and issue a new one.
      </Callout>

      <h2>Your first order</h2>
      <p>
        Pickup can be the id of a saved place; dropoff can be a full address that FleetOps saves for you. Put your own order number in{' '}
        <code>internal_id</code>.
      </p>
      <Code lang="typescript">{`
// chains.ts is the one file from the TypeScript quickstart; CHAINS_LOGISTICS_KEY holds your test key while you build
import { fleet, ChainsApiError } from './chains';

export async function sendToFleetOps(sale: { number: string; customer: { name: string; phone: string }; address: string; items: { sku: string; name: string; qty: number }[] }) {
  try {
    const order = await fleet.post('orders', {
      internal_id: sale.number,
      pickup: 'place_your_warehouse', // from us, after we save your pickup locations
      dropoff: { name: sale.customer.name, street1: sale.address, city: 'Nairobi', country: 'KE', phone: sale.customer.phone },
      entities: sale.items.map((i) => ({ name: \`\${i.qty} × \${i.name}\`, internal_id: i.sku })),
      meta: { source: 'my-erp' },
    });
    return order.id; // keep it next to your sale
  } catch (e) {
    if (e instanceof ChainsApiError) console.error('FleetOps refused the order', e.status, e.errors);
    throw e;
  }
}
`}</Code>
      <Code lang="curl">{`
curl -X POST ${API_BASE}/orders \\
  -H "Authorization: Bearer $CHAINS_LOGISTICS_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "internal_id": "SO-1001",
    "pickup": "place_your_warehouse",
    "dropoff": { "street1": "Ngong Road", "city": "Nairobi", "country": "KE", "phone": "+254712345678" },
    "entities": [ { "name": "Carton of 24", "internal_id": "SKU-24" } ]
  }'
`}</Code>

      <h2>Hear back about it</h2>
      <p>
        Give us your endpoint URL and we register it, or create it yourself with <code>POST /v1/webhook-endpoints</code>. Then verify
        and handle events as shown in <NextLink href="/logistics/docs/webhooks">Webhooks</NextLink>.
      </p>

      <h2>Go-live checklist</h2>
      <ul className="cx-check">
        {[
          'A test order created from your system shows in the FleetOps console with your internal_id.',
          'Your webhook endpoint answers 2xx quickly and rejects deliveries with a bad signature.',
          'Your system handles order.completed, order.canceled and order.failed, not only the happy path.',
          'Retries are safe: the same event arriving twice does not double-update your records (use the event id).',
          'Keys and the signing secret live in server environment variables.',
          'We have switched your organisation to live and sent the live key to your technical contact.',
        ].map((t) => (
          <li key={t}>
            <Icon name="check" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="cx-cta">
        <a className="cx-btn cx-btn-primary" href={ACCESS_LINK}>
          Request a test key <Icon name="arrow" />
        </a>
        <a className="cx-btn cx-btn-quiet" href={LINKS.calendly} target="_blank" rel="noopener">
          Book a 30-minute call
        </a>
      </div>
    </DocsLayout>
  );
}
