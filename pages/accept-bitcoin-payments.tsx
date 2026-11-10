/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import Page from 'components/Page';
import { Icon, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';
import StructuredData from 'components/StructuredData';

// What is true today (chains-API src/modules/treasury/btcpay, finance app invoice builder):
// - An admin or the workspace owner provisions a BTCPay store for the workspace on the BTCPay Server we host
//   (btcpay.chains-erp.com); after that, Bitcoin payment invoices can be created, priced in a currency (USD by default).
// - The invoice builder still shows a "set up BTCPay" step when you pick Bitcoin, so it is switched on with us.
// - Nothing in the code connects a wallet automatically; the store's wallet is set up with the customer.
const FAQS = [
  {
    question: 'Is Bitcoin available on every account?',
    answer: 'Not yet. We switch it on per workspace by request while we finish it. Message us on WhatsApp.',
  },
  {
    question: 'Where do the payments go?',
    answer: 'To the wallet connected to your workspace’s BTCPay store. We set that up with you before you take your first payment.',
  },
  {
    question: 'Can I pay staff or suppliers in Bitcoin?',
    answer: 'No. Payroll and supplier payouts go by M-Pesa or bank in Kenya.',
  },
  {
    question: 'What about stablecoins?',
    answer: 'Invoices can also be issued in USDC or USDT on Base. Those payments go to your address and are marked paid by hand.',
  },
  {
    question: 'Does this handle tax?',
    answer: 'No. Chains does not issue eTIMS tax invoices or handle tax on crypto. Talk to your accountant.',
  },
];

export default function AcceptBitcoinPaymentsPage() {
  return (
    <Page
      eyebrow="Bitcoin on invoices"
      title="Take Bitcoin on your invoices, through BTCPay Server"
      description="Bitcoin payments on Chains invoices run through BTCPay Server, the open-source payment processor, which we host. Switched on per workspace by request."
    >
      <StructuredData type="FAQPage" data={FAQS} />
      <div className="cx cx-tpl">
        <div className="cx-tpl-grid">
          <article className="cx-tpl-main">
            <p className="cx-tpl-lead">
              Some clients would rather pay in Bitcoin. Chains can take it on your invoices through BTCPay Server, the open-source
              Bitcoin payment processor, running on our own server. It is early, so we switch it on with you.
            </p>

            <section className="cx-tpl-sec">
              <h2>How it works</h2>
              <ul>
                <li>
                  <Icon name="check" />
                  <span>We create a BTCPay store for your workspace and connect it to a wallet with you</span>
                </li>
                <li>
                  <Icon name="check" />
                  <span>You price the invoice in a currency such as USD; the client pays the equivalent in Bitcoin</span>
                </li>
                <li>
                  <Icon name="check" />
                  <span>BTCPay tracks the payment against that invoice</span>
                </li>
              </ul>
            </section>

            <section className="cx-tpl-sec">
              <h2>What it is not</h2>
              <p>
                Bitcoin is for getting paid on invoices only: there is no Bitcoin at the POS counter and no payroll or supplier payouts in
                Bitcoin. Money moves out of Chains by M-Pesa or bank in Kenya.
              </p>
            </section>

            <section className="cx-tpl-sec">
              <h2>Questions</h2>
              <div className="cx-faq">
                {FAQS.map((f) => (
                  <details key={f.question}>
                    <summary>{f.question}</summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="cx-tpl-side">
            <div className="cx-plan hl">
              <h3>Ask for Bitcoin on your workspace</h3>
              <p>Tell us your business name and we will set it up with you.</p>
              <div className="cx-tpl-actions">
                <a className="cx-btn cx-btn-primary" href={LINKS.whatsapp} target="_blank" rel="noopener">
                  <WhatsAppIcon /> Ask on WhatsApp
                </a>
                <a className="cx-btn cx-btn-quiet" href={LINKS.signUp}>
                  Start free <Icon name="arrow" />
                </a>
              </div>
            </div>
            <div className="cx-plan">
              <h3>Related</h3>
              <ul className="cx-tpl-rel">
                <li>
                  <NextLink href="/features/cross-border-payments">
                    Getting paid by clients <Icon name="arrow" />
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/features/global-invoicing">
                    Invoices in 50+ currencies <Icon name="arrow" />
                  </NextLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </Page>
  );
}
