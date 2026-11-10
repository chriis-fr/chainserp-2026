/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import { useState } from 'react';
import Page from 'components/Page';
import { Icon, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

// Same figures as app.chains-erp.com/plans (and src/data/billingPlans.ts in the app). Change them there first.
type Plan = {
  name: string;
  tag?: string;
  usd: string;
  kes: string;
  per: string;
  text: string;
  points: string[];
  cta: { label: string; href: string; wa?: boolean };
  hl?: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Full Suite',
    tag: 'For a bar or restaurant',
    usd: '$125',
    kes: 'KES 16,200',
    per: '/ month',
    text: 'Invoices, bills, treasury and payroll for all your staff.',
    points: ['5 people log in (more at $19 each)', 'Payroll for every employee', 'Supplier bills with approvals', 'Invoices in 50+ currencies'],
    cta: { label: 'Start free', href: LINKS.signUp },
    hl: true,
  },
  {
    name: 'Chains POS',
    usd: 'Ask us',
    kes: 'Ask us',
    per: '',
    text: 'Switched on by request. We connect your existing M-Pesa paybill or till, printers and tablets.',
    points: ['Tables, waiter mode, kitchen and bar screens', 'Keeps payments if the Wi-Fi drops', 'Android tablets and network printers'],
    cta: { label: 'Ask on WhatsApp', href: LINKS.whatsappTill, wa: true },
  },
  {
    name: 'Payroll',
    usd: 'from $29',
    kes: 'about KES 3,800',
    per: '/ month',
    text: 'Up to 20 employees. Above 20: $49 a month plus $9 for each employee over 20.',
    points: ['Weekly to monthly runs', 'Everyone paid in one approval', 'Advances, bonuses, tips and deductions'],
    cta: { label: 'Start free', href: LINKS.signUp },
  },
  {
    name: 'Treasury',
    usd: 'from $27',
    kes: 'about KES 3,500',
    per: '/ month',
    text: 'Batch payments and supplier bills, 3 users.',
    points: ['Bills: approve, then pay', 'One pool for several branches', 'Payments out need your passcode'],
    cta: { label: 'Start free', href: LINKS.signUp },
  },
  {
    name: 'Invoices',
    usd: 'from $14',
    kes: 'about KES 1,800',
    per: '/ month',
    text: '100 invoices a month, 1 user.',
    points: ['50+ currencies', 'Pay now button by M-Pesa', 'Marks itself paid'],
    cta: { label: 'Start free', href: LINKS.signUp },
  },
  {
    name: 'Chains AI',
    tag: 'Beta',
    usd: '+ $20',
    kes: '+ about KES 2,600',
    per: '/ month',
    text: 'The assistant on WhatsApp and in the app, on top of a paid plan. By request.',
    points: ['Answers from your own records', 'Prepares payments for you to approve', 'Never moves money without your passcode'],
    cta: { label: 'See Chains AI', href: LINKS.ai },
  },
];

const FAQ = [
  {
    q: 'How do I get set up?',
    a: "Send us your business name on WhatsApp. We switch on Chains POS for your workspace and connect your existing paybill or till number. You load your menu and stock list by pasting it or from a CSV or Excel file, and add your staff from a CSV file.",
  },
  {
    q: 'What do I need at the counter?',
    a: 'Nothing new. Chains POS runs on Android tablets or a browser and prints to the receipt printers already on your network. Orders show on the kitchen and bar screens.',
  },
  {
    q: 'Does it work with my own M-Pesa paybill or till number?',
    a: 'Yes, at the counter. Payments taken at the POS land in Chains with the M-Pesa code attached. On invoices, the Pay now button collects by M-Pesa into your Chains treasury, less a fee, and the invoice marks itself paid.',
  },
  {
    q: 'Can the assistant move money without me?',
    a: 'No. A payment out needs your treasury passcode. On WhatsApp you enter it on a one-time link that expires; in the app you enter it on the confirmation card.',
  },
  {
    q: 'Does Chains issue KRA eTIMS invoices?',
    a: 'Not yet. Keep issuing tax invoices from your eTIMS system for now; Chains runs your payments, payroll, bills and POS alongside it.',
  },
  {
    q: 'What about FleetOps logistics?',
    a: 'FleetOps is set up per business. Message us on WhatsApp with the size of your fleet and we will tell you what it costs.',
  },
];

export default function PricingPage() {
  const [cur, setCur] = useState<'usd' | 'kes'>('usd');
  return (
    <Page
      eyebrow="Pricing"
      title="Pay for what you use."
      description="Full Suite covers invoices, bills, treasury and payroll for about KES 16,200 a month. Chains POS is switched on by request. 15 days free, no card."
    >
      <div className="cx">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <span className="cx-eyebrow">Plans</span>
          <div className="cx-cur" role="group" aria-label="Currency">
            <button type="button" aria-pressed={cur === 'usd'} onClick={() => setCur('usd')}>
              US dollars
            </button>
            <button type="button" aria-pressed={cur === 'kes'} onClick={() => setCur('kes')}>
              Kenyan shillings
            </button>
          </div>
        </div>

        <div className="cx-plans">
          {PLANS.map((p) => (
            <div className={`cx-plan${p.hl ? ' hl' : ''}`} key={p.name}>
              <h3>
                {p.name} {p.tag && <span className={`cx-st ${p.tag === 'Beta' ? 'wait' : 'info'}`}>{p.tag}</span>}
              </h3>
              <div className="cx-amt">
                {cur === 'usd' ? p.usd : p.kes} <small>{p.per}</small>
              </div>
              <p>{p.text}</p>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="check" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <a
                className={`cx-btn cx-btn-sm ${p.hl ? 'cx-btn-primary' : 'cx-btn-quiet'}`}
                href={p.cta.href}
                {...(p.cta.wa ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {p.cta.wa && <WhatsAppIcon />} {p.cta.label}
              </a>
            </div>
          ))}
        </div>

        <p className="cx-note">
          Subscription billing has not started, so there is no monthly plan charge today. Payout and top-up fees apply now and are shown before
          you confirm. Prices are set in US dollars; the shilling figures are approximate. Full details on{' '}
          <a href={LINKS.plans} style={{ textDecoration: 'underline' }}>
            app.chains-erp.com/plans
          </a>
          .
        </p>

        <div className="cx-head" style={{ marginTop: 64 }}>
          <span className="cx-eyebrow">Straight answers</span>
          <h2>Questions before you start</h2>
        </div>
        <div className="cx-faq">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Page>
  );
}
