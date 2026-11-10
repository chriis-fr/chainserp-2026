/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import DocsLayout, { ACCESS_LINK, API_BASE, Callout, Code } from 'components/docs/DocsLayout';
import { Icon, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

export default function LogisticsDocsHome() {
  return (
    <DocsLayout
      title="Chains FleetOps developer docs"
      seoTitle="Logistics API & integration docs — Chains FleetOps"
      description="Connect your ERP, shop or order system to Chains FleetOps: REST API for orders, places, drivers and vehicles, signed webhooks, a hosted Storefront, and a copy-paste TypeScript quickstart. Keys are issued by Chains."
      lead="Everything you need to run deliveries on Chains FleetOps: start from scratch with our console and storefront, or plug your own system into our API and webhooks."
      keywords={['Chains FleetOps API', 'logistics API Kenya', 'delivery API', 'fleet management API', 'order tracking webhooks', 'logistics API TypeScript', 'Fleetbase API']}
    >
      <h2>Two ways to start</h2>
      <div className="cx-cards">
        <NextLink className="cx-card" href="/logistics/docs/storefront">
          <h3>
            <Icon name="till" /> A. You don't have a system yet
          </h3>
          <p>We give you the whole stack, set up for your business:</p>
          <ul>
            <li>The FleetOps console for orders, dispatch, drivers and vehicles</li>
            <li>A Storefront: online shop or ordering page with delivery and pickup checkout</li>
            <li>A driver app so your riders get jobs and capture proof of delivery</li>
          </ul>
          <span className="cx-link">
            See the Storefront <Icon name="arrow" />
          </span>
        </NextLink>
        <NextLink className="cx-card" href="/logistics/docs/integrate">
          <h3>
            <Icon name="globe" /> B. You already have a system
          </h3>
          <p>Keep your ERP, e-commerce or order system. Connect it to FleetOps:</p>
          <ul>
            <li>Create delivery orders from your system through the REST API</li>
            <li>Get signed webhooks back as orders are dispatched, picked up and delivered</li>
            <li>Use your own order numbers end to end</li>
          </ul>
          <span className="cx-link">
            How to connect <Icon name="arrow" />
          </span>
        </NextLink>
      </div>

      <h2>How access works</h2>
      <Callout title="Keys come from Chains">
        There is no self-serve sign-up yet. We create your organisation on FleetOps and send you a <strong>test key</strong> to build
        against. Once a test delivery passes end to end, we issue your <strong>live key</strong> and webhook signing secret. Keys are
        for your server only, never for a browser or mobile app.
      </Callout>
      <ol className="cx-steps">
        <li>
          <b>Tell us about your deliveries</b> on WhatsApp or by email: company, what you deliver, from where, and the system you use.
        </li>
        <li>
          <b>We set you up</b>: your organisation, console logins, a test key and, if you need it, your Storefront.
        </li>
        <li>
          <b>You build and test</b> with the API reference, the webhooks guide and the TypeScript quickstart.
        </li>
        <li>
          <b>We sign off and go live</b> with a live key and your webhook endpoint registered.
        </li>
      </ol>
      <div className="cx-cta">
        <a className="cx-btn cx-btn-primary" href={ACCESS_LINK} target="_blank" rel="noopener">
          <WhatsAppIcon /> Request access
        </a>
        <a className="cx-btn cx-btn-quiet" href={LINKS.email}>
          hello@chains-erp.com
        </a>
      </div>

      <h2>The API in one minute</h2>
      <p>
        Base URL <code>{API_BASE}</code>. Send your key as a bearer token. Every resource answers JSON.
      </p>
      <Code lang="curl">{`
curl ${API_BASE}/orders?limit=5 \\
  -H "Authorization: Bearer $CHAINS_LOGISTICS_KEY"
`}</Code>
      <Code lang="typescript">{`
// fleet comes from chains.ts, the one file in the TypeScript quickstart
import { fleet } from './chains';

const order = await fleet.post('orders', {
  internal_id: 'SO-1001',
  pickup: 'place_your_warehouse',
  dropoff: { street1: 'Ngong Road', city: 'Nairobi', country: 'KE', phone: '+254712345678' },
  driver: 'driver_…',                           // dispatch needs a driver; leave out and we dispatch for you
});
await fleet.post(\`orders/\${order.id}/dispatch\`); // only once a driver is assigned
`}</Code>

      <h2>In these docs</h2>
      <div className="cx-cards">
        <NextLink className="cx-card" href="/logistics/docs/integrate">
          <h3>
            <Icon name="globe" /> Connect your system
          </h3>
          <p>What we need from you, what we give you, and the go-live checklist.</p>
        </NextLink>
        <NextLink className="cx-card" href="/logistics/docs/storefront">
          <h3>
            <Icon name="till" /> Storefront
          </h3>
          <p>The hosted shop we set up for you, and the Storefront API behind it.</p>
        </NextLink>
        <NextLink className="cx-card" href="/logistics/docs/api">
          <h3>
            <Icon name="file" /> API reference
          </h3>
          <p>Authentication, errors, and every resource: orders, places, drivers, vehicles and more.</p>
        </NextLink>
        <NextLink className="cx-card" href="/logistics/docs/webhooks">
          <h3>
            <Icon name="spark" /> Webhooks
          </h3>
          <p>Order events pushed to your server, and how to verify each signature.</p>
        </NextLink>
        <NextLink className="cx-card" href="/logistics/docs/typescript">
          <h3>
            <Icon name="receipt" /> TypeScript quickstart
          </h3>
          <p>One file to copy into your project: fetch, your API key and webhook checks. Nothing to install.</p>
        </NextLink>
        <a className="cx-card" href={`${LINKS.logistics}/auth`} target="_blank" rel="noopener">
          <h3>
            <Icon name="truck" /> FleetOps console
          </h3>
          <p>Sign in to manage orders, dispatch, drivers and vehicles on the live map.</p>
        </a>
      </div>
    </DocsLayout>
  );
}
