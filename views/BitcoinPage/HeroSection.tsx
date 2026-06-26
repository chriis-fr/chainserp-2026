import styled from 'styled-components';
import { media } from 'utils/media';
import Container from 'components/Container';

const APP_URL = 'https://app.chains-erp.com/auth';
const BTCPAY_URL = 'https://btcpay.chains-erp.com';

export default function HeroSection() {
  return (
    <HeroWrapper>
      <Container>
        <Inner>
          <Eyebrow>₿ Powered by BTCPay Server · Self-custodial</Eyebrow>
          <Heading>Accept Bitcoin Payments.<br />Built for Africa.</Heading>
          <Description>
            Your own BTCPay node — hosted, maintained, and integrated with Chains ERP. Invoice in USD or KES, receive BTC or Lightning, settle via M-Pesa. You hold the keys. We handle the books.
          </Description>
          <Buttons>
            <PrimaryBtn href={BTCPAY_URL} target="_blank" rel="noopener noreferrer">
              Open Your BTCPay Portal
            </PrimaryBtn>
            <SecondaryBtn href={APP_URL} target="_blank" rel="noopener noreferrer">
              Get Chains ERP
            </SecondaryBtn>
          </Buttons>
          <Trust>
            No fund custody &nbsp;·&nbsp; No chargebacks &nbsp;·&nbsp; Auto-reconciled &nbsp;·&nbsp; KRA-ready
          </Trust>
        </Inner>
      </Container>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.div`
  background: rgb(var(--secondary));
  padding: 10rem 0 8rem;

  ${media('<=tablet')} {
    padding: 7rem 0 5rem;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 80rem;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(var(--primary));
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 6.4rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: rgb(var(--textSecondary));
  margin-bottom: 2.5rem;

  ${media('<=tablet')} {
    font-size: 4.4rem;
  }

  ${media('<=phone')} {
    font-size: 3.6rem;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  line-height: 1.65;
  color: rgba(var(--textSecondary), 0.8);
  max-width: 60rem;
  margin-bottom: 4rem;

  ${media('<=phone')} {
    font-size: 1.6rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
`;

const PrimaryBtn = styled.a`
  display: inline-block;
  padding: 1.4rem 2.8rem;
  background: rgb(var(--primary));
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.4rem;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: scale(1.025);
    box-shadow: 0 4px 20px rgba(var(--primary), 0.35);
  }
`;

const SecondaryBtn = styled.a`
  display: inline-block;
  padding: 1.4rem 2.8rem;
  background: transparent;
  color: rgb(var(--textSecondary));
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid rgba(var(--textSecondary), 0.3);
  border-radius: 0.4rem;
  text-decoration: none;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: rgba(var(--textSecondary), 0.7);
  }
`;

const Trust = styled.p`
  font-size: 1.3rem;
  color: rgba(var(--textSecondary), 0.5);
  letter-spacing: 0.03em;
`;
