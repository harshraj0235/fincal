interface CalculatorFAQ {
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
    description: 'Calculate EMIs, compare loans, and plan your loan repayments with our comprehensive loan calculators',
    calculators: [
      {
        id: 'emi-calculator',
        name: 'EMI Calculator',
        description: 'Calculate your loan EMI, total interest, and payment schedule',
        keywords: ['emi', 'loan', 'interest', 'payment', 'monthly installment'],
        category: 'Loan Calculators',
        info: [
          'The EMI Calculator helps you determine the Equated Monthly Installment (EMI) for your loan based on the principal amount, interest rate, and loan tenure.',
          'It also provides a detailed breakdown of your repayment schedule, showing how much of each payment goes towards the principal and interest over time.',
          'This calculator is useful for planning home loans, car loans, personal loans, and any other type of loan with a fixed repayment schedule.'
        ],
        faqs: [
          {
            question: 'How is EMI calculated?',
            answer: 'EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is the principal loan amount, R is the monthly interest rate (annual rate divided by 12 and then divided by 100), and N is the total number of monthly installments.'
          },
          {
            question: 'Does a longer loan tenure reduce my EMI?',
            answer: 'Yes, a longer loan tenure reduces your monthly EMI amount. However, it also increases the total interest paid over the life of the loan. You\'ll pay less each month but more in total.'
          },
          {
            question: 'How does changing the interest rate affect my EMI?',
            answer: 'A higher interest rate increases your EMI, while a lower interest rate decreases it. Even a small change in interest rate can significantly impact the total interest paid over the loan tenure.'
          }
        ],
        relatedCalculators: ['home-loan-calculator', 'car-loan-calculator', 'personal-loan-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'home-loan-calculator',
        name: 'Home Loan Calculator',
        description: 'Calculate EMI, total interest, and amortization for home loans',
        keywords: ['home loan', 'mortgage', 'property', 'housing loan', 'real estate'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-prepayment-calculator', 'loan-refinance-calculator', 'stamp-duty-calculator']
      },
      {
        id: 'car-loan-calculator',
        name: 'Car Loan Calculator',
        description: 'Calculate EMI and total cost for your auto loan',
        keywords: ['car loan', 'auto loan', 'vehicle financing', 'car emi'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator', 'loan-prepayment-calculator']
      },
      {
        id: 'personal-loan-calculator',
        name: 'Personal Loan Calculator',
        description: 'Calculate EMI and interest for personal loans',
        keywords: ['personal loan', 'unsecured loan', 'quick loan'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator', 'loan-affordability-calculator']
      },
      {
        id: 'loan-comparison-calculator',
        name: 'Loan Comparison Calculator',
        description: 'Compare different loan offers side by side',
        keywords: ['loan comparison', 'compare loans', 'best loan', 'loan options'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'car-loan-calculator', 'personal-loan-calculator']
      },
      {
        id: 'loan-prepayment-calculator',
        name: 'Loan Prepayment Calculator',
        description: 'Calculate savings from loan prepayments',
        keywords: ['prepayment', 'part payment', 'loan foreclosure', 'early repayment'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'loan-refinance-calculator']
      },
      {
        id: 'loan-refinance-calculator',
        name: 'Loan Refinance Calculator',
        description: 'Calculate savings from refinancing your loan',
        keywords: ['refinance', 'balance transfer', 'loan transfer', 'interest savings'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'loan-prepayment-calculator']
      },
      {
        id: 'loan-affordability-calculator',
        name: 'Loan Affordability Calculator',
        description: 'Find out how much loan you can afford',
        keywords: ['loan eligibility', 'affordability', 'borrowing capacity', 'loan amount'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'personal-loan-calculator']
      },
      {
        id: 'business-loan-calculator',
        name: 'Business Loan Calculator',
        description: 'Calculate EMI and interest for business loans',
        keywords: ['business loan', 'commercial loan', 'enterprise financing', 'msme loan'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'credit-card-emi-calculator',
        name: 'Credit Card EMI Calculator',
        description: 'Convert credit card purchases into EMIs',
        keywords: ['credit card emi', 'card emi', 'emi on purchase', 'no cost emi'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'personal-loan-calculator']
      },
      {
        id: 'loan-tenure-converter',
        name: 'Loan Tenure Converter',
        description: 'Convert loan tenure between years and months',
        keywords: ['loan period', 'tenure conversion', 'loan term', 'years to months'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator']
      }
    ]
  },
  {
    id: 'investment-calculators',
    name: 'Investment Calculators',
    description: 'Plan your investments and calculate returns with our investment calculators',
    calculators: [
      {
        id: 'sip-calculator',
        name: 'SIP Calculator',
        description: 'Calculate returns on your Systematic Investment Plan',
        keywords: ['sip', 'mutual fund', 'investment', 'returns', 'wealth'],
        category: 'Investment Calculators',
        relatedCalculators: ['lumpsum-calculator', 'mutual-fund-returns-calculator', 'ppf-calculator']
      },
      {
        id: 'ppf-calculator',
        name: 'PPF Calculator',
        description: 'Calculate returns on your Public Provident Fund investments',
        keywords: ['ppf', 'public provident fund', 'tax saving', 'government scheme'],
        category: 'Investment Calculators',
        relatedCalculators: ['sip-calculator', 'sukanya-samriddhi-calculator', 'tax-saving-investment-calculator']
      },
      {
        id: 'lumpsum-calculator',
        name: 'Lumpsum Calculator',
        description: 'Calculate returns on one-time investments',
        keywords: ['lumpsum', 'one-time investment', 'mutual fund', 'returns'],
        category: 'Investment Calculators',
        relatedCalculators: ['sip-calculator', 'mutual-fund-returns-calculator', 'fd-calculator']
      },
      {
        id: 'mutual-fund-returns-calculator',
        name: 'Mutual Fund Returns Calculator',
        description: 'Calculate returns on your mutual fund investments',
        keywords: ['mutual fund', 'returns', 'cagr', 'xirr', 'investment'],
        category: 'Investment Calculators',
        relatedCalculators: ['sip-calculator', 'lumpsum-calculator', 'mutual-fund-cost-calculator']
      },
      {
        id: 'mutual-fund-cost-calculator',
        name: 'Mutual Fund Cost Calculator',
        description: 'Calculate the impact of expenses on your mutual fund returns',
        keywords: ['expense ratio', 'mutual fund costs', 'exit load', 'fund expenses'],
        category: 'Investment Calculators',
        relatedCalculators: ['mutual-fund-returns-calculator', 'sip-calculator', 'lumpsum-calculator']
      },
      {
        id: 'sukanya-samriddhi-calculator',
        name: 'Sukanya Samriddhi Calculator',
        description: 'Calculate returns on Sukanya Samriddhi Yojana investments',
        keywords: ['sukanya samriddhi', 'ssy', 'girl child', 'government scheme'],
        category: 'Investment Calculators',
        relatedCalculators: ['ppf-calculator', 'post-office-schemes-calculator', 'tax-saving-investment-calculator']
      },
      {
        id: 'nps-calculator',
        name: 'NPS Calculator',
        description: 'Calculate returns on National Pension System investments',
        keywords: ['nps', 'national pension system', 'retirement', 'pension'],
        category: 'Investment Calculators',
        relatedCalculators: ['nps-tier-2-calculator', 'retirement-calculator', 'pension-calculator']
      },
      {
        id: 'nps-tier-2-calculator',
        name: 'NPS Tier-2 Calculator',
        description: 'Calculate returns on NPS Tier-2 account investments',
        keywords: ['nps tier 2', 'national pension system', 'flexible account'],
        category: 'Investment Calculators',
        relatedCalculators: ['nps-calculator', 'mutual-fund-returns-calculator', 'sip-calculator']
      },
      {
        id: 'post-office-schemes-calculator',
        name: 'Post Office Schemes Calculator',
        description: 'Calculate returns on various post office savings schemes',
        keywords: ['post office', 'kvp', 'nsc', 'scss', 'mis', 'td', 'rd'],
        category: 'Investment Calculators',
        relatedCalculators: ['ppf-calculator', 'sukanya-samriddhi-calculator', 'fd-calculator']
      },
      {
        id: 'fd-calculator',
        name: 'FD Calculator',
        description: 'Calculate maturity amount and interest on fixed deposits',
        keywords: ['fixed deposit', 'fd', 'term deposit', 'bank deposit'],
        category: 'Investment Calculators',
        relatedCalculators: ['rd-calculator', 'post-office-schemes-calculator', 'interest-rates-comparison']
      },
      {
        id: 'rd-calculator',
        name: 'RD Calculator',
        description: 'Calculate returns on recurring deposits',
        keywords: ['recurring deposit', 'rd', 'monthly deposit', 'bank deposit'],
        category: 'Investment Calculators',
        relatedCalculators: ['fd-calculator', 'sip-calculator', 'post-office-schemes-calculator']
      },
      {
        id: 'gold-investment-calculator',
        name: 'Gold Investment Calculator',
        description: 'Calculate returns on gold investments',
        keywords: ['gold', 'digital gold', 'sovereign gold bond', 'sgb', 'gold etf'],
        category: 'Investment Calculators',
        relatedCalculators: ['sip-calculator', 'lumpsum-calculator', 'property-investment-calculator']
      },
      {
        id: 'property-investment-calculator',
        name: 'Property Investment Calculator',
        description: 'Calculate returns on real estate investments',
        keywords: ['real estate', 'property', 'rental yield', 'capital appreciation'],
        category: 'Investment Calculators',
        relatedCalculators: ['rent-vs-buy-calculator', 'home-loan-calculator', 'stamp-duty-calculator']
      },
      {
        id: 'epf-calculator',
        name: 'EPF Calculator',
        description: 'Calculate returns on Employee Provident Fund contributions',
        keywords: ['epf', 'employee provident fund', 'retirement', 'pf'],
        category: 'Investment Calculators',
        relatedCalculators: ['ppf-calculator', 'nps-calculator', 'retirement-calculator']
      }
    ]
  },
  {
    id: 'tax-calculators',
    name: 'Tax Calculators',
    description: 'Calculate your tax liability and plan your taxes efficiently',
    calculators: [
      {
        id: 'income-tax-calculator',
        name: 'Income Tax Calculator',
        description: 'Calculate your income tax liability under old and new tax regimes',
        keywords: ['income tax', 'tax calculation', 'tax liability', 'tax planning'],
        category: 'Tax Calculators',
        relatedCalculators: ['tax-saving-investment-calculator', 'advance-tax-calculator', 'section-80c-calculator']
      },
      {
        id: 'gst-calculator',
        name: 'GST Calculator',
        description: 'Calculate GST inclusive and exclusive amounts with breakdown',
        keywords: ['gst', 'goods and services tax', 'tax calculation', 'cgst', 'sgst'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'tds-calculator']
      },
      {
        id: 'capital-gains-tax-calculator',
        name: 'Capital Gains Tax Calculator',
        description: 'Calculate tax on your investment gains',
        keywords: ['capital gains', 'stcg', 'ltcg', 'equity', 'debt', 'property'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'tax-saving-investment-calculator']
      },
      {
        id: 'tds-calculator',
        name: 'TDS Calculator',
        description: 'Calculate Tax Deducted at Source for various income types',
        keywords: ['tds', 'tax deducted at source', 'withholding tax'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'advance-tax-calculator']
      },
      {
        id: 'hra-exemption-calculator',
        name: 'HRA Exemption Calculator',
        description: 'Calculate your House Rent Allowance tax exemption',
        keywords: ['hra', 'house rent allowance', 'rent', 'tax exemption'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'section-80c-calculator', 'rent-vs-buy-calculator']
      },
      {
        id: 'section-80c-calculator',
        name: 'Section 80C Calculator',
        description: 'Calculate your tax deductions under Section 80C',
        keywords: ['section 80c', 'tax deduction', 'tax saving', 'investment'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'tax-saving-investment-calculator', 'section-80d-calculator']
      },
      {
        id: 'section-80d-calculator',
        name: 'Section 80D Calculator',
        description: 'Calculate your tax deductions for health insurance premiums',
        keywords: ['section 80d', 'health insurance', 'medical insurance', 'tax deduction'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'section-80c-calculator', 'health-insurance-calculator']
      },
      {
        id: 'tax-saving-investment-calculator',
        name: 'Tax Saving Investment Calculator',
        description: 'Plan your investments to save taxes',
        keywords: ['tax saving', 'investment', 'section 80c', 'section 80d', 'tax planning'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'section-80c-calculator', 'section-80d-calculator']
      },
      {
        id: 'advance-tax-calculator',
        name: 'Advance Tax Calculator',
        description: 'Calculate your advance tax liability and due dates',
        keywords: ['advance tax', 'tax installments', 'quarterly tax', 'tax planning'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'tds-calculator']
      }
    ]
  },
  {
    id: 'retirement-calculators',
    name: 'Retirement Calculators',
    description: 'Plan for a secure retirement with our specialized calculators',
    calculators: [
      {
        id: 'retirement-calculator',
        name: 'Retirement Calculator',
        description: 'Plan your retirement corpus and monthly investments',
        keywords: ['retirement', 'retirement planning', 'retirement corpus', 'retirement fund'],
        category: 'Retirement Calculators',
        relatedCalculators: ['pension-calculator', 'nps-calculator', 'sip-calculator']
      },
      {
        id: 'pension-calculator',
        name: 'Pension Calculator',
        description: 'Calculate your pension amount and corpus required',
        keywords: ['pension', 'annuity', 'retirement income', 'monthly pension'],
        category: 'Retirement Calculators',
        relatedCalculators: ['retirement-calculator', 'nps-calculator', 'gratuity-calculator']
      },
      {
        id: 'gratuity-calculator',
        name: 'Gratuity Calculator',
        description: 'Calculate your gratuity amount based on salary and service',
        keywords: ['gratuity', 'employee benefit', 'retirement benefit', 'service years'],
        category: 'Retirement Calculators',
        relatedCalculators: ['retirement-calculator', 'pension-calculator', 'epf-calculator']
      }
    ]
  },
  {
    id: 'insurance-calculators',
    name: 'Insurance Calculators',
    description: 'Calculate insurance premiums and coverage requirements',
    calculators: [
      {
        id: 'term-insurance-calculator',
        name: 'Term Insurance Calculator',
        description: 'Calculate the ideal coverage and premium for term insurance',
        keywords: ['term insurance', 'life insurance', 'insurance premium', 'coverage'],
        category: 'Insurance Calculators',
        relatedCalculators: ['life-insurance-calculator', 'human-life-value-calculator', 'health-insurance-calculator']
      },
      {
        id: 'health-insurance-calculator',
        name: 'Health Insurance Calculator',
        description: 'Calculate the ideal health insurance coverage and premium',
        keywords: ['health insurance', 'medical insurance', 'insurance premium', 'coverage'],
        category: 'Insurance Calculators',
        relatedCalculators: ['term-insurance-calculator', 'section-80d-calculator']
      },
      {
        id: 'life-insurance-calculator',
        name: 'Life Insurance Calculator',
        description: 'Calculate returns on endowment and ULIP policies',
        keywords: ['life insurance', 'endowment', 'ulip', 'insurance returns'],
        category: 'Insurance Calculators',
        relatedCalculators: ['term-insurance-calculator', 'human-life-value-calculator']
      },
      {
        id: 'human-life-value-calculator',
        name: 'Human Life Value Calculator',
        description: 'Calculate your financial value to determine insurance needs',
        keywords: ['human life value', 'hlv', 'insurance requirement', 'financial value'],
        category: 'Insurance Calculators',
        relatedCalculators: ['term-insurance-calculator', 'life-insurance-calculator']
      }
    ]
  },
  {
    id: 'personal-finance-calculators',
    name: 'Personal Finance Calculators',
    description: 'Manage your personal finances better with these essential calculators',
    calculators: [
      {
        id: 'net-worth-calculator',
        name: 'Net Worth Calculator',
        description: 'Calculate your total assets and liabilities',
        keywords: ['net worth', 'assets', 'liabilities', 'financial health'],
        category: 'Personal Finance Calculators',
        relatedCalculators: ['emergency-fund-calculator', 'financial-goal-calculator', 'budget-calculator']
      },
      {
        id: 'emergency-fund-calculator',
        name: 'Emergency Fund Calculator',
        description: 'Calculate how much you need for your emergency fund',
        keywords: ['emergency fund', 'rainy day fund', 'financial safety', 'contingency'],
        category: 'Personal Finance Calculators',
        relatedCalculators: ['net-worth-calculator', 'budget-calculator', 'financial-goal-calculator']
      },
      {
        id: 'financial-goal-calculator',
        name: 'Financial Goal Calculator',
        description: 'Plan your investments to achieve specific financial goals',
        keywords: ['financial goals', 'goal planning', 'target amount', 'investment planning'],
        category: 'Personal Finance Calculators',
        relatedCalculators: ['sip-calculator', 'lumpsum-calculator', 'budget-calculator']
      },
      {
        id: 'budget-calculator',
        name: 'Budget Calculator',
        description: 'Create a comprehensive budget based on your income and expenses',
        keywords: ['budget', 'income', 'expenses', 'financial planning', '50-30-20 rule'],
        category: 'Personal Finance Calculators',
        relatedCalculators: ['emergency-fund-calculator', 'financial-goal-calculator', 'net-worth-calculator']
      },
      {
        id: 'inflation-calculator',
        name: 'Inflation Calculator',
        description: 'Calculate the impact of inflation on your money over time',
        keywords: ['inflation', 'purchasing power', 'future value', 'cost increase'],
        category: 'Personal Finance Calculators',
        relatedCalculators: ['future-value-calculator', 'retirement-calculator', 'financial-goal-calculator']
      },
      {
        id: 'future-value-calculator',
        name: 'Future Value Calculator',
        description: 'Calculate the future value of your investments',
        keywords: ['future value', 'investment growth', 'compounding', 'time value'],
        category: 'Personal Finance Calculators',
        relatedCalculators: ['compound-interest-calculator', 'sip-calculator', 'lumpsum-calculator']
      },
      {
        id: 'compound-interest-calculator',
        name: 'Compound Interest Calculator',
        description: 'Calculate the growth of your investments with compound interest',
        keywords: ['compound interest', 'compounding', 'investment growth', 'interest on interest'],
        category: 'Personal Finance Calculators',
        relatedCalculators: ['simple-interest-calculator', 'future-value-calculator', 'sip-calculator']
      },
      {
        id: 'simple-interest-calculator',
        name: 'Simple Interest Calculator',
        description: 'Calculate interest earned or paid using simple interest method',
        keywords: ['simple interest', 'interest calculation', 'principal', 'interest rate'],
        category: 'Personal Finance Calculators',
        relatedCalculators: ['compound-interest-calculator', 'fd-calculator', 'loan-calculator']
      }
    ]
  },
  {
    id: 'property-calculators',
    name: 'Property Calculators',
    description: 'Make informed real estate decisions with our property calculators',
    calculators: [
      {
        id: 'stamp-duty-calculator',
        name: 'Stamp Duty Calculator',
        description: 'Calculate stamp duty and registration charges for property',
        keywords: ['stamp duty', 'property registration', 'property tax', 'real estate'],
        category: 'Property Calculators',
        relatedCalculators: ['property-registration-calculator', 'home-loan-calculator', 'property-investment-calculator']
      },
      {
        id: 'property-registration-calculator',
        name: 'Property Registration Calculator',
        description: 'Calculate all costs involved in property registration',
        keywords: ['property registration', 'registration charges', 'legal fees', 'real estate'],
        category: 'Property Calculators',
        relatedCalculators: ['stamp-duty-calculator', 'home-loan-calculator', 'property-investment-calculator']
      },
      {
        id: 'property-investment-calculator',
        name: 'Property Investment Calculator',
        description: 'Calculate returns on real estate investments',
        keywords: ['property investment', 'real estate returns', 'rental yield', 'property appreciation'],
        category: 'Property Calculators',
        relatedCalculators: ['rent-vs-buy-calculator', 'home-loan-calculator', 'stamp-duty-calculator']
      },
      {
        id: 'rent-vs-buy-calculator',
        name: 'Rent vs Buy Calculator',
        description: 'Compare the costs of renting versus buying a property',
        keywords: ['rent vs buy', 'property decision', 'real estate', 'housing cost'],
        category: 'Property Calculators',
        relatedCalculators: ['property-investment-calculator', 'home-loan-calculator', 'hra-exemption-calculator']
      }
    ]
  },
  {
    id: 'conversion-calculators',
    name: 'Conversion Calculators',
    description: 'Convert between different financial metrics and currencies',
    calculators: [
      {
        id: 'currency-converter',
        name: 'Currency Converter',
        description: 'Convert between Indian Rupee and other major currencies',
        keywords: ['currency', 'forex', 'exchange rate', 'foreign currency', 'inr'],
        category: 'Conversion Calculators',
        relatedCalculators: ['forex-margin-calculator', 'forex-pip-calculator']
      },
      {
        id: 'interest-rate-converter',
        name: 'Interest Rate Converter',
        description: 'Convert between different types of interest rates',
        keywords: ['interest rate', 'flat rate', 'reducing rate', 'apr', 'eir'],
        category: 'Conversion Calculators',
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator']
      }
    ]
  },
  {
    id: 'business-calculators',
    name: 'Business Calculators',
    description: 'Financial calculators for business planning and analysis',
    calculators: [
      {
        id: 'profit-margin-calculator',
        name: 'Profit Margin Calculator',
        description: 'Calculate gross, operating, and net profit margins',
        keywords: ['profit margin', 'gross margin', 'operating margin', 'net margin', 'business'],
        category: 'Business Calculators',
        relatedCalculators: ['break-even-calculator', 'gst-calculator', 'business-loan-calculator']
      },
      {
        id: 'break-even-calculator',
        name: 'Break-Even Calculator',
        description: 'Calculate your business break-even point',
        keywords: ['break-even', 'business analysis', 'fixed costs', 'variable costs', 'profit'],
        category: 'Business Calculators',
        relatedCalculators: ['profit-margin-calculator', 'inventory-turnover-calculator', 'business-loan-calculator']
      },
      {
        id: 'inventory-turnover-calculator',
        name: 'Inventory Turnover Calculator',
        description: 'Calculate your inventory turnover ratio and days inventory outstanding',
        keywords: ['inventory turnover', 'stock turnover', 'inventory management', 'business efficiency'],
        category: 'Business Calculators',
        relatedCalculators: ['break-even-calculator', 'profit-margin-calculator', 'debt-equity-calculator']
      },
      {
        id: 'debt-equity-calculator',
        name: 'Debt-Equity Calculator',
        description: 'Calculate your debt-to-equity ratio and financial leverage',
        keywords: ['debt-equity', 'financial leverage', 'capital structure', 'business finance'],
        category: 'Business Calculators',
        relatedCalculators: ['business-loan-calculator', 'break-even-calculator', 'profit-margin-calculator']
      }
    ]
  },
  {
    id: 'trading-calculators',
    name: 'Trading Calculators',
    description: 'Calculators for stock, forex, and commodity traders',
    calculators: [
      {
        id: 'brokerage-calculator',
        name: 'Brokerage Calculator',
        description: 'Calculate brokerage, taxes, and other trading charges',
        keywords: ['brokerage', 'trading charges', 'stt', 'transaction charges', 'stock market'],
        category: 'Trading Calculators',
        relatedCalculators: ['margin-trading-calculator', 'forex-margin-calculator', 'capital-gains-tax-calculator']
      },
      {
        id: 'margin-trading-calculator',
        name: 'Margin Trading Calculator',
        description: 'Calculate margin requirements and leverage for stock trading',
        keywords: ['margin trading', 'leverage', 'exposure', 'stock market', 'trading'],
        category: 'Trading Calculators',
        relatedCalculators: ['brokerage-calculator', 'forex-margin-calculator']
      },
      {
        id: 'forex-margin-calculator',
        name: 'Forex Margin Calculator',
        description: 'Calculate margin requirements for forex trading',
        keywords: ['forex', 'margin', 'currency trading', 'leverage', 'forex market'],
        category: 'Trading Calculators',
        relatedCalculators: ['forex-pip-calculator', 'margin-trading-calculator', 'currency-converter']
      },
      {
        id: 'forex-pip-calculator',
        name: 'Forex Pip Calculator',
        description: 'Calculate the value of a pip in forex trading',
        keywords: ['forex', 'pip', 'currency trading', 'pip value', 'forex market'],
        category: 'Trading Calculators',
        relatedCalculators: ['forex-margin-calculator', 'currency-converter']
      },
      {
        id: 'commodity-margin-calculator',
        name: 'Commodity Margin Calculator',
        description: 'Calculate margin requirements for commodity trading',
        keywords: ['commodity', 'margin', 'futures', 'mcx', 'trading'],
        category: 'Trading Calculators',
        relatedCalculators: ['margin-trading-calculator', 'brokerage-calculator']
      }
    ]
  },
  {
    id: 'banking-tools',
    name: 'Banking Tools',
    description: 'Useful tools for banking services and information',
    calculators: [
      {
        id: 'bank-ifsc-finder',
        name: 'Bank IFSC/MICR Finder',
        description: 'Find IFSC and MICR codes for any bank branch in India',
        keywords: ['ifsc', 'micr', 'bank code', 'branch code', 'neft', 'rtgs', 'imps'],
        category: 'Banking Tools',
        relatedCalculators: ['upi-failure-troubleshooter', 'bank-holiday-calendar', 'interest-rates-comparison']
      },
      {
        id: 'upi-failure-troubleshooter',
        name: 'UPI Failure Troubleshooter',
        description: 'Diagnose and fix UPI transaction failures',
        keywords: ['upi', 'payment failure', 'transaction failed', 'upi troubleshooting'],
        category: 'Banking Tools',
        relatedCalculators: ['bank-ifsc-finder', 'atm-locator', 'bank-holiday-calendar']
      },
      {
        id: 'atm-locator',
        name: 'ATM Locator',
        description: 'Find ATMs near you with real-time availability status',
        keywords: ['atm', 'cash withdrawal', 'bank atm', 'nearest atm', 'atm finder'],
        category: 'Banking Tools',
        relatedCalculators: ['bank-ifsc-finder', 'bank-holiday-calendar', 'upi-failure-troubleshooter']
      },
      {
        id: 'bank-holiday-calendar',
        name: 'Bank Holiday Calendar',
        description: 'Check bank holidays across all Indian states',
        keywords: ['bank holiday', 'banking hours', 'bank working days', 'bank closed'],
        category: 'Banking Tools',
        relatedCalculators: ['bank-ifsc-finder', 'atm-locator', 'interest-rates-comparison']
      },
      {
        id: 'interest-rates-comparison',
        name: 'Interest Rates Comparison',
        description: 'Compare current interest rates across major banks in India',
        keywords: ['interest rates', 'bank rates', 'fd rates', 'loan rates', 'savings rates'],
        category: 'Banking Tools',
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'savings-account-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'banking-knowledge',
        name: 'Banking Knowledge',
        description: 'Learn about banking services, products, and best practices',
        keywords: ['banking basics', 'financial literacy', 'banking guide', 'banking terms'],
        category: 'Banking Tools',
        relatedCalculators: ['bank-ifsc-finder', 'upi-failure-troubleshooter', 'bank-holiday-calendar']
      }
    ]
  }
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