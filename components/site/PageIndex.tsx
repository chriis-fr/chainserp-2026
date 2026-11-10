import NextLink from 'next/link';
import Page from 'components/Page';
import { Icon } from 'components/site/Icon';
import type { SitePage } from 'data/site-page';

/** Index of one section (features, industries, …): a card per page. */
export default function PageIndex({
  eyebrow,
  title,
  description,
  base,
  pages,
  intro,
}: {
  eyebrow: string;
  title: string;
  description: string;
  base: string;
  pages: SitePage[];
  intro?: React.ReactNode;
}) {
  return (
    <Page eyebrow={eyebrow} title={title} description={description}>
      <div className="cx cx-tpl">
        {intro}
        <div className="cx-idx">
          {pages.map((p) => (
            <NextLink className="cx-idx-card" key={p.slug} href={`${base}/${p.slug}`}>
              <span className="cx-eyebrow">{p.eyebrow}</span>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <span className="cx-link">
                Read more <Icon name="arrow" />
              </span>
            </NextLink>
          ))}
        </div>
      </div>
    </Page>
  );
}
