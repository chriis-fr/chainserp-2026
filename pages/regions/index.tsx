import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import { regions } from 'data/regions';

export default function RegionsIndexPage() {
  const links: InternalLink[] = regions.map((region) => ({
    title: `ERP for ${region.name}`,
    href: `/regions/${region.slug}`,
    description: region.description,
  }));

  return (
    <>
      <SEO
        title="Regions"
        description="Chains ERP solutions optimized for businesses operating in different regions worldwide."
        url="/regions"
      />
      <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Regions', url: '/regions' }]} />
      <Container>
        <Header>
          <Title>Regions</Title>
          <Description>
            Chains ERP supports businesses operating globally. Explore region-specific solutions and compliance
            features.
          </Description>
        </Header>
        <InternalLinks title="All Regions" links={links} columns={3} />
      </Container>
    </>
  );
}

const Header = styled.div`
  text-align: center;
  margin: 4rem 0 6rem 0;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 2rem;
  color: rgb(var(--textSecondary));
  max-width: 80rem;
  margin: 0 auto;
`;
