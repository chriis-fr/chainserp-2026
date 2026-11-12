import NextLink from 'next/link';
import { LINKS } from 'components/site/links';

type L = { label: string; href: string; internal?: boolean };

const COLUMNS: { title: string; links: L[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'Chains POS', href: LINKS.pos },
      { label: 'Payroll', href: LINKS.appPayroll },
      { label: 'Bills & treasury', href: LINKS.appBills },
      { label: 'Invoices', href: LINKS.appInvoices },
      { label: 'FleetOps', href: LINKS.logistics },
      { label: 'Chains AI', href: LINKS.ai },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'All features', href: '/features', internal: true },
      { label: 'Who it’s for', href: '/industries', internal: true },
      { label: 'Compare', href: '/compare', internal: true },
      { label: 'Developer docs', href: '/logistics/docs', internal: true },
      { label: 'Bitcoin payments', href: '/accept-bitcoin-payments', internal: true },
    ],
  },
  {
    title: 'Sign in',
    links: [
      { label: 'Chains ERP', href: LINKS.signIn },
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
  { label: 'Instagram', href: 'https://www.instagram.com/chainserp' },
  { label: 'X', href: 'https://x.com/chainserp' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="cx nx-foot">
      <div className="cx-wrap">
        <div className="nx-foot-top">
          <div className="nx-foot-brand">
            <NextLink className="nx-brand" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element -- 26px static mark */}
              <img src="/chainsnobgnologo.PNG" alt="" width={26} height={26} />
              <span>Chains ERP</span>
            </NextLink>
            <p>Point of sale, payroll, supplier bills, invoices and logistics for growing businesses. Made in Nairobi.</p>
            <a href={LINKS.email}>hello@chains-erp.com</a>
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
        <div className="nx-foot-mark" aria-hidden="true">
          Less admin, more business.
        </div>
        <div className="nx-foot-bottom">
          <span>© {year} Chains ERP</span>
          <div>
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
