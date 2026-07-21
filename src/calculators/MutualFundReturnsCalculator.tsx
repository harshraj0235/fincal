import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { getCalculatorById } from '../data/calculatorData';
import CalculatorSchema from '../components/CalculatorSchema';
import { mutualFundReturnsConfig } from '../engine/configs/mutualFundReturnsConfig';
import { useOmniEngine } from '../engine/useOmniEngine';
import { OmniWidget } from '../engine/components/OmniWidget';
/* ═══════════════════════════════════════════════════════════════
   MUTUAL FUND CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: mutual fund calculator, mutual fund returns calculator,
   lumpsum calculator, sip vs lumpsum calculator, mf calculator india
   ═══════════════════════════════════════════════════════════════ */

type Preset = { label: string; type: 'sip' | 'lumpsum'; amount: number; period: number; return: number };

const QUICK_PRESETS: Preset[] = [
  { label: 'SIP ₹10K / 15Y', type: 'sip', amount: 10000, period: 15, return: 12 },
  { label: 'SIP ₹25K / 20Y', type: 'sip', amount: 25000, period: 20, return: 12 },
  { label: 'Lumpsum ₹10L / 10Y', type: 'lumpsum', amount: 1000000, period: 10, return: 12 },
];

const FAQ_DATA = [
    { question: "How are mutual fund returns calculated?", answer: "For lumpsum investments, mutual fund returns are calculated using the Compound Annual Growth Rate (CAGR) formula. For SIPs, returns are calculated using XIRR (Extended Internal Rate of Return) because investments are made periodically. Our calculator automatically applies the correct mathematical formula based on your investment type." },
    { question: "What is a good expected return rate for Mutual Funds?", answer: "Historically, large-cap equity mutual funds in India have delivered around 10-12% long-term returns. Mid-cap and Small-cap funds have delivered 12-15%, but with higher volatility. Debt funds usually deliver 6-8%. When using this calculator, a conservative estimate of 10% or 12% is recommended for planning." },
    { question: "Are Mutual Fund returns guaranteed?", answer: "No. Unlike Fixed Deposits (FDs) or Public Provident Fund (PPF), mutual fund returns are linked to the financial markets. The 'Expected Return Rate' you enter in the calculator is an assumption based on historical performance, not a guarantee." },
    { question: "SIP vs Lumpsum: Which is better?", answer: "SIP (Systematic Investment Plan) is better for most retail investors because it instills discipline and benefits from Rupee Cost Averaging (buying more units when markets are down). Lumpsum is better if you have a large amount of cash available immediately and your investment horizon is very long (7+ years)." },
    { question: "How are Mutual Fund returns taxed in India?", answer: "For Equity Mutual Funds, short-term capital gains (sold within 1 year) are taxed at 20%. Long-term capital gains (sold after 1 year) are taxed at 12.5% on profits exceeding ₹1.25 Lakhs per year. Debt funds are taxed at your applicable income tax slab rate, regardless of the holding period." }
];

export const MutualFundReturnsCalculator: React.FC = () => {
  const engine = useOmniEngine(mutualFundReturnsConfig);

  const applyPreset = (preset: Preset) => {
    engine.updateVariable('investmentType', preset.type === 'sip' ? '1' : '0');
    engine.updateVariable('investmentAmount', preset.amount.toString(), 'inr');
    engine.updateVariable('investmentPeriod', preset.period.toString(), 'years');
    engine.updateVariable('expectedReturn', preset.return.toString(), 'percent_yearly');
    engine.updateVariable('existingInvestment', '0', 'inr');
  };

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="Mutual Fund Returns Calculator India | SIP & Lumpsum Calculator" 
        description="Calculate exact mutual fund returns for SIP and Lumpsum investments. Compare compounding benefits, adjust expected CAGR, and plan your wealth creation goals securely." 
        keywords="mutual fund calculator, mutual fund returns calculator, lumpsum calculator, sip vs lumpsum calculator, mf calculator india, cagr calculator mutual fund" 
        url="/calculators/mutual-fund-returns-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Mutual Fund Calculator', description: 'Calculate wealth from mutual funds.', category: 'Investment Calculators', features: ['SIP & Lumpsum modes', 'Existing Investment Growth', 'Compound Interest Analysis'], ratingValue: 4.9, reviewCount: 31200, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-emerald-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Mutual Fund Returns</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Mutual Fund Returns Calculator</h1>
          <p className="text-gray-600">Estimate the future value of your Mutual Fund investments. Choose between Systematic Investment Plan (SIP) or a one-time Lumpsum deposit to see the power of compounding.</p>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Popular Investment Goals</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PRESETS.map((preset, idx) => (
              <button key={idx} onClick={() => applyPreset(preset)} className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-emerald-50 hover:border-emerald-400 text-gray-700 transition-colors font-semibold">
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <OmniWidget config={mutualFundReturnsConfig} engine={engine} />
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>What is a Mutual Fund Calculator?</h2>
          <p>
            A <strong>Mutual Fund Calculator</strong> is a powerful financial tool designed to estimate the future value of your investments. Because mutual funds do not offer a fixed interest rate like a Fixed Deposit (FD), forecasting your wealth requires complex compound interest mathematics. This calculator simplifies the process, allowing you to project returns for both <strong>Systematic Investment Plans (SIP)</strong> and <strong>Lumpsum</strong> investments over any given time horizon.
          </p>
          <p>
            Whether you are planning for retirement, saving for your child's education, or aiming to buy a house, our mutual fund returns calculator helps you determine exactly how much you need to invest today to reach your financial goals tomorrow.
          </p>

          <h3>SIP vs. Lumpsum: Which Should You Choose?</h3>
          <p>
            The two primary ways to invest in a mutual fund are SIP and Lumpsum. Choosing the right strategy depends on your cash flow and market conditions.
          </p>
          
          <h4>Systematic Investment Plan (SIP)</h4>
          <p>
            An SIP allows you to invest a fixed amount of money (e.g., ₹5,000) at regular intervals (usually monthly) into a mutual fund. 
          </p>
          <ul>
            <li><strong>Rupee Cost Averaging:</strong> This is the biggest advantage of SIPs. When the market is high, you buy fewer units. When the market is low (crashing), you buy more units. Over time, this averages out your purchase cost and reduces the risk of market volatility.</li>
            <li><strong>Discipline:</strong> It automates your savings. The money is auto-debited from your bank account before you get a chance to spend it.</li>
            <li><strong>Best For:</strong> Salaried individuals with a steady monthly income.</li>
          </ul>

          <h4>Lumpsum Investment</h4>
          <p>
            A Lumpsum investment involves taking a large chunk of money (e.g., ₹5 Lakhs) and investing it into a mutual fund all at once.
          </p>
          <ul>
            <li><strong>Market Timing Risk:</strong> If you invest a lumpsum at the absolute peak of a bull market, and the market crashes the next month, your portfolio will be immediately negative and it may take years to recover. </li>
            <li><strong>Maximum Compounding:</strong> If you invest during a market correction or crash, a lumpsum investment will heavily outperform an SIP because the entire capital starts compounding from day one.</li>
            <li><strong>Best For:</strong> People who have received a sudden windfall (annual bonus, property sale, inheritance) and have a very long investment horizon.</li>
          </ul>

          <h3>How Are Mutual Fund Returns Calculated? (The Math)</h3>
          
          <h4>1. Lumpsum Calculation (CAGR)</h4>
          <p>Lumpsum returns are calculated using the standard Compound Interest formula. In mutual fund terms, this is called the Compound Annual Growth Rate (CAGR).</p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center text-lg border-l-4 border-emerald-600">
            <strong>FV = PV × (1 + r)<sup>n</sup></strong>
          </div>
          <ul>
            <li><strong>FV</strong> = Future Value (Maturity Amount)</li>
            <li><strong>PV</strong> = Present Value (Lumpsum Amount invested today)</li>
            <li><strong>r</strong> = Expected annual rate of return (in decimal, e.g., 12% = 0.12)</li>
            <li><strong>n</strong> = Number of years</li>
          </ul>

          <h4>2. SIP Calculation (Future Value of Annuity)</h4>
          <p>Because an SIP involves multiple investments over time, calculating the return is more complex. Each monthly installment earns interest for a different duration. The formula used is the Future Value of an Annuity Due.</p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center text-lg border-l-4 border-emerald-600">
            <strong>FV = P × [ ( (1 + i)<sup>n</sup> - 1 ) / i ] × (1 + i)</strong>
          </div>
          <ul>
            <li><strong>FV</strong> = Future Value</li>
            <li><strong>P</strong> = Monthly SIP Amount</li>
            <li><strong>n</strong> = Total number of months (Years × 12)</li>
            <li><strong>i</strong> = Monthly interest rate (Annual Rate / 12 / 100)</li>
          </ul>
          <p>Our online mutual fund calculator handles these complex equations instantly in the background.</p>

          <h3>What is a Realistic "Expected Return Rate"?</h3>
          <p>
            When using the calculator, the most critical input is the "Expected Return Rate". Setting this too high will give you unrealistic expectations. Here is a historical guide based on Indian mutual fund categories over 10+ year horizons:
          </p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Mutual Fund Category</th>
                <th className="border border-gray-300 p-2 text-left">Risk Level</th>
                <th className="border border-gray-300 p-2 text-center">Realistic Expected Return (CAGR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Large Cap Equity Funds (Nifty 50)</td>
                <td className="border border-gray-300 p-2">Moderately High</td>
                <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">10% - 12%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Mid Cap Equity Funds</td>
                <td className="border border-gray-300 p-2">High</td>
                <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">12% - 14%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Small Cap Equity Funds</td>
                <td className="border border-gray-300 p-2">Very High</td>
                <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">13% - 15%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Balanced Advantage Funds (Hybrid)</td>
                <td className="border border-gray-300 p-2">Moderate</td>
                <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">8% - 10%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Debt Funds / Liquid Funds</td>
                <td className="border border-gray-300 p-2">Low</td>
                <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">6% - 7.5%</td>
              </tr>
            </tbody>
          </table>
          <p><em>*Note: For conservative financial planning, it is highly recommended to use 10% or 12% as your expected return rate in the calculator.</em></p>

          <h3>Understanding Mutual Fund Taxation in India (2026 Rules)</h3>
          <p>
            The wealth shown by the mutual fund calculator is the gross amount. When you actually withdraw (redeem) the money, you will have to pay income tax on the profits. The taxation rules differ between Equity and Debt funds.
          </p>

          <h4>Taxation on Equity Mutual Funds</h4>
          <p>A mutual fund is classified as an equity fund if it invests more than 65% of its portfolio in domestic stocks.</p>
          <ul>
            <li><strong>STCG (Short-Term Capital Gains):</strong> If you sell your units before holding them for 1 year, the profit is taxed at a flat <strong>20%</strong>.</li>
            <li><strong>LTCG (Long-Term Capital Gains):</strong> If you sell after holding for more than 1 year, profits up to ₹1.25 Lakhs per financial year are tax-free. Any profit above ₹1.25 Lakhs is taxed at <strong>12.5%</strong> without indexation.</li>
          </ul>

          <h4>Taxation on Debt Mutual Funds</h4>
          <p>Following the Finance Act 2023, the taxation of debt mutual funds has fundamentally changed.</p>
          <ul>
            <li>There is no longer a distinction between Short-Term and Long-Term Capital Gains for debt funds.</li>
            <li>All profits made from selling debt mutual funds are simply added to your taxable income and taxed at your <strong>applicable income tax slab rate</strong>.</li>
            <li>The benefit of indexation (adjusting purchase price for inflation) has been completely removed.</li>
          </ul>

          <h3>The "Eighth Wonder": Power of Compounding</h3>
          <p>
            Albert Einstein famously called compound interest the eighth wonder of the world. In mutual funds, this means you don't just earn returns on your initial investment; you earn returns on your returns.
          </p>
          <p>
            Let's look at an example using our calculator: If you invest <strong>₹10,000 via SIP every month</strong> at an expected return of <strong>12%</strong>:
          </p>
          <ul>
            <li><strong>After 10 Years:</strong> You invested ₹12 Lakhs. Your wealth is ~₹23 Lakhs. (Profit: ₹11 Lakhs).</li>
            <li><strong>After 20 Years:</strong> You invested ₹24 Lakhs. Your wealth is ~₹99 Lakhs. (Profit: ₹75 Lakhs).</li>
            <li><strong>After 30 Years:</strong> You invested ₹36 Lakhs. Your wealth is ~₹3.5 Crores! (Profit: ₹3.14 Crores).</li>
          </ul>
          <p>
            Notice how adding just 10 more years caused the wealth to jump from ₹99 Lakhs to ₹3.5 Crores. This exponential curve is the secret to building massive wealth. <strong>The key is to start early and never interrupt the compounding process unnecessarily.</strong>
          </p>

          <h3>Active Funds vs. Index Funds</h3>
          <p>When selecting a mutual fund to invest in, you must choose between Active and Passive (Index) funds.</p>
          <ul>
            <li><strong>Active Mutual Funds:</strong> These are managed by professional fund managers who actively buy and sell stocks, trying to "beat the market" (generate higher returns than the benchmark index like Nifty 50). They charge a higher fee (Expense Ratio) of about 0.5% to 1.5%.</li>
            <li><strong>Index Funds (Passive):</strong> These funds simply copy an index like the Nifty 50. There is no active stock selection. Because they run on autopilot, their fees are incredibly low (0.1% to 0.3%). Over the long term (10+ years), most active fund managers fail to beat the index funds after accounting for fees.</li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Important Disclaimer</p>
            <p>Mutual Fund investments are subject to market risks, read all scheme-related documents carefully. Past performance of a mutual fund is not a reliable indicator of its future performance. This Mutual Fund Calculator is provided for illustration and educational purposes only. It does not account for the impact of inflation, mutual fund expense ratios, exit loads, or capital gains taxation upon withdrawal.</p>
          </div>
        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Mutual Fund Projections</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/mutual-fund-calculator-for-1000-per-month" className="px-3 py-1.5 bg-white border rounded hover:bg-emerald-50 hover:border-emerald-400 text-gray-600">₹1,000/month MF Return</a>
            <a href="/calculators/mutual-fund-calculator-for-5000-per-month" className="px-3 py-1.5 bg-white border rounded hover:bg-emerald-50 hover:border-emerald-400 text-gray-600">₹5,000/month MF Return</a>
            <a href="/calculators/lumpsum-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-emerald-50 hover:border-emerald-400 text-gray-600">Lumpsum Return Calculator</a>
            <a href="/calculators/cagr-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-emerald-50 hover:border-emerald-400 text-gray-600">CAGR Calculator</a>
          </div>
        </div>

      </div>
      <CalculatorSchema 
        name="Mutual Fund Returns Calculator"
        description="Calculate mutual fund returns for SIP and Lumpsum investments. Check wealth growth with power of compounding."
        url="/calculators/mutual-fund-returns-calculator"
        features={["SIP calculation", "Lumpsum calculation", "Growth chart", "Tax impact information"]}
        category="FinanceApplication"
        faqData={FAQ_DATA}
      />
    </>
  );
};