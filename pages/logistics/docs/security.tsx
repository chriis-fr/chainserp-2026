/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import DocsLayout, { ACCESS_LINK, API_BASE, Callout, Code } from 'components/docs/DocsLayout';

const KEYS: [string, string, string][] = [
  ['Test key', 'Your sandbox organisation', 'Build and try everything. Test data never mixes with live data.'],
  ['Live key', 'Your live organisation', 'Real orders and deliveries. Issued once a test delivery passes end to end.'],
  ['Store key', 'One Storefront', 'Products, carts and checkout for that store. Starts with store_.'],
  ['Webhook secret', 'One webhook endpoint', 'Proves each event came from us. Shown once, when the endpoint is created.'],
];

export default function SecurityDocs() {
  return (
    <DocsLayout
      title="Security and limits"
      seoTitle="FleetOps API security, rate limits and allowed domains"
      description="How Chains FleetOps API access works: keys issued per organisation, test and live separation, rate limits and the X-RateLimit headers, calling from a browser and allowing a domain, and what to do if a key leaks."
      lead="Anyone can read these docs, but nothing works without a key, and only Chains issues keys. This page covers how access is controlled, the limits every key works within, and how to keep your keys safe."
      keywords={['API rate limits', 'X-RateLimit-Remaining', 'CORS allowed origins', 'API key security', 'delivery API security']}
    >
      <h2>How access works</h2>
      <p>
        There is no self-serve sign-up. We create an organisation for each business we work with and issue its keys ourselves, so
        every key belongs to a known business. A key only ever reaches its own organisation: you can never see another business's
        orders, drivers or customers, and nobody else can see yours. A request without a valid key is refused with{' '}
        <code>401</code>.
      </p>
      <div className="cx-table-wrap">
        <table className="cx-table">
          <thead>
            <tr>
              <th>What we issue</th>
              <th>Works on</th>
              <th>Use it for</th>
            </tr>
          </thead>
          <tbody>
            {KEYS.map(([k, on, use]) => (
              <tr key={k}>
                <td>
                  <b>{k}</b>
                </td>
                <td>{on}</td>
                <td>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Keep keys on your server</h2>
      <p>
        Keys can create orders and read customer details, so treat them like a password. Keep them in server environment variables.
        Never put a key in a website's code, a mobile app or a public repository: anything shipped to a browser or a phone can be read
        by whoever has it.
      </p>
      <Callout tone="warn" title="Building a website or app?">
        Let your browser or app talk to your own backend, and let your backend call Chains with the key. Your users never see it.
      </Callout>
      <Code lang="typescript">{`
// app/api/orders/[id]/route.ts (Next.js): your page calls this, never Chains directly
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  // Check here that the signed-in customer owns this order before looking it up.
  const res = await fetch(\`${API_BASE}/orders/\${encodeURIComponent(params.id)}\`, {
    headers: { Authorization: \`Bearer \${process.env.CHAINS_LOGISTICS_KEY}\` }, // stays on the server
  });
  if (!res.ok) return new Response('Not found', { status: res.status });
  const order = await res.json();
  // Send the browser only what it needs, not the whole order.
  return Response.json({ status: order.status });
}
`}</Code>

      <h2>Rate limits</h2>
      <p>
        Every key works within a request limit, so one busy or broken client cannot slow the service for everyone. Each response tells
        you where you stand:
      </p>
      <ul className="cx-list">
        <li>
          <code>X-RateLimit-Limit</code>: how many requests you can make in the current window.
        </li>
        <li>
          <code>X-RateLimit-Remaining</code>: how many are left.
        </li>
        <li>
          Over the limit, you get <code>429 Too Many Requests</code>. Wait, then retry with backoff. Retrying in a tight loop only
          keeps you limited.
        </li>
      </ul>
      <Code lang="typescript">{`
// Retry 429s with exponential backoff: 1s, 2s, 4s, then give up and alert
async function withBackoff(call: () => Promise<Response>, tries = 4): Promise<Response> {
  for (let i = 0; ; i++) {
    const res = await call();
    if (res.status !== 429 || i === tries - 1) return res;
    const wait = Number(res.headers.get('retry-after')) * 1000 || 1000 * 2 ** i;
    await new Promise((r) => setTimeout(r, wait));
  }
}
`}</Code>
      <p>
        Polling for order status is the most common way to hit the limit. Use <a href="/logistics/docs/webhooks">webhooks</a> instead
        and we tell you when something changes. If you need a higher limit for real volume, ask us.
      </p>

      <h2>Calling from a browser and allowing a domain</h2>
      <p>
        Browsers only let a website call the API if that website's address is on our allowed list, and the list is closed by default.
        Server-to-server calls, the recommended setup above, need nothing added.
      </p>
      <p>
        If you have a real need to call from the browser, for example a Storefront page, ask us to allow your exact address, such as{' '}
        <code>https://shop.example.co.ke</code>. We add exact HTTPS addresses only: no wildcards and no local addresses on live.
      </p>
      <Callout tone="info" title="Allowing a domain is not a password">
        It tells browsers the call is permitted, nothing more. Scripts and servers ignore it, so your key is still what protects your
        data, and a key used in the browser is visible to anyone who opens the page.
      </Callout>

      <h2>Webhooks are signed</h2>
      <p>
        Every webhook carries an <code>X-Fleetbase-Signature</code> header. Check it before trusting the body, and reject anything
        that fails or is more than a few minutes old. Endpoints must be public HTTPS addresses; private and local addresses are
        refused. The <a href="/logistics/docs/webhooks">Webhooks</a> page has the verification code.
      </p>

      <h2>If a key leaks</h2>
      <ol className="cx-list">
        <li>Tell us straight away on WhatsApp or at hello@chains-erp.com.</li>
        <li>We revoke the key and issue a new one. The old key stops working at once.</li>
        <li>Update your server's environment variable and redeploy.</li>
        <li>For a webhook secret, rotate it yourself: <code>POST /webhook-endpoints/{'{id}'}/rotate-secret</code>.</li>
      </ol>

      <h2>Checklist before going live</h2>
      <ul className="cx-list">
        <li>Keys and secrets are in server environment variables, not in code.</li>
        <li>No key appears in your website, mobile app or repository.</li>
        <li>You retry 429s with backoff and use webhooks rather than polling.</li>
        <li>Your webhook receiver checks the signature and the timestamp.</li>
        <li>You know who on your team holds the keys, and how to tell us if one leaks.</li>
      </ul>
      <p>
        <a href={ACCESS_LINK}>
          Request keys or a higher limit
        </a>
        .
      </p>
    </DocsLayout>
  );
}
