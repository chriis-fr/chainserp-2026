import styled from 'styled-components';
import { media } from 'utils/media';
import AutofitGrid from 'components/AutofitGrid';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';

const FEATURES = [
  {
    icon: '🔒',
    title: 'Non-custodial by design',
    body: 'You hold your Bitcoin private keys. Chains ERP connects to your BTCPay node via API — we never custody or move your funds.',
  },
  {
    icon: '📱',
    title: 'M-Pesa + Bitcoin on one invoice',
    body: 'Offer M-Pesa, bank transfer, and Bitcoin on the same invoice. Your customer chooses. Your books reconcile either way.',
  },
  {
    icon: '🌍',
    title: 'Invoice globally, settle locally',
    body: 'Bill clients in USD or GBP. Receive Bitcoin. Off-ramp to KES via M-Pesa or local bank. Chains ERP tracks the full FX lifecycle.',
  },
  {
    icon: '⚡',
    title: 'Lightning Network support',
    body: 'Near-instant payments at negligible fees. BTCPay supports Lightning out of the box — perfect for POS and microtransactions.',
  },
  {
    icon: '🚫',
    title: 'Zero chargebacks',
    body: 'Bitcoin transactions are final. Accept international payments without the card fraud and dispute risk common in African markets.',
  },
  {
    icon: '🧾',
    title: 'KRA-ready audit trail',
    body: 'Every Bitcoin payment generates a timestamped on-chain record. Chains ERP exports tax-ready reports aligned with KRA digital asset guidance.',
  },
  {
    icon: '💳',
    title: 'Pay staff in Bitcoin',
    body: 'Combined plan users can process payroll in Bitcoin — useful for remote workers and cross-border contractors who prefer self-custody.',
  },
  {
    icon: '🔗',
    title: 'Open-source infrastructure',
    body: 'BTCPay Server is MIT-licensed. No vendor lock-in — your payments stack, your rules, your keys.',
  },
  {
    icon: '🤝',
    title: 'List on BTCPay host directory',
    body: 'As a third-party BTCPay host, Chains ERP is listed on the official BTCPay Server directory — connecting African merchants to self-custody payments.',
  },
];

export default function FeaturesSection() {
  return (
    <Wrapper>
      <Container>
        <CustomOverTitle>Why Bitcoin with Chains ERP</CustomOverTitle>
        <SectionTitle>The complete Bitcoin stack for African businesses</SectionTitle>
        <CustomAutofitGrid>
          {FEATURES.map((f) => (
            <FeatureCard key={f.title}>
              <Icon>{f.icon}</Icon>
              <Title>{f.title}</Title>
              <Body>{f.body}</Body>
            </FeatureCard>
          ))}
        </CustomAutofitGrid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10rem 0;
  background: rgb(var(--secondary));

  & > * + * {
    margin-top: 3rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 1rem;
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 32rem;
  margin-top: 6rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 28rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem;
  background: rgb(var(--cardBackground));
  box-shadow: var(--shadow-md);
  border-radius: 0.6rem;
  width: 100%;
  color: rgb(var(--text));
  font-size: 1.6rem;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }

  & > * + * {
    margin-top: 1rem;
  }
`;

const Icon = styled.div`
  font-size: 2.8rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.7rem;
`;

const Body = styled.div`
  opacity: 0.6;
  font-size: 1.5rem;
  line-height: 1.6;
`;
