import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import { comparisons } from 'data/comparisons';

export default function CompareIndexPage() {
  const links: InternalLink[] = comparisons.map((comparison) => ({
    title: comparison.title,
    href: `/compare/${comparison.slug}`,
    description: comparison.description,
  }));

  return (
    <>
      <SEO
        title="Compare Chains ERP"
        description="Compare Chains ERP with other solutions to find the right fit for your business."
        url="/compare"
      />
      <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare' }]} />
      <Container>
        <Header>
          <Title>Compare Chains ERP</Title>
          <Description>
            See how Chains ERP compares to other solutions. Make an informed decision for your business.
          </Description>
        </Header>
        <InternalLinks title="All Comparisons" links={links} columns={2} />
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
