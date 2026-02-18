export interface Comparison {
  slug: string;
  title: string;
  competitor: string;
  description: string;
  chainsAdvantages: string[];
  competitorAdvantages: string[];
  useCase: string;
  keywords: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const comparisons: Comparison[] = [
  {
    slug: 'chains-erp-vs-quickbooks',
    title: 'Chains ERP vs QuickBooks',
    competitor: 'QuickBooks',
    description: 'Compare Chains ERP and QuickBooks to find the right solution for your global business.',
    chainsAdvantages: [
      'Multi-currency and crypto support',
      'Built for global businesses',
      'Modern API and integrations',
      'Web3 and blockchain features',
      'Lower fees for international transactions',
    ],
    competitorAdvantages: [
      'More established brand',
      'Larger user base',
      'More third-party integrations',
      'Better for US-only businesses',
    ],
    useCase: 'Choose Chains ERP if you operate globally or need crypto support. QuickBooks is better for US-only businesses.',
    keywords: ['chains erp vs quickbooks', 'quickbooks alternative', 'global accounting software'],
    faqs: [
      {
        question: 'Can I migrate from QuickBooks?',
        answer: 'Yes, we offer migration tools and support to help you move your data from QuickBooks.',
      },
      {
        question: 'Which is more expensive?',
        answer: 'Pricing depends on your needs. Chains ERP offers better value for global businesses.',
      },
    ],
  },
  {
    slug: 'chains-erp-vs-odoo',
    title: 'Chains ERP vs Odoo',
    competitor: 'Odoo',
    description: 'Compare Chains ERP and Odoo for your business management needs.',
    chainsAdvantages: [
      'Simpler, finance-focused',
      'Better crypto and Web3 support',
      'More modern interface',
      'Better for finance teams',
      'Lower learning curve',
    ],
    competitorAdvantages: [
      'More modules available',
      'Open source option',
      'More customization',
      'Larger community',
    ],
    useCase: 'Chains ERP is better if you need a finance-first solution. Odoo is better if you need many modules.',
    keywords: ['chains erp vs odoo', 'odoo alternative', 'finance erp comparison'],
    faqs: [
      {
        question: 'Is Chains ERP open source?',
        answer: 'No, Chains ERP is a SaaS platform with a modern architecture and regular updates.',
      },
    ],
  },
  {
    slug: 'chains-erp-vs-xero',
    title: 'Chains ERP vs Xero',
    competitor: 'Xero',
    description: 'Compare Chains ERP and Xero for cloud accounting.',
    chainsAdvantages: [
      'Crypto payment support',
      'Better for global businesses',
      'More modern platform',
      'Lower international fees',
      'Web3 features',
    ],
    competitorAdvantages: [
      'More established',
      'More add-ons',
      'Better for small businesses',
      'More tutorials available',
    ],
    useCase: 'Chains ERP is better for global or crypto-native businesses. Xero is better for traditional small businesses.',
    keywords: ['chains erp vs xero', 'xero alternative', 'cloud accounting comparison'],
    faqs: [
      {
        question: 'Does Chains ERP have mobile apps?',
        answer: 'Yes, we have mobile apps for iOS and Android with full feature parity.',
      },
    ],
  },
];
