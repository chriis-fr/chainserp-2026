export interface Region {
  slug: string;
  name: string;
  description: string;
  challenges: string[];
  solutions: string[];
  regulations: string[];
  currencies: string[];
  keywords: string[];
  relatedFeatures: string[];
}

export const regions: Region[] = [
  {
    slug: 'africa',
    name: 'Africa',
    description: 'ERP solution designed for businesses operating in African markets.',
    challenges: [
      'Multiple currencies',
      'Mobile money integration',
      'Cross-border payments',
      'Regulatory compliance',
    ],
    solutions: [
      'Local currency support',
      'Mobile money integration',
      'Regional payment networks',
      'Compliance automation',
    ],
    regulations: ['Local tax requirements', 'Cross-border regulations', 'Mobile money compliance'],
    currencies: ['KES', 'NGN', 'ZAR', 'GHS', 'ETB'],
    keywords: ['africa erp', 'african business software', 'kenya erp', 'nigeria erp', 'south africa erp'],
    relatedFeatures: ['mobile-money-integration', 'local-currency-support', 'africa-compliance'],
  },
  {
    slug: 'kenya',
    name: 'Kenya',
    description: 'ERP solution optimized for Kenyan businesses.',
    challenges: [
      'KES currency management',
      'M-Pesa integration',
      'Local tax compliance',
      'Cross-border transactions',
    ],
    solutions: [
      'Native M-Pesa support',
      'KRA tax compliance',
      'Local banking integration',
      'Regional payment support',
    ],
    regulations: ['KRA compliance', 'Central Bank regulations', 'Data protection laws'],
    currencies: ['KES'],
    keywords: ['kenya erp', 'kenyan business software', 'm-pesa integration', 'kenya accounting'],
    relatedFeatures: ['mobile-money-integration', 'local-tax-compliance'],
  },
  {
    slug: 'nigeria',
    name: 'Nigeria',
    description: 'ERP solution for Nigerian businesses.',
    challenges: [
      'NGN currency management',
      'Local payment methods',
      'Tax compliance',
      'Forex regulations',
    ],
    solutions: [
      'Naira support',
      'Local payment integration',
      'FIRS compliance',
      'Forex management',
    ],
    regulations: ['FIRS compliance', 'CBN regulations', 'Data protection'],
    currencies: ['NGN'],
    keywords: ['nigeria erp', 'nigerian business software', 'naira accounting', 'nigeria finance'],
    relatedFeatures: ['local-currency-support', 'local-tax-compliance'],
  },
  {
    slug: 'europe',
    name: 'Europe',
    description: 'ERP solution for European businesses.',
    challenges: [
      'EU regulations',
      'Multi-currency (EUR + others)',
      'VAT compliance',
      'GDPR requirements',
    ],
    solutions: [
      'EU VAT automation',
      'GDPR compliance',
      'SEPA integration',
      'Multi-currency support',
    ],
    regulations: ['EU VAT', 'GDPR', 'PSD2', 'MiFID II'],
    currencies: ['EUR', 'GBP', 'CHF'],
    keywords: ['europe erp', 'eu erp', 'european business software', 'vat compliance'],
    relatedFeatures: ['vat-compliance', 'gdpr-compliance', 'sepa-integration'],
  },
  {
    slug: 'united-states',
    name: 'United States',
    description: 'ERP solution for US businesses.',
    challenges: [
      'State tax compliance',
      'Federal regulations',
      'Payment processing',
      'Multi-state operations',
    ],
    solutions: [
      'State tax automation',
      'Federal compliance',
      'ACH integration',
      'Multi-state support',
    ],
    regulations: ['IRS compliance', 'State tax requirements', 'SOX compliance'],
    currencies: ['USD'],
    keywords: ['us erp', 'american business software', 'us accounting', 'state tax compliance'],
    relatedFeatures: ['us-tax-compliance', 'ach-integration'],
  },
  {
    slug: 'remote-teams',
    name: 'Remote Teams',
    description: 'ERP solution for distributed and remote teams.',
    challenges: [
      'Multi-country operations',
      'Currency management',
      'Time zone coordination',
      'Compliance across jurisdictions',
    ],
    solutions: [
      'Global payment support',
      'Multi-currency handling',
      'Async workflows',
      'Unified compliance',
    ],
    regulations: ['Multi-jurisdiction compliance', 'Data protection', 'Labor laws'],
    currencies: ['Multiple'],
    keywords: ['remote team erp', 'distributed team software', 'remote work finance', 'async finance'],
    relatedFeatures: ['cross-border-payments', 'multi-currency-support', 'async-workflows'],
  },
];
