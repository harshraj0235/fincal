// Module 1: The Corporate Survival Kit
export const module1Content: Record<string, any> = {
  'maximizing-section-80c': {
    readTime: 8, difficulty: 'Beginner', keywords: 'section 80c, tax saving investments, 80c deduction, elss, ppf, tax saving fd',
    keyTakeaways: [
      'Section 80C allows ₹1.5 Lakh deduction per year',
      'ELSS has the shortest lock-in (3 years) among 80C options',
      'EPF contributions auto-count toward 80C',
      'At 30% bracket, 80C saves you ₹46,800 in taxes'
    ],
    sections: [
      {
        heading: 'What is Section 80C?',
        paragraphs: [
          'Section 80C of the Income Tax Act is the most popular tax-saving provision in India. It allows you to claim a deduction of up to ₹1,50,000 from your total taxable income by investing in specified instruments.',
          'This means if you earn ₹15 Lakhs and invest ₹1.5 Lakhs under 80C, your taxable income reduces to ₹13.5 Lakhs — saving you up to ₹46,800 in taxes (at 30% + cess).',
          'Important: Section 80C is only available under the Old Tax Regime. Under the New Tax Regime (default from FY 2023-24), you cannot claim 80C deductions. Use our Tax Calculator to compare which regime saves you more.'
        ],
        tip: 'Your EPF (Employee Provident Fund) contribution already counts toward 80C. Check your salary slip — you might already be using ₹21,600/year of your 80C limit!'
      },
      {
        heading: 'Best 80C Investment Options Ranked',
        paragraphs: [
          'Not all 80C instruments are equal. Here is a comparison based on returns, lock-in period, and risk level:'
        ],
        table: {
          headers: ['Investment', 'Returns', 'Lock-in', 'Risk', 'Best For'],
          rows: [
            ['ELSS Mutual Funds', '12-15%', '3 years', 'High', 'Young investors'],
            ['PPF', '7.1%', '15 years', 'Zero', 'Risk-averse savers'],
            ['EPF (auto)', '8.25%', 'Till retirement', 'Zero', 'Everyone salaried'],
            ['NPS (80CCD)', '8-12%', 'Till 60', 'Medium', 'Extra ₹50K deduction'],
            ['Tax-Saver FD', '6.5-7%', '5 years', 'Zero', 'Senior citizens'],
            ['SSY (daughters)', '8.2%', '21 years', 'Zero', 'Parents of girls'],
            ['ULIP', '8-12%', '5 years', 'Medium', 'Insurance + invest'],
            ['NSC', '7.7%', '5 years', 'Zero', 'Conservative investors'],
          ]
        }
      },
      {
        heading: 'The Optimal 80C Strategy for Corporate Employees',
        paragraphs: [
          'Step 1: Check your EPF contribution on your salary slip. If your basic salary is ₹50,000/month, your EPF is ₹6,000/month = ₹72,000/year. That is already half of your 80C limit used!',
          'Step 2: Invest the remaining ₹78,000 in ELSS mutual funds via SIP. Set up a monthly SIP of ₹6,500 in a good ELSS fund (like Mirae Asset Tax Saver or Quant ELSS).',
          'Step 3: If you have a home loan, your principal repayment also counts under 80C. Many people unknowingly exhaust their 80C limit through EPF + home loan alone.',
          'Step 4: Consider NPS for an additional ₹50,000 deduction under Section 80CCD(1B) — this is OVER AND ABOVE the ₹1.5L limit!'
        ],
        tip: 'Do NOT buy insurance policies (endowment, money-back) just for 80C. Their returns are typically 4-5%, far below inflation. Buy term insurance separately and invest in ELSS for 80C.'
      }
    ],
    quiz: {
      question: 'What is the maximum deduction allowed under Section 80C per financial year?',
      options: ['₹1,00,000', '₹1,50,000', '₹2,00,000', '₹2,50,000'],
      correct: 1,
      explanation: 'Section 80C allows a maximum deduction of ₹1,50,000 per financial year. An additional ₹50,000 is available under Section 80CCD(1B) for NPS investments.'
    },
    actionItems: [
      'Check your salary slip for EPF contribution — note down the annual amount',
      'Calculate remaining 80C limit: ₹1,50,000 minus EPF contribution',
      'Start an ELSS SIP for the remaining amount on any platform like Groww or Zerodha',
      'Consider opening an NPS account for the extra ₹50K deduction under 80CCD(1B)'
    ],
    internalLinks: [
      { label: 'Income Tax Calculator', to: '/calculators/income-tax-calculator' },
      { label: 'PPF Calculator', to: '/calculators/ppf-calculator' },
      { label: 'Section 80C Calculator', to: '/calculators/section-80c-calculator' },
      { label: 'NPS Calculator', to: '/calculators/nps-calculator' }
    ],
    externalLinks: [
      { label: 'Income Tax Act Section 80C — Official Text', url: 'https://incometaxindia.gov.in/pages/acts/income-tax-act.aspx' },
      { label: 'AMFI — Mutual Fund Industry Data', url: 'https://www.amfiindia.com/' },
      { label: 'NPS Trust — Official Portal', url: 'https://www.npstrust.org.in/' }
    ]
  },

  'epf-vs-vpf': {
    readTime: 7, difficulty: 'Beginner', keywords: 'epf vs vpf, voluntary provident fund, epf interest rate, vpf benefits, retirement corpus',
    keyTakeaways: [
      'EPF is mandatory at 12% of basic; VPF is voluntary up to 100%',
      'Both earn the same 8.25% interest (FY 2025-26)',
      'VPF has EEE tax status — invest, earn, withdraw all tax-free',
      'VPF can build ₹2-3 Crores over a 30-year career'
    ],
    sections: [
      {
        heading: 'EPF: The Automatic Wealth Builder',
        paragraphs: [
          'Every salaried employee in India contributes 12% of their Basic + DA to the Employee Provident Fund (EPF). Your employer matches this with another 12% (though 8.33% goes to EPS pension).',
          'At 8.25% annual interest (compounded monthly), EPF is one of the highest-returning risk-free instruments in the world. And the best part? You get tax deduction on contribution (80C), tax-free interest, and tax-free withdrawal after 5 years.',
          'Most people ignore EPF because it feels "locked away." But this forced savings is actually your biggest financial advantage as a corporate employee.'
        ],
        tip: 'Never withdraw your EPF when switching jobs. Transfer it using the EPFO portal. Breaking EPF continuity means losing the tax-free status and compound growth.'
      },
      {
        heading: 'VPF: The Secret Weapon',
        paragraphs: [
          'Voluntary Provident Fund (VPF) allows you to contribute MORE than the mandatory 12% — up to 100% of your basic salary. It earns the same 8.25% interest as EPF.',
          'Why is VPF powerful? Because it is the ONLY instrument that offers: guaranteed 8.25% returns + zero risk + full tax-free status (EEE) + no separate account needed.',
          'Compare this to PPF (7.1%), FDs (5.5% post-tax), or even debt mutual funds (6-7% pre-tax). VPF beats them all on a risk-adjusted, post-tax basis.'
        ],
        table: {
          headers: ['Feature', 'EPF', 'VPF', 'PPF'],
          rows: [
            ['Interest Rate', '8.25%', '8.25%', '7.1%'],
            ['Lock-in', 'Till retirement', 'Till retirement', '15 years'],
            ['Tax Status', 'EEE', 'EEE', 'EEE'],
            ['Contribution Limit', '12% of basic', 'Up to 100%', '₹1.5L/year'],
            ['Risk', 'Zero', 'Zero', 'Zero'],
          ]
        }
      },
      {
        heading: 'How to Activate VPF',
        paragraphs: [
          'Step 1: Write to your HR/Payroll team requesting VPF activation. Most companies have a simple form.',
          'Step 2: Choose your VPF percentage — start with an additional 5-10% of basic salary.',
          'Step 3: The amount will be auto-deducted from your salary and added to your EPF account.',
          'Step 4: Track your balance on the EPFO portal (epfindia.gov.in) or Umang app.'
        ],
        tip: 'If your basic salary is ₹60,000/month and you contribute 20% extra as VPF (₹12,000/month), that is ₹1,44,000/year earning 8.25% tax-free. Over 25 years, this alone becomes ₹1.2 Crores!'
      }
    ],
    quiz: {
      question: 'What interest rate does VPF currently earn?',
      options: ['7.1%', '8.25%', '6.5%', '9.0%'],
      correct: 1,
      explanation: 'VPF earns the same rate as EPF — currently 8.25% for FY 2025-26. This makes it one of the highest-returning guaranteed instruments in India.'
    },
    actionItems: [
      'Log in to EPFO portal and check your current EPF balance',
      'Email HR to request VPF activation with an extra 10% contribution',
      'Calculate your projected corpus using our retirement calculator',
      'Ensure you transfer EPF when changing jobs — never withdraw early'
    ],
    internalLinks: [
      { label: 'Retirement Calculator', to: '/calculators/retirement-calculator' },
      { label: 'EPF Calculator', to: '/calculators/epf-calculator' },
      { label: 'PPF Calculator', to: '/calculators/ppf-calculator' }
    ],
    externalLinks: [
      { label: 'EPFO Official Portal', url: 'https://www.epfindia.gov.in/' },
      { label: 'Umang App — Check PF Balance', url: 'https://web.umang.gov.in/' },
      { label: 'EPF Interest Rate History — RBI', url: 'https://www.rbi.org.in/' }
    ]
  },

  'hra-standard-deduction': {
    readTime: 7, difficulty: 'Intermediate', keywords: 'hra exemption, standard deduction 2026, hra calculation, rent receipt, tax deduction salaried',
    keyTakeaways: [
      'Standard Deduction is ₹75,000 under New Regime, ₹50,000 under Old',
      'HRA exemption can save ₹1-3 Lakhs in taxes for rent-paying employees',
      'You can claim HRA even if you pay rent to parents',
      'Keep rent receipts and rental agreement as proof'
    ],
    sections: [
      {
        heading: 'Standard Deduction Explained',
        paragraphs: [
          'Standard Deduction is a flat amount deducted from your gross salary before calculating tax. No investment or proof required — every salaried employee gets it automatically.',
          'Under the New Tax Regime (FY 2026-27): ₹75,000. Under the Old Tax Regime: ₹50,000. This was increased in Budget 2024 to make the new regime more attractive.',
          'For someone in the 30% tax bracket, the ₹75,000 standard deduction saves ₹23,400 in taxes automatically!'
        ]
      },
      {
        heading: 'HRA Exemption: The Big Tax Saver',
        paragraphs: [
          'House Rent Allowance (HRA) exemption is one of the largest tax-saving tools for salaried employees living in rented accommodation. It is available ONLY under the Old Tax Regime.',
          'HRA exemption is the MINIMUM of: (a) Actual HRA received, (b) 50% of basic salary for metro cities (40% for non-metro), (c) Rent paid minus 10% of basic salary.',
          'Example: Basic = ₹50,000/month, HRA = ₹25,000/month, Rent = ₹20,000/month, Metro city. Exemption = MIN(₹25,000, ₹25,000, ₹15,000) = ₹15,000/month = ₹1,80,000/year tax-free!'
        ],
        table: {
          headers: ['Scenario', 'Monthly Rent', 'Annual HRA Exemption', 'Tax Saved (30%)'],
          rows: [
            ['Metro, Basic ₹40K', '₹15,000', '₹1,32,000', '₹41,184'],
            ['Metro, Basic ₹60K', '₹25,000', '₹2,28,000', '₹71,136'],
            ['Non-Metro, Basic ₹40K', '₹12,000', '₹96,000', '₹29,952'],
            ['Metro, Basic ₹80K', '₹35,000', '₹3,00,000', '₹93,600'],
          ]
        },
        tip: 'You can pay rent to your parents and claim HRA! Just ensure: your parents declare rental income in their ITR, you have a rental agreement, and you make rent payments via bank transfer.'
      }
    ],
    quiz: {
      question: 'What is the Standard Deduction under the New Tax Regime for FY 2026-27?',
      options: ['₹50,000', '₹60,000', '₹75,000', '₹1,00,000'],
      correct: 2,
      explanation: 'The Standard Deduction under the New Tax Regime was increased to ₹75,000 in Budget 2024, up from ₹50,000. Under the Old Regime, it remains ₹50,000.'
    },
    actionItems: [
      'Check if your employer is correctly calculating HRA exemption',
      'Collect rent receipts every month and keep digital copies',
      'Compare Old vs New regime using our Tax Calculator with your actual HRA',
      'If paying rent to parents, create a formal rental agreement'
    ],
    internalLinks: [
      { label: 'Income Tax Calculator', to: '/calculators/income-tax-calculator' },
      { label: 'HRA Calculator', to: '/calculators/hra-calculator' },
      { label: 'Old vs New Regime', to: '/calculators/income-tax-calculator' }
    ],
    externalLinks: [
      { label: 'Income Tax Department — HRA Rules', url: 'https://incometaxindia.gov.in/' },
      { label: 'ClearTax — HRA Exemption Guide', url: 'https://cleartax.in/s/hra-house-rent-allowance' }
    ]
  },

  'understanding-ctc': {
    readTime: 6, difficulty: 'Beginner', keywords: 'ctc breakdown, take home salary, salary structure india, gross salary vs net salary, salary components',
    keyTakeaways: [
      'CTC includes employer EPF, gratuity, and insurance — not your take-home',
      'Take-home is typically 60-70% of CTC for most employees',
      'Basic salary determines EPF, HRA, and gratuity — negotiate it wisely',
      'Variable pay and bonuses are taxed at your highest slab rate'
    ],
    sections: [
      {
        heading: 'Decoding Your CTC',
        paragraphs: [
          'CTC (Cost to Company) is NOT your salary. It is the total cost your employer spends on you, including components you never see in your bank account.',
          'A typical CTC of ₹15 LPA breaks down into: Basic (40-50%), HRA (20-25%), Special Allowance (15-20%), Employer EPF (12% of basic), Gratuity (4.8% of basic), Insurance, and other perks.',
          'Your actual take-home (in-hand salary) after all deductions is usually 60-70% of CTC. So a ₹15 LPA CTC means roughly ₹87,000-₹95,000/month in hand.'
        ],
        table: {
          headers: ['Component', '₹15 LPA Example', 'Taxable?', 'Notes'],
          rows: [
            ['Basic Salary', '₹6,00,000', 'Yes', 'Base for EPF, HRA, Gratuity'],
            ['HRA', '₹3,00,000', 'Partially', 'Exempt if paying rent'],
            ['Special Allowance', '₹2,50,000', 'Yes', 'Fully taxable'],
            ['Employer EPF', '₹72,000', 'No', 'Goes to your EPF account'],
            ['Gratuity', '₹28,846', 'No', 'Payable after 5 years'],
            ['Medical Insurance', '₹25,000', 'No', 'Group policy premium'],
            ['Variable/Bonus', '₹1,50,000', 'Yes', 'Performance-based'],
          ]
        }
      },
      {
        heading: 'Why Basic Salary Matters Most',
        paragraphs: [
          'Your basic salary is the foundation of everything: EPF contribution (12% of basic), HRA exemption (50% of basic in metros), gratuity calculation, and even your home loan eligibility.',
          'A higher basic means more EPF savings and higher HRA exemption — but also higher tax. A lower basic with higher "special allowance" means more take-home but less retirement savings.',
          'Pro strategy: If you are young and in a lower tax bracket, negotiate for higher basic. If you are in the 30% bracket with a home loan, optimize for higher HRA instead.'
        ],
        tip: 'When evaluating job offers, always compare in-hand salary, not CTC. Use our salary calculator to convert CTC to take-home for accurate comparison.'
      }
    ],
    quiz: {
      question: 'If your CTC is ₹20 LPA, approximately how much is your monthly in-hand salary?',
      options: ['₹1,66,000', '₹1,40,000', '₹1,15,000', '₹1,00,000'],
      correct: 2,
      explanation: 'Take-home is typically 60-70% of CTC. For ₹20 LPA: roughly ₹12-14 LPA in-hand = ₹1,00,000-₹1,16,000/month. After taxes, EPF, and professional tax deductions.'
    },
    actionItems: [
      'Download your latest salary slip and identify every component',
      'Calculate your actual take-home percentage of CTC',
      'Check if your basic salary is at least 40% of CTC',
      'Review your Form 16 Part B to understand total tax deducted'
    ],
    internalLinks: [
      { label: 'Income Tax Calculator', to: '/calculators/income-tax-calculator' },
      { label: 'Take Home Salary Calculator', to: '/calculators/salary-calculator' },
      { label: 'EPF Calculator', to: '/calculators/epf-calculator' }
    ],
    externalLinks: [
      { label: 'EPFO — Check Your EPF Balance', url: 'https://www.epfindia.gov.in/' },
      { label: 'Income Tax e-Filing Portal', url: 'https://www.incometax.gov.in/' }
    ]
  }
};
