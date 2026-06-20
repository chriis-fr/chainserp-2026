import styled from 'styled-components';
import Accordion from 'components/Accordion';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';

export default function BitcoinFaqSection() {
  return (
    <Wrapper>
      <CustomOverTitle>FAQ</CustomOverTitle>
      <SectionTitle>Common questions about Bitcoin payments</SectionTitle>

      <Accordion title="Is Bitcoin legal in Kenya?">
        Bitcoin is legal to transact in Kenya. It is not legal tender, but the Capital Markets Authority and KRA recognise it as a digital asset. KRA may treat gains as taxable income. Chains ERP keeps immutable, timestamped payment records to support your tax filing.
      </Accordion>

      <Accordion title="How does BTCPay Server work?">
        BTCPay Server is an open-source, self-hosted Bitcoin payment processor. Chains ERP provisions your own dedicated instance at btcpay.chains-erp.com. You control the wallet and private keys — we connect via API to sync payment status to your invoices.
      </Accordion>

      <Accordion title="Can I accept M-Pesa and Bitcoin on the same invoice?">
        Yes. Chains ERP issues a single invoice with multiple payment rails. Your customer sees M-Pesa, bank transfer, and Bitcoin options. Whichever they choose, the invoice is marked paid and your receivables update automatically.
      </Accordion>

      <Accordion title="What if the Bitcoin price moves between invoice creation and payment?">
        BTCPay Server locks the BTC amount at the moment the payment request is generated, based on the live exchange rate. If the customer delays past the expiry window (default: 15 minutes), they request a fresh invoice with the current rate.
      </Accordion>

      <Accordion title="Do I need a crypto license or VASP registration?">
        No. Accepting Bitcoin in exchange for goods or services is not a money service under Kenyan law, and Chains ERP is not a Virtual Asset Service Provider (VASP). We do not custody, pool, or exchange funds on your behalf — your BTCPay node handles all payments autonomously.
      </Accordion>

      <Accordion title="Which Chains ERP plan includes Bitcoin payments?">
        Bitcoin / BTCPay is included in Invoices Scale ($60/mo), Treasury Scale ($95/mo), and the Combined Full Suite ($125/mo). It is the feature that differentiates our higher-tier plans from entry-level options.
      </Accordion>

      <Accordion title="Does BTCPay Server support Lightning Network?">
        Yes. Your BTCPay instance at btcpay.chains-erp.com supports Lightning Network payments out of the box — ideal for near-instant, low-fee micropayments and POS transactions.
      </Accordion>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 5rem;

  & > *:not(:first-child) {
    margin-top: 3rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 1rem;
`;
