import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Icon, IconName } from 'components/site/Icon';
import { LINKS } from 'components/site/links';
import { NavItems } from 'types';

type Product = { href: string; icon: IconName; title: string; blurb: string; host?: string };

// The products, in the order a visitor is most likely to need them. `host` marks a link that leaves this site.
export const PRODUCTS: Product[] = [
  { href: LINKS.appProducts, icon: 'layers', title: 'Chains ERP', blurb: 'Payroll, supplier bills, invoices and treasury', host: 'app' },
  { href: LINKS.pos, icon: 'till', title: 'Chains POS', blurb: 'Point of sale operations, connected to your M-Pesa', host: 'pos' },
  { href: LINKS.logistics, icon: 'truck', title: 'FleetOps logistics', blurb: 'Vehicles, drivers and deliveries', host: 'fleet' },
  { href: '/logistics/docs', icon: 'file', title: 'Logistics API docs', blurb: 'Connect your system, Storefront, TypeScript' },
  { href: LINKS.ai, icon: 'chat', title: 'Chains AI', blurb: 'The assistant on WhatsApp, sold separately (beta)', host: 'app' },
  { href: LINKS.appPayroll, icon: 'users', title: 'Payroll', blurb: 'Everyone paid by M-Pesa in one approval', host: 'app' },
  { href: '/accept-bitcoin-payments', icon: 'bitcoin', title: 'Bitcoin payments', blurb: 'Take Bitcoin on invoices' },
];

type NavbarProps = { items?: NavItems };

export default function Navbar(_props: NavbarProps) {
  const router = useRouter();
  const [ddOpen, setDdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  // Close menus on route change, outside click and Escape.
  useEffect(() => {
    const close = () => {
      setDdOpen(false);
      setMenuOpen(false);
    };
    router.events.on('routeChangeStart', close);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      router.events.off('routeChangeStart', close);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [router.events]);

  const here = (path: string) => (router.pathname === path ? 'page' : undefined);

  return (
    <div className="cx cx-nav-shell">
      <header className="cx-nav">
        <div className="cx-nav-in">
          <NextLink className="cx-brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element -- 30px static mark */}
            <img src="/chainsnobgnologo.PNG" alt="" width={30} height={30} />
            <span>Chains ERP</span>
          </NextLink>

          <nav className="cx-nav-links" aria-label="Main">
            <div
              className={`cx-dd${ddOpen ? ' open' : ''}`}
              ref={ddRef}
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}
            >
              <button type="button" aria-expanded={ddOpen} onClick={() => setDdOpen(true)}>
                Products <Icon name="down" />
              </button>
              <div className="cx-dd-p">
                {PRODUCTS.map((p) => (
                  <a key={p.title} href={p.href} {...(p.host === 'fleet' ? { target: '_blank', rel: 'noopener' } : {})}>
                    <span className="cx-dd-i">
                      <Icon name={p.icon} />
                    </span>
                    <b>
                      {p.title}
                      {p.host && <span className="cx-ext">{p.host === 'fleet' ? '↗' : `${p.host}.`}</span>}
                    </b>
                    <small>{p.blurb}</small>
                  </a>
                ))}
              </div>
            </div>
            <NextLink href="/features" aria-current={here('/features')}>
              Features
            </NextLink>
            <a href={LINKS.solutions}>Who it&apos;s for</a>
            <NextLink href="/pricing" aria-current={here('/pricing')}>
              Pricing
            </NextLink>
            <NextLink href="/contact" aria-current={here('/contact')}>
              Contact
            </NextLink>
          </nav>

          <div className="cx-nav-act">
            <a className="cx-signin" href={LINKS.signIn}>
              Sign in
            </a>
            <a className="cx-btn cx-btn-primary cx-btn-sm" href={LINKS.signUp}>
              Start free
            </a>
            <button
              className="cx-burger"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="cx-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <nav className="cx-menu" id="cx-menu" aria-label="Menu">
          <h4>Products</h4>
          <ul className="cx-two">
            {PRODUCTS.map((p) => (
              <li key={p.title}>
                <a href={p.href}>
                  <b>{p.title}</b>
                  <small>{p.blurb}</small>
                </a>
              </li>
            ))}
          </ul>
          <h4>Chains</h4>
          <ul className="cx-two">
            <li>
              <NextLink href="/">
                <b>Home</b>
              </NextLink>
            </li>
            <li>
              <NextLink href="/features">
                <b>Features</b>
              </NextLink>
            </li>
            <li>
              <a href={LINKS.solutions}>
                <b>Who it&apos;s for</b>
              </a>
            </li>
            <li>
              <NextLink href="/pricing">
                <b>Pricing</b>
              </NextLink>
            </li>
            <li>
              <NextLink href="/contact">
                <b>Contact</b>
              </NextLink>
            </li>
            <li>
              <a href={LINKS.posSignIn}>
                <b>POS sign-in</b>
                <small>For cashiers and waiters</small>
              </a>
            </li>
          </ul>
          <div className="cx-menu-cta">
            <a className="cx-btn cx-btn-quiet" href={LINKS.signIn}>
              Sign in
            </a>
            <a className="cx-btn cx-btn-primary" href={LINKS.signUp}>
              Start free
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
