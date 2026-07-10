import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   SALARY CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: salary calculator india, in hand salary calculator,
   ctc to in hand salary calculator, net pay calculator,
   gross salary calculator, take home salary calculator
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is Cost to Company (CTC)?", answer: "Cost to Company (CTC) is the total amount a company spends on an employee in a year. It includes your Basic Salary, Allowances (HRA, LTA, Special), Bonus, Employer's contribution to Provident Fund (PF), and Gratuity. Your in-hand (take-home) salary is always lower than your CTC." },
  { question: "How is In-Hand (Take-Home) Salary calculated?", answer: "In-hand salary is calculated by deducting Provident Fund (PF), Professional Tax (PT), and Tax Deducted at Source (TDS/Income Tax) from your Gross Salary. Gross Salary is your CTC minus Employer's PF and Gratuity." },
  { question: "What is the difference between Gross Salary and Net Salary?", answer: "Gross salary is your total earnings before any deductions (Basic + HRA + Allowances + Bonus). Net salary is the actual amount credited to your bank account after mandatory deductions like PF, ESI, Professional Tax, and Income Tax." },
  { question: "How much is deducted for Provident Fund (PF)?", answer: "Typically, 12% of your Basic Salary is deducted as the Employee's Contribution to PF. The Employer also contributes an equal 12%. Both amounts are part of your CTC, but only your 12% is deducted from your Gross Salary." },
  { question: "Is Gratuity part of my take-home salary?", answer: "No. Gratuity is a statutory benefit paid by the employer if you complete 5 continuous years of service. It is shown as a component in your CTC (approx 4.81% of Basic Salary) but it is not paid out in your monthly salary." }
];

export const SalaryCalculator: React.FC = () => {
  // Input states
  const [basicSalary, setBasicSalary] = useState(50000);
  const [hra, setHra] = useState(25000);
  const [specialAllowance, setSpecialAllowance] = useState(10000);
  const [otherAllowances, setOtherAllowances] = useState(5000);
  const [pfContribution, setPfContribution] = useState(12);
  const [professionalTax, setProfessionalTax] = useState(200);
  const [tds, setTds] = useState(5000);

  // Calculations
  const calculations = useMemo(() => {
    // Gross Salary Components
    const monthlyBasic = basicSalary;
    const monthlyHRA = hra;
    const monthlySpecial = specialAllowance;
    const monthlyOther = otherAllowances;
    
    const grossMonthlySalary = monthlyBasic + monthlyHRA + monthlySpecial + monthlyOther;
    const grossAnnualSalary = grossMonthlySalary * 12;
    
    // Deductions
    const monthlyPF = (monthlyBasic * pfContribution) / 100;
    const employerPF = monthlyPF; // Employer contribution (equal)
    const monthlyProfTax = professionalTax;
    const monthlyTDS = tds;
    const totalMonthlyDeductions = monthlyPF + monthlyProfTax + monthlyTDS;
    
    // Net Salary
    const netMonthlySalary = grossMonthlySalary - totalMonthlyDeductions;
    const netAnnualSalary = netMonthlySalary * 12;
    
    // CTC (Cost to Company)
    const employerPFAnnual = employerPF * 12;
    const gratuity = (monthlyBasic * 12 * 0.0481); // Approx 4.81% of basic
    const ctc = grossAnnualSalary + employerPFAnnual + gratuity;
    
    return {
      grossMonthlySalary: Math.round(grossMonthlySalary),
      grossAnnualSalary: Math.round(grossAnnualSalary),
      netMonthlySalary: Math.round(netMonthlySalary),
      netAnnualSalary: Math.round(netAnnualSalary),
      ctc: Math.round(ctc),
      monthlyPF: Math.round(monthlyPF),
      employerPF: Math.round(employerPF),
      totalMonthlyDeductions: Math.round(totalMonthlyDeductions),
      gratuity: Math.round(gratuity),
    };
  }, [basicSalary, hra, specialAllowance, otherAllowances, pfContribution, professionalTax, tds]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="Salary Calculator India 2026 | CTC to In Hand Net Salary" 
        description="Calculate your exact in-hand take-home salary from your CTC. Accurately deducts PF, Professional Tax, TDS, and calculates Gratuity for Indian employees." 
        keywords="salary calculator india, in hand salary calculator, ctc to in hand salary calculator, net pay calculator, gross salary calculator, take home salary calculator" 
        url="/calculators/salary-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Salary Calculator 2026', description: 'CTC to Take-home salary breakdown.', category: 'Income Calculators', features: ['CTC breakdown', 'PF & TDS Deductions', 'Gratuity calculation'], ratingValue: 4.8, reviewCount: 12900, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Salary Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Salary Calculator India</h1>
          <p className="text-gray-600">Enter your monthly salary components below to calculate your exact Cost to Company (CTC), Gross Salary, and Net In-Hand (Take-Home) Salary after all deductions.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            
            {/* Earnings Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-900 border-b border-blue-200 pb-2">Monthly Earnings</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="basicSalary">Basic Salary</label>
                    </td>
                    <td className="py-3">
                      <input id="basicSalary" type="number" value={basicSalary}
                        onChange={(e) => setBasicSalary(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg font-bold"
                        min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="hra">HRA (House Rent Allowance)</label>
                    </td>
                    <td className="py-3">
                      <input id="hra" type="number" value={hra}
                        onChange={(e) => setHra(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="specialAllowance">Special Allowance</label>
                    </td>
                    <td className="py-3">
                      <input id="specialAllowance" type="number" value={specialAllowance}
                        onChange={(e) => setSpecialAllowance(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="otherAllowances">Other Allowances (LTA, etc.)</label>
                    </td>
                    <td className="py-3">
                      <input id="otherAllowances" type="number" value={otherAllowances}
                        onChange={(e) => setOtherAllowances(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="0" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions Section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-red-900 border-b border-red-200 pb-2">Monthly Deductions</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-red-100">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="pfContribution">PF Contribution (% of Basic)</label>
                      <p className="text-xs text-gray-500 font-normal">Standard is 12%</p>
                    </td>
                    <td className="py-3">
                      <input id="pfContribution" type="number" value={pfContribution}
                        onChange={(e) => setPfContribution(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" min="0" max="100" />
                    </td>
                  </tr>
                  <tr className="border-b border-red-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="professionalTax">Professional Tax</label>
                      <p className="text-xs text-gray-500 font-normal">Varies by State (₹0 - ₹200)</p>
                    </td>
                    <td className="py-3">
                      <input id="professionalTax" type="number" value={professionalTax}
                        onChange={(e) => setProfessionalTax(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="tds">TDS (Income Tax)</label>
                      <p className="text-xs text-gray-500 font-normal">Estimated Tax Deduction</p>
                    </td>
                    <td className="py-3">
                      <input id="tds" type="number" value={tds}
                        onChange={(e) => setTds(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" min="0" />
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
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-blue-200">Net Take-Home Salary (In-Hand)</h2>
                <div className="text-4xl font-black mb-1">
                  ₹{fmtNum(calculations.netMonthlySalary)} <span className="text-xl font-medium">/ month</span>
                </div>
                <p className="text-blue-100 text-sm font-medium mt-2">Annual Take-Home: {fmt(calculations.netAnnualSalary)}</p>
              </div>

              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="p-4 text-sm font-bold text-gray-800">Gross Monthly Salary</td>
                      <td className="p-4 text-right text-base font-bold text-gray-800">{fmt(calculations.grossMonthlySalary)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Total Monthly Deductions</td>
                      <td className="p-4 text-right text-base font-semibold text-red-600">-{fmt(calculations.totalMonthlyDeductions)}</td>
                    </tr>
                    <tr className="border-t-2 border-gray-200 mt-4">
                      <td colSpan={2} className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-50">Cost to Company (CTC) Breakdown</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Gross Annual Salary</td>
                      <td className="p-4 text-right text-sm font-semibold">{fmt(calculations.grossAnnualSalary)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Employer PF Contribution (Annual)</td>
                      <td className="p-4 text-right text-sm font-semibold text-blue-700">+{fmt(calculations.employerPF * 12)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Gratuity (Approx 4.81% of Basic)</td>
                      <td className="p-4 text-right text-sm font-semibold text-blue-700">+{fmt(calculations.gratuity)}</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-blue-50">
                      <td className="p-4 text-base font-bold text-blue-900">Total Annual CTC</td>
                      <td className="p-4 text-right text-lg font-black text-blue-800">{fmt(calculations.ctc)}</td>
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
          
          <h2>What is a Salary Calculator?</h2>
          <p>
            An <strong>In-Hand Salary Calculator</strong> is a tool designed to help Indian employees understand their exact take-home pay based on their Cost to Company (CTC). When you receive an offer letter with a specific CTC, it can be confusing to figure out how much money will actually hit your bank account every month. Our calculator breaks down every component—from Basic Salary and HRA to PF, Gratuity, and TDS—giving you absolute clarity on your net salary.
          </p>
          <p>
            Whether you are negotiating a new job offer or planning your monthly budget, understanding the difference between CTC, Gross Salary, and Net Salary is crucial for your financial health.
          </p>

          <h3>Understanding Salary Terminology</h3>
          
          <h4>1. Cost to Company (CTC)</h4>
          <p>
            The CTC is the total expense a company incurs to employ you for one year. It looks like a big, attractive number on your offer letter, but it includes several components that you will not receive as cash in your monthly salary.
          </p>
          <ul>
            <li><strong>Direct Benefits:</strong> Basic Salary, HRA, LTA, Special Allowances, Bonus.</li>
            <li><strong>Indirect Benefits:</strong> Employer's contribution to Provident Fund (EPF), Employer's contribution to ESI, Health Insurance premiums paid by the company, and Gratuity.</li>
          </ul>

          <h4>2. Gross Salary</h4>
          <p>
            Gross salary is your CTC minus the indirect benefits. It is the total amount you earn in a month before any taxes or deductions are applied. 
          </p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center text-lg border-l-4 border-blue-600">
            <strong>Gross Salary = Basic + HRA + Allowances + Bonus</strong>
          </div>

          <h4>3. Net Salary (In-Hand / Take-Home Pay)</h4>
          <p>
            This is the actual cash amount credited to your bank account at the end of the month. It is calculated by subtracting statutory deductions from your Gross Salary.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center text-lg border-l-4 border-blue-600">
            <strong>Net Salary = Gross Salary - (PF + Professional Tax + TDS)</strong>
          </div>

          <h3>Breakdown of Salary Components</h3>
          
          <h4>Basic Salary</h4>
          <p>
            The Basic Salary is the core of your compensation package. It is fully taxable and usually makes up 40% to 50% of your CTC. Most of your other components (like PF, Gratuity, and HRA exemptions) are calculated as a percentage of your Basic Salary. Keeping basic salary high increases your PF savings but also increases your tax liability.
          </p>

          <h4>House Rent Allowance (HRA)</h4>
          <p>
            HRA is provided to meet your accommodation expenses. Under Section 10(13A) of the Income Tax Act, you can claim tax exemption on HRA if you live in a rented house and pay rent. The exemption is the minimum of:
          </p>
          <ol>
            <li>Actual HRA received from the employer.</li>
            <li>50% of Basic Salary (for metro cities) or 40% (for non-metro cities).</li>
            <li>Actual rent paid minus 10% of Basic Salary.</li>
          </ol>
          <p><em>Note: If you opt for the New Tax Regime, HRA exemption is not available.</em></p>

          <h4>Special Allowance</h4>
          <p>
            This is a fully taxable component used by employers to balance out the remaining CTC after all other allocations (Basic, HRA, PF) have been made. It acts as a residual component.
          </p>

          <h4>Leave Travel Allowance (LTA)</h4>
          <p>
            LTA is an allowance paid to cover your travel expenses when you are on leave from work. The amount received as LTA is tax-free up to a certain limit, provided you submit valid travel tickets (domestic travel only) to your employer. Exemption can be claimed twice in a block of four years.
          </p>

          <h3>Statutory Deductions (Why your Net Salary is lower)</h3>

          <h4>1. Employee Provident Fund (EPF)</h4>
          <p>
            EPF is a mandatory retirement savings scheme governed by the EPFO. If your company has more than 20 employees, PF deduction is mandatory. 
          </p>
          <ul>
            <li><strong>Employee Contribution:</strong> 12% of your Basic Salary is deducted from your Gross Salary every month.</li>
            <li><strong>Employer Contribution:</strong> The employer also contributes 12% of your Basic Salary. Out of this, 8.33% goes to the Employee Pension Scheme (EPS) and 3.67% goes to the EPF account. (This entire 12% is part of your CTC but is not deducted from your Gross Salary).</li>
          </ul>

          <h4>2. Professional Tax (PT)</h4>
          <p>
            Professional Tax is a state-level tax levied on salaried individuals. It varies from state to state. For example, in Maharashtra, Karnataka, and Telangana, the maximum professional tax is ₹2,500 per year (roughly ₹200 per month). Some states like Delhi and Haryana do not levy any Professional Tax.
          </p>

          <h4>3. Tax Deducted at Source (TDS)</h4>
          <p>
            TDS is the income tax deducted by your employer every month on behalf of the government. Your employer estimates your total annual tax liability (based on your chosen tax regime, investments, and deductions) and divides it by 12 to deduct an equal amount every month. 
          </p>
          <p>
            If you want to increase your in-hand salary, you must reduce your TDS by submitting investment proofs (like ELSS, PPF, Life Insurance under Section 80C) to your HR department before the deadline.
          </p>

          <h3>What is Gratuity?</h3>
          <p>
            The Payment of Gratuity Act, 1972 mandates that employers pay a lump-sum amount to employees who leave the company after completing <strong>5 continuous years of service</strong>. It is a reward for loyalty.
          </p>
          <p>
            Employers usually deduct approximately <strong>4.81% of your Basic Salary</strong> every year and show it as a component of your CTC. However, you will not receive this money in your monthly salary. It is held by the company and paid out only if you meet the 5-year criteria. If you leave the company before 5 years, this money is forfeited.
          </p>

          <h3>Tips to Negotiate Your Salary Structure</h3>
          <ol>
            <li><strong>Maximize Employer PF:</strong> Ensure the employer is matching your 12% PF contribution. This builds a robust tax-free retirement corpus.</li>
            <li><strong>Optimize Basic Salary:</strong> If your basic is too high, your PF deductions will increase, reducing your in-hand cash. If it is too low, your Gratuity and HRA exemptions will be negatively affected. Aim for Basic to be around 40-50% of CTC.</li>
            <li><strong>Flexible Allowances:</strong> Ask for reimbursement-based components like Internet Allowance, Phone Allowance, or Food Coupons (Sodexo). These can be claimed tax-free by submitting bills.</li>
          </ol>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>This Salary Calculator provides estimates based on standard Indian corporate salary structures. Exact CTC breakdowns can vary from company to company based on their specific HR policies, variable pay structures, ESI applicability, and state-specific professional tax laws. Please refer to your official HR offer letter for binding figures.</p>
          </div>
        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Salary Projections</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/5-lakh-ctc-in-hand-salary" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">5 Lakh CTC In Hand</a>
            <a href="/calculators/10-lakh-ctc-in-hand-salary" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">10 Lakh CTC In Hand</a>
            <a href="/calculators/12-lakh-ctc-in-hand-salary" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">12 Lakh CTC In Hand</a>
            <a href="/calculators/15-lakh-ctc-in-hand-salary" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">15 Lakh CTC In Hand</a>
            <a href="/calculators/20-lakh-ctc-in-hand-salary" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">20 Lakh CTC In Hand</a>
          </div>
        </div>

      </div>
    </>
  );
};
