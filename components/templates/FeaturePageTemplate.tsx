import { useRouter } from 'next/router';
import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import FAQ from 'components/FAQ';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import StructuredData from 'components/StructuredData';
import { Feature } from 'data/features';

interface FeaturePageTemplateProps {
  feature: Feature;
}

export default function FeaturePageTemplate({ feature }: FeaturePageTemplateProps) {
  const router = useRouter();
  const url = `/features/${feature.slug}`;

  const relatedLinks: InternalLink[] = [
    ...feature.relatedFeatures.map((slug) => ({
      title: `Learn about ${slug.replace(/-/g, ' ')}`,
      href: `/features/${slug}`,
      description: 'Explore related features',
    })),
    ...feature.relatedProblems.map((slug) => ({
      title: `Solve ${slug.replace(/-/g, ' ')}`,
      href: `/problems/${slug}`,
      description: 'Learn how we solve this problem',
    })),
  ];

  const statusBadge = {
    available: { text: 'Available', color: '#10b981' },
    beta: { text: 'Beta', color: '#f59e0b' },
    roadmap: { text: 'Roadmap', color: '#6366f1' },
  }[feature.status];

  return (
    <>
      <SEO
        title={feature.title}
        description={feature.description}
        keywords={feature.keywords}
        url={url}
        type="article"
      />
      <StructuredData
        type="Article"
        data={{
          headline: feature.title,
          description: feature.description,
          image: '/chains.PNG',
          datePublished: new Date().toISOString(),
          author: { name: 'Christopher Odhiambo' },
        }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Features', url: '/features' },
          { name: feature.title, url },
        ]}
      />
      <Container>
        <Header>
          <StatusBadge color={statusBadge.color}>{statusBadge.text}</StatusBadge>
          <Title>{feature.title}</Title>
          <Description>{feature.description}</Description>
        </Header>

        <Content>
          <MainContent>
            <Section>
              <SectionTitle>Overview</SectionTitle>
              <Text>{feature.longDescription}</Text>
            </Section>

            <Section>
              <SectionTitle>Who is this for?</SectionTitle>
              <Text>
                This feature is designed for businesses that need {feature.title.toLowerCase()}. Whether you're a
                startup or enterprise, {feature.title} helps you operate more efficiently.
              </Text>
            </Section>

            <Section>
              <SectionTitle>How Chains ERP approaches {feature.title}</SectionTitle>
              <Text>
                We've built {feature.title} to be simple yet powerful. Our approach focuses on automation,
                compliance, and ease of use.
              </Text>
            </Section>

            <Section>
              <SectionTitle>Problems this removes</SectionTitle>
              <Text>
                {feature.title} eliminates common pain points including manual processes, compliance issues, and
                operational inefficiencies.
              </Text>
            </Section>
          </MainContent>
        </Content>

        {feature.faqs.length > 0 && (
          <Section>
            <FAQ items={feature.faqs} />
          </Section>
        )}

        {relatedLinks.length > 0 && (
          <Section>
            <InternalLinks title="Related Features & Solutions" links={relatedLinks} columns={3} />
          </Section>
        )}
      </Container>
    </>
  );
}

const Header = styled.div`
  text-align: center;
  margin: 4rem 0 6rem 0;
`;

const StatusBadge = styled.span<{ color: string }>`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: ${(p) => p.color}20;
  color: ${(p) => p.color};
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
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

const Content = styled.div`
  margin: 6rem 0;
`;

const MainContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.8;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;
