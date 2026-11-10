/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import SEO from 'components/SEO';
import { Icon, IconName, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';
import LogisticsScene from 'views/HomePage/LogisticsScene';
import PosOperations from 'views/HomePage/PosOperations';

// Every claim on this page has to match what the products do today (see the app site at app.chains-erp.com,
// whose wording was checked against the code): money moves by M-Pesa in Kenya, invoices go out in 50+ currencies,
// the POS is switched on by the Chains team, Chains AI is in beta and sold separately, 15 days free with no card.

type ProductCard = {
  id: string;
  icon: IconName;
  name: string;
  status?: string;
  host: string;
  line: string;
  points: string[];
  primary: { label: string; href: string; wa?: boolean };
  secondary: { label: string; href: string };
};

const PRODUCTS: ProductCard[] = [
  {
    id: 'erp',
    icon: 'layers',
    name: 'Chains ERP',
    host: 'app.chains-erp.com',
    line: 'The back office: pay staff, approve suppliers, send invoices and keep the money in one treasury.',
    points: [
      'Payroll weekly to monthly, everyone paid by M-Pesa in one approval',
      'Supplier bills: approve, then pay',
      'Invoices in 50+ currencies with a Pay now button',
    ],
    primary: { label: 'Start free', href: LINKS.signUp },
    secondary: { label: 'See every module', href: LINKS.appProducts },
  },
  {
    id: 'pos',
    icon: 'till',
    name: 'Chains POS',
    host: 'pos.chains-erp.com',
    line: 'Point of sale operations for bars, restaurants, cafés and hotels, connected to the M-Pesa, printers and tablets you already have.',
    points: [
      'Orders, tables, kitchen and bar screens, QR ordering',
      'Recipes and stock, shifts and cash-up, credit tabs',
      'M-Pesa records, sales and reconciliation, audit',
    ],
    primary: { label: 'Explore Chains POS', href: LINKS.pos },
    secondary: { label: 'See POS operations', href: '#pos-operations' },
  },
  {
    id: 'logistics',
    icon: 'truck',
    name: 'FleetOps',
    host: 'progressusmavericks.co.ke',
    line: 'Logistics for businesses that move goods: orders, drivers, vehicles and deliveries on one live map.',
    points: ['Orders, dispatch, drivers and vehicles', 'Every vehicle live on the map', 'Customers track their own order'],
    primary: { label: 'Ask about FleetOps', href: LINKS.whatsappLogistics, wa: true },
    secondary: { label: 'See it on the map', href: '#logistics-3d' },
  },
  {
    id: 'ai',
    icon: 'chat',
    name: 'Chains AI',
    status: 'Beta',
    host: 'app.chains-erp.com/ai',
    line: 'Tell your ERP what to do on WhatsApp. The assistant prepares it, you approve it.',
    points: ['"How are sales today?" answered from the POS', 'Payments out always need your passcode', 'Sold separately, on top of a paid plan'],
    primary: { label: 'See Chains AI', href: LINKS.ai },
    secondary: { label: 'How approvals work', href: LINKS.security },
  },
];

const FLOW: { icon: IconName; k: string; title: string; text: string; chip: string }[] = [
  { icon: 'till', k: '01 · POS', title: 'A sale is rung up', text: 'The customer pays by M-Pesa to your own number. The code lands on the order.', chip: 'Table 4 · paid' },
  { icon: 'users', k: '02 · Payroll', title: 'Staff are paid', text: 'Shifts and tips are there when you run payroll. One approval pays everyone.', chip: '18 staff · 1 approval' },
  { icon: 'receipt', k: '03 · Bills', title: 'Suppliers are settled', text: 'Bills wait for approval, then go out from the treasury.', chip: '3 awaiting approval' },
  { icon: 'file', k: '04 · Invoices', title: 'Clients pay you', text: 'Invoices go out in their currency and mark themselves paid.', chip: 'INV-0142 · paid' },
];

const FACTS = [
  { b: 'Your own number', s: 'M-Pesa paybill or till at the counter' },
  { b: '50+ currencies', s: 'on the invoices you send' },
  { b: 'Your passcode', s: 'needed for every payment out' },
  { b: '15 days free', s: 'no card to start' },
];

const QUOTES = [
  { text: 'Saved the whole team time to process our payroll on time, and no more errors compared to working by hand.', name: 'Damaris', role: 'Finance Manager, Young Toon Studios' },
  { text: 'Very convenient and easy to use. I love how straightforward it is, with no hiccups.', name: 'Ashley', role: 'Finance Manager, Metastic Digital' },
  { text: 'Kept my records clean and professional. Took my business up a notch with professional invoicing.', name: 'Marion', role: 'SME owner' },
];

export default function Homepage() {
  return (
    <>
      <SEO
        url="/"
        title="Chains ERP — POS, payroll, bills, invoices and logistics in one place"
        description="Chains ERP runs a business from the point of sale to payroll: POS operations connected to your own M-Pesa paybill or till, payroll in one approval, supplier bills, invoices in 50+ currencies, FleetOps logistics with live tracking, and the Chains AI assistant. Start free for 15 days."
      />
      <div className="cx">
        {/* ---------- Hero ---------- */}
        <section className="cx-hero cx-grid-bg">
          <div className="cx-wrap cx-hero-grid">
            <div>
              <a className="cx-badge" href={LINKS.ai}>
                <b>New</b> Chains AI on WhatsApp, in beta <Icon name="arrow" />
              </a>
              <h1>
                Run the whole business from <span className="cx-grad">one place.</span>
              </h1>
              <p className="cx-lead">
                Point of sale, payroll, supplier bills, invoices and deliveries, in products that share the same records. Built
                for bars, restaurants, hotels and growing businesses; money moves by M-Pesa in Kenya today.
              </p>
              <div className="cx-cta">
                <a className="cx-btn cx-btn-primary" href={LINKS.signUp}>
                  Start free <Icon name="arrow" />
                </a>
                <a className="cx-btn cx-btn-quiet" href={LINKS.whatsapp} target="_blank" rel="noopener">
                  <WhatsAppIcon /> Set up on WhatsApp
                </a>
              </div>
              <p className="cx-fine">
                15 days free, no card. Already a customer? <a href={LINKS.signIn}>Sign in</a> or open the{' '}
                <a href={LINKS.posSignIn}>POS</a>.
              </p>
              <div className="cx-jump" aria-label="Go straight to a product">
                <a href="#pos">
                  <Icon name="till" /> Point of sale
                </a>
                <a href="#erp">
                  <Icon name="users" /> Payroll and bills
                </a>
                <a href="#logistics">
                  <Icon name="truck" /> Logistics
                </a>
                <a href="#ai">
                  <Icon name="chat" /> Chains AI
                </a>
              </div>
            </div>

            <HeroBoard />
          </div>
        </section>

        {/* ---------- Product router ---------- */}
        <section className="cx-sec mist" id="products">
          <div className="cx-wrap">
            <div className="cx-head">
              <span className="cx-eyebrow">Products</span>
              <h2>Start with the one you need. Add the rest when you're ready.</h2>
              <p>Each product works on its own and they share the same records, so a sale at the POS is already there when you run payroll.</p>
            </div>
            <div className="cx-prods">
              {PRODUCTS.map((p, i) => (
                <article className="cx-prod" id={p.id} key={p.id}>
                  <span className="cx-prod-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="cx-prod-i">
                    <Icon name={p.icon} />
                  </span>
                  <div>
                    <h3>
                      {p.name} {p.status && <span className="cx-st wait">{p.status}</span>}
                    </h3>
                    <span className="cx-prod-host">{p.host}</span>
                  </div>
                  <p>{p.line}</p>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>
                        <Icon name="check" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="cx-prod-act">
                    <a
                      className="cx-btn cx-btn-primary"
                      href={p.primary.href}
                      {...(p.primary.wa ? { target: '_blank', rel: 'noopener' } : {})}
                    >
                      {p.primary.wa && <WhatsAppIcon />} {p.primary.label}
                    </a>
                    <a className="cx-link" href={p.secondary.href}>
                      {p.secondary.label} <Icon name="arrow" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PosOperations />

        <LogisticsScene />

        {/* ---------- How it connects ---------- */}
        <section className="cx-sec">
          <div className="cx-wrap">
            <div className="cx-head">
              <span className="cx-eyebrow">How it fits together</span>
              <h2>From the point of sale to payroll, without copying anything across.</h2>
            </div>
            <ol className="cx-flow">
              {FLOW.map((s) => (
                <li className="cx-step" key={s.k}>
                  <div className="cx-step-k">
                    <span>{s.k}</span>
                    <Icon name={s.icon} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="cx-chip">{s.chip}</span>
                </li>
              ))}
            </ol>
            <div className="cx-facts" style={{ marginTop: 24 }}>
              {FACTS.map((f) => (
                <div className="cx-fact" key={f.b}>
                  <b>{f.b}</b>
                  <span>{f.s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Words from customers (the quotes the site already carried) ---------- */}
        <section className="cx-sec mist">
          <div className="cx-wrap">
            <div className="cx-head">
              <span className="cx-eyebrow">From teams using Chains</span>
              <h2>Less time on admin, fewer mistakes.</h2>
            </div>
            <div className="cx-quotes">
              {QUOTES.map((q) => (
                <figure className="cx-quote" key={q.name}>
                  <blockquote>“{q.text}”</blockquote>
                  <figcaption>
                    <span className="cx-av" aria-hidden="true">
                      {q.name[0]}
                    </span>
                    <span>
                      <b>{q.name}</b>
                      <small>{q.role}</small>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Pricing teaser ---------- */}
        <section className="cx-sec">
          <div className="cx-wrap">
            <div className="cx-head">
              <span className="cx-eyebrow">Pricing</span>
              <h2>Pay for what you use.</h2>
              <p>Prices are set in US dollars; the shilling figures are approximate.</p>
            </div>
            <div className="cx-price">
              <div className="cx-plan hl">
                <h3>
                  Full Suite <span className="cx-st info">For a bar or restaurant</span>
                </h3>
                <div className="cx-amt">
                  $125 <small>/ month · about KES 16,200</small>
                </div>
                <p>Invoices, bills, treasury and payroll for all your staff, with 5 log-ins.</p>
                <a className="cx-btn cx-btn-primary cx-btn-sm" href={LINKS.signUp}>
                  Start free
                </a>
              </div>
              <div className="cx-plan">
                <h3>Point of sale</h3>
                <div className="cx-amt">
                  Ask us <small>switched on by request</small>
                </div>
                <p>We connect your existing M-Pesa paybill or till, printers and tablets, and switch Chains POS on for your workspace.</p>
                <a className="cx-btn cx-btn-quiet cx-btn-sm" href={LINKS.whatsappTill} target="_blank" rel="noopener">
                  <WhatsAppIcon /> Ask on WhatsApp
                </a>
              </div>
              <div className="cx-plan">
                <h3>Single modules</h3>
                <div className="cx-amt">
                  from $14 <small>/ month</small>
                </div>
                <p>Payroll from $29, Treasury from $27, Invoices from $14. Chains AI adds $20.</p>
                <NextLink className="cx-btn cx-btn-quiet cx-btn-sm" href="/pricing">
                  See all prices
                </NextLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/** The four products as live tiles: what an owner sees on a normal evening. Illustrative figures. */
function HeroBoard() {
  return (
    <div className="cx-board-3d">
      <div className="cx-float f1" aria-hidden="true">
        <Icon name="check" />
        <span>
          <b>KES 2,350 received</b>
          <small>M-Pesa · Table 4</small>
        </span>
      </div>
      <div className="cx-float f2" aria-hidden="true">
        <Icon name="truck" />
        <span>
          <b>Order #1042 arriving</b>
          <small>FleetOps · 12 min</small>
        </span>
      </div>
    <div className="cx-board" aria-label="Example: the Chains products on one evening">
      <div className="cx-board-top">
        <div className="cx-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <b>Tonight at your bar</b>
        <span className="cx-st ok">Live</span>
      </div>
      <div className="cx-board-grid">
        <a className="cx-tile" href="#pos">
          <div className="cx-tile-h">
            <span>
              <Icon name="till" /> POS
            </span>
            <span className="cx-st ok">Paid</span>
          </div>
          <div className="cx-tile-v">KES 2,350</div>
          <div className="cx-row">
            <span>Table 4 · M-Pesa</span>
            <span>QK7…3F</span>
          </div>
        </a>
        <a className="cx-tile" href="#erp">
          <div className="cx-tile-h">
            <span>
              <Icon name="users" /> Payroll
            </span>
            <span className="cx-st wait">Approve</span>
          </div>
          <div className="cx-tile-v">18 staff</div>
          <div className="cx-tile-s">Friday run ready, tips included</div>
        </a>
        <a className="cx-tile" href="#erp">
          <div className="cx-tile-h">
            <span>
              <Icon name="receipt" /> Bills
            </span>
            <span className="cx-st info">3 waiting</span>
          </div>
          <div className="cx-tile-v">Suppliers</div>
          <div className="cx-tile-s">Approve, then pay from treasury</div>
        </a>
        <a className="cx-tile" href="#logistics">
          <div className="cx-tile-h">
            <span>
              <Icon name="truck" /> FleetOps
            </span>
            <span className="cx-st ok">On route</span>
          </div>
          <div className="cx-tile-v">6 deliveries</div>
          <div className="cx-tile-s">Driver, vehicle and drop-off</div>
        </a>
      </div>
      <div className="cx-board-foot">
        <Icon name="chat" />
        <span>
          <code>Manager · on WhatsApp</code>
          <br />
          “How are sales today?”
        </span>
      </div>
    </div>
    </div>
  );
}
