import styled from 'styled-components';
import SectionTitle from 'components/SectionTitle';
import Button from 'components/Button';
import { media } from 'utils/media';

const CTA = 'https://global.chains-erp.com/auth';

const MODULES = [
  {
    id: 'invoices',
    icon: '🧾',
    title: 'Invoices',
    tagline: 'Create, send, and track invoices globally with real-time reconciliation.',
    tiers: [
      {
        name: 'Starter',
        price: '$0',
        period: '/mo',
        label: null,
        features: ['5 invoices / month', '$2k processing volume', 'Payment tracking'],
      },
      {
        name: 'Growth',
        price: '$14',
        period: '/seat/mo',
        label: 'Popular',
        features: ['100 invoices / month', '$25k processing volume', 'Real-time reconciliation', 'API access'],
      },
      {
        name: 'Scale',
        price: '$60',
        period: '/mo · 5 seats',
        label: null,
        features: ['Unlimited invoices', '$100k processing volume', 'Approval workflows', 'Finance controls', 'Audit logs'],
      },
    ],
  },
  {
    id: 'treasury',
    icon: '🏦',
    title: 'Treasury',
    tagline: 'Manage vendor payables, bills, and batch payouts with approval gates.',
    tiers: [
      {
        name: 'Team',
        price: '$27',
        period: '/mo · 3 seats',
        label: null,
        features: ['Batch payments', 'Bill management', '$50k monthly volume', '0.7% transaction fee'],
      },
      {
        name: 'Scale',
        price: '$95',
        period: '/mo · 5 seats',
        label: 'Popular',
        features: ['Payroll & expenses', 'Finance controls', 'Audit logs', '$150k volume · 0.5% fee'],
      },
    ],
  },
  {
    id: 'payroll',
    icon: '💳',
    title: 'Payroll',
    tagline: 'Run salary cycles, manage employees, and automate tax calculations.',
    tiers: [
      {
        name: 'Starter',
        price: '$9.99',
        period: '/seat/mo',
        label: null,
        features: ['Up to 20 employees / run', 'Digital payslips', 'Treasury payouts', 'Tax calculations'],
      },
      {
        name: 'Growth',
        price: '$20',
        period: '/seat/mo',
        label: 'Popular',
        features: ['Unlimited employees', 'Unlimited payroll runs', 'Multi-region payroll', 'Compliance reporting'],
      },
    ],
  },
  {
    id: 'combined',
    icon: '⚡',
    title: 'Combined',
    tagline: 'All modules in one plan — invoices, payables, payroll, and controls.',
    tiers: [
      {
        name: 'Pro',
        price: '$19',
        period: '/seat/mo',
        label: 'Popular',
        features: ['200 invoices / month', '$75k volume · 0.6% fee', 'Payroll (20 emp)', 'Integrations'],
      },
      {
        name: 'Scale',
        price: '$125',
        period: '/mo · 5 seats',
        label: 'Best Value',
        features: ['Unlimited invoices', '$250k volume · 0.4% fee', 'Unlimited payroll', 'Advanced workflows', 'Audit logs'],
      },
    ],
  },
];

export default function PricingTablesSection() {
  return (
    <Wrapper>
      <SectionTitle>Simple, module-based pricing</SectionTitle>
      <Lead>Pay only for what your team uses. Start free on invoices and add modules as you grow.</Lead>

      {MODULES.map((mod) => (
        <ModuleBlock key={mod.id}>
          <ModuleLabel>
            <ModuleIcon aria-hidden="true">{mod.icon}</ModuleIcon>
            <div>
              <ModuleTitle>{mod.title}</ModuleTitle>
              <ModuleTagline>{mod.tagline}</ModuleTagline>
            </div>
          </ModuleLabel>
          <TierRow $count={mod.tiers.length}>
            {mod.tiers.map((tier) => (
              <TierCard key={tier.name} $highlighted={!!tier.label}>
                {tier.label && <Badge>{tier.label}</Badge>}
                <TierName>{tier.name}</TierName>
                <TierPrice>
                  {tier.price}<PricePeriod>{tier.period}</PricePeriod>
                </TierPrice>
                <FeatureList>
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </FeatureList>
                <TierButton href={CTA} target="_blank" rel="noopener noreferrer" $highlighted={!!tier.label}>
                  Get started
                </TierButton>
              </TierCard>
            ))}
          </TierRow>
        </ModuleBlock>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 5rem;
  }
`;

const Lead = styled.p`
  text-align: center;
  font-size: 1.7rem;
  color: rgb(var(--text));
  opacity: 0.6;
  margin-top: -2rem;
`;

const ModuleBlock = styled.div`
  border: 1px solid rgba(var(--text), 0.12);
  border-radius: 1rem;
  padding: 3rem;
`;

const ModuleLabel = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const ModuleIcon = styled.span`
  font-size: 3rem;
  line-height: 1;
  flex-shrink: 0;
`;

const ModuleTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.3rem 0;
`;

const ModuleTagline = styled.p`
  font-size: 1.5rem;
  color: rgb(var(--text));
  opacity: 0.6;
  margin: 0;
`;

const TierRow = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$count}, 1fr);
  gap: 1.5rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr 1fr;
  }

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const TierCard = styled.div<{ $highlighted: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: rgb(var(--cardBackground));
  border: 1px solid ${(p) => (p.$highlighted ? 'rgb(var(--primary))' : 'rgba(var(--text), 0.12)')};
  border-radius: 0.8rem;
`;

const Badge = styled.span`
  position: absolute;
  top: -1.1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(var(--primary));
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.3rem 1rem;
  border-radius: 2rem;
  white-space: nowrap;
`;

const TierName = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(var(--text));
  opacity: 0.6;
`;

const TierPrice = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1.5rem;
`;

const PricePeriod = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
  color: rgb(var(--text));
  opacity: 0.5;
  margin-left: 0.3rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;

  li {
    font-size: 1.4rem;
    color: rgb(var(--text));
    opacity: 0.7;
    padding: 0.4rem 0;
    border-bottom: 1px solid rgba(var(--text), 0.12);

    &::before {
      content: '✓ ';
      color: rgb(var(--primary));
      font-weight: 700;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

const TierButton = styled(Button)<{ $highlighted: boolean }>`
  width: 100%;
  font-size: 1.4rem;
  padding: 1rem;
  background: ${(p) => (p.$highlighted ? 'rgb(var(--primary))' : 'transparent')};
  color: ${(p) => (p.$highlighted ? '#fff' : 'rgb(var(--primary))')};
  border: 1px solid rgb(var(--primary));

  &:hover {
    background: rgb(var(--primary));
    color: #fff;
  }
`;
