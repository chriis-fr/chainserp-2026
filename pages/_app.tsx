import 'styles/globals.css';
import 'styles/site.css';
import 'styles/site-3d.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'utils/suppressWarnings';

import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';

import { Analytics } from '@vercel/analytics/next';
import Footer from 'components/Footer';
import { GlobalStyle } from 'components/GlobalStyles';
import Navbar from 'components/Navbar';
import SEO from 'components/SEO';
import StructuredData from 'components/StructuredData';
import WaveCta from 'components/WaveCta';
import { EnvVars } from 'env';


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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <Analytics />
      <GlobalStyle />

      <Providers>
        <Navbar />
        <Component {...pageProps} />
        <WaveCta />
        <Footer />
      </Providers>
    </>
  );
}

// The site is light-only, like app.chains-erp.com; the mobile menu lives in the Navbar.
function Providers<T>({ children }: PropsWithChildren<T>) {
  return <>{children}</>;
}

export default MyApp;
