import NextLink from 'next/link';
import styled from 'styled-components';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import { EnvVars } from 'env';
import { media } from 'utils/media';

export default function WaveCta() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#0A121E"
          fillOpacity="1"
          d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,203,960,197.3C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <CtaWrapper>
        <Container>
          <Title>Why Teams Choose Chains ERP</Title>
          <BenefitsList>
            <li>Saves hours every week</li>
            <li>Reduces financial errors</li>
            <li>Improves visibility and accuracy</li>
            <li>Replaces multiple tools with one system</li>
          </BenefitsList>
          <Tagline>Software that works for the business — not the other way around.</Tagline>
          <CustomButtonGroup>
            <CtaButtonLink href={EnvVars.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a call <span>&rarr;</span>
            </CtaButtonLink>
            <OutlinedButtonLink href="/features" $transparent>
              Features <span>&rarr;</span>
            </OutlinedButtonLink>
          </CustomButtonGroup>
        </Container>
      </CtaWrapper>
    </>
  );
}

const CtaWrapper = styled.div`
  background: rgb(var(--secondary));
  margin-top: -1rem;
  padding-bottom: 16rem;

  ${media('<=tablet')} {
    padding-top: 8rem;
  }
`;

const Title = styled(SectionTitle)`
  color: rgb(var(--textSecondary));
  margin-bottom: 3rem;
  text-align: center;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto 3rem;
  max-width: 60rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 3rem;

  li {
    color: rgb(var(--textSecondary));
    font-size: 1.8rem;
    line-height: 1.6;
    padding-left: 2rem;
    position: relative;
    opacity: 0.9;

    &::before {
      position: absolute;
      content: '✓';
      left: 0;
      top: 0;
      color: rgb(var(--primary));
      font-weight: bold;
      font-size: 1.6rem;
    }
  }

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    font-size: 1.6rem;
  }
`;

const Tagline = styled.p`
  color: rgb(var(--textSecondary));
  font-size: 2rem;
  text-align: center;
  margin: 0 auto 4rem;
  max-width: 70rem;
  font-style: italic;
  opacity: 0.85;
  line-height: 1.5;

  ${media('<=tablet')} {
    font-size: 1.7rem;
    margin-bottom: 3rem;
  }
`;

const CtaButtonLink = styled.a`
  border: none;
  background: rgb(var(--primary));
  display: inline-block;
  text-decoration: none;
  text-align: center;
  padding: 1.75rem 2.25rem;
  font-size: 1.2rem;
  color: rgb(var(--textSecondary));
  text-transform: uppercase;
  font-family: var(--font);
  font-weight: bold;
  border-radius: 0.4rem;
  border: 2px solid rgb(var(--primary));
  transition: transform 0.3s;
  backface-visibility: hidden;
  will-change: transform;
  cursor: pointer;

  span {
    margin-left: 2rem;
  }

  &:hover {
    transform: scale(1.025);
  }
`;

const ButtonLink = styled(NextLink)<{ $transparent?: boolean }>`
  border: none;
  background: none;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  background: ${(p) => (p.$transparent ? 'transparent' : 'rgb(var(--primary))')};
  padding: 1.75rem 2.25rem;
  font-size: 1.2rem;
  color: ${(p) => (p.$transparent ? 'rgb(var(--text))' : 'rgb(var(--textSecondary))')};
  text-transform: uppercase;
  font-family: var(--font);
  font-weight: bold;
  border-radius: 0.4rem;
  border: ${(p) => (p.$transparent ? 'none' : '2px solid rgb(var(--primary))')};
  transition: transform 0.3s;
  backface-visibility: hidden;
  will-change: transform;
  cursor: pointer;

  span {
    margin-left: 2rem;
  }

  &:hover {
    transform: scale(1.025);
  }
`;

const OutlinedButtonLink = styled(ButtonLink)`
  border: 1px solid rgb(var(--textSecondary));
  color: rgb(var(--textSecondary));
`;

const CustomButtonGroup = styled(ButtonGroup)`
  justify-content: center;
`;
