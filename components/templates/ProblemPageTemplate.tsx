import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import FAQ from 'components/FAQ';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import StructuredData from 'components/StructuredData';
import { Problem } from 'data/problems';

interface ProblemPageTemplateProps {
  problem: Problem;
}

export default function ProblemPageTemplate({ problem }: ProblemPageTemplateProps) {
  const url = `/problems/${problem.slug}`;

  const relatedLinks: InternalLink[] = [
    ...problem.relatedFeatures.map((slug) => ({
      title: `Feature: ${slug.replace(/-/g, ' ')}`,
      href: `/features/${slug}`,
      description: 'See how we solve this',
    })),
    ...problem.relatedProblems.map((slug) => ({
      title: `Related: ${slug.replace(/-/g, ' ')}`,
      href: `/problems/${slug}`,
      description: 'Explore related challenges',
    })),
  ];

  return (
    <>
      <SEO
        title={problem.title}
        description={problem.description}
        keywords={problem.keywords}
        url={url}
        type="article"
      />
      <StructuredData
        type="Article"
        data={{
          headline: problem.title,
          description: problem.description,
          image: '/chains.PNG',
          datePublished: new Date().toISOString(),
          author: { name: 'Christopher Odhiambo' },
        }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Problems', url: '/problems' },
          { name: problem.title, url },
        ]}
      />
      <Container>
        <Header>
          <Title>{problem.title}</Title>
          <Description>{problem.description}</Description>
        </Header>

        <Content>
          <Section>
            <SectionTitle>Understanding the Problem</SectionTitle>
            <Text>{problem.longDescription}</Text>
          </Section>

          <Section>
            <SectionTitle>Impact on Your Business</SectionTitle>
            <ImpactList>
              {problem.impact.map((item, index) => (
                <ImpactItem key={index}>
                  <ImpactIcon>⚠</ImpactIcon>
                  {item}
                </ImpactItem>
              ))}
            </ImpactList>
          </Section>

          <SolutionSection>
            <SolutionTitle>How Chains ERP Solves This</SolutionTitle>
            <SolutionText>{problem.solution}</SolutionText>
          </SolutionSection>
        </Content>

        {problem.faqs.length > 0 && (
          <Section>
            <FAQ items={problem.faqs} />
          </Section>
        )}

        {relatedLinks.length > 0 && (
          <Section>
            <InternalLinks title="Related Solutions" links={relatedLinks} columns={3} />
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

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.8;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;

const ImpactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ImpactItem = styled.li`
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

const ImpactIcon = styled.span`
  font-size: 2rem;
  flex-shrink: 0;
`;

const SolutionSection = styled.section`
  background: linear-gradient(135deg, rgb(var(--primary)) 0%, rgba(var(--primary), 0.8) 100%);
  border-radius: 0.5rem;
  padding: 4rem;
  margin: 6rem 0;
  color: white;
`;

const SolutionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: white;
`;

const SolutionText = styled.p`
  font-size: 1.8rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
`;
