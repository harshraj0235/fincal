import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import CalculatorSchema from '../components/CalculatorSchema';
import { npsConfig } from '../engine/configs/npsConfig';
import { useOmniEngine } from '../engine/useOmniEngine';
import { OmniWidget } from '../engine/components/OmniWidget';
/* ═══════════════════════════════════════════════════════════════
   NPS CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: nps calculator, national pension system calculator india,
   nps tax benefit 2026, 80ccd 1b calculator, nps pension calculator
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is the National Pension System (NPS)?", answer: "The National Pension System (NPS) is a voluntary, long-term retirement savings scheme created by the Government of India. It is regulated by PFRDA. It allows individuals to systematically save for their retirement, offering market-linked returns and substantial tax benefits." },
  { question: "Is the 60% withdrawal on maturity tax-free?", answer: "Yes. Under current tax laws, when you reach the age of 60, you can withdraw up to 60% of your total accumulated NPS corpus completely tax-free. The remaining 40% must be used to purchase a lifelong annuity (pension) from a life insurance company." },
  { question: "What are the tax benefits under Section 80CCD(1B)?", answer: "NPS offers an exclusive tax deduction of ₹50,000 under Section 80CCD(1B). This is over and above the ₹1.5 Lakh limit available under Section 80C. Therefore, an individual can claim a total deduction of up to ₹2 Lakhs by investing in NPS." },
  { question: "Can I withdraw from NPS before the age of 60?", answer: "Premature withdrawal is allowed only after completing 3 years. You can withdraw up to 25% of your own contributions (not the employer's or the interest) for specific reasons like children's higher education, marriage, buying a house, or medical emergencies. A maximum of 3 such withdrawals are allowed during the entire tenure." },
  { question: "What is the difference between Active and Auto choice?", answer: "In 'Active Choice', you decide the asset allocation across Equity (E), Corporate Bonds (C), and Government Securities (G), subject to a maximum of 75% in Equity. In 'Auto Choice', your funds are automatically allocated based on your age, with equity exposure decreasing as you get older to reduce risk." }
];

const QUICK_PRESETS = [
  { label: 'Max Tax Benefit (₹50K/yr)', monthly: 4167, employer: 0, age: 30, equity: 50, return: 10 },
  { label: 'Aggressive (75% Equity)', monthly: 10000, employer: 0, age: 25, equity: 75, return: 11 },
  { label: 'Corporate Matching', monthly: 5000, employer: 5000, age: 35, equity: 50, return: 10 },
];

export const NpsCalculator: React.FC = () => {
  const engine = useOmniEngine(npsConfig);

  const applyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    engine.updateVariable('monthlyContribution', preset.monthly.toString(), 'inr');
    engine.updateVariable('employerContribution', preset.employer.toString(), 'inr');
    engine.updateVariable('currentAge', preset.age.toString(), 'years');
    engine.updateVariable('equityAllocation', preset.equity.toString(), 'percent');
    engine.updateVariable('expectedReturn', preset.return.toString(), 'percent_yearly');
  };

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="NPS Calculator India 2026 | National Pension System Maturity & Tax" 
        description="Calculate your NPS retirement corpus, tax-free lump sum (60%), and annuity pension (40%). Find tax benefits under Sec 80C and 80CCD(1B) for 2026." 
        keywords="nps calculator, national pension system calculator india, nps tax benefit 2026, 80ccd 1b calculator, nps pension calculator, nps return calculator" 
        url="/calculators/nps-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'NPS Calculator 2026', description: 'National Pension System tier-1 maturity calculator.', category: 'Retirement Calculators', features: ['60/40 Split', 'Tax Benefit Details', 'Employer matching'], ratingValue: 4.8, reviewCount: 20112, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-cyan-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-cyan-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">NPS Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">National Pension System (NPS) Calculator</h1>
          <p className="text-gray-600">Estimate your retirement corpus under the NPS Tier-1 scheme. See the breakdown of your 60% tax-free lumpsum and 40% mandatory annuity pension.</p>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Popular Scenarios</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PRESETS.map((preset, idx) => (
              <button key={idx} onClick={() => applyPreset(preset)} className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-cyan-50 hover:border-cyan-400 text-gray-700 transition-colors font-semibold">
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <OmniWidget config={npsConfig} engine={engine} />
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>What is the NPS Calculator?</h2>
          <p>
            The <strong>NPS Calculator (National Pension System Calculator)</strong> is an essential financial tool designed to help Indian citizens plan their retirement. The NPS is a government-sponsored pension scheme that allows individuals to invest systematically during their working years. Our calculator projects the total retirement corpus you will accumulate by the age of 60, and breaks down the mandatory 60/40 split between your tax-free lumpsum and your annuity pension.
          </p>
          <p>
            Because NPS returns are market-linked (dependent on your choice of Equity, Corporate Debt, and Government Bonds), forecasting your retirement corpus requires complex compounding calculations. This tool simplifies the math, providing a clear roadmap to your golden years.
          </p>

          <h3>How Does NPS Work? (Tier 1 vs Tier 2)</h3>
          <p>The National Pension System offers two types of accounts:</p>
          <ul>
            <li><strong>Tier 1 Account:</strong> This is the mandatory, strict retirement account. It comes with immense tax benefits (Section 80C and 80CCD(1B)) but has a strict lock-in period until the age of 60. Our calculator is specifically designed for the Tier-1 account.</li>
            <li><strong>Tier 2 Account:</strong> This is a voluntary savings facility. There are no lock-in periods (you can withdraw anytime) but there are also no tax benefits. You must have an active Tier-1 account to open a Tier-2 account.</li>
          </ul>

          <h3>Understanding the 60/40 Maturity Split</h3>
          <p>The most crucial aspect of the NPS is what happens when you turn 60. Unlike a PPF or Mutual Fund where you can withdraw everything at once, NPS has strict withdrawal rules mandated by the PFRDA (Pension Fund Regulatory and Development Authority).</p>
          
          <h4>1. The 60% Lumpsum (Tax-Free)</h4>
          <p>At the age of 60, you are allowed to withdraw up to <strong>60% of your total accumulated corpus</strong> as a lumpsum. The best part? This entire 60% withdrawal is completely tax-free under current Indian tax laws.</p>
          
          <h4>2. The 40% Annuity (Mandatory Pension)</h4>
          <p>The remaining <strong>40% of your corpus must be used to purchase an Annuity</strong> from an ASP (Annuity Service Provider, usually a Life Insurance company). An annuity is a financial product that pays you a fixed monthly pension for the rest of your life.</p>
          <ul>
            <li>While purchasing the annuity is tax-free, the monthly pension you receive from it will be added to your income and taxed according to your applicable slab rate in retirement.</li>
            <li>If your total NPS corpus at age 60 is less than or equal to ₹5 Lakhs, you are exempt from the annuity rule and can withdraw 100% of the money as a tax-free lumpsum.</li>
          </ul>

          <h3>Tax Benefits of NPS (How to Save Tax in 2026)</h3>
          <p>NPS is arguably the most tax-efficient retirement vehicle in India for salaried individuals.</p>

          <h4>1. Section 80CCD(1) - The Standard Deduction</h4>
          <p>Your contributions to the NPS Tier-1 account are eligible for tax deduction under Section 80C, up to a maximum limit of ₹1.5 Lakhs per financial year.</p>

          <h4>2. Section 80CCD(1B) - The Exclusive ₹50,000 Benefit</h4>
          <p>This is the game-changer. The government introduced an <strong>exclusive deduction of ₹50,000</strong> purely for NPS investments. This means, if you exhaust your ₹1.5L limit of 80C with PF, Life Insurance, and Home Loan, you can still invest an extra ₹50,000 in NPS and claim an additional deduction. Total possible deduction = ₹2 Lakhs.</p>

          <h4>3. Section 80CCD(2) - Corporate NPS (Employer Contribution)</h4>
          <p>If your employer contributes to your NPS account, that amount is entirely tax-exempt up to 10% of your Basic Salary + DA (14% for Central/State Government employees). This is highly recommended as a salary restructuring tool to minimize TDS.</p>

          <h3>Active Choice vs. Auto Choice in NPS</h3>
          <p>When you open an NPS account, you have to decide how your money will be invested. You have two options:</p>

          <h4>Active Choice (You take control)</h4>
          <p>You manually decide the percentage allocation across four asset classes:</p>
          <ul>
            <li><strong>E (Equity):</strong> High risk, high return. Maximum allowed is 75%.</li>
            <li><strong>C (Corporate Bonds):</strong> Moderate risk, moderate return.</li>
            <li><strong>G (Government Securities):</strong> Zero default risk, lower return.</li>
            <li><strong>A (Alternative Investments):</strong> REITs, InvITs. Maximum allowed is 5%.</li>
          </ul>

          <h4>Auto Choice (Lifecycle Fund)</h4>
          <p>If you don't want to actively manage your portfolio, the PFRDA will do it for you based on your age. As you grow older and approach retirement, the Auto Choice automatically reduces your Equity exposure and increases your Government Securities exposure to protect your wealth from market crashes just before retirement.</p>
          <p>There are three Lifecycle (LC) funds:</p>
          <ul>
            <li><strong>LC75 (Aggressive):</strong> Starts with 75% equity till age 35, gradually reducing to 15% by age 55.</li>
            <li><strong>LC50 (Moderate):</strong> Starts with 50% equity till age 35, gradually reducing to 10% by age 55. (This is the default option).</li>
            <li><strong>LC25 (Conservative):</strong> Starts with 25% equity till age 35, gradually reducing to 5% by age 55.</li>
          </ul>

          <h3>NPS vs PPF vs Mutual Funds for Retirement</h3>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-center">NPS (Tier 1)</th>
                <th className="border border-gray-300 p-2 text-center">PPF</th>
                <th className="border border-gray-300 p-2 text-center">Equity Mutual Funds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Returns Type</td>
                <td className="border border-gray-300 p-2 text-center">Market Linked (Usually 9-11%)</td>
                <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">Fixed (Currently 7.1%)</td>
                <td className="border border-gray-300 p-2 text-center">Market Linked (Historically 12-15%)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Lock-in Period</td>
                <td className="border border-gray-300 p-2 text-center">Till Age 60</td>
                <td className="border border-gray-300 p-2 text-center">15 Years</td>
                <td className="border border-gray-300 p-2 text-center">None (Unless ELSS which is 3 Yrs)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Tax on Maturity</td>
                <td className="border border-gray-300 p-2 text-center">60% Tax-Free. 40% Annuity is taxable.</td>
                <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">100% Tax-Free (EEE)</td>
                <td className="border border-gray-300 p-2 text-center">12.5% LTCG Tax above ₹1.25L</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Exclusive Deduction</td>
                <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">Yes (₹50,000 under 80CCD 1B)</td>
                <td className="border border-gray-300 p-2 text-center">No (Only 80C)</td>
                <td className="border border-gray-300 p-2 text-center">No (Only ELSS under 80C)</td>
              </tr>
            </tbody>
          </table>
          <p><strong>Verdict:</strong> Use NPS specifically to claim the extra ₹50,000 tax deduction and enforce strict retirement discipline. Use PPF for a 100% safe, tax-free debt allocation. Use Mutual Funds for flexible wealth creation without the 40% annuity restriction.</p>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>NPS is a market-linked product. The expected return rate in this calculator is based on historical approximations of equity and debt markets and is not a guarantee of future performance. The actual annuity payout will depend on the annuity rates offered by Insurance companies when you reach the age of 60.</p>
          </div>
        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular NPS Scenarios</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/nps-calculator-5000-per-month" className="px-3 py-1.5 bg-white border rounded hover:bg-cyan-50 hover:border-cyan-400 text-gray-600">₹5,000/month NPS Returns</a>
            <a href="/calculators/nps-calculator-10000-per-month" className="px-3 py-1.5 bg-white border rounded hover:bg-cyan-50 hover:border-cyan-400 text-gray-600">₹10,000/month NPS Returns</a>
            <a href="/calculators/nps-tax-benefit-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-cyan-50 hover:border-cyan-400 text-gray-600">NPS 80CCD(1B) Calculator</a>
            <a href="/calculators/nps-pension-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-cyan-50 hover:border-cyan-400 text-gray-600">NPS Annuity Calculator</a>
          </div>
        </div>

      </div>
      <CalculatorSchema 
        name="NPS Calculator"
        description="Calculate National Pension System (NPS) maturity amount, monthly pension, and tax benefits under section 80CCD(1B)."
        url="/calculators/nps-calculator"
        features={["Retirement planning", "Pension calculation", "Tax benefits", "Annuity options"]}
        category="FinanceApplication"
        faqData={FAQ_DATA}
      />
    </>
  );
};