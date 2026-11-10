import { GetStaticPaths, GetStaticProps } from 'next';
import SitePageTemplate from 'components/templates/SitePageTemplate';
import { regions } from 'data/regions';
import type { SitePage } from 'data/site-page';

export default function Page({ page }: { page: SitePage }) {
  return <SitePageTemplate page={page} section="Regions" sectionHref="/regions" />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: regions.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = regions.find((p) => p.slug === params?.slug);
  return page ? { props: { page } } : { notFound: true };
};
