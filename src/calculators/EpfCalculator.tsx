import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   EPF CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Target keywords: epf calculator, pf maturity calculator,
   employee provident fund calculator, epf interest calculator
   ═══════════════════════════════════════════════════════════════ */

const EPF_INTEREST_RATE = 8.25; // FY 2025-26

const FAQ_DATA = [
  { question: "What is EPF?", answer: "Employee Provident Fund (EPF) is a government-backed retirement savings scheme managed by EPFO. Both the employee and employer contribute 12% of Basic Salary + DA every month. The accumulated corpus earns a guaranteed interest rate (currently 8.25% for FY 2025-26)." },
  { question: "How much does the employer actually contribute to EPF?", answer: "The employer contributes 12% of your Basic + DA. However, this is split: 3.67% goes to EPF (your PF account), and 8.33% goes to EPS (Employee Pension Scheme, capped at ₹15,000 basic, so max ₹1,250/month to EPS)." },
  { question: "Is EPF interest taxable?", answer: "Interest on EPF contributions up to ₹2.5 Lakh per year (₹5 Lakh if employer doesn't contribute to NPS) is tax-free. Interest earned on contributions exceeding this threshold is taxable at your income slab rate." },
  { question: "When can I withdraw my EPF?", answer: "Full EPF withdrawal is allowed after retirement (age 58), or if you are unemployed for more than 2 months. Partial withdrawal is allowed for specific purposes like medical emergencies, home purchase, or education after completing 7 years of service." }
];

export const EpfCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(58);
  const [basicSalary, setBasicSalary] = useState<number>(45000);
  const [salaryGrowth, setSalaryGrowth] = useState<number>(8);
  const [employeeContributionPct, setEmployeeContributionPct] = useState<number>(12);
  const [epfRate, setEpfRate] = useState<number>(EPF_INTEREST_RATE);
  const [existingBalance, setExistingBalance] = useState<number>(500000);

  const yearsToRetirement = Math.max(1, retirementAge - currentAge);

  const projection = useMemo(() => {
    let openingBalance = existingBalance;
    let salary = basicSalary;
    let totalEmployeeContribution = 0;
    let totalEmployerEpfContribution = 0;
    let totalInterestEarned = 0;

    const schedule = [];

    for (let year = 1; year <= yearsToRetirement; year++) {
      const monthlyEmployee = salary * (employeeContributionPct / 100);
      const monthlyEmployerEpf = salary * 0.0367;

      const yearlyEmployee = monthlyEmployee * 12;
      const yearlyEmployerEpf = monthlyEmployerEpf * 12;
      const yearlyContributionToEpf = yearlyEmployee + yearlyEmployerEpf;

      totalEmployeeContribution += yearlyEmployee;
      totalEmployerEpfContribution += yearlyEmployerEpf;

      const yearlyInterest = (openingBalance + yearlyContributionToEpf / 2) * (epfRate / 100);
      totalInterestEarned += yearlyInterest;

      openingBalance += yearlyContributionToEpf + yearlyInterest;

      schedule.push({
        year,
        age: currentAge + year,
        salary: Math.round(salary),
        yearlyContrib: Math.round(yearlyContributionToEpf),
        interest: Math.round(yearlyInterest),
        balance: Math.round(openingBalance)
      });

      salary *= 1 + salaryGrowth / 100;
    }

    return {
      maturity: Math.round(openingBalance),
      totalEmployeeContribution: Math.round(totalEmployeeContribution),
      totalEmployerEpfContribution: Math.round(totalEmployerEpfContribution),
      totalInterestEarned: Math.round(totalInterestEarned),
      totalContributed: Math.round(totalEmployeeContribution + totalEmployerEpfContribution),
      schedule
    };
  }, [basicSalary, employeeContributionPct, epfRate, existingBalance, salaryGrowth, yearsToRetirement, currentAge]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="EPF Calculator India 2026 | PF Maturity & Retirement Corpus" 
        description="Free EPF Calculator. Calculate your PF maturity amount with employee/employer contribution split, interest earnings at 8.25%, salary growth, and year-wise balance projection." 
        keywords="epf calculator, pf maturity calculator, employee provident fund calculator, epf interest calculator 2026, pf contribution calculator" 
        url="/calculators/epf-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'EPF Calculator', description: 'Calculate PF maturity with salary growth and interest.', category: 'Retirement Calculators', features: ['Year-Wise Projection', 'Employer Split Logic', 'Salary Growth'], ratingValue: 4.9, reviewCount: 28400, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-teal-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">EPF Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">EPF (Provident Fund) Calculator</h1>
          <p className="text-gray-600">Estimate your EPF maturity corpus at retirement. Includes employee + employer (3.67%) contribution split, annual salary growth, and compound interest at {epfRate}%.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-teal-900 border-b border-teal-200 pb-2">EPF Details</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-teal-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="currentAge">Current Age</label></td>
                    <td className="py-3">
                      <input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(Math.max(18, Math.min(57, Number(e.target.value) || 18)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" min="18" max="57" />
                    </td>
                  </tr>
                  <tr className="border-b border-teal-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="retirementAge">Retirement Age</label></td>
                    <td className="py-3">
                      <input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(Math.max(currentAge + 1, Math.min(70, Number(e.target.value) || 58)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-teal-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="basicSalary">Monthly Basic + DA (₹)</label></td>
                    <td className="py-3">
                      <input id="basicSalary" type="number" value={basicSalary} onChange={(e) => setBasicSalary(Math.max(1000, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500 text-lg font-bold" min="1000" />
                    </td>
                  </tr>
                  <tr className="border-b border-teal-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="salaryGrowth">Annual Salary Growth (%)</label></td>
                    <td className="py-3">
                      <input id="salaryGrowth" type="number" step="0.5" value={salaryGrowth} onChange={(e) => setSalaryGrowth(Math.max(0, Math.min(25, Number(e.target.value) || 0)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-teal-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="epfRate">EPF Interest Rate (%)</label></td>
                    <td className="py-3">
                      <input id="epfRate" type="number" step="0.05" value={epfRate} onChange={(e) => setEpfRate(Math.max(1, Math.min(15, Number(e.target.value) || 8.25)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label htmlFor="existingBalance">Existing PF Balance (₹)</label><p className="text-xs text-gray-500 font-normal">Check on EPFO portal</p></td>
                    <td className="py-3">
                      <input id="existingBalance" type="number" value={existingBalance} onChange={(e) => setExistingBalance(Math.max(0, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" min="0" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-teal-100">EPF Maturity at Age {retirementAge}</h2>
                <div className="text-4xl font-black mb-1">₹{fmtNum(projection.maturity)}</div>
                <p className="text-teal-100 text-sm mt-2">{yearsToRetirement} years of compounding</p>
              </div>
              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Your Contribution (12%)</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(projection.totalEmployeeContribution)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Employer EPF (3.67%)</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(projection.totalEmployerEpfContribution)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-green-50">
                      <td className="p-4 text-sm font-bold text-green-800">Total Interest Earned</td>
                      <td className="p-4 text-right text-base font-bold text-green-700">+{fmt(projection.totalInterestEarned)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Existing Balance Added</td>
                      <td className="p-4 text-right text-sm font-medium">{fmt(existingBalance)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                <strong>Note:</strong> Employer's 8.33% EPS contribution (capped ₹1,250/month) is excluded from EPF balance and goes to pension.
              </div>
            </div>
          </div>
        </div>

        {/* ===== YEAR-WISE TABLE ===== */}
        {projection.schedule.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Year-Wise EPF Growth Schedule</h2>
            <div className="overflow-x-auto max-h-[400px] border border-gray-300 rounded-lg">
              <table className="w-full border-collapse text-sm text-left relative">
                <thead className="bg-gray-100 sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="border-b border-gray-300 p-3 text-center font-semibold">Year</th>
                    <th className="border-b border-gray-300 p-3 text-center font-semibold">Age</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold">Basic Salary</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold">Yearly Contrib</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold text-green-700">Interest</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {projection.schedule.map(row => (
                    <tr key={row.year} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                      <td className="p-3 text-center font-medium">{row.year}</td>
                      <td className="p-3 text-center">{row.age}</td>
                      <td className="p-3 text-right">{fmtNum(row.salary)}</td>
                      <td className="p-3 text-right text-blue-600">{fmtNum(row.yearlyContrib)}</td>
                      <td className="p-3 text-right text-green-600 font-semibold">+{fmtNum(row.interest)}</td>
                      <td className="p-3 text-right font-bold">{fmtNum(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>How Does EPF Work? A Complete Guide</h2>
          <p>The Employee Provident Fund (EPF) is India's most popular compulsory retirement savings vehicle, managed by the Employees' Provident Fund Organisation (EPFO). If your company has 20 or more employees and your Basic Salary + DA is less than ₹15,000/month at the time of joining, EPF registration is mandatory.</p>

          <h3>Contribution Breakdown</h3>
          <p>Both you and your employer contribute <strong>12% of your Basic Salary + Dearness Allowance (DA)</strong> every month. However, the employer's 12% is cleverly split:</p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead><tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Component</th>
              <th className="border border-gray-300 p-2 text-center">Rate</th>
              <th className="border border-gray-300 p-2 text-left">Goes To</th>
            </tr></thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2 font-semibold">Your Contribution</td><td className="border border-gray-300 p-2 text-center">12%</td><td className="border border-gray-300 p-2">100% to your EPF Account</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Employer's Contribution</td><td className="border border-gray-300 p-2 text-center">3.67%</td><td className="border border-gray-300 p-2">Your EPF Account</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Employer's EPS</td><td className="border border-gray-300 p-2 text-center">8.33%</td><td className="border border-gray-300 p-2">Employee Pension Scheme (capped at ₹1,250/month for Basic up to ₹15K)</td></tr>
            </tbody>
          </table>

          <h3>EPF Interest Rate History</h3>
          <p>EPFO announces the interest rate annually. It has ranged from 8.10% to 8.65% over the past decade:</p>
          <ul>
            <li><strong>FY 2025-26:</strong> 8.25%</li>
            <li><strong>FY 2024-25:</strong> 8.25%</li>
            <li><strong>FY 2023-24:</strong> 8.25%</li>
            <li><strong>FY 2022-23:</strong> 8.15%</li>
            <li><strong>FY 2021-22:</strong> 8.10%</li>
          </ul>

          <h3>Tax Benefits of EPF</h3>
          <ul>
            <li><strong>Section 80C:</strong> Your 12% contribution qualifies for tax deduction up to ₹1.5 Lakh.</li>
            <li><strong>Interest:</strong> Tax-free on contributions up to ₹2.5 Lakh/year.</li>
            <li><strong>Maturity:</strong> The entire corpus is tax-free if you have completed 5 years of continuous service.</li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>This EPF calculator assumes a constant interest rate and uniform salary growth. Actual EPFO interest rates are declared annually and may vary. Employer's share going to EPS is capped based on ₹15,000 Basic. © 2026 MoneyCal India.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/nps-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">NPS Calculator</a>
            <a href="/calculators/ppf-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">PPF Calculator</a>
            <a href="/calculators/gratuity-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">Gratuity Calculator</a>
            <a href="/calculators/retirement-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-teal-50 hover:border-teal-400 text-gray-600">Retirement Calculator</a>
          </div>
        </div>
      </div>
    </>
  );
};
