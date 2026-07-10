import React, { useState, useMemo } from 'react';
import SEOHelmet from '../components/SEOHelmet';

export const DaArrearsCalculator: React.FC = () => {
  const [basicPay, setBasicPay] = useState<number>(35400); // Level 6 default
  const [oldDaPercent, setOldDaPercent] = useState<number>(46);
  const [newDaPercent, setNewDaPercent] = useState<number>(50);
  const [months, setMonths] = useState<number>(3); // January to March usually

  const calculations = useMemo(() => {
    const oldDaAmount = (basicPay * oldDaPercent) / 100;
    const newDaAmount = (basicPay * newDaPercent) / 100;
    const monthlyArrear = newDaAmount - oldDaAmount;
    const totalArrear = monthlyArrear * months;

    return {
      oldDaAmount: Math.round(oldDaAmount),
      newDaAmount: Math.round(newDaAmount),
      monthlyArrear: Math.round(monthlyArrear),
      totalArrear: Math.round(totalArrear)
    };
  }, [basicPay, oldDaPercent, newDaPercent, months]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SEOHelmet 
        title="DA Arrears Calculator for Central Government Employees" 
        description="Calculate your Dearness Allowance (DA) arrears instantly. Enter your basic pay, old DA, and new DA percentage to find your total arrear amount."
        canonicalUrl="https://moneycal.in/tools/da-arrears-calculator"
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DA Arrears Calculator</h1>
        <p className="text-gray-600">Calculate the exact Dearness Allowance arrears due to you following a DA hike announcement by the Central Government.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Input Form Section */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#fff9e6] border border-[#ffdb4d] rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#8a6d3b] border-b border-[#ffdb4d] pb-2">Enter Details</h2>
            
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-[#ffea80]">
                  <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="basicPay">Basic Pay (₹)</label></td>
                  <td className="py-3">
                    <input 
                      id="basicPay"
                      type="number" 
                      value={basicPay} 
                      onChange={(e) => setBasicPay(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#d4a017]"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#ffea80]">
                  <td className="py-3 pr-2 font-medium"><label htmlFor="oldDaPercent">Old DA (%)</label></td>
                  <td className="py-3">
                    <input 
                      id="oldDaPercent"
                      type="number" 
                      value={oldDaPercent} 
                      onChange={(e) => setOldDaPercent(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#d4a017]"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#ffea80]">
                  <td className="py-3 pr-2 font-medium"><label htmlFor="newDaPercent">New DA (%)</label></td>
                  <td className="py-3">
                    <input 
                      id="newDaPercent"
                      type="number" 
                      value={newDaPercent} 
                      onChange={(e) => setNewDaPercent(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#d4a017]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-2 font-medium"><label htmlFor="months">Months of Arrear</label></td>
                  <td className="py-3">
                    <select 
                      id="months"
                      value={months} 
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-[#d4a017]"
                    >
                      <option value="1">1 Month</option>
                      <option value="2">2 Months</option>
                      <option value="3">3 Months (Standard Jan-Mar / Jul-Sep)</option>
                      <option value="4">4 Months</option>
                      <option value="5">5 Months</option>
                      <option value="6">6 Months</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full md:w-1/2">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#8a6d3b] border-b border-gray-200 pb-2">Calculation Results</h2>
            
            <div className="bg-[#fff9e6] p-4 rounded-lg mb-4 text-center border border-[#ffea80]">
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total DA Arrear Amount</p>
              <p className="text-4xl font-bold text-[#d4a017] my-1">{formatCurrency(calculations.totalArrear)}</p>
              <p className="text-xs text-gray-500">For {months} months</p>
            </div>

            <table className="w-full text-left text-sm mt-4 border-collapse">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Old Monthly DA ({oldDaPercent}%):</td>
                  <td className="py-2 font-semibold text-right">{formatCurrency(calculations.oldDaAmount)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">New Monthly DA ({newDaPercent}%):</td>
                  <td className="py-2 font-semibold text-right">{formatCurrency(calculations.newDaAmount)}</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50 font-semibold">
                  <td className="py-2 px-1 text-gray-800">Monthly Arrear Difference:</td>
                  <td className="py-2 px-1 text-right text-green-600">+{formatCurrency(calculations.monthlyArrear)}</td>
                </tr>
                <tr className="font-bold text-[#8a6d3b]">
                  <td className="py-3 px-1">Total Arrears (× {months} months):</td>
                  <td className="py-3 px-1 text-right">{formatCurrency(calculations.totalArrear)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
        <h2>What is DA Arrear?</h2>
        <p>
          Dearness Allowance (DA) is an allowance paid by the government to its employees and pensioners to offset the impact of inflation. The Central Government revises the DA twice a year, usually effective from <strong>January 1st</strong> and <strong>July 1st</strong>.
        </p>
        <p>
          However, the actual announcement is often delayed by 2 to 3 months (announced in March for January, and in September/October for July). When the hike is finally announced, it is implemented retrospectively from the effective date. The difference in DA for these past months is paid as a lump sum, known as <strong>DA Arrears</strong>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center font-semibold text-lg border-l-4 border-[#d4a017]">
          Monthly Arrear = Basic Pay × (New DA% - Old DA%)
        </div>

        <h3>Example Calculation</h3>
        <p>Suppose your Basic Pay is ₹35,400. The government announces a DA hike from 46% to 50% in March, effective from January.</p>
        <ul>
          <li><strong>Old DA (46%):</strong> ₹16,284</li>
          <li><strong>New DA (50%):</strong> ₹17,700</li>
          <li><strong>Difference per month:</strong> ₹1,416</li>
          <li><strong>Months delayed:</strong> 3 months (Jan, Feb, March)</li>
          <li><strong>Total DA Arrear:</strong> ₹1,416 × 3 = ₹4,248</li>
        </ul>

        <h3>Is DA Arrear Taxable?</h3>
        <p>
          Yes, Dearness Allowance and DA arrears are fully taxable under the Income Tax Act. It is added to your gross salary in the financial year you receive it. However, if the arrears pertain to a previous financial year (for example, a July-December arrear paid in April of the next year), you can claim relief under <strong>Section 89(1)</strong> of the Income Tax Act using Form 10E.
        </p>
        
        <h3>Who is eligible for DA Arrears?</h3>
        <p>All Central Government employees, state government employees (depending on state adoption), and pensioners who are receiving a basic pay or basic pension are eligible for DA arrears when a retrospective hike is announced.</p>
      </div>
    </div>
  );
};
