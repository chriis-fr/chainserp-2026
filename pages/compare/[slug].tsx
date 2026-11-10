import { GetStaticPaths, GetStaticProps } from 'next';
import SitePageTemplate from 'components/templates/SitePageTemplate';
import { comparisons } from 'data/comparisons';
import type { SitePage } from 'data/site-page';

export default function Page({ page }: { page: SitePage }) {
  return <SitePageTemplate page={page} section="Compare" sectionHref="/compare" />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: comparisons.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = comparisons.find((p) => p.slug === params?.slug);
  return page ? { props: { page } } : { notFound: true };
};
