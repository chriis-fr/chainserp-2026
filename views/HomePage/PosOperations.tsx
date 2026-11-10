import { Icon, IconName } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

// What the POS (pos.chains-erp.com) runs on a shift. Every item is a screen in the Chains-ERP-POS app.
const OPS: { icon: IconName; title: string }[] = [
  { icon: 'table', title: 'Orders & tables' },
  { icon: 'till', title: 'Kitchen & bar screens' },
  { icon: 'phone', title: 'QR ordering' },
  { icon: 'layers', title: 'Recipes & stock' },
  { icon: 'calendar', title: 'Shifts & cash-up' },
  { icon: 'wallet', title: 'Credit tabs' },
  { icon: 'receipt', title: 'M-Pesa records' },
  { icon: 'lock', title: 'Roles, voids & audit' },
  { icon: 'wifi', title: 'Works offline' },
  { icon: 'pin', title: 'Branches & devices' },
];

const TICKETS = {
  New: [{ t: 'T7', items: '2 × Tilapia, 1 × Ugali' }],
  Cooking: [
    { t: 'T4', items: '1 × Nyama choma' },
    { t: 'T2', items: '3 × Chips masala' },
  ],
  Ready: [{ t: 'T9', items: '2 × Burger' }],
} as const;

export default function PosOperations() {
  return (
    <section className="cx-sec" id="pos-operations">
      <div className="cx-wrap cx-pos-grid">
        <div>
          <span className="cx-eyebrow">Point of sale operations</span>
          <h2 className="cx-h2">The whole floor, kitchen and cash drawer, accounted for.</h2>
          <p className="cx-p">
            Chains POS connects to the M-Pesa paybill or till, printers and tablets you already have. Orders, stock, shifts and payments
            are recorded as they happen, and every sale lands in Chains ERP for payroll, bills and the books.
          </p>
          <ul className="cx-ops">
            {OPS.map((o) => (
              <li key={o.title}>
                <Icon name={o.icon} />
                {o.title}
              </li>
            ))}
          </ul>
          <div className="cx-cta" style={{ marginTop: 22 }}>
            <a className="cx-btn cx-btn-primary" href={LINKS.pos}>
              Explore Chains POS <Icon name="arrow" />
            </a>
            <a className="cx-btn cx-btn-quiet" href={LINKS.whatsappTill} target="_blank" rel="noopener">
              Connect your business
            </a>
          </div>
        </div>

        <div className="cx-pos-vis" aria-label="Illustration: the kitchen screen and a shift cash-up">
          <div className="cx-kds">
            <div className="cx-kds-top">
              <b>Kitchen screen</b>
              <span className="cx-st ok">Live</span>
            </div>
            <div className="cx-kds-cols">
              {(Object.keys(TICKETS) as (keyof typeof TICKETS)[]).map((col) => (
                <div key={col} className={`cx-kds-col ${col.toLowerCase()}`}>
                  <small>{col}</small>
                  {TICKETS[col].map((tk) => (
                    <div className="cx-tk" key={tk.t}>
                      <b>{tk.t}</b>
                      <span>{tk.items}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="cx-cashup">
            <div className="cx-row">
              <b>Evening shift · cash-up</b>
              <span className="cx-st ok">Balanced</span>
            </div>
            <dl>
              <div>
                <dt>M-Pesa</dt>
                <dd>KES 48,300</dd>
              </div>
              <div>
                <dt>Cash</dt>
                <dd>KES 12,150</dd>
              </div>
              <div>
                <dt>Credit tabs</dt>
                <dd>KES 3,400</dd>
              </div>
            </dl>
            <small>Every M-Pesa code matched to an order</small>
          </div>
        </div>
      </div>
    </section>
  );
}
