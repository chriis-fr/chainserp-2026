/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import SEO from 'components/SEO';
import { Icon, IconName, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

// chains-erp.com is the front door to the whole Chains system. It must not repeat app.chains-erp.com (the finance
// app for hospitality): it names every part briefly and sends people to the right app. Claims must match what the
// products do today: money moves by M-Pesa and Kenyan banks, invoices in 50+ currencies or USDC on Base, the POS
// and the online store are switched on by the Chains team, Chains AI is in beta. Figures in the window are illustrative.

const WA_NUMBER = 'https://wa.me/254705343984';
const ROLL = ['shop', 'restaurant', 'online store', 'deliveries', 'hotel', 'business'];
const PROMPTS = [
  'Take M-Pesa at my counter…',
  'Put my shop online with delivery…',
  'Track my riders on a map…',
  'Pay 18 staff on Friday in one approval…',
  'Invoice a client in US dollars…',
];

const CHIPS: { icon: IconName; label: string; href: string }[] = [
  { icon: 'till', label: 'Sell', href: '#sell' },
  { icon: 'truck', label: 'Deliver', href: '#deliver' },
  { icon: 'wallet', label: 'Pay', href: '#pay' },
  { icon: 'chart', label: 'Know', href: '#know' },
];

type Item = { icon: IconName; name: string; line: string; href: string; tag?: string; external?: boolean };
type Pillar = { id: string; icon: IconName; verb: string; title: string; items: Item[] };

// The whole system, grouped by what a business does all day.
const PILLARS: Pillar[] = [
  {
    id: 'sell',
    icon: 'till',
    verb: 'Sell',
    title: 'At the counter, online and on invoice.',
    items: [
      { icon: 'till', name: 'Point of sale', line: 'Tables, menus, kitchen and bar screens, stock and customer tabs. Paid to your own M-Pesa till.', href: LINKS.pos, external: true },
      { icon: 'cart', name: 'Online store', line: 'Your shop online with delivery or pickup checkout, a live delivery price and order tracking.', href: LINKS.whatsappStore, external: true },
      { icon: 'file', name: 'Invoices and pay links', line: 'Bill clients in 50+ currencies, USDC or Bitcoin. A Pay now link marks the invoice paid.', href: LINKS.appInvoices },
    ],
  },
  {
    id: 'deliver',
    icon: 'truck',
    verb: 'Deliver',
    title: 'Every order to the right door.',
    items: [
      { icon: 'truck', name: 'FleetOps', line: 'Orders, drivers and vehicles on one live map. Dispatch in a tap.', href: LINKS.logistics, external: true },
      { icon: 'pin', name: 'Customer tracking', line: 'Customers follow their own order from pickup to their door.', href: LINKS.whatsappLogistics, external: true },
      { icon: 'code', name: 'Delivery API', line: 'Book and track deliveries from your own shop, app or website.', href: '/logistics/docs' },
    ],
  },
  {
    id: 'pay',
    icon: 'wallet',
    verb: 'Pay',
    title: 'Your people, your suppliers, your branches.',
    items: [
      { icon: 'users', name: 'Payroll', line: 'Weekly or monthly, tips included. Everyone paid by M-Pesa in one approval.', href: LINKS.appPayroll },
      { icon: 'receipt', name: 'Supplier bills', line: 'Bills wait for a yes, then go to M-Pesa, a paybill, a till or a bank.', href: LINKS.appBills },
      { icon: 'bank', name: 'Treasury', line: 'A wallet for each business or branch, one pool above them.', href: LINKS.appTreasury },
    ],
  },
  {
    id: 'know',
    icon: 'chart',
    verb: 'Know',
    title: 'Where you stand, any time you ask.',
    items: [
      { icon: 'chart', name: 'Sales and cash flow', line: 'Takings by M-Pesa, bank and cash, what is running low, and what is owed both ways.', href: LINKS.app },
      { icon: 'chat', name: 'Chains AI', tag: 'Beta', line: 'Ask on WhatsApp. It prepares the work; money only moves with your passcode.', href: LINKS.ai },
      { icon: 'lock', name: 'Every action on record', line: 'Who sold, who approved, who was paid. Nothing disappears.', href: LINKS.security },
    ],
  },
];

const FLOW: { icon: IconName; title: string; text: string }[] = [
  { icon: 'cart', title: 'Ordered', text: 'At the counter, on your online store or from an invoice.' },
  { icon: 'truck', title: 'Delivered', text: 'A rider is dispatched and the customer watches it arrive.' },
  { icon: 'wallet', title: 'Paid', text: 'To your own M-Pesa number, a bank or a pay link.' },
  { icon: 'chart', title: 'On record', text: 'Sales, stock and cash flow are up to date. Nothing typed twice.' },
  { icon: 'users', title: 'Paid out', text: 'Staff and suppliers settled from the treasury, with your approval.' },
];

const WHO: { icon: IconName; name: string; line: string; slug: string }[] = [
  { icon: 'table', name: 'Bars, restaurants and cafés', line: 'Tables, kitchen tickets, tips and the night’s takings.', slug: 'hospitality' },
  { icon: 'calendar', name: 'Hotels and lodges', line: 'Restaurant, bar and staff in one place.', slug: 'hotels' },
  { icon: 'cart', name: 'Shops and online sellers', line: 'Sell in store and online, deliver the same day.', slug: 'ecommerce' },
  { icon: 'truck', name: 'Delivery and logistics', line: 'Riders, vehicles and customers on one map.', slug: 'logistics' },
  { icon: 'globe', name: 'Agencies and services', line: 'Invoice abroad, pay the team at home.', slug: 'consulting' },
];

const DOORS: { icon: IconName; name: string; host: string; line: string; href: string }[] = [
  { icon: 'layers', name: 'Chains ERP', host: 'app.chains-erp.com', line: 'Payroll, bills, invoices, treasury and Chains AI.', href: LINKS.app },
  { icon: 'till', name: 'Chains POS', host: 'pos.chains-erp.com', line: 'For cashiers, waiters and managers on the floor.', href: LINKS.posSignIn },
  { icon: 'truck', name: 'FleetOps', host: 'Logistics console', line: 'Dispatch, drivers, vehicles and the live map.', href: LINKS.logistics },
  { icon: 'code', name: 'Developers', host: 'chains-erp.com/logistics/docs', line: 'API, store and webhook docs.', href: '/logistics/docs' },
];

const TRUST = [
  { b: 'Your own number', s: 'M-Pesa paybill or till, and Kenyan banks' },
  { b: '50+ currencies', s: 'plus USDC on Base and Bitcoin' },
  { b: 'Your passcode', s: 'on every payment that leaves' },
  { b: '15 days free', s: 'no card to start' },
];

const QUOTES = [
  { text: 'Saved the whole team time to process our payroll on time, and no more errors.', name: 'Damaris', role: 'Finance Manager, Young Toon Studios' },
  { text: 'Very convenient and easy to use. Straightforward, with no hiccups.', name: 'Ashley', role: 'Finance Manager, Metastic Digital' },
  { text: 'Kept my records clean and professional. Took my business up a notch.', name: 'Marion', role: 'SME owner' },
];

export default function Homepage() {
  useReveal();
  return (
    <>
      <SEO
        url="/"
        title="Chains ERP — sell, deliver, pay and get paid on one system"
        description="Chains is one system for the whole business: point of sale, an online store with delivery, FleetOps logistics, invoices in 50+ currencies, payroll and supplier bills by M-Pesa, treasury and the Chains AI assistant. Start free for 15 days."
      />
      <div className="cx nx">
        <Hero />

        {/* The whole system */}
        <section className="nx-sec" id="system">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">What Chains is</span>
              <h2>
                One system for the <span className="nx-grad-text">whole business</span>.
              </h2>
              <p>Most businesses run on five apps, a notebook and a pile of M-Pesa messages. Chains does four jobs in one place, and every part shares the same records.</p>
            </div>
            <div className="nx-pillars">
              {PILLARS.map((p, n) => (
                <SpotBox key={p.id} id={p.id} className="nx-pillar nx-rv">
                  <div className="nx-pillar-h">
                    <span className="nx-card-i">
                      <Icon name={p.icon} />
                    </span>
                    <span className="nx-pillar-n">0{n + 1}</span>
                  </div>
                  <h3>
                    <span className="nx-pillar-v">{p.verb}.</span> {p.title}
                  </h3>
                  <ul>
                    {p.items.map((it) => (
                      <li key={it.name}>
                        <a href={it.href} {...(it.external ? { target: '_blank', rel: 'noopener' } : {})}>
                          <Icon name={it.icon} />
                          <span>
                            <b>
                              {it.name} {it.tag && <span className="nx-st info">{it.tag}</span>}
                            </b>
                            {it.line}
                          </span>
                          <Icon name="arrow" className="nx-go" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </SpotBox>
              ))}
            </div>
          </div>
        </section>

        {/* One order, end to end */}
        <section className="nx-sec">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">How it fits together</span>
              <h2>One order, start to finish.</h2>
              <p>Follow a single sale through Chains. Each step picks up where the last one left off.</p>
            </div>
            <ol className="nx-flow nx-flow-5 nx-rv">
              {FLOW.map((s) => (
                <li className="nx-step" key={s.title}>
                  <span className="nx-step-n">
                    <Icon name={s.icon} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Who it is for */}
        <section className="nx-sec">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">Who it's for</span>
              <h2>Built for businesses that sell, serve and deliver.</h2>
            </div>
            <div className="nx-who nx-rv">
              {WHO.map((w) => (
                <NextLink key={w.slug} href={`/industries/${w.slug}`} className="nx-who-i">
                  <Icon name={w.icon} />
                  <b>{w.name}</b>
                  <span>{w.line}</span>
                </NextLink>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="nx-sec">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">Trusted with the money</span>
              <h2>Less admin. Fewer mistakes.</h2>
            </div>
            <div className="nx-facts nx-rv">
              {TRUST.map((f) => (
                <div className="nx-fact" key={f.b}>
                  <b>{f.b}</b>
                  <span>{f.s}</span>
                </div>
              ))}
            </div>
            <div className="nx-quotes nx-rv">
              {QUOTES.map((q) => (
                <figure className="nx-quote" key={q.name}>
                  <blockquote>“{q.text}”</blockquote>
                  <figcaption>
                    <span className="nx-av" aria-hidden="true">
                      {q.name[0]}
                    </span>
                    <span>
                      <b>{q.name}</b>
                      {q.role}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Doors into each app */}
        <section className="nx-sec">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">Already on Chains?</span>
              <h2>Open the right app.</h2>
            </div>
            <div className="nx-doors nx-rv">
              {DOORS.map((d) => (
                <a key={d.name} className="nx-door" href={d.href} {...(d.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                  <span className="nx-card-i">
                    <Icon name={d.icon} />
                  </span>
                  <span>
                    <b>{d.name}</b>
                    <code>{d.host}</code>
                    <small>{d.line}</small>
                  </span>
                  <Icon name="arrow" className="nx-go" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Closing statement */}
        <section className="nx-final">
          <span className="nx-glow g1" aria-hidden="true" />
          <span className="nx-glow g2" aria-hidden="true" />
          <div className="cx-wrap nx-rv">
            <h2>
              Less admin.
              <br />
              <span className="nx-grad-text">More business.</span>
            </h2>
            <p>Tell us what you run. We'll set Chains up with you, from the till to the delivery van.</p>
            <div className="nx-cta">
              <a className="nx-btn nx-btn-light" href={LINKS.signUp}>
                Start free for 15 days <Icon name="arrow" />
              </a>
              <a className="nx-btn nx-btn-ghost" href={LINKS.whatsapp} target="_blank" rel="noopener">
                <WhatsAppIcon /> Set up on WhatsApp
              </a>
            </div>
            <p className="nx-fine">
              <NextLink href="/pricing">See pricing</NextLink> · Prefer a call? <a href={LINKS.calendly}>Book 30 minutes</a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function Hero() {
  const word = useCycle(ROLL.length, 2400);
  const prompt = useCycle(PROMPTS.length, 3200);
  const [text, setText] = useState('');
  const winRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => winRef.current?.classList.add('in'), 400);
    return () => clearTimeout(t);
  }, []);

  // The ask box hands the question to a person on WhatsApp: the fastest way from "interested" to "set up".
  const ask = () => {
    const q = text.trim() || PROMPTS[prompt].replace('…', '');
    window.open(`${WA_NUMBER}?text=${encodeURIComponent(`Hi Chains, ${q}`)}`, '_blank', 'noopener');
  };

  return (
    <section className="nx-hero">
      <span className="nx-glow g1" aria-hidden="true" />
      <span className="nx-glow g2" aria-hidden="true" />
      <span className="nx-glow g3" aria-hidden="true" />
      <div className="cx-wrap">
        <a className="nx-badge" href={LINKS.ai}>
          <b>New</b> Chains AI on WhatsApp <Icon name="arrow" />
        </a>
        <h1>
          Run your{' '}
          <span className="nx-frame">
            <i />
            <i />
            <i />
            <i />
            <span className="nx-word" key={ROLL[word]} aria-live="polite">
              {ROLL[word]}
            </span>
          </span>
          <br />
          <span className="muted">on one system.</span>
        </h1>
        <p className="nx-lead">Sell in store and online, deliver, pay your people and suppliers, and get paid in any currency. Every record in one place.</p>

        <form
          className="nx-ask"
          onSubmit={(e) => {
            e.preventDefault();
            ask();
          }}
        >
          <div className="nx-ask-in">
            <label className="sr-only" htmlFor="nx-ask-q">
              What do you want Chains to do?
            </label>
            <textarea
              id="nx-ask-q"
              rows={2}
              value={text}
              placeholder={PROMPTS[prompt]}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  ask();
                }
              }}
            />
            <div className="nx-ask-row">
              <small>
                <WhatsAppIcon /> A person replies on WhatsApp, usually within the hour
              </small>
              <button className="nx-send" type="submit" aria-label="Ask on WhatsApp">
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </form>

        <div className="nx-chips" aria-label="Jump to a part of Chains">
          {CHIPS.map((c) => (
            <a key={c.label} href={c.href}>
              <Icon name={c.icon} /> {c.label}
            </a>
          ))}
        </div>

        <div className="nx-cta">
          <a className="nx-btn nx-btn-light" href={LINKS.signUp}>
            Start free <Icon name="arrow" />
          </a>
          <a className="nx-btn nx-btn-ghost" href={LINKS.calendly}>
            Book a 30-minute demo
          </a>
        </div>
        <p className="nx-fine">15 days free, no card.</p>

        <div className="nx-window-wrap">
          <div className="nx-window" ref={winRef} aria-label="Example: one day across a business on Chains (illustrative figures)">
            <div className="nx-win-top">
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <b>Today across the business</b>
              <span className="nx-live">Live</span>
            </div>
            <div className="nx-win-body nx-win-6">
              <Tile icon="till" label="In store" st={['ok', 'Paid']} v="KES 48,200" s="62 sales · M-Pesa, bank, cash" />
              <Tile icon="cart" label="Online" st={['info', 'New']} v="23 orders" s="18 delivery · 5 pickup" />
              <Tile icon="truck" label="Deliveries" st={['ok', 'On route']} v="6 riders" s="Customers tracking live" />
              <Tile icon="file" label="Invoices" st={['ok', 'Paid']} v="USD 1,200" s="Client abroad · pay link" />
              <Tile icon="users" label="Payroll" st={['wait', 'Approve']} v="18 staff" s="Friday run, tips included" />
              <Tile icon="receipt" label="Bills" st={['info', '3 waiting']} v="Suppliers" s="Approve, then pay" />
              <div className="nx-win-ai">
                <Icon name="chat" />
                <span>
                  <code>Owner · WhatsApp</code>
                  <br />
                  “How did we do today?” — KES 48,200 in store and 23 online orders, 12% up on last Friday.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ icon, label, st, v, s }: { icon: IconName; label: string; st: [string, string]; v: string; s: string }) {
  return (
    <div className="nx-tile">
      <div className="nx-tile-h">
        <span>
          <Icon name={icon} /> {label}
        </span>
        <span className={`nx-st ${st[0]}`}>{st[1]}</span>
      </div>
      <div className="nx-tile-v">{v}</div>
      <div className="nx-tile-s">{s}</div>
    </div>
  );
}

/** A panel with a glow that follows the pointer. */
function SpotBox({ className, id, children }: { className: string; id: string; children: ReactNode }) {
  const move = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <article className={className} id={id} onMouseMove={move}>
      {children}
    </article>
  );
}

function useCycle(n: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms]);
  return i;
}

/** Fade sections in as they scroll into view. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.nx-rv');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}
