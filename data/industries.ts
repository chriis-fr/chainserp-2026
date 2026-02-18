export interface Industry {
  slug: string;
  name: string;
  description: string;
  challenges: string[];
  solutions: string[];
  keywords: string[];
  relatedFeatures: string[];
}

export const industries: Industry[] = [
  {
    slug: 'fintech',
    name: 'Fintech',
    description: 'ERP solution designed for fintech companies operating globally.',
    challenges: [
      'Regulatory compliance across jurisdictions',
      'Multi-currency operations',
      'Real-time transaction processing',
      'Crypto and traditional payment support',
    ],
    solutions: [
      'Built-in compliance tools',
      'Multi-currency support',
      'Real-time processing',
      'Crypto payment integration',
    ],
    keywords: ['fintech erp', 'fintech software', 'financial technology', 'fintech solutions'],
    relatedFeatures: ['crypto-payroll', 'cross-border-payments', 'regulatory-compliance'],
  },
  {
    slug: 'saas',
    name: 'SaaS',
    description: 'Complete financial management for SaaS companies.',
    challenges: [
      'Subscription billing complexity',
      'Multi-currency revenue',
      'Global customer base',
      'Recurring revenue tracking',
    ],
    solutions: [
      'Subscription billing automation',
      'Multi-currency invoicing',
      'Revenue recognition',
      'Customer portal integration',
    ],
    keywords: ['saas erp', 'saas accounting', 'subscription billing', 'saas finance'],
    relatedFeatures: ['global-invoicing', 'subscription-management', 'recurring-billing'],
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    description: 'Finance management for logistics and shipping companies.',
    challenges: [
      'Cross-border transactions',
      'Multi-currency invoicing',
      'Complex tax requirements',
      'Payment processing delays',
    ],
    solutions: [
      'Global payment processing',
      'Automated invoicing',
      'Tax compliance',
      'Fast payment settlement',
    ],
    keywords: ['logistics erp', 'shipping software', 'freight management', 'logistics finance'],
    relatedFeatures: ['cross-border-payments', 'global-invoicing', 'tax-compliance'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    description: 'Financial operations for e-commerce businesses.',
    challenges: [
      'High transaction volume',
      'Multiple payment methods',
      'International sales',
      'Inventory accounting',
    ],
    solutions: [
      'Automated transaction processing',
      'Multi-payment gateway support',
      'Global sales management',
      'Integrated inventory accounting',
    ],
    keywords: ['ecommerce erp', 'online store finance', 'ecommerce accounting', 'online retail'],
    relatedFeatures: ['payment-processing', 'multi-currency-support', 'inventory-management'],
  },
  {
    slug: 'crypto',
    name: 'Crypto & Web3',
    description: 'ERP built for crypto and Web3 companies.',
    challenges: [
      'Crypto transaction accounting',
      'DeFi activity tracking',
      'Regulatory compliance',
      'Multi-chain operations',
    ],
    solutions: [
      'Native crypto support',
      'DeFi integration',
      'Compliance automation',
      'Multi-chain tracking',
    ],
    keywords: ['crypto erp', 'web3 erp', 'blockchain accounting', 'crypto business software'],
    relatedFeatures: ['crypto-payroll', 'web3-integrations', 'defi-accounting'],
  },
  {
    slug: 'consulting',
    name: 'Consulting',
    description: 'Financial management for consulting firms.',
    challenges: [
      'Project-based billing',
      'Time tracking integration',
      'Expense management',
      'Multi-client invoicing',
    ],
    solutions: [
      'Project billing automation',
      'Time tracking integration',
      'Expense management',
      'Client portal',
    ],
    keywords: ['consulting erp', 'consulting software', 'professional services', 'consulting finance'],
    relatedFeatures: ['project-billing', 'time-tracking', 'expense-management'],
  },
];
