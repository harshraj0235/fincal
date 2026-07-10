import React, { useState, useMemo } from 'react';
import SEOHelmet from '../components/SEOHelmet';

export const EighthPayCommissionCalculator: React.FC = () => {
  const [basicPay, setBasicPay] = useState<number>(35400); // Default level 6 basic pay
  const [daPercent, setDaPercent] = useState<number>(50); // Current DA
  const [fitmentFactor, setFitmentFactor] = useState<number>(2.86); // Expected/Demanded

  const calculations = useMemo(() => {
    // 7th CPC Gross (excluding HRA/TA for simplicity of basic comparison)
    const currentDAAmount = (basicPay * daPercent) / 100;
    const currentGross = basicPay + currentDAAmount;

    // 8th CPC Calculation
    // Generally, revised basic pay = Old Basic Pay * Fitment Factor
    const revisedBasicPay = Math.round(basicPay * fitmentFactor);
    
    // Initial DA in new pay commission is usually 0%
    const revisedDAAmount = 0;
    
    // Net Increase in Basic Pay
    const netIncrease = revisedBasicPay - currentGross;
    const percentageIncrease = (netIncrease / currentGross) * 100;

    return {
      currentGross: Math.round(currentGross),
      currentDAAmount: Math.round(currentDAAmount),
      revisedBasicPay,
      revisedDAAmount,
      totalRevised: revisedBasicPay + revisedDAAmount,
      netIncrease,
      percentageIncrease: percentageIncrease.toFixed(2)
    };
  }, [basicPay, daPercent, fitmentFactor]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SEOHelmet 
        title="8th Pay Commission Salary Calculator 2026 - Check Revised Pay" 
        description="Calculate your expected salary under the 8th Central Pay Commission (CPC). Find out your revised basic pay based on expected fitment factors (2.86, 3.68, etc)."
        canonicalUrl="https://moneycal.in/tools/8th-pay-commission-calculator"
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">8th Pay Commission Salary Calculator</h1>
        <p className="text-gray-600">Estimate your revised salary and pay matrix level for Central Government Employees under the upcoming 8th CPC.</p>
      </div>

      {/* Calculator Interface - Styled similar to clean static HTML calculators */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Input Form Section */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#f2f8f2] border border-[#a2c8a2] rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#2e5d2e] border-b border-[#a2c8a2] pb-2">Enter Details</h2>
            
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-[#d0e5d0]">
                  <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="basicPay">7th CPC Basic Pay (₹)</label></td>
                  <td className="py-3">
                    <input 
                      id="basicPay"
                      type="number" 
                      value={basicPay} 
                      onChange={(e) => setBasicPay(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#2e5d2e]"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#d0e5d0]">
                  <td className="py-3 pr-2 font-medium"><label htmlFor="daPercent">Current DA (%)</label></td>
                  <td className="py-3">
                    <input 
                      id="daPercent"
                      type="number" 
                      value={daPercent} 
                      onChange={(e) => setDaPercent(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#2e5d2e]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-2 font-medium"><label htmlFor="fitmentFactor">Expected Fitment Factor</label></td>
                  <td className="py-3">
                    <select 
                      id="fitmentFactor"
                      value={fitmentFactor} 
                      onChange={(e) => setFitmentFactor(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-[#2e5d2e]"
                    >
                      <option value="1.92">1.92 (Minimum Expected)</option>
                      <option value="2.57">2.57 (Same as 7th CPC)</option>
                      <option value="2.86">2.86 (Expected Base)</option>
                      <option value="3.68">3.68 (Staff Union Demand)</option>
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
            <h2 className="text-xl font-semibold mb-4 text-[#2e5d2e] border-b border-gray-200 pb-2">Calculation Results</h2>
            
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Revised Basic Pay (8th CPC)</p>
              <p className="text-4xl font-bold text-[#2e5d2e] my-1">{formatCurrency(calculations.revisedBasicPay)}</p>
            </div>

            <table className="w-full text-left text-sm mt-4 border-collapse">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Current Basic Pay:</td>
                  <td className="py-2 font-semibold text-right">{formatCurrency(basicPay)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Current DA Amount ({daPercent}%):</td>
                  <td className="py-2 font-semibold text-right">{formatCurrency(calculations.currentDAAmount)}</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50 font-semibold">
                  <td className="py-2 px-1 text-gray-800">Total Current Pay (Basic + DA):</td>
                  <td className="py-2 px-1 text-right">{formatCurrency(calculations.currentGross)}</td>
                </tr>
                
                <tr><td colSpan={2} className="h-4"></td></tr>
                
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">8th CPC Basic Pay:</td>
                  <td className="py-2 font-semibold text-right text-[#2e5d2e]">{formatCurrency(calculations.revisedBasicPay)}</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50 font-bold">
                  <td className="py-2 px-1 text-gray-800">Expected Salary Increase:</td>
                  <td className="py-2 px-1 text-right text-green-600">+{formatCurrency(calculations.netIncrease)}</td>
                </tr>
                <tr className="bg-[#f2f8f2] font-bold text-[#2e5d2e]">
                  <td className="py-2 px-2 rounded-l">Percentage Hike:</td>
                  <td className="py-2 px-2 text-right rounded-r">{calculations.percentageIncrease}%</td>
                </tr>
              </tbody>
            </table>
            
            <div className="mt-4 text-xs text-gray-500 italic bg-yellow-50 p-2 rounded border border-yellow-200">
              * Note: The 8th Pay Commission report is not yet finalized. These calculations are projections based on historical trends and current employee union demands. HRA, TA, and other allowances are excluded for basic comparison.
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
        <h2>How is the 8th Pay Commission Salary Calculated?</h2>
        <p>
          The 8th Central Pay Commission (CPC), expected to be implemented from January 2026, will revise the salary structure of over 1 crore central government employees and pensioners. While the official pay matrix is yet to be released, the calculation generally follows a standard formula used in previous pay commissions.
        </p>
        
        <h3>The Fitment Factor Formula</h3>
        <p>
          The most critical component of the salary revision is the <strong>Fitment Factor</strong>. This is the multiplier applied to the existing basic pay to arrive at the new basic pay.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center font-semibold text-lg border-l-4 border-[#2e5d2e]">
          Revised Basic Pay = 7th CPC Basic Pay × Fitment Factor
        </div>

        <h3>What will be the Fitment Factor in 8th CPC?</h3>
        <p>There are currently several projections for the fitment factor:</p>
        <ul>
          <li><strong>2.57 (Conservative Estimate):</strong> This was the factor used in the 7th CPC. If the government maintains the status quo, this might be applied.</li>
          <li><strong>2.86 (Expected Base):</strong> Based on inflation and the recommendations of the Aykroyd formula, many experts predict a factor around 2.86.</li>
          <li><strong>3.68 (Employee Union Demand):</strong> Staff Side of the National Council (JCM) has strongly demanded a fitment factor of 3.68 to bring the minimum wage to ₹26,000.</li>
        </ul>

        <h3>What Happens to Dearness Allowance (DA)?</h3>
        <p>
          When a new pay commission is implemented, the existing Dearness Allowance (which is expected to cross 50-60% by January 2026) is typically merged into the basic pay, and the DA meter is reset to 0%. The new DA will then start accruing from 0% based on the revised basic pay.
        </p>

        <h3>Example Calculation</h3>
        <p>Let's take an employee with a current Basic Pay of ₹35,400 (Level 6):</p>
        <table className="w-full max-w-2xl border-collapse border border-gray-300 my-4 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Component</th>
              <th className="border border-gray-300 p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">7th CPC Basic Pay</td>
              <td className="border border-gray-300 p-2">₹35,400</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Expected Fitment Factor</td>
              <td className="border border-gray-300 p-2">2.86</td>
            </tr>
            <tr className="bg-[#f2f8f2] font-semibold">
              <td className="border border-gray-300 p-2">8th CPC Revised Basic Pay (35,400 × 2.86)</td>
              <td className="border border-gray-300 p-2">₹1,01,244</td>
            </tr>
          </tbody>
        </table>
        
        <h2>When will the 8th Pay Commission be Implemented?</h2>
        <p>
          Historically, Central Pay Commissions are formed every 10 years. Since the 7th CPC was implemented on January 1, 2016, the 8th CPC is due for implementation on <strong>January 1, 2026</strong>. The government usually forms the commission 18 months prior, which means announcements regarding its constitution are expected soon.
        </p>
      </div>
    </div>
  );
};
