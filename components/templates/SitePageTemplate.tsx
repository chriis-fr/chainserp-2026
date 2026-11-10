import NextLink from 'next/link';
import Page from 'components/Page';
import { Icon, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';
import StructuredData from 'components/StructuredData';
import { EnvVars } from 'env';
import type { ProductKey, SitePage } from 'data/site-page';

type Action = { label: string; href: string; wa?: boolean; external?: boolean };

const CTA: Record<ProductKey, { title: string; text: string; primary: Action; secondary: Action }> = {
  erp: {
    title: 'Try Chains ERP',
    text: 'Payroll, supplier bills, invoices and treasury. 15 days free, no card.',
    primary: { label: 'Start free', href: LINKS.signUp },
    secondary: { label: 'Set up on WhatsApp', href: LINKS.whatsapp, wa: true },
  },
  pos: {
    title: 'See Chains POS',
    text: 'Point of sale operations connected to the M-Pesa, printers and tablets you already have. Switched on by request.',
    primary: { label: 'Explore Chains POS', href: LINKS.pos },
    secondary: { label: 'Connect your business', href: LINKS.whatsappTill, wa: true },
  },
  fleet: {
    title: 'Run deliveries on FleetOps',
    text: 'Orders, dispatch, drivers, vehicles and a live map. Connect your own system with the API and webhooks.',
    primary: { label: 'Read the logistics docs', href: '/logistics/docs' },
    secondary: { label: 'Ask about FleetOps', href: LINKS.whatsappLogistics, wa: true },
  },
  ai: {
    title: 'Chains AI (beta)',
    text: 'The assistant on WhatsApp and in the app, on top of a paid plan. Access is by request.',
    primary: { label: 'See Chains AI', href: LINKS.ai, external: true },
    secondary: { label: 'Start free', href: LINKS.signUp },
  },
  bitcoin: {
    title: 'Ask about Bitcoin on invoices',
    text: 'Switched on per workspace by request while we finish it.',
    primary: { label: 'Ask on WhatsApp', href: LINKS.whatsapp, wa: true },
    secondary: { label: 'See pricing', href: '/pricing' },
  },
};

function ActionLink({ a, primary }: { a: Action; primary?: boolean }) {
  const cls = `cx-btn ${primary ? 'cx-btn-primary' : 'cx-btn-quiet'}`;
  const ext = a.wa || a.external || a.href.startsWith('http');
  const inner = (
    <>
      {a.wa && <WhatsAppIcon />} {a.label} {!a.wa && <Icon name="arrow" />}
    </>
  );
  if (ext) {
    return (
      <a className={cls} href={a.href} {...(a.wa ? { target: '_blank', rel: 'noopener' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <NextLink className={cls} href={a.href}>
      {inner}
    </NextLink>
  );
}

export default function SitePageTemplate({ page, section, sectionHref }: { page: SitePage; section: string; sectionHref: string }) {
  const cta = CTA[page.product];
  return (
    <Page eyebrow={page.eyebrow} title={page.title} description={page.description}>
      <StructuredData
        type="BreadcrumbList"
        data={[
          { name: 'Home', url: EnvVars.URL },
          { name: section, url: `${EnvVars.URL}${sectionHref}` },
          { name: page.name, url: `${EnvVars.URL}${sectionHref}/${page.slug}` },
        ]}
      />
      {page.faqs.length > 0 && <StructuredData type="FAQPage" data={page.faqs} />}

      <div className="cx cx-tpl">
        <nav className="cx-crumbs" aria-label="Breadcrumb">
          <NextLink href="/">Home</NextLink>
          <span aria-hidden="true">/</span>
          <NextLink href={sectionHref}>{section}</NextLink>
          <span aria-hidden="true">/</span>
          <span>{page.name}</span>
        </nav>

        <div className="cx-tpl-grid">
          <article className="cx-tpl-main">
            <p className="cx-tpl-lead">{page.lead}</p>
            {page.sections.map((s) => (
              <section className="cx-tpl-sec" key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body && <p>{s.body}</p>}
                {s.points && (
                  <ul>
                    {s.points.map((pt) => (
                      <li key={pt}>
                        <Icon name="check" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {page.faqs.length > 0 && (
              <section className="cx-tpl-sec">
                <h2>Questions</h2>
                <div className="cx-faq">
                  {page.faqs.map((f) => (
                    <details key={f.question}>
                      <summary>{f.question}</summary>
                      <p>{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="cx-tpl-side">
            <div className="cx-plan hl">
              <h3>{cta.title}</h3>
              <p>{cta.text}</p>
              <div className="cx-tpl-actions">
                <ActionLink a={cta.primary} primary />
                <ActionLink a={cta.secondary} />
              </div>
            </div>
            {page.related.length > 0 && (
              <div className="cx-plan">
                <h3>Related</h3>
                <ul className="cx-tpl-rel">
                  {page.related.map((r) => (
                    <li key={r.href}>
                      {r.href.startsWith('http') ? (
                        <a href={r.href}>
                          {r.label} <Icon name="arrow" />
                        </a>
                      ) : (
                        <NextLink href={r.href}>
                          {r.label} <Icon name="arrow" />
                        </NextLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </Page>
  );
}
