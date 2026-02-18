export interface Problem {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  impact: string[];
  solution: string;
  keywords: string[];
  relatedFeatures: string[];
  relatedProblems: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const problems: Problem[] = [
  {
    slug: 'multi-currency-invoicing',
    title: 'Multi-Currency Invoicing Challenges',
    description: 'Managing invoices across multiple currencies is complex and error-prone.',
    longDescription:
      'Businesses operating globally face constant challenges with multi-currency invoicing. Currency conversion, exchange rate fluctuations, tax calculations, and compliance requirements make it difficult to manage invoices efficiently.',
    impact: [
      'Manual errors in currency conversion',
      'Difficulty tracking exchange rates',
      'Compliance issues across jurisdictions',
      'Time-consuming invoice management',
    ],
    solution:
      'Chains ERP automates multi-currency invoicing with real-time exchange rates, automatic tax calculations, and built-in compliance. Create invoices in any currency and let the system handle the complexity.',
    keywords: ['multi-currency invoicing', 'currency conversion', 'international invoicing', 'forex invoicing'],
    relatedFeatures: ['global-invoicing', 'multi-currency-support'],
    relatedProblems: ['cross-border-invoicing-complexity'],
    faqs: [
      {
        question: 'How do you handle exchange rate fluctuations?',
        answer: 'We use real-time exchange rates and lock rates at invoice creation to protect both you and your customers.',
      },
    ],
  },
  {
    slug: 'cross-border-payroll',
    title: 'Cross-Border Payroll Complexity',
    description: 'Paying remote teams across borders involves complex tax and compliance requirements.',
    longDescription:
      'Managing payroll for remote teams across different countries requires understanding local tax laws, labor regulations, and payment methods. This complexity grows exponentially with team size.',
    impact: [
      'Compliance risks',
      'High administrative overhead',
      'Currency conversion costs',
      'Delayed payments',
    ],
    solution:
      'Chains ERP handles cross-border payroll automatically. We calculate taxes, ensure compliance, and support multiple payment methods including crypto.',
    keywords: ['cross-border payroll', 'international payroll', 'remote team payroll', 'global payroll'],
    relatedFeatures: ['crypto-payroll', 'payroll-management'],
    relatedProblems: ['crypto-payroll-compliance'],
    faqs: [
      {
        question: 'Which countries are supported?',
        answer: 'We support payroll in over 50 countries with automatic tax calculations.',
      },
    ],
  },
  {
    slug: 'slow-invoice-collections',
    title: 'Slow Invoice Collections',
    description: 'Waiting weeks or months for invoice payments hurts cash flow.',
    longDescription:
      'Traditional payment methods mean waiting days or weeks for funds to clear. International payments can take even longer. This creates cash flow problems and operational challenges.',
    impact: [
      'Cash flow constraints',
      'Difficulty planning',
      'Increased credit risk',
      'Operational delays',
    ],
    solution:
      'Chains ERP supports instant crypto payments alongside traditional methods. Get paid faster and improve your cash flow.',
    keywords: ['slow payments', 'invoice collection', 'payment delays', 'cash flow'],
    relatedFeatures: ['cross-border-payments', 'payment-automation'],
    relatedProblems: ['high-payment-fees'],
    faqs: [
      {
        question: 'How fast are crypto payments?',
        answer: 'Crypto payments settle instantly, compared to 1-3 days for traditional bank transfers.',
      },
    ],
  },
  {
    slug: 'manual-accounting-errors',
    title: 'Manual Accounting Errors',
    description: 'Manual data entry leads to costly mistakes and compliance issues.',
    longDescription:
      'Manual accounting processes are prone to errors. A single mistake can cascade through your books, causing compliance issues, financial discrepancies, and wasted time fixing problems.',
    impact: [
      'Financial discrepancies',
      'Compliance violations',
      'Time wasted on corrections',
      'Audit complications',
    ],
    solution:
      'Chains ERP automates accounting processes, reducing manual entry and eliminating errors. Automatic reconciliation and validation ensure accuracy.',
    keywords: ['accounting errors', 'manual entry', 'bookkeeping mistakes', 'accounting automation'],
    relatedFeatures: ['accounting-automation', 'erp-for-finance-teams'],
    relatedProblems: ['fragmented-finance-tools'],
    faqs: [
      {
        question: 'How does automation reduce errors?',
        answer: 'By eliminating manual data entry and using automatic validation, we reduce error rates by over 95%.',
      },
    ],
  },
  {
    slug: 'web3-accounting-compliance',
    title: 'Web3 Accounting Compliance',
    description: 'Accounting for crypto and Web3 transactions requires specialized knowledge.',
    longDescription:
      'Traditional accounting software doesn\'t handle cryptocurrency transactions well. Tracking crypto payments, DeFi activities, and NFT transactions requires specialized tools and knowledge.',
    impact: [
      'Compliance risks',
      'Inaccurate financial records',
      'Tax reporting challenges',
      'Audit difficulties',
    ],
    solution:
      'Chains ERP is built for Web3 businesses. We handle crypto transactions, DeFi accounting, and ensure compliance with evolving regulations.',
    keywords: ['crypto accounting', 'web3 accounting', 'blockchain accounting', 'defi accounting'],
    relatedFeatures: ['crypto-payroll', 'web3-integrations'],
    relatedProblems: ['crypto-payroll-compliance'],
    faqs: [
      {
        question: 'Which cryptocurrencies are supported?',
        answer: 'We support all major cryptocurrencies and can track transactions across multiple chains.',
      },
    ],
  },
];
