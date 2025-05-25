// Define the interface for a calculator
export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  info?: string[];
  faqs?: Array<{question: string; answer: string}>;
  relatedCalculators?: string[];
}

// Define the interface for a calculator category
export interface CalculatorCategory {
  id: string;
  name: string;
  description: string;
  calculators: Calculator[];
}

// Define the calculator categories
export const calculatorCategories: CalculatorCategory[] = [
  {
    id: 'loan-calculators',
    name: 'Loan Calculators',
    description: 'Calculate EMIs, loan eligibility, prepayment benefits and more with our comprehensive loan calculators',
    calculators: [
      {
        id: 'emi-calculator',
        name: 'EMI Calculator',
        description: 'Calculate your monthly loan payments (EMI) based on loan amount, interest rate, and tenure',
        category: 'Loan Calculators',
        keywords: ['emi', 'loan', 'monthly payment', 'interest', 'principal', 'loan repayment'],
        info: [
          'The EMI Calculator helps you determine the Equated Monthly Installment (EMI) for your loan based on the principal amount, interest rate, and loan tenure.',
          'EMI consists of both principal and interest components. In the initial stages of your loan, the interest component is higher. As you continue to pay, the principal component increases.',
          'This calculator provides you with a complete amortization schedule, showing the breakup of principal and interest for each payment throughout the loan tenure.'
        ],
        faqs: [
          {
            question: 'How is EMI calculated?',
            answer: 'EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is the loan amount, R is the interest rate per month (annual rate/12/100), and N is the loan tenure in months.'
          },
          {
            question: 'Can I prepay my loan?',
            answer: 'Yes, most banks and financial institutions allow loan prepayment. However, prepayment charges may apply. It\'s recommended to check with your lender for specific terms.'
          },
          {
            question: 'How does changing the loan tenure affect my EMI?',
            answer: 'Increasing the loan tenure reduces the monthly EMI amount but increases the total interest paid over the loan period. Conversely, decreasing the tenure increases the EMI but reduces the total interest outgo.'
          }
        ],
        relatedCalculators: ['home-loan-calculator', 'car-loan-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'home-loan-calculator',
        name: 'Home Loan Calculator',
        description: 'Calculate your home loan EMI, total interest, and repayment schedule',
        category: 'Loan Calculators',
        keywords: ['home loan', 'mortgage', 'property loan', 'house loan', 'emi', 'repayment'],
        relatedCalculators: ['emi-calculator', 'loan-eligibility-calculator', 'stamp-duty-calculator']
      },
      {
        id: 'car-loan-calculator',
        name: 'Car Loan Calculator',
        description: 'Plan your car purchase by calculating EMI, interest, and repayment details',
        category: 'Loan Calculators',
        keywords: ['car loan', 'auto loan', 'vehicle loan', 'emi', 'repayment'],
        relatedCalculators: ['emi-calculator', 'loan-affordability-calculator']
      },
      {
        id: 'personal-loan-calculator',
        name: 'Personal Loan Calculator',
        description: 'Calculate EMI and other details for your personal loan',
        category: 'Loan Calculators',
        keywords: ['personal loan', 'unsecured loan', 'emi', 'repayment'],
        relatedCalculators: ['emi-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'loan-comparison-calculator',
        name: 'Loan Comparison Calculator',
        description: 'Compare different loan offers to find the best option for you',
        category: 'Loan Calculators',
        keywords: ['compare loans', 'loan comparison', 'best loan', 'lowest interest'],
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'personal-loan-calculator']
      },
      {
        id: 'loan-prepayment-calculator',
        name: 'Loan Prepayment Calculator',
        description: 'Calculate the benefits of making additional payments towards your loan',
        category: 'Loan Calculators',
        keywords: ['prepayment', 'part payment', 'loan closure', 'interest saving'],
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'loan-refinance-calculator']
      },
      {
        id: 'loan-refinance-calculator',
        name: 'Loan Refinance Calculator',
        description: 'Determine if refinancing your loan is beneficial',
        category: 'Loan Calculators',
        keywords: ['refinance', 'balance transfer', 'loan transfer', 'interest saving'],
        relatedCalculators: ['emi-calculator', 'loan-prepayment-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'business-loan-calculator',
        name: 'Business Loan EMI Calculator',
        description: 'Calculate EMI and repayment schedule for business loans',
        category: 'Loan Calculators',
        keywords: ['business loan', 'commercial loan', 'sme loan', 'business emi'],
        relatedCalculators: ['emi-calculator', 'loan-affordability-calculator', 'gst-calculator']
      }
    ]
  },
  {
    id: 'tax-calculators',
    name: 'Tax Calculators',
    description: 'Estimate your tax liability, GST calculations, and explore tax-saving options with our tax calculator suite',
    calculators: [
      {
        id: 'gst-calculator',
        name: 'GST Calculator',
        description: 'Calculate GST inclusive and exclusive amounts for your purchases and sales',
        category: 'Tax Calculators',
        keywords: ['gst', 'goods and services tax', 'tax', 'cgst', 'sgst', 'igst'],
        info: [
          'The GST Calculator helps you calculate the Goods and Services Tax (GST) on products and services.',
          'You can calculate the GST-exclusive amount (base price) when you know the total price, or calculate the GST-inclusive amount (total price) when you know the base price.',
          'The calculator supports different GST rates applicable in India: 0%, 3%, 5%, 12%, 18%, and 28%.'
        ],
        faqs: [
          {
            question: 'What is GST?',
            answer: 'GST (Goods and Services Tax) is an indirect tax implemented in India on the supply of goods and services. It replaced multiple taxes like VAT, Service Tax, and Excise Duty.'
          },
          {
            question: 'How is GST calculated?',
            answer: 'To calculate GST from a GST-exclusive amount (base price), multiply the base price by the GST rate percentage. To calculate the base price from a GST-inclusive amount, divide the total price by (1 + GST rate/100).'
          },
          {
            question: 'What are CGST, SGST, and IGST?',
            answer: 'CGST (Central GST) and SGST (State GST) are collected on intra-state transactions, while IGST (Integrated GST) is collected on inter-state transactions. For intra-state supplies, the GST rate is split equally between CGST and SGST.'
          }
        ],
        relatedCalculators: ['income-tax-calculator', 'tds-calculator', 'gst-return-calculator']
      },
      {
        id: 'income-tax-calculator',
        name: 'Income Tax Calculator',
        description: 'Calculate your income tax liability as per the latest tax slabs and rules',
        category: 'Tax Calculators',
        keywords: ['income tax', 'tax', 'tax liability', 'tax slabs', 'tax deduction', 'tax exemption'],
        info: [
          'The Income Tax Calculator helps you estimate your tax liability based on your income, deductions, and exemptions.',
          'The calculator supports both the old and new tax regimes, allowing you to compare and choose the most beneficial option.',
          'It takes into account various deductions under Chapter VI-A, HRA exemptions, and other tax-saving investments.'
        ],
        faqs: [
          {
            question: 'What is the difference between the old and new tax regimes?',
            answer: 'The old tax regime allows for various deductions and exemptions but has higher tax rates. The new tax regime has lower tax rates but most deductions and exemptions are not available.'
          },
          {
            question: 'What are the common deductions available under Chapter VI-A?',
            answer: 'Common deductions include Section 80C (investments like PPF, ELSS, etc. up to ₹1.5 lakh), Section 80D (health insurance premiums), Section 80E (education loan interest), and more.'
          },
          {
            question: 'How is HRA exemption calculated?',
            answer: 'HRA exemption is the minimum of: (1) Actual HRA received, (2) 50% of basic salary (for metro cities) or 40% (for non-metro cities), or (3) Actual rent paid minus 10% of basic salary.'
          }
        ],
        relatedCalculators: ['gst-calculator', 'tds-calculator', 'capital-gains-tax-calculator']
      },
      {
        id: 'capital-gains-tax-calculator',
        name: 'Capital Gains Tax Calculator',
        description: 'Calculate the tax on your capital gains from stocks, property, and other assets',
        category: 'Tax Calculators',
        keywords: ['capital gains', 'capital gains tax', 'stcg', 'ltcg', 'stock', 'property', 'mutual funds'],
        relatedCalculators: ['income-tax-calculator', 'tds-calculator', 'property-tax-calculator']
      },
      {
        id: 'tds-calculator',
        name: 'TDS Calculator',
        description: 'Calculate the Tax Deducted at Source (TDS) amount for various types of payments',
        category: 'Tax Calculators',
        keywords: ['tds', 'tax deducted at source', 'withholding tax', 'tax deduction'],
        relatedCalculators: ['income-tax-calculator', 'gst-calculator', 'professional-tax-calculator']
      },
      {
        id: 'hra-exemption-calculator',
        name: 'HRA Exemption Calculator',
        description: 'Calculate the House Rent Allowance (HRA) exemption for tax purposes',
        category: 'Tax Calculators',
        keywords: ['hra', 'house rent allowance', 'rent exemption', 'tax exemption'],
        relatedCalculators: ['income-tax-calculator', 'rent-vs-buy-calculator', 'tds-calculator']
      },
      {
        id: 'section-80c-calculator',
        name: 'Section 80C Calculator',
        description: 'Plan your tax-saving investments under Section 80C of the Income Tax Act',
        category: 'Tax Calculators',
        keywords: ['section 80c', 'tax saving', 'tax deduction', 'investments'],
        relatedCalculators: ['income-tax-calculator', 'section-80d-calculator', 'ppf-calculator']
      },
      {
        id: 'section-80d-calculator',
        name: 'Section 80D Calculator',
        description: 'Calculate tax benefits on health insurance premiums under Section 80D',
        category: 'Tax Calculators',
        keywords: ['section 80d', 'health insurance', 'tax saving', 'medical insurance'],
        relatedCalculators: ['income-tax-calculator', 'section-80c-calculator', 'health-insurance-premium-calculator']
      },
      {
        id: 'tax-saving-investment-calculator',
        name: 'Tax Saving Investment Calculator',
        description: 'Plan your tax-saving investments under various sections',
        category: 'Tax Calculators',
        keywords: ['tax saving', '80C', '80D', 'tax deduction', 'tax planning'],
        relatedCalculators: ['income-tax-calculator', 'section-80c-calculator']
      },
      {
        id: 'advance-tax-calculator',
        name: 'Advance Tax Calculator',
        description: 'Calculate your advance tax liability and due dates',
        category: 'Tax Calculators',
        keywords: ['advance tax', 'quarterly tax', 'tax installment', 'tax planning'],
        relatedCalculators: ['income-tax-calculator', 'tds-calculator']
      }
    ]
  },
  {
    id: 'investment-calculators',
    name: 'Investment Calculators',
    description: 'Plan your investments, calculate returns, and achieve your financial goals with our investment calculator suite',
    calculators: [
      {
        id: 'sip-calculator',
        name: 'SIP Calculator',
        description: 'Calculate the returns on your Systematic Investment Plan (SIP) investments',
        category: 'Investment Calculators',
        keywords: ['sip', 'systematic investment plan', 'mutual fund', 'investment', 'returns', 'wealth'],
        info: [
          'The SIP Calculator helps you calculate the potential returns on your Systematic Investment Plan (SIP) investments based on the investment amount, duration, and expected rate of return.',
          'SIP is a method of investing a fixed amount at regular intervals (typically monthly) in mutual funds or other investment vehicles. It helps in rupee-cost averaging and mitigates market timing risk.',
          'This calculator shows you the total investment amount, expected returns, and the final value of your investment.'
        ],
        faqs: [
          {
            question: 'How is SIP return calculated?',
            answer: 'SIP returns are calculated using the formula for future value of an annuity: FV = P × ((1 + r)^n - 1) / r × (1 + r), where P is the SIP amount, r is the periodic rate of return (annual rate/12/100), and n is the number of periods (months).'
          },
          {
            question: 'What is rupee-cost averaging in SIP?',
            answer: 'Rupee-cost averaging means investing a fixed amount regularly, regardless of market conditions. When prices are high, you buy fewer units; when prices are low, you buy more units. This averages out the purchase cost over time and reduces the impact of market volatility.'
          },
          {
            question: 'Is SIP better than lump sum investment?',
            answer: 'SIP is generally considered better for most retail investors as it reduces timing risk, enforces disciplined investing, and is more affordable. However, lump sum investments may perform better in consistently rising markets. The choice depends on your investment goals, risk tolerance, and available capital.'
          }
        ],
        relatedCalculators: ['lumpsum-calculator', 'mutual-fund-calculator', 'ppf-calculator']
      },
      {
        id: 'lumpsum-calculator',
        name: 'Lumpsum Investment Calculator',
        description: 'Calculate returns on one-time investments across different investment options',
        category: 'Investment Calculators',
        keywords: ['lumpsum', 'one-time investment', 'investment', 'returns', 'wealth'],
        relatedCalculators: ['sip-calculator', 'fd-calculator', 'rd-calculator']
      },
      {
        id: 'ppf-calculator',
        name: 'PPF Calculator',
        description: 'Calculate the maturity value and returns on your Public Provident Fund investment',
        category: 'Investment Calculators',
        keywords: ['ppf', 'public provident fund', 'tax saving', 'long term investment', 'government scheme'],
        info: [
          'The PPF Calculator helps you calculate the maturity value and returns on your Public Provident Fund (PPF) investments based on your annual investment amount and the current PPF interest rate.',
          'PPF is a government-backed long-term investment scheme with a lock-in period of 15 years. It offers tax benefits under Section 80C and the interest earned is tax-free.',
          'This calculator shows you the total investment amount, interest earned, and the final maturity value of your PPF account.'
        ],
        faqs: [
          {
            question: 'What is the maximum and minimum investment limit in PPF?',
            answer: 'The minimum annual investment in PPF is ₹500, and the maximum is ₹1,50,000. You can invest in lump sum or in up to 12 installments per financial year.'
          },
          {
            question: 'What is the current interest rate for PPF?',
            answer: 'The PPF interest rate is set by the government and is reviewed quarterly. The current rate is 7.1% per annum (as of 2023-24). Interest is calculated on the lowest balance between the 5th and the last day of the month.'
          },
          {
            question: 'Can I extend my PPF account after maturity?',
            answer: 'Yes, after the initial 15 years, you can extend your PPF account in blocks of 5 years each. During the extension, you can continue to make deposits or leave it without deposits and just earn interest.'
          }
        ],
        relatedCalculators: ['epf-calculator', 'sip-calculator', 'sukanya-samriddhi-calculator']
      },
      {
        id: 'epf-calculator',
        name: 'EPF Calculator',
        description: 'Calculate the maturity value of your Employee Provident Fund (EPF) account',
        category: 'Investment Calculators',
        keywords: ['epf', 'employee provident fund', 'pf', 'retirement', 'employer contribution'],
        relatedCalculators: ['ppf-calculator', 'nps-calculator', 'gratuity-calculator']
      },
      {
        id: 'nps-calculator',
        name: 'NPS Calculator',
        description: 'Plan your retirement corpus with the National Pension System calculator',
        category: 'Investment Calculators',
        keywords: ['nps', 'national pension system', 'pension', 'retirement', 'annuity'],
        relatedCalculators: ['epf-calculator', 'retirement-calculator', 'pension-calculator']
      },
      {
        id: 'fd-calculator',
        name: 'Fixed Deposit Calculator',
        description: 'Calculate the maturity value and interest earned on your fixed deposits',
        category: 'Investment Calculators',
        keywords: ['fd', 'fixed deposit', 'term deposit', 'interest', 'bank deposit'],
        relatedCalculators: ['rd-calculator', 'lumpsum-calculator', 'simple-interest-calculator']
      },
      {
        id: 'rd-calculator',
        name: 'Recurring Deposit Calculator',
        description: 'Calculate the maturity value of your recurring deposit investments',
        category: 'Investment Calculators',
        keywords: ['rd', 'recurring deposit', 'monthly deposit', 'bank deposit', 'savings'],
        relatedCalculators: ['fd-calculator', 'sip-calculator', 'ppf-calculator']
      },
      {
        id: 'sukanya-samriddhi-calculator',
        name: 'Sukanya Samriddhi Yojana Calculator',
        description: 'Calculate returns on investments in the Sukanya Samriddhi Yojana scheme',
        category: 'Investment Calculators',
        keywords: ['sukanya samriddhi', 'ssy', 'girl child', 'government scheme', 'tax saving'],
        relatedCalculators: ['ppf-calculator', 'fd-calculator', 'education-planning-calculator']
      },
      {
        id: 'nps-tier-2-calculator',
        name: 'NPS Tier-2 Calculator',
        description: 'Calculate returns on your NPS Tier-2 account investments',
        category: 'Investment Calculators',
        keywords: ['nps tier 2', 'national pension system', 'voluntary contribution', 'pension investment'],
        relatedCalculators: ['nps-calculator', 'retirement-calculator', 'ppf-calculator']
      },
      {
        id: 'post-office-schemes-calculator',
        name: 'Post Office Schemes Calculator',
        description: 'Calculate returns on various post office savings schemes',
        category: 'Investment Calculators',
        keywords: ['post office', 'savings scheme', 'kvp', 'nsc', 'monthly income scheme'],
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'ppf-calculator']
      },
      {
        id: 'mutual-fund-returns-calculator',
        name: 'Mutual Fund Returns Calculator',
        description: 'Calculate absolute and annualized returns of mutual funds',
        category: 'Investment Calculators',
        keywords: ['mutual fund', 'returns', 'cagr', 'investment performance'],
        relatedCalculators: ['sip-calculator', 'lumpsum-calculator', 'mutual-fund-cost-calculator']
      },
      {
        id: 'mutual-fund-cost-calculator',
        name: 'Mutual Fund Cost Calculator',
        description: 'Calculate expense ratio impact and other mutual fund costs',
        category: 'Investment Calculators',
        keywords: ['expense ratio', 'mutual fund costs', 'exit load', 'fund charges'],
        relatedCalculators: ['mutual-fund-returns-calculator', 'sip-calculator']
      }
    ]
  },
  {
    id: 'retirement-calculators',
    name: 'Retirement Planning',
    description: 'Plan for a secure retirement with our comprehensive retirement calculators',
    calculators: [
      {
        id: 'retirement-calculator',
        name: 'Retirement Corpus Calculator',
        description: 'Calculate how much you need to save for your retirement',
        category: 'Retirement Planning',
        keywords: ['retirement', 'retirement planning', 'retirement corpus', 'retirement fund', 'old age'],
        relatedCalculators: ['nps-calculator', 'epf-calculator', 'pension-calculator']
      },
      {
        id: 'pension-calculator',
        name: 'Pension Calculator',
        description: 'Calculate your expected pension based on your contributions',
        category: 'Retirement Planning',
        keywords: ['pension', 'annuity', 'retirement income', 'monthly pension'],
        relatedCalculators: ['retirement-calculator', 'nps-calculator', 'epf-calculator']
      },
      {
        id: 'gratuity-calculator',
        name: 'Gratuity Calculator',
        description: 'Calculate the gratuity amount you will receive at retirement',
        category: 'Retirement Planning',
        keywords: ['gratuity', 'employee benefit', 'retirement benefit', 'service reward'],
        relatedCalculators: ['epf-calculator', 'retirement-calculator', 'pension-calculator']
      }
    ]
  },
  {
    id: 'insurance-calculators',
    name: 'Insurance Calculators',
    description: 'Calculate premiums, coverage needs, and compare insurance options',
    calculators: [
      {
        id: 'term-insurance-calculator',
        name: 'Term Insurance Premium Calculator',
        description: 'Calculate the premium for term life insurance based on your age and coverage amount',
        category: 'Insurance Calculators',
        keywords: ['term insurance', 'life insurance', 'premium', 'coverage', 'sum assured'],
        relatedCalculators: ['health-insurance-calculator', 'life-insurance-calculator', 'human-life-value-calculator']
      },
      {
        id: 'health-insurance-calculator',
        name: 'Health Insurance Premium Calculator',
        description: 'Estimate the premium for health insurance policies',
        category: 'Insurance Calculators',
        keywords: ['health insurance', 'medical insurance', 'premium', 'coverage', 'mediclaim'],
        relatedCalculators: ['term-insurance-calculator', 'section-80d-calculator', 'life-insurance-calculator']
      },
      {
        id: 'life-insurance-calculator',
        name: 'Life Insurance Premium Calculator',
        description: 'Calculate premiums for various life insurance policies',
        category: 'Insurance Calculators',
        keywords: ['life insurance', 'endowment', 'ulip', 'premium', 'coverage'],
        relatedCalculators: ['term-insurance-calculator', 'health-insurance-calculator', 'human-life-value-calculator']
      },
      {
        id: 'human-life-value-calculator',
        name: 'Human Life Value Calculator',
        description: 'Determine the optimal life insurance coverage based on your financial situation',
        category: 'Insurance Calculators',
        keywords: ['human life value', 'hlv', 'life insurance', 'coverage', 'financial protection'],
        relatedCalculators: ['term-insurance-calculator', 'life-insurance-calculator', 'income-replacement-calculator']
      }
    ]
  },
  {
    id: 'financial-planning',
    name: 'Financial Planning',
    description: 'Comprehensive calculators to help you plan your financial future and achieve your goals',
    calculators: [
      {
        id: 'net-worth-calculator',
        name: 'Net Worth Calculator',
        description: 'Calculate your total assets and liabilities to determine your net worth',
        category: 'Financial Planning',
        keywords: ['net worth', 'assets', 'liabilities', 'financial health', 'wealth'],
        relatedCalculators: ['emergency-fund-calculator', 'financial-goal-calculator', 'budget-calculator']
      },
      {
        id: 'emergency-fund-calculator',
        name: 'Emergency Fund Calculator',
        description: 'Calculate how much you need to save for emergencies',
        category: 'Financial Planning',
        keywords: ['emergency fund', 'contingency', 'savings', 'financial security'],
        relatedCalculators: ['net-worth-calculator', 'budget-calculator', 'financial-goal-calculator']
      },
      {
        id: 'financial-goal-calculator',
        name: 'Financial Goal Calculator',
        description: 'Plan and track progress towards your specific financial goals',
        category: 'Financial Planning',
        keywords: ['financial goal', 'goal planning', 'savings goal', 'investment goal'],
        relatedCalculators: ['sip-calculator', 'lumpsum-calculator', 'education-planning-calculator']
      },
      {
        id: 'budget-calculator',
        name: 'Budget Calculator',
        description: 'Create a comprehensive budget based on your income and expenses',
        category: 'Financial Planning',
        keywords: ['budget', 'budgeting', 'expense management', 'income allocation', 'cash flow'],
        relatedCalculators: ['emergency-fund-calculator', 'debt-to-income-calculator', 'net-worth-calculator']
      },
      {
        id: 'inflation-calculator',
        name: 'Inflation Calculator',
        description: 'Calculate the impact of inflation on your money over time',
        category: 'Financial Planning',
        keywords: ['inflation', 'purchasing power', 'price rise', 'cost of living'],
        relatedCalculators: ['future-value-calculator', 'retirement-calculator', 'financial-goal-calculator']
      },
      {
        id: 'future-value-calculator',
        name: 'Future Value Calculator',
        description: 'Calculate the future value of your investments or savings',
        category: 'Financial Planning',
        keywords: ['future value', 'investment growth', 'time value of money', 'compound growth'],
        relatedCalculators: ['compound-interest-calculator', 'sip-calculator', 'lumpsum-calculator']
      },
      {
        id: 'compound-interest-calculator',
        name: 'Compound Interest Calculator',
        description: 'Calculate how your money grows with compound interest',
        category: 'Financial Planning',
        keywords: ['compound interest', 'interest on interest', 'investment growth', 'wealth building'],
        relatedCalculators: ['simple-interest-calculator', 'future-value-calculator', 'fd-calculator']
      },
      {
        id: 'simple-interest-calculator',
        name: 'Simple Interest Calculator',
        description: 'Calculate interest earned or paid based on simple interest formula',
        category: 'Financial Planning',
        keywords: ['simple interest', 'interest calculation', 'principal', 'interest rate'],
        relatedCalculators: ['compound-interest-calculator', 'fd-calculator', 'loan-calculator']
      }
    ]
  },
  {
    id: 'real-estate-calculators',
    name: 'Real Estate Calculators',
    description: 'Make informed real estate decisions with our property-related calculators',
    calculators: [
      {
        id: 'stamp-duty-calculator',
        name: 'Stamp Duty Calculator',
        description: 'Calculate stamp duty and registration charges for property transactions',
        category: 'Real Estate Calculators',
        keywords: ['stamp duty', 'registration charges', 'property transfer', 'real estate'],
        relatedCalculators: ['property-registration-calculator', 'property-investment-calculator', 'home-loan-calculator']
      },
      {
        id: 'property-registration-calculator',
        name: 'Property Registration Cost Calculator',
        description: 'Calculate the total cost of registering a property',
        category: 'Real Estate Calculators',
        keywords: ['property registration', 'registration fee', 'documentation charges', 'transfer charges'],
        relatedCalculators: ['stamp-duty-calculator', 'home-loan-calculator', 'property-tax-calculator']
      },
      {
        id: 'property-investment-calculator',
        name: 'Property Investment Returns Calculator',
        description: 'Calculate the return on investment (ROI) for your property investments',
        category: 'Real Estate Calculators',
        keywords: ['property investment', 'real estate roi', 'rental yield', 'property appreciation'],
        relatedCalculators: ['rent-vs-buy-calculator', 'home-loan-calculator', 'capital-gains-tax-calculator']
      },
      {
        id: 'rent-vs-buy-calculator',
        name: 'Rent vs Buy Calculator',
        description: 'Compare the financial implications of renting versus buying a property',
        category: 'Real Estate Calculators',
        keywords: ['rent vs buy', 'property purchase', 'housing decision', 'real estate'],
        relatedCalculators: ['home-loan-calculator', 'property-investment-calculator', 'stamp-duty-calculator']
      }
    ]
  },
  {
    id: 'currency-conversion',
    name: 'Currency & Conversion',
    description: 'Convert currencies, interest rates, and other financial metrics',
    calculators: [
      {
        id: 'currency-converter',
        name: 'Currency Converter',
        description: 'Convert between Indian Rupees and other global currencies',
        category: 'Currency & Conversion',
        keywords: ['currency converter', 'exchange rate', 'forex', 'foreign exchange', 'inr conversion'],
        relatedCalculators: ['interest-rate-converter', 'loan-tenure-converter', 'inflation-calculator']
      },
      {
        id: 'interest-rate-converter',
        name: 'Interest Rate Converter',
        description: 'Convert between different interest rate types (flat, reducing, APR, EIR)',
        category: 'Currency & Conversion',
        keywords: ['interest rate converter', 'apr', 'eir', 'flat rate', 'reducing rate'],
        relatedCalculators: ['loan-tenure-converter', 'emi-calculator', 'compound-interest-calculator']
      },
      {
        id: 'loan-tenure-converter',
        name: 'Loan Tenure Converter',
        description: 'Convert loan tenure between years and months and calculate the impact on EMI',
        category: 'Currency & Conversion',
        keywords: ['loan tenure', 'loan term', 'years to months', 'emi impact'],
        relatedCalculators: ['emi-calculator', 'interest-rate-converter', 'loan-comparison-calculator']
      }
    ]
  },
  {
    id: 'banking-calculators',
    name: 'Banking Calculators',
    description: 'Useful calculators for various banking operations and financial planning',
    calculators: [
      {
        id: 'credit-card-emi-calculator',
        name: 'Credit Card EMI Calculator',
        description: 'Calculate EMI for credit card purchases converted to EMI',
        category: 'Banking Calculators',
        keywords: ['credit card emi', 'card purchase emi', 'no cost emi', 'cc emi'],
        relatedCalculators: ['emi-calculator', 'personal-loan-calculator', 'loan-comparison-calculator']
      },
      {
        id: 'savings-account-calculator',
        name: 'Savings Account Interest Calculator',
        description: 'Calculate the interest earned on your savings account',
        category: 'Banking Calculators',
        keywords: ['savings account', 'bank interest', 'savings interest', 'quarterly interest'],
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'compound-interest-calculator']
      },
      {
        id: 'loan-affordability-calculator',
        name: 'Loan Affordability Calculator',
        description: 'Calculate how much loan you can afford based on your income',
        category: 'Banking Calculators',
        keywords: ['loan affordability', 'loan eligibility', 'borrowing capacity', 'income based loan'],
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'debt-to-income-calculator']
      }
    ]
  },
  {
    id: 'business-calculators',
    name: 'Business Calculators',
    description: 'Financial calculators for business planning, analysis, and decision-making',
    calculators: [
      {
        id: 'business-loan-calculator',
        name: 'Business Loan EMI Calculator',
        description: 'Calculate EMI and repayment schedule for business loans',
        category: 'Business Calculators',
        keywords: ['business loan', 'commercial loan', 'sme loan', 'business emi'],
        relatedCalculators: ['emi-calculator', 'loan-affordability-calculator', 'gst-calculator']
      },
      {
        id: 'profit-margin-calculator',
        name: 'Profit Margin Calculator',
        description: 'Calculate gross, operating, and net profit margins for your business',
        category: 'Business Calculators',
        keywords: ['profit margin', 'gross margin', 'net margin', 'business profitability'],
        relatedCalculators: ['break-even-calculator', 'gst-calculator', 'roi-calculator']
      },
      {
        id: 'break-even-calculator',
        name: 'Break-Even Point Calculator',
        description: 'Calculate when your business will become profitable',
        category: 'Business Calculators',
        keywords: ['break even', 'break-even point', 'business profitability', 'fixed costs', 'variable costs'],
        relatedCalculators: ['profit-margin-calculator', 'roi-calculator', 'business-loan-calculator']
      },
      {
        id: 'inventory-turnover-calculator',
        name: 'Inventory Turnover Calculator',
        description: 'Calculate how efficiently your business is managing inventory',
        category: 'Business Calculators',
        keywords: ['inventory turnover', 'stock turnover', 'inventory management', 'business efficiency'],
        relatedCalculators: ['break-even-calculator', 'profit-margin-calculator', 'roi-calculator']
      },
      {
        id: 'debt-equity-calculator',
        name: 'Debt-to-Equity Ratio Calculator',
        description: 'Calculate and analyze your business\'s debt-to-equity ratio',
        category: 'Business Calculators',
        keywords: ['debt to equity', 'financial leverage', 'business solvency', 'capital structure'],
        relatedCalculators: ['break-even-calculator', 'profit-margin-calculator', 'business-loan-calculator']
      }
    ]
  },
  {
    id: 'tax-planning',
    name: 'Tax Planning',
    description: 'Optimize your tax planning with our comprehensive tax calculators',
    calculators: [
      {
        id: 'tax-saving-investment-calculator',
        name: 'Tax Saving Investment Calculator',
        description: 'Plan your tax-saving investments under various sections',
        category: 'Tax Planning',
        keywords: ['tax saving', '80C', '80D', 'tax deduction', 'tax planning'],
        relatedCalculators: ['income-tax-calculator', 'section-80c-calculator']
      },
      {
        id: 'advance-tax-calculator',
        name: 'Advance Tax Calculator',
        description: 'Calculate your advance tax liability and due dates',
        category: 'Tax Planning',
        keywords: ['advance tax', 'quarterly tax', 'tax installment', 'tax planning'],
        relatedCalculators: ['income-tax-calculator', 'tds-calculator']
      }
    ]
  },
  {
    id: 'forex-calculators',
    name: 'Forex Calculators',
    description: 'Calculate foreign exchange rates, margins, and conversions',
    calculators: [
      {
        id: 'forex-margin-calculator',
        name: 'Forex Margin Calculator',
        description: 'Calculate margin requirements for forex trading',
        category: 'Forex Calculators',
        keywords: ['forex', 'margin', 'leverage', 'trading', 'currency'],
        relatedCalculators: ['currency-converter', 'profit-loss-calculator', 'forex-pip-calculator']
      },
      {
        id: 'forex-pip-calculator',
        name: 'Forex Pip Calculator',
        description: 'Calculate pip value and position size for forex trading',
        category: 'Forex Calculators',
        keywords: ['pip', 'forex', 'trading', 'position size', 'risk management'],
        relatedCalculators: ['forex-margin-calculator', 'currency-converter']
      }
    ]
  },
  {
    id: 'commodity-calculators',
    name: 'Commodity Trading',
    description: 'Calculate margins, positions, and returns for commodity trading',
    calculators: [
      {
        id: 'commodity-margin-calculator',
        name: 'Commodity Margin Calculator',
        description: 'Calculate margin requirements for commodity trading',
        category: 'Commodity Trading',
        keywords: ['commodity', 'margin', 'trading', 'mcx', 'ncdex'],
        relatedCalculators: ['brokerage-calculator', 'profit-loss-calculator', 'gold-investment-calculator']
      },
      {
        id: 'gold-investment-calculator',
        name: 'Gold Investment Calculator',
        description: 'Calculate returns on gold investments including SGB and ETF',
        category: 'Commodity Trading',
        keywords: ['gold', 'sovereign gold bond', 'gold etf', 'precious metals'],
        relatedCalculators: ['commodity-margin-calculator', 'sip-calculator']
      }
    ]
  },
  {
    id: 'stock-market',
    name: 'Stock Market',
    description: 'Essential calculators for stock market trading and investing',
    calculators: [
      {
        id: 'brokerage-calculator',
        name: 'Brokerage Calculator',
        description: 'Calculate brokerage charges, taxes, and other trading costs',
        category: 'Stock Market',
        keywords: ['brokerage', 'trading charges', 'stt', 'transaction charges'],
        relatedCalculators: ['profit-loss-calculator', 'tax-calculator', 'margin-trading-calculator']
      },
      {
        id: 'margin-trading-calculator',
        name: 'Margin Trading Calculator',
        description: 'Calculate margin requirements and leverage for stock trading',
        category: 'Stock Market',
        keywords: ['margin trading', 'leverage', 'exposure', 'stock trading'],
        relatedCalculators: ['brokerage-calculator', 'profit-loss-calculator']
      }
    ]
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    description: 'Calculate returns, compare funds, and plan mutual fund investments',
    calculators: [
      {
        id: 'mutual-fund-returns-calculator',
        name: 'Mutual Fund Returns Calculator',
        description: 'Calculate absolute and annualized returns of mutual funds',
        category: 'Mutual Funds',
        keywords: ['mutual fund', 'returns', 'cagr', 'investment performance'],
        relatedCalculators: ['sip-calculator', 'lumpsum-calculator', 'mutual-fund-cost-calculator']
      },
      {
        id: 'mutual-fund-cost-calculator',
        name: 'Mutual Fund Cost Calculator',
        description: 'Calculate expense ratio impact and other mutual fund costs',
        category: 'Mutual Funds',
        keywords: ['expense ratio', 'mutual fund costs', 'exit load', 'fund charges'],
        relatedCalculators: ['mutual-fund-returns-calculator', 'sip-calculator']
      }
    ]
  }
];

// Helper functions
export const getAllCalculators = () => {
  return calculatorCategories.flatMap(category => 
    category.calculators.map(calculator => ({
      id: calculator.id,
      name: calculator.name,
      category: category.name,
      keywords: calculator.keywords || []
    }))
  );
};

export const getCalculatorById = (id: string): Calculator | undefined => {
  for (const category of calculatorCategories) {
    const calculator = category.calculators.find(calc => calc.id === id);
    if (calculator) {
      return calculator;
    }
  }
  return undefined;
};

export const getRelatedCalculators = (id: string): Calculator[] => {
  const calculator = getCalculatorById(id);
  if (!calculator || !calculator.relatedCalculators) return [];
  
  return calculator.relatedCalculators
    .map(relatedId => getCalculatorById(relatedId))
    .filter((calc): calc is Calculator => calc !== undefined);
};