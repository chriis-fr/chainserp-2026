import { GetStaticPaths, GetStaticProps } from 'next';
import SitePageTemplate from 'components/templates/SitePageTemplate';
import { problems } from 'data/problems';
import type { SitePage } from 'data/site-page';

export default function Page({ page }: { page: SitePage }) {
  return <SitePageTemplate page={page} section="Problems" sectionHref="/problems" />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: problems.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = problems.find((p) => p.slug === params?.slug);
  return page ? { props: { page } } : { notFound: true };
};
