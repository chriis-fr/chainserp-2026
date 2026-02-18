import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';

export default function PricingTablesSection() {
  return (
    <Wrapper>
      <SectionTitle>Flexible pricing for agile teams</SectionTitle>
      <AutofitGrid>
        <PricingCard
          title="free"
          description="Give us a try for free"
          benefits={['1 seat', '1 active project', 'Ulimited invoices']}
        >
          $0<span>/month</span>
        </PricingCard>
        <PricingCard
          title="Starter"
          description="Best for individual desginers"
          benefits={['5 seats', 'integrations with tools you use', 'Ulimited viewers', 'CSV Downloader', 'Password protection']}
          isOutlined
        >
          $39<span>/month</span>
        </PricingCard>
        <PricingCard
          title="Premium"
          description="Get your team together"
          benefits={[
            '10 seat',
            'multi-entity and multi-currency support',
            'Ulimited viewers',
            'CSV Downloader',
            'Password protection',
            'Customization',
          ]}
        >
          $79<span>/month</span>
        </PricingCard>
      </AutofitGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;
