import styled from 'styled-components';
import { media } from 'utils/media';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';

const STATS = [
  { value: '$20B+', label: 'Annual crypto received across Africa', source: 'Chainalysis 2024' },
  { value: '52%', label: 'YoY crypto transaction growth, Sub-Saharan Africa', source: 'Chainalysis 2024' },
  { value: '#3', label: 'Fastest-growing crypto region globally', source: 'Chainalysis GCI' },
  { value: '0', label: 'Dominant ERP platforms offering self-custodial BTCPay in Africa', source: 'Market gap' },
];

export default function AfricaStatsSection() {
  return (
    <Wrapper>
      <Container>
        <Header>
          <SectionTitle>Africa leads global crypto adoption</SectionTitle>
          <Lead>
            Sub-Saharan Africa is the world's third-fastest growing crypto economy — yet no ERP platform has built a self-custodial Bitcoin payment layer for the region. Until now.
          </Lead>
        </Header>
        <StatsGrid>
          {STATS.map((s) => (
            <StatCard key={s.value}>
              <StatValue>{s.value}</StatValue>
              <StatLabel>{s.label}</StatLabel>
              <StatSource>{s.source}</StatSource>
            </StatCard>
          ))}
        </StatsGrid>
        <CalloutBox>
          <CalloutText>
            Chains ERP is the first African ERP with a fully integrated, self-custodial BTCPay Server — no middleman, no pooled wallet, no fund risk.
          </CalloutText>
        </CalloutBox>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 10rem 0;
  background: rgb(var(--background));
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 6rem;
`;

const Lead = styled.p`
  font-size: 1.8rem;
  line-height: 1.65;
  color: rgb(var(--text));
  opacity: 0.65;
  max-width: 65rem;
  margin: 2rem auto 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  margin-bottom: 5rem;

  ${media('<=tablet')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1rem;
`;

const StatValue = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: rgb(var(--primary));
  line-height: 1;
  margin-bottom: 1rem;

  ${media('<=phone')} {
    font-size: 3.2rem;
  }
`;

const StatLabel = styled.p`
  font-size: 1.5rem;
  color: rgb(var(--text));
  line-height: 1.4;
  margin-bottom: 0.8rem;
`;

const StatSource = styled.p`
  font-size: 1.2rem;
  color: rgb(var(--text));
  opacity: 0.4;
  font-style: italic;
`;

const CalloutBox = styled.div`
  background: rgba(var(--primary), 0.08);
  border-left: 4px solid rgb(var(--primary));
  border-radius: 0.6rem;
  padding: 2.5rem 3rem;
  max-width: 70rem;
  margin: 0 auto;
`;

const CalloutText = styled.p`
  font-size: 1.7rem;
  line-height: 1.6;
  color: rgb(var(--text));
  font-weight: 500;
  margin: 0;
`;
