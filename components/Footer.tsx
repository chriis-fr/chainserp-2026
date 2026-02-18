import NextLink from 'next/link';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share';
import styled from 'styled-components';
import Container from 'components/Container';
import Logo from 'components/Logo';
import { EnvVars } from 'env';
import { media } from 'utils/media';

const FOOTER_LINKS = [
  { title: 'Features', href: '/features' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
  { title: 'Privacy', href: '/privacy-policy' },
  { title: 'Cookies', href: '/cookies-policy' },
];

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/chainserp', Icon: LinkedinIcon },
  { label: 'X', href: 'https://x.com/chainserp', Icon: TwitterIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/chainserp', Icon: FacebookIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Container>
        <Top>
          <Brand>
            <LogoLink href="/">
              <Logo width={36} height={36} />
            </LogoLink>
            <Tagline>{EnvVars.SITE_NAME}</Tagline>
          </Brand>
          <Contact>
            <MailLink href="mailto:hello@chains-erp.com">hello@chains-erp.com</MailLink>
          </Contact>
        </Top>

        <Links>
          {FOOTER_LINKS.map(({ title, href }) => (
            <NextLink key={href} href={href}>
              {title}
            </NextLink>
          ))}
        </Links>

        <Divider />

        <Bottom>
          <Social>
            {SOCIAL.map(({ label, href, Icon }) => (
              <SocialLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size={28} round />
              </SocialLink>
            ))}
          </Social>
          <Copyright>© {year} {EnvVars.SITE_NAME}</Copyright>
        </Bottom>
      </Container>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  padding: 5rem 0 3rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
`;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoLink = styled(NextLink)`
  display: block;
  line-height: 0;
`;

const Tagline = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--textSecondary));
  opacity: 0.95;
`;

const Contact = styled.div``;

const MailLink = styled.a`
  font-size: 1.4rem;
  color: rgba(var(--textSecondary), 0.85);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: rgb(var(--primary));
  }
`;

const Links = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 2.5rem;
  margin-bottom: 2rem;

  a {
    font-size: 1.35rem;
    color: rgba(var(--textSecondary), 0.8);
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    color: rgb(var(--primary));
  }

  ${media('<=phone')} {
    gap: 1rem 1.5rem;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(var(--textSecondary), 0.15);
  margin: 0 0 2rem;
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Social = styled.div`
  display: flex;
  gap: 0.75rem;

  a {
    color: rgba(var(--textSecondary), 0.7);
    transition: color 0.2s, transform 0.2s;
  }
  a:hover {
    color: rgb(var(--primary));
    transform: scale(1.05);
  }
`;

const SocialLink = styled.a``;

const Copyright = styled.p`
  font-size: 1.25rem;
  color: rgba(var(--textSecondary), 0.6);
  margin: 0;
`;
