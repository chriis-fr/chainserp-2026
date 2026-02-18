import { GetStaticPaths, GetStaticProps } from 'next';
import FeaturePageTemplate from 'components/templates/FeaturePageTemplate';
import { features, Feature } from 'data/features';

interface FeaturePageProps {
  feature: Feature;
}

export default function FeaturePage({ feature }: FeaturePageProps) {
  return <FeaturePageTemplate feature={feature} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = features.map((feature) => ({
    params: { slug: feature.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const feature = features.find((f) => f.slug === params?.slug);

  if (!feature) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      feature,
    },
  };
};
