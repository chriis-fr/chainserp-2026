import Head from 'next/head';
import { EnvVars } from 'env';

export interface SoftwareApplicationData {
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
}

export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
  contactPoint?: {
    contactType: string;
    email: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type: 'SoftwareApplication' | 'Organization' | 'FAQPage' | 'Article' | 'BreadcrumbList';
  data: SoftwareApplicationData | OrganizationData | FAQItem[] | ArticleData | BreadcrumbItem[];
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'SoftwareApplication':
        return {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: (data as SoftwareApplicationData).name,
          applicationCategory: (data as SoftwareApplicationData).applicationCategory,
          operatingSystem: (data as SoftwareApplicationData).operatingSystem,
          offers: (data as SoftwareApplicationData).offers,
          ...((data as SoftwareApplicationData).aggregateRating && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: (data as SoftwareApplicationData).aggregateRating!.ratingValue,
              ratingCount: (data as SoftwareApplicationData).aggregateRating!.ratingCount,
            },
          }),
        };

      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: (data as OrganizationData).name,
          url: (data as OrganizationData).url,
          logo: (data as OrganizationData).logo,
          ...((data as OrganizationData).sameAs && {
            sameAs: (data as OrganizationData).sameAs,
          }),
          ...((data as OrganizationData).contactPoint && {
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: (data as OrganizationData).contactPoint!.contactType,
              email: (data as OrganizationData).contactPoint!.email,
            },
          }),
        };

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (data as FAQItem[]).map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        };

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: (data as ArticleData).headline,
          description: (data as ArticleData).description,
          image: (data as ArticleData).image,
          datePublished: (data as ArticleData).datePublished,
          ...((data as ArticleData).dateModified && {
            dateModified: (data as ArticleData).dateModified,
          }),
          author: {
            '@type': 'Person',
            name: (data as ArticleData).author.name,
            ...((data as ArticleData).author.url && {
              url: (data as ArticleData).author.url,
            }),
          },
          publisher: {
            '@type': 'Organization',
            name: 'Chains ERP',
            logo: {
              '@type': 'ImageObject',
              url: `${EnvVars.URL}/chains.PNG`,
            },
          },
        };

      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: (data as BreadcrumbItem[]).map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  if (!structuredData) return null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
