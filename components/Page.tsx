import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Container from './Container';
import SEO from './SEO';

export interface PageProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export default function Page({ title, description, eyebrow, children }: PropsWithChildren<PageProps>) {
  const router = useRouter();
  return (
    <>
      <SEO title={title} description={description} url={router.asPath} />
      <Wrapper className="cx-page">
        <header className="cx cx-page-head cx-grid-bg">
          <div className="cx-wrap">
            <span className="cx-eyebrow">{eyebrow ?? 'Chains ERP'}</span>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </div>
        </header>
        <Container>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background: #fff;
`;

const ChildrenWrapper = styled.div`
  margin-top: 6rem;
  margin-bottom: 4rem;
`;
