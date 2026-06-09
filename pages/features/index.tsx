import Link from 'next/link';
import styled from 'styled-components';
import Page from 'components/Page';
import { featureGroups } from 'data/features';
import { media } from 'utils/media';

export default function FeaturesIndexPage() {
  return (
    <Page
      title="Features — POS, Payroll, Treasury, Invoicing & Logistics"
      description="Explore all Chains ERP modules: POS with M-Pesa, Bitcoin and stablecoin payments; payroll automation; vendor treasury and approvals; smart invoicing; and fleet logistics. Built for Kenya, Africa, and global businesses."
    >
      {featureGroups.map((group) => (
        <GroupSection key={group.id} id={group.id}>
          <GroupHeader>
            <GroupIcon aria-hidden="true">{group.icon}</GroupIcon>
            <GroupMeta>
              <GroupTitle>{group.title}</GroupTitle>
              <GroupTagline>{group.tagline}</GroupTagline>
            </GroupMeta>
          </GroupHeader>
          <ItemGrid>
            {group.items.map((item) => (
              <ItemCard key={item.title} href={item.href}>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
                <ItemArrow aria-hidden="true">→</ItemArrow>
              </ItemCard>
            ))}
          </ItemGrid>
        </GroupSection>
      ))}
    </Page>
  );
}

const GroupSection = styled.section`
  margin-bottom: 7rem;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(var(--text), 0.1);
`;

const GroupIcon = styled.span`
  font-size: 3.5rem;
  line-height: 1;
  flex-shrink: 0;
`;

const GroupMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const GroupTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0;
  color: rgb(var(--text));
`;

const GroupTagline = styled.p`
  font-size: 1.5rem;
  color: rgb(var(--text));
  opacity: 0.6;
  margin: 0;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr 1fr;
  }

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const ItemCard = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background: rgb(var(--cardBackground));
  box-shadow: var(--shadow-md);
  border-radius: 0.6rem;
  text-decoration: none;
  color: rgb(var(--text));
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.7rem;
  font-weight: 600;
  margin: 0 0 0.8rem 0;
`;

const ItemDescription = styled.p`
  font-size: 1.4rem;
  opacity: 0.6;
  margin: 0 0 1.5rem 0;
  line-height: 1.65;
  flex: 1;
`;

const ItemArrow = styled.span`
  font-size: 2rem;
  color: rgb(var(--primary));
  align-self: flex-end;
`;
