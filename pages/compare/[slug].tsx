import { GetStaticPaths, GetStaticProps } from 'next';
import ComparisonPageTemplate from 'components/templates/ComparisonPageTemplate';
import { comparisons, Comparison } from 'data/comparisons';

interface ComparisonPageProps {
  comparison: Comparison;
}

export default function ComparisonPage({ comparison }: ComparisonPageProps) {
  return <ComparisonPageTemplate comparison={comparison} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = comparisons.map((comparison) => ({
    params: { slug: comparison.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comparison = comparisons.find((c) => c.slug === params?.slug);

  if (!comparison) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      comparison,
    },
  };
};
