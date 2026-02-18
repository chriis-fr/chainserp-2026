import { GetStaticPaths, GetStaticProps } from 'next';
import ProblemPageTemplate from 'components/templates/ProblemPageTemplate';
import { problems, Problem } from 'data/problems';

interface ProblemPageProps {
  problem: Problem;
}

export default function ProblemPage({ problem }: ProblemPageProps) {
  return <ProblemPageTemplate problem={problem} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = problems.map((problem) => ({
    params: { slug: problem.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const problem = problems.find((p) => p.slug === params?.slug);

  if (!problem) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      problem,
    },
  };
};
