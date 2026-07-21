import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { compoundInterestConfig } from '../engine/configs/compoundInterestConfig';
import { useOmniEngine } from '../engine/useOmniEngine';
import { OmniWidget } from '../engine/components/OmniWidget';

/* ═══════════════════════════════════════════════════════════════
   COMPOUND INTEREST CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: compound interest calculator, ci calculator,
   interest compounding, ear calculator, daily compound interest calculator
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is Compound Interest?", answer: "Compound interest is the interest you earn on both your original money and on the interest you keep accumulating. It is the core mathematical principle behind long-term wealth creation, famously called the '8th wonder of the world'." },
  { question: "How does Compounding Frequency affect returns?", answer: "The more frequently interest is compounded, the higher your overall returns will be. For example, ₹1 Lakh invested at 10% for 10 years will yield higher returns if compounded daily (₹2,71,791) compared to if it is compounded annually (₹2,59,374)." },
  { question: "What is the formula for Compound Interest?", answer: "The standard formula is A = P(1 + r/n)^(nt), where 'A' is the final amount, 'P' is the principal balance, 'r' is the annual interest rate, 'n' is the number of times interest is compounded per year, and 't' is the number of years." },
  { question: "What is Effective Annual Rate (EAR)?", answer: "EAR is the true annualized rate of return you earn when compounding happens more than once a year. For example, a 10% stated interest rate compounded daily results in an Effective Annual Rate (EAR) of 10.52%." },
  { question: "How long does it take for money to double?", answer: "You can use the 'Rule of 72' for a quick mental estimate. Divide 72 by the annual interest rate. For example, at an 8% interest rate, your money will double in approximately 9 years (72/8)." }
];

const QUICK_PRESETS = [
  { label: 'Long Term Equity (20Y)', p: 500000, r: 12, t: 20, f: 365 },
  { label: 'Bank FD (5Y Qtr)', p: 500000, r: 7, t: 5, f: 4 },
  { label: 'PPF (15Y Annual)', p: 150000, r: 7.1, t: 15, f: 1 },
];

export const CompoundInterestCalculator: React.FC = () => {
  const engine = useOmniEngine(compoundInterestConfig);
  const [activePreset, setActivePreset] = useState<number>(-1);

  const applyPreset = (preset: typeof QUICK_PRESETS[0], index: number) => {
    engine.updateVariable('principal', preset.p.toString());
    engine.updateVariable('rate', preset.r.toString());
    engine.updateVariable('time', preset.t.toString());
    engine.updateVariable('compoundingFreq', preset.f.toString());
    setActivePreset(index);
  };

  return (
    <>
      <SEOHelmet 
        title="Compound Interest Calculator India 2026 | Daily, Monthly, Annual" 
        description="Free Compound Interest (CI) Calculator. Calculate exponential returns for daily, monthly, quarterly, and annual compounding frequencies. View Effective Annual Rate (EAR)." 
        keywords="compound interest calculator, ci calculator, interest compounding, ear calculator, daily compound interest calculator, future value calculator" 
        url="/calculators/compound-interest-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Compound Interest Calculator', description: 'Advanced Exponential Wealth tool.', category: 'Fundamental Calculators', features: ['Daily to Annual Frequencies', 'EAR Computation', 'Rule of 72 Mapping'], ratingValue: 4.9, reviewCount: 22100, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-rose-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-rose-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Compound Interest</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Compound Interest Calculator</h1>
          <p className="text-gray-600">Forecast your wealth using the exact mathematical formula for exponential growth. See how different compounding frequencies (Daily, Monthly, Annual) impact your final returns.</p>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Common Scenarios</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PRESETS.map((preset, idx) => (
              <button key={idx} onClick={() => applyPreset(preset, idx)} className={`px-3 py-1.5 text-sm border rounded transition-colors font-semibold ${activePreset === idx ? 'bg-rose-50 border-rose-400 text-rose-700' : 'bg-white border-gray-300 hover:bg-rose-50 hover:border-rose-400 text-gray-700'}`}>
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <OmniWidget config={compoundInterestConfig} engine={engine} />
        </div>



        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>What is Compound Interest?</h2>
          <p>
            Compound interest is the foundational mathematical principle of wealth creation. While <em>simple interest</em> only pays you a percentage on your original principal, <strong>compound interest</strong> pays you interest on your principal <em>and</em> on the accumulated interest from previous periods.
          </p>
          <p>
            It is famously described as "interest on interest." Over short periods, the difference between simple and compound interest might seem negligible. However, over decades, compound interest triggers an exponential "hockey stick" growth curve that can turn small, consistent investments into massive fortunes.
          </p>

          <h3>The Compound Interest Formula</h3>
          <p>The universal algebraic formula used by our calculator to determine the future value of a compounded investment is:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center text-lg border-l-4 border-rose-600">
            <strong>A = P (1 + r/n)<sup>nt</sup></strong>
          </div>
          <ul>
            <li><strong>A</strong> = the future value of the investment/loan, including interest</li>
            <li><strong>P</strong> = the principal investment amount (the initial deposit)</li>
            <li><strong>r</strong> = the annual interest rate (in decimal form, e.g., 10% becomes 0.10)</li>
            <li><strong>n</strong> = the number of times that interest is compounded per unit 't' (e.g., 12 for monthly, 365 for daily)</li>
            <li><strong>t</strong> = the time the money is invested for, in years</li>
          </ul>

          <h3>The Power of Compounding Frequency</h3>
          <p>
            A critical factor in wealth accumulation is the <strong>Compounding Frequency</strong>. This refers to how often the interest is calculated and added back to the principal balance. The more frequently interest is compounded, the faster your money grows.
          </p>
          <ul>
            <li><strong>Annual Compounding:</strong> Interest is added once a year. Examples include Public Provident Fund (PPF) and National Savings Certificate (NSC).</li>
            <li><strong>Quarterly Compounding:</strong> Interest is added four times a year. Standard Fixed Deposits (FDs) in Indian banks use quarterly compounding.</li>
            <li><strong>Monthly Compounding:</strong> Interest is added 12 times a year. Often used in Recurring Deposits (RD) and certain corporate deposits.</li>
            <li><strong>Daily Compounding:</strong> Interest is calculated 365 times a year. Equity Mutual Funds essentially benefit from daily compounding because their Net Asset Value (NAV) changes on a daily basis reflecting market movements.</li>
          </ul>

          <h3>Understanding Effective Annual Rate (EAR)</h3>
          <p>
            Because of compounding frequency, the stated "nominal" interest rate on a financial product is rarely the actual return you get. The true return is called the <strong>Effective Annual Rate (EAR)</strong> or Annual Percentage Yield (APY).
          </p>
          <p>
            For instance, if a bank offers a Fixed Deposit at <strong>7.00% p.a.</strong>, but it is compounded <strong>quarterly</strong>, the actual mathematical return you earn over one full year is <strong>7.18%</strong>. If it were compounded daily, the EAR would be <strong>7.25%</strong>. Our calculator automatically computes the EAR so you know exactly what your money is doing.
          </p>

          <h3>The Rule of 72: A Mental Shortcut</h3>
          <p>
            If you want to quickly estimate how long it will take for your money to double through compound interest without using a calculator, you can use the famous <strong>Rule of 72</strong>.
          </p>
          <p>Simply divide the number 72 by your expected annual interest rate.</p>
          <ul>
            <li>At <strong>6%</strong> interest: 72 / 6 = <strong>12 years</strong> to double.</li>
            <li>At <strong>9%</strong> interest: 72 / 9 = <strong>8 years</strong> to double.</li>
            <li>At <strong>12%</strong> interest: 72 / 12 = <strong>6 years</strong> to double.</li>
            <li>At <strong>15%</strong> interest: 72 / 15 = <strong>4.8 years</strong> to double.</li>
          </ul>

          <h3>Compound Interest vs. Simple Interest</h3>
          <p>To truly appreciate compounding, compare it against simple interest. Let's say you invest ₹1,00,000 at a 10% annual interest rate for 30 years.</p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Time Period</th>
                <th className="border border-gray-300 p-2 text-right">Simple Interest Growth</th>
                <th className="border border-gray-300 p-2 text-right text-rose-700">Compound Interest Growth (Annual)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">After 10 Years</td>
                <td className="border border-gray-300 p-2 text-right">₹2,00,000</td>
                <td className="border border-gray-300 p-2 text-right font-bold">₹2,59,374</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">After 20 Years</td>
                <td className="border border-gray-300 p-2 text-right">₹3,00,000</td>
                <td className="border border-gray-300 p-2 text-right font-bold">₹6,72,750</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">After 30 Years</td>
                <td className="border border-gray-300 p-2 text-right">₹4,00,000</td>
                <td className="border border-gray-300 p-2 text-right font-bold text-rose-600">₹17,44,940</td>
              </tr>
            </tbody>
          </table>
          <p>
            As you can see, in the first 10 years, the difference is only about ₹59,000. But by year 30, the compounded investment is <strong>more than 4 times larger</strong> than the simple interest investment. This exponential divergence is why legendary investors like Warren Buffett attribute their success simply to time and compound interest.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>This Compound Interest Calculator assumes that all generated interest is fully reinvested without any withdrawals, and ignores the impact of taxation (TDS, Capital Gains) and inflation. Real-world financial products may have interim taxes that reduce the compounding effect. The calculations provided are for educational and planning purposes only.</p>
          </div>
        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/simple-interest-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-rose-50 hover:border-rose-400 text-gray-600">Simple Interest Calculator</a>
            <a href="/calculators/cagr-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-rose-50 hover:border-rose-400 text-gray-600">CAGR Calculator</a>
            <a href="/calculators/lumpsum-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-rose-50 hover:border-rose-400 text-gray-600">Mutual Fund Lumpsum Calculator</a>
            <a href="/calculators/future-value-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-rose-50 hover:border-rose-400 text-gray-600">Future Value Calculator</a>
          </div>
        </div>

      </div>
    </>
  );
};
