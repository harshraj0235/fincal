export interface MasterclassLesson {
  slug: string;
  title: string;
  moduleId: number;
  moduleName: string;
  lessonIndex: number;
  subtitle: string;
  color: string;
}

export const masterclassLessons: MasterclassLesson[] = [
  { slug: 'maximizing-section-80c', title: 'Maximizing Section 80C (₹1.5L) Like a Pro', moduleId: 1, moduleName: 'The Corporate Survival Kit', lessonIndex: 1, subtitle: 'Learn every legal way to save up to ₹46,800 in taxes using Section 80C investments.', color: 'from-blue-600 to-indigo-600' },
  { slug: 'epf-vs-vpf', title: 'EPF vs VPF: The Hidden Wealth Builder', moduleId: 1, moduleName: 'The Corporate Survival Kit', lessonIndex: 2, subtitle: 'Discover how voluntary PF contributions can silently build a ₹2 Crore+ retirement corpus.', color: 'from-blue-600 to-indigo-600' },
  { slug: 'hra-standard-deduction', title: 'HRA & Standard Deduction Optimization for FY 2026-27', moduleId: 1, moduleName: 'The Corporate Survival Kit', lessonIndex: 3, subtitle: 'Optimize your HRA claims and understand the ₹75,000 standard deduction under the new regime.', color: 'from-blue-600 to-indigo-600' },
  { slug: 'understanding-ctc', title: 'Understanding Your CTC: Take-home vs Gross', moduleId: 1, moduleName: 'The Corporate Survival Kit', lessonIndex: 4, subtitle: 'Decode your salary slip and understand every component from Basic to Gratuity.', color: 'from-blue-600 to-indigo-600' },
  { slug: 'emergency-fund-rule', title: 'The 6-Month Emergency Fund Rule', moduleId: 2, moduleName: 'Building the Financial War Chest', lessonIndex: 1, subtitle: 'Why 6 months of expenses in liquid savings is your financial armor.', color: 'from-emerald-600 to-teal-600' },
  { slug: 'corporate-vs-personal-insurance', title: 'Corporate Health Insurance vs Personal Top-ups', moduleId: 2, moduleName: 'Building the Financial War Chest', lessonIndex: 2, subtitle: 'Why relying only on company insurance is a dangerous gamble.', color: 'from-emerald-600 to-teal-600' },
  { slug: 'term-insurance-guide', title: "Term Insurance: Why Your Company Policy Isn't Enough", moduleId: 2, moduleName: 'Building the Financial War Chest', lessonIndex: 3, subtitle: 'The most important financial product every corporate employee needs.', color: 'from-emerald-600 to-teal-600' },
  { slug: 'managing-high-interest-debt', title: 'Managing High-Interest Debt (Credit Cards & Personal Loans)', moduleId: 2, moduleName: 'Building the Financial War Chest', lessonIndex: 4, subtitle: 'Strategies to eliminate 36%+ APR debt and free up your wealth-building capacity.', color: 'from-emerald-600 to-teal-600' },
  { slug: 'magic-of-sip', title: 'The Magic of SIP: ₹5K to ₹1 Crore Journey', moduleId: 3, moduleName: 'The Compounding Engine', lessonIndex: 1, subtitle: 'See how a small monthly investment creates massive wealth through compounding.', color: 'from-violet-600 to-purple-600' },
  { slug: 'direct-vs-regular-funds', title: 'Direct vs Regular Mutual Funds: Saving That 1% Fee', moduleId: 3, moduleName: 'The Compounding Engine', lessonIndex: 2, subtitle: 'That 1% commission difference can cost you ₹30 Lakhs over 20 years.', color: 'from-violet-600 to-purple-600' },
  { slug: 'index-funds-guide', title: 'Index Funds: Why 90% of Active Funds Fail', moduleId: 3, moduleName: 'The Compounding Engine', lessonIndex: 3, subtitle: 'The lazy investor strategy that beats most fund managers.', color: 'from-violet-600 to-purple-600' },
  { slug: 'portfolio-diversification', title: 'Portfolio Diversification: Equity, Debt, and Gold', moduleId: 3, moduleName: 'The Compounding Engine', lessonIndex: 4, subtitle: 'Build an all-weather portfolio that survives market crashes.', color: 'from-violet-600 to-purple-600' },
  { slug: 'planning-first-home', title: 'Planning for Your First Home Without Going Broke', moduleId: 4, moduleName: 'Goal-Based Lifestyle Design', lessonIndex: 1, subtitle: 'The complete financial roadmap to buying your dream home in India.', color: 'from-rose-600 to-pink-600' },
  { slug: 'retirement-25x-rule', title: 'Retirement Math: The 25x Rule for India', moduleId: 4, moduleName: 'Goal-Based Lifestyle Design', lessonIndex: 2, subtitle: 'Calculate exactly how much corpus you need to retire comfortably.', color: 'from-rose-600 to-pink-600' },
  { slug: 'tax-free-income-strategies', title: 'Tax-Free Income Strategies (PPF, Sukanya Samriddhi)', moduleId: 4, moduleName: 'Goal-Based Lifestyle Design', lessonIndex: 3, subtitle: 'Instruments where your investment, interest, and maturity are all tax-free.', color: 'from-rose-600 to-pink-600' },
  { slug: 'avoiding-lifestyle-creep', title: "Avoiding 'Lifestyle Creep' After Every Appraisal", moduleId: 4, moduleName: 'Goal-Based Lifestyle Design', lessonIndex: 4, subtitle: 'The #1 reason high-earners stay poor and how to break the cycle.', color: 'from-rose-600 to-pink-600' },
  { slug: 'international-investing', title: 'International Investing: Buying US Stocks from India', moduleId: 5, moduleName: 'The Advanced Wealth Tier', lessonIndex: 1, subtitle: 'Diversify globally with Apple, Google, and S&P 500 from your Indian brokerage.', color: 'from-amber-600 to-orange-600' },
  { slug: 'reits-fractional-real-estate', title: 'REITs & Fractional Real Estate', moduleId: 5, moduleName: 'The Advanced Wealth Tier', lessonIndex: 2, subtitle: 'Own commercial real estate with as little as ₹10,000.', color: 'from-amber-600 to-orange-600' },
  { slug: 'tax-efficient-withdrawals', title: 'Tax-Efficient Withdrawal Strategies', moduleId: 5, moduleName: 'The Advanced Wealth Tier', lessonIndex: 3, subtitle: 'Maximize post-tax returns when you finally start using your wealth.', color: 'from-amber-600 to-orange-600' },
  { slug: 'estate-planning-will', title: 'Estate Planning: Why You Need a Will Today', moduleId: 5, moduleName: 'The Advanced Wealth Tier', lessonIndex: 4, subtitle: 'Protect your family and assets with proper succession planning.', color: 'from-amber-600 to-orange-600' },
];

export const getLessonBySlug = (slug: string) => masterclassLessons.find(l => l.slug === slug);
export const getLessonsByModule = (moduleId: number) => masterclassLessons.filter(l => l.moduleId === moduleId);
export const getNextLesson = (slug: string) => {
  const idx = masterclassLessons.findIndex(l => l.slug === slug);
  return idx >= 0 && idx < masterclassLessons.length - 1 ? masterclassLessons[idx + 1] : null;
};
export const getPrevLesson = (slug: string) => {
  const idx = masterclassLessons.findIndex(l => l.slug === slug);
  return idx > 0 ? masterclassLessons[idx - 1] : null;
};
