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
    id: 'loan-calculators',
    name: 'Loan Calculators',
    description: 'Calculate EMIs, compare loans, and plan your borrowing with our comprehensive loan calculators',
    calculators: [
      {
        id: 'emi-calculator',
        name: 'EMI Calculator',
        description: 'Calculate your loan EMI, total interest, and payment schedule',
        keywords: ['emi', 'loan', 'interest', 'payment', 'monthly installment'],
        category: 'Loan Calculators',
        relatedCalculators: ['loan-comparison-calculator', 'home-loan-calculator', 'personal-loan-calculator']
      },
      {
        id: 'home-loan-calculator',
        name: 'Home Loan Calculator',
        description: 'Calculate EMI, total interest, and amortization for home loans',
        keywords: ['home loan', 'mortgage', 'property loan', 'housing loan', 'real estate'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator', 'loan-prepayment-calculator']
      },
      {
        id: 'personal-loan-calculator',
        name: 'Personal Loan Calculator',
        description: 'Calculate EMI and total payments for personal loans',
        keywords: ['personal loan', 'unsecured loan', 'consumer loan'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator', 'loan-affordability-calculator']
      },
      {
        id: 'car-loan-calculator',
        name: 'Car Loan Calculator',
        description: 'Calculate EMI and total payments for auto loans',
        keywords: ['car loan', 'auto loan', 'vehicle financing'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'business-loan-calculator',
        name: 'Business Loan Calculator',
        description: 'Calculate EMI and total payments for business loans',
        keywords: ['business loan', 'commercial loan', 'enterprise financing'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'loan-comparison-calculator',
        name: 'Loan Comparison Calculator',
        description: 'Compare different loan offers side by side',
        keywords: ['loan comparison', 'compare loans', 'best loan', 'loan options'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'personal-loan-calculator']
      },
      {
        id: 'loan-prepayment-calculator',
        name: 'Loan Prepayment Calculator',
        description: 'Calculate savings from loan prepayment',
        keywords: ['loan prepayment', 'part payment', 'foreclosure', 'early repayment'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'home-loan-calculator']
      },
      {
        id: 'loan-refinance-calculator',
        name: 'Loan Refinance Calculator',
        description: 'Calculate savings from refinancing your loan',
        keywords: ['loan refinance', 'balance transfer', 'loan switch', 'refinancing'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'loan-affordability-calculator',
        name: 'Loan Affordability Calculator',
        description: 'Calculate how much loan you can afford based on your income',
        keywords: ['loan affordability', 'borrowing capacity', 'loan eligibility'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'home-loan-calculator']
      },
      {
        id: 'loan-tenure-converter',
        name: 'Loan Tenure Converter',
        description: 'Convert loan tenure between years and months',
        keywords: ['loan tenure', 'loan term', 'years to months', 'months to years'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'credit-card-emi-calculator',
        name: 'Credit Card EMI Calculator',
        description: 'Calculate EMI for credit card payments',
        keywords: ['credit card emi', 'card payment', 'emi conversion'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'personal-loan-calculator']
      },
      {
        id: 'gold-loan-emi-calculator',
        name: 'Gold Loan EMI Calculator',
        description: 'Calculate your gold loan EMI, interest, and repayment schedule. Tailored for India with gold value, purity, and local rates.',
        keywords: ['gold loan emi calculator india', 'gold loan repayment calculator', 'gold loan interest calculator', 'gold loan india', 'gold loan emi'],
        category: 'Loan Calculators',
        relatedCalculators: ['home-loan-calculator', 'personal-loan-calculator', 'gold-investment-calculator']
      }
    ]
  },
  {
    id: 'investment-calculators',
    name: 'Investment Calculators',
    description: 'Plan your investments and calculate returns with our comprehensive investment calculators',
    calculators: [
      {
        id: 'sip-calculator',
        name: 'SIP Calculator',
        description: 'Calculate returns on your Systematic Investment Plan',
        keywords: ['sip', 'mutual fund', 'investment', 'returns', 'wealth creation'],
        category: 'Investment Calculators',
        relatedCalculators: ['step-up-sip-calculator', 'mutual-fund-returns-calculator', 'lumpsum-calculator']
      },
      {
        id: 'mutual-fund-returns-calculator',
        name: 'Mutual Fund Returns Calculator',
        description: 'Calculate returns on your mutual fund investments',
        keywords: ['mutual fund', 'returns', 'investment', 'nav', 'cagr'],
        category: 'Investment Calculators',
        relatedCalculators: ['sip-calculator', 'xirr-tracker', 'mutual-fund-cost-calculator']
      },
      {
        id: 'mutual-fund-cost-calculator',
        name: 'Mutual Fund Cost Calculator',
        description: 'Calculate the impact of expense ratio on your mutual fund returns',
        keywords: ['expense ratio', 'mutual fund', 'cost', 'direct plan', 'regular plan'],
        category: 'Investment Calculators',
        relatedCalculators: ['mutual-fund-returns-calculator', 'sip-calculator']
      },
      {
        id: 'ppf-calculator',
        name: 'PPF Calculator',
        description: 'Calculate returns on your Public Provident Fund investments',
        keywords: ['ppf', 'public provident fund', 'tax saving', 'government scheme'],
        category: 'Investment Calculators',
        relatedCalculators: ['sukanya-samriddhi-calculator', 'nps-calculator', 'tax-saving-investment-calculator']
      },
      {
        id: 'sukanya-samriddhi-calculator',
        name: 'Sukanya Samriddhi Calculator',
        description: 'Calculate returns on Sukanya Samriddhi Yojana investments',
        keywords: ['sukanya samriddhi', 'ssy', 'girl child', 'government scheme'],
        category: 'Investment Calculators',
        relatedCalculators: ['ppf-calculator', 'post-office-calculator', 'tax-saving-investment-calculator']
      },
      {
        id: 'nps-calculator',
        name: 'NPS Calculator',
        description: 'Calculate returns on National Pension System investments',
        keywords: ['nps', 'national pension system', 'retirement', 'pension'],
        category: 'Investment Calculators',
        relatedCalculators: ['nps-tier2-calculator', 'retirement-calculator', 'pension-calculator']
      },
      {
        id: 'nps-tier2-calculator',
        name: 'NPS Tier 2 Calculator',
        description: 'Calculate returns on NPS Tier 2 account investments',
        keywords: ['nps tier 2', 'national pension system', 'flexible withdrawal'],
        category: 'Investment Calculators',
        relatedCalculators: ['nps-calculator', 'mutual-fund-returns-calculator']
      },
      {
        id: 'post-office-calculator',
        name: 'Post Office Schemes Calculator',
        description: 'Calculate returns on various post office savings schemes',
        keywords: ['post office', 'kvp', 'nsc', 'mis', 'scss', 'td'],
        category: 'Investment Calculators',
        relatedCalculators: ['ppf-calculator', 'sukanya-samriddhi-calculator']
      },
      {
        id: 'gold-investment-calculator',
        name: 'Gold Investment Calculator',
        description: 'Calculate returns on gold investments',
        keywords: ['gold', 'investment', 'returns', 'precious metal'],
        category: 'Investment Calculators',
        relatedCalculators: ['gold-etf-vs-physical-calculator', 'sip-calculator']
      },
      {
        id: 'compound-interest-calculator',
        name: 'Compound Interest Calculator',
        description: 'Calculate the power of compound interest on your investments',
        keywords: ['compound interest', 'investment growth', 'compounding'],
        category: 'Investment Calculators',
        relatedCalculators: ['simple-interest-calculator', 'sip-calculator']
      },
      {
        id: 'simple-interest-calculator',
        name: 'Simple Interest Calculator',
        description: 'Calculate simple interest on your investments',
        keywords: ['simple interest', 'investment', 'returns'],
        category: 'Investment Calculators',
        relatedCalculators: ['compound-interest-calculator', 'fd-calculator']
      },
      {
        id: 'future-value-calculator',
        name: 'Future Value Calculator',
        description: 'Calculate the future value of your investments',
        keywords: ['future value', 'investment growth', 'time value of money'],
        category: 'Investment Calculators',
        relatedCalculators: ['compound-interest-calculator', 'sip-calculator']
      }
    ]
  }
  // ... Add other categories here, using the same pattern as above.
  // Make sure each category and its calculators are correctly closed with brackets and commas.
];
