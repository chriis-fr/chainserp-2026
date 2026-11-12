import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import SEO from 'components/SEO';
import { Icon, IconName, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

export const DOCS_NAV: { href: string; title: string; icon: IconName }[] = [
  { href: '/logistics/docs', title: 'Overview', icon: 'layers' },
  { href: '/logistics/docs/integrate', title: 'Connect your system', icon: 'globe' },
  { href: '/logistics/docs/storefront', title: 'Storefront', icon: 'till' },
  { href: '/logistics/docs/api', title: 'API reference', icon: 'file' },
  { href: '/logistics/docs/webhooks', title: 'Webhooks', icon: 'spark' },
  { href: '/logistics/docs/typescript', title: 'TypeScript quickstart', icon: 'receipt' },
];

export const API_BASE = 'https://api.progressusmavericks.co.ke/v1';
export const STOREFRONT_BASE = 'https://api.progressusmavericks.co.ke/storefront/v1';
export const ACCESS_LINK = `https://wa.me/254705343984?text=${encodeURIComponent(
  'Hi Chains, I would like API access to Chains FleetOps logistics. Company name: ',
)}`;

type Props = PropsWithChildren<{
  title: string;
  seoTitle: string;
  description: string;
  lead?: string;
  keywords?: string[];
}>;

type Toc = { id: string; text: string };

/** A docs page: its own top bar, a section sidebar, the article and an "On this page" list. No marketing chrome. */
export default function DocsLayout({ title, seoTitle, description, lead, keywords, children }: Props) {
  const router = useRouter();
  const path = router.pathname;
  const idx = DOCS_NAV.findIndex((n) => n.href === path);
  const prev = idx > 0 ? DOCS_NAV[idx - 1] : undefined;
  const next = idx >= 0 && idx < DOCS_NAV.length - 1 ? DOCS_NAV[idx + 1] : undefined;
  const articleRef = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<Toc[]>([]);
  const [active, setActive] = useState('');
  const [navOpen, setNavOpen] = useState(false);

  // Build "On this page" from the article's h2s, giving each a stable id.
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    const hs = Array.from(el.querySelectorAll('h2'));
    const items = hs.map((h) => {
      if (!h.id) h.id = (h.textContent || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return { id: h.id, text: h.textContent || '' };
    });
    setToc(items);
    setNavOpen(false);
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-80px 0px -70% 0px' },
    );
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [path]);

  const current = DOCS_NAV[idx]?.title ?? title;

  return (
    <>
      <SEO title={seoTitle} description={description} url={path} keywords={keywords} />
      <div className="cx dx">
        <header className="dx-top">
          <div className="dx-top-in">
            <NextLink className="dx-brand" href="/logistics/docs">
              {/* eslint-disable-next-line @next/next/no-img-element -- 24px static mark */}
              <img src="/chainsnobgnologo.PNG" alt="" width={24} height={24} />
              <span>
                Chains <b>Docs</b>
              </span>
            </NextLink>
            <span className="dx-product">FleetOps API</span>
            <div className="dx-top-act">
              <NextLink className="dx-back" href="/">
                chains-erp.com
              </NextLink>
              <a className="nx-btn nx-btn-sm dx-key" href={ACCESS_LINK} target="_blank" rel="noopener">
                Get API keys
              </a>
            </div>
          </div>
          <button className="dx-mnav" type="button" aria-expanded={navOpen} onClick={() => setNavOpen((v) => !v)}>
            <span>
              <small>Docs</small> {current}
            </span>
            <Icon name={navOpen ? 'close' : 'down'} />
          </button>
        </header>

        <div className="dx-grid">
          <aside className={`dx-side${navOpen ? ' open' : ''}`} aria-label="Docs sections">
            <h4>Get started</h4>
            <ul>
              {DOCS_NAV.map((n) => (
                <li key={n.href}>
                  <NextLink href={n.href} aria-current={n.href === path ? 'page' : undefined}>
                    <Icon name={n.icon} />
                    {n.title}
                  </NextLink>
                </li>
              ))}
            </ul>
            <div className="dx-help">
              <b>Need keys?</b>
              <p>Chains issues every API and Store key. Ask us and we&apos;ll set you up.</p>
              <a href={ACCESS_LINK} target="_blank" rel="noopener">
                <WhatsAppIcon /> Request access
              </a>
            </div>
          </aside>

          <main className="dx-main">
            <nav className="dx-crumbs" aria-label="Breadcrumb">
              <NextLink href="/logistics/docs">Docs</NextLink>
              {path !== '/logistics/docs' && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{current}</span>
                </>
              )}
            </nav>
            <h1>{title}</h1>
            {lead && <p className="dx-lead">{lead}</p>}
            <article className="cx-prose" ref={articleRef}>
              {children}
              <nav className="cx-docs-pager" aria-label="Next and previous">
                {prev ? (
                  <NextLink href={prev.href}>
                    <small>Previous</small>
                    {prev.title}
                  </NextLink>
                ) : (
                  <span />
                )}
                {next && (
                  <NextLink href={next.href} className="next">
                    <small>Next</small>
                    {next.title}
                  </NextLink>
                )}
              </nav>
            </article>
          </main>

          {toc.length > 1 && (
            <aside className="dx-toc" aria-label="On this page">
              <h4>On this page</h4>
              <ul>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} aria-current={active === t.id ? 'true' : undefined}>
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <footer className="dx-foot">
          <span>© {new Date().getFullYear()} Chains ERP · FleetOps developer docs</span>
          <span>
            <NextLink href="/">Home</NextLink> · <NextLink href="/contact">Support</NextLink> · <a href={LINKS.email}>hello@chains-erp.com</a>
          </span>
        </footer>
      </div>
    </>
  );
}

/** A code sample with a language label. Plain <pre>, no client-side highlighter. */
export function Code({ lang, children }: { lang: string; children: string }) {
  return (
    <figure className="cx-code">
      <figcaption>{lang}</figcaption>
      <pre>
        <code>{children.replace(/^\n+|\s+$/g, '')}</code>
      </pre>
    </figure>
  );
}

export function Callout({ tone = 'info', title, children }: PropsWithChildren<{ tone?: 'info' | 'warn' | 'ok'; title: string }>) {
  return (
    <div className={`cx-callout ${tone}`}>
      <b>{title}</b>
      <div>{children}</div>
    </div>
  );
}

export { LINKS };
