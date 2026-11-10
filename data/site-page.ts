// The shape every SEO page (features, industries, regions, problems, comparisons) shares, so one template
// renders them all in the site's look. Every claim in these files must be true of the product today:
// money moves by M-Pesa in Kenya (KES); invoices go out in 50+ currencies; USDC/USDT on Base is receive-only
// on invoices and marked paid by hand; no crypto at the POS counter or in payroll; no eTIMS/PAYE/NSSF/SHIF;
// Chains AI is in beta, by request, on top of a paid plan.

export type ProductKey = 'erp' | 'pos' | 'fleet' | 'ai' | 'bitcoin';

export interface PageSection {
  heading: string;
  body?: string;
  points?: string[];
}

export interface SitePage {
  slug: string;
  /** Short label used on index cards and breadcrumbs. */
  name: string;
  /** Page H1. */
  title: string;
  /** Meta description and index-card summary. */
  description: string;
  eyebrow: string;
  lead: string;
  sections: PageSection[];
  /** Which product the page's call to action points at. */
  product: ProductKey;
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
  keywords: string[];
}
