import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import FAQ from 'components/FAQ';
import SEO from 'components/SEO';
import StructuredData from 'components/StructuredData';
import { Comparison } from 'data/comparisons';

interface ComparisonPageTemplateProps {
  comparison: Comparison;
}

export default function ComparisonPageTemplate({ comparison }: ComparisonPageTemplateProps) {
  const url = `/compare/${comparison.slug}`;

  return (
    <>
      <SEO
        title={comparison.title}
        description={comparison.description}
        keywords={comparison.keywords}
        url={url}
        type="article"
      />
      <StructuredData
        type="Article"
        data={{
          headline: comparison.title,
          description: comparison.description,
          image: '/chains.PNG',
          datePublished: new Date().toISOString(),
          author: { name: 'Christopher Odhiambo' },
        }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Compare', url: '/compare' },
          { name: comparison.title, url },
        ]}
      />
      <Container>
        <Header>
          <Title>{comparison.title}</Title>
          <Description>{comparison.description}</Description>
        </Header>

        <ComparisonGrid>
          <ComparisonColumn>
            <ColumnHeader>
              <ColumnTitle>Chains ERP</ColumnTitle>
            </ColumnHeader>
            <AdvantagesList>
              {comparison.chainsAdvantages.map((advantage, index) => (
                <AdvantageItem key={index}>
                  <CheckIcon>✓</CheckIcon>
                  {advantage}
                </AdvantageItem>
              ))}
            </AdvantagesList>
          </ComparisonColumn>

          <ComparisonColumn>
            <ColumnHeader>
              <ColumnTitle>{comparison.competitor}</ColumnTitle>
            </ColumnHeader>
            <AdvantagesList>
              {comparison.competitorAdvantages.map((advantage, index) => (
                <AdvantageItem key={index}>
                  <CheckIcon>✓</CheckIcon>
                  {advantage}
                </AdvantageItem>
              ))}
            </AdvantagesList>
          </ComparisonColumn>
        </ComparisonGrid>

        <UseCaseSection>
          <UseCaseTitle>Which should you choose?</UseCaseTitle>
          <UseCaseText>{comparison.useCase}</UseCaseText>
        </UseCaseSection>

        {comparison.faqs.length > 0 && (
          <Section>
            <FAQ items={comparison.faqs} />
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

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin: 6rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonColumn = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--border));
  border-radius: 0.5rem;
  padding: 3rem;
`;

const ColumnHeader = styled.div`
  border-bottom: 2px solid rgb(var(--border));
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;

const ColumnTitle = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`;

const AdvantagesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AdvantageItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  font-size: 1.6rem;
  line-height: 1.6;
`;

const CheckIcon = styled.span`
  color: rgb(var(--primary));
  font-weight: bold;
  flex-shrink: 0;
`;

const UseCaseSection = styled.section`
  background: rgb(var(--cardBackground));
  border-radius: 0.5rem;
  padding: 4rem;
  margin: 6rem 0;
  text-align: center;
`;

const UseCaseTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const UseCaseText = styled.p`
  font-size: 1.8rem;
  line-height: 1.8;
  color: rgb(var(--textSecondary));
`;

const Section = styled.section`
  margin: 4rem 0;
`;
