import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { EnvVars } from 'env'
import { NavItems, SingleNavItem } from 'types'
import ClientOnly from './ClientOnly'
import CloseIcon from './CloseIcon'
import OriginalDrawer from './Drawer'

type NavigationDrawerProps = PropsWithChildren<{ items: NavItems }>

const Wrapper = styled.div`
  .my-drawer {
    width: 100%;
    min-width: 28rem;
    max-width: 36rem;
    height: 100%;
    z-index: var(--z-drawer);
    background: rgb(var(--navbarBackground));
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .my-drawer-container {
    position: relative;
    min-height: 100%;
    margin: 0;
    padding: 2rem 2.4rem 3rem;
    display: flex;
    flex-direction: column;
  }

  .close-icon {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }

  .drawer-closed {
    margin-left: -100%;
  }

  .drawer-opened {
    margin-left: 0;
  }
`

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding-right: 4rem;
`

const DrawerTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--text));
  opacity: 0.7;
`

const NavList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 0.75rem;
`

const NavListItem = styled.li`
  list-style: none;
`

const DrawerLink = styled(NextLink)`
  display: block;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: rgb(var(--text));
  text-decoration: none;
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  text-align: left;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(var(--primary), 0.08);
    color: rgb(var(--primary));
  }
`

const DrawerCtaLink = styled.a`
  display: block;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: rgb(var(--textSecondary));
  background: rgb(var(--primary));
  text-decoration: none;
  border-radius: 0.5rem;
  padding: 1.5rem 1.5rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(var(--primary), 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(var(--primary), 0.35);
  }
`

export default function NavigationDrawer({ children, items }: NavigationDrawerProps) {
  return (
    <OriginalDrawer.Drawer>
      <Wrapper>
        <ClientOnly>
          <OriginalDrawer.Target openClass="drawer-opened" closedClass="drawer-closed">
            <div className="my-drawer">
              <div className="my-drawer-container">
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerCloseButton />
                </DrawerHeader>
                <NavItemsList items={items} />
              </div>
            </div>
          </OriginalDrawer.Target>
        </ClientOnly>
      </Wrapper>
      {children}
    </OriginalDrawer.Drawer>
  )
}

function NavItemsList({ items }: NavigationDrawerProps) {
  const { close } = OriginalDrawer.useDrawer()
  const router = useRouter()

  useEffect(() => {
    function handleRouteChangeComplete() {
      close()
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => router.events.off('routeChangeComplete', handleRouteChangeComplete)
  }, [close, router])

  return (
    <NavList>
      {items.map((singleItem, idx) => (
        <DrawerNavItem key={idx} item={singleItem} onNavigate={close} />
      ))}
    </NavList>
  )
}

function DrawerNavItem({ item, onNavigate }: { item: SingleNavItem; onNavigate: () => void }) {
  if (item.outlined) {
    return (
      <NavListItem>
        <DrawerCtaLink href={EnvVars.CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
          {item.title}
        </DrawerCtaLink>
      </NavListItem>
    )
  }
  return (
    <NavListItem>
      <DrawerLink href={item.href} onClick={onNavigate}>
        {item.title}
      </DrawerLink>
    </NavListItem>
  )
}

function DrawerCloseButton() {
  const ref = useRef(null)
  const a11yProps = OriginalDrawer.useA11yCloseButton(ref)

  return <CloseIcon className="close-icon" _ref={ref} {...a11yProps} />
}
