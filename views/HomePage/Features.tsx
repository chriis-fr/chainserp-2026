import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Container from 'components/Container';
import { media } from 'utils/media';

const FEATURES = [
  {
    imageUrl: '/grid-icons/asset-1.svg',
    title: 'Grow without switching systems',
    description:
      'Start independent, expand to teams, scale to enterprise — the same platform adapts vertically and horizontally.',
  },
  {
    imageUrl: '/grid-icons/asset-2.svg',
    title: 'Global by default- any country, any currency',
    description:
      'Operate across regions with built-in multi-currency, global tax logic, and international payment support.'
  },
  {
    imageUrl: '/grid-icons/asset-3.svg',
    title: 'Real-Time, accurate Accounting',
    description:
      'Every transaction posts instantly to the ledger, keeping financials audit-ready at all times.',
  },
  {
    imageUrl: '/grid-icons/asset-4.svg',
    title: 'Finance-first design. Zero learning curve.',
    description:
      'Navigate invoices, payables, payroll, and reports without training or complex setup.',
  },
  {
    imageUrl: '/grid-icons/asset-5.svg',
    title: 'One invoice. Every system updated.',
    description:
      'Invoices automatically sync with accounting, payments, receivables, and reporting — no duplicates, no reconciliation.',
  },
  {
    imageUrl: '/grid-icons/asset-6.svg',
    title: 'Unified Finance Operations Stack',
    description:
      'Invoicing, accounting, payroll, expenses, analytics, and payments live in one connected system.',
  },
  {
    imageUrl: '/grid-icons/asset-7.svg',
    title: 'Automation Where It Matters',
    description:
      'Automated approvals, reminders, reconciliations, and reporting reduce manual finance work drastically.',
  },
  {
    imageUrl: '/grid-icons/asset-8.svg',
    title: 'Security, roles, and audit trails built in.',
    description:
      'Enterprise-Grade Control: Granular permissions, full activity logs, and compliance-ready data for serious organizations.',
  },
  {
    imageUrl: '/grid-icons/asset-9.svg',
    title: 'Smarter decisions, not just data.',
    description:
      'AI assists with insights, forecasting, anomaly detection, and workflow optimization for finance teams.',
  },
];

export default function Features() {
  return (
    <Container>
      <CustomAutofitGrid>
        {FEATURES.map((singleFeature, idx) => (
          <BasicCard key={singleFeature.imageUrl} {...singleFeature} />
        ))}
      </CustomAutofitGrid>
    </Container>
  );
}

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
