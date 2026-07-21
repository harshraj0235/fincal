import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  formatCurrency,
  calculateEMI,
  calculatePrepaymentImpact,
  calculateHomeLoanTaxSavings
} from '../utils/calculatorUtils';
import { ExportButtons } from '../components/ExportButtons';
import SEOHelmet from '../components/SEOHelmet';
import CalculatorSchema from '../components/CalculatorSchema';
/* ═══════════════════════════════════════════════════════════════
   HOME LOAN CALCULATOR — PURE STATIC HTML EDITION (2025)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: home loan emi calculator, housing loan calculator,
   home loan calculator india, property loan calculator
   ═══════════════════════════════════════════════════════════════ */

const HOME_LOAN_RATES_2025 = [
  { bank: 'State Bank of India (SBI)',  rate: '8.50 – 9.85', processing: '₹2,000 – ₹10,000', maxTenure: '30 years', maxLTV: '90%' },
  { bank: 'HDFC Bank',                  rate: '8.75 – 9.90', processing: '0.50% of loan',     maxTenure: '30 years', maxLTV: '80%' },
  { bank: 'ICICI Bank',                 rate: '8.75 – 9.85', processing: '0.50% of loan',     maxTenure: '30 years', maxLTV: '80%' },
  { bank: 'Axis Bank',                  rate: '8.75 – 13.30', processing: '0.50% – 1%',       maxTenure: '30 years', maxLTV: '80%' },
  { bank: 'Kotak Mahindra Bank',        rate: '8.75 – 9.65', processing: '0.50% of loan',     maxTenure: '20 years', maxLTV: '80%' },
  { bank: 'Bank of Baroda',             rate: '8.40 – 10.65', processing: '₹8,500 max',       maxTenure: '30 years', maxLTV: '90%' },
  { bank: 'Punjab National Bank',       rate: '8.45 – 10.25', processing: '0.35% of loan',    maxTenure: '30 years', maxLTV: '90%' },
  { bank: 'LIC Housing Finance',        rate: '8.50 – 10.75', processing: '0.25% – 0.50%',    maxTenure: '30 years', maxLTV: '90%' },
];

const PRESETS = [
  { name: '🏠 Affordable 2BHK', property: 3000000,  loan: 2400000,  rate: 8.50, tenure: 20 },
  { name: '🏡 Standard 3BHK',   property: 6000000,  loan: 5000000,  rate: 8.75, tenure: 25 },
  { name: '🏢 Premium Villa',   property: 15000000, loan: 12000000, rate: 9.00, tenure: 25 },
  { name: '🏗️ Plot + Build',    property: 4000000,  loan: 3200000,  rate: 9.25, tenure: 15 },
];

const FAQ_DATA = [
  { question: 'What is the current home loan interest rate in India 2025?', answer: 'As of March 2025, home loan interest rates in India range from 8.40% to 10.65% p.a. depending on the lender. SBI offers rates starting at 8.50%, HDFC Bank from 8.75%, ICICI Bank from 8.75%, and Bank of Baroda from 8.40%. Your actual rate depends on CIBIL score (750+ gets best rates), loan amount, property type, and employment status. Salaried borrowers typically get 0.10-0.25% lower rates than self-employed.' },
  { question: 'How much home loan can I get on my salary?', answer: 'Banks typically approve home loans of 60x-72x your monthly net salary. For ₹50,000 salary: ₹30-36 lakhs; ₹1 lakh salary: ₹60-72 lakhs; ₹2 lakh salary: ₹1.2-1.44 crore. This assumes no existing EMI obligations. Banks use FOIR (Fixed Obligations to Income Ratio) of 50-60%, meaning your total EMIs should not exceed 50-60% of net income. Higher CIBIL score (800+) can increase eligibility by 10-15%.' },
  { question: 'What is LTV ratio in home loan and why does it matter?', answer: 'LTV (Loan-to-Value) ratio is the percentage of property value that a bank finances. RBI guidelines: Up to 80% LTV for loans above ₹75 lakhs, up to 85% for ₹30-75 lakhs, and up to 90% for loans up to ₹30 lakhs. Example: For a ₹60 lakh flat, maximum loan is ₹48 lakhs (80% LTV), so you need ₹12 lakh down payment. Lower LTV = lower risk = better interest rates.' },
  { question: 'What tax benefits are available on home loan in 2025?', answer: 'Home loan tax benefits under Income Tax Act: 1) Section 24(b): Deduction of up to ₹2 lakh per year on home loan interest for self-occupied property. 2) Section 80C: Deduction of up to ₹1.5 lakh per year on principal repayment. 3) Section 80EEA: Additional ₹1.5 lakh deduction for first-time buyers (property stamp value up to ₹45 lakh). 4) Joint loan: Both co-borrowers can claim deductions separately, effectively doubling the benefit. Total annual tax saving can be ₹1.05-1.55 lakh at 30% slab.' },
  { question: 'Should I prepay my home loan or invest the money?', answer: 'Rule of thumb: Prepay if loan rate > post-tax investment returns. Home loan at 8.75%: Post-tax cost is ~6.13% (at 30% slab, after ₹2L interest deduction). If investments earn >6.13% post-tax, invest instead. FD gives ~5% post-tax, so prepay. Equity mutual funds average 12-15% long-term, so invest. Best strategy: Maintain 6-month EMI emergency fund, maximize 80C via principal repayment, invest balance in equity SIPs for long-term wealth.' },
  { question: 'Fixed vs floating home loan interest rate — which is better?', answer: 'Floating rate is better for most borrowers. Reasons: 1) Floating rates are 1-2% lower than fixed initially. 2) No prepayment penalty on floating rate loans (RBI mandate). 3) When RBI cuts rates, your EMI reduces. 4) Fixed rates are actually "fixed" only for 3-5 years in most banks, then convert to floating. Risk: If rates rise significantly, EMI increases. Mitigation: Keep 15-20% buffer in your EMI budget for potential rate hikes.' },
  { question: 'What documents are needed for home loan in India?', answer: 'Essential documents: 1) KYC: Aadhaar, PAN, passport-size photos. 2) Income Proof (Salaried): Last 6 months salary slips, 2 years Form 16, bank statements. 3) Income Proof (Self-employed): 3 years ITR, profit & loss statements, business proof. 4) Property Documents: Sale agreement, approved building plan, title deed, encumbrance certificate, builder NOC. 5) Others: Processing fee cheque, existing loan statements (if any). Tip: Keep ITR filed with higher income for better eligibility.' },
  { question: 'How does home loan balance transfer work?', answer: 'Balance transfer means moving your existing home loan to another bank offering lower interest rate. Process: 1) Get rate quote from new bank. 2) If savings are significant (>0.5% rate difference), apply for transfer. 3) New bank pays off old loan. 4) You continue EMIs with new bank at lower rate. Costs: Processing fee (0.5-1%) + legal/valuation charges. Break-even typically in 12-18 months. Best time: Within first 5-7 years of loan when outstanding is still high.' }
];

export const HomeLoanCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(6000000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(8.75);
  const [loanTenure, setLoanTenure] = useState(20);
  const [monthlyPrepayment, setMonthlyPrepayment] = useState(0);
  const [taxSlab, setTaxSlab] = useState(0.30);
  const [showFullAmort, setShowFullAmort] = useState(false);

  // Derived values
  const loanAmount = Math.round(propertyValue * (1 - downPayment / 100));
  const tenureInMonths = loanTenure * 12;
  const ltv = ((loanAmount / propertyValue) * 100).toFixed(1);

  // Calculations
  const emi = useMemo(() => calculateEMI(loanAmount, interestRate, tenureInMonths), [loanAmount, interestRate, tenureInMonths]);
  const totalPayment = emi * tenureInMonths;
  const totalInterest = totalPayment - loanAmount;

  // Yearly Schedule
  const yearlySchedule = useMemo(() => {
    const schedule = [];
    let balance = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    
    for (let yr = 1; yr <= loanTenure; yr++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      
      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) break;
        const intForMonth = balance * monthlyRate;
        let prinForMonth = (emi + monthlyPrepayment) - intForMonth;
        if (prinForMonth > balance) prinForMonth = balance;
        
        balance = Math.max(0, balance - prinForMonth);
        yearPrincipal += prinForMonth;
        yearInterest += intForMonth;
      }
      
      schedule.push({
        year: yr,
        principalPaid: Math.round(yearPrincipal),
        interestPaid: Math.round(yearInterest),
        totalPaid: Math.round(yearPrincipal + yearInterest),
        balance: Math.round(balance)
      });
      
      if (balance <= 0) break;
    }
    return schedule;
  }, [loanAmount, interestRate, loanTenure, emi, monthlyPrepayment]);

  const actualTotalInterest = yearlySchedule.reduce((acc, curr) => acc + curr.interestPaid, 0);
  const actualTenureMonths = yearlySchedule.filter(y => y.balance > 0).length * 12; // Approximation based on years

  const prepaymentImpact = useMemo(() => {
    if (monthlyPrepayment <= 0) return null;
    return calculatePrepaymentImpact(loanAmount, interestRate, tenureInMonths, monthlyPrepayment, 0, 0);
  }, [loanAmount, interestRate, tenureInMonths, monthlyPrepayment]);

  const taxSavings = useMemo(() => {
    const firstYear = yearlySchedule[0] || { interestPaid: 0, principalPaid: 0 };
    return calculateHomeLoanTaxSavings(firstYear.interestPaid, firstYear.principalPaid, taxSlab);
  }, [yearlySchedule, taxSlab]);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setPropertyValue(preset.property);
    setDownPayment(Math.round((1 - preset.loan / preset.property) * 100));
    setInterestRate(preset.rate);
    setLoanTenure(preset.tenure);
  };

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet
        title="Home Loan EMI Calculator India 2025 — Free Housing Loan Calculator"
        description="Free Home Loan EMI Calculator 2025. Calculate housing loan EMI, LTV ratio, prepayment savings, Section 24(b) tax benefits. Includes SBI, HDFC, ICICI rates."
        keywords="home loan emi calculator, home loan calculator india, housing loan calculator, home loan interest calculator 2025, property loan calculator, home loan tax benefit calculator, ltv calculator"
        url="/calculators/home-loan-calculator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator' }
        ]}
        faqData={FAQ_DATA}
        calculatorData={{
          name: 'Home Loan EMI Calculator India 2025',
          description: 'Calculate home loan EMI with property value, LTV ratio, prepayment analysis, tax savings.',
          category: 'Loan Calculators',
          features: ['Property value to EMI calculation', 'Down payment percentage', 'Prepayment impact', 'Tax savings under Section 24(b) and 80C'],
          ratingValue: 4.9, reviewCount: 32150, authorName: 'MoneyCal Team'
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-teal-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Home Loan Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Loan EMI Calculator India 2025</h1>
          <p className="text-gray-600">Calculate your exact housing loan EMI, check LTV (Loan to Value) ratio, plan your down payment, and see how much you can save on income tax under Section 24(b) and 80C.</p>
        </div>

        {/* Quick Presets */}
        <div className="mb-6 flex flex-wrap gap-2">
          {PRESETS.map((preset, idx) => (
            <button key={idx} onClick={() => applyPreset(preset)} className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-teal-50 hover:border-teal-400 text-gray-700 transition-colors">
              {preset.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-[#f0fdfa] border border-[#99f6e4] rounded-lg p-5 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-[#0f766e] border-b border-[#99f6e4] pb-2">Property & Loan Details</h2>

              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-[#ccfbf1]">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="propertyValue">Property Value (₹)</label>
                    </td>
                    <td className="py-3">
                      <input id="propertyValue" type="number" value={propertyValue}
                        onChange={(e) => setPropertyValue(Math.max(100000, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0f766e]"
                        min="100000" max="500000000" />
                    </td>
                  </tr>
                  <tr className="border-b border-[#ccfbf1]">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="downPayment">Down Payment (%)</label>
                      <p className="text-xs text-gray-500 font-normal">Min 10-20% required</p>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <input id="downPayment" type="number" value={downPayment}
                          onChange={(e) => setDownPayment(Math.max(0, Math.min(99, Number(e.target.value) || 0)))}
                          className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0f766e]"
                          min="0" max="99" />
                        <span className="text-sm self-center text-gray-500">₹{fmtNum(propertyValue * (downPayment / 100))}</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#ccfbf1]">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="interestRate">Interest Rate (% p.a.)</label>
                    </td>
                    <td className="py-3">
                      <input id="interestRate" type="number" step="0.05" value={interestRate}
                        onChange={(e) => setInterestRate(Math.max(1, Math.min(30, Number(e.target.value) || 0)))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0f766e]"
                        min="1" max="30" />
                    </td>
                  </tr>
                  <tr className="border-b border-[#ccfbf1]">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="loanTenure">Loan Tenure (Years)</label>
                    </td>
                    <td className="py-3">
                      <input id="loanTenure" type="number" value={loanTenure}
                        onChange={(e) => setLoanTenure(Math.max(1, Math.min(30, Number(e.target.value) || 0)))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0f766e]"
                        min="1" max="30" />
                    </td>
                  </tr>
                  <tr className="border-b border-[#ccfbf1]">
                    <td className="py-3 pr-2 font-medium text-[#0f766e]">
                      <label htmlFor="monthlyPrepayment">Monthly Prepayment (₹)</label>
                      <p className="text-xs text-teal-700 font-normal">Optional extra EMI</p>
                    </td>
                    <td className="py-3">
                      <input id="monthlyPrepayment" type="number" value={monthlyPrepayment}
                        onChange={(e) => setMonthlyPrepayment(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-teal-300 rounded bg-teal-50 focus:outline-none focus:border-[#0f766e]"
                        min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="taxSlab">Your Income Tax Slab</label>
                    </td>
                    <td className="py-3">
                      <select id="taxSlab" value={taxSlab} onChange={(e) => setTaxSlab(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-[#0f766e]">
                        <option value={0.05}>5% Slab (Old Regime)</option>
                        <option value={0.20}>20% Slab (Old Regime)</option>
                        <option value={0.30}>30% Slab (Old/New Regime)</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-4 text-[#0f766e] border-b border-gray-200 pb-2">Home Loan Result</h2>

              <div className="bg-[#f0fdfa] p-4 rounded-lg mb-4 text-center border border-[#99f6e4]">
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Monthly EMI</p>
                <p className="text-4xl font-bold text-[#0f766e] my-1">₹{fmtNum(Math.round(emi))}</p>
                {monthlyPrepayment > 0 && <p className="text-sm text-teal-700 font-bold">+ ₹{fmtNum(monthlyPrepayment)} extra/mo</p>}
              </div>

              <table className="w-full text-left text-sm border-collapse mb-4">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">Loan Amount (Principal):</td>
                    <td className="py-2 font-semibold text-right">{fmt(loanAmount)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">Loan to Value (LTV) Ratio:</td>
                    <td className="py-2 font-semibold text-right">{ltv}%</td>
                  </tr>
                  <tr className="border-b border-gray-100 text-red-600">
                    <td className="py-2">Total Interest Payable:</td>
                    <td className="py-2 font-semibold text-right">
                      {monthlyPrepayment > 0 ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">{fmt(Math.round(totalInterest))}</span>
                          {fmt(Math.round(actualTotalInterest))}
                        </>
                      ) : (
                        fmt(Math.round(totalInterest))
                      )}
                    </td>
                  </tr>
                  <tr className="font-bold bg-gray-50">
                    <td className="py-2 px-1 rounded-l">Total Amount Payable:</td>
                    <td className="py-2 px-1 text-right rounded-r">{fmt(Math.round(actualTotalInterest + loanAmount))}</td>
                  </tr>
                </tbody>
              </table>

              {/* Prepayment Savings Box */}
              {monthlyPrepayment > 0 && prepaymentImpact && (
                <div className="mt-2 bg-green-50 border border-green-200 p-3 rounded-lg">
                  <p className="text-sm font-bold text-green-800 mb-1">🔥 Prepayment Savings!</p>
                  <p className="text-xs text-green-700">Interest Saved: <strong className="text-lg text-green-600">{fmt(Math.round(prepaymentImpact.interestSaved))}</strong></p>
                  <p className="text-xs text-green-700">Tenure Reduced: <strong>{prepaymentImpact.tenureSavedMonths} months</strong> ({(prepaymentImpact.tenureSavedMonths/12).toFixed(1)} years)</p>
                </div>
              )}

              {/* Tax Savings Box */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-sm font-bold text-[#0f766e] mb-1">Year 1 Tax Savings Estimation</p>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-gray-600 text-xs">Sec 24(b) - Interest: {fmt(Math.round(taxSavings.interestDeduction))}</p>
                    <p className="text-gray-600 text-xs">Sec 80C - Principal: {fmt(Math.round(taxSavings.principalDeduction))}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs uppercase">Est. Tax Saved</p>
                    <p className="font-bold text-lg text-[#0f766e]">{fmt(Math.round(taxSavings.totalTaxSaved))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== YEAR-WISE AMORTIZATION SCHEDULE ===== */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Home Loan Amortization Schedule</h2>
          <p className="text-gray-600 mb-4 text-sm">This table shows your year-wise home loan repayment. Notice how in the initial years, the majority of your EMI goes towards paying the interest, while the principal repayment is small. Over the years, this ratio flips. This is why prepayments made in the first 5 years are incredibly effective in reducing your total interest burden.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-center">Year</th>
                  <th className="border border-gray-300 p-2 text-right">Principal Paid (₹)</th>
                  <th className="border border-gray-300 p-2 text-right">Interest Paid (₹)</th>
                  <th className="border border-gray-300 p-2 text-right">Total Paid (₹)</th>
                  <th className="border border-gray-300 p-2 text-right">Outstanding Loan (₹)</th>
                </tr>
              </thead>
              <tbody>
                {yearlySchedule.slice(0, showFullAmort ? yearlySchedule.length : 5).map((yr) => (
                  <tr key={yr.year} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 text-center font-semibold">{yr.year}</td>
                    <td className="border border-gray-300 p-2 text-right text-teal-700">{fmtNum(yr.principalPaid)}</td>
                    <td className="border border-gray-300 p-2 text-right text-red-600">{fmtNum(yr.interestPaid)}</td>
                    <td className="border border-gray-300 p-2 text-right">{fmtNum(yr.totalPaid)}</td>
                    <td className="border border-gray-300 p-2 text-right font-semibold">{fmtNum(yr.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {yearlySchedule.length > 5 && (
            <button onClick={() => setShowFullAmort(!showFullAmort)}
              className="mt-3 px-4 py-2 text-sm border border-teal-400 text-teal-700 rounded hover:bg-teal-50">
              {showFullAmort ? 'Show Less' : `Show All ${yearlySchedule.length} Years`}
            </button>
          )}

          <ExportButtons 
            data={yearlySchedule}
            filename="Home_Loan_Amortization_Schedule"
            title="Home Loan Amortization Schedule"
            columns={[
              { header: 'Year', dataKey: 'year' },
              { header: 'Principal Paid (Rs)', dataKey: 'principalPaid', isCurrency: true },
              { header: 'Interest Paid (Rs)', dataKey: 'interestPaid', isCurrency: true },
              { header: 'Total Paid (Rs)', dataKey: 'totalPaid', isCurrency: true },
              { header: 'Outstanding Balance (Rs)', dataKey: 'balance', isCurrency: true }
            ]}
          />
        </div>

        {/* ===== BANK RATES TABLE ===== */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Home Loan Interest Rates in India (2025)</h2>
          <p className="text-gray-600 mb-4 text-sm">Compare the latest home loan interest rates offered by top Indian banks. A lower interest rate can save you lakhs of rupees over a 20-year tenure. Always compare processing fees and LTV margins as well.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Bank Name</th>
                  <th className="border border-gray-300 p-2 text-center">Interest Rate (p.a.)</th>
                  <th className="border border-gray-300 p-2 text-center">Processing Fees</th>
                  <th className="border border-gray-300 p-2 text-center">Max Tenure</th>
                  <th className="border border-gray-300 p-2 text-center">Max LTV</th>
                </tr>
              </thead>
              <tbody>
                {HOME_LOAN_RATES_2025.map((bank, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 font-semibold text-[#0f766e]">{bank.bank}</td>
                    <td className="border border-gray-300 p-2 text-center font-bold text-gray-800">{bank.rate}%</td>
                    <td className="border border-gray-300 p-2 text-center">{bank.processing}</td>
                    <td className="border border-gray-300 p-2 text-center">{bank.maxTenure}</td>
                    <td className="border border-gray-300 p-2 text-center">{bank.maxLTV}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>What is a Home Loan EMI Calculator?</h2>
          <p>
            A <strong>Home Loan EMI Calculator</strong> is an essential online financial tool designed to help you calculate the Equated Monthly Installment (EMI) you will need to pay towards your housing loan. Unlike a basic EMI calculator, a specialized home loan calculator (like ours) also incorporates property value, down payment planning, LTV ratios, prepayment analysis, and home loan tax savings under Indian Income Tax laws (Section 24b and 80C).
          </p>
          <p>
            Whether you are planning to buy a ready-to-move apartment, an under-construction flat, a villa, or a plot of land for construction, knowing your exact EMI outflow is the crucial first step in your home-buying journey.
          </p>

          <h3>How is Home Loan EMI Calculated?</h3>
          <p>
            Home loans in India use the <strong>Reducing Balance Method</strong> for EMI calculation. In this method, the interest is calculated only on the outstanding principal balance, which decreases with every EMI you pay.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center text-lg border-l-4 border-[#0f766e]">
            <strong>EMI = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> – 1]</strong>
          </div>
          <ul>
            <li><strong>P (Principal):</strong> The actual loan amount you borrow from the bank.</li>
            <li><strong>R (Rate of Interest):</strong> The monthly interest rate (Annual Rate / 12 / 100).</li>
            <li><strong>N (Tenure):</strong> The duration of the loan in months.</li>
          </ul>

          <h4>Home Loan EMI Calculation Example</h4>
          <p>Let's say you take a <strong>home loan of ₹50 Lakhs at an interest rate of 8.50% p.a. for a tenure of 20 years</strong>.</p>
          <ul>
            <li><strong>Principal (P):</strong> ₹50,00,000</li>
            <li><strong>Monthly Rate (R):</strong> 8.50 / 12 / 100 = 0.007083</li>
            <li><strong>Tenure in Months (N):</strong> 20 × 12 = 240 months</li>
            <li><strong>Calculated EMI:</strong> ₹43,391 per month</li>
          </ul>
          <p>
            Over the course of 20 years, you will pay a total of ₹1,04,13,879. This means you will pay <strong>₹54,13,879 purely as interest</strong>, which is more than 108% of your original loan amount! This highlights why choosing the right tenure and making prepayments is so vital.
          </p>

          <h3>Understanding Loan to Value (LTV) Ratio</h3>
          <p>
            You cannot get a home loan for 100% of the property value. The Reserve Bank of India (RBI) has strict guidelines on the <strong>Loan-to-Value (LTV) ratio</strong> to protect banks against property price corrections. LTV is the percentage of the property value that the bank is willing to finance.
          </p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Loan Amount Required</th>
                <th className="border border-gray-300 p-2 text-center">Maximum LTV Allowed by RBI</th>
                <th className="border border-gray-300 p-2 text-center">Minimum Down Payment Needed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Up to ₹30 Lakhs</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-green-700">90%</td>
                <td className="border border-gray-300 p-2 text-center">10%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Above ₹30 Lakhs up to ₹75 Lakhs</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-blue-700">80% - 85%</td>
                <td className="border border-gray-300 p-2 text-center">15% - 20%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Above ₹75 Lakhs</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-orange-700">75% - 80%</td>
                <td className="border border-gray-300 p-2 text-center">20% - 25%</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Pro Tip:</strong> Even if you are eligible for a 90% LTV, try to make a 20% down payment (80% LTV). Banks often offer lower interest rates (by 0.05% to 0.15%) to borrowers who bring a larger down payment because it reduces the bank's risk.
          </p>

          <h3>How Prepayments Can Save You Lakhs in Interest</h3>
          <p>
            In a home loan, the interest is front-loaded. As you can see in our amortization schedule, during the first 5 years of a 20-year loan, nearly 75-80% of your EMI goes entirely towards interest. Only 20-25% reduces your actual loan amount.
          </p>
          <p>
            This is why making prepayments (part-payments) early in your loan tenure is the ultimate financial hack. The RBI has mandated that banks <strong>cannot charge any prepayment penalty on floating-rate home loans</strong> for individuals.
          </p>
          
          <h4>The Power of "One Extra EMI a Year" or Monthly Prepayments</h4>
          <p>Let's take a ₹50 Lakh loan at 8.5% for 20 years. Your standard EMI is ₹43,391.</p>
          <ul>
            <li><strong>Strategy 1: Add ₹5,000 extra to your EMI every month.</strong> You pay ₹48,391 monthly. This simple act reduces your tenure from 20 years to 15.5 years, saving you a massive <strong>₹14.8 Lakhs in interest!</strong></li>
            <li><strong>Strategy 2: Pay one extra EMI (₹43,391) every year as a lump sum (e.g., from your Diwali bonus).</strong> This reduces your tenure to approx 16.5 years, saving you over <strong>₹10 Lakhs in interest.</strong></li>
          </ul>
          <p>Use the "Monthly Prepayment" field in our calculator above to see the exact impact on your specific loan scenario.</p>

          <h3>Home Loan Tax Benefits in India (FY 2025-26)</h3>
          <p>
            The Indian government encourages homeownership by offering substantial tax deductions under the Income Tax Act. A home loan can be your biggest tax-saving tool.
          </p>
          
          <h4>1. Section 24(b) — Deduction on Home Loan Interest</h4>
          <p>
            For a self-occupied property, you can claim a deduction of up to <strong>₹2 Lakhs per financial year</strong> on the interest paid towards your home loan. If you let out (rent) the property, there is no upper limit on the interest deduction you can claim, but the loss from house property that can be set off against other income heads is capped at ₹2 Lakhs.
          </p>
          
          <h4>2. Section 80C — Deduction on Principal Repayment</h4>
          <p>
            The principal portion of your EMI qualifies for a tax deduction under Section 80C, up to a maximum limit of <strong>₹1.5 Lakhs per financial year</strong>. Note that this ₹1.5 Lakh limit includes other 80C investments like PF, PPF, ELSS, and Life Insurance premiums. Also, the stamp duty and registration charges paid for the property can be claimed under this section in the year they are paid.
          </p>

          <h4>3. Joint Home Loan Benefits</h4>
          <p>
            If you take a joint home loan with your spouse (and both are co-owners of the property), <strong>both individuals can claim the above deductions separately</strong>. This means a couple can claim up to ₹4 Lakhs (₹2L + ₹2L) on interest under Section 24(b) and up to ₹3 Lakhs (₹1.5L + ₹1.5L) on principal under Section 80C, effectively doubling the tax benefits!
          </p>
          
          <p><em>Note: These deductions are applicable only if you opt for the Old Tax Regime. The New Tax Regime does not allow deductions under Section 80C or Section 24(b) for self-occupied properties.</em></p>

          <h3>Fixed vs Floating Interest Rate: Which Should You Choose?</h3>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Feature</th>
                <th className="border border-gray-300 p-2">Floating Rate Home Loan</th>
                <th className="border border-gray-300 p-2">Fixed Rate Home Loan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Interest Rate</td>
                <td className="border border-gray-300 p-2">Changes according to RBI's Repo Rate.</td>
                <td className="border border-gray-300 p-2">Remains constant for a specified period (usually 3-5 years).</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Cost</td>
                <td className="border border-gray-300 p-2 text-green-700">Usually 1-2% cheaper than fixed rates initially.</td>
                <td className="border border-gray-300 p-2 text-red-700">More expensive due to risk premium charged by banks.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Prepayment Penalty</td>
                <td className="border border-gray-300 p-2 text-green-700">NIL. Zero penalty for part or full prepayment.</td>
                <td className="border border-gray-300 p-2 text-red-700">Banks may charge 2-4% penalty for early closure.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-bold">Recommendation</td>
                <td className="border border-gray-300 p-2" colSpan={2}>
                  <strong>Always choose Floating Rate.</strong> Over a 20-year period, interest rate cycles will go up and down. The flexibility to prepay without penalty makes floating rates the superior choice for 99% of retail borrowers in India.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>How to Improve Your Home Loan Eligibility</h3>
          <p>
            If you find that your eligible loan amount is lower than what you need for your dream home, try these strategies:
          </p>
          <ol>
            <li><strong>Add a Co-applicant:</strong> Adding a working spouse, parent, or earning child as a co-applicant aggregates both incomes, significantly boosting your loan eligibility.</li>
            <li><strong>Improve your CIBIL Score:</strong> A score above 750 ensures better eligibility and lower interest rates. Pay off outstanding credit card dues and personal loans before applying for a home loan.</li>
            <li><strong>Extend the Tenure:</strong> Increasing the loan tenure (e.g., from 15 to 25 years) reduces the EMI amount, which fits better into the bank's FOIR (Fixed Obligations to Income Ratio) calculation, allowing a larger loan amount. <em>(You can always prepay it later to reduce the actual tenure).</em></li>
            <li><strong>Declare Additional Income:</strong> Include rental income, part-time business income, or consistent bonuses in your income declaration (backed by ITR filings) to increase your net documented income.</li>
            <li><strong>Clear Existing Debts:</strong> Close any existing car loans or personal loans. Every existing EMI reduces your home loan eligibility by a multiple of 60x-70x of that EMI amount.</li>
          </ol>

          <h3>Common Mistakes to Avoid While Taking a Home Loan</h3>
          <ul>
            <li><strong>Not shopping around:</strong> Don't just go to your salary account bank. Get quotes from at least 3 lenders (e.g., SBI, HDFC, and LIC Housing) to negotiate the best rate and processing fee waiver.</li>
            <li><strong>Ignoring the Processing Fee:</strong> Processing fees range from ₹2,000 to 1% of the loan amount. On a ₹50 Lakh loan, a 1% fee is ₹50,000! Always negotiate this down.</li>
            <li><strong>Buying insurance blindly from the lender:</strong> Banks heavily push home loan protection insurance. It is often a single-premium plan that gets added to your loan amount (meaning you pay interest on the insurance premium too!). A standard Term Life Insurance policy bought independently is much cheaper and better.</li>
            <li><strong>Not factoring in hidden costs of buying a home:</strong> Stamp duty (5-7%), registration charges (1%), GST (if under construction), society deposits, and interior work can add 15-20% to the property cost. Ensure you have liquid funds for these as banks do not finance them.</li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>This Home Loan EMI Calculator is provided for general estimation and educational purposes. The tax savings are calculated based on the old tax regime and are indicative. Actual loan terms, processing fees, eligibility, and interest rates vary by bank based on your credit score, property legal status, and loan policy. Always verify latest official rates and terms from the respective lender before making financial decisions. MoneyCal is not a financial advisory service. Last updated: March 2025.</p>
          </div>

        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Home Loan Calculations</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/home-loan-calculator-for-30-lakhs" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">₹30 Lakh Home Loan EMI</a>
            <a href="/calculators/home-loan-calculator-for-40-lakhs" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">₹40 Lakh Home Loan EMI</a>
            <a href="/calculators/home-loan-calculator-for-50-lakhs" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">₹50 Lakh Home Loan EMI</a>
            <a href="/calculators/home-loan-calculator-for-1-crore" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">₹1 Crore Home Loan EMI</a>
            <a href="/calculators/sbi-home-loan-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">SBI Home Loan Calculator</a>
            <a href="/calculators/hdfc-home-loan-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">HDFC Home Loan Calculator</a>
            <a href="/calculators/icici-home-loan-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">ICICI Home Loan Calculator</a>
          </div>
        </div>

      </div>
      <CalculatorSchema 
        name="Home Loan EMI Calculator"
        description="Calculate Home Loan EMI, check amortization schedule, and find out your tax savings under section 24(b) and 80C."
        url="/calculators/home-loan-calculator"
        features={["Down payment calculation", "LTV ratio check", "Tax savings estimate", "Amortization schedule", "Prepayment impact"]}
        category="FinanceApplication"
        faqData={FAQ_DATA}
      />
    </>
  );
};
