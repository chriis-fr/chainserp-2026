import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import StructuredData from 'components/StructuredData';
import { Industry } from 'data/industries';

interface IndustryPageTemplateProps {
  industry: Industry;
}

export default function IndustryPageTemplate({ industry }: IndustryPageTemplateProps) {
  const url = `/industries/${industry.slug}`;

  const relatedLinks: InternalLink[] = industry.relatedFeatures.map((slug) => ({
    title: `Feature: ${slug.replace(/-/g, ' ')}`,
    href: `/features/${slug}`,
    description: 'Explore this feature',
  }));

  return (
    <>
      <SEO
        title={`ERP for ${industry.name} Companies`}
        description={industry.description}
        keywords={industry.keywords}
        url={url}
        type="article"
      />
      <StructuredData
        type="Article"
        data={{
          headline: `ERP for ${industry.name}`,
          description: industry.description,
          image: '/chains.PNG',
          datePublished: new Date().toISOString(),
          author: { name: 'Christopher Odhiambo' },
        }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Industries', url: '/industries' },
          { name: industry.name, url },
        ]}
      />
      <Container>
        <Header>
          <Title>ERP for {industry.name}</Title>
          <Description>{industry.description}</Description>
        </Header>

        <Content>
          <Section>
            <SectionTitle>Challenges in {industry.name}</SectionTitle>
            <ChallengesList>
              {industry.challenges.map((challenge, index) => (
                <ChallengeItem key={index}>
                  <ChallengeIcon>•</ChallengeIcon>
                  {challenge}
                </ChallengeItem>
              ))}
            </ChallengesList>
          </Section>

          <Section>
            <SectionTitle>How Chains ERP Helps</SectionTitle>
            <SolutionsList>
              {industry.solutions.map((solution, index) => (
                <SolutionItem key={index}>
                  <SolutionIcon>✓</SolutionIcon>
                  {solution}
                </SolutionItem>
              ))}
            </SolutionsList>
          </Section>
        </Content>

        {relatedLinks.length > 0 && (
          <Section>
            <InternalLinks title="Relevant Features" links={relatedLinks} columns={3} />
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
  max-width: 90rem;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const ChallengesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ChallengeItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgb(var(--cardBackground));
  border-left: 4px solid #ef4444;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  line-height: 1.6;
`;

const ChallengeIcon = styled.span`
  color: #ef4444;
  font-weight: bold;
  flex-shrink: 0;
  font-size: 2rem;
`;

const SolutionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SolutionItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgb(var(--cardBackground));
  border-left: 4px solid rgb(var(--primary));
  margin-bottom: 1rem;
  font-size: 1.6rem;
  line-height: 1.6;
`;

const SolutionIcon = styled.span`
  color: rgb(var(--primary));
  font-weight: bold;
  flex-shrink: 0;
  font-size: 2rem;
`;
