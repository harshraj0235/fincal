// Update the calculatorData.ts file to include the new calculators
// This is a partial update showing only the new category and calculators

export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  category: string;
  info?: string[];
  faqs?: CalculatorFAQ[];
  relatedCalculators?: string[];
}

export interface CalculatorCategory {
  id: string;
  name: string;
  description: string;
  calculators: Calculator[];
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    id: 'fintech-payments',
    name: 'FinTech & Payments',
    description: 'Modern financial technology tools for digital payments, virtual cards, and innovative lending solutions',
    calculators: [
      {
        id: 'step-up-sip-calculator',
        name: 'Step-Up SIP Calculator',
        description: 'Calculate returns on SIP with annual increment for salaried professionals',
        keywords: ['step-up sip', 'increasing sip', 'growing sip', 'salary increment', 'top-up sip'],
        category: 'FinTech & Payments',
        relatedCalculators: ['sip-calculator', 'mutual-fund-returns-calculator', 'inflation-adjusted-sip-calculator']
      },
      {
        id: 'inflation-adjusted-sip-calculator',
        name: 'Inflation-Adjusted SIP & Retirement Planner',
        description: 'Plan your retirement with inflation-adjusted SIP investments',
        keywords: ['inflation', 'retirement', 'corpus', 'sip', 'real returns'],
        category: 'FinTech & Payments',
        relatedCalculators: ['retirement-calculator', 'step-up-sip-calculator', 'sip-calculator']
      },
      {
        id: 'rent-vs-buy-advanced-calculator',
        name: 'Rent vs Buy Advanced Calculator',
        description: 'Comprehensive analysis of renting versus buying property with HRA benefits',
        keywords: ['rent vs buy', 'hra', 'property', 'real estate', 'tax benefits'],
        category: 'FinTech & Payments',
        relatedCalculators: ['rent-vs-buy-calculator', 'hra-exemption-calculator', 'home-loan-calculator']
      },
      {
        id: 'gold-etf-vs-physical-calculator',
        name: 'Gold ETF vs Physical Gold ROI Calculator',
        description: 'Compare returns on investment between Gold ETF and physical gold',
        keywords: ['gold etf', 'physical gold', 'gold investment', 'roi', 'tax implications'],
        category: 'FinTech & Payments',
        relatedCalculators: ['gold-investment-calculator', 'capital-gains-tax-advanced-calculator', 'mutual-fund-returns-calculator']
      },
      {
        id: 'income-tax-regime-comparison-calculator',
        name: 'Income Tax Regime Comparison Calculator',
        description: 'Compare tax liability under old and new tax regimes',
        keywords: ['income tax', 'old regime', 'new regime', 'tax comparison', 'tax planning'],
        category: 'FinTech & Payments',
        relatedCalculators: ['income-tax-calculator', 'tax-saving-investment-calculator', 'section-80c-calculator']
      },
      {
        id: 'capital-gains-tax-advanced-calculator',
        name: 'Capital Gains Tax Advanced Calculator',
        description: 'Calculate tax on capital gains with indexation benefits and asset-specific rules',
        keywords: ['capital gains', 'ltcg', 'stcg', 'indexation', 'tax planning'],
        category: 'FinTech & Payments',
        relatedCalculators: ['capital-gains-tax-calculator', 'income-tax-calculator', 'gold-etf-vs-physical-calculator']
      },
      {
        id: 'gst-seller-calculator',
        name: 'GST Calculator for Sellers',
        description: 'Calculate GST for business transactions with invoice generation',
        keywords: ['gst', 'seller', 'invoice', 'business', 'tax compliance'],
        category: 'FinTech & Payments',
        relatedCalculators: ['gst-calculator', 'profit-margin-calculator', 'break-even-calculator']
      },
      {
        id: 'virtual-card-issuer',
        name: 'Virtual Card Issuer',
        description: 'Generate virtual cards for secure online transactions',
        keywords: ['virtual card', 'online payment', 'secure transaction', 'digital card', 'e-commerce'],
        category: 'FinTech & Payments',
        relatedCalculators: ['credit-card-emi-calculator', 'bnpl-calculator']
      },
      {
        id: 'bnpl-calculator',
        name: 'Buy Now Pay Later (BNPL) Calculator',
        description: 'Calculate installments and costs for Buy Now Pay Later services',
        keywords: ['bnpl', 'buy now pay later', 'emi', 'installment', 'no cost emi'],
        category: 'FinTech & Payments',
        relatedCalculators: ['credit-card-emi-calculator', 'personal-loan-calculator', 'virtual-card-issuer']
      },
      {
        id: 'p2p-lending-calculator',
        name: 'Peer-to-Peer Lending Calculator',
        description: 'Calculate returns and risks for P2P lending investments',
        keywords: ['p2p lending', 'peer to peer', 'alternative investment', 'lending', 'borrowing'],
        category: 'FinTech & Payments',
        relatedCalculators: ['personal-loan-calculator', 'loan-affordability-calculator', 'bnpl-calculator']
      }
    ]
  },
  {
    id: 'investments-wealth-management',
    name: 'Investments & Wealth Management',
    description: 'Advanced tools for portfolio optimization, investment tracking, and wealth management',
    calculators: [
      {
        id: 'mutual-fund-overlap-checker',
        name: 'Mutual Fund Overlap Checker',
        description: 'Check portfolio overlap between mutual funds to optimize diversification',
        keywords: ['mutual fund', 'overlap', 'portfolio', 'diversification', 'fund comparison'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['mutual-fund-returns-calculator', 'asset-allocation-planner', 'sip-calculator']
      },
      {
        id: 'xirr-tracker',
        name: 'XIRR Tracker for Irregular Investments',
        description: 'Calculate returns on investments with irregular cash flows',
        keywords: ['xirr', 'irregular investment', 'investment returns', 'cash flow', 'portfolio tracking'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['mutual-fund-returns-calculator', 'sip-calculator', 'lumpsum-calculator']
      },
      {
        id: 'dividend-yield-calculator',
        name: 'Dividend Yield & Reinvestment Calculator',
        description: 'Calculate returns from dividend stocks with reinvestment options',
        keywords: ['dividend', 'yield', 'reinvestment', 'drip', 'income investing'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['mutual-fund-returns-calculator', 'lumpsum-calculator', 'compound-interest-calculator']
      },
      {
        id: 'asset-allocation-planner',
        name: 'Asset Allocation Planner',
        description: 'Create a balanced portfolio based on your risk profile and financial goals',
        keywords: ['asset allocation', 'portfolio', 'diversification', 'risk profile', 'investment planning'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['risk-appetite-assessment', 'mutual-fund-overlap-checker', 'retirement-calculator']
      },
      {
        id: 'risk-appetite-assessment',
        name: 'Risk Appetite Assessment Tool',
        description: 'Determine your investment risk tolerance with a comprehensive assessment',
        keywords: ['risk tolerance', 'risk profile', 'investment personality', 'risk assessment', 'portfolio alignment'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['asset-allocation-planner', 'mutual-fund-overlap-checker', 'retirement-calculator']
      },
      {
        id: 'crowdfunding-investment-portal',
        name: 'Crowdfunding Startup Investment Portal',
        description: 'Discover and evaluate startup investment opportunities through equity crowdfunding',
        keywords: ['crowdfunding', 'startup investment', 'equity', 'alternative investment', 'early stage'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['p2p-lending-calculator', 'risk-appetite-assessment', 'asset-allocation-planner']
      },
      {
        id: 'digital-wealth-robo-advisor',
        name: 'Digital Wealth Robo-Advisor',
        description: 'Get personalized investment recommendations based on your financial profile',
        keywords: ['robo-advisor', 'automated investing', 'portfolio management', 'investment advice', 'wealth management'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['asset-allocation-planner', 'risk-appetite-assessment', 'sip-calculator']
      },
      {
        id: 'stable-return-fixed-income-aggregator',
        name: 'Stable-Return Fixed-Income Aggregator',
        description: 'Compare and find the best fixed income investment options across banks and financial institutions',
        keywords: ['fixed income', 'debt', 'bonds', 'fd', 'stable returns'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['fd-calculator', 'post-office-schemes-calculator', 'ppf-calculator']
      },
      {
        id: 'crypto-tax-estimator',
        name: 'Crypto Tax Estimator',
        description: 'Calculate tax liability on cryptocurrency transactions as per Indian regulations',
        keywords: ['crypto', 'bitcoin', 'cryptocurrency', 'tax', 'digital assets'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['capital-gains-tax-advanced-calculator', 'income-tax-calculator', 'tds-calculator']
      },
      {
        id: 'nri-stock-investment-dashboard',
        name: 'US/NRI Stock Investment Dashboard',
        description: 'Track and manage your US and Indian stock investments with tax implications for NRIs',
        keywords: ['nri', 'us stocks', 'international investing', 'foreign investment', 'portfolio tracking'],
        category: 'Investments & Wealth Management',
        relatedCalculators: ['capital-gains-tax-advanced-calculator', 'currency-converter', 'asset-allocation-planner']
      }
    ]
  },
  // Other existing categories...
];

// Function to get all calculators in a flat array
export const getAllCalculators = (): Array<{id: string; name: string; category: string; keywords: string[]}> => {
  return calculatorCategories.flatMap(category => 
    category.calculators.map(calculator => ({
      id: calculator.id,
      name: calculator.name,
      category: category.name,
      keywords: calculator.keywords
    }))
  );
};

// Function to get a calculator by ID
export const getCalculatorById = (id: string): Calculator | undefined => {
  for (const category of calculatorCategories) {
    const calculator = category.calculators.find(calc => calc.id === id);
    if (calculator) return calculator;
  }
  return undefined;
};