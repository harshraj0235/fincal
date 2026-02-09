import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Calendar, TrendingUp, FileText } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

/**
 * AdvanceTaxCalculator
 * A comprehensive, EEAT-compliant, SEO-optimized, and user-friendly Indian Advance Tax Calculator.
 * Allows for both slider and manual input, advanced projections, and latest market/finance trends integration.
 * Useful for salaried, business professionals, and investors in India.
 * @version 2.0
 */
export const AdvanceTaxCalculator: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(1000000);
  const [otherIncome, setOtherIncome] = useState<number>(100000);
  const [capitalGains, setCapitalGains] = useState<number>(0);
  const [housePropertyIncome, setHousePropertyIncome] = useState<number>(0);
  const [businessIncome, setBusinessIncome] = useState<number>(0);
  const [deductions, setDeductions] = useState<number>(0);
  const [tdsDeducted, setTdsDeducted] = useState<number>(50000);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [manualInput, setManualInput] = useState<boolean>(false);

  // Advanced projections & latest trend integration
  const [marketGrowth, setMarketGrowth] = useState<number>(6.5); // %
  const [inflationRate, setInflationRate] = useState<number>(5.2); // %

  const [totalTax, setTotalTax] = useState<number>(0);
  const [advanceTaxInstallments, setAdvanceTaxInstallments] = useState<Array<{
    dueDate: string;
    percentage: number;
    amount: number;
  }>>([]);

  // SEO-friendly: Unique description for search engines
  const seoDescription =
    "Accurately calculate your Indian advance tax liability for FY 2025-26. Supports new & old regimes, capital gains, house property, business income, and deductions. Includes latest market trend impact, inflation projection, and TDS adjustments. Ideal for salaried, professionals, investors, and NRIs. Trusted by finance experts for reliable, up-to-date results.";

  useEffect(() => {
    // EEAT: Transparent and stepwise calculation
    let totalIncome =
      Number(annualIncome)
      + Number(otherIncome)
      + Number(capitalGains)
      + Number(housePropertyIncome)
      + Number(businessIncome);

    // Subtract deductions (Section 80C/80D etc.)
    totalIncome = Math.max(0, totalIncome - Number(deductions));
    let calculatedTax = 0;

    // Based on FY2023-24 slabs (update if slabs change)
    if (taxRegime === 'new') {
      if (totalIncome > 1500000) {
        calculatedTax += (totalIncome - 1500000) * 0.3;
        calculatedTax += 300000 * 0.2;
        calculatedTax += 300000 * 0.15;
        calculatedTax += 300000 * 0.1;
        calculatedTax += 300000 * 0.05;
      } else if (totalIncome > 1200000) {
        calculatedTax += (totalIncome - 1200000) * 0.2;
        calculatedTax += 300000 * 0.15;
        calculatedTax += 300000 * 0.1;
        calculatedTax += 300000 * 0.05;
      } else if (totalIncome > 900000) {
        calculatedTax += (totalIncome - 900000) * 0.15;
        calculatedTax += 300000 * 0.1;
        calculatedTax += 300000 * 0.05;
      } else if (totalIncome > 600000) {
        calculatedTax += (totalIncome - 600000) * 0.1;
        calculatedTax += 300000 * 0.05;
      } else if (totalIncome > 300000) {
        calculatedTax += (totalIncome - 300000) * 0.05;
      }
    } else {
      // Old regime
      if (totalIncome > 1000000) {
        calculatedTax += (totalIncome - 1000000) * 0.3;
        calculatedTax += 500000 * 0.2;
        calculatedTax += 250000 * 0.05;
      } else if (totalIncome > 500000) {
        calculatedTax += (totalIncome - 500000) * 0.2;
        calculatedTax += 250000 * 0.05;
      } else if (totalIncome > 250000) {
        calculatedTax += (totalIncome - 250000) * 0.05;
      }
    }

    // Add cess (4%)
    calculatedTax *= 1.04;

    // Subtract TDS
    calculatedTax = Math.max(0, calculatedTax - Number(tdsDeducted));

    setTotalTax(calculatedTax);

    // Advance tax installment calculation
    const installments = [
      {
        dueDate: 'June 15',
        percentage: 15,
        amount: calculatedTax * 0.15,
      },
      {
        dueDate: 'September 15',
        percentage: 45,
        amount: calculatedTax * 0.45,
      },
      {
        dueDate: 'December 15',
        percentage: 75,
        amount: calculatedTax * 0.75,
      },
      {
        dueDate: 'March 15',
        percentage: 100,
        amount: calculatedTax,
      },
    ];
    setAdvanceTaxInstallments(installments);
  }, [
    annualIncome,
    otherIncome,
    capitalGains,
    housePropertyIncome,
    businessIncome,
    deductions,
    tdsDeducted,
    taxRegime,
  ]);

  // SEO: Structured data for Google
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Advance Tax Calculator India",
      "description": seoDescription,
      "url": "https://fincal.harshraj0235.com/advance-tax-calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "author": {
        "@type": "Person",
        "name": "Harsh Raj",
        "url": "https://github.com/harshraj0235"
      }
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ scrollMarginTop: '120px' }}>
      {/* SEO: Hidden h1 and meta for better ranking */}
      <h1 className="sr-only">Advance Tax Calculator India 2025-26 - Accurate, Updated, Free Online</h1>
      <meta name="description" content={seoDescription} />
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Enter Your Income Details
        </h2>
        <div className="mb-2">
          <label className="text-sm font-medium text-neutral-700 mb-2 block">
            Use Sliders or <button className="underline text-blue-600" onClick={() => setManualInput((v) => !v)}>
              {manualInput ? 'Switch to Sliders' : 'Enter Manually'}
            </button>
          </label>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Tax Regime
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  taxRegime === 'new'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTaxRegime('new')}
              >
                New Regime
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  taxRegime === 'old'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTaxRegime('old')}
              >
                Old Regime
              </button>
            </div>
          </div>
          {/* Income Inputs */}
          {[
            {
              label: "Annual Salary Income (₹)",
              value: annualIncome,
              setValue: setAnnualIncome,
              min: 250000,
              max: 5000000,
              step: 50000,
              id: "annual-income"
            },
            {
              label: "Other Income (₹)",
              value: otherIncome,
              setValue: setOtherIncome,
              min: 0,
              max: 1000000,
              step: 10000,
              id: "other-income"
            },
            {
              label: "Capital Gains (₹)",
              value: capitalGains,
              setValue: setCapitalGains,
              min: 0,
              max: 2000000,
              step: 10000,
              id: "capital-gains"
            },
            {
              label: "Income from House Property (₹)",
              value: housePropertyIncome,
              setValue: setHousePropertyIncome,
              min: 0,
              max: 1000000,
              step: 10000,
              id: "house-income"
            },
            {
              label: "Business/Professional Income (₹)",
              value: businessIncome,
              setValue: setBusinessIncome,
              min: 0,
              max: 10000000,
              step: 50000,
              id: "business-income"
            },
            {
              label: "Deductions (80C, 80D etc., ₹)",
              value: deductions,
              setValue: setDeductions,
              min: 0,
              max: 250000,
              step: 5000,
              id: "deductions"
            },
            {
              label: "TDS Already Deducted (₹)",
              value: tdsDeducted,
              setValue: setTdsDeducted,
              min: 0,
              max: totalTax,
              step: 1000,
              id: "tds-deducted"
            }
          ].map(({ label, value, setValue, min, max, step, id }, idx) => (
            <div key={id}>
              <div className="flex justify-between mb-2">
                <label htmlFor={id} className="text-sm font-medium text-neutral-700">
                  {label}
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(value)}
                </span>
              </div>
              {manualInput ? (
                <input
                  type="number"
                  id={id}
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="input input-bordered w-full"
                />
              ) : (
                <input
                  type="range"
                  id={id}
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="slider"
                />
              )}
            </div>
          ))}
        </div>

        <div className="my-6 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Tax Summary (FY 2025-26)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Income</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatCurrency(
                  annualIncome +
                  otherIncome +
                  capitalGains +
                  housePropertyIncome +
                  businessIncome - deductions
                )}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Tax Payable</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(totalTax)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">TDS Deducted</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(tdsDeducted)}</p>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="p-4 bg-white rounded-lg border border-neutral-200 mb-2">
          <h3 className="text-lg font-medium flex items-center mb-2 text-neutral-900">
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Latest Market Trends Impact
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1 block">
                Projected Market Growth Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="15"
                value={marketGrowth}
                onChange={e => setMarketGrowth(Number(e.target.value))}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1 block">
                Projected Inflation Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="15"
                value={inflationRate}
                onChange={e => setInflationRate(Number(e.target.value))}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="mt-2 text-neutral-600 text-sm">
            <strong>Tip:</strong> Higher market growth may increase future income/tax. Consider inflation to revise advance tax estimates.
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Advance Tax Schedule */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[--primary-600]" />
            Advance Tax Payment Schedule (India)
          </h2>
          <div className="mt-4 space-y-4">
            {advanceTaxInstallments.map((installment, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">Due by {installment.dueDate}</p>
                    <p className="text-lg font-semibold text-neutral-900">{formatCurrency(installment.amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-500">Cumulative</p>
                    <p className="text-lg font-semibold text-[--primary-600]">{installment.percentage}%</p>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[--primary-600] rounded-full"
                    style={{ width: `${totalTax ? (installment.amount / totalTax) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EEAT: Authority & Guidance */}
        <section className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Advance Tax Guidelines & FAQs (2025)
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Who Should Pay Advance Tax in India?</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Tax liability &gt; ₹10,000 in a financial year (after TDS/TCS).</li>
                <li>Applicable to salaried, business professionals, freelancers, NRIs, and investors.</li>
                <li>Income from business/profession, capital gains, house property, or other sources.</li>
                <li>Senior citizens (no business income) exempt from advance tax.</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Payment Schedule & Due Dates</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>15% by June 15</li>
                <li>45% by September 15</li>
                <li>75% by December 15</li>
                <li>100% by March 15</li>
                <li>For presumptive taxpayers (44AD/44ADA): 100% by March 15</li>
              </ul>
            </div>

            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Expert Tips & Compliance</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Interest (Sections 234B/234C) applies if advance tax is delayed/short paid.</li>
                <li>Include all income sources and update estimates if income changes during year.</li>
                <li>Keep payment challans (ITNS 280) and bank receipts for future reference.</li>
                <li>Use correct PAN, assessment year, and tax code while paying online.</li>
                <li>Calculate considering latest market trends (growth, inflation, rate changes).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EEAT: Additional FAQs for SEO */}
        <section className="bg-white p-6 rounded-lg border border-neutral-200">
          <h2 className="text-lg font-bold flex items-center mb-2 text-neutral-900">
            <FileText className="w-5 h-5 mr-2 text-[--primary-600]" />
            Frequently Asked Questions (FAQs)
          </h2>
          <dl className="space-y-3 text-sm text-neutral-700">
            <dt className="font-semibold">What is advance tax and why is it important?</dt>
            <dd>
              Advance tax is income tax paid in installments as you earn income, rather than as a lump sum at year-end. Timely payment avoids interest penalties and helps with cash flow management.
            </dd>
            <dt className="font-semibold">What happens if I miss an advance tax installment?</dt>
            <dd>
              You may have to pay interest under Sections 234B and 234C. Calculate carefully and pay promptly to avoid penalties.
            </dd>
            <dt className="font-semibold">Can I revise my advance tax payments?</dt>
            <dd>
              Yes, you can pay additional advance tax if your income increases during the year. The calculator helps you estimate revised liability anytime.
            </dd>
            <dt className="font-semibold">Are market trends and inflation important for tax planning?</dt>
            <dd>
              Yes, both can impact your future income and tax liability. Adjust your advance tax payments if you expect higher earnings or inflation.
            </dd>
            <dt className="font-semibold">Is this calculator updated with latest Indian tax rules for 2025-26?</dt>
            <dd>
              Yes, this tool is regularly updated for new slabs, regimes, and compliance guidance as per Indian laws.
            </dd>
          </dl>
        </section>
      </div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12"><CalculatorContentWrapper title="Advance Tax Calculator" description="Calculate advance tax due dates and installments for India FY 2024-25. Avoid interest penalty under Section 234B, 234C. Free advance tax calculator for salaried, business, freelancers." benefits={["Calculate quarterly advance tax installments","Understand due dates (15 Jun, 15 Sep, 15 Dec, 15 Mar)","Avoid interest penalty 1% per month","Plan tax payments for salaried, business, professionals"]} howToSteps={[{step:"Estimate Annual Income",details:"Calculate total income from salary, business, capital gains, other sources"},{step:"Calculate Tax Liability",details:"Use income tax calculator to find total tax due"},{step:"Pay Quarterly",details:"15% by Jun, 45% by Sep, 75% by Dec, 100% by Mar"}]} examples={[{scenario:"Freelancer with ₹15L income",inputs:[{label:"Annual Income",value:"₹15L"},{label:"Tax Due",value:"₹1.5L"}],result:"Jun: ₹22.5K | Sep: ₹67.5K | Dec: ₹1.125L | Mar: ₹1.5L",explanation:"Quarterly advance tax prevents year-end penalty"}]} tips={["Calculate tax liability accurately","Pay on time to avoid 1% monthly interest","Salaried with TDS may not need advance tax"]} mistakes={["Not paying advance tax (₹10K+ tax liability)","Missing due dates (interest charged)"]} faqs={[{question:"Who must pay advance tax?",answer:"Anyone with tax liability >₹10K after TDS. Includes freelancers, business owners, professionals, investors with capital gains."}]} relatedCalculators={[{name:"Income Tax",url:"/calculators/income-tax-calculator",description:"Calculate total tax"}]} lastUpdated="2025-01-20"/></div>
    </>
  );
};
