import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { EnvVars } from 'env';
import { ScrollPositionEffectProps, useScrollPosition } from 'hooks/useScrollPosition';
import { NavItems, SingleNavItem } from 'types';
import { media } from 'utils/media';
import Container from './Container';
import Drawer from './Drawer';
import { HamburgerIcon } from './HamburgerIcon';
import Logo from './Logo';

const ColorSwitcher = dynamic(() => import('../components/ColorSwitcher'), { ssr: false });

type NavbarProps = { items: NavItems };
type ScrollingDirections = 'up' | 'down' | 'none';
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

const SCROLL_HIDE_THRESHOLD = 80; // px to scroll down before hiding navbar
const SCROLL_SHOW_THRESHOLD = 80; // px to scroll up before showing navbar (hysteresis)

export default function Navbar({ items }: NavbarProps) {
  const router = useRouter();
  const { toggle } = Drawer.useDrawer();
  const [scrollingDirection, setScrollingDirection] = useState<ScrollingDirections>('none');
  const lastScrollY = useRef(0);
  const lastRoute = useRef('');
  const thresholdScrollY = useRef(0);
  const isHiddenRef = useRef(false); // avoid stale closure in scroll callback
  const ticking = useRef(false);

  useScrollPosition(scrollPositionCallback, [router.asPath], undefined, undefined, 150);

  function scrollPositionCallback({ currPos }: ScrollPositionEffectProps) {
    if (ticking.current) return;

    const routerPath = router.asPath;
    const hasRouteChanged = routerPath !== lastRoute.current;

    if (hasRouteChanged) {
      lastRoute.current = routerPath;
      setScrollingDirection('none');
      isHiddenRef.current = false;
      lastScrollY.current = currPos.y;
      thresholdScrollY.current = currPos.y;
      return;
    }

    const currentScrollY = currPos.y;
    const isInNonCollapsibleArea = currentScrollY > -50;

    if (isInNonCollapsibleArea) {
      setScrollingDirection('none');
      isHiddenRef.current = false;
      lastScrollY.current = currentScrollY;
      thresholdScrollY.current = Math.min(thresholdScrollY.current, currentScrollY);
      return;
    }

    ticking.current = true;
    requestAnimationFrame(() => {
      const scrolledDownEnough = thresholdScrollY.current - currentScrollY >= SCROLL_HIDE_THRESHOLD;
      const scrolledUpEnough = currentScrollY - thresholdScrollY.current >= SCROLL_SHOW_THRESHOLD;

      if (!isHiddenRef.current && scrolledDownEnough) {
        setScrollingDirection('down');
        isHiddenRef.current = true;
        thresholdScrollY.current = currentScrollY;
      } else if (isHiddenRef.current && scrolledUpEnough) {
        setScrollingDirection('up');
        isHiddenRef.current = false;
        thresholdScrollY.current = currentScrollY;
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    });
  }

  const isNavbarHidden = scrollingDirection === 'down';
  const isTransparent = scrollingDirection === 'none';

  return (
    <NavbarContainer hidden={isNavbarHidden} transparent={isTransparent}>
      <Content>
        <LogoLink href="/">
          <Logo />
          <TitleBlock className='flex flex-col md:flex-row md:items-center gap-0 md:gap-1 pt-5 md:pt-0 text-xl md:text-xl lg:text-2xl xl:text-3xl leading-tight'>
            <span className='font-bold text-2xl md:text-2xl lg:text-3xl xl:text-4xl text-black'>Chains-</span>
            <span>ERP & Global Finance</span>
          </TitleBlock>
        </LogoLink>
        <NavItemList>
          {items.filter((item) => !item.outlined).map((singleItem) => (
            <NavItem key={singleItem.href} {...singleItem} />
          ))}
        </NavItemList>
        <ColorSwitcherContainer>
          <ColorSwitcher />
        </ColorSwitcherContainer>
        <HamburgerMenuWrapper>
          <HamburgerIcon aria-label="Toggle menu" onClick={toggle} />
        </HamburgerMenuWrapper>
      </Content>
    </NavbarContainer>
  );
}

function NavItem({ href, title, outlined }: SingleNavItem) {
  if (outlined) {
    return (
      <CustomButtonLink href={EnvVars.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
        {title}
      </CustomButtonLink>
    );
  }

  return (
    <NavItemWrapper outlined={outlined}>
      <NextLink href={href}>{title}</NextLink>
    </NavItemWrapper>
  );
}

const CustomButtonLink = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  line-height: 1.8;
  text-decoration: none;
  color: inherit;
  font: inherit;
  background: rgb(var(--primary));
  color: rgb(var(--textSecondary));
  border-radius: 0.4rem;
  font-weight: bold;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const NavItemList = styled.div`
  display: flex;
  list-style: none;

  ${media('<desktop')} {
    display: none;
  }
`;

const HamburgerMenuWrapper = styled.div`
  ${media('>=desktop')} {
    display: none;
  }
`;

const LogoLink = styled(NextLink)`
  display: flex;
  margin-right: auto;
  text-decoration: none;
  color: rgb(var(--logoColor));
`;

const TitleBlock = styled.div`
  color: rgb(var(--text), 0.75);
`;

const NavItemWrapper = styled.li<Partial<SingleNavItem>>`
  background-color: ${(p) => (p.outlined ? 'rgb(var(--primary))' : 'transparent')};
  border-radius: 0.5rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;

  &:hover {
    background-color: ${(p) => (p.outlined ? 'rgb(var(--primary), 0.8)' : 'transparent')};
    transition: background-color 0.2s;
  }

  a {
    display: flex;
    color: ${(p) => (p.outlined ? 'rgb(var(--textSecondary))' : 'rgb(var(--text), 0.75)')};
    letter-spacing: 0.025em;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const NavbarContainer = styled.div<NavbarContainerProps>`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1.5rem 0;
  width: 100%;
  height: 8rem;
  z-index: var(--z-navbar);
  background-color: rgb(var(--navbarBackground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  transform: ${(p) => (p.hidden ? 'translateY(-100%)' : 'translateY(0)')};
  opacity: ${(p) => (p.hidden ? '0' : '1')};
  pointer-events: ${(p) => (p.hidden ? 'none' : 'auto')};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
`;

const Content = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ColorSwitcherContainer = styled.div`
  width: 4rem;
  margin: 0 1rem;
`;
