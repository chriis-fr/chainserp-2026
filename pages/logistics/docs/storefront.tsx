/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import DocsLayout, { ACCESS_LINK, Callout, Code, STOREFRONT_BASE } from 'components/docs/DocsLayout';
import { Icon, WhatsAppIcon } from 'components/site/Icon';

const ROUTES: [string, string, string][] = [
  ['GET', '/about', 'Your store or network details'],
  ['GET', '/products, /products/{id}', 'Catalogue, with variants and add-ons'],
  ['GET', '/categories', 'Product categories'],
  ['GET', '/search', 'Search products'],
  ['GET', '/stores, /store-locations', 'Stores in a network and their pickup locations'],
  ['GET', '/carts/{uniqueId}', 'Fetch or start a cart by your own session id'],
  ['POST', '/carts/{cartId}/{productId}', 'Add a product to a cart'],
  ['PUT', '/carts/{cartId}/{lineItemId}', 'Change a line, e.g. quantity'],
  ['DELETE', '/carts/{cartId}/{lineItemId}', 'Remove a line'],
  ['POST', '/carts/{cartId}/promo-code', 'Apply a promo code'],
  ['GET', '/service-quotes/from-cart', 'Delivery price for a cart to a customer place'],
  ['GET', '/checkouts/before', 'Start a checkout and get its token'],
  ['POST', '/checkouts/capture', 'Complete the checkout; this creates the order in FleetOps'],
  ['GET', '/checkouts/status', 'Check a checkout'],
  ['POST', '/customers, /customers/login, /customers/login-with-sms, /customers/verify-code', 'Customer sign-up and sign-in'],
  ['GET', '/customers/orders, /customers/places', "A signed-in customer's orders and saved addresses"],
  ['GET', '/reviews, /promotions, /notifications', 'Reviews, running promotions, customer notifications'],
];

export default function StorefrontDocs() {
  return (
    <DocsLayout
      title="Storefront: a shop that delivers"
      seoTitle="Chains Storefront — online ordering with delivery, built on FleetOps"
      description="The Chains Storefront is an online shop with delivery and pickup checkout, live delivery quotes and order tracking, backed by FleetOps. We set it up for you, or you build on the Storefront API."
      lead="If you sell and deliver but don't have an online shop yet, we set one up for you. Every checkout becomes a FleetOps delivery order, with no copying between systems."
      keywords={['online ordering Kenya', 'delivery storefront', 'e-commerce with delivery', 'Storefront API', 'Fleetbase Storefront']}
    >
      <h2>What you get</h2>
      <div className="cx-cards">
        <div className="cx-card">
          <h3>
            <Icon name="till" /> The hosted shop
          </h3>
          <ul>
            <li>Catalogue, search and product pages, with variants and add-ons</li>
            <li>Cart, promo codes and checkout for delivery or pickup</li>
            <li>Live delivery quotes at checkout, priced from your service rates</li>
            <li>Customer accounts with sign-in by SMS code, and order history</li>
            <li>Your own theme and branding, and SEO-ready pages</li>
          </ul>
        </div>
        <div className="cx-card">
          <h3>
            <Icon name="truck" /> Behind it: FleetOps
          </h3>
          <ul>
            <li>Products, stores, customers and orders managed in the FleetOps console</li>
            <li>Each paid checkout lands as a delivery order, ready to dispatch</li>
            <li>Drivers get the job in the Fleetbase Navigator app and capture proof of delivery</li>
            <li>Customers follow their order until it arrives</li>
          </ul>
        </div>
      </div>
      <Callout title="We set it up for you">
        Send us your business name, logo, products (a spreadsheet is fine) and where you deliver from. We create your store, connect
        payments and delivery rates, and hand you the console logins.
      </Callout>

      <h2>Build your own front end on the Storefront API</h2>
      <p>
        Prefer your own website or app? Use the same API the hosted shop uses. Base URL <code>{STOREFRONT_BASE}</code>, authenticated with a{' '}
        <strong>Store key</strong> we send you for your store. It starts with <code>store_</code> and goes in the{' '}
        <code>Authorization: Bearer</code> header, like an API key. A wrong key answers <code>401</code> with{' '}
        <code>{'"Oops! The Storefront key provided was not valid"'}</code>. If a Store key leaks, tell us: we rotate it, and the old one
        stops working.
      </p>
      <Callout tone="warn" title="The Store key stays on your server">
        Call the Storefront API from your backend (or server-side route handlers) and let your browser talk to your backend. Our hosted
        shop works this way: a server-side proxy keeps the key private.
      </Callout>
      <div className="cx-table-wrap">
        <table className="cx-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            {ROUTES.map(([m, p, d]) => (
              <tr key={p}>
                <td>
                  <span className={`cx-verb ${m.toLowerCase()}`}>{m}</span>
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

      <h3>Example: list products and add one to a cart</h3>
      <Code lang="typescript">{`
// store comes from chains.ts in the TypeScript quickstart (server-side only, key in CHAINS_STORE_KEY)
import { store } from './chains';

const products = await store.get('products', { limit: 12 });
const cart = await store.get(\`carts/\${sessionId}\`); // your own session id
await store.post(\`carts/\${cart.id}/\${products[0].id}\`, { quantity: 2 });
`}</Code>
      <Code lang="curl">{`
curl ${STOREFRONT_BASE}/products?limit=12 \\
  -H "Authorization: Bearer $CHAINS_STORE_KEY"
`}</Code>

      <div className="cx-cta">
        <a className="cx-btn cx-btn-primary" href={ACCESS_LINK} target="_blank" rel="noopener">
          <WhatsAppIcon /> Ask for a Storefront
        </a>
      </div>
    </DocsLayout>
  );
}
