import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import { industries } from 'data/industries';

export default function IndustriesIndexPage() {
  const links: InternalLink[] = industries.map((industry) => ({
    title: `ERP for ${industry.name}`,
    href: `/industries/${industry.slug}`,
    description: industry.description,
  }));

  return (
    <>
      <SEO
        title="Industries"
        description="Chains ERP solutions tailored for different industries and business types."
        url="/industries"
      />
      <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Industries', url: '/industries' }]} />
      <Container>
        <Header>
          <Title>Industries</Title>
          <Description>
            Chains ERP is designed to serve businesses across industries. Explore solutions tailored for your sector.
          </Description>
        </Header>
        <InternalLinks title="All Industries" links={links} columns={3} />
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
