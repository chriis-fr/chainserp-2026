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

const defaultTitle = 'Chains ERP — Global Finance, POS, Payroll & Logistics Platform';
const defaultDescription =
  'Chains ERP runs a business from the point of sale to payroll: POS operations connected to your own M-Pesa paybill or till, payroll in one approval, supplier bills and treasury, invoices in 50+ currencies, and FleetOps logistics. Made in Nairobi; money moves by M-Pesa in Kenya today.';

const defaultKeywords = [
  // Brand
  'Chains ERP',
  'Chains ERP Kenya',
  'chains-erp.com',
  'global finance platform',

  // POS
  'POS system Kenya',
  'point of sale Kenya',
  'restaurant POS Kenya',
  'M-Pesa POS',
  'M-Pesa point of sale',
  'POS payroll integration',
  'waiter payroll POS',
  'pos.chains-erp.com',

  // Invoicing
  'global invoicing software',
  'invoice software Kenya',
  'multi-currency invoicing',
  'cross-border invoicing',
  'international invoice',
  'send invoices globally',
  'PDF invoicing',

  // Payroll
  'payroll software Kenya',
  'payroll Africa',
  'employee salary management',
  'digital payslips',
  'payroll automation Kenya',

  // Treasury / Payables
  'vendor payables',
  'accounts payable software',
  'bill management Kenya',
  'approval workflow finance',
  'treasury management Africa',
  'batch payments Kenya',

  // Logistics
  'logistics software Kenya',
  'fleet management Kenya',
  'fleet tracking Africa',
  'delivery tracking system',
  'progressusmavericks.co.ke',
  'logistics ERP Kenya',
  'transport management system',

  // ERP general
  'ERP software Kenya',
  'ERP Africa',
  'small business ERP Kenya',
  'finance ERP startups',
  'enterprise ERP Africa',

  // Competitors / comparison
  'QuickBooks alternative Kenya',
  'Xero alternative Africa',
  'Sage alternative Kenya',

  // Geo
  'Kenya fintech',
  'Africa ERP',
  'Nairobi finance software',
  'global finance software',
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
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullUrl} />

      {/* Alternate properties */}
      <link rel="alternate" href="https://pos.chains-erp.com" hrefLang="en" />
      <link rel="alternate" href="https://app.chains-erp.com" hrefLang="en" />

      {/* Author */}
      <meta name="author" content="Christopher Odhiambo" />
      <meta name="creator" content="Christopher Odhiambo" />
      <meta name="publisher" content="Chains ERP" />

      {/* Robots */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
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
      <meta property="og:image:alt" content="Chains ERP — Global Finance, POS & Logistics" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@chains_erp" />
      <meta name="twitter:site" content="@chains_erp" />
    </Head>
  );
}
