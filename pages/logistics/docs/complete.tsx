/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DocsLayout, { Callout } from 'components/docs/DocsLayout';

type Details = { pickupAddresses: string[]; zones: string; webhookUrl: string | null; techName: string; techEmail: string };
type Loaded = { business: string; name: string; email: string; phone: string | null; kind: string; details: Details | null; missing: string[] };

/**
 * Opened from the link in our approval email: the business tells us what we still need
 * (pickups, zones, webhook, technical contact). Saving puts pickups and the webhook straight
 * into their FleetOps company.
 */
export default function CompleteDetails() {
  const router = useRouter();
  const token = typeof router.query.token === 'string' ? router.query.token : '';
  const [data, setData] = useState<Loaded | null>(null);
  const [error, setError] = useState('');
  const [state, setState] = useState<'loading' | 'idle' | 'saving' | 'saved'>('loading');

  useEffect(() => {
    if (!router.isReady) return;
    if (!token) {
      setError('This link is incomplete. Open it again from our email.');
      setState('idle');
      return;
    }
    fetch(`/api/api-access-details?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || j.message || 'This link has expired. Reply to our email and we will send a new one.');
        setData(j as Loaded);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Something went wrong.'))
      .finally(() => setState('idle'));
  }, [router.isReady, token]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState('saving');
    try {
      const r = await fetch('/api/api-access-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, token }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || j.message || 'We could not save that. Please try again.');
      setData(j as Loaded);
      setState('saved');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not save that. Please try again.');
      setState('idle');
    }
  };

  const d = data?.details;
  return (
    <DocsLayout
      title="Complete your details"
      seoTitle="Complete your Chains Logistics details"
      description="Tell Chains what it needs to set up your deliveries."
      lead={data ? `For ${data.business}. Two minutes, and we set it up in FleetOps for you.` : 'Two minutes, and we set it up in FleetOps for you.'}
      keywords={[]}
    >
      {state === 'loading' ? <p>Loading…</p> : null}

      {state === 'saved' && data ? (
        <div className="dx-sent" role="status">
          <b>{data.missing.length ? 'Saved. A little more to go.' : 'Thanks, that is everything we need.'}</b>
          <p>
            {data.missing.length
              ? `Still missing: ${data.missing.join('; ')}.`
              : 'Your pickups and webhook are being set up in FleetOps. Build against your test key, and reply to our email when a test delivery passes.'}
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="dx-error" role="alert">
          {error}
        </p>
      ) : null}

      {data && state !== 'saved' ? (
        <form className="dx-form" onSubmit={submit}>
          {data.missing.length ? (
            <Callout tone="info" title="What we still need">
              {data.missing.join('; ')}.
            </Callout>
          ) : null}

          <label>
            <span>Phone</span>
            <input name="phone" type="tel" maxLength={30} defaultValue={data.phone ?? ''} placeholder="+254 7…" required />
          </label>
          <label>
            <span>Pickup addresses</span>
            <textarea
              name="pickupAddresses"
              rows={3}
              maxLength={2000}
              defaultValue={d?.pickupAddresses?.join('\n') ?? ''}
              placeholder={'One per line, e.g.\nGodown 4, Mombasa Road, Nairobi'}
              required
            />
          </label>
          <label>
            <span>Delivery zones and prices</span>
            <textarea
              name="zones"
              rows={3}
              maxLength={1500}
              defaultValue={d?.zones ?? ''}
              placeholder="e.g. CBD 200, Westlands 300, Karen 450, outside Nairobi on request"
              required
            />
          </label>
          {data.kind !== 'storefront' ? (
            <label>
              <span>Webhook URL</span>
              <input name="webhookUrl" type="url" maxLength={300} defaultValue={d?.webhookUrl ?? ''} placeholder="https://your-system.co.ke/hooks/chains" required />
              <small className="dx-help-text">Where we tell your system about each delivery update. It must start with https://</small>
            </label>
          ) : null}
          <div className="dx-row">
            <label>
              <span>Technical contact</span>
              <input name="techName" maxLength={80} defaultValue={d?.techName ?? ''} placeholder="Name" required />
            </label>
            <label>
              <span>Their email</span>
              <input name="techEmail" type="email" maxLength={254} defaultValue={d?.techEmail ?? ''} required />
            </label>
          </div>
          <div className="dx-actions">
            <button className="cx-btn cx-btn-primary" type="submit" disabled={state === 'saving'}>
              {state === 'saving' ? 'Saving…' : 'Save details'}
            </button>
          </div>
        </form>
      ) : null}
    </DocsLayout>
  );
}
