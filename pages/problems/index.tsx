import styled from 'styled-components';
import Breadcrumbs from 'components/Breadcrumbs';
import Container from 'components/Container';
import InternalLinks, { InternalLink } from 'components/InternalLinks';
import SEO from 'components/SEO';
import { problems } from 'data/problems';

export default function ProblemsIndexPage() {
  const links: InternalLink[] = problems.map((problem) => ({
    title: problem.title,
    href: `/problems/${problem.slug}`,
    description: problem.description,
  }));

  return (
    <>
      <SEO
        title="Problems We Solve"
        description="Explore the common problems Chains ERP solves for global businesses."
        url="/problems"
      />
      <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Problems', url: '/problems' }]} />
      <Container>
        <Header>
          <Title>Problems We Solve</Title>
          <Description>
            Every business faces challenges. See how Chains ERP addresses the most common problems in global finance
            operations.
          </Description>
        </Header>
        <InternalLinks title="All Problems" links={links} columns={3} />
      </Container>
    </>
  );
}

const Header = styled.div`
  text-align: center;
  margin: 4rem 0 6rem 0;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 2rem;
  color: rgb(var(--textSecondary));
  max-width: 80rem;
  margin: 0 auto;
`;
