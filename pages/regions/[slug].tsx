import { GetStaticPaths, GetStaticProps } from 'next';
import RegionPageTemplate from 'components/templates/RegionPageTemplate';
import { regions, Region } from 'data/regions';

interface RegionPageProps {
  region: Region;
}

export default function RegionPage({ region }: RegionPageProps) {
  return <RegionPageTemplate region={region} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = regions.map((region) => ({
    params: { slug: region.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const region = regions.find((r) => r.slug === params?.slug);

  if (!region) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      region,
    },
  };
};
