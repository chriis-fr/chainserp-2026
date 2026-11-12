import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Icon, IconName } from 'components/site/Icon';
import { LINKS } from 'components/site/links';
import { NavItems } from 'types';

type Product = { href: string; icon: IconName; title: string; blurb: string; external?: boolean };

// The products, in the order a visitor is most likely to need them.
export const PRODUCTS: Product[] = [
  { href: LINKS.pos, icon: 'till', title: 'Chains POS', blurb: 'Point of sale for restaurants, bars, hotels and shops' },
  { href: LINKS.whatsappStore, icon: 'cart', title: 'Online store', blurb: 'Sell online with delivery or pickup', external: true },
  { href: LINKS.appInvoices, icon: 'file', title: 'Invoices', blurb: '50+ currencies with a Pay now link' },
  { href: LINKS.logistics, icon: 'truck', title: 'FleetOps', blurb: 'Deliveries, drivers and vehicles', external: true },
  { href: LINKS.appPayroll, icon: 'users', title: 'Payroll', blurb: 'Everyone paid by M-Pesa in one approval' },
  { href: LINKS.appBills, icon: 'receipt', title: 'Bills & treasury', blurb: 'Approve suppliers, then pay' },
  { href: LINKS.ai, icon: 'chat', title: 'Chains AI', blurb: 'Your business on WhatsApp (beta)' },
  { href: '/logistics/docs', icon: 'code', title: 'Developers', blurb: 'Delivery and store API docs' },
];

type NavbarProps = { items?: NavItems };

/** Floating pill navbar. Desktop: four links. Phone: logo, Start free and a short sheet that always fits the screen. */
export default function Navbar(_props: NavbarProps) {
  const router = useRouter();
  const [ddOpen, setDdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => {
      setDdOpen(false);
      setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 24);
    router.events.on('routeChangeStart', close);
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      router.events.off('routeChangeStart', close);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, [router.events]);

  const here = (path: string) => (router.pathname === path ? 'page' : undefined);
  // Only the homepage is dark; every other page gets the light version of the same pill.
  const light = router.pathname !== '/';

  return (
    <div className={`cx nx-nav-shell${scrolled ? ' scrolled' : ''}${light ? ' light' : ''}`}>
      <header className="nx-nav">
        <NextLink className="nx-brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element -- 26px static mark */}
          <img src="/chainsnobgnologo.PNG" alt="" width={26} height={26} />
          <span>Chains ERP</span>
        </NextLink>

        <nav className="nx-links" aria-label="Main">
          <div
            className={`nx-dd${ddOpen ? ' open' : ''}`}
            ref={ddRef}
            onMouseEnter={() => setDdOpen(true)}
            onMouseLeave={() => setDdOpen(false)}
          >
            <button type="button" aria-expanded={ddOpen} onClick={() => setDdOpen(true)}>
              Products <Icon name="down" />
            </button>
            <div className="nx-dd-p">
              {PRODUCTS.map((p) => (
                <a key={p.title} href={p.href} {...(p.external ? { target: '_blank', rel: 'noopener' } : {})}>
                  <span>
                    <Icon name={p.icon} />
                  </span>
                  <b>{p.title}</b>
                  <small>{p.blurb}</small>
                </a>
              ))}
            </div>
          </div>
          <NextLink href="/logistics/docs">Docs</NextLink>
          <NextLink href="/pricing" aria-current={here('/pricing')}>
            Pricing
          </NextLink>
          <NextLink href="/contact" aria-current={here('/contact')}>
            Contact
          </NextLink>
        </nav>

        <div className="nx-act">
          <a className="nx-signin" href={LINKS.signIn}>
            Sign in
          </a>
          <a className="nx-btn nx-btn-light nx-btn-sm" href={LINKS.signUp}>
            Start free
          </a>
          <button
            className="nx-burger"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nx-sheet"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="nx-sheet" id="nx-sheet" aria-label="Menu">
          <div className="nx-sheet-grid">
            {PRODUCTS.map((p) => (
              <a key={p.title} href={p.href} {...(p.external ? { target: '_blank', rel: 'noopener' } : {})}>
                <Icon name={p.icon} />
                {p.title}
              </a>
            ))}
          </div>
          <div className="nx-sheet-links">
            <NextLink href="/pricing">Pricing</NextLink>
            <NextLink href="/contact">Contact</NextLink>
            <a href={LINKS.posSignIn}>POS sign-in</a>
          </div>
          <div className="nx-sheet-cta">
            <a className="nx-btn nx-btn-ghost" href={LINKS.signIn}>
              Sign in
            </a>
            <a className="nx-btn nx-btn-light" href={LINKS.signUp}>
              Start free
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
