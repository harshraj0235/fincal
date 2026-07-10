// Function to get all calculators in a flat array
export const getAllCalculators = (): Array<{ id: string; name: string; category: string; keywords: string[] }> => {
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

export interface CalculatorExample {
  scenario: string;
  inputs: { label: string; value: string }[];
  result: string;
  explanation: string;
}

export interface RelatedCalculator {
  name: string;
  url: string;
  description?: string;
}

export interface CalculatorInfo {
  title: string;
  description: string;
  benefits: string[];
  howToSteps: { step: string; details: string }[];
  examples: CalculatorExample[];
  tips: string[];
  mistakes: string[];
  faqs?: CalculatorFAQ[];
  relatedCalculators?: RelatedCalculator[];
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  category: string;
  info?: string[] | CalculatorInfo;
  faqs?: CalculatorFAQ[];
  relatedCalculators?: string[];
  isPopular?: boolean;
}

export interface CalculatorCategory {
  id: string;
  name: string;
  description: string;
  calculators: Calculator[];
}

export const calculatorCategories: CalculatorCategory[] = [
  // Loan Calculators
  {
    id: 'loan-calculators',
    name: 'Loan Calculators',
    description: 'Calculate EMIs, compare loans, and plan your borrowing with our comprehensive loan calculators',
    calculators: [
      { id: 'loan-calculator', name: 'Advanced Loan Calculator 2024', description: 'India\'s most intelligent loan Calculator with EMI calculation, prepayment planning, loan comparison & AI insights. Export to PDF/Excel', keywords: ['loan Calculator india', 'emi calculator', 'loan prepayment calculator', 'loan comparison tool', 'best loan Calculator 2024', 'loan emi Calculator with prepayment', 'amortization schedule', 'home loan calculator', 'personal loan calculator'], category: 'Loan Calculators', relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'personal-loan-calculator', 'loan-prepayment-calculator'] },
      {
        id: 'emi-calculator',
        name: 'EMI Calculator',
        description: 'Calculate your loan EMI, total interest, and payment schedule',
        keywords: ['emi calculator india', 'loan emi calculator', 'emi per lakh', 'amortization schedule', 'monthly installment', 'loan interest calculator', 'emi calculation formula'],
        category: 'Loan Calculators',
        relatedCalculators: ['loan-calculator', 'loan-comparison-calculator', 'home-loan-calculator', 'personal-loan-calculator'],
        faqs: [
          { question: 'What is the exact EMI calculation formula?', answer: 'EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]. Here, P is the principal loan amount, R is the monthly interest rate (annual rate/12/100), and N is the number of monthly installments.' },
          { question: 'What is the reducing balance method?', answer: 'In this method, interest is calculated on the remaining principal every month. As you pay EMIs, the principal decreases, and so does the interest component, making it cheaper than the flat-rate method.' },
          { question: 'How much interest can I save by prepaying my loan?', answer: 'Prepaying even 1 extra EMI per year can reduce a 20-year loan tenure by 3-4 years, saving lakhs in interest. The earlier you prepay, the higher the savings.' },
          { question: 'Is it better to reduce EMI or tenure after a part-payment?', answer: 'Reducing tenure is mathematically superior as it dramatically cuts the total interest payout. Reducing EMI only helps with monthly cash flow but saves less interest.' },
          { question: 'What is the FOIR and how does it affect my loan?', answer: 'Fixed Obligation to Income Ratio (FOIR) is used by banks to assess your repayment capacity. Typically, lenders prefer total EMIs to be below 40-50% of your net monthly income.' },
          { question: 'Does a higher credit score lower my EMI?', answer: 'A high credit score (750+) often qualifies you for lower interest rates. Even a 0.5% difference in rate can save you thousands in monthly EMIs for large loans.' },
          { question: 'Should I choose a longer tenure for lower EMI?', answer: 'A longer tenure makes EMI affordable but significantly increases total interest. Use a tenure that balances monthly affordability with lower total cost.' },
          { question: 'What are hidden charges in EMI loans?', answer: 'Processing fees (0.5-2%), documentation charges, insurance, and prepayment penalties are common. Always calculate the "Effective Interest Rate" including these.' },
          { question: 'Can I change my EMI amount during the loan?', answer: "Most banks don't allow changing the EMI amount unless you do a part-payment or a balance transfer. Some 'Step-up' loans have pre-defined EMI increases." },
          { question: 'What happens if I miss an EMI payment?', answer: "Missing an EMI leads to bounce charges (₹250-₹500), penal interest (18-24% per annum on the overdue amount), and a significant drop in your credit score." }
        ],
        info: [
          "The Indian lending landscape has shifted dramatically in 2025. With fluctuating repo rates, choosing the right EMI strategy is more critical than ever. Our EMI Calculator uses the Standard Amortization Formula, providing a month-by-month breakdown of your principal and interest components. This transparency is vital for anyone planning a Home Loan, Personal Loan, or Car Loan from top banks like SBI, HDFC, or ICICI.",
          "Understanding the 'Interest Component Trap': In the early years of a long-term loan (like a 20-year home loan), nearly 70-80% of your EMI goes toward interest, and very little toward principal. This is why prepaying early in the tenure is a 'Wealth Hack.' By making just one extra payment in the first five years, you effectively 'kill' dozens of future interest-heavy payments.",
          "Reducing vs. Flat Interest Rates: Beware of 'Flat Rate' offers which might seem low (e.g., 5% flat) but are actually equivalent to a much higher reducing rate (around 9%). Always use a Reducing Balance EMI Calculator to compare offers fairly. Flat rates are common in used car loans and some small business loans in India, but the reducing rate is the gold standard for retail borrowing.",
          "The 50/30/20 Rule in Debt: Financial experts suggest that your total debt obligations (EMIs) should never exceed 40% of your take-home pay. If your EMI is crossing 50%, you are in the 'Debt Danger Zone.' Use this tool to find a 'Sweet Spot' tenure where the EMI remains within 30-35% of your income, allowing for a 20% savings buffer.",
          "Impact of Processing Fees on Effective Cost: A 0.25% lower interest rate might seems better, but if the processing fee is 2% higher, the 'cheaper' loan might actually cost more. Always look at the 'XIRR' or the total cash outflow over the loan period. Our tool helps you visualize the total payable amount, which is the only number that truly matters in long-term debt.",
          "Navigating Rate Cycles: If you have a floating rate loan, your EMI or tenure will change when the RBI adjusts repo rates. Most Indian banks prefer increasing the tenure by default. However, this can lead to 'Negative Amortization' where your loan never ends. Use this calculator regularly to check if your current EMI covers the rising interest cost and make principal top-ups if needed.",
          "The Psychology of Prepayment: Many borrowers wait to accumulate a large sum (like ₹5 Lakhs) for part-payment. A better strategy is 'Small and Frequent.' Even ₹10,000 extra per month toward principal can shave years off your mortgage. This 'Micro-Prepayment' strategy is the most effective way to become debt-free in record time.",
          "Choosing the Right Lender: Public sector banks (PSBs) like SBI often have lower processing fees and no hidden 'reset' charges, but slower processing. Private banks like HDFC and ICICI offer convenience and speed but may have stricter penalties. Use our EMI insights to benchmark the ROI of each offer against your financial stability."
        ]
      },
      {
        id: 'home-loan-calculator',
        name: 'Home Loan Calculator',
        description: 'Free Home Loan EMI Calculator India 2025. Calculate monthly EMI for ₹10L to ₹2Cr. Principal, interest, total payable. Amortization schedule. HDFC, SBI, ICICI rates.',
        keywords: ['home loan emi calculator', 'home loan calculator india', 'housing loan calculator', 'home loan interest calculator', 'emi per lakh home loan', 'amortization schedule home loan', 'hdfc home loan calculator', 'sbi home loan calculator', 'icici home loan calculator', 'mortgage calculator india'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-affordability-calculator', 'loan-prepayment-calculator', 'stamp-duty-calculator', 'rent-vs-buy-calculator', 'income-tax-calculator'],
        faqs: [
          { question: 'How much home loan can I afford?', answer: 'Use EMI-to-income of 35–45% and include down payment, registration, and maintenance in your budget.' },
          { question: 'Fixed vs floating rate: which is better?', answer: 'Fixed gives stability early on, while floating can be cheaper long-term. Compare both for your expected tenure.' },
          { question: 'What is an amortization schedule?', answer: 'It is a month-by-month breakup of EMI into interest and principal, showing how your balance reduces over time.' },
          { question: 'Does part-payment help reduce interest?', answer: 'Yes. Prepaying early reduces outstanding principal, which cuts total interest significantly.' }
        ],
        info: [
          'A home loan is usually the largest financial commitment for Indian households. The calculator helps you see EMI, total interest, and the impact of tenure changes. Start with a realistic down payment and confirm affordability after adding stamp duty, registration, maintenance, and society charges.',
          'If you expect salary growth, model a higher EMI in later years using prepayments. Early prepayment saves the most interest because it reduces principal when interest portions are highest. Combine this tool with the prepayment calculator to decide between EMI reduction and tenure reduction.',
          'Use loan tenure as a lever. A longer tenure lowers EMI but raises total cost. For long tenures, even a small interest rate change can materially affect total interest paid. Run at least two rate scenarios to understand risk if rates increase.',
          'Link the tool to your tax planning. Home loan interest and principal can have tax benefits within limits, but only if you opt for the old tax regime. Compare net outflow after tax by pairing this calculator with the income tax calculator.'
        ]
      },
      {
        id: 'personal-loan-calculator',
        name: 'Personal Loan Calculator',
        description: 'Free Personal Loan EMI Calculator India 2025. Calculate EMI for ₹25K to ₹50L. HDFC, SBI, ICICI rates. Tenure 1-7 years. EMI per lakh, amortization. No signup.',
        keywords: ['personal loan emi calculator', 'personal loan calculator india', 'personal loan interest calculator', 'personal loan emi per lakh', 'instant personal loan calculator', 'hdfc personal loan calculator', 'sbi personal loan emi calculator', 'personal loan eligibility india', 'personal loan amortization schedule'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'loan-affordability-calculator', 'loan-comparison-calculator', 'loan-prepayment-calculator', 'home-loan-calculator', 'credit-card-emi-calculator', 'gold-loan-emi-calculator'],
        faqs: [
          { question: 'How is personal loan EMI calculated?', answer: 'It uses the standard EMI formula with your principal, monthly interest rate, and tenure in months.' },
          { question: 'What tenure is typical for personal loans?', answer: 'Most personal loans in India run from 12 to 60 months, though some lenders allow up to 84 months.' },
          { question: 'Does shorter tenure reduce total cost?', answer: 'Yes. Shorter tenure increases EMI but reduces total interest paid over the loan life.' },
          { question: 'Can I prepay a personal loan?', answer: 'Many lenders allow prepayment with a small fee. Use this calculator to estimate interest savings before prepaying.' }
        ],
        info: [
          'Personal loans are unsecured and therefore carry higher interest rates. Use this calculator to compare offers across banks and NBFCs by holding the tenure constant and varying the rate. EMI per lakh gives a fast benchmark for comparing offers.',
          'If you are considering a larger tenure to lower EMI, check the total interest paid before you decide. In higher-rate loans, the interest savings from shortening tenure can be significant. Run a 36-month vs 60-month comparison to see the difference clearly.',
          'Personal loans are often used for emergencies or short-term goals. Keep EMI below a comfortable threshold so it does not affect essential expenses or savings. If you expect early repayment, validate prepayment penalties and choose a lender with lower charges.',
          'For salaried borrowers, align EMI dates with salary credits. For self-employed borrowers, keep a higher liquidity buffer to avoid missed payments. Recalculate whenever you plan a top-up, balance transfer, or refinancing.'
        ]
      },
      { id: 'car-loan-calculator', name: 'Car Loan Calculator', description: 'Calculate EMI and total payments for auto loans', keywords: ['car loan', 'auto loan', 'vehicle financing'], category: 'Loan Calculators', relatedCalculators: ['emi-calculator', 'loan-comparison-calculator'] },
      { id: 'business-loan-calculator', name: 'Business Loan Calculator', description: 'Calculate EMI and total payments for business loans', keywords: ['business loan', 'commercial loan', 'enterprise financing'], category: 'Loan Calculators', relatedCalculators: ['emi-calculator', 'loan-comparison-calculator'] },
      { id: 'loan-comparison-calculator', name: 'Loan Comparison Calculator', description: 'Loan comparison calculator India to compare EMI, interest, processing fee, and total repayment cost across bank and NBFC offers before finalizing a loan.', keywords: ['loan comparison calculator india 2026', 'compare loan offers with processing fee', 'best home loan comparison calculator india', 'emi and total payment comparison tool', 'bank loan rate comparison calculator'], category: 'Loan Calculators', relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'personal-loan-calculator', 'loan-prepayment-calculator', 'interest-rate-converter'] },
      {
        id: 'prepayment-calculator',
        name: 'The Sovereign Wealth Optimizer (Loan Prepayment vs Investment)',
        description: 'Elite Debt vs. Equity Analysis tool for FY 2026-27. Compare loan prepayment interest savings against mutual fund SIP wealth generation. Make the smartest debt decision for 2026.',
        keywords: ['loan prepayment vs investment', 'pay off home loan or invest', 'debt vs equity optimizer', 'interest savings calculator india', 'prepayment ROI vs mutual funds', 'home loan strategy 2026'],
        category: 'Loan Calculators',
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'tax-strategy-wizard', 'sip-calculator'],
        faqs: [
          { question: 'Should I prepay my home loan or invest in SIP in 2026?', answer: 'If your investment return (minus tax) is higher than the loan interest rate, investing is mathematically superior. However, prepayment offers a guaranteed 100% ROI equal to the interest rate saved.' }
        ],
        info: [
          'The Sovereign Wealth Optimizer quantifies the "Wealth Delta"—the exact difference in your net worth depending on which path you choose.',
          'Optimized for the New Tax Act 2025: In the New Regime, home loan interest deductions are limited, making the "Effective Cost of Debt" higher, which often favors prepayment.'
        ]
      },
      { id: 'loan-refinance-calculator', name: 'Loan Refinance Calculator', description: 'Calculate savings from refinancing your loan', keywords: ['loan refinance', 'balance transfer', 'loan switch', 'refinancing'], category: 'Loan Calculators', relatedCalculators: ['emi-calculator', 'loan-comparison-calculator'] },
      { id: 'loan-affordability-calculator', name: 'Loan Affordability Calculator', description: 'Calculate how much loan you can afford based on your income', keywords: ['loan affordability', 'borrowing capacity', 'loan eligibility'], category: 'Loan Calculators', relatedCalculators: ['emi-calculator', 'home-loan-calculator'] },
      { id: 'loan-tenure-converter', name: 'Loan Tenure Converter', description: 'Advanced loan tenure converter India with years-months conversion, EMI-to-tenure solver, and prepayment impact analysis for smarter borrowing decisions.', keywords: ['loan tenure converter india 2026', 'convert loan tenure years to months', 'calculate loan tenure from emi', 'home loan tenure reduction calculator india', 'prepayment impact on loan tenure', 'best loan tenure calculator india', 'emi affordability and foir checker', 'loan duration planning tool india'], category: 'Loan Calculators', relatedCalculators: ['emi-calculator', 'loan-comparison-calculator', 'loan-prepayment-calculator', 'loan-affordability-calculator', 'interest-rate-converter'] },
      { id: 'credit-card-emi-calculator', name: 'Credit Card EMI Calculator', description: 'Free Credit Card EMI Calculator India. Calculate EMI for purchases ₹2,500–₹5L. HDFC, SBI, ICICI rates. Tenure 3–60 months. Processing fee, interest breakup.', keywords: ['credit card emi calculator', 'cc emi calculator india', 'credit card emi calculator hdfc', 'credit card interest calculator', 'credit card emi calculator sbi', 'credit card emi conversion', '0 percent emi calculator', 'credit card payment calculator'], category: 'Loan Calculators', relatedCalculators: ['emi-calculator', 'personal-loan-calculator', 'loan-comparison-calculator', 'budget-calculator'] },
      { id: 'gold-loan-emi-calculator', name: 'Gold Loan EMI Calculator', description: 'Calculate your gold loan EMI, interest, and repayment schedule. Tailored for India with gold value, purity, and local rates.', keywords: ['gold loan emi Calculator india', 'gold loan repayment calculator', 'gold loan interest calculator', 'gold loan india', 'gold loan emi'], category: 'Loan Calculators', relatedCalculators: ['home-loan-calculator', 'personal-loan-calculator', 'gold-investment-calculator'] },
      { id: 'bike-loan-calculator', name: 'Bike Loan Calculator', description: 'Calculate two-wheeler/bike loan EMI, total interest, and repayment schedule for motorcycles and scooters in India.', keywords: ['bike loan Calculator india', 'two wheeler loan calculator', 'motorcycle loan calculator', 'scooter loan calculator', 'bike emi calculator'], category: 'Loan Calculators', relatedCalculators: ['car-loan-calculator', 'emi-calculator', 'personal-loan-calculator'] }
    ]
  },
  // Investment Calculators
  {
    id: 'investment-calculators',
    name: 'Investment Calculators',
    description: 'Plan your investments and calculate returns with our comprehensive investment calculators',
    calculators: [
      {
        id: 'sip-calculator',
        name: 'SIP Calculator',
        description: 'Free SIP Calculator India – Systematic Investment Plan Calculator for mutual funds. Calculate SIP returns, maturity amount, and wealth creation with rupee cost averaging. Compare SIP vs lumpsum.',
        keywords: ['sip calculator', 'sip calculator india', 'systematic investment plan calculator', 'mutual fund sip calculator', 'sip return calculator', 'sip maturity calculator', 'sip investment calculator', 'rupee cost averaging', 'sip vs lumpsum'],
        category: 'Investment Calculators',
        relatedCalculators: ['step-up-sip-calculator', 'mutual-fund-returns-calculator', 'retirement-calculator', 'ppf-calculator'],
        faqs: [
          { question: 'What is a realistic SIP return to expect?', answer: 'For Indian equity mutual funds (Large Cap/Flexi Cap), a long-term CAGR of 10-12% is a reasonable benchmark. However, returns are market-linked and not guaranteed.' },
          { question: 'What is the "Cost of Delay" in SIP?', answer: 'Delaying a ₹5,000 SIP by just 5 years can reduce your maturity corpus by up to 50% due to the loss of power of compounding. Starting early is more important than starting big.' },
          { question: 'How does a Step-Up SIP significantly boost wealth?', answer: 'By increasing your SIP by just 10% annually (aligned with your salary hike), you can double your end corpus compared to a constant SIP. This is the "Magic of Incremental Savings."' },
          { question: 'Can I lose money in an SIP?', answer: 'In the short term (1-3 years), market volatility can lead to negative returns. However, over 7-10 years, the probability of negative returns in equity SIPs historically approaches zero.' },
          { question: 'Should I stop my SIP when the market crashes?', answer: 'No! Market crashes are "Discounts." SIP uses Rupee Cost Averaging to buy more units when prices are low, which is exactly how massive wealth is created over time.' },
          { question: 'Is it better to do SIP on a specific date?', answer: 'Statistically, there is no significant difference between the 1st, 5th, or 15th of the month. Choose a date near your salary credit to ensure consistency.' },
          { question: 'What is the tax on SIP returns?', answer: 'Equity SIP returns over 1 year (LTCG) are taxed at 12.5% (after ₹1.25L exemption). Returns under 1 year (STCG) are taxed at 20%.' },
          { question: 'SIP vs. RD: Which is better?', answer: 'RD offers guaranteed but lower returns (6-7%) and is taxed at slab rates. SIP (Mutual Funds) offers higher potential returns (12%) and better tax efficiency for long horizons.' },
          { question: 'When should I withdraw my SIP corpus?', answer: 'Exit gradually 2-3 years before your goal. Use a Systematic Withdrawal Plan (SWP) to shift funds from equity to debt to protect your profits from market swings.' },
          { question: 'How many SIPs should I have?', answer: 'Instead of many SIPs, focus on 3-4 well-performing funds across different categories (Large, Mid, Small Cap) to avoid portfolio clutter and overlap.' }
        ],
        info: [
          'A Systematic Investment Plan (SIP) is not just an investment tool; it is a financial discipline that leverages the twin engines of Compounding and Rupee Cost Averaging. Our SIP Calculator is designed to provide you with a detailed projection of your wealth creation journey, considering the unique dynamics of the Indian mutual fund market in 2025.',
          'The Rule of 72, 114, and 144: Use our calculator to see how fast your money doubles, triples, or quadruples. At a 12% return, your SIP corpus doubles approximately every 6 years. Understanding these thumb rules helps you stay patient during market volatility, knowing that the "End-Loaded" nature of compounding happens in the final years of your tenure.',
          'Rupee Cost Averaging Explained: Most investors fear market volatility. SIP investors should embrace it. When the Sensex or Nifty drops, your fixed SIP amount buys more mutual fund units. When markets rise, your existing units gain value. This "Automated Buy Low" mechanism is why SIPs consistently outperform lumpsum investments for retail investors over long periods.',
          'Wealth Creation vs. Inflation: A corpus of ₹1 Crore might seem huge today, but in 20 years at 6% inflation, its purchasing power will be equivalent to ~₹30 Lakhs today. Therefore, always plan your SIP based on "Real Returns" (Nominal Return minus Inflation). Our tool helps you visualize the future value so you can adjust your monthly contributions accordingly.',
          'The Power of the 10% Step-Up: Most people get annual salary hikes but keep their SIPs constant. A "Step-Up SIP" of just 10% can lead to a 130% larger corpus over 20 years compared to a plain SIP. Our calculator proves that small, incremental changes in savings have a disproportionately large impact on your ultimate financial freedom.',
          'Asset Allocation Mastery: Don’t put all your SIP eggs in one basket. A healthy portfolio often has a mix of Index Funds for stability, Mid-Cap funds for growth, and Small-Cap funds for aggressive wealth creation. Use our projections to see how different return assumptions (8% for debt, 15% for aggressive equity) change your goal achievement timeline.',
          'Exit Strategy (The SWP Hack): Making money is one thing; keeping it is another. As you approach your goal (e.g., retirement or child education), use our data to plan a shift to lower-risk assets. A common mistake is staying 100% in equity until the last day, only to see a market crash wipe out 20% of the goal corpus.',
          'Expert Verdict: Consistency beats intensity. An SIP of ₹1,000 started at age 25 is often worth more than an SIP of ₹10,000 started at age 45. Use this tool today to lock in your future wealth and let time do the heavy lifting for you.'
        ]
      },
      {
        id: 'step-down-sip-calculator',
        name: 'Step-Down SIP Calculator',
        description: 'Model SIP with annual decrease. Plan tapered contributions near goals or pre-retirement while keeping compounding discipline.',
        keywords: ['step down sip calculator india', 'decreasing sip calculator', 'sip taper planner', 'sip retirement taper', 'cashflow optimization sip'],
        category: 'Investment Calculators',
        relatedCalculators: ['sip-calculator', 'step-up-sip-calculator', 'inflation-adjusted-sip-calculator', 'mutual-fund-returns-calculator'],
        faqs: [
          { question: 'Why step-down SIP?', answer: 'To taper contributions near goals, manage cashflow, or rebalance risk while staying invested.' },
          { question: 'How to choose decrease %?', answer: 'Link decrease to life stage and goal proximity. Common ranges: 3–10% annually.' },
          { question: 'Does it reduce returns?', answer: 'Yes, total investment reduces, so expected maturity is lower than constant SIP. Use comparisons.' },
          { question: 'Is this advice?', answer: 'No. It is an educational planner. For personalized advice, consult a SEBI-registered advisor.' }
        ],
        info: [
          'Step-Down SIP reduces monthly investment each year to match changing priorities while preserving investing discipline.',
          'Use this when approaching a goal or during pre-retirement to smooth cashflow, rather than stopping SIP abruptly.',
          'Run multiple scenarios with conservative returns and modest decreases to protect plan integrity.',
          'Pair with inflation-adjusted planning and rebalancing to maintain purchasing power and manage risk.'
        ]
      },
      {
        id: 'mutual-fund-returns-calculator',
        name: 'Mutual Fund Returns Calculator',
        description: 'Mutual fund returns calculator for India to estimate SIP and lumpsum growth using CAGR and practical annual return assumptions.',
        keywords: ['mutual fund returns calculator india', 'sip and lumpsum return calculator', 'cagr calculator mutual fund', 'xirr style mutual fund planning', 'long term wealth projection calculator', 'mutual fund cagr calculator', 'mutual fund xirr calculator'],
        category: 'Investment Calculators',
        relatedCalculators: ['sip-calculator', 'xirr-tracker', 'mutual-fund-cost-calculator', 'future-value-calculator'],
        info: {
          title: "Mutual Fund Returns Calculator",
          description: "Estimate the growth of your SIP and lumpsum investments using CAGR and XIRR benchmarks. Plan your long-term wealth creation with precision by accounting for different return scenarios.",
          benefits: ["Dual SIP & Lumpsum Mode", "CAGR/XIRR Precision", "Wealth Projection", "Inflation Adjusted View"],
          howToSteps: [
            { step: "Investment Mode", details: "Choose between SIP (Monthly) or Lumpsum (One-time)." },
            { step: "Amount & Period", details: "Enter your contribution and duration in years." },
            { step: "Expected Return", details: "Input an annual return rate (e.g., 12% for Equity)." },
            { step: "Evaluate Growth", details: "The tool projects your estimated maturity value." }
          ],
          examples: [
            {
              scenario: "Long-term Equity SIP",
              inputs: [{ label: "SIP", value: "₹10,000" }, { label: "15 Years", value: "12% return" }],
              result: "₹50.4 Lakhs",
              explanation: "Regular investing harnesses compounding deeply over 15 years, turning ₹18L principal into ₹50L+."
            }
          ],
          tips: ["Equity funds are ideal for 7+ year horizons.", "Use conservative return rates (10-12%) for realistic planning."],
          mistakes: ["Expecting linear returns in the short term.", "Ignoring the impact of inflation on your goal target."],
          faqs: [
            { question: "What is the difference between CAGR and XIRR?", answer: "CAGR is for a single investment, while XIRR works for multiple cash flows like SIPs." },
            { question: "Are mutual fund returns guaranteed?", answer: "No, they are subject to market risks and depends on the performance of underlying assets." }
          ]
        }
      },
      { 
        id: 'mutual-fund-cost-calculator', 
        name: 'Mutual Fund Cost Calculator', 
        description: 'Check expense ratio impact and direct vs regular plan cost drag on long-term mutual fund returns.', 
        keywords: ['mutual fund expense ratio calculator india', 'direct vs regular mutual fund calculator', 'expense ratio impact on returns', 'mutual fund cost drag calculator', 'fund fee comparison calculator'], 
        category: 'Investment Calculators', 
        relatedCalculators: ['mutual-fund-returns-calculator', 'sip-calculator', 'compound-interest-calculator'],
        info: {
          title: "Mutual Fund Cost Calculator",
          description: "Every small percentage in expense ratio can cost you lakhs over 20 years. This calculator helps you see the impact of expense ratios, direct vs regular plans, and exit loads on your final wealth.",
          benefits: ["Quantify Expense Ratio Drag", "Direct vs Regular Comparison", "Total Fee Analysis", "Compounding Impact"],
          howToSteps: [
            { step: "Investment Amount", details: "Enter your monthly SIP or lumpsum amount." },
            { step: "Expense Ratio %", details: "Input the TER of the fund (e.g., 1.5% for Regular, 0.5% for Direct)." },
            { step: "Holding Period", details: "Specify the number of years you plan to stay invested." },
            { step: "Analyze Results", details: "The tool shows the total fees paid vs potential gain lost." }
          ],
          examples: [
            {
              scenario: "Direct vs Regular Plan",
              inputs: [{ label: "Lumpsum", value: "₹10L" }, { label: "Horizon", value: "20 yrs" }, { label: "1% TER Diff", value: "Yes" }],
              result: "₹18.4 Lakhs Saved",
              explanation: "By choosing a direct plan with a 1% lower expense ratio, you save ₹18.4 Lakhs in lost compounding over 20 years."
            }
          ],
          tips: ["Direct plans are usually 0.5% to 1.5% cheaper than regular plans.", "Index funds typically have the lowest expense ratios."],
          mistakes: ["Focusing only on the expense ratio and ignoring the tracking error.", "Switching funds too often and incurring exit loads."],
          faqs: [
            { question: "What is TER in mutual funds?", answer: "Total Expense Ratio is the annual fee charged by the AMC to manage the fund." },
            { question: "Is a 1% expense ratio high?", answer: "For index funds, yes. For actively managed small-cap funds, it is standard." }
          ]
        }
      },
      {
        id: 'nsc-calculator',
        name: 'NSC Calculator',
        description: 'Calculate maturity amount and total interest for National Savings Certificate (NSC) at the current 7.7% rate. See year-wise compounding schedule.',
        keywords: ['nsc calculator', 'national savings certificate calculator', 'nsc interest rate 2026', 'post office nsc calculator', 'nsc tax benefit 80c'],
        category: 'Investment Calculators',
        relatedCalculators: ['post-office-mis-calculator', 'scss-calculator', 'ppf-calculator', 'fd-calculator']
      },
      {
        id: 'scss-calculator',
        name: 'SCSS Calculator',
        description: 'Calculate quarterly interest payouts for the Senior Citizen Savings Scheme (SCSS) at 8.2%. Plan your retirement income accurately with our free calculator.',
        keywords: ['scss calculator', 'senior citizen savings scheme calculator', 'scss interest rate 2026', 'post office scss calculator', 'retirement income calculator'],
        category: 'Investment Calculators',
        relatedCalculators: ['post-office-mis-calculator', 'retirement-calculator', 'fd-calculator', 'nsc-calculator']
      },
      {
        id: 'post-office-mis-calculator',
        name: 'Post Office MIS Calculator',
        description: 'Calculate guaranteed monthly income from Post Office Monthly Income Scheme (POMIS) at 7.4%. Check payouts for Single (9L) and Joint (15L) accounts.',
        keywords: ['post office mis calculator', 'pomis calculator', 'post office monthly income scheme', 'pomis interest rate 2026', 'post office monthly income calculator'],
        category: 'Investment Calculators',
        relatedCalculators: ['scss-calculator', 'nsc-calculator', 'fd-calculator']
      },
      {
        id: 'apy-calculator',
        name: 'APY Calculator',
        description: 'Calculate your exact monthly premium for Atal Pension Yojana (APY). Enter your age to find the contribution needed for ₹5,000 guaranteed monthly pension.',
        keywords: ['apy calculator', 'atal pension yojana calculator', 'apy premium calculator', 'apy chart 2026', 'atal pension yojana premium chart', 'apy return calculator'],
        category: 'Investment Calculators',
        relatedCalculators: ['nps-calculator', 'retirement-calculator', 'epf-calculator', 'post-office-mis-calculator']
      },
      {
        id: 'ppf-calculator',
        name: 'PPF Calculator',
        description: 'Free PPF Calculator India 2025. Calculate PPF maturity, interest earned. ₹500-₹1.5L yearly. 15-50 years. 7.1% rate. EEE tax benefits. SBI, Post Office, banks.',
        keywords: ['ppf calculator', 'ppf calculator india', 'public provident fund calculator', 'ppf maturity calculator', 'ppf interest calculator 2025', 'ppf calculator online free', 'ppf calculator sbi', 'ppf 1.5 lakh return calculator', 'ppf tax benefit calculator', 'section 80c ppf calculator', 'ppf extension calculator', 'ppf withdrawal rules'],
        category: 'Investment Calculators',
        relatedCalculators: ['sukanya-samriddhi-calculator', 'nps-calculator', 'sip-calculator', 'fd-calculator', 'tax-saving-investment-calculator', 'compound-interest-calculator', 'income-tax-calculator'],
        faqs: [
          { question: 'What is the current PPF interest rate?', answer: 'PPF interest is set quarterly by the government. Use the latest notified rate for accurate projections.' },
          { question: 'What is the PPF lock-in period?', answer: 'PPF has a 15-year lock-in, extendable in 5-year blocks with or without contributions.' },
          { question: 'Is PPF tax-free?', answer: 'PPF qualifies for EEE status: contributions under 80C, interest, and maturity are tax-free under current rules.' },
          { question: 'When can I withdraw from PPF?', answer: 'Partial withdrawals are allowed from the 7th financial year, subject to limits.' }
        ],
        info: [
          'PPF is a long-term, government-backed savings option popular for tax savings and capital protection. This calculator estimates maturity based on annual contribution, interest rate, and tenure. It assumes regular yearly deposits and standard compounding.',
          'Use this tool to plan for 15 years and beyond. If you extend your PPF account, model the extension scenarios to see how corpus changes. Compare PPF with SIPs or NPS if you want higher return potential and can take market risk.',
          'PPF contributions are flexible within minimum and maximum yearly limits. If you cannot invest the maximum every year, model a lower contribution so your plan is realistic and consistent.',
          'Check withdrawal and loan rules before relying on PPF for short-term goals. It is best used for retirement or long-term education goals due to its long lock-in.'
        ]
      },
      { id: 'sukanya-samriddhi-calculator', name: 'Sukanya Samriddhi Calculator', description: 'Sukanya Samriddhi Yojana calculator to estimate maturity value, annual contribution impact, and long-term corpus for girl child goals.', keywords: ['sukanya samriddhi calculator india', 'ssy maturity calculator', 'girl child savings scheme calculator', 'sukanya yojana return calculator', 'ssy yearly contribution planner'], category: 'Investment Calculators', relatedCalculators: ['ppf-calculator', 'post-office-schemes-calculator', 'tax-saving-investment-calculator', 'future-value-calculator'] },
      { id: 'nps-calculator', name: 'NPS Calculator', description: 'NPS calculator for India to project retirement corpus, contribution split, and expected pension-oriented outcomes.', keywords: ['nps calculator india', 'national pension system corpus calculator', 'nps retirement planning calculator', 'nps contribution calculator', 'nps pension estimate tool'], category: 'Investment Calculators', relatedCalculators: ['nps-tier2-calculator', 'retirement-calculator', 'pension-calculator', 'epf-calculator'] },
      { id: 'nps-tier2-calculator', name: 'NPS Tier 2 Calculator', description: 'Estimate NPS Tier 2 returns with flexible contribution planning, allocation assumptions, and maturity projection.', keywords: ['nps tier 2 calculator india', 'tier 2 nps return calculator', 'nps tier 2 withdrawal planning', 'nps tier 2 corpus projection', 'nps tier 2 vs mutual fund'], category: 'Investment Calculators', relatedCalculators: ['nps-calculator', 'mutual-fund-returns-calculator', 'sip-calculator'] },
      { id: 'post-office-schemes-calculator', name: 'Post Office Schemes Calculator', description: 'Post office schemes calculator to compare KVP, MIS, SCSS, RD, and TD returns for safe savings planning.', keywords: ['post office scheme calculator india', 'kvp mis scss calculator', 'post office return calculator', 'safe savings scheme comparison india', 'post office investment planner'], category: 'Investment Calculators', relatedCalculators: ['ppf-calculator', 'sukanya-samriddhi-calculator', 'rd-calculator'] },
      { id: 'gold-investment-calculator', name: 'Gold Investment Calculator', description: 'Compare returns across physical gold, digital gold, sovereign gold bonds, and gold ETFs with projected growth.', keywords: ['gold investment calculator india', 'sgb vs gold etf calculator', 'digital gold return calculator', 'physical gold calculator', 'gold portfolio planning tool'], category: 'Investment Calculators', relatedCalculators: ['gold-etf-vs-physical-calculator', 'sip-calculator', 'future-value-calculator'] },
      { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', description: 'Compound interest calculator for investment growth projections with monthly, quarterly, and annual compounding options.', keywords: ['compound interest calculator india', 'investment growth calculator', 'compounding calculator online', 'future corpus with compounding', 'compound return planner'], category: 'Investment Calculators', relatedCalculators: ['simple-interest-calculator', 'sip-calculator', 'future-value-calculator'] },
      { id: 'simple-interest-calculator', name: 'Simple Interest Calculator', description: 'Simple interest calculator using principal, rate, and tenure to estimate interest amount and total payable or receivable.', keywords: ['simple interest calculator india', 'flat interest calculator', 'si formula calculator', 'loan interest simple method', 'principal rate time calculator'], category: 'Investment Calculators', relatedCalculators: ['compound-interest-calculator', 'fd-calculator', 'interest-rate-converter'] },
      {
        id: 'fd-calculator',
        name: 'FD Calculator',
        description: 'Free Fixed Deposit (FD) Calculator India. Calculate FD maturity, interest earned, and effective annual rate with monthly, quarterly, or annual compounding. Compare SBI, HDFC, ICICI rates.',
        keywords: ['fd calculator india', 'fixed deposit calculator', 'fd maturity calculator', 'fd interest calculator', 'bank fd calculator', 'sbi fd calculator', 'hdfc fd calculator', 'icici fd calculator', 'post office fd calculator'],
        category: 'Investment Calculators',
        relatedCalculators: ['rd-calculator', 'ppf-calculator', 'compound-interest-calculator', 'tax-saving-investment-calculator']
      },
      {
        id: 'sbi-fd-calculator',
        name: 'SBI FD Calculator',
        description: 'SBI Fixed Deposit calculator with quick presets and current India FD rates for 1–5 years. Compute maturity, interest earned, and effective rate.',
        keywords: ['sbi fd calculator', 'state bank of india fd calculator', 'sbi fd interest calculator', 'sbi fd maturity calculator', 'sbi fixed deposit rates'],
        category: 'Investment Calculators',
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'ppf-calculator']
      },
      {
        id: 'hdfc-fd-calculator',
        name: 'HDFC FD Calculator',
        description: 'HDFC Bank FD calculator with preset rates for popular tenures. Calculate maturity amount, total interest, and effective annual rate.',
        keywords: ['hdfc fd calculator', 'hdfc bank fd calculator', 'hdfc fd interest calculator', 'hdfc fd maturity calculator', 'hdfc fixed deposit rates'],
        category: 'Investment Calculators',
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'ppf-calculator']
      },
      {
        id: 'icici-fd-calculator',
        name: 'ICICI FD Calculator',
        description: 'ICICI Bank FD calculator with quick presets for common tenures. Compute maturity, interest, and effective annual rate with quarterly compounding.',
        keywords: ['icici fd calculator', 'icici bank fd calculator', 'icici fd interest calculator', 'icici fd maturity calculator', 'icici fixed deposit rates'],
        category: 'Investment Calculators',
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'ppf-calculator']
      },
      {
        id: 'axis-fd-calculator',
        name: 'Axis Bank FD Calculator',
        description: 'Axis Bank FD calculator with presets for 1–5 year tenures. Calculate maturity, interest, and effective annual rate.',
        keywords: ['axis fd calculator', 'axis bank fd calculator', 'axis fd interest calculator', 'axis fd maturity calculator', 'axis fixed deposit rates'],
        category: 'Investment Calculators',
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'ppf-calculator']
      },
      {
        id: 'post-office-fd-calculator',
        name: 'Post Office FD Calculator',
        description: 'Post Office Time Deposit (TD) calculator for 1–5 year tenures. Calculate maturity, interest, and effective annual rate.',
        keywords: ['post office fd calculator', 'post office time deposit calculator', 'post office td interest calculator', 'post office 5 year td rate'],
        category: 'Investment Calculators',
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'post-office-schemes-calculator', 'ppf-calculator']
      },
      {
        id: 'yes-bank-fd-calculator',
        name: 'YES Bank FD Calculator',
        description: 'YES Bank Fixed Deposit calculator for 1–5 year tenures. Calculate maturity, interest earned, and effective annual rate.',
        keywords: ['yes bank fd calculator', 'yes bank fd interest calculator', 'yes bank fd maturity calculator', 'yes bank fixed deposit rates'],
        category: 'Investment Calculators',
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'ppf-calculator']
      },
      {
        id: 'kotak-fd-calculator',
        name: 'Kotak FD Calculator',
        description: 'Kotak Mahindra Bank FD calculator with presets for common tenures. Calculate maturity, interest, and effective annual rate.',
        keywords: ['kotak fd calculator', 'kotak bank fd calculator', 'kotak fd interest calculator', 'kotak fd maturity calculator', 'kotak fixed deposit rates'],
        category: 'Investment Calculators',
        relatedCalculators: ['fd-calculator', 'rd-calculator', 'ppf-calculator']
      },
      { id: 'future-value-calculator', name: 'Future Value Calculator', description: 'Future value calculator to estimate how a current investment can grow over time with assumed annual returns.', keywords: ['future value calculator india', 'investment future value calculator', 'goal corpus projection calculator', 'time value of money calculator', 'lumpsum growth calculator'], category: 'Investment Calculators', relatedCalculators: ['compound-interest-calculator', 'sip-calculator', 'financial-goal-calculator'] },
      { id: 'rd-calculator', name: 'RD Calculator', description: 'RD calculator India to estimate recurring deposit maturity amount, contribution split, and post-tax planning readiness for monthly savings goals.', keywords: ['rd calculator india 2026', 'recurring deposit maturity calculator india', 'monthly rd interest calculator', 'post office rd calculator 5 year', 'bank recurring deposit return calculator'], category: 'Investment Calculators', relatedCalculators: ['fd-calculator', 'ppf-calculator', 'sip-calculator', 'post-office-calculator', 'financial-goal-calculator'] },
      { id: 'liquid-fund-calculator', name: 'Liquid Fund Calculator', description: 'Compare Liquid Mutual Fund returns against a standard savings account. See how much extra wealth you can build with idle cash.', keywords: ['liquid fund vs savings account calculator', 'best liquid fund return calculator 2026', 'liquid fund post tax return calculator india', 'liquid fund calculator online', 'emergency fund calculator'], category: 'Investment Calculators', relatedCalculators: ['sip-calculator', 'fd-calculator', 'mutual-fund-returns-calculator'] }
    ]
  },
  // Tax Calculators
  {
    id: 'tax-calculators',
    name: 'Tax Calculators',
    description: 'Calculate your tax liability and plan your taxes with our comprehensive tax calculators',
    calculators: [
      {
        id: 'income-tax-calculator',
        name: 'Income Tax Calculator',
        description: 'Free Income Tax Calculator India – Calculate tax for FY 2025-26, FY 2026-27. Compare Old vs New Tax Regime, 80C, 80D, HRA, surcharge, rebate 87A. Income Tax Act 1961 compliant.',
        keywords: ['income tax calculator', 'income tax calculator india', 'old vs new tax regime calculator', 'income tax fy 2025-26', 'tax liability calculator', 'section 80c 80d calculator', 'income tax rebate 87a', 'tax calculator india free', 'income tax calculator 2026-27', 'salary income tax calculator'],
        category: 'Tax Calculators',
        relatedCalculators: ['hra-calculator', 'advance-tax-calculator', 'capital-gains-tax-calculator', 'tds-calculator', 'tax-saving-investment-calculator', 'nps-calculator', 'ppf-calculator'],
        faqs: [
          { question: 'Which is better for me: Old or New Tax Regime?', answer: 'The New Regime is better for most people without large investments (LIC, PPF) or Home Loans, as it offers lower slabs. The Old Regime is better if your total deductions (80C, HRA, 80D) exceed ₹3.75 - ₹4.25 Lakhs.' },
          { question: 'What are the New Income Tax Slabs for FY 2025-26?', answer: '₹0-4L: NIL, ₹4-8L: 5%, ₹8-12L: 10%, ₹12-16L: 15%, ₹16-20L: 20%, ₹20-24L: 25%, Above ₹24L: 30%. Surcharge applies above ₹50L.' },
          { question: 'How much is the Standard Deduction in 2025?', answer: 'The Standard Deduction for salaried individuals and pensioners has been increased to ₹75,000 in the New Regime, providing a direct tax saving.' },
          { question: 'Is income up to ₹12 Lakhs tax-free under the New Regime?', answer: 'Yes, due to the Section 87A rebate, if your total taxable income is up to ₹12,00,000 in the New Regime, your net tax liability becomes NIL.' },
          { question: 'Can I switch between Old and New regimes every year?', answer: 'Salaried individuals can switch every year at the time of filing ITR. However, for those with Business/Professional income, the switch is allowed only once in a lifetime.' },
          { question: 'What comes under Section 80C deductions?', answer: 'EPF, PPF, ELSS, LIC premium, NSC, SSY, and Home Loan Principal repayment qualify for a combined deduction of up to ₹1.5 Lakhs (Old Regime only).' },
          { question: 'How much tax can I save with Health Insurance (80D)?', answer: 'You can claim up to ₹25,000 for self/family and an additional ₹25,000-₹50,000 for parents, depending on their age. This is over and above 80C.' },
          { question: 'Is HRA taxable if I live with parents?', answer: 'You can claim HRA by paying rent to parents (if they own the house) and keeping valid rent receipts and bank transfer records. Parents must report this as rental income.' },
          { question: 'What is the tax on Long Term Capital Gains (LTCG) in 2025?', answer: 'LTCG on equity/mutual funds is now taxed at 12.5% for gains exceeding ₹1.25 Lakhs in a financial year.' },
          { question: 'Can I deduct Home Loan Interest under the New Regime?', answer: 'No. Deductions for home loan interest (Section 24b) and principal (80C) are NOT available in the New Regime. They are only for the Old Regime.' }
        ],
        info: [
          'Navigating the Union Budget 2025 changes requires a precise tool that compares both the Old and New Tax Regimes side-by-side. Our Income Tax Calculator is updated with the latest ₹75,000 standard deduction and the revised ₹12 Lakh NIL-tax limit for the new regime, ensuring you don\'t pay a single rupee more than necessary.',
          'The "Tipping Point" Analysis: For most taxpayers, the decision to stick with the Old Regime depends on "Total Deductions." If your deductions (80C + 80D + HRA + Interest) are less than ₹3.75 Lakhs, the New Regime is almost always more beneficial. Use our comparison engine to find your specific tipping point.',
          'The Power of Section 87A Rebate: Under the New Regime, the 87A rebate is a massive benefit for the middle class. By effectively making income up to ₹12 Lakhs tax-free, it has simplified tax filing for millions. However, if your income is even ₹1 over ₹12 Lakhs, the rebate disappears, and you pay tax on the full amount. Our tool helps you stay within these surgical limits.',
          'Maximizing Section 80C and 80D: In the Old Regime, you can reduce taxable income by ₹1.5L (80C) and up to ₹75k-1L (80D). Adding NPS (80CCD) gives an extra ₹50k benefit. This "Full Stack" deduction strategy can bring a ₹15L income down to a much lower tax bracket. Use the calculator to see the ROI of these investments after tax savings.',
          'HRA Exemption Math: HRA is calculated as the minimum of three values: Actual HRA received, Rent paid minus 10% of salary, or 40/50% of salary. Our calculator automates this complex logic, ensuring you claim the maximum possible exemption without manual errors.',
          'Beyond Salary: Income from Other Sources: Don\'t forget to include interest from Savings Accounts, FDs, and Dividends. While ₹10,000 in savings interest is exempt under 80TTA (Old Regime), FD interest is fully taxable. The New Regime does not offer 80TTA benefits. Our tool consolidates all income heads for a holistic tax view.',
          'Surcharge and Marginal Relief: For high-net-worth individuals (HNIs) earning over ₹50L, ₹1Cr, or ₹2Cr, surcharges can significantly increase the effective tax rate. We compute marginal relief automatically, preventing "tax spikes" where a small income increase leads to a disproportionately large tax bill.',
          'Final Checklist for ITR 2025: Before you file, use our data to verify your Form 26AS, AIS, and TIS statements. Match your salary components (Special Allowance, LTA, Perquisites) with the calculator inputs to ensure your TDS matches your final liability.'
        ]
      },
      { id: 'income-tax-regime-comparison-calculator', name: 'Income Tax Regime Comparison Calculator', description: 'Compare old vs new tax regime in India with deductions, slab impact, surcharge, cess, and final tax outgo.', keywords: ['old vs new tax regime calculator india', 'income tax regime comparison fy 2026-27', 'which tax regime is better calculator', 'new regime vs old regime with deductions', 'tax liability comparison india'], category: 'Tax Calculators', relatedCalculators: ['income-tax-calculator', 'tax-saving-investment-calculator', 'section-80c-calculator', 'hra-exemption-calculator', 'section-80d-calculator'] },
      { 
        id: 'advance-tax-calculator', 
        name: 'Advance Tax Calculator', 
        description: 'Advance tax calculator for India with quarterly installment schedule for June, September, December, and March due dates.', 
        keywords: ['advance tax calculator india', 'advance tax installment calculator', 'quarterly advance tax due dates calculator', 'section 234b 234c interest calculator', 'advance tax payment planning'], 
        category: 'Tax Calculators', 
        relatedCalculators: ['income-tax-calculator', 'tds-calculator', 'income-tax-regime-comparison-calculator'],
        info: {
          title: "Advance Tax Calculator",
          description: "Plan your quarterly tax installments for FY 2024-25 and FY 2025-26. Avoid 1% monthly interest under Section 234B/C by tracking your June, Sep, Dec, and March deadlines.",
          benefits: ["Instalment Split Analysis", "Penalty Prevention", "FY 2026-27 Compliant", "TDS/TCS Integration"],
          howToSteps: [
            { step: "Estimate Income", details: "Input your salary, business profits, and capital gains." },
            { step: "Add Deductions", details: "Include 80C, 80D, or Standard Deduction for a net estimate." },
            { step: "TDS/TCS Credits", details: "Subtract the tax already paid via salary or bank TDS." },
            { step: "View Breakup", details: "See the exact amounts due by the 15th of each quarter." }
          ],
          examples: [
            {
              scenario: "Freelance Income",
              inputs: [{ label: "Est. Income", value: "₹8L" }, { label: "TDS", value: "₹20k" }],
              result: "₹45,000 Advance Tax",
              explanation: "Since the net tax liability exceeds ₹10,000, advance tax installments are mandatory."
            }
          ],
          tips: ["Seniors without business income are exempt from advance tax.", "March 15th is the final deadline to avoid heavy penalties."],
          mistakes: ["Underestimating annual capital gains.", "Forgetting interest income from savings accounts."],
          faqs: [
            { question: "What counts as Advance Tax?", answer: "Any tax paid before the end of the financial year (March 31st) in prescribed installments." },
            { question: "Who must pay Advance Tax?", answer: "Anyone whose estimated tax liability after TDS exceeds ₹10,000 in a year." }
          ]
        }
      },
      {
        id: 'gst-calculator',
        name: 'GST Calculator',
        description: 'GST calculator India to add or remove GST instantly with CGST, SGST, and IGST split for all major tax slabs.',
        keywords: ['gst calculator india', 'gst inclusive exclusive calculator', 'cgst sgst igst calculator', 'gst rate 5 12 18 28 calculator', 'online gst breakup calculator', 'gst amount calculator', 'reverse gst calculator'],
        category: 'Tax Calculators',
        relatedCalculators: ['gst-seller-calculator', 'income-tax-calculator', 'profit-margin-calculator'],
        faqs: [
          { question: 'How do I calculate GST inclusive vs exclusive?', answer: 'Select whether you want to add GST to a base price or remove GST from an inclusive price.' },
          { question: 'What is the difference between CGST, SGST, and IGST?', answer: 'CGST and SGST apply to intra-state sales; IGST applies to inter-state sales.' },
          { question: 'Which GST rate should I use?', answer: 'Common slabs are 5%, 12%, 18%, and 28%. Use the rate applicable to your goods or services.' },
          { question: 'Can I calculate GST for invoices quickly?', answer: 'Yes, the calculator provides an instant breakup you can use for invoice planning.' }
        ],
        info: [
          'GST calculation is simple once you know whether the price is inclusive or exclusive of tax. This calculator helps you convert between the two and shows the CGST/SGST or IGST split for quick invoice planning.',
          'Use the correct GST rate for your category of goods or services. If you are unsure, verify from the official GST portal or your tax consultant. A small rate mismatch can lead to incorrect invoice totals.',
          'For businesses, it is useful to test multiple prices to see how GST affects final customer price or margin. Combine this with the profit margin calculator to set the right base price.',
          'If you issue invoices across states, use IGST rates and verify place of supply rules. The calculator helps estimate values, but compliance needs official verification.'
        ]
      },
      { id: 'gst-seller-calculator', name: 'GST Calculator for Sellers', description: 'Business GST calculator with invoice-ready output for B2B and B2C transactions including state-wise tax split.', keywords: ['gst calculator for sellers india', 'gst invoice calculator b2b b2c', 'seller gst calculation tool', 'gst invoice breakup cgst sgst igst', 'business gst compliance calculator'], category: 'Tax Calculators', relatedCalculators: ['gst-calculator', 'profit-margin-calculator', 'break-even-calculator'] },
      { id: 'tds-calculator', name: 'TDS Calculator', description: 'TDS calculator India for salary, professional fees, rent, interest, commission, and other payment categories.', keywords: ['tds calculator india', 'tax deducted at source calculator', 'section 192 194a 194j tds calculator', 'salary rent interest tds calculator', 'withholding tax calculator india'], category: 'Tax Calculators', relatedCalculators: ['income-tax-calculator', 'advance-tax-calculator', 'income-tax-regime-comparison-calculator'] },
      { id: 'capital-gains-tax-calculator', name: 'Capital Gains Tax Calculator', description: 'Calculate capital gains tax for equity, mutual funds, property, and other assets with LTCG and STCG rules.', keywords: ['capital gains tax calculator india', 'ltcg stcg calculator india', 'equity mutual fund capital gains tax', 'property capital gain tax calculator', 'investment gains tax calculator'], category: 'Tax Calculators', relatedCalculators: ['capital-gains-tax-advanced-calculator', 'income-tax-calculator', 'tds-calculator'] },
      { id: 'capital-gains-tax-advanced-calculator', name: 'Capital Gains Tax Advanced Calculator', description: 'Advanced capital gains calculator with holding period checks, indexation scenarios, and asset-specific tax treatment.', keywords: ['advanced capital gains tax calculator india', 'indexation capital gains calculator', 'asset wise ltcg stcg calculator', 'property gold debt equity gains tax calculator', 'capital gains with indexation calculator india'], category: 'Tax Calculators', relatedCalculators: ['capital-gains-tax-calculator', 'income-tax-calculator', 'gold-etf-vs-physical-calculator'] },
      { id: 'tax-saving-investment-calculator', name: 'Tax Saving Investment Calculator', description: 'Plan combined tax savings across Section 80C, 80D, 80G, and NPS deductions with bracket-wise impact.', keywords: ['tax saving investment calculator india', '80c 80d 80g tax deduction calculator', 'nps additional deduction calculator', 'old regime tax saving planner', 'income tax deduction planning calculator'], category: 'Tax Calculators', relatedCalculators: ['section-80c-calculator', 'section-80d-calculator', 'income-tax-calculator', 'income-tax-regime-comparison-calculator'] },
      { id: 'section-80c-calculator', name: 'Section 80C Calculator', description: 'Section 80C calculator to estimate eligible deduction from PPF, ELSS, EPF, life insurance, and home loan principal.', keywords: ['section 80c calculator india', '80c deduction calculator ppf elss epf', 'tax saving under 80c calculator', '80c limit 1.5 lakh calculator', 'income tax 80c planning tool'], category: 'Tax Calculators', relatedCalculators: ['tax-saving-investment-calculator', 'income-tax-calculator', 'section-80d-calculator'] },
      { id: 'section-80d-calculator', name: 'Section 80D Calculator', description: 'Section 80D deduction calculator for health insurance premiums of self, family, and parents including senior citizen limits.', keywords: ['section 80d calculator india', 'health insurance tax deduction calculator', '80d parent senior citizen deduction calculator', 'medical insurance tax benefit calculator', 'preventive checkup deduction calculator'], category: 'Tax Calculators', relatedCalculators: ['tax-saving-investment-calculator', 'income-tax-calculator', 'section-80c-calculator'] },
      { id: 'hra-exemption-calculator', name: 'HRA Exemption Calculator', description: 'Calculate HRA exemption under Section 10(13A) using basic salary, rent paid, metro/non-metro rules, and taxable HRA output.', keywords: ['hra exemption calculator india', 'house rent allowance tax calculator', 'section 10 13a calculator', 'metro non metro hra calculator', 'salary hra taxable exempt calculator'], category: 'Tax Calculators', relatedCalculators: ['income-tax-calculator', 'tax-saving-investment-calculator', 'income-tax-regime-comparison-calculator'] },
      {
        id: 'tax-strategy-wizard',
        name: 'The Sovereign Shield: Tax Strategy Wizard',
        description: 'Professional Tax Audit & Optimization tool for FY 2026-27 (AY 2027-28). Comparative analysis of New vs. Old Regime with 80C/80D/80CCD allocation intelligence.',
        keywords: ['tax strategy wizard', 'new tax regime vs old regime 2026', 'tax saver wizard india', 'section 80c 80d optimizer', 'fy 2026-27 tax planning', 'best tax calculator india'],
        category: 'Tax Calculators',
        relatedCalculators: ['income-tax-calculator', 'tax-saving-investment-calculator', 'retirement-calculator', 'prepayment-calculator'],
        faqs: [
          { question: 'Does the Sovereign Shield support FY 2026-27 rules?', answer: 'Yes, it is fully updated for the New Income Tax Act 2025, including the ₹75,000 standard deduction and the revised tax slabs.' }
        ],
        info: [
          'The Sovereign Shield provides a "Visual Audit" of your tax liability, illustrating exactly where your money goes and how to legally minimize the outgo.',
          'Elite Indigo Aesthetic: Designed for clarity and high-stakes financial decision-making.'
        ]
      }
    ]
  },
  // Salary & Government Calculators
  {
    id: 'salary-government-calculators',
    name: 'Salary & Government Calculators',
    description: 'Calculate salary, allowances, and government employee benefits.',
    calculators: [
      {
        id: 'ctc-calculator',
        name: 'CTC to In-Hand Salary Calculator',
        description: 'Convert your CTC (Cost to Company) offer into exact monthly in-hand take-home salary. Deduct PF, PT, Gratuity, and TDS accurately for Indian employees.',
        keywords: ['ctc to in hand salary calculator', 'ctc calculator india', 'take home salary calculator from ctc', 'salary breakup calculator', 'in hand salary calculator 2026'],
        category: 'Salary & Government Calculators',
        relatedCalculators: ['8th-pay-commission-calculator', 'income-tax-calculator', 'salary-calculator']
      },
      {
        id: 'salary-slip-generator',
        name: 'Salary Slip Generator (PDF)',
        description: 'Generate professional salary slips and payslips online for free. Print or save as PDF instantly. Includes standard Indian salary components like Basic, HRA, PF, PT, and TDS.',
        keywords: ['salary slip generator', 'payslip maker india', 'free salary slip format', 'generate payslip pdf', 'online salary slip creator'],
        category: 'Salary & Government Calculators',
        relatedCalculators: ['ctc-calculator', 'salary-calculator', 'income-tax-calculator']
      },
      {
        id: 'da-arrears-calculator',
        name: 'DA Arrears Calculator',
        description: 'Calculate your Dearness Allowance (DA) arrears instantly. Enter your basic pay, old DA, and new DA percentage to find your total arrear amount.',
        keywords: ['da arrears calculator', 'dearness allowance arrear calculator', 'central government da arrear 2026', 'da hike calculation', '7th cpc da arrear calculator'],
        category: 'Salary & Government Calculators',
        relatedCalculators: ['8th-pay-commission-calculator', 'salary-slip-generator', 'pension-calculator']
      },
      {
        id: 'gratuity-calculator',
        name: 'Gratuity Calculator (New Labour Code 2025)',
        description: 'Calculate gratuity amount based on salary and service period under the New Labour Code 2025 rules. Find your eligibility and tax exemptions.',
        keywords: ['gratuity calculator india', 'new labour code 2025 gratuity', 'gratuity eligibility calculator', 'tax free gratuity limit', 'how to calculate gratuity'],
        category: 'Salary & Government Calculators',
        relatedCalculators: ['retirement-calculator', 'pension-calculator', 'salary-calculator']
      },
      {
        id: '8th-pay-commission-calculator',
        name: '8th Pay Commission Salary Calculator',
        description: 'Calculate your expected salary under the 8th Central Pay Commission (CPC). Find out your revised basic pay based on expected fitment factors.',
        keywords: ['8th pay commission calculator', '8th cpc salary calculator', 'expected fitment factor 8th cpc', 'central government salary calculator 2026', 'da merge salary calculation'],
        category: 'Salary & Government Calculators',
        relatedCalculators: ['epf-calculator', 'pension-calculator', 'income-tax-calculator']
      }
    ]
  },
  // Real Estate & Tax Calculators
  {
    id: 'real-estate-tax-calculators',
    name: 'Real Estate & Tax Calculators',
    description: 'Calculate stamp duty, registration charges, capital gains tax, and property-related costs.',
    calculators: [
      {
        id: 'stamp-duty-calculator',
        name: 'Stamp Duty Calculator All States',
        description: 'Calculate exact stamp duty and registration charges for property purchase in all Indian states. Compare rates for men, women, and joint registration.',
        keywords: ['stamp duty calculator', 'registration charges calculator', 'stamp duty india 2026', 'property registration cost', 'stamp duty for women'],
        category: 'Real Estate & Tax Calculators',
        relatedCalculators: ['property-calculator', 'capital-gains-tax-calculator', 'home-loan-calculator']
      },
      {
        id: 'capital-gains-tax-calculator',
        name: 'Capital Gains Tax Calculator 2026',
        description: 'Calculate Long Term and Short Term Capital Gains Tax on property, equity, gold, and mutual funds. Updated with Budget 2024-25 new rules.',
        keywords: ['capital gains tax calculator india', 'ltcg calculator property', 'stcg calculator equity', 'property capital gains tax 2026', 'indexation benefit calculator'],
        category: 'Real Estate & Tax Calculators',
        relatedCalculators: ['stamp-duty-calculator', 'property-calculator', 'income-tax-calculator']
      }
    ]
  },
  // Retirement Calculators
  {
    id: 'retirement-calculators',
    name: 'Retirement Calculators',
    description: 'Plan your retirement with our comprehensive retirement calculators',
    calculators: [
      {
        id: 'retirement-calculator',
        name: 'The Golden Horizon: Professional Retirement & FIRE Planner',
        description: 'Elite Retirement Calculator India 2026. Calculate your FIRE (Financial Independence, Retire Early) corpus with inflation-adjusted precision. Plan for FY 2026-27 with Obscura Gold aesthetics.',
        keywords: ['retirement calculator india', 'fire planner india', 'retirement corpus calculator', 'inflation adjusted retirement planning', 'early retirement calculator', 'golden horizon planner', 'best retirement calculator 2026'],
        category: 'Retirement Calculators',
        relatedCalculators: ['pension-calculator', 'nps-calculator', 'inflation-adjusted-sip-calculator', 'sip-calculator', 'tax-strategy-wizard'],
        faqs: [
          { question: 'What is the Golden Horizon strategy?', answer: 'The Golden Horizon strategy focuses on building an inflation-adjusted corpus that can sustain your desired lifestyle for 30+ years post-retirement, factoring in the unique economic conditions of India in 2026.' },
          { question: 'How much do I need to retire in India in 2026?', answer: 'For a comfortable middle-class lifestyle, most planners suggest a corpus of 30x-40x your annual expenses. For example, if you spend ₹1 Lakh/month today, you might need ₹5-7 Crores by retirement assuming 6% inflation.' }
        ],
        info: [
          'The Golden Horizon is a premium retirement simulation engine. It doesn\'t just calculate a number; it paths your journey to financial sovereignty.',
          'Factoring in "Real" returns: In 2026, with inflation hovering around 5-6%, a 10% market return effectively gives you only 4-5% wealth growth. This tool forces you to think in terms of purchasing power, not just nominal figures.'
        ]
      },
      { id: 'pension-calculator', name: 'Pension Calculator', description: 'Free Pension Calculator India 2026. Estimate retirement corpus, monthly pension from annuity, and inflation-adjusted income requirements.', keywords: ['pension calculator india', 'monthly pension calculator', 'retirement pension corpus calculator', 'annuity pension calculator india', 'how much pension will i get after retirement', 'retirement income calculator india 2026'], category: 'Retirement Calculators', relatedCalculators: ['retirement-calculator', 'nps-calculator', 'epf-calculator'] },
      { id: 'inflation-adjusted-sip-calculator', name: 'Inflation-Adjusted SIP & Retirement Planner', description: 'Inflation-adjusted SIP calculator for retirement planning in India. Estimate real returns, required corpus, and monthly SIP for long-term goals.', keywords: ['inflation adjusted sip calculator india', 'retirement sip planner with inflation', 'real return sip calculator', 'monthly sip required for retirement corpus', 'sip calculator with inflation and step up'], category: 'Retirement Calculators', relatedCalculators: ['retirement-calculator', 'step-up-sip-calculator', 'sip-calculator', 'inflation-calculator'] },
      { id: 'human-life-value-calculator', name: 'Human Life Value Calculator', description: 'Human Life Value (HLV) calculator India. Estimate ideal life insurance cover based on income, liabilities, goals, and inflation assumptions.', keywords: ['human life value calculator india', 'hlv calculator for term insurance', 'how much life insurance cover do i need', 'income replacement calculator india', 'term insurance sum assured calculator'], category: 'Retirement Calculators', relatedCalculators: ['term-insurance-calculator', 'retirement-calculator', 'pension-calculator'] },
      { id: 'nps-return-calculator', name: 'NPS Return Calculator', description: 'NPS Return Calculator India for Tier I and Tier II. Estimate maturity amount, total investment, annuity corpus, and expected monthly pension.', keywords: ['nps return calculator india', 'nps tier 1 tier 2 calculator', 'nps maturity calculator with annuity', 'national pension system return calculator', 'nps pension calculator india 2026'], category: 'Retirement Calculators', relatedCalculators: ['retirement-calculator', 'pension-calculator', 'ppf-calculator', 'epf-calculator'] },
      { id: 'epf-calculator', name: 'EPF Calculator', description: 'EPF Calculator India 2026. Calculate PF maturity, employer-employee contribution split, interest earnings, and withdrawal projections.', keywords: ['epf calculator india', 'pf calculator with employer contribution', 'employee provident fund maturity calculator', 'epf interest calculator 2026', 'pf withdrawal benefit calculator india'], category: 'Retirement Calculators', relatedCalculators: ['retirement-calculator', 'pension-calculator', 'nps-calculator', 'ppf-calculator'] }
    ]
  },
  // Business Calculators
  {
    id: 'business-calculators',
    name: 'Business Calculators',
    description: 'Calculate business metrics and financial ratios with our comprehensive business calculators',
    calculators: [
      { id: 'break-even-calculator', name: 'Break-Even Calculator', description: 'Calculate your business break-even point', keywords: ['break-even', 'business', 'profit', 'loss', 'fixed costs', 'variable costs'], category: 'Business Calculators', relatedCalculators: ['profit-margin-calculator', 'inventory-turnover-calculator'] },
      {
        id: 'profit-margin-calculator',
        name: 'Profit Margin Calculator',
        description: 'Profit margin calculator India to estimate gross margin, operating margin, net profit margin, and markup for any business, product, or service. Compare pricing, costs, and profitability instantly.',
        keywords: [
          'profit margin calculator',
          'profit margin calculator india',
          'gross profit margin calculator',
          'operating margin calculator',
          'net profit margin calculator',
          'margin calculator for business',
          'profit margin formula',
          'markup vs margin calculator',
          'profitability calculator',
          'profit margin calculator for retail shop',
          'profit margin calculator for ecommerce',
          'profit margin calculator for restaurant',
          'profit margin calculator for services',
          'cost price selling price margin'
        ],
        category: 'Business Calculators',
        relatedCalculators: ['break-even-calculator', 'inventory-turnover-calculator'],
        faqs: [
          { question: 'How do I calculate profit margin?', answer: 'Profit margin = Profit ÷ Revenue × 100. Use gross profit for gross margin, operating profit for operating margin, and net profit for net margin.' },
          { question: 'What is the difference between markup and margin?', answer: 'Markup divides profit by cost, while margin divides profit by revenue. A 33.3% margin equals a 50% markup.' },
          { question: 'Which costs should be in COGS?', answer: 'Include direct costs such as materials, direct labor, packaging, and other expenses tied to production or service delivery.' },
          { question: 'Is profit margin the same as profit percentage?', answer: 'Profit percentage usually refers to margin, but some people mean markup. This calculator reports margins to match financial statements.' },
          { question: 'What is a good profit margin in India?', answer: 'It varies by industry. Retail often ranges 3-8%, restaurants 8-15%, manufacturing 10-20%, and services can exceed 20%.' },
          { question: 'Can I use this calculator for GST-inclusive pricing?', answer: 'Yes. Use consistent numbers—either GST-inclusive for both revenue and costs or GST-exclusive for both.' }
        ],
        info: [
          'Profit margin measures how much money remains after covering costs. Use gross margin to evaluate product economics, operating margin to judge efficiency, and net margin to see true profitability.',
          'Even a small change in price, supplier cost, or overhead can move net margin significantly. Use the calculator to test scenarios before changing pricing or promotions.',
          'Combine this tool with break-even and inventory turnover calculators to understand both profitability and cash flow impact.'
        ]
      },
      { id: 'inventory-turnover-calculator', name: 'Inventory Turnover Calculator', description: 'Calculate inventory turnover ratio and days inventory outstanding', keywords: ['inventory turnover', 'stock turnover', 'inventory management', 'days inventory outstanding'], category: 'Business Calculators', relatedCalculators: ['break-even-calculator', 'profit-margin-calculator'] },
      { id: 'debt-equity-calculator', name: 'Debt-Equity Calculator', description: 'Calculate debt-equity ratio and financial leverage', keywords: ['debt-equity', 'financial leverage', 'capital structure', 'financial ratio'], category: 'Business Calculators', relatedCalculators: ['break-even-calculator', 'profit-margin-calculator'] }
    ]
  },
  // Property Calculators
  {
    id: 'property-calculators',
    name: 'Property Calculators',
    description: 'Calculate property-related costs and returns with our comprehensive property calculators',
    calculators: [
      { id: 'rent-vs-buy-calculator', name: 'Rent vs Buy Calculator', description: 'Compare the costs of renting versus buying a property', keywords: ['rent vs buy', 'property', 'real estate', 'housing', 'home ownership'], category: 'Property Calculators', relatedCalculators: ['rent-vs-buy-advanced-calculator', 'home-loan-calculator', 'property-investment-calculator'] },
      { id: 'rent-vs-buy-advanced-calculator', name: 'Rent vs Buy Advanced Calculator', description: 'Comprehensive analysis of renting versus buying property with HRA benefits', keywords: ['rent vs buy', 'hra', 'property', 'real estate', 'tax benefits'], category: 'Property Calculators', relatedCalculators: ['rent-vs-buy-calculator', 'hra-exemption-calculator', 'home-loan-calculator'] },
      { id: 'property-investment-calculator', name: 'Property Investment Calculator', description: 'Calculate returns on property investments', keywords: ['property investment', 'real estate investment', 'rental yield', 'property returns'], category: 'Property Calculators', relatedCalculators: ['rent-vs-buy-calculator', 'home-loan-calculator'] },
      { id: 'stamp-duty-calculator', name: 'Stamp Duty Calculator', description: 'NSDL/CDSL securities stamp duty and property registration stamp duty calculator India with state-wise rates, concessions, and PDF reports.', keywords: ['nsdl stamp duty calculator', 'cdsl stamp duty calculator', 'securities stamp duty calculator', 'property stamp duty calculator', 'state wise stamp duty india', 'women concession stamp duty', 'registration charges calculator', 'sale deed stamp duty'], category: 'Property Calculators', relatedCalculators: ['property-registration-calculator', 'home-loan-calculator'] },
      { id: 'property-registration-calculator', name: 'Property Registration Calculator', description: 'Calculate all costs involved in property registration', keywords: ['property registration', 'registration charges', 'legal fees', 'property transfer'], category: 'Property Calculators', relatedCalculators: ['stamp-duty-calculator', 'home-loan-calculator'] },
      { id: 'property-registration-charges-calculator', name: 'Property Registration Charges Calculator', description: 'Property registration charges calculator India to estimate stamp duty, registration fee, legal cost estimate, and total acquisition outflow before buying.', keywords: ['property registration charges calculator india', 'stamp duty registration fee calculator', 'state wise property registration charges india', 'property transfer charges calculator', 'home purchase registration cost india'], category: 'Property Calculators', relatedCalculators: ['stamp-duty-calculator', 'property-registration-calculator', 'home-loan-calculator', 'emi-calculator'] }
    ]
  },
  // Insurance Calculators
  {
    id: 'insurance-calculators',
    name: 'Insurance Calculators',
    description: 'Calculate insurance premiums and coverage with our comprehensive insurance calculators',
    calculators: [
      { id: 'term-insurance-calculator', name: 'Term Insurance Calculator', description: 'Term insurance calculator India to estimate premium, ideal sum assured, and long-term protection affordability for family financial security.', keywords: ['term insurance calculator india', 'term insurance premium calculator india 2026', 'how much term insurance cover do i need', '1 crore term insurance premium calculator', 'family protection insurance calculator india'], category: 'Insurance Calculators', relatedCalculators: ['human-life-value-calculator', 'health-insurance-calculator', 'life-insurance-calculator'] },
      { id: 'health-insurance-calculator', name: 'Health Insurance Calculator', description: 'Calculate health insurance premium and coverage', keywords: ['health insurance', 'medical insurance', 'premium', 'coverage', 'sum insured'], category: 'Insurance Calculators', relatedCalculators: ['term-insurance-calculator', 'section-80d-calculator'] },
      { id: 'life-insurance-calculator', name: 'Life Insurance Calculator', description: 'Life insurance calculator India to estimate premium, compare policy types, assess ideal cover amount, and evaluate long-term affordability for family protection.', keywords: ['life insurance calculator india 2026', 'how much life insurance cover do i need india', 'life insurance premium calculator india', 'endowment vs term insurance calculator', 'ulip life insurance calculator india'], category: 'Insurance Calculators', relatedCalculators: ['term-insurance-calculator', 'human-life-value-calculator', 'health-insurance-calculator', 'financial-goal-calculator'] }
    ]
  },
  // Banking & Finance Tools
  {
    id: 'banking-calculators',
    name: 'Banking & Finance Tools',
    description: 'Essential banking tools and calculators for everyday financial needs',
    calculators: [
      { id: 'bank-charges-analyzer', name: 'Bank Charges & Penalty Analyzer', description: 'Compare hidden charges, penalties, and fees across all major Indian banks. Get personalized analysis to avoid unnecessary banking costs.', keywords: ['bank charges comparison india', 'minimum balance penalty calculator', 'ATM withdrawal fees', 'hidden bank charges', 'bank locker charges', 'cheque bounce penalty', 'SMS charges', 'digital banking fees', 'bank charges analyzer', 'banking cost comparison', 'avoid bank penalties', 'bank fee Calculator india'], category: 'Banking & Finance Tools', relatedCalculators: ['bank-ifsc-finder', 'atm-locator', 'interest-rates-comparison'] },
      { id: 'bank-ifsc-finder', name: 'Bank IFSC/MICR Finder', description: 'Find IFSC and MICR codes for any bank branch in India', keywords: ['ifsc', 'micr', 'bank code', 'branch code', 'bank transfer'], category: 'Banking & Finance Tools', relatedCalculators: ['atm-locator', 'bank-holiday-calendar'] },
      { id: 'atm-locator', name: 'ATM Locator', description: 'Find ATMs near you with real-time information on cash availability', keywords: ['atm', 'cash withdrawal', 'bank', 'cash availability', 'atm finder'], category: 'Banking & Finance Tools', relatedCalculators: ['bank-ifsc-finder', 'bank-holiday-calendar'] },
      { id: 'bank-holiday-calendar', name: 'Bank Holiday Calendar', description: 'Check bank holidays across all states in India', keywords: ['bank holiday', 'bank closed', 'holiday calendar', 'banking hours'], category: 'Banking & Finance Tools', relatedCalculators: ['bank-ifsc-finder', 'atm-locator'] },
      { id: 'interest-rates-comparison', name: 'Interest Rates Comparison', description: 'Compare interest rates across banks for various financial products', keywords: ['interest rates', 'bank rates', 'fd rates', 'loan rates', 'savings rates'], category: 'Banking & Finance Tools', relatedCalculators: ['fd-calculator', 'savings-account-calculator'] },
      { id: 'savings-account-calculator', name: 'Savings Account Calculator', description: 'Calculate interest earned on your savings account', keywords: ['savings account', 'interest calculation', 'bank interest', 'savings interest'], category: 'Banking & Finance Tools', relatedCalculators: ['fd-calculator', 'interest-rates-comparison'] },
      { id: 'currency-converter', name: 'Currency Converter', description: 'Advanced currency converter India with benchmark FX rate, provider markup impact, fee-adjusted final amount, and INR-first travel/remittance planning.', keywords: ['currency converter india 2026', 'inr to usd converter india', 'forex markup calculator india', 'exchange rate calculator inr aed eur', 'remittance conversion calculator india', 'travel currency converter india', 'fx spread and fee calculator'], category: 'Banking & Finance Tools', relatedCalculators: ['interest-rates-comparison', 'forex-margin-calculator', 'forex-pip-calculator'] },
      { id: 'upi-failure-troubleshooter', name: 'UPI Failure Troubleshooter', description: 'Diagnose and fix UPI transaction failures', keywords: ['upi', 'upi failure', 'payment failure', 'transaction failure', 'troubleshoot'], category: 'Banking & Finance Tools', relatedCalculators: ['bank-ifsc-finder', 'atm-locator'] },

      { id: 'credit-card-finder', name: 'Credit Card Finder & Score Estimator', description: 'Find the best credit card based on your spending patterns and estimate your credit score', keywords: ['credit card', 'credit score', 'rewards', 'cashback', 'eligibility', 'cibil score', 'credit rating'], category: 'Banking & Finance Tools', relatedCalculators: ['credit-card-emi-calculator', 'loan-affordability-calculator', 'emi-calculator'] },
      { id: 'take-home-salary-calculator', name: 'Take Home Salary Calculator', description: 'Calculate your net take-home salary after deductions including income tax, PF, professional tax, and other statutory deductions in India.', keywords: ['take home salary Calculator india', 'salary Calculator after tax', 'net salary calculator', 'salary after deductions calculator', 'income tax salary calculator'], category: 'Banking & Finance Tools', relatedCalculators: ['income-tax-calculator', 'hra-exemption-calculator', 'section-80c-calculator'] }
    ]
  },
  // FinTech & Payments
  {
    id: 'fintech-payments',
    name: 'FinTech & Payments',
    description: 'Modern financial technology tools for digital payments, virtual cards, and innovative lending solutions',
    calculators: [
      {
        id: 'step-up-sip-calculator',
        name: 'The Step-up Wealth Multiplier',
        description: 'Advanced Step-up SIP Calculator India 2026. Maximize your mutual fund corpus with geometric compounding increments. Professional wealth projection for FY 2026-27.',
        keywords: ['step up sip calculator', 'top up sip calculator india', 'geometric compounding sip', 'wealth multiplier calculator', 'sip with annual increment', 'best mutual fund planner 2026'],
        category: 'FinTech & Payments',
        relatedCalculators: ['sip-calculator', 'mutual-fund-returns-calculator', 'retirement-calculator', 'tax-strategy-wizard'],
        faqs: [
          { question: 'Why is Step-up SIP better than a regular SIP?', answer: 'A regular SIP remains constant, while a Step-up SIP grows with your income. Increasing your SIP by just 10% annually can result in a 130% larger corpus over 20 years compared to a flat SIP.' }
        ],
        info: [
          'The Wealth Multiplier utilizes the power of "Incremental Savings". By aligning your investment growth with your career progression, you reach your financial milestones years earlier.',
          'Emerald Prosperity Aesthetic: This tool is optimized for visual clarity, showing the momentum of your wealth as it hits the exponential curve.'
        ]
      },
      { id: 'inflation-adjusted-sip-calculator', name: 'Inflation-Adjusted SIP & Retirement Planner', description: 'Plan your retirement with inflation-adjusted SIP investments', keywords: ['inflation', 'retirement', 'corpus', 'sip', 'real returns'], category: 'FinTech & Payments', relatedCalculators: ['retirement-calculator', 'step-up-sip-calculator', 'sip-calculator'] },
      { id: 'rent-vs-buy-advanced-calculator', name: 'Rent vs Buy Advanced Calculator', description: 'Comprehensive analysis of renting versus buying property with HRA benefits', keywords: ['rent vs buy', 'hra', 'property', 'real estate', 'tax benefits'], category: 'FinTech & Payments', relatedCalculators: ['rent-vs-buy-calculator', 'hra-exemption-calculator', 'home-loan-calculator'] },
      { id: 'gold-etf-vs-physical-calculator', name: 'Gold ETF vs Physical Gold ROI Calculator', description: 'Compare returns on investment between Gold ETF and physical gold', keywords: ['gold etf', 'physical gold', 'gold investment', 'roi', 'tax implications'], category: 'FinTech & Payments', relatedCalculators: ['gold-investment-calculator', 'capital-gains-tax-advanced-calculator', 'mutual-fund-returns-calculator'] },
      { id: 'income-tax-regime-comparison-calculator', name: 'Income Tax Regime Comparison Calculator', description: 'Compare old vs new tax regime in India with deductions, slab impact, surcharge, cess, and final tax outgo.', keywords: ['old vs new tax regime calculator india', 'income tax regime comparison fy 2026-27', 'which tax regime is better calculator', 'new regime vs old regime with deductions', 'tax liability comparison india'], category: 'FinTech & Payments', relatedCalculators: ['income-tax-calculator', 'tax-saving-investment-calculator', 'section-80c-calculator', 'hra-exemption-calculator', 'section-80d-calculator'] },
      { id: 'capital-gains-tax-advanced-calculator', name: 'Capital Gains Tax Advanced Calculator', description: 'Advanced capital gains calculator with holding period checks, indexation scenarios, and asset-specific tax treatment.', keywords: ['advanced capital gains tax calculator india', 'indexation capital gains calculator', 'asset wise ltcg stcg calculator', 'property gold debt equity gains tax calculator', 'capital gains with indexation calculator india'], category: 'FinTech & Payments', relatedCalculators: ['capital-gains-tax-calculator', 'income-tax-calculator', 'gold-etf-vs-physical-calculator'] },
      { id: 'gst-seller-calculator', name: 'GST Calculator for Sellers', description: 'Business GST calculator with invoice-ready output for B2B and B2C transactions including state-wise tax split.', keywords: ['gst calculator for sellers india', 'gst invoice calculator b2b b2c', 'seller gst calculation tool', 'gst invoice breakup cgst sgst igst', 'business gst compliance calculator'], category: 'FinTech & Payments', relatedCalculators: ['gst-calculator', 'profit-margin-calculator', 'break-even-calculator'] },
      { id: 'virtual-card-issuer', name: 'Virtual Card Issuer', description: 'Generate virtual cards for secure online transactions', keywords: ['virtual card', 'online payment', 'secure transaction', 'digital card', 'e-commerce'], category: 'FinTech & Payments', relatedCalculators: ['credit-card-emi-calculator', 'bnpl-calculator'] },
      { id: 'bnpl-calculator', name: 'Buy Now Pay Later (BNPL) Calculator', description: 'Calculate installments and costs for Buy Now Pay Later services', keywords: ['bnpl', 'buy now pay later', 'emi', 'installment', 'no cost emi'], category: 'FinTech & Payments', relatedCalculators: ['credit-card-emi-calculator', 'personal-loan-calculator', 'virtual-card-issuer'] },
      { id: 'p2p-lending-calculator', name: 'Peer-to-Peer Lending Calculator', description: 'Calculate returns and risks for P2P lending investments', keywords: ['p2p lending', 'peer to peer', 'alternative investment', 'lending', 'borrowing'], category: 'FinTech & Payments', relatedCalculators: ['personal-loan-calculator', 'loan-affordability-calculator', 'bnpl-calculator'] }
    ]
  },
  // Investments & Wealth Management
  {
    id: 'investments-wealth-management',
    name: 'Investments & Wealth Management',
    description: 'Advanced tools for portfolio optimization, investment tracking, and wealth management',
    calculators: [
      { id: 'mutual-fund-overlap-checker', name: 'Mutual Fund Overlap Checker', description: 'Mutual fund overlap checker India to compare common holdings, overlap percentage, and diversification quality across equity portfolios.', keywords: ['mutual fund overlap checker india', 'fund overlap calculator', 'portfolio overlap between mutual funds', 'mutual fund diversification tool', 'common stocks in mutual funds'], category: 'Investments & Wealth Management', relatedCalculators: ['mutual-fund-returns-calculator', 'asset-allocation-planner', 'sip-calculator'] },
      { 
        id: 'xirr-tracker', 
        name: 'XIRR Tracker for Irregular Investments', 
        description: 'Calculate XIRR for irregular investments, SIPs, redemptions, and portfolio cash flows with annualized return tracking.', 
        keywords: ['xirr calculator india', 'xirr for irregular cash flows', 'mutual fund xirr tracker', 'sip xirr calculator', 'annualized return with multiple transactions'], 
        category: 'Investments & Wealth Management', 
        relatedCalculators: ['mutual-fund-returns-calculator', 'sip-calculator', 'lumpsum-calculator'],
        info: {
          title: "XIRR Tracker",
          description: "Internal Rate of Return (XIRR) is the definitive way to track portfolio performance with non-periodic cash flows. This tracker uses Newton's method for precise annualized yield reporting.",
          benefits: ["Precision Timing", "Multiple SIP/Lumpsum Entries", "Redemption Impact Tracking", "Portfolio Performance Audit"],
          howToSteps: [
            { step: "Input Dates", details: "List the exact date of every buy and sell operation." },
            { step: "Assign Amounts", details: "Provide the investment (outflow) or withdrawal (inflow) amount." },
            { step: "Add Current Value", details: "Enter today's portfolio value as the final transaction line." },
            { step: "Audit XIRR", details: "The annualized percentage return will be generated instantly." }
          ],
          examples: [
            {
              scenario: "3-Year Irregular SIP",
              inputs: [{ label: "Invested", value: "₹5L over 3 yrs" }, { label: "Curr Value", value: "₹7.2L" }],
              result: "18.3% XIRR",
              explanation: "XIRR calculates the exact rate at which your invested capital grew, regardless of the messy timing."
            }
          ],
          tips: ["Higher XIRR than Nifty 50 over 5 years indicates alpha generation.", "Always use the 'Final Market Value' as the closing flow."],
          mistakes: ["Entering the total invested amount as a single line for SIPs (breaks timing precision).", "Miscalculating the terminal value date."],
          faqs: [
            { question: "What is a good XIRR?", answer: "For long-term equity in India, 12-15% is healthy. Anything above 18% is exceptional." },
            { question: "Why is XIRR zero?", answer: "This usually happens if the current value or initial date is missing." }
          ]
        }
      },
      { id: 'dividend-yield-calculator', name: 'Dividend Yield & Reinvestment Calculator', description: 'Estimate dividend yield, after-tax dividend income, and long-term corpus impact using reinvestment (DRIP) scenarios.', keywords: ['dividend yield calculator india', 'dividend reinvestment calculator', 'drip calculator', 'after tax dividend return', 'dividend stock income calculator'], category: 'Investments & Wealth Management', relatedCalculators: ['mutual-fund-returns-calculator', 'lumpsum-calculator', 'compound-interest-calculator'] },
      { id: 'asset-allocation-planner', name: 'Asset Allocation Planner', description: 'Build a goal-based asset allocation plan using age, risk profile, horizon, and expected return assumptions.', keywords: ['asset allocation planner india', 'portfolio allocation calculator', 'equity debt gold allocation', 'risk based asset allocation', 'goal based portfolio planning'], category: 'Investments & Wealth Management', relatedCalculators: ['risk-appetite-assessment', 'mutual-fund-overlap-checker', 'retirement-calculator'] },
      { id: 'risk-appetite-assessment', name: 'Risk Appetite Assessment Tool', description: 'Assess investment risk tolerance through a structured questionnaire and map to suitable portfolio allocation bands.', keywords: ['risk appetite assessment india', 'investment risk profile tool', 'risk tolerance questionnaire', 'aggressive moderate conservative investor test', 'portfolio risk suitability'], category: 'Investments & Wealth Management', relatedCalculators: ['asset-allocation-planner', 'mutual-fund-overlap-checker', 'retirement-calculator'] },
      { id: 'crowdfunding-investment-portal', name: 'Crowdfunding Startup Investment Portal', description: 'Evaluate startup crowdfunding opportunities with risk filters, ticket-size planning, and portfolio suitability checks.', keywords: ['equity crowdfunding india', 'startup investment portal', 'crowdfunding investment analysis', 'startup risk assessment tool', 'early stage investment platform'], category: 'Investments & Wealth Management', relatedCalculators: ['p2p-lending-calculator', 'risk-appetite-assessment', 'asset-allocation-planner'] },
      { id: 'digital-wealth-robo-advisor', name: 'Digital Wealth Robo-Advisor', description: 'Get automated portfolio recommendations based on income, goals, risk tolerance, and investment horizon.', keywords: ['robo advisor india', 'automated investment planner', 'digital wealth management tool', 'personalized portfolio recommendation', 'goal based robo advisory'], category: 'Investments & Wealth Management', relatedCalculators: ['asset-allocation-planner', 'risk-appetite-assessment', 'sip-calculator'] },
      { id: 'stable-return-fixed-income-aggregator', name: 'Stable-Return Fixed-Income Aggregator', description: 'Compare fixed income products by rate, risk, tenure, taxability, and liquidity to choose stable return options.', keywords: ['fixed income comparison india', 'best fixed income options', 'fd bond debt returns comparison', 'stable return investment finder', 'low risk income products india'], category: 'Investments & Wealth Management', relatedCalculators: ['fd-calculator', 'post-office-schemes-calculator', 'ppf-calculator'] },
      { id: 'crypto-tax-estimator', name: 'Crypto Tax Estimator', description: 'Estimate crypto tax under Indian VDA rules with 30% tax treatment, transaction-based gains, and compliance-ready summaries.', keywords: ['crypto tax calculator india', 'vda tax estimator', 'bitcoin tax india 30 percent', 'crypto 1 percent tds calculator', 'cryptocurrency tax filing india'], category: 'Investments & Wealth Management', relatedCalculators: ['capital-gains-tax-advanced-calculator', 'income-tax-calculator', 'tds-calculator'] },
      { id: 'nri-stock-investment-dashboard', name: 'US/NRI Stock Investment Dashboard', description: 'Track US and Indian stock portfolios for NRIs with exchange-rate impact and cross-border tax planning context.', keywords: ['nri stock portfolio tracker', 'us stock investment for nri india', 'nri tax on us stocks india', 'cross border portfolio dashboard', 'nri equity investment tool'], category: 'Investments & Wealth Management', relatedCalculators: ['capital-gains-tax-advanced-calculator', 'currency-converter', 'asset-allocation-planner'] },
      { id: 'brokerage-calculator', name: 'Brokerage Calculator', description: 'Calculate brokerage, STT, GST, exchange charges, stamp duty, and net P&L for equity, futures, and options trades.', keywords: ['brokerage calculator india', 'intraday brokerage charges calculator', 'fno brokerage and taxes calculator', 'stt gst stamp duty calculator', 'net profit after trading charges'], category: 'Investments & Wealth Management', relatedCalculators: ['capital-gains-tax-calculator', 'margin-trading-calculator'] },
      { id: 'margin-trading-calculator', name: 'Margin Trading Calculator', description: 'Compute margin required, leverage exposure, target return, and stop-loss risk for margin trading positions.', keywords: ['margin trading calculator india', 'leverage trading risk calculator', 'margin requirement calculator', 'position sizing with leverage', 'stop loss impact on margin trade'], category: 'Investments & Wealth Management', relatedCalculators: ['brokerage-calculator', 'forex-margin-calculator'] },
      { id: 'commodity-margin-calculator', name: 'Commodity Margin Calculator', description: 'Estimate commodity futures margin, exposure value, and leverage for major contracts such as gold, silver, and crude.', keywords: ['commodity margin calculator india', 'mcx margin calculator', 'gold futures margin requirement', 'commodity leverage calculator', 'futures contract exposure calculator'], category: 'Investments & Wealth Management', relatedCalculators: ['margin-trading-calculator', 'brokerage-calculator'] },
      { id: 'forex-margin-calculator', name: 'Forex Margin Calculator', description: 'Calculate required margin, leverage ratio, and potential stop-loss impact for forex positions.', keywords: ['forex margin calculator india', 'currency trading margin requirement', 'forex leverage calculator', 'forex risk and margin tool', 'stop loss forex loss calculator'], category: 'Investments & Wealth Management', relatedCalculators: ['margin-trading-calculator', 'forex-pip-calculator'] },
      { id: 'forex-pip-calculator', name: 'Forex Pip Calculator', description: 'Calculate pip value by lot size, currency pair, and account currency for precise forex risk management.', keywords: ['forex pip calculator', 'pip value calculator inr', 'lot size pip value tool', 'currency pair pip calculation', 'forex position risk calculator'], category: 'Investments & Wealth Management', relatedCalculators: ['forex-margin-calculator', 'currency-converter'] }
    ]
  },
  // Personal Finance
  {
    id: 'personal-finance',
    name: 'Personal Finance',
    description: 'Manage your personal finances with our comprehensive calculators',
    calculators: [
      { id: 'budget-calculator', name: 'Budget Calculator', description: 'Personal budget calculator India to track monthly income, category-wise expenses, and savings surplus for smarter money management.', keywords: ['budget calculator india', 'monthly expense tracker india', 'personal budget planner online', 'income expense calculator india', 'household budget calculator'], category: 'Personal Finance', relatedCalculators: ['emergency-fund-calculator', 'financial-goal-calculator', 'net-worth-calculator'] },
      { id: 'emergency-fund-calculator', name: 'Emergency Fund Calculator', description: 'Emergency fund calculator India to estimate 3 to 12 months safety corpus based on essential expenses and income risk profile.', keywords: ['emergency fund calculator india', 'how much emergency fund do i need', '6 month expense calculator', 'financial safety net calculator', 'emergency corpus planning india'], category: 'Personal Finance', relatedCalculators: ['budget-calculator', 'financial-goal-calculator', 'net-worth-calculator'] },
      { id: 'financial-goal-calculator', name: 'Financial Goal Calculator', description: 'Financial goal calculator to estimate monthly SIP needed for life goals using timeline, expected return, existing corpus, and annual step-up.', keywords: ['financial goal calculator india', 'monthly savings required calculator', 'goal planning calculator with sip', 'step up sip goal calculator', 'future goal planning tool india'], category: 'Personal Finance', relatedCalculators: ['budget-calculator', 'sip-calculator', 'inflation-calculator'] },
      { id: 'net-worth-calculator', name: 'Net Worth Calculator', description: 'Calculate personal net worth by listing assets and liabilities to monitor wealth growth, debt pressure, and financial health.', keywords: ['net worth calculator india', 'assets liabilities calculator', 'personal balance sheet calculator', 'wealth tracking tool india', 'financial health calculator'], category: 'Personal Finance', relatedCalculators: ['budget-calculator', 'debt-equity-calculator', 'financial-goal-calculator'] },
      { id: 'inflation-calculator', name: 'Inflation Calculator', description: 'Advanced inflation calculator India with future cost projection, present value estimation, and real return analysis for goal-based planning.', keywords: ['inflation calculator india 2026', 'future cost inflation calculator india', 'purchasing power loss calculator rupee', 'real return calculator after inflation india', 'education inflation calculator india', 'retirement inflation planning calculator', 'salary hike vs inflation calculator'], category: 'Personal Finance', relatedCalculators: ['retirement-calculator', 'inflation-adjusted-sip-calculator', 'financial-goal-calculator', 'sip-calculator', 'future-value-calculator'] },
      { id: 'interest-rate-converter', name: 'Interest Rate Converter', description: 'Convert flat, reducing, APR, and effective annual rates to compare loan offers accurately and avoid hidden borrowing costs.', keywords: ['interest rate converter india', 'flat to reducing interest converter', 'apr to eir calculator', 'loan interest comparison tool', 'reducing balance rate converter'], category: 'Personal Finance', relatedCalculators: ['emi-calculator', 'loan-comparison-calculator', 'personal-loan-calculator'] }
    ]
  },
  // Math & Education Calculators
  {
    id: 'math-education-calculators',
    name: 'Math & Education Calculators',
    description: 'Essential mathematical calculators for students, teachers, and professionals',
    calculators: [
      { id: 'lcm-hcf-calculator', name: 'LCM and HCF Calculator', description: 'Calculate Least Common Multiple (LCM) and Highest Common Factor (HCF/GCD) of multiple numbers with step-by-step solutions using prime factorization, Euclidean algorithm, and division method.', keywords: ['lcm and hcf calculator with steps', 'gcd and lcm calculator for multiple numbers', 'least common multiple calculator online', 'highest common factor calculator', 'prime factorization lcm hcf solver', 'euclidean algorithm gcd calculator', 'math calculator for students india', 'lcm hcf for competitive exams'], category: 'Math & Education Calculators', relatedCalculators: ['compound-interest-calculator', 'simple-interest-calculator', 'gram-to-tola-converter', 'interest-rate-converter'] },
      { id: 'gram-to-tola-converter', name: 'Gram to Tola Converter', description: 'Precise weight conversion for gold and precious metals. Standard 11.6638g conversion rate with high accuracy for India, Pakistan, and South Asia.', keywords: ['gram to tola converter', 'tola to gram', 'gold weight calculator', '1 tola in grams', 'jewellers weight converter india'], category: 'Math & Education Calculators', relatedCalculators: ['gold-investment-calculator', 'lcm-hcf-calculator'] }
    ]
  },
  // Advisor & Marketing Tools
  {
    id: 'advisor-marketing-tools',
    name: 'Advisor & Marketing Tools',
    description: 'Professional tools for financial advisors, agents, and marketing professionals to grow their business.',
    calculators: [
      {
        id: 'promo-designer',
        name: 'Promo Designer & Banner Maker',
        description: 'Create professional financial promotional banners for SIP, Loans, and Insurance instantly. Custom templates, high-res downloads, and SEO-optimized marketing tools for advisors.',
        keywords: ['promo designer online', 'finance banner maker', 'loan ad maker', 'sip poster generator', 'social media post maker finance', 'moneycal marketing tools', 'financial advisor marketing banner', 'insurance agent marketing tool'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['sip-calculator', 'loan-calculator', 'emi-calculator']
      },
      {
        id: 'poster-maker',
        name: 'Goal Poster Maker',
        description: 'Create high-impact financial goal posters for retirement, education, and wealth. Professional templates for financial advisors.',
        keywords: ['financial poster maker', 'goal planning banner', 'wealth advisor marketing', 'sip poster creator'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['promo-designer', 'sip-calculator']
      },
      {
        id: 'sip-delay-visualizer',
        name: 'SIP Delay Visualizer',
        description: 'Visualize the cost of delaying your SIP investments. Professional posters for advisors to show wealth loss.',
        keywords: ['cost of delay calculator', 'sip delay visualizer', 'wealth loss calculator', 'advisor lead magnet'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['sip-calculator', 'poster-maker']
      },
      {
        id: 'loan-savings-visualizer',
        name: 'Loan Savings Visualizer',
        description: 'Show clients how much interest they can save with extra EMI payments. Visual posters for loan advisors.',
        keywords: ['loan savings calculator', 'emi savings visualizer', 'interest saving tool', 'prepayment benefit visualizer'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['loan-calculator', 'emi-calculator']
      },
      {
        id: 'email-signature-generator',
        name: 'Email Signature Generator',
        description: 'Create professional branded email signatures for financial advisors and bankers. Free HD downloads.',
        keywords: ['email signature generator finance', 'professional email signature', 'advisor branding tool'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['promo-designer']
      },
      {
        id: 'roi-comparison-designer',
        name: 'ROI Comparison Designer',
        description: 'Visual comparison of returns from SIP, FD, Gold, and Real Estate. High-impact marketing graphics.',
        keywords: ['roi comparison tool', 'sip vs fd visualizer', 'investment return comparison creator'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['poster-maker', 'sip-calculator']
      },
      {
        id: 'tax-bucket-visualizer',
        name: 'Tax Bucket Visualizer',
        description: 'Visualize tax saving progress across 80C, 80D, and NPS. Fill your buckets before March 31st!',
        keywords: ['tax saving bucket', '80c visualizer', 'tax planning lead magnet'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['income-tax-calculator']
      },
      {
        id: 'investment-risk-profiler',
        name: 'Investment Risk Profiler',
        description: 'Interactive quiz to find your investor DNA and ideal asset allocation. Lead generation for advisors.',
        keywords: ['risk profiler quiz', 'investor dna test', 'risk tolerance calculator'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['sip-calculator', 'poster-maker']
      },
      {
        id: 'education-cost-visualizer',
        name: 'Education Cost Visualizer',
        description: 'Project future costs of higher education with inflation. Visual planning for parents.',
        keywords: ['education inflation calculator', 'future college cost visualizer', 'child plan lead magnet'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['poster-maker', 'sip-calculator']
      },
      {
        id: 'retirement-scorecard',
        name: 'Retirement Scorecard',
        description: 'Assess retirement readiness and corpus gaps visually. High-ticket lead magnet for planners.',
        keywords: ['retirement scorecard', 'retirement readiness visualizer', 'corpus gap calculator'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['retirement-calculator', 'poster-maker']
      },
      {
        id: 'referral-message-builder',
        name: 'Referral Message Builder',
        description: 'Craft professional high-conversion WhatsApp referral messages for your clients.',
        keywords: ['financial advisor referral template', 'whatsapp referral builder', 'client referral tool'],
        category: 'Advisor & Marketing Tools',
        relatedCalculators: ['promo-designer', 'email-signature-generator']
      }
    ]
  }
];

