import NextLink from 'next/link';
import styled from 'styled-components';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import HeroIllustration from 'components/HeroIllustation';
import OverTitle from 'components/OverTitle';
import { EnvVars } from 'env';
import { media } from 'utils/media';

export default function Hero() {
  return (
    <HeroWrapper>
      <Contents>
        <CustomOverTitle>Unified operating system for modern businesses</CustomOverTitle>
        <Heading>One System. Every stage of growth.</Heading>
        <Description><span className='font-bold'>Chains</span> is a unified <span className='font-bold'>ERP</span> and <span className='font-bold'>Global Finance</span> platform that grows with you — from a single invoice to multi-entity, universal operations — without scattered tools or workarounds.
        </Description>
        <CustomButtonGroup>
          <HeroCtaLink href={EnvVars.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Book a call <span>&rarr;</span>
          </HeroCtaLink>
          <ButtonLink href="#whitepaper" $transparent>
            Features <span>&rarr;</span>
          </ButtonLink>
        </CustomButtonGroup>
      </Contents>
      <ImageContainer>
        <HeroIllustration />
      </ImageContainer>
    </HeroWrapper>
  );
}

const HeroCtaLink = styled.a`
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

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 5rem;

  ${media('<=desktop')} {
    padding-top: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const Contents = styled.div`
  flex: 1;
  max-width: 60rem;

  ${media('<=desktop')} {
    max-width: 100%;
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;

  svg {
    max-width: 45rem;
  }

  ${media('<=desktop')} {
    margin-top: 2rem;
    justify-content: center;
    svg {
      max-width: 80%;
    }
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media('<=desktop')} {
    font-size: 1.5rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 7.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media('<=tablet')} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;
