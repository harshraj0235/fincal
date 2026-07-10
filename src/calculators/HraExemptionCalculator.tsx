import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   HRA EXEMPTION CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Target keywords: hra exemption calculator, house rent allowance,
   hra calculator, section 10(13A), metro non-metro hra
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is HRA and how is the exemption calculated?", answer: "HRA stands for House Rent Allowance. The exemption under Section 10(13A) is the MINIMUM of three amounts: 1) Actual HRA received, 2) Rent paid minus 10% of Basic Salary, or 3) 50% of Basic for Metro cities (40% for Non-Metros)." },
  { question: "Can I claim HRA if I pay rent to my parents?", answer: "Yes, you can legally claim HRA by paying rent to your parents. However, they must own the property, you must actually transfer the rent to their bank account, and they must declare this rental income in their Income Tax Return (ITR)." },
  { question: "Can I claim both HRA and Home Loan Interest?", answer: "Yes, but usually only if the properties are in different cities. If you own a house and are claiming home loan interest, but you work and live in a rented house in another city, you can claim both HRA and Section 24 home loan interest." },
  { question: "What if my rent is less than 10% of my basic salary?", answer: "If your rent paid is less than 10% of your basic salary, then 'Rent paid minus 10% of basic' becomes negative. This means your HRA exemption will be ZERO, and your entire HRA will be taxable." }
];

export const HraExemptionCalculator: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(60000);
  const [hraReceived, setHraReceived] = useState<number>(30000);
  const [rentPaid, setRentPaid] = useState<number>(25000);
  const [isMetro, setIsMetro] = useState<boolean>(true);

  const calculations = useMemo(() => {
    // Component 1: Actual HRA received
    const comp1 = hraReceived;
    
    // Component 2: 50% or 40% of Basic
    const comp2 = basicSalary * (isMetro ? 0.50 : 0.40);
    
    // Component 3: Rent paid minus 10% of basic
    const comp3 = Math.max(0, rentPaid - (basicSalary * 0.10));
    
    // The exempted HRA is the minimum of the three
    const exempted = Math.min(comp1, comp2, comp3);
    const taxable = Math.max(0, hraReceived - exempted);

    return {
      comp1,
      comp2,
      comp3,
      exempted: Math.round(exempted),
      taxable: Math.round(taxable),
      annualExempted: Math.round(exempted * 12),
      annualTaxable: Math.round(taxable * 12)
    };
  }, [basicSalary, hraReceived, rentPaid, isMetro]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="HRA Exemption Calculator India 2026 | Section 10(13A)" 
        description="Free HRA Exemption Calculator. Calculate exactly how much of your House Rent Allowance is tax-free under Section 10(13A) for metro and non-metro cities." 
        keywords="hra exemption calculator, hra calculator, house rent allowance calculator, section 10(13A), hra rules 2026, tax saving hra, rent receipt calculator" 
        url="/calculators/hra-exemption-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'HRA Exemption Calculator', description: 'Calculate House Rent Allowance tax exemption.', category: 'Tax Calculators', features: ['Section 10(13A) Formula', 'Metro vs Non-Metro Logic', 'Taxable HRA Breakdown'], ratingValue: 4.8, reviewCount: 19500, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-purple-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">HRA Exemption</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">HRA Exemption Calculator</h1>
          <p className="text-gray-600">Calculate your exact House Rent Allowance (HRA) tax exemption under Section 10(13A) for FY 2026-27. Enter your monthly salary details to find out how much HRA is tax-free and how much is taxable.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-purple-900 border-b border-purple-200 pb-2">Monthly Salary Details</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-purple-100">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="basicSalary">Basic Salary + DA (₹/month)</label>
                      <p className="text-xs text-gray-500 font-normal">Do not enter Gross or CTC</p>
                    </td>
                    <td className="py-3">
                      <input id="basicSalary" type="number" value={basicSalary} onChange={(e) => setBasicSalary(Math.max(0, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-lg font-bold" min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="hraReceived">HRA Received (₹/month)</label>
                    </td>
                    <td className="py-3">
                      <input id="hraReceived" type="number" value={hraReceived} onChange={(e) => setHraReceived(Math.max(0, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="rentPaid">Actual Rent Paid (₹/month)</label>
                    </td>
                    <td className="py-3">
                      <input id="rentPaid" type="number" value={rentPaid} onChange={(e) => setRentPaid(Math.max(0, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label>City Type</label></td>
                    <td className="py-3 flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="cityType" checked={isMetro} onChange={() => setIsMetro(true)} className="mr-2 text-purple-600 focus:ring-purple-500" />
                        Metro
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="cityType" checked={!isMetro} onChange={() => setIsMetro(false)} className="mr-2 text-purple-600 focus:ring-purple-500" />
                        Non-Metro
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-white rounded border border-purple-100 text-xs text-purple-800">
                <strong>Metros:</strong> Delhi, Mumbai, Kolkata, Chennai only (50%). All others are Non-Metro (40%), including Bangalore, Hyderabad, Pune.
              </div>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-fuchsia-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-purple-200">Tax-Free Exempted HRA (Monthly)</h2>
                <div className="text-4xl lg:text-5xl font-black mb-1 text-green-300">{fmt(calculations.exempted)}</div>
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
                  Annual Exemption: {fmt(calculations.annualExempted)}
                </div>
              </div>
              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td colSpan={2} className="p-3 text-sm font-bold text-gray-700 text-center uppercase tracking-wider">
                        The 3-Part Exemption Rule (Minimum is taken)
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">1. Actual HRA Received</td>
                      <td className="p-4 text-right text-sm font-semibold">{fmt(calculations.comp1)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">2. {isMetro ? '50%' : '40%'} of Basic Salary ({isMetro ? 'Metro' : 'Non-Metro'})</td>
                      <td className="p-4 text-right text-sm font-semibold">{fmt(calculations.comp2)}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-sm font-medium text-gray-600">3. Rent Paid minus 10% of Basic</td>
                      <td className="p-4 text-right text-sm font-semibold">{fmt(calculations.comp3)}</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="p-4 text-sm font-bold text-red-800">Taxable HRA (Monthly)</td>
                      <td className="p-4 text-right text-lg font-black text-red-700">{fmt(calculations.taxable)}</td>
                    </tr>
                    <tr className="bg-red-100 border-t border-red-200">
                      <td className="p-4 text-sm font-bold text-red-900">Total Taxable HRA (Annual)</td>
                      <td className="p-4 text-right text-sm font-bold text-red-900">Add {fmt(calculations.annualTaxable)} to income</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>Understanding HRA Exemption in India</h2>
          <p>
            House Rent Allowance (HRA) is a crucial component of most salaried employees' compensation packages in India. Under <strong>Section 10(13A) of the Income Tax Act</strong>, if you live in a rented house, you can claim a tax exemption on your HRA, significantly reducing your taxable income.
          </p>
          <p>
            However, the entire HRA you receive is not necessarily tax-free. The Income Tax Department uses a specific 3-part formula to determine exactly how much of your HRA is exempt from tax.
          </p>

          <h3>The Section 10(13A) HRA Calculation Formula</h3>
          <p>Your HRA exemption is strictly the <strong>MINIMUM</strong> of the following three amounts:</p>
          <ol>
            <li><strong>Actual HRA Received:</strong> The exact amount given by your employer under the 'HRA' head.</li>
            <li><strong>Rent Paid minus 10% of Basic:</strong> The actual rent you pay, minus 10% of your Basic Salary + DA. (This means the first 10% of your basic salary goes towards rent without any tax benefit).</li>
            <li><strong>50% or 40% of Basic Salary:</strong> If you reside in a Metro city (Delhi, Mumbai, Kolkata, Chennai), the limit is 50% of your basic. If you reside in any other Non-Metro city (including tech hubs like Bangalore, Hyderabad, Pune, Gurugram), the limit is 40%.</li>
          </ol>

          <h3>Common Pitfalls & Mistakes to Avoid</h3>
          <ul>
            <li><strong>Confusing Gross Salary with Basic Salary:</strong> The 10%, 40%, and 50% calculations are based ONLY on your Basic Salary (plus Dearness Allowance, if applicable). Do not use your Gross Salary or CTC. Usually, Basic is 40-50% of your CTC.</li>
            <li><strong>Rent is less than 10% of Basic:</strong> If you pay very low rent—specifically, less than 10% of your Basic Salary—then Condition #2 results in a negative number, meaning your exemption is ZERO. You will pay tax on your entire HRA.</li>
            <li><strong>Claiming Bangalore/Hyderabad as a Metro:</strong> A very common mistake! For Income Tax purposes, only Delhi, Mumbai, Kolkata, and Chennai are considered Metro cities eligible for the 50% limit. Bangalore, Hyderabad, Pune, and Noida are Non-Metros (40% limit).</li>
          </ul>

          <h3>Important Rules for Claiming HRA Exemption (2026-27)</h3>
          <ul>
            <li><strong>Rent Receipts:</strong> You must submit valid rent receipts to your employer. A revenue stamp is required if cash payment exceeds ₹5,000 per receipt.</li>
            <li><strong>Landlord's PAN:</strong> If your annual rent exceeds ₹1,00,000 (i.e., more than ₹8,333 per month), it is mandatory to provide your landlord's PAN card to your employer. Without the PAN, the exemption will be denied.</li>
            <li><strong>Living with Parents:</strong> Yes, you can claim HRA while living with your parents! You must actually pay them rent via bank transfer, and they must declare this rental income when filing their own Income Tax Returns. You cannot claim HRA if you live in a house owned by your spouse.</li>
            <li><strong>Old vs New Tax Regime:</strong> <strong>Crucial Update:</strong> HRA exemption under Section 10(13A) is ONLY available if you opt for the Old Tax Regime. If you switch to the New Tax Regime, HRA exemption is abolished, and the entire HRA becomes fully taxable!</li>
          </ul>

          <div className="bg-purple-50 p-4 rounded-lg my-4 text-sm border-l-4 border-purple-500 not-prose">
            <p className="font-semibold mb-1">What if I don't receive HRA but pay rent?</p>
            <p>If you are a freelancer, businessman, or a salaried employee whose salary structure does not include an HRA component, you cannot claim exemption under Section 10(13A). Instead, you can claim a deduction for rent paid under <strong>Section 80GG</strong>, up to a maximum of ₹60,000 per year (₹5,000 per month), subject to certain conditions.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/income-tax-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-purple-50 hover:border-purple-400 text-gray-600">Income Tax Calculator</a>
            <a href="/calculators/salary-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-purple-50 hover:border-purple-400 text-gray-600">Salary Breakup Calculator</a>
            <a href="/calculators/home-loan-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-purple-50 hover:border-purple-400 text-gray-600">Home Loan Calculator</a>
            <a href="/calculators/rent-vs-buy-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-purple-50 hover:border-purple-400 text-gray-600">Rent vs Buy Calculator</a>
          </div>
        </div>
      </div>
    </>
  );
};
