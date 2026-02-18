import Link from 'next/link';
import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import { features } from 'data/features';

export default function FeaturesIndexPage() {
  const links: InternalLink[] = features.map((feature) => ({
    title: feature.title,
    href: `/features/${feature.slug}`,
    description: feature.description,
  }));

  return (
    <>
      <SEO
        title="Features"
        description="Explore all features of Chains ERP - from global invoicing to crypto payroll and more."
        url="/features"
      />
      <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Features', url: '/features' }]} />
      <Container>
        <Header>
          <Title>Features</Title>
          <Description>
            Explore the comprehensive features that make Chains ERP the leading platform for global finance operations.
          </Description>
        </Header>
        <InternalLinks title="All Features" links={links} columns={3} />
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
