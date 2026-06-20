import styled from 'styled-components';
import { media } from 'utils/media';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';

const STEPS = [
  {
    number: '01',
    icon: '🔑',
    title: 'Your keys. Your node.',
    body: 'We provision a dedicated BTCPay Server instance at btcpay.chains-erp.com. You own the wallet and private keys — Chains ERP never holds or sees your funds.',
  },
  {
    number: '02',
    icon: '🧾',
    title: 'Create a Bitcoin invoice',
    body: 'Generate a payment request from Chains ERP or directly in BTCPay. Set the amount in USD or KES — BTCPay locks the BTC rate at checkout.',
  },
  {
    number: '03',
    icon: '⚡',
    title: 'Customer pays on-chain or Lightning',
    body: 'Your customer scans a QR code or pastes the Lightning invoice. Funds arrive in your wallet within seconds — no bank, no intermediary.',
  },
  {
    number: '04',
    icon: '📊',
    title: 'Auto-reconciled in Chains ERP',
    body: 'The confirmed payment syncs to your Accounts Receivable automatically. Invoice marked paid, books updated, KRA-ready record created.',
  },
];

export default function HowItWorksSection() {
  return (
    <Wrapper>
      <Container>
        <CustomOverTitle>How it works</CustomOverTitle>
        <SectionTitle>From invoice to settlement in four steps</SectionTitle>
        <Steps>
          {STEPS.map((step, i) => (
            <Step key={step.number}>
              {i < STEPS.length - 1 && <Connector />}
              <StepNumber>{step.number}</StepNumber>
              <StepIcon>{step.icon}</StepIcon>
              <StepTitle>{step.title}</StepTitle>
              <StepBody>{step.body}</StepBody>
            </Step>
          ))}
        </Steps>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10rem 0;
  background: rgb(var(--background));

  & > * + * {
    margin-top: 3rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 1rem;
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 6rem;
  position: relative;

  ${media('<=tablet')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.5rem;
  background: rgb(var(--cardBackground));
  box-shadow: var(--shadow-md);
  border-radius: 0.6rem;
  position: relative;
`;

const Connector = styled.div`
  display: none;
`;

const StepNumber = styled.span`
  font-size: 4.5rem;
  font-weight: 800;
  color: rgba(var(--primary), 0.15);
  line-height: 1;
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  user-select: none;
`;

const StepIcon = styled.div`
  font-size: 2.6rem;
  margin-bottom: 1.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const StepBody = styled.p`
  font-size: 1.5rem;
  line-height: 1.65;
  color: rgb(var(--text));
  opacity: 0.65;
`;
