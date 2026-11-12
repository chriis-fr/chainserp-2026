/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import { FormEvent, useEffect, useRef, useState } from 'react';
import DocsLayout, { Callout, WHATSAPP_ACCESS } from 'components/docs/DocsLayout';
import { WhatsAppIcon } from 'components/site/Icon';

type Kind = 'api' | 'storefront' | 'both';

const KINDS: { value: Kind; label: string; hint: string }[] = [
  { value: 'api', label: 'Delivery API', hint: 'Create and track deliveries from your own system.' },
  { value: 'storefront', label: 'Storefront', hint: 'An online shop with delivery or pickup checkout.' },
  { value: 'both', label: 'Both', hint: 'Your own system and a Storefront.' },
];

export default function RequestAccess() {
  const startedAt = useRef(0);
  const [kind, setKind] = useState<Kind>('api');
  const [browser, setBrowser] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const [sentTo, setSentTo] = useState('');

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const f = new FormData(e.currentTarget);
    const body: Record<string, unknown> = Object.fromEntries(f.entries());
    body.kind = kind;
    body.startedAt = startedAt.current;
    if (!browser) delete body.browserOrigin;
    setState('sending');
    try {
      const res = await fetch('/api/api-access-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || 'We could not send your request. Please try again.');
      setSentTo(String(body.email ?? ''));
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not send your request. Please try again.');
      setState('idle');
    }
  };

  return (
    <DocsLayout
      title="Request access"
      seoTitle="Request Chains FleetOps API or Storefront access"
      description="Ask Chains for a FleetOps delivery API or Storefront test key. Tell us what you're building; we review every request and reply by email."
      lead="Tell us who you are and what you're building. We review every request, reply by email, and set up your test organisation and key."
      keywords={['delivery API access', 'request API key', 'FleetOps test key', 'Storefront key']}
    >
      <h2>What happens next</h2>
      <ol className="cx-list">
        <li>We review your request, usually within a working day.</li>
        <li>If it's a fit, we email you, create your test organisation and send your test key.</li>
        <li>You build against the test key. When a test delivery passes end to end, we issue your live key.</li>
      </ol>

      <h2>Your request</h2>
      {state === 'sent' ? (
        <div className="dx-sent" role="status">
          <b>Thanks, we have your request.</b>
          <p>
            We'll reply to <strong>{sentTo}</strong>. While you wait, read <a href="/logistics/docs/integrate">Connect your system</a> and{' '}
            <a href="/logistics/docs/security">Security and limits</a>.
          </p>
        </div>
      ) : (
        <form className="dx-form" onSubmit={submit} noValidate={false}>
          <div className="dx-row">
            <label>
              <span>Your name</span>
              <input name="name" required minLength={2} maxLength={80} autoComplete="name" />
            </label>
            <label>
              <span>Business name</span>
              <input name="business" required minLength={2} maxLength={120} autoComplete="organization" />
            </label>
          </div>
          <div className="dx-row">
            <label>
              <span>Work email</span>
              <input name="email" type="email" required maxLength={254} autoComplete="email" />
            </label>
            <label>
              <span>
                Phone <small>optional</small>
              </span>
              <input name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="+254 7…" />
            </label>
          </div>

          <fieldset>
            <legend>What do you need?</legend>
            <div className="dx-kinds">
              {KINDS.map((k) => (
                <label key={k.value} className={kind === k.value ? 'on' : ''}>
                  <input type="radio" name="kind-choice" checked={kind === k.value} onChange={() => setKind(k.value)} />
                  <b>{k.label}</b>
                  <small>{k.hint}</small>
                </label>
              ))}
            </div>
          </fieldset>

          <label>
            <span>What are you building?</span>
            <textarea
              name="building"
              required
              minLength={10}
              maxLength={1500}
              rows={4}
              placeholder="e.g. Our shop app needs to book riders for same-day deliveries in Nairobi and show customers where their order is."
            />
          </label>

          <label>
            <span>
              Website <small>optional</small>
            </span>
            <input name="website" type="url" maxLength={200} placeholder="https://" />
          </label>

          <label className="dx-check">
            <input type="checkbox" checked={browser} onChange={(e) => setBrowser(e.target.checked)} />
            <span>We need to call the API from a browser (not recommended)</span>
          </label>
          {browser && (
            <label>
              <span>The exact https address you'll call from</span>
              <input name="browserOrigin" maxLength={200} placeholder="https://shop.example.co.ke" />
              <small className="dx-help-text">
                One exact address. Your key still protects your data; see <a href="/logistics/docs/security">Security and limits</a>.
              </small>
            </label>
          )}

          {/* Left empty by people; filled by bots. */}
          <div aria-hidden="true" className="dx-hp">
            <label>
              Company website
              <input name="company_site" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {error && (
            <p className="dx-error" role="alert">
              {error}
            </p>
          )}
          <div className="dx-actions">
            <button className="cx-btn cx-btn-primary" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send request'}
            </button>
            <a className="cx-btn cx-btn-quiet" href={WHATSAPP_ACCESS} target="_blank" rel="noopener">
              <WhatsAppIcon /> Or ask on WhatsApp
            </a>
          </div>
        </form>
      )}

      <Callout tone="info" title="Never send us a key">
        We send keys to you; you never need to send one back. If anyone asks you for a key in our name, tell us.
      </Callout>
    </DocsLayout>
  );
}
