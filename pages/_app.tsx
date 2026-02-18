import 'styles/globals.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'utils/suppressWarnings';

import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import { ColorModeScript } from 'nextjs-color-mode';
import React, { PropsWithChildren } from 'react';

import Footer from 'components/Footer';
import { GlobalStyle } from 'components/GlobalStyles';
import Navbar from 'components/Navbar';
import NavigationDrawer from 'components/NavigationDrawer';
import SEO from 'components/SEO';
import StructuredData from 'components/StructuredData';
import WaveCta from 'components/WaveCta';
import { EnvVars } from 'env';
import { NavItems } from 'types';

const navItems: NavItems = [
  { title: 'Explore Global Finance', href: 'https://global.chains-erp.com' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Contact', href: '/contact' },
  { title: 'Book a call', href: 'https://calendly.com/caspianodhis/30min', outlined: true },
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <StructuredData
        type="Organization"
        data={{
          name: 'Chains ERP',
          url: EnvVars.URL,
          logo: `${EnvVars.URL}/chains.PNG`,
          sameAs: ['https://twitter.com/chains_erp'],
          contactPoint: {
            contactType: 'Customer Service',
            email: 'support@chains-erp.com',
          },
        }}
      />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" type="image/png" href="/chains.PNG" />
        <link rel="apple-touch-icon" href="/chains.PNG" />
        {/* <link rel="alternate" type="application/rss+xml" href={EnvVars.URL + 'rss'} title="RSS 2.0" /> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-117119829-1', 'auto');
          ga('send', 'pageview');`,
          }}
        /> */}
        {/* <script async src="https://www.google-analytics.com/analytics.js"></script> */}
      </Head>
      <ColorModeScript />
      <GlobalStyle />

      <Providers>
        <Navbar items={navItems} />
        <Component {...pageProps} />
        <WaveCta />
        <Footer />
      </Providers>
    </>
  );
}

function Providers<T>({ children }: PropsWithChildren<T>) {
  return <NavigationDrawer items={navItems}>{children}</NavigationDrawer>;
}

export default MyApp;
