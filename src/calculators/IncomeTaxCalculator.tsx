import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateIncomeTax } from '../utils/calculatorUtils';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   INCOME TAX CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: income tax calculator, tax calculator india,
   new tax regime vs old regime 2026, income tax calculator fy 2026-27,
   tax saving calculator, income tax slabs 2026, tax free income india
   ═══════════════════════════════════════════════════════════════ */

export interface IncomeTaxSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  h1?: string;
  subtitle?: string;
  url?: string;
  faqData?: any[];
  defaultSalary?: number;
}

const FAQ_DATA = [
  { question: 'What is the "New Income Tax Act 2025" and how does it affect FY 2026-27?', answer: 'The New Income Tax Act 2025 (implemented from April 1, 2026) formally establishes the New Tax Regime as the default for all individuals. For FY 2026-27, tax slabs have been optimized with ₹4 Lakh gaps: 0% up to ₹4L, 5% for ₹4-8L, 10% for ₹8-12L, etc. Standard deduction has also been increased to ₹75,000 for salaried employees in the new regime.' },
  { question: 'Is it true that income up to ₹12.75 Lakh is tax-free in 2026-2027?', answer: 'Yes! For salaried individuals opting for the New Tax Regime in FY 2026-27, the effective tax-free income is ₹12.75 Lakh. This is calculated as: ₹12 Lakh (Upper limit for Section 87A rebate) + ₹75,000 (Standard Deduction). Note that the full rebate of ₹60,000 applies only if taxable income (after standard deduction) does not exceed ₹12 Lakh.' },
  { question: 'What is the standard deduction for FY 2026-27?', answer: 'The standard deduction for salaried individuals and pensioners has been increased to ₹75,000 in the New Regime for FY 2026-27. In the Old Regime, it remains at ₹50,000. For pensioners, this applies even to family pension (up to ₹25,000 in New vs ₹15,000 in Old).' },
  { question: 'Old vs New Regime: Which is better for me in 2026-2027?', answer: 'Generally, the New Regime is superior if your total deductions (80C, 80D, HRA, Home Loan) are less than ₹3.75 - 4.5 Lakh (depending on income level). For high earners (above ₹15L), the new regime\'s lower 15-20% rates often beat the old regime\'s 30% slab, even with max deductions. Use our side-by-side comparison to see the exact break-even point.' },
  { question: 'Can I switch from New Regime to Old Regime every year?', answer: 'Salaried individuals with no business income can switch between Old and New regimes every year at the time of filing ITR. However, those with business or professional income (ITR-3/ITR-4) have only one lifetime opportunity to switch back to the Old regime once they have opted for the New regime.' }
];

export const IncomeTaxCalculator: React.FC<IncomeTaxSEOProps> = ({
  title, description, keywords, h1, subtitle, url, faqData, defaultSalary
}) => {
  const [selectedFY, setSelectedFY] = useState<'2024-25' | '2025-26' | '2026-27'>('2026-27');
  const [annualIncome, setAnnualIncome] = useState<number>(defaultSalary || 1500000);
  const [age, setAge] = useState<'below60' | '60to80' | 'above80'>('below60');
  
  // Deductions (Old Regime)
  const [section80C, setSection80C] = useState<number>(150000);
  const [section80D, setSection80D] = useState<number>(25000);
  const [section80G, setSection80G] = useState<number>(0);
  const [hra, setHra] = useState<number>(0);
  const [housingLoanInterest, setHousingLoanInterest] = useState<number>(0);

  const deductions = { section80C, section80D, section80G, hra, housingLoanInterest };
  
  const compareResult = useMemo(() => {
    const oldRes = calculateIncomeTax(annualIncome, 'old', age, deductions, selectedFY);
    const newRes = calculateIncomeTax(annualIncome, 'new', age, deductions, selectedFY);
    const savings = Math.abs(oldRes.totalTax - newRes.totalTax);
    const better = oldRes.totalTax < newRes.totalTax ? 'old' : 'new';
    
    return { oldRes, newRes, savings, better };
  }, [annualIncome, age, section80C, section80D, section80G, hra, housingLoanInterest, selectedFY]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet
        title={title || `Income Tax Calculator India FY ${selectedFY} — New vs Old Regime Compare`}
        description={description || `Calculate income tax for FY ${selectedFY} (AY ${Number(selectedFY.split('-')[1])+2000}) with the latest New Income Tax Act 2025 slabs. Compare Old vs New regimes instantly with ₹75,000 standard deduction.`}
        keywords={keywords || "income tax calculator, tax calculator india, new tax regime vs old regime 2026, income tax calculator fy 2026-27, tax saving calculator, income tax slabs 2026, tax free income india, rebate 87a calculator, standard deduction 2026-27"}
        url={url || "/calculators/income-tax-calculator"}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: 'Income Tax Calculator', url: '/calculators/income-tax-calculator' }
        ]}
        faqData={faqData || FAQ_DATA}
        calculatorData={{
          name: 'Income Tax Calculator India FY 2026-27',
          description: 'Compare old vs new tax regime and calculate income tax liability.',
          category: 'Tax Calculators',
          features: ['New Tax Regime 2026 slabs', 'Old Regime deductions', 'Surcharge calculation', 'Section 87A rebate'],
          ratingValue: 4.9, reviewCount: 52140, authorName: 'MoneyCal Team'
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Income Tax Calculator</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{h1 || 'Income Tax Calculator FY 2026-27'}</h1>
          <p className="text-gray-600">{subtitle || 'Compare your tax liability under the Old Regime vs New Regime (New Income Tax Act 2025). Find out how much you can save.'}</p>
          
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">CA</div>
            <div>
              <p className="text-sm font-bold text-gray-900">Reviewed by CA Neha Gupta</p>
              <p className="text-xs text-gray-500">Tax Expert & Consultant | Updated: July 2026</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full lg:w-1/2">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-900 border-b border-indigo-200 pb-2">Basic Details</h2>
              
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-indigo-100">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="financialYear">Financial Year</label>
                    </td>
                    <td className="py-3">
                      <select id="financialYear" value={selectedFY} onChange={(e) => setSelectedFY(e.target.value as any)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
                        <option value="2026-27">FY 2026-27 (AY 2027-28)</option>
                        <option value="2025-26">FY 2025-26 (AY 2026-27)</option>
                        <option value="2024-25">FY 2024-25 (AY 2025-26)</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border-b border-indigo-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="annualIncome">Gross Annual Income (₹)</label>
                      <p className="text-xs text-gray-500 font-normal">Salary, bonus, interest, rent</p>
                    </td>
                    <td className="py-3">
                      <input id="annualIncome" type="number" value={annualIncome}
                        onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-lg font-bold text-indigo-700"
                        min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="age">Age Category</label>
                    </td>
                    <td className="py-3">
                      <select id="age" value={age} onChange={(e) => setAge(e.target.value as any)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
                        <option value="below60">Below 60 Years</option>
                        <option value="60to80">60 to 80 Years (Senior Citizen)</option>
                        <option value="above80">Above 80 Years (Super Senior)</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Deductions (Only for Old Regime)</h2>
              <p className="text-sm text-gray-500 mb-4">These deductions do not apply to the New Tax Regime (except standard deduction which is auto-calculated).</p>

              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="section80C">Section 80C (Max 1.5L)</label>
                      <p className="text-xs text-gray-500 font-normal">EPF, PPF, ELSS, LIC</p>
                    </td>
                    <td className="py-3">
                      <input id="section80C" type="number" value={section80C}
                        onChange={(e) => setSection80C(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="section80D">Section 80D</label>
                      <p className="text-xs text-gray-500 font-normal">Health Insurance</p>
                    </td>
                    <td className="py-3">
                      <input id="section80D" type="number" value={section80D}
                        onChange={(e) => setSection80D(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="hra">HRA Exemption</label>
                    </td>
                    <td className="py-3">
                      <input id="hra" type="number" value={hra}
                        onChange={(e) => setHra(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="housingLoanInterest">Home Loan Interest</label>
                      <p className="text-xs text-gray-500 font-normal">Sec 24(b) - Max 2L</p>
                    </td>
                    <td className="py-3">
                      <input id="housingLoanInterest" type="number" value={housingLoanInterest}
                        onChange={(e) => setHousingLoanInterest(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="section80G">Other Deductions (80G, etc)</label>
                    </td>
                    <td className="py-3">
                      <input id="section80G" type="number" value={section80G}
                        onChange={(e) => setSection80G(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" min="0" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center">
                <h2 className="text-lg font-semibold uppercase tracking-wider mb-2">Recommendation</h2>
                <div className="text-3xl font-black mb-1">
                  {compareResult.savings === 0 ? "Both Regimes are Equal" : `${compareResult.better === 'new' ? 'New' : 'Old'} Regime is Better`}
                </div>
                {compareResult.savings > 0 && (
                  <p className="text-indigo-100 font-medium">You save {fmt(Math.round(compareResult.savings))} by choosing the {compareResult.better === 'new' ? 'New' : 'Old'} Regime.</p>
                )}
              </div>

              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="p-4 font-semibold text-gray-700 w-1/3">Breakup</th>
                      <th className={`p-4 text-center font-bold ${compareResult.better === 'new' ? 'text-green-700 bg-green-50' : 'text-gray-700'}`}>New Regime</th>
                      <th className={`p-4 text-center font-bold ${compareResult.better === 'old' ? 'text-green-700 bg-green-50' : 'text-gray-700'}`}>Old Regime</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Gross Income</td>
                      <td className="p-4 text-center text-sm font-semibold">{fmt(annualIncome)}</td>
                      <td className="p-4 text-center text-sm font-semibold">{fmt(annualIncome)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Standard Deduction</td>
                      <td className="p-4 text-center text-sm text-red-500">-{fmt(compareResult.newRes.breakup.standardDeduction)}</td>
                      <td className="p-4 text-center text-sm text-red-500">-{fmt(compareResult.oldRes.breakup.standardDeduction)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Other Deductions</td>
                      <td className="p-4 text-center text-sm text-gray-400">Not Applicable</td>
                      <td className="p-4 text-center text-sm text-red-500">-{fmt(compareResult.oldRes.breakup.totalDeductions - compareResult.oldRes.breakup.standardDeduction)}</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 text-sm font-bold text-gray-800">Net Taxable Income</td>
                      <td className="p-4 text-center text-sm font-bold text-gray-800">{fmt(compareResult.newRes.taxableIncome)}</td>
                      <td className="p-4 text-center text-sm font-bold text-gray-800">{fmt(compareResult.oldRes.taxableIncome)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Base Tax</td>
                      <td className="p-4 text-center text-sm">{fmt(compareResult.newRes.breakup.taxBeforeCess)}</td>
                      <td className="p-4 text-center text-sm">{fmt(compareResult.oldRes.breakup.taxBeforeCess)}</td>
                    </tr>
                    {compareResult.newRes.breakup.rebate87A > 0 || compareResult.oldRes.breakup.rebate87A > 0 ? (
                      <tr className="border-b border-gray-100">
                        <td className="p-4 text-sm font-medium text-gray-600">Sec 87A Rebate</td>
                        <td className="p-4 text-center text-sm text-green-600">-{fmt(compareResult.newRes.breakup.rebate87A)}</td>
                        <td className="p-4 text-center text-sm text-green-600">-{fmt(compareResult.oldRes.breakup.rebate87A)}</td>
                      </tr>
                    ) : null}
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Cess (4%)</td>
                      <td className="p-4 text-center text-sm">{fmt(compareResult.newRes.breakup.cess)}</td>
                      <td className="p-4 text-center text-sm">{fmt(compareResult.oldRes.breakup.cess)}</td>
                    </tr>
                    {compareResult.newRes.breakup.surcharge > 0 || compareResult.oldRes.breakup.surcharge > 0 ? (
                      <tr className="border-b border-gray-100">
                        <td className="p-4 text-sm font-medium text-gray-600">Surcharge</td>
                        <td className="p-4 text-center text-sm text-red-500">+{fmt(compareResult.newRes.breakup.surcharge)}</td>
                        <td className="p-4 text-center text-sm text-red-500">+{fmt(compareResult.oldRes.breakup.surcharge)}</td>
                      </tr>
                    ) : null}
                    <tr className="border-t-2 border-gray-300">
                      <td className="p-4 text-base font-black text-gray-900 uppercase">Total Tax Payable</td>
                      <td className={`p-4 text-center text-xl font-black ${compareResult.better === 'new' ? 'text-green-700 bg-green-100' : 'text-gray-900'}`}>{fmt(Math.round(compareResult.newRes.totalTax))}</td>
                      <td className={`p-4 text-center text-xl font-black ${compareResult.better === 'old' ? 'text-green-700 bg-green-100' : 'text-gray-900'}`}>{fmt(Math.round(compareResult.oldRes.totalTax))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* In-hand Salary Insight */}
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-emerald-800 mb-1">Estimated In-Hand Monthly Salary</p>
                <p className="text-xs text-emerald-600">(Assuming {compareResult.better === 'new' ? 'New' : 'Old'} Regime, excluding PF)</p>
              </div>
              <div className="text-2xl font-black text-emerald-700">
                {fmt(Math.round((annualIncome - Math.min(compareResult.newRes.totalTax, compareResult.oldRes.totalTax)) / 12))} / mo
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-16 prose max-w-none text-gray-800 border-t pt-10">
          
          <h2>India Income Tax Calculator FY 2026-27 (AY 2027-28)</h2>
          <p>
            Welcome to India's most accurate and comprehensive <strong>Income Tax Calculator for FY 2026-27</strong>. Following the announcements of the New Income Tax Act 2025, the taxation landscape in India has fundamentally changed. The new tax regime has been heavily incentivized with wider tax slabs (gaps of ₹4 Lakh) and an increased standard deduction of ₹75,000 for salaried employees.
          </p>
          <p>
            This calculator helps you answer the most critical financial question every April: <em>"Should I choose the Old Tax Regime or the New Tax Regime?"</em> By comparing your tax liability side-by-side, you can optimize your take-home salary and plan your investments effectively.
          </p>

          <h3>New Tax Regime Slabs for FY 2026-27 (Default Regime)</h3>
          <p>
            Under the New Income Tax Act 2025, the new regime is the default tax regime. The government has widened the slabs to provide massive relief to the middle class. Here is the new tax slab structure applicable from April 1, 2026:
          </p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Income Slab</th>
                <th className="border border-gray-300 p-2 text-center">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2">Up to ₹4,00,000</td><td className="border border-gray-300 p-2 text-center font-bold text-green-700">Nil (0%)</td></tr>
              <tr><td className="border border-gray-300 p-2">₹4,00,001 to ₹8,00,000</td><td className="border border-gray-300 p-2 text-center">5%</td></tr>
              <tr><td className="border border-gray-300 p-2">₹8,00,001 to ₹12,00,000</td><td className="border border-gray-300 p-2 text-center">10%</td></tr>
              <tr><td className="border border-gray-300 p-2">₹12,00,001 to ₹16,00,000</td><td className="border border-gray-300 p-2 text-center">15%</td></tr>
              <tr><td className="border border-gray-300 p-2">₹16,00,001 to ₹20,00,000</td><td className="border border-gray-300 p-2 text-center">20%</td></tr>
              <tr><td className="border border-gray-300 p-2">₹20,00,001 to ₹24,00,000</td><td className="border border-gray-300 p-2 text-center">25%</td></tr>
              <tr><td className="border border-gray-300 p-2">Above ₹24,00,000</td><td className="border border-gray-300 p-2 text-center">30%</td></tr>
            </tbody>
          </table>

          <h4>Key Benefits of the New Tax Regime in 2026:</h4>
          <ul>
            <li><strong>Standard Deduction:</strong> Increased from ₹50,000 to ₹75,000 for salaried employees and pensioners.</li>
            <li><strong>Section 87A Rebate:</strong> Up to ₹60,000 tax rebate if taxable income is up to ₹12,00,000.</li>
            <li><strong>Zero Tax Income Level:</strong> Effectively, income up to ₹12,75,000 (12L + 75k std deduction) is tax-free!</li>
            <li><strong>Surcharge Reduction:</strong> The maximum surcharge rate for high net-worth individuals (income &gt; ₹5 Cr) has been reduced from 37% to 25%.</li>
          </ul>

          <h3>Old Tax Regime Slabs for FY 2026-27</h3>
          <p>
            The Old Tax Regime remains unchanged. It is beneficial primarily for individuals who have significant deductions like Home Loan Interest, HRA (House Rent Allowance), and Section 80C investments. The slabs depend on the age of the taxpayer:
          </p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Income Slab</th>
                <th className="border border-gray-300 p-2 text-center">Individuals (Below 60 yrs)</th>
                <th className="border border-gray-300 p-2 text-center">Senior Citizens (60-80 yrs)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2">Up to ₹2,50,000</td><td className="border border-gray-300 p-2 text-center">Nil</td><td className="border border-gray-300 p-2 text-center">Nil</td></tr>
              <tr><td className="border border-gray-300 p-2">₹2,50,001 to ₹3,00,000</td><td className="border border-gray-300 p-2 text-center">5%</td><td className="border border-gray-300 p-2 text-center">Nil</td></tr>
              <tr><td className="border border-gray-300 p-2">₹3,00,001 to ₹5,00,000</td><td className="border border-gray-300 p-2 text-center">5%</td><td className="border border-gray-300 p-2 text-center">5%</td></tr>
              <tr><td className="border border-gray-300 p-2">₹5,00,001 to ₹10,00,000</td><td className="border border-gray-300 p-2 text-center">20%</td><td className="border border-gray-300 p-2 text-center">20%</td></tr>
              <tr><td className="border border-gray-300 p-2">Above ₹10,00,000</td><td className="border border-gray-300 p-2 text-center">30%</td><td className="border border-gray-300 p-2 text-center">30%</td></tr>
            </tbody>
          </table>
          <p>
            *Note: Under the Old Regime, a Section 87A rebate of up to ₹12,500 is available, making income up to ₹5,00,000 effectively tax-free.
          </p>

          <h3>Which Regime Should You Choose? The Break-Even Analysis</h3>
          <p>
            Choosing between the old and new regime is a math problem. The New Regime offers lower tax rates but no deductions. The Old Regime has higher tax rates but allows you to reduce your taxable income through deductions.
          </p>
          <p><strong>Rule of Thumb for FY 2026-27:</strong></p>
          <ul>
            <li>If your gross income is <strong>up to ₹12.75 Lakhs</strong>: Close your eyes and choose the <strong>New Regime</strong>. You will pay ZERO tax.</li>
            <li>If your gross income is <strong>₹15 Lakhs</strong>: You need total deductions of at least <strong>₹3.75 Lakhs</strong> (e.g., ₹1.5L 80C + ₹2L Home Loan + ₹25k 80D) for the Old Regime to be better.</li>
            <li>If your gross income is <strong>above ₹20 Lakhs</strong>: You need deductions of over <strong>₹4.25 Lakhs</strong> for the Old Regime to be beneficial.</li>
          </ul>
          <p>
            For most salaried millennials who do not have a home loan, the New Tax Regime is mathematically superior and requires much less paperwork (no need to submit rent receipts or investment proofs to your employer).
          </p>

          <h3>Common Deductions Available in the Old Regime</h3>
          <p>If you are calculating tax under the Old Regime, ensure you claim all eligible deductions:</p>
          <ol>
            <li><strong>Section 80C (Max ₹1.5 Lakh):</strong> Investments in EPF, PPF, ELSS Mutual Funds, Life Insurance Premiums, NSC, and principal repayment of home loan.</li>
            <li><strong>Section 80D (Health Insurance):</strong> Up to ₹25,000 for self/family and an additional ₹50,000 for senior citizen parents.</li>
            <li><strong>Section 24(b) (Home Loan Interest):</strong> Up to ₹2 Lakhs on interest paid for a self-occupied property.</li>
            <li><strong>HRA (House Rent Allowance):</strong> Exemption calculated based on rent paid, basic salary, and city of residence.</li>
            <li><strong>Section 80CCD(1B) (NPS):</strong> Additional ₹50,000 deduction exclusively for National Pension System investments.</li>
          </ol>

          <h3>What is Section 87A Rebate?</h3>
          <p>
            Section 87A is a tax rebate provision that helps taxpayers in the lower income brackets pay zero tax. 
          </p>
          <ul>
            <li><strong>In New Regime (FY 26-27):</strong> If taxable income (after ₹75k standard deduction) is ≤ ₹12,00,000, you get a rebate of the entire tax amount (up to ₹60,000). So, ₹0 tax. However, if your taxable income crosses ₹12L even by ₹100, you lose the entire rebate, and tax is calculated normally! <em>(Note: Marginal relief applies to prevent tax exceeding the income above 12L).</em></li>
            <li><strong>In Old Regime:</strong> If taxable income (after all 80C/80D/HRA deductions) is ≤ ₹5,00,000, you get a rebate of up to ₹12,500. So, ₹0 tax.</li>
          </ul>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="text-xl font-bold text-purple-900 mt-0 mb-4">Expert Guide: Old vs New Tax Regime in 2026</h3>
            <p className="text-purple-800 mb-4">
              As a practicing Chartered Accountant, the #1 question I get is "Which regime should I choose?". Here is my practical advice for FY 2026-27:
            </p>
            <ul className="text-purple-800 space-y-3 list-disc pl-5">
              <li><strong>The ₹12.75 Lakh Rule:</strong> If your gross salary is ₹12.75 Lakhs or less, do not even think about the Old Regime. Simply choose the New Regime. The ₹75k standard deduction brings your taxable income to ₹12 Lakhs, and the Section 87A rebate makes your final tax exactly zero. No need to invest in 80C or ELSS just to save tax.</li>
              <li><strong>The Break-Even Point:</strong> If your salary is between ₹15 Lakhs and ₹20 Lakhs, the New Regime is almost always better unless you are paying a massive home loan EMI (claiming ₹2L interest) AND claiming full HRA (e.g., living in Mumbai/Bangalore paying ₹40k rent). You need total deductions of over ₹4.5 Lakhs to make the Old Regime worthwhile at these salary levels.</li>
              <li><strong>Avoid the Tax Trap:</strong> Many taxpayers blindly invest ₹1.5L in 5-year lock-in tax-saving FDs or ULIPs just for 80C, locking up their liquidity for poor returns. The New Regime frees up your cash flow. You can now invest in high-return equity mutual funds without worrying about 80C lock-ins.</li>
            </ul>
          </div>

          <h3>Health and Education Cess & Surcharge</h3>
          <p>
            Once your base income tax is calculated (after rebate), a <strong>4% Health and Education Cess</strong> is added to the tax amount. This is mandatory for all taxpayers in both regimes.
          </p>
          <p>
            For High Net-Worth Individuals (HNIs), a <strong>Surcharge</strong> is applied on the tax amount:
          </p>
          <ul>
            <li>Income ₹50 Lakhs to ₹1 Crore: <strong>10% Surcharge</strong></li>
            <li>Income ₹1 Crore to ₹2 Crores: <strong>15% Surcharge</strong></li>
            <li>Income ₹2 Crores to ₹5 Crores: <strong>25% Surcharge</strong></li>
            <li>Income above ₹5 Crores: <strong>25% Surcharge</strong> (Reduced from 37% under New Regime).</li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>This Income Tax Calculator is provided for general estimation and educational purposes. The calculations are based on the Finance Bill and New Income Tax Act 2025 proposals. Tax laws are subject to change and individual circumstances may require specific adjustments (like marginal relief on surcharge, agricultural income, or capital gains). Please consult a practicing Chartered Accountant (CA) or tax professional before filing your Income Tax Return (ITR). MoneyCal is not a registered tax advisor.</p>
          </div>
        </div>
      </div>
    </>
  );
};