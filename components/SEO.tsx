import Head from 'next/head';
import { EnvVars } from 'env';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultTitle = 'Global Finance - Send Invoices, get paid globally';
const defaultDescription =
  'Chains ERP is a next-generation global finance and business automation platform integrating Web2 + Web3 technology. For companies seeking accounting, payroll, HR, blockchain payments, B2B automation, and decentralized financial tools.';
const defaultKeywords = [
  'Chains ERP',
  'global finance software',
  'web3 erp',
  'blockchain erp',
  'crypto payments',
  'b2b finance platform',
  'decentralized accounting',
  'smart contract finance',
  'Christopher Odhiambo',
  'next generation erp',
];
const defaultImage = '/chains.PNG';
const siteUrl = EnvVars.URL;

export default function SEO({
  title,
  description = defaultDescription,
  keywords = defaultKeywords,
  image = defaultImage,
  url,
  type = 'website',
  noindex = false,
  nofollow = false,
}: SEOProps = {}) {
  const fullTitle = title ? `${title} | Chains ERP` : defaultTitle;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullUrl} />

      {/* Authors */}
      <meta name="author" content="Christopher Odhiambo" />
      <meta name="creator" content="Christopher Odhiambo" />
      <meta name="publisher" content="Chains ERP" />

      {/* Robots */}
      <meta
        name="robots"
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`}
      />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Chains ERP" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Chains ERP – Global Finance Platform" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Chains ERP – Finance + Web3 automation" />
      <meta name="twitter:description" content="Next-generation ERP that merges Web2 and Web3 for global businesses." />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@chains_erp" />

      {/* Safe Apps */}
      <meta name="safe-apps" content="true" />
    </Head>
  );
}
