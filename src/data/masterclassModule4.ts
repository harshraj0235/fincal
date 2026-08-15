export const module4Content: Record<string, any> = {
  'planning-first-home': {
    readTime: 8, difficulty: 'Intermediate', keywords: 'first home buying india, home loan planning, down payment saving, property buying checklist, home loan eligibility',
    keyTakeaways: ['Save 20% down payment before applying for home loan', 'EMI should not exceed 40% of monthly take-home', 'Budget for 8-10% extra costs: stamp duty, registration, interiors', 'Rent is NOT wasted money — compare rent vs EMI+opportunity cost'],
    sections: [
      { heading: 'The 20% Down Payment Rule', paragraphs: ['Banks lend up to 80% of property value. You need at least 20% as down payment. For a ₹60 Lakh property: Down payment = ₹12 Lakhs + Stamp duty/registration ~₹4.5 Lakhs + Interior/moving ~₹3 Lakhs = Total upfront: ₹19.5 Lakhs.', 'Start a dedicated "Home Fund" SIP. At ₹25,000/month for 4 years at 12%, you will accumulate ~₹15 Lakhs. Add annual bonuses and you reach your target.'],
        table: { headers: ['Property Value', 'Down Payment (20%)', 'Extra Costs (10%)', 'Total Upfront'], rows: [['₹40 Lakh', '₹8L', '₹4L', '₹12L'], ['₹60 Lakh', '₹12L', '₹6L', '₹18L'], ['₹80 Lakh', '₹16L', '₹8L', '₹24L'], ['₹1 Crore', '₹20L', '₹10L', '₹30L']] } },
      { heading: 'Rent vs Buy: The Real Math', paragraphs: ['Buying is NOT always better than renting. In expensive cities like Mumbai and Bangalore, rent-to-price ratios are 2-3%, meaning it is often cheaper to rent and invest the difference.', 'Example: ₹60L property at 8.5% = EMI of ₹46,000 + maintenance ₹5,000. Renting the same for ₹18,000 saves ₹33,000/month. Investing that savings in SIP at 12% for 20 years = ₹3.3 Crores! While the property might be worth ₹2-2.5 Crores.'],
        tip: 'Buy a home when you plan to stay 7+ years, have 20% down payment ready, and your EMI is under 40% of take-home. Otherwise, rent and invest the difference.' }
    ],
    quiz: { question: 'What percentage of take-home salary should your home loan EMI ideally be?', options: ['20-25%', '30-35%', '35-40%', '50-60%'], correct: 2, explanation: 'Financial advisors recommend keeping your home loan EMI at or below 40% of monthly take-home salary. Going above this puts stress on other financial goals.' },
    actionItems: ['Calculate your home loan eligibility using our calculator', 'Start a dedicated "Home Fund" SIP of ₹20-30K/month', 'Research stamp duty rates in your state', 'Compare rent vs EMI for your target property'],
    internalLinks: [{ label: 'Home Loan EMI Calculator', to: '/calculators/home-loan-calculator' }, { label: 'Stamp Duty Calculator', to: '/calculators/stamp-duty-calculator' }, { label: 'EMI Affordability Checker', to: '/calculators/emi-affordability-calculator' }],
    externalLinks: [{ label: '99acres — Property Research', url: 'https://www.99acres.com/' }, { label: 'SBI Home Loans', url: 'https://homeloans.sbi/' }]
  },
  'retirement-25x-rule': {
    readTime: 7, difficulty: 'Intermediate', keywords: 'retirement planning india, 25x rule, retirement corpus calculator, fire movement india, early retirement',
    keyTakeaways: ['Retirement corpus = Annual expenses × 25', 'Account for 6% inflation — expenses double every 12 years', 'Start at 25 and you need to save 15% of income', 'Start at 35 and you need to save 30% of income'],
    sections: [
      { heading: 'The 25x Rule Explained', paragraphs: ['The 25x Rule (from the FIRE movement) states: to retire, you need 25 times your annual expenses invested in a diversified portfolio.', 'Why 25x? Because you can safely withdraw 4% per year from an equity-heavy portfolio without running out of money. 4% of 25x = 1x annual expenses.', 'Example: Monthly expenses = ₹60,000 → Annual = ₹7.2 Lakhs → Retirement corpus = ₹7.2L × 25 = ₹1.8 Crores. But wait — inflation!'],
        table: { headers: ['Monthly Expenses', 'At 6% Inflation (20yr)', 'Corpus Needed (25x)'], rows: [['₹40,000', '₹1,28,000/mo', '₹3.84 Cr'], ['₹60,000', '₹1,92,000/mo', '₹5.76 Cr'], ['₹80,000', '₹2,56,000/mo', '₹7.68 Cr'], ['₹1,00,000', '₹3,20,000/mo', '₹9.60 Cr']] },
        tip: 'In India, a 4% withdrawal rate might be conservative. With higher growth rates, 3-3.5% is safer. Use our Retirement Calculator for precise projections.' }
    ],
    quiz: { question: 'Using the 25x rule, how much corpus does someone spending ₹50K/month need?', options: ['₹50 Lakhs', '₹1 Crore', '₹1.5 Crores', '₹5 Crores+'], correct: 3, explanation: '₹50K/month = ₹6L/year. 25 × ₹6L = ₹1.5 Crores at today\'s expenses. But with 20 years of inflation at 6%, you actually need ₹4.8 Crores!' },
    actionItems: ['Calculate your monthly essential expenses honestly', 'Multiply by 300 (25 × 12) for your base retirement number', 'Use our Retirement Calculator to add inflation', 'Start a dedicated retirement SIP separate from other goals'],
    internalLinks: [{ label: 'Retirement Calculator', to: '/calculators/retirement-calculator' }, { label: 'SIP Calculator', to: '/calculators/sip-calculator' }, { label: 'NPS Calculator', to: '/calculators/nps-calculator' }],
    externalLinks: [{ label: 'FIRE India Community', url: 'https://www.reddit.com/r/FIREIndia/' }, { label: 'NPS — Pension Fund', url: 'https://www.npstrust.org.in/' }]
  },
  'tax-free-income-strategies': {
    readTime: 6, difficulty: 'Beginner', keywords: 'tax free income india, ppf tax free, sukanya samriddhi, eee investments, tax free instruments india',
    keyTakeaways: ['PPF, SSY, and EPF enjoy EEE status (Exempt-Exempt-Exempt)', 'LTCG on equity up to ₹1.25L/year is tax-free', 'Sovereign Gold Bonds are tax-free on maturity', 'Structure income across these instruments for zero-tax wealth'],
    sections: [
      { heading: 'EEE: The Holy Grail of Tax Efficiency', paragraphs: ['EEE means: your contribution is tax-deductible (Exempt), interest earned is tax-free (Exempt), and maturity amount is tax-free (Exempt). Only 3 instruments in India have this: PPF, EPF, and Sukanya Samriddhi Yojana (SSY).', 'PPF: Invest up to ₹1.5L/year for 15 years at 7.1% = ~₹40.7 Lakhs maturity (all tax-free). SSY: For daughters below 10, invest up to ₹1.5L/year at 8.2% for 21 years. EPF/VPF: 8.25% compounding till retirement.'],
        table: { headers: ['Instrument', 'Rate', 'Lock-in', 'Tax Status', 'Limit'], rows: [['PPF', '7.1%', '15 years', 'EEE', '₹1.5L/yr'], ['SSY', '8.2%', '21 years', 'EEE', '₹1.5L/yr'], ['EPF', '8.25%', 'Retirement', 'EEE', '12% of basic'], ['VPF', '8.25%', 'Retirement', 'EEE', 'Up to 100% basic'], ['SGB', '2.5%+gold', '8 years', 'Tax-free on maturity', 'No limit']] },
        tip: 'If you maximize PPF (₹1.5L) + VPF (₹1.5L) + SSY for daughter (₹1.5L) = ₹4.5 Lakhs/year earning 7-8% completely tax-free. Over 20 years, this alone can create ₹2.5 Crores!' }
    ],
    quiz: { question: 'Which tax status do PPF and EPF enjoy?', options: ['EET (Taxed at withdrawal)', 'EEE (Fully tax-free)', 'TEE (No deduction on investment)', 'TTE (Only maturity is tax-free)'], correct: 1, explanation: 'PPF and EPF enjoy EEE (Exempt-Exempt-Exempt) status — contribution is deductible under 80C, interest is tax-free, and maturity is completely tax-free.' },
    actionItems: ['Open a PPF account if you don\'t have one (any bank or post office)', 'Maximize PPF contribution to ₹1.5L/year', 'If you have a daughter under 10, open SSY account immediately', 'Consider VPF for additional tax-free compounding'],
    internalLinks: [{ label: 'PPF Calculator', to: '/calculators/ppf-calculator' }, { label: 'Sukanya Samriddhi Calculator', to: '/calculators/sukanya-samriddhi-calculator' }, { label: 'Income Tax Calculator', to: '/calculators/income-tax-calculator' }],
    externalLinks: [{ label: 'India Post — PPF Account', url: 'https://www.indiapost.gov.in/' }, { label: 'SSY Official Rules', url: 'https://www.nsiindia.gov.in/' }]
  },
  'avoiding-lifestyle-creep': {
    readTime: 6, difficulty: 'Beginner', keywords: 'lifestyle creep, lifestyle inflation, saving after raise, hedonic treadmill, frugal living india',
    keyTakeaways: ['Save at least 50% of every raise/increment', 'Automate investments before spending reaches your account', 'Track spending monthly — you can\'t manage what you don\'t measure', 'The richest people in corporate India live below their means'],
    sections: [
      { heading: 'The Lifestyle Creep Problem', paragraphs: ['You got a 30% raise. Your rent went up 20%. Your car EMI increased. You eat out more. You upgraded your phone. Net savings increase? Zero.', 'This is lifestyle creep — the gradual increase in spending that absorbs every raise. The result: people earning ₹25 LPA often have less savings than those earning ₹10 LPA.', 'The fix is simple but requires discipline: automate savings BEFORE you can spend. When you get a raise, increase SIP on the same day, before the extra money hits your lifestyle.'],
        tip: 'The 50/30/20 rule: 50% needs, 30% wants, 20% savings. With every raise, shift the ratio: 45% needs, 25% wants, 30% savings.' },
      { heading: 'The ₹1 Crore Difference', paragraphs: ['Employee A: ₹20 LPA, saves 30% (₹6L/year), invests in SIP. After 15 years at 12%: ₹2.52 Crores.', 'Employee B: ₹30 LPA, saves 10% (₹3L/year), spends rest on lifestyle. After 15 years: ₹1.26 Crores.', 'Employee A earns LESS but is TWICE as wealthy. The secret? Controlling lifestyle creep and maintaining a high savings rate.'],
        table: { headers: ['Strategy', 'Monthly SIP', '15yr Corpus', 'Result'], rows: [['Save 10% of ₹30 LPA', '₹25,000', '₹1.26 Cr', '😐 Average'], ['Save 30% of ₹20 LPA', '₹50,000', '₹2.52 Cr', '🏆 Wealthy'], ['Save 50% of ₹20 LPA', '₹83,000', '₹4.20 Cr', '🔥 FIRE!']] } }
    ],
    quiz: { question: 'What percentage of every salary raise should you ideally save/invest?', options: ['10%', '25%', '50% or more', '0% - enjoy the raise'], correct: 2, explanation: 'Financial advisors recommend saving at least 50% of every raise. This way your lifestyle improves gradually while your wealth grows exponentially.' },
    actionItems: ['Calculate your current savings rate (savings ÷ income × 100)', 'Set up auto-SIP increase to match your next appraisal', 'Track expenses for 1 month using a free app', 'Commit to saving 50% of your next raise before spending any of it'],
    internalLinks: [{ label: 'SIP Calculator', to: '/calculators/sip-calculator' }, { label: 'Retirement Calculator', to: '/calculators/retirement-calculator' }, { label: 'Budget Planner', to: '/calculators/budget-planner' }],
    externalLinks: [{ label: 'Mr. Money Mustache — The Original FIRE Blog', url: 'https://www.mrmoneymustache.com/' }, { label: 'FIRE India Reddit', url: 'https://www.reddit.com/r/FIREIndia/' }]
  }
};
