import Link from 'next/link';
import styled from 'styled-components';

export interface InternalLink {
  title: string;
  href: string;
  description?: string;
}

interface InternalLinksProps {
  title?: string;
  links: InternalLink[];
  columns?: 2 | 3 | 4;
}

export default function InternalLinks({ title, links, columns = 3 }: InternalLinksProps) {
  if (links.length === 0) return null;

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <LinkGrid columns={columns}>
        {links.map((link, index) => (
          <LinkCard key={index} href={link.href}>
            <LinkTitle>{link.title}</LinkTitle>
            {link.description && <LinkDescription>{link.description}</LinkDescription>}
            <LinkArrow aria-hidden="true">→</LinkArrow>
          </LinkCard>
        ))}
      </LinkGrid>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin: 6rem 0;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const LinkGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.columns}, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LinkCard = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--border));
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: rgb(var(--primary));
  }
`;

const LinkTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin: 0 0 1rem 0;
`;

const LinkDescription = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--textSecondary));
  margin: 0 0 1rem 0;
  line-height: 1.6;
  flex: 1;
`;

const LinkArrow = styled.span`
  font-size: 2rem;
  color: rgb(var(--primary));
  align-self: flex-end;
`;
