import styled from 'styled-components';
import Container from 'components/Container';
import SEO from 'components/SEO';
import HeroSection from 'views/BitcoinPage/HeroSection';
import HowItWorksSection from 'views/BitcoinPage/HowItWorksSection';
import FeaturesSection from 'views/BitcoinPage/FeaturesSection';
import AfricaStatsSection from 'views/BitcoinPage/AfricaStatsSection';
import BitcoinFaqSection from 'views/BitcoinPage/FaqSection';

const BTCPAY_URL = 'https://btcpay.chains-erp.com';
const APP_URL = 'https://global.chains-erp.com/auth';

export default function AcceptBitcoinPaymentsPage() {
  return (
    <>
      <SEO
        title="Accept Bitcoin Payments in Africa | Chains ERP + BTCPay Server"
        description="Self-custodial Bitcoin invoicing for African businesses. Your own BTCPay Server node — integrated with Chains ERP. Invoice in USD or KES, receive BTC, reconcile automatically. No middleman. No chargebacks. KRA-ready."
        keywords={[
          'accept bitcoin payments Kenya',
          'BTCPay Server Africa',
          'BTCPay Server hosting Kenya',
          'Bitcoin invoicing Africa',
          'self-custodial Bitcoin business',
          'Bitcoin M-Pesa payment',
          'Bitcoin ERP Africa',
          'crypto payments Kenya',
          'Lightning Network Kenya',
          'Bitcoin payroll Africa',
          'accept crypto payments Kenya',
          'BTCPay third party host Africa',
          'Bitcoin accounting Kenya',
          'non-custodial Bitcoin payments',
          'Bitcoin invoice software Africa',
        ]}
        url="/accept-bitcoin-payments"
      />

      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AfricaStatsSection />

      <Container>
        <BitcoinFaqSection />
        <CtaBlock>
          <CtaHeading>Ready to accept Bitcoin?</CtaHeading>
          <CtaBody>
            Open your BTCPay portal and start receiving payments in minutes. Already have a Chains ERP account? Bitcoin is already waiting for you on Scale and Full Suite plans.
          </CtaBody>
          <CtaButtons>
            <CtaPrimary href={BTCPAY_URL} target="_blank" rel="noopener noreferrer">
              Open BTCPay Portal
            </CtaPrimary>
            <CtaSecondary href={APP_URL} target="_blank" rel="noopener noreferrer">
              Start with Chains ERP
            </CtaSecondary>
          </CtaButtons>
        </CtaBlock>
      </Container>
    </>
  );
}

const CtaBlock = styled.div`
  margin: 10rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const CtaHeading = styled.h2`
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: rgb(var(--text));
`;

const CtaBody = styled.p`
  font-size: 1.7rem;
  line-height: 1.65;
  color: rgb(var(--text));
  opacity: 0.65;
  max-width: 55rem;
`;

const CtaButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const CtaPrimary = styled.a`
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

const CtaSecondary = styled.a`
  display: inline-block;
  padding: 1.4rem 2.8rem;
  background: transparent;
  color: rgb(var(--primary));
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid rgb(var(--primary));
  border-radius: 0.4rem;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgb(var(--primary));
    color: #fff;
  }
`;
