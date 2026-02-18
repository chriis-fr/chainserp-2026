import { GetStaticPaths, GetStaticProps } from 'next';
import IndustryPageTemplate from 'components/templates/IndustryPageTemplate';
import { industries, Industry } from 'data/industries';

interface IndustryPageProps {
  industry: Industry;
}

export default function IndustryPage({ industry }: IndustryPageProps) {
  return <IndustryPageTemplate industry={industry} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = industries.map((industry) => ({
    params: { slug: industry.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const industry = industries.find((i) => i.slug === params?.slug);

  if (!industry) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      industry,
    },
  };
};
