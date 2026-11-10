import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
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

export default function DocsLayout({ title, seoTitle, description, lead, keywords, children }: Props) {
  const router = useRouter();
  const path = router.pathname;
  const idx = DOCS_NAV.findIndex((n) => n.href === path);
  const prev = idx > 0 ? DOCS_NAV[idx - 1] : undefined;
  const next = idx >= 0 && idx < DOCS_NAV.length - 1 ? DOCS_NAV[idx + 1] : undefined;

  return (
    <>
      <SEO title={seoTitle} description={description} url={path} keywords={keywords} />
      <div className="cx cx-docs">
        <header className="cx-docs-head cx-grid-bg">
          <div className="cx-wrap">
            <nav className="cx-crumbs" aria-label="Breadcrumb">
              <NextLink href="/">Home</NextLink>
              <span aria-hidden="true">/</span>
              <NextLink href="/logistics/docs">Logistics docs</NextLink>
              {path !== '/logistics/docs' && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{DOCS_NAV[idx]?.title ?? title}</span>
                </>
              )}
            </nav>
            <span className="cx-eyebrow">Chains FleetOps · developer docs</span>
            <h1>{title}</h1>
            {lead && <p>{lead}</p>}
          </div>
        </header>

        <div className="cx-wrap cx-docs-grid">
          <aside className="cx-docs-nav" aria-label="Docs sections">
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
            <div className="cx-docs-access">
              <b>Need keys?</b>
              <p>Chains issues every API and Store key. Ask us and we&apos;ll set you up.</p>
              <a className="cx-btn cx-btn-primary cx-btn-sm" href={ACCESS_LINK} target="_blank" rel="noopener">
                <WhatsAppIcon /> Request access
              </a>
            </div>
          </aside>

          <article className="cx-prose">
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
        </div>
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
