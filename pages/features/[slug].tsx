import { GetStaticPaths, GetStaticProps } from 'next';
import SitePageTemplate from 'components/templates/SitePageTemplate';
import { features } from 'data/features';
import type { SitePage } from 'data/site-page';

export default function Page({ page }: { page: SitePage }) {
  return <SitePageTemplate page={page} section="Features" sectionHref="/features" />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: features.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = features.find((p) => p.slug === params?.slug);
  return page ? { props: { page } } : { notFound: true };
};
