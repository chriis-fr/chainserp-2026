import { GetServerSideProps } from 'next';
import { generateSitemapXml } from 'utils/sitemap';

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = generateSitemapXml();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};
