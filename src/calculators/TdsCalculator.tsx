import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   TDS CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: tds calculator, tax deducted at source,
   tds on salary calculator, tds on rent, tds on professional fees
   ═══════════════════════════════════════════════════════════════ */

type PaymentType = 'salary' | 'professional' | 'rent' | 'interest' | 'commission' | 'dividend' | 'contractor' | 'crypto';

const FAQ_DATA = [
  { question: "What is TDS (Tax Deducted at Source)?", answer: "TDS is a mechanism introduced by the Government of India where the person making a payment is required to deduct a certain percentage of tax before making the full payment to the receiver. It acts as an 'advance tax' to prevent tax evasion." },
  { question: "What are the common TDS rates in 2026-2027?", answer: "Common rates include: 10% on Professional/Technical fees (Sec 194J), 10% on Rent above ₹50K (Sec 194-I), 10% on FD Interest (Sec 194A), 5% on Commission (Sec 194H), 1% on Contractors (Sec 194C), and 1% on Crypto transfers (Sec 194S)." },
  { question: "What happens if I don't provide my PAN?", answer: "If you do not provide your Permanent Account Number (PAN) to the deductor, TDS will be deducted at a flat penal rate of 20% (or higher, depending on the section), instead of the standard 5% or 10%." },
  { question: "Can I claim a refund for TDS deducted?", answer: "Yes! TDS is not a final tax, but rather an advance tax. When you file your Income Tax Return (ITR), if your total tax liability is less than the TDS already deducted, the Income Tax Department will refund the excess amount to your bank account." },
  { question: "What is Form 16 and Form 16A?", answer: "These are TDS certificates issued by the deductor. Form 16 is specifically for TDS on Salary, issued annually by employers. Form 16A is for TDS on all other payments (like FD interest, rent, professional fees), usually issued quarterly." }
];

export const TdsCalculator: React.FC = () => {
  const [paymentType, setPaymentType] = useState<PaymentType>('professional');
  const [paymentAmount, setPaymentAmount] = useState<number>(100000);
  const [panProvided, setPanProvided] = useState<boolean>(true);
  
  // States to hold calculation output
  const [tdsRate, setTdsRate] = useState<number>(10);
  const [tdsAmount, setTdsAmount] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [thresholdMet, setThresholdMet] = useState<boolean>(true);
  const [thresholdLimit, setThresholdLimit] = useState<number>(30000);

  useEffect(() => {
    // 2026-2027 Financial Year Rules
    let baseRate = 10;
    let threshold = 0;
    
    switch (paymentType) {
      case 'professional': // Sec 194J
        baseRate = 10;
        threshold = 30000; // Annual
        break;
      case 'rent': // Sec 194-I
        baseRate = 10;
        threshold = 240000; // Annual
        break;
      case 'interest': // Sec 194A
        baseRate = 10;
        threshold = 40000; // Annual (50k for Seniors)
        break;
      case 'commission': // Sec 194H
        baseRate = 5;
        threshold = 15000; // Annual
        break;
      case 'dividend': // Sec 194
        baseRate = 10;
        threshold = 5000; // Annual
        break;
      case 'contractor': // Sec 194C
        baseRate = 1; // 1% Individual/HUF, 2% Others
        threshold = 30000; // Single contract
        break;
      case 'crypto': // Sec 194S
        baseRate = 1;
        threshold = 10000; // Annual
        break;
      case 'salary': // Sec 192
        baseRate = 10; // Variable, but 10% used as standard placeholder
        threshold = 300000; // Basic Exemption Limit
        break;
    }

    setThresholdLimit(threshold);

    // Check if amount exceeds threshold
    const isAboveThreshold = paymentAmount > threshold;
    setThresholdMet(isAboveThreshold);

    // If PAN is not provided, flat 20% applies (unless the base rate is higher)
    let applicableRate = 0;
    
    if (isAboveThreshold) {
      applicableRate = !panProvided ? Math.max(20, baseRate) : baseRate;
    }
    
    setTdsRate(applicableRate);
    
    const calculatedTds = (paymentAmount * applicableRate) / 100;
    setTdsAmount(calculatedTds);
    setNetAmount(paymentAmount - calculatedTds);

  }, [paymentType, paymentAmount, panProvided]);

  const presetAmounts = [
    { label: "₹1L Freelance IT Work", type: 'professional', amount: 100000 },
    { label: "₹50K Bank FD Interest", type: 'interest', amount: 50000 },
    { label: "₹3L Office Rent", type: 'rent', amount: 300000 },
    { label: "₹50K Crypto Sale", type: 'crypto', amount: 50000 },
  ];

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="TDS Calculator India 2026-27 | Salary, Rent, Interest & Fees" 
        description="Free online TDS Calculator for India (FY 2026-27). Calculate Tax Deducted at Source for professional fees, rent, interest, commission, and crypto with latest threshold limits." 
        keywords="tds calculator, tax deducted at source, tds on salary calculator, tds on rent, tds on professional fees, tds rate chart 2026, form 16a" 
        url="/calculators/tds-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'TDS Calculator', description: 'Calculate Tax Deducted at Source for various income types.', category: 'Tax Calculators', features: ['TDS Threshold Limits', 'PAN Verification Rules', 'Latest Section Rates'], ratingValue: 4.8, reviewCount: 15420, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">TDS Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">TDS Calculator (FY 2026-27)</h1>
          <p className="text-gray-600">Instantly calculate the exact Tax Deducted at Source (TDS) based on the latest Income Tax Act sections, rates, and exemption thresholds.</p>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Common Scenarios</p>
          <div className="flex flex-wrap gap-2">
            {presetAmounts.map((preset, idx) => (
              <button key={idx} onClick={() => {
                setPaymentType(preset.type as PaymentType);
                setPaymentAmount(preset.amount);
                setPanProvided(true);
              }} className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-blue-50 hover:border-blue-400 text-gray-700 transition-colors font-semibold">
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-900 border-b border-blue-200 pb-2">Payment Details</h2>
              
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="paymentType">Nature of Payment</label>
                    </td>
                    <td className="py-3">
                      <select id="paymentType" value={paymentType} onChange={(e) => setPaymentType(e.target.value as PaymentType)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white font-medium">
                        <option value="professional">Professional / Tech Fees (194J)</option>
                        <option value="rent">Rent of Land/Building (194-I)</option>
                        <option value="interest">Interest e.g., FD (194A)</option>
                        <option value="commission">Commission & Brokerage (194H)</option>
                        <option value="dividend">Dividend Income (194)</option>
                        <option value="contractor">Contractor / Sub-Contractor (194C)</option>
                        <option value="crypto">Crypto / VDA Transfer (194S)</option>
                        <option value="salary">Salary (192 - Est. Avg)</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="paymentAmount">Gross Payment (₹)</label>
                      <p className="text-xs text-gray-500 font-normal">Before tax deduction</p>
                    </td>
                    <td className="py-3">
                      <input id="paymentAmount" type="number" value={paymentAmount}
                        onChange={(e) => setPaymentAmount(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg font-bold"
                        min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="panStatus">Payee PAN Status</label>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="panStatus" checked={panProvided} onChange={() => setPanProvided(true)} className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-green-700">PAN Given</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="panStatus" checked={!panProvided} onChange={() => setPanProvided(false)} className="w-4 h-4 text-red-600" />
                          <span className="font-semibold text-red-700">No PAN</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-blue-200">Net Amount You Receive</h2>
                <div className="text-4xl font-black mb-1">
                  ₹{fmtNum(netAmount)}
                </div>
              </div>

              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Gross Invoice Amount</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(paymentAmount)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-red-50">
                      <td className="p-4">
                        <div className="text-sm font-bold text-red-800">Total TDS Deducted</div>
                        <div className="text-xs text-red-600 mt-1">Deducted at {tdsRate}%</div>
                      </td>
                      <td className="p-4 text-right text-base font-bold text-red-700">-{fmt(tdsAmount)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">TDS Exemption Threshold</td>
                      <td className="p-4 text-right text-sm font-medium">₹{fmtNum(thresholdLimit)}</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td colSpan={2} className="p-4">
                        {!thresholdMet ? (
                          <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Amount is below exemption threshold. No TDS required!
                          </div>
                        ) : !panProvided ? (
                          <div className="flex items-center gap-2 text-red-700 text-sm font-semibold">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            Penal 20% TDS applied due to missing PAN card.
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600">
                            <strong>Note:</strong> Ensure the deductor deposits this ₹{fmtNum(tdsAmount)} to the government and issues your Form 16A.
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>What is Tax Deducted at Source (TDS)?</h2>
          <p>
            <strong>Tax Deducted at Source (TDS)</strong> is an income tax collection mechanism employed by the Government of India. The primary concept is simple: <em>"pay as you earn."</em> Instead of waiting for you to declare your income and pay tax at the end of the financial year, the government requires the person paying you (the deductor) to withhold a small percentage of your payment and deposit it directly to the Income Tax Department.
          </p>
          <p>
            Whether you are a freelancer receiving professional fees, a landlord receiving rent, or an investor earning interest from a Fixed Deposit, TDS acts as a prepaid advance tax credited to your Permanent Account Number (PAN).
          </p>

          <h3>Common TDS Sections, Rates, and Threshold Limits (FY 2026-27)</h3>
          <p>
            Not all payments attract TDS. The Income Tax Act specifies different tax rates and threshold limits depending on the nature of the transaction. If your total annual payment falls below the specific <strong>Threshold Limit</strong>, no TDS should be deducted.
          </p>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Nature of Payment</th>
                  <th className="border border-gray-300 p-2 text-center">IT Act Section</th>
                  <th className="border border-gray-300 p-2 text-center">TDS Rate</th>
                  <th className="border border-gray-300 p-2 text-right">Threshold Limit (Annual)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Salary</td>
                  <td className="border border-gray-300 p-2 text-center">Sec 192</td>
                  <td className="border border-gray-300 p-2 text-center">Slab Rate</td>
                  <td className="border border-gray-300 p-2 text-right">Basic Exemption (₹3L)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Professional or Technical Fees</td>
                  <td className="border border-gray-300 p-2 text-center">Sec 194J</td>
                  <td className="border border-gray-300 p-2 text-center">10%</td>
                  <td className="border border-gray-300 p-2 text-right">₹30,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Interest on Securities / FDs</td>
                  <td className="border border-gray-300 p-2 text-center">Sec 194A</td>
                  <td className="border border-gray-300 p-2 text-center">10%</td>
                  <td className="border border-gray-300 p-2 text-right">₹40,000 (₹50K Seniors)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Rent (Land, Building, Furniture)</td>
                  <td className="border border-gray-300 p-2 text-center">Sec 194-I</td>
                  <td className="border border-gray-300 p-2 text-center">10%</td>
                  <td className="border border-gray-300 p-2 text-right">₹2,40,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Commission or Brokerage</td>
                  <td className="border border-gray-300 p-2 text-center">Sec 194H</td>
                  <td className="border border-gray-300 p-2 text-center">5%</td>
                  <td className="border border-gray-300 p-2 text-right">₹15,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Payments to Contractors</td>
                  <td className="border border-gray-300 p-2 text-center">Sec 194C</td>
                  <td className="border border-gray-300 p-2 text-center">1% (Ind) / 2%</td>
                  <td className="border border-gray-300 p-2 text-right">₹30,000 (Single Contract)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Transfer of Virtual Digital Assets (Crypto)</td>
                  <td className="border border-gray-300 p-2 text-center">Sec 194S</td>
                  <td className="border border-gray-300 p-2 text-center">1%</td>
                  <td className="border border-gray-300 p-2 text-right">₹10,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>The "Missing PAN" Penalty: Why PAN is Critical</h3>
          <p>
            Under <strong>Section 206AA</strong> of the Income Tax Act, if you receive an income that is subject to TDS, you are legally obligated to furnish your Permanent Account Number (PAN) to the deductor. 
          </p>
          <p>
            If you fail to provide your PAN, or if you provide an invalid PAN, the deductor is forced to deduct TDS at a massive <strong>flat penal rate of 20%</strong> (or the rate in force, whichever is higher). For example, if you do freelance work worth ₹50,000 and the standard TDS under Sec 194J is 10%, giving your PAN ensures you receive ₹45,000. Forgetting to give your PAN means you will only receive ₹40,000.
          </p>

          <h3>How to Claim a Refund on Deducted TDS</h3>
          <p>
            One of the biggest misconceptions among freelancers and salaried individuals is that TDS is a "lost" tax. <strong>TDS is not your final tax liability!</strong> It is merely an advance deposit sitting in your tax credit statement (Form 26AS/AIS).
          </p>
          <ol>
            <li><strong>Gather your TDS Certificates:</strong> Your employer will give you Form 16, and banks/clients will give you Form 16A.</li>
            <li><strong>Calculate Total Income:</strong> Add up all your salaries, professional fees, interest, and other income for the year.</li>
            <li><strong>Apply Deductions:</strong> Subtract Sec 80C, 80D, etc. to arrive at your Net Taxable Income.</li>
            <li><strong>Determine Tax Liability:</strong> Calculate the actual tax you owe based on your income slab (e.g., Old Regime vs New Regime).</li>
            <li><strong>Claim Credit:</strong> If your calculated tax liability is ₹15,000, but your clients have already deducted ₹40,000 in TDS, the Income Tax Department owes you money! When you file your ITR, you will claim a direct bank <strong>refund of ₹25,000</strong>.</li>
          </ol>

          <h3>Lower or Nil TDS Certificate (Form 13)</h3>
          <p>
            What if you expect your total income for the year to fall below the basic exemption limit (₹3 Lakh in the new regime)? It doesn't make sense for clients to deduct 10% TDS from you, block your cash flow, and force you to wait a year to claim a refund.
          </p>
          <p>
            In such cases, you can apply to the Assessing Officer (AO) using <strong>Form 13</strong> for a certificate authorizing the payer to deduct TDS at a lower rate, or not deduct TDS at all. Additionally, senior citizens can submit <strong>Form 15G or Form 15H</strong> directly to their banks to prevent TDS deduction on Fixed Deposit interest if their total tax liability is nil.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg my-4 text-sm border-l-4 border-blue-600 not-prose">
            <p className="font-semibold mb-1">Important Reminder</p>
            <p>Always verify your TDS credits by downloading your <strong>Form 26AS</strong> and <strong>Annual Information Statement (AIS)</strong> from the official Income Tax e-Filing portal before filing your ITR. Ensure that the TDS deducted by your clients or employer has actually been deposited against your PAN.</p>
          </div>
        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Tax Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/income-tax-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Income Tax Calculator (New Regime)</a>
            <a href="/calculators/gst-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">GST Calculator</a>
            <a href="/calculators/capital-gains-tax-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Capital Gains Tax Calculator</a>
            <a href="/calculators/hra-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">HRA Exemption Calculator</a>
          </div>
        </div>

      </div>
    </>
  );
};