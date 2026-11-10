import { GetStaticPaths, GetStaticProps } from 'next';
import SitePageTemplate from 'components/templates/SitePageTemplate';
import { industries } from 'data/industries';
import type { SitePage } from 'data/site-page';

export default function Page({ page }: { page: SitePage }) {
  return <SitePageTemplate page={page} section="Industries" sectionHref="/industries" />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: industries.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = industries.find((p) => p.slug === params?.slug);
  return page ? { props: { page } } : { notFound: true };
};
