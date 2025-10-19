import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, PieChart, Calendar, Info, ExternalLink } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

// Inject FAQ schema for Google EEAT, rich snippets
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is EMI calculated in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EMI is calculated using the reducing balance method: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P = principal, R = monthly interest rate, N = tenure in months. Use this EMI calculator for instant and accurate results."
        }
      },
      {
        "@type": "Question",
        "name": "Is this EMI calculator suitable for home, car, and personal loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this EMI calculator works for all types of loans in India: home, car, personal, education, gold, and business loans."
        }
      },
      {
        "@type": "Question",
        "name": "Can I manually enter loan amount, interest rate, or tenure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can enter or adjust any value to get a personalized EMI calculation. All results are updated instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What is the benefit of using an EMI calculator before taking a loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It helps you plan monthly cashflow, compare loan offers, check affordability, and avoid over-borrowing. It also helps you see the total interest and payment schedule."
        }
      },
      {
        "@type": "Question",
        "name": "Does this calculator show a year-wise EMI breakup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you get a detailed yearly schedule showing principal, interest paid, and outstanding balance for each year."
        }
      },
      {
        "@type": "Question",
        "name": "Does it support prepayment calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can enter a prepayment amount to see the effect on EMI, interest, and tenure."
        }
      },
      {
        "@type": "Question",
        "name": "What are the pros and cons of EMI loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pros: Easy budgeting, affordable purchases, helps build credit. Cons: High total interest, risk of missed payments, possible prepayment penalties."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I check the latest loan rates and RBI guidelines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For official information, visit the RBI website (https://rbi.org.in/) and compare rates on portals like BankBazaar and PaisaBazaar."
        }
      }
    ]
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
  return () => { document.head.removeChild(script); };
};

// SEO is handled globally by SEOHelmet at the page level
const SEO = () => null;

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [breakup, setBreakup] = useState<{ principal: number; interest: number }[]>([]);

  // Manual input states
  const [manualLoanAmount, setManualLoanAmount] = useState<string>(loanAmount.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualLoanTenure, setManualLoanTenure] = useState<string>(loanTenure.toString());
  const [prepayment, setPrepayment] = useState<number>(0);
  const [showProsCons, setShowProsCons] = useState<boolean>(false);

  useEffect(() => {
    injectSchema();
  }, []);

  useEffect(() => {
    let tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    let adjustedLoanAmount = loanAmount;
    // If prepayment is made at the start
    if (prepayment > 0 && prepayment < loanAmount) {
      adjustedLoanAmount = loanAmount - prepayment;
    }
    const calculatedEmi = calculateEMI(adjustedLoanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths + (loanAmount - adjustedLoanAmount);
    const interestAmount = totalAmount - loanAmount;

    setEmi(calculatedEmi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
    setBreakup(calculateLoanBreakup(adjustedLoanAmount, interestRate, tenureInMonths));
  }, [loanAmount, interestRate, loanTenure, tenureType, prepayment]);

  // Update slider values when manual inputs change
  const handleManualLoanAmountChange = (value: string) => {
    setManualLoanAmount(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue >= 10000 && numValue <= 10000000) {
      setLoanAmount(numValue);
    }
  };

  const handleManualInterestRateChange = (value: string) => {
    setManualInterestRate(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 20) {
      setInterestRate(numValue);
    }
  };

  const handleManualLoanTenureChange = (value: string) => {
    setManualLoanTenure(value);
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue)) {
      const min = tenureType === 'years' ? 1 : 1;
      const max = tenureType === 'years' ? 30 : 360;
      if (numValue >= min && numValue <= max) {
        setLoanTenure(numValue);
      }
    }
  };

  useEffect(() => {
    setManualLoanAmount(loanAmount.toString());
    setManualInterestRate(interestRate.toString());
    setManualLoanTenure(loanTenure.toString());
  }, [loanAmount, interestRate, loanTenure]);

  // EMI Pros and Cons Content
  const emiProsCons = (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <h3 className="text-lg font-semibold text-primary-900 mb-2">EMI: Advantages and Disadvantages (2025)</h3>
      <ul className="list-disc list-inside text-primary-800 text-sm mb-2">
        <li><b>Pros:</b> Easy to plan budgets, affordable home or car purchase, helps in credit building, flexibility in repayment.</li>
        <li><b>Cons:</b> Total interest increases with long tenures, risk of over-borrowing, penalty on missed payments, possible prepayment charges.</li>
      </ul>
      <p className="text-xs text-neutral-600">
        For official guidance, see 
        <a href="https://www.rbi.org.in/Scripts/FAQView.aspx?Id=97" target="_blank" rel="noopener noreferrer" className="underline text-primary-700 ml-1">RBI EMI FAQ <ExternalLink className="w-3 h-3 inline" /></a>
      </p>
    </div>
  );

  return (
    <>
      <SEO />
      <div className="mx-auto max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          EMI Calculator India 2025 - Home, Car, Personal Loan, Chart, FAQ, Prepayment
        </h1>
        <meta itemProp="description" content="India's #1 EMI calculator for home, car, personal loans. Accurate, instant results, prepayment, full breakup, chart, FAQ, pros and cons, and RBI links. EEAT, Google SEO, and 2025 compliant." />
        {/* Left Side - Inputs */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-primary-600" />
            Loan Details
          </h2>
          <div className="space-y-4">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="loan-amount" className="text-sm font-medium text-neutral-700">
                  Loan Amount (₹)
                </label>
                <div className="flex items-center">
                  <span className="text-sm text-neutral-500 mr-2">
                    {formatCurrency(loanAmount)}
                  </span>
                  <input
                    type="number"
                    value={manualLoanAmount}
                    onChange={(e) => handleManualLoanAmountChange(e.target.value)}
                    className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                    min="10000"
                    max="10000000"
                    step="10000"
                  />
                </div>
              </div>
              <input
                type="range"
                id="loan-amount"
                min="10000"
                max="10000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹10K</span>
                <span>₹1Cr</span>
              </div>
            </div>
            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                  Interest Rate (% p.a.)
                </label>
                <div className="flex items-center">
                  <span className="text-sm text-neutral-500 mr-2">
                    {interestRate.toFixed(2)}%
                  </span>
                  <input
                    type="number"
                    value={manualInterestRate}
                    onChange={(e) => handleManualInterestRateChange(e.target.value)}
                    className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                    min="5"
                    max="20"
                    step="0.05"
                  />
                </div>
              </div>
              <input
                type="range"
                id="interest-rate"
                min="5"
                max="20"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>5%</span>
                <span>20%</span>
              </div>
            </div>
            {/* Loan Tenure */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                  Loan Tenure
                </label>
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-2">
                    <button
                      className={`px-2 py-1 text-xs rounded-md ${tenureType === 'years' ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-600'}`}
                      onClick={() => setTenureType('years')}
                    >
                      Years
                    </button>
                    <button
                      className={`px-2 py-1 text-xs rounded-md ${tenureType === 'months' ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-600'}`}
                      onClick={() => setTenureType('months')}
                    >
                      Months
                    </button>
                  </div>
                  <input
                    type="number"
                    value={manualLoanTenure}
                    onChange={(e) => handleManualLoanTenureChange(e.target.value)}
                    className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                    min={tenureType === 'years' ? 1 : 1}
                    max={tenureType === 'years' ? 30 : 360}
                    step="1"
                  />
                </div>
              </div>
              <input
                type="range"
                id="loan-tenure"
                min={tenureType === 'years' ? '1' : '1'}
                max={tenureType === 'years' ? '30' : '360'}
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>{tenureType === 'years' ? '1 Year' : '1 Month'}</span>
                <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
              </div>
            </div>
            {/* Prepayment */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="prepayment" className="text-sm font-medium text-neutral-700">
                  Prepayment at Start (Optional)
                </label>
                <span className="text-sm text-neutral-500">{formatCurrency(prepayment)}</span>
              </div>
              <input
                type="range"
                id="prepayment"
                min="0"
                max={loanAmount}
                step="10000"
                value={prepayment}
                onChange={(e) => setPrepayment(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹0</span>
                <span>{formatCurrency(loanAmount)}</span>
              </div>
            </div>
          </div>
          {/* Loan Summary */}
          <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Loan Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(emi)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Payment</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalPayment)}</p>
              </div>
            </div>
            <button
              className="mt-4 text-xs underline text-primary-700 font-semibold"
              onClick={() => setShowProsCons(!showProsCons)}
              aria-expanded={showProsCons}
            >
              {showProsCons ? 'Hide Pros & Cons of EMI' : 'Show Pros & Cons of EMI'}
            </button>
            {showProsCons && emiProsCons}
          </div>
        </div>
        {/* Right Side - Charts and Table */}
        <div className="space-y-6">
          {/* Chart */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-primary-600" />
              Payment Breakup
            </h2>
            <div className="mt-4 h-64">
              <ResultChart
                data={[
                  { name: 'Principal', value: loanAmount, color: '#3b82f6' },
                  { name: 'Interest', value: totalInterest, color: '#f59e0b' }
                ]}
                centerText={`${formatCurrency(totalPayment)}\nTotal`}
              />
            </div>
          </div>
          {/* Yearly Breakup */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              Yearly EMI Breakup
            </h2>
            <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Principal Paid (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Interest Paid (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Outstanding (₹)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {breakup.map((year, index) => {
                    const yearlyPrincipal = year.principal;
                    const yearlyInterest = year.interest;
                    const remainingBalance = Math.max(0, loanAmount - breakup.slice(0, index + 1).reduce((a, b) => a + b.principal, 0));
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                        <td className="px-4 py-2 text-sm text-neutral-900">{index + 1}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyPrincipal)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyInterest)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(remainingBalance)}</td>
                           </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-neutral-500 mt-2">
              <b>Note:</b> Year-wise breakup is an approximation. For month-wise schedule, use our <a href="https://fincal.in/loan-amortization-schedule" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">Loan Amortization Calculator</a>.
            </div>
          </div>
          {/* FAQ Section */}
          <div className="bg-white p-6 rounded-lg border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <Info className="w-5 h-5 mr-2 text-primary-600" />
              EMI Calculator - Frequently Asked Questions (2025)
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">How is EMI calculated for a loan?</h3>
                <p className="text-neutral-600">
                  EMI is calculated using the reducing balance formula. See <a href="https://www.rbi.org.in/Scripts/FAQView.aspx?Id=97" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">RBI EMI FAQ <ExternalLink className="w-3 h-3 inline" /></a>.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Is this EMI calculator fit for all types of loans?</h3>
                <p className="text-neutral-600">
                  Yes, it's perfect for home, car, education, gold, business, and personal loans in India.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Can I reduce my EMI by prepaying?</h3>
                <p className="text-neutral-600">
                  Yes, prepaying reduces your principal and total interest. Check for any prepayment penalties with your lender.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">What is the latest home loan interest rate in India (2025)?</h3>
                <p className="text-neutral-600">
                  Most banks offer home loan rates between 8.5% and 10.5%. Compare rates on <a href="https://www.bankbazaar.com/home-loan-interest-rates.html" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">BankBazaar</a> and <a href="https://www.paisabazaar.com/home-loan-interest-rate/" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">PaisaBazaar</a>.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">What are the pros and cons of EMI loans?</h3>
                <p className="text-neutral-600">
                  EMI makes borrowing easy and affordable, but increases total interest over time. Always borrow responsibly.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Where can I compare latest loan rates?</h3>
                <p className="text-neutral-600">
                  Visit <a href="https://www.bankbazaar.com/home-loan-interest-rates.html" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">BankBazaar</a> or <a href="https://www.paisabazaar.com/home-loan-interest-rate/" target="_blank" rel="noopener noreferrer" className="underline text-primary-700">PaisaBazaar</a> for real-time loan rate comparison.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Does prepayment always help in saving interest?</h3>
                <p className="text-neutral-600">
                  Yes, prepayment reduces outstanding principal and future interest, but some lenders may charge a fee. Always check your loan terms.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Is EMI calculator free to use?</h3>
                <p className="text-neutral-600">
                  100% free, accurate, instant, and updated for all Indian loans in 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
                
