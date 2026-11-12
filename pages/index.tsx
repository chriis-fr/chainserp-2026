/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import SEO from 'components/SEO';
import { Icon, IconName, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

// Every claim here has to match what the products do today (the app site's wording was checked against the code):
// money moves by M-Pesa in Kenya, invoices go out in 50+ currencies, the POS is switched on by the Chains team,
// Chains AI is in beta and sold separately, 15 days free with no card. Figures in the window are illustrative.

const WA_NUMBER = 'https://wa.me/254705343984';
const ROLL = ['bar', 'restaurant', 'hotel', 'shop', 'business'];
const PROMPTS = [
  'Connect the POS to my M-Pesa till…',
  'Pay 18 staff on Friday in one approval…',
  'Send an invoice in US dollars…',
  'Track my deliveries on a map…',
];

const CHIPS: { icon: IconName; label: string; href: string }[] = [
  { icon: 'till', label: 'Point of sale', href: '#pos' },
  { icon: 'users', label: 'Payroll', href: '#payroll' },
  { icon: 'receipt', label: 'Bills & treasury', href: '#bills' },
  { icon: 'file', label: 'Invoices', href: '#invoices' },
  { icon: 'truck', label: 'Deliveries', href: '#fleet' },
];

type Card = { id: string; cls: string; icon: IconName; name: string; tag?: string; line: string; href: string; cta: string; external?: boolean };

const CARDS: Card[] = [
  { id: 'payroll', cls: 'nx-b2', icon: 'users', name: 'Payroll', line: 'Weekly to monthly. Everyone paid by M-Pesa in one approval, tips included.', href: LINKS.appPayroll, cta: 'See payroll' },
  { id: 'bills', cls: 'nx-b3', icon: 'receipt', name: 'Bills & treasury', line: 'Supplier bills wait for approval, then go out from one treasury.', href: LINKS.appBills, cta: 'See bills' },
  { id: 'invoices', cls: 'nx-b4', icon: 'file', name: 'Invoices', line: 'Bill clients in 50+ currencies with a Pay now button. They mark themselves paid.', href: LINKS.appInvoices, cta: 'See invoices' },
  { id: 'fleet', cls: 'nx-b5', icon: 'truck', name: 'FleetOps', line: 'Orders, drivers and vehicles on one live map. Customers track their own order.', href: LINKS.whatsappLogistics, cta: 'Ask about FleetOps', external: true },
  { id: 'ai', cls: 'nx-b6', icon: 'chat', name: 'Chains AI', tag: 'Beta', line: 'Ask on WhatsApp. It prepares the work; payments out still need your passcode.', href: LINKS.ai, cta: 'See Chains AI' },
];

const FLOW: { icon: IconName; title: string; text: string }[] = [
  { icon: 'till', title: 'A sale is rung up', text: 'The customer pays your own M-Pesa number. The code lands on the order.' },
  { icon: 'users', title: 'Staff are paid', text: 'Shifts and tips are already there. One approval pays everyone.' },
  { icon: 'receipt', title: 'Suppliers are settled', text: 'Bills wait for approval, then leave from the treasury.' },
  { icon: 'file', title: 'Clients pay you', text: 'Invoices go out in their currency and mark themselves paid.' },
];

const FACTS = [
  { b: 'Your own number', s: 'M-Pesa paybill or till at the counter' },
  { b: '50+ currencies', s: 'on every invoice you send' },
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
        title="Chains ERP — POS, payroll, bills, invoices and logistics in one place"
        description="Chains ERP runs a business from the point of sale to payroll: POS connected to your own M-Pesa paybill or till, payroll in one approval, supplier bills, invoices in 50+ currencies, FleetOps logistics and the Chains AI assistant. Start free for 15 days."
      />
      <div className="cx nx">
        <Hero />

        {/* What Chains is, in one line */}
        <section className="nx-sec">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">What Chains is</span>
              <h2>
                One system for the <span className="nx-grad-text">money side</span> of your business.
              </h2>
              <p>Sell, pay your people, settle suppliers and get paid, all in one place that keeps the records for you.</p>
            </div>
            <div className="nx-facts nx-rv">
              {FACTS.map((f) => (
                <div className="nx-fact" key={f.b}>
                  <b>{f.b}</b>
                  <span>{f.s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products as a bento */}
        <section className="nx-sec" id="products">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">Products</span>
              <h2>Start with one. Add the rest when you're ready.</h2>
              <p>Each works on its own and they share the same records, so a sale at the till is already there when you run payroll.</p>
            </div>
            <div className="nx-bento">
              <SpotCard className="nx-b1" id="pos" href={LINKS.pos}>
                <span className="nx-card-i">
                  <Icon name="till" />
                </span>
                <h3>Chains POS</h3>
                <p>Point of sale for bars, restaurants, cafés and hotels. It works with the M-Pesa, printers and tablets you already have.</p>
                <div className="nx-mini">
                  <div>
                    <span>Table 4 · M-Pesa</span>
                    <b>KES 2,350 paid</b>
                  </div>
                  <div>
                    <span>Kitchen ticket</span>
                    <span className="nx-st ok">Printed</span>
                  </div>
                  <div>
                    <span>Needs action</span>
                    <span className="nx-st wait">2 open bills</span>
                  </div>
                </div>
                <span className="nx-more">
                  Explore Chains POS <Icon name="arrow" />
                </span>
              </SpotCard>
              {CARDS.map((c) => (
                <SpotCard key={c.id} className={c.cls} id={c.id} href={c.href} external={c.external}>
                  <span className="nx-card-i">
                    <Icon name={c.icon} />
                  </span>
                  <h3>
                    {c.name} {c.tag && <span className="nx-st info">{c.tag}</span>}
                  </h3>
                  <p>{c.line}</p>
                  <span className="nx-more">
                    {c.cta} <Icon name="arrow" />
                  </span>
                </SpotCard>
              ))}
            </div>
          </div>
        </section>

        {/* How it connects */}
        <section className="nx-sec">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">How it fits together</span>
              <h2>From the till to payroll. Nothing typed twice.</h2>
            </div>
            <ol className="nx-flow nx-rv">
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

        {/* Customers */}
        <section className="nx-sec">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">From teams using Chains</span>
              <h2>Less admin. Fewer mistakes.</h2>
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

        {/* Pricing */}
        <section className="nx-sec" id="pricing">
          <div className="cx-wrap">
            <div className="nx-head nx-rv">
              <span className="nx-eyebrow">Pricing</span>
              <h2>Pay for what you use.</h2>
              <p>Set in US dollars; shilling figures are approximate.</p>
            </div>
            <div className="nx-price nx-rv">
              <div className="nx-plan hl">
                <h3>
                  Full Suite <span className="nx-st info">Most popular</span>
                </h3>
                <div className="nx-amt">
                  $125 <small>/ month · about KES 16,200</small>
                </div>
                <p>Invoices, bills, treasury and payroll for all your staff, with 5 log-ins.</p>
                <a className="nx-btn nx-btn-light" href={LINKS.signUp}>
                  Start free
                </a>
              </div>
              <div className="nx-plan">
                <h3>Point of sale</h3>
                <div className="nx-amt">
                  Ask us <small>switched on by request</small>
                </div>
                <p>We connect your M-Pesa paybill or till, printers and tablets, then switch Chains POS on for you.</p>
                <a className="nx-btn nx-btn-ghost" href={LINKS.whatsappTill} target="_blank" rel="noopener">
                  <WhatsAppIcon /> Ask on WhatsApp
                </a>
              </div>
              <div className="nx-plan">
                <h3>Single modules</h3>
                <div className="nx-amt">
                  from $14 <small>/ month</small>
                </div>
                <p>Payroll from $29, Treasury from $27, Invoices from $14. Chains AI adds $20.</p>
                <NextLink className="nx-btn nx-btn-ghost" href="/pricing">
                  See all prices
                </NextLink>
              </div>
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
            <p>Send us your business name. We'll set Chains up with you, POS and M-Pesa included.</p>
            <div className="nx-cta">
              <a className="nx-btn nx-btn-light" href={LINKS.signUp}>
                Start free for 15 days <Icon name="arrow" />
              </a>
              <a className="nx-btn nx-btn-ghost" href={LINKS.whatsapp} target="_blank" rel="noopener">
                <WhatsAppIcon /> Set up on WhatsApp
              </a>
            </div>
            <p className="nx-fine">
              Prefer a call? <a href={LINKS.calendly}>Book 30 minutes</a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function Hero() {
  const word = useCycle(ROLL.length, 2200);
  const prompt = useCycle(PROMPTS.length, 3200);
  const [text, setText] = useState('');
  const winRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLSpanElement>(null);
  const [rollW, setRollW] = useState<number | undefined>(undefined);

  // Size the selection frame to the word that is showing, so it hugs "bar" as tightly as "restaurant".
  useEffect(() => {
    const el = rollRef.current?.children[word] as HTMLElement | undefined;
    if (el) setRollW(el.scrollWidth);
  }, [word]);

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
            <span className="nx-roll" aria-live="polite" ref={rollRef} style={rollW ? { width: rollW } : undefined}>
              {ROLL.map((w, i) => (
                <span key={w} className={i === word ? 'on' : i === (word - 1 + ROLL.length) % ROLL.length ? 'off' : ''}>
                  {w}
                </span>
              ))}
            </span>
          </span>
          <br />
          <span className="muted">from one screen.</span>
        </h1>
        <p className="nx-lead">
          Point of sale, payroll, supplier bills, invoices and deliveries, connected. M-Pesa is built in.
        </p>

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

        <div className="nx-chips" aria-label="Jump to a product">
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
        <p className="nx-fine">
          15 days free, no card. Already a customer? <a href={LINKS.signIn}>Sign in</a> · <a href={LINKS.posSignIn}>Open the POS</a>
        </p>

        <div className="nx-window-wrap">
          <div className="nx-window" ref={winRef} aria-label="Example: one evening at a bar on Chains (illustrative figures)">
            <div className="nx-win-top">
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <b>Tonight at your bar</b>
              <span className="nx-live">Live</span>
            </div>
            <div className="nx-win-body">
              <Tile icon="till" label="POS" st={['ok', 'Paid']} v="KES 2,350" s="Table 4 · M-Pesa" />
              <Tile icon="users" label="Payroll" st={['wait', 'Approve']} v="18 staff" s="Friday run, tips included" />
              <Tile icon="receipt" label="Bills" st={['info', '3 waiting']} v="Suppliers" s="Approve, then pay" />
              <Tile icon="truck" label="FleetOps" st={['ok', 'On route']} v="6 deliveries" s="Driver and drop-off" />
              <div className="nx-win-ai">
                <Icon name="chat" />
                <span>
                  <code>Manager · WhatsApp</code>
                  <br />
                  “How are sales today?” — KES 48,200 so far, 12% up on last Friday.
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

/** A bento card with a glow that follows the pointer. */
function SpotCard({ className, id, href, external, children }: { className: string; id: string; href: string; external?: boolean; children: ReactNode }) {
  const move = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <a className={`nx-card nx-rv ${className}`} id={id} href={href} onMouseMove={move} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {children}
    </a>
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
