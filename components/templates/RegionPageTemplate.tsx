import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import StructuredData from 'components/StructuredData';
import { Region } from 'data/regions';

interface RegionPageTemplateProps {
  region: Region;
}

export default function RegionPageTemplate({ region }: RegionPageTemplateProps) {
  const url = `/regions/${region.slug}`;

  const relatedLinks: InternalLink[] = region.relatedFeatures.map((slug) => ({
    title: `Feature: ${slug.replace(/-/g, ' ')}`,
    href: `/features/${slug}`,
    description: 'Explore this feature',
  }));

  return (
    <>
      <SEO
        title={`ERP for ${region.name}`}
        description={region.description}
        keywords={region.keywords}
        url={url}
        type="article"
      />
      <StructuredData
        type="Article"
        data={{
          headline: `ERP for ${region.name}`,
          description: region.description,
          image: '/chains.PNG',
          datePublished: new Date().toISOString(),
          author: { name: 'Christopher Odhiambo' },
        }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Regions', url: '/regions' },
          { name: region.name, url },
        ]}
      />
      <Container>
        <Header>
          <Title>ERP for {region.name}</Title>
          <Description>{region.description}</Description>
        </Header>

        <Content>
          <Section>
            <SectionTitle>Challenges in {region.name}</SectionTitle>
            <ChallengesList>
              {region.challenges.map((challenge, index) => (
                <ChallengeItem key={index}>
                  <ChallengeIcon>•</ChallengeIcon>
                  {challenge}
                </ChallengeItem>
              ))}
            </ChallengesList>
          </Section>

          <Section>
            <SectionTitle>Our Solutions</SectionTitle>
            <SolutionsList>
              {region.solutions.map((solution, index) => (
                <SolutionItem key={index}>
                  <SolutionIcon>✓</SolutionIcon>
                  {solution}
                </SolutionItem>
              ))}
            </SolutionsList>
          </Section>

          <InfoGrid>
            <InfoCard>
              <InfoTitle>Regulations</InfoTitle>
              <InfoList>
                {region.regulations.map((reg, index) => (
                  <InfoItem key={index}>{reg}</InfoItem>
                ))}
              </InfoList>
            </InfoCard>

            <InfoCard>
              <InfoTitle>Supported Currencies</InfoTitle>
              <CurrencyList>
                {region.currencies.map((currency, index) => (
                  <CurrencyBadge key={index}>{currency}</CurrencyBadge>
                ))}
              </CurrencyList>
            </InfoCard>
          </InfoGrid>
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin: 4rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--border));
  border-radius: 0.5rem;
  padding: 3rem;
`;

const InfoTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  padding: 1rem 0;
  font-size: 1.5rem;
  border-bottom: 1px solid rgb(var(--border));

  &:last-child {
    border-bottom: none;
  }
`;

const CurrencyList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CurrencyBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgb(var(--primary));
  color: white;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
`;
