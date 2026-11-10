import NextLink from 'next/link';
import { LINKS } from 'components/site/links';

const COLUMNS: { title: string; links: { label: string; href: string; internal?: boolean }[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'Chains ERP', href: LINKS.appProducts },
      { label: 'Chains POS', href: LINKS.pos },
      { label: 'FleetOps logistics', href: LINKS.logistics },
      { label: 'Chains AI', href: LINKS.ai },
      { label: 'Bitcoin payments', href: '/accept-bitcoin-payments', internal: true },
    ],
  },
  {
    title: 'Modules',
    links: [
      { label: 'Payroll', href: LINKS.appPayroll },
      { label: 'Supplier bills', href: LINKS.appBills },
      { label: 'Invoices', href: LINKS.appInvoices },
      { label: 'Treasury', href: LINKS.appTreasury },
      { label: 'All features', href: '/features', internal: true },
    ],
  },
  {
    title: 'Sign in',
    links: [
      { label: 'Chains ERP app', href: LINKS.signIn },
      { label: 'POS (cashiers, waiters)', href: LINKS.posSignIn },
      { label: 'FleetOps', href: LINKS.logistics },
      { label: 'Create an account', href: LINKS.signUp },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Pricing', href: '/pricing', internal: true },
      { label: 'Contact', href: '/contact', internal: true },
      { label: 'Book a call', href: LINKS.calendly },
      { label: 'Security', href: LINKS.security },
      { label: 'Privacy', href: '/privacy-policy', internal: true },
      { label: 'Cookies', href: '/cookies-policy', internal: true },
    ],
  },
];

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/chainserp' },
  { label: 'X', href: 'https://x.com/chainserp' },
  { label: 'Facebook', href: 'https://www.facebook.com/chainserp' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="cx cx-foot">
      <div className="cx-wrap">
        <div className="cx-foot-grid">
          <div className="cx-foot-brand">
            <NextLink className="cx-brand" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element -- 30px static mark */}
              <img src="/chainsnobgnologo.PNG" alt="" width={30} height={30} />
              <span>Chains ERP</span>
            </NextLink>
            <p>Point of sale, payroll, supplier bills, invoices and logistics for growing businesses. Made in Nairobi.</p>
            <a className="cx-link" href={LINKS.email}>
              hello@chains-erp.com
            </a>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>{l.internal ? <NextLink href={l.href}>{l.label}</NextLink> : <a href={l.href}>{l.label}</a>}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="cx-foot-bottom">
          <span>© {year} Chains ERP</span>
          <div className="cx-social">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
