import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, Wallet, PieChart, Info, ShieldCheck, BarChart3, ExternalLink } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

// SEO/FAQ Schema injection for Google EEAT & FAQ
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is savings account interest calculated in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Savings account interest in India is calculated on the daily closing balance and credited quarterly as per RBI guidelines. This Calculator uses the latest RBI and industry trends for accurate results."
        }
      },
      {
        "@type": "Question",
        "name": "What are the latest savings account interest rates in India (2025)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Interest rates in 2025 typically range from 2.5% to 7% p.a., depending on the bank and account type. Check your bank's website for the latest rates and special offers."
        }
      },
      {
        "@type": "Question",
        "name": "Can I manually enter interest rates and balances?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Calculator allows you to manually enter your average balance, interest rate, and duration for custom calculations."
        }
      },
      {
        "@type": "Question",
        "name": "What are some high-interest savings options in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some banks and fintechs in India offer high-interest savings accounts (up to 7%) and sweep-in FD options. Refer to RBI's list of scheduled banks and compare rates at authentic portals like MoneyControl or BankBazaar."
        }
      },
      {
        "@type": "Question",
        "name": "Is the maturity amount taxable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, interest earned above ₹40,000 (₹50,000 for senior citizens) per annum is subject to TDS. Declare interest income in your ITR as per Indian tax rules."
        }
      }
    ]
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
  return () => { document.head.removeChild(script); };
};

// SEO is handled globally by SEOHelmet at the page level
const SEO = () => null;

export const SavingsAccountCalculator: React.FC = () => {
  // Inputs
  const [averageBalance, setAverageBalance] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [calculationPeriod, setCalculationPeriod] = useState<number>(12);
  const [minimumBalance, setMinimumBalance] = useState<number>(10000);
  const [manualAverage, setManualAverage] = useState<string>('100000');
  const [manualRate, setManualRate] = useState<string>('3.5');
  const [manualPeriod, setManualPeriod] = useState<string>('12');
  const [manualMin, setManualMin] = useState<string>('10000');
  const [monthlyInterest, setMonthlyInterest] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [finalBalance, setFinalBalance] = useState<number>(0);

  // Data for advanced features
  const [taxable, setTaxable] = useState<boolean>(false);
  const [tds, setTds] = useState<number>(0);

  // Use effect for SEO/FAQ Schema
  useEffect(() => {
    injectSchema();
  }, []);

  // Interest calculation (compounded quarterly as per RBI)
  useEffect(() => {
    const quarterlyRate = interestRate / 4 / 100;
    const quarters = calculationPeriod / 3;
    let balance = averageBalance;
    let totalInt = 0;
    for (let i = 0; i < quarters; i++) {
      const quarterlyInterest = balance * quarterlyRate;
      totalInt += quarterlyInterest;
      balance += quarterlyInterest;
    }
    setMonthlyInterest(totalInt / calculationPeriod);
    setTotalInterest(totalInt);
    setFinalBalance(averageBalance + totalInt);

    // Taxability
    setTaxable(totalInt > 40000);
    setTds(totalInt > 40000 ? (totalInt - 40000) * 0.1 : 0);
  }, [averageBalance, interestRate, calculationPeriod, minimumBalance]);

  // Manual input handler for all fields
  const handleManualInput = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string,
    min: number,
    max: number,
    setManual: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let num = Number(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;
    setter(num);
    setManual(value);
    return String(num);
  };

  return (
    <>
      <SEO />
      <div className="mx-auto max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          Best Savings Account Calculator India 2025 - Compare Interest, Tax & More
        </h1>
        <meta itemProp="description" content="Calculate your savings account interest with India's most accurate and advanced calculator. Includes manual entry, latest rates, taxability, FAQs, authentic links, and more. Updated for 2025 with RBI guidelines." />
        {/* Left - User Inputs */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Wallet className="w-5 h-5 mr-2 text-[--primary-600]" />
            Savings Account Details
          </h2>
          <div className="space-y-4">
            {/* Average Monthly Balance */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="average-balance" className="text-sm font-medium text-neutral-700">
                  Average Monthly Balance (₹)
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(averageBalance)}
                </span>
              </div>
              <input
                type="range"
                id="average-balance"
                min="0"
                max="1000000"
                step="5000"
                value={averageBalance}
                onChange={(e) => {
                  setAverageBalance(Number(e.target.value));
                  setManualAverage(e.target.value);
                }}
                className="slider"
              />
              <input
                type="text"
                className="border mt-2 px-2 py-1 rounded w-full"
                value={manualAverage}
                onChange={e =>
                  setManualAverage(
                    handleManualInput(setAverageBalance, e.target.value, 0, 1000000, setManualAverage)
                  )
                }
                aria-label="Manual Average Monthly Balance"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                  Interest Rate (% p.a.)
                </label>
                <span className="text-sm text-neutral-500">{interestRate}%</span>
              </div>
              <input
                type="range"
                id="interest-rate"
                min="2.5"
                max="7"
                step="0.1"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(Number(e.target.value));
                  setManualRate(e.target.value);
                }}
                className="slider"
              />
              <input
                type="text"
                className="border mt-2 px-2 py-1 rounded w-full"
                value={manualRate}
                onChange={e =>
                  setManualRate(
                    handleManualInput(setInterestRate, e.target.value, 2.5, 7, setManualRate)
                  )
                }
                aria-label="Manual Interest Rate"
                inputMode="decimal"
                pattern="[0-9.]*"
              />
            </div>
            {/* Calculation Period */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="calculation-period" className="text-sm font-medium text-neutral-700">
                  Calculation Period (Months)
                </label>
                <span className="text-sm text-neutral-500">{calculationPeriod} months</span>
              </div>
              <input
                type="range"
                id="calculation-period"
                min="1"
                max="36"
                value={calculationPeriod}
                onChange={(e) => {
                  setCalculationPeriod(Number(e.target.value));
                  setManualPeriod(e.target.value);
                }}
                className="slider"
              />
              <input
                type="text"
                className="border mt-2 px-2 py-1 rounded w-full"
                value={manualPeriod}
                onChange={e =>
                  setManualPeriod(
                    handleManualInput(setCalculationPeriod, e.target.value, 1, 36, setManualPeriod)
                  )
                }
                aria-label="Manual Calculation Period"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {/* Minimum Balance */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="minimum-balance" className="text-sm font-medium text-neutral-700">
                  Minimum Balance Required (₹)
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(minimumBalance)}
                </span>
              </div>
              <input
                type="range"
                id="minimum-balance"
                min="0"
                max="25000"
                step="1000"
                value={minimumBalance}
                onChange={(e) => {
                  setMinimumBalance(Number(e.target.value));
                  setManualMin(e.target.value);
                }}
                className="slider"
              />
              <input
                type="text"
                className="border mt-2 px-2 py-1 rounded w-full"
                value={manualMin}
                onChange={e =>
                  setManualMin(
                    handleManualInput(setMinimumBalance, e.target.value, 0, 25000, setManualMin)
                  )
                }
                aria-label="Manual Minimum Balance"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
          </div>
          {/* Interest Results */}
          <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Interest Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Monthly Interest</p>
                <p className="text-xl font-bold text-[--success-600]">{formatCurrency(monthlyInterest)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
                <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Final Balance</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(finalBalance)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Tax Deducted (TDS)</p>
                <p className="text-xl font-bold text-[--error-600]">{taxable ? formatCurrency(tds) : "₹0"}</p>
              </div>
            </div>
            {taxable && (
              <div className="mt-2 text-xs text-[--error-700]">
                Interest above ₹40,000 is taxable as per Indian Income Tax Act. TDS at 10% is deducted if PAN is submitted.
              </div>
            )}
          </div>
        </div>
        {/* Right - Features & FAQs */}
        <div className="space-y-6">
          {/* Chart */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
              Balance Breakup
            </h2>
            <div className="mt-4 h-64">
              <ResultChart
                data={[
                  { name: "Principal", value: averageBalance, color: "#3b82f6" },
                  { name: "Interest Earned", value: totalInterest, color: "#22c55e" }
                ]}
                centerText={`${formatCurrency(finalBalance)}\nTotal Value`}
              />
            </div>
          </div>
          {/* Advanced Features & Info */}
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
              Key Features & Information
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1 text-[--primary-600]" />
                  Latest Market Insights (2025)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                  <li>Wide variation in savings rates: Digital banks & small finance banks offer up to 7% p.a. (as of July 2025).</li>
                  <li>Auto-sweep and flexi-deposit features are trending for maximizing yield.</li>
                  <li>Zero-balance savings accounts are popular among students, NRIs, and gig workers.</li>
                  <li>Fintechs and neobanks now provide additional cashback/rewards for digital spends.</li>
                  <li>Senior citizens and women-centric accounts get preferential rates.</li>
                  <li>
                    <a
                      href="https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12214"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[--primary-700] flex items-center"
                    >
                      RBI Master Circular on Interest Rates <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </li>
                  <li>
                    Compare rates at:{" "}
                    <a
                      href="https://www.moneycontrol.com/personal-finance/bank-deposit/savings-account-interest-rates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[--primary-700]"
                    >
                      MoneyControl Savings Rate Table <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-[--primary-600]" />
                  Account Safety & Eligibility
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                  <li>Deposits up to ₹5 lakh per customer are insured by DICGC (RBI subsidiary).</li>
                  <li>Accounts can be opened by residents, NRIs (NRE/NRO), minors, and senior citizens.</li>
                  <li>Biometric KYC and Video KYC available for instant account opening.</li>
                </ul>
              </div>
              <div className="p-4 bg-[--accent-50] rounded-lg">
                <h3 className="text-lg font-medium text-[--accent-900] mb-2">
                  Important Tax & Regulatory Notes
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                  <li>Interest up to ₹10,000 per year is exempt under Section 80TTA (₹50,000 for senior citizens under 80TTB).</li>
                  <li>Declare interest income in your ITR to avoid tax notice.</li>
                  <li>Non-maintenance of minimum balance attracts charges as per bank policy.</li>
                  <li>Check your bank's latest schedule for fees and charges.</li>
                </ul>
              </div>
            </div>
          </div>
          {/* FAQs for SEO/EEAT */}
          <div className="bg-white p-6 rounded-lg border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <Info className="w-5 h-5 mr-2 text-[--primary-600]" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  How is savings account interest calculated in India?
                </h3>
                <p className="text-neutral-600">
                  Interest is calculated on daily closing balance and credited quarterly as per <a href="https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12214" className="underline text-[--primary-700]" target="_blank" rel="noopener noreferrer">RBI rules</a>.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  What is the highest interest rate on savings accounts in 2025?
                </h3>
                 <p className="text-neutral-600">
                  As of July 2025, small finance and digital banks offer up to 7% p.a. Compare rates at <a href="https://www.moneycontrol.com/personal-finance/bank-deposit/savings-account-interest-rates" target="_blank" rel="noopener noreferrer" className="underline text-[--primary-700]">MoneyControl</a>.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  Is savings account interest taxable in India?
                </h3>
                <p className="text-neutral-600">
                  Yes, if total interest exceeds ₹40,000/year (₹50,000 for seniors), TDS applies. Claim exemption under Section 80TTA/80TTB if eligible.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  Can I enter my own rates and period?
                </h3>
                <p className="text-neutral-600">
                  Yes, you can manually enter custom balance, rate, period, and minimum balance for personalized calculation.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  How to maximize my savings account returns?
                </h3>
                <p className="text-neutral-600">
                  Maintain higher average balance, look for banks with higher rates, use auto-sweep features, and avoid penalty charges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
