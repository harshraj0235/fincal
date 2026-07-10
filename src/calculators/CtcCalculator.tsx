import React, { useState, useMemo } from 'react';
import SEOHelmet from '../components/SEOHelmet';

export const CtcCalculator: React.FC = () => {
  const [annualCtc, setAnnualCtc] = useState<number>(1000000);
  const [variablePay, setVariablePay] = useState<number>(100000);
  const [basicPercent, setBasicPercent] = useState<number>(50);
  const [includeEmployerPf, setIncludeEmployerPf] = useState<boolean>(true);
  const [includeGratuity, setIncludeGratuity] = useState<boolean>(true);
  const [professionalTax, setProfessionalTax] = useState<number>(200); // monthly
  const [estimatedTds, setEstimatedTds] = useState<number>(0); // monthly

  const calculations = useMemo(() => {
    // Top-down calculation
    const annualFixedCtc = annualCtc - variablePay;
    
    // Gratuity is approx 4.81% of Basic. Basic is a % of Fixed CTC minus PF/Gratuity.
    // Simplified standard industry calculation:
    // Basic = (Annual Fixed CTC) * Basic% 
    // Employer PF = 12% of Basic
    // Gratuity = 4.81% of Basic
    
    // We need to work backwards if Employer PF and Gratuity are part of Fixed CTC
    // Fixed CTC = Gross Salary + Employer PF + Gratuity
    // Gross Salary = Basic + HRA + Special Allowance
    // Let's assume Basic is calculated as a % of Gross Salary for simplicity.
    
    // Approximating Gross Salary
    let pfMultiplier = includeEmployerPf ? 0.12 : 0;
    let gratuityMultiplier = includeGratuity ? 0.0481 : 0;
    
    // Fixed CTC = Gross + (Gross * Basic% * pfMultiplier) + (Gross * Basic% * gratuityMultiplier)
    const basicRatio = basicPercent / 100;
    const grossDivisor = 1 + (basicRatio * pfMultiplier) + (basicRatio * gratuityMultiplier);
    
    const annualGross = Math.round(annualFixedCtc / grossDivisor);
    const annualBasic = Math.round(annualGross * basicRatio);
    
    const annualEmployerPf = Math.round(annualBasic * pfMultiplier);
    const annualGratuity = Math.round(annualBasic * gratuityMultiplier);
    
    // Deductions from Gross to get In-hand
    const annualEmployeePf = includeEmployerPf ? annualEmployerPf : 0; // Usually same as employer PF
    const annualPt = professionalTax * 12;
    const annualTds = estimatedTds * 12;
    
    const totalAnnualDeductions = annualEmployeePf + annualPt + annualTds;
    const annualInHand = annualGross - totalAnnualDeductions;
    
    // Monthly breakdown
    const monthlyGross = Math.round(annualGross / 12);
    const monthlyBasic = Math.round(annualBasic / 12);
    const monthlyEmployeePf = Math.round(annualEmployeePf / 12);
    const monthlyInHand = Math.round(annualInHand / 12);

    return {
      annualFixedCtc,
      annualGross,
      annualBasic,
      annualEmployerPf,
      annualGratuity,
      annualEmployeePf,
      annualPt,
      annualTds,
      totalAnnualDeductions,
      annualInHand,
      monthlyGross,
      monthlyBasic,
      monthlyEmployeePf,
      monthlyInHand,
      monthlyPt: professionalTax,
      monthlyTds: estimatedTds
    };
  }, [annualCtc, variablePay, basicPercent, includeEmployerPf, includeGratuity, professionalTax, estimatedTds]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SEOHelmet 
        title="CTC to In-Hand Salary Calculator India - Check Take Home Pay" 
        description="Convert your CTC (Cost to Company) offer into exact monthly in-hand take-home salary. Deduct PF, PT, Gratuity, and TDS accurately for Indian employees."
        canonicalUrl="https://moneycal.in/tools/ctc-to-in-hand-calculator"
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CTC to In-Hand Salary Calculator</h1>
        <p className="text-gray-600">Got an offer letter? Find out your exact monthly take-home salary after deducting Employer PF, Employee PF, Gratuity, Professional Tax, and Income Tax.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Input Form Section */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#f4f7fa] border border-[#d3dfeb] rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#2c3e50] border-b border-[#d3dfeb] pb-2">Salary Details</h2>
            
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-[#e1e8ef]">
                  <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="annualCtc">Total Annual CTC (₹)</label></td>
                  <td className="py-3">
                    <input 
                      id="annualCtc"
                      type="number" 
                      value={annualCtc} 
                      onChange={(e) => setAnnualCtc(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#3498db]"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#e1e8ef]">
                  <td className="py-3 pr-2 font-medium">
                    <label htmlFor="variablePay">Variable Pay / Bonus (₹)</label>
                    <div className="text-xs text-gray-500 font-normal">Part of CTC, usually paid annually</div>
                  </td>
                  <td className="py-3">
                    <input 
                      id="variablePay"
                      type="number" 
                      value={variablePay} 
                      onChange={(e) => setVariablePay(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#3498db]"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#e1e8ef]">
                  <td className="py-3 pr-2 font-medium">
                    <label htmlFor="basicPercent">Basic Pay % of Gross</label>
                    <div className="text-xs text-gray-500 font-normal">Usually 40% (Non-Metro) or 50% (Metro)</div>
                  </td>
                  <td className="py-3">
                    <select 
                      id="basicPercent"
                      value={basicPercent} 
                      onChange={(e) => setBasicPercent(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-[#3498db]"
                    >
                      <option value="40">40% (Non-Metro)</option>
                      <option value="50">50% (Metro)</option>
                    </select>
                  </td>
                </tr>
                
                <tr><td colSpan={2} className="py-2"><h3 className="font-semibold text-gray-700 mt-2">Deductions included in CTC</h3></td></tr>
                
                <tr className="border-b border-[#e1e8ef]">
                  <td className="py-2 pr-2">Employer PF (12%)</td>
                  <td className="py-2 text-right">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={includeEmployerPf} onChange={(e) => setIncludeEmployerPf(e.target.checked)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                </tr>
                <tr className="border-b border-[#e1e8ef]">
                  <td className="py-2 pr-2">Gratuity (4.81%)</td>
                  <td className="py-2 text-right">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={includeGratuity} onChange={(e) => setIncludeGratuity(e.target.checked)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                </tr>

                <tr><td colSpan={2} className="py-2"><h3 className="font-semibold text-gray-700 mt-2">Employee Taxes</h3></td></tr>
                
                <tr className="border-b border-[#e1e8ef]">
                  <td className="py-3 pr-2 font-medium"><label htmlFor="professionalTax">Monthly Professional Tax</label></td>
                  <td className="py-3">
                    <select 
                      id="professionalTax"
                      value={professionalTax} 
                      onChange={(e) => setProfessionalTax(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-[#3498db]"
                    >
                      <option value="200">₹200 (Most States)</option>
                      <option value="208">₹208 (Maharashtra)</option>
                      <option value="0">₹0 (Delhi, Haryana, UP, etc)</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-2 font-medium">
                    <label htmlFor="estimatedTds">Est. Monthly TDS (Income Tax)</label>
                  </td>
                  <td className="py-3">
                    <input 
                      id="estimatedTds"
                      type="number" 
                      value={estimatedTds} 
                      onChange={(e) => setEstimatedTds(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#3498db]"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full md:w-1/2">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#2c3e50] border-b border-gray-200 pb-2">Salary Breakup</h2>
            
            <div className="bg-[#e8f4fd] p-4 rounded-lg mb-4 text-center border border-[#b8daff]">
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Monthly Take Home Pay</p>
              <p className="text-4xl font-bold text-[#1f618d] my-1">{formatCurrency(calculations.monthlyInHand)}</p>
              <p className="text-xs text-gray-500">Credited to bank account every month</p>
            </div>

            <table className="w-full text-left text-sm mt-4 border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-2 border-b">Component</th>
                  <th className="py-2 px-2 border-b text-right">Monthly</th>
                  <th className="py-2 px-2 border-b text-right">Annually</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-2 text-gray-800 font-medium">Total CTC</td>
                  <td className="py-2 px-2 text-right text-gray-500">-</td>
                  <td className="py-2 px-2 font-semibold text-right">{formatCurrency(annualCtc)}</td>
                </tr>
                <tr className="border-b border-gray-100 text-red-600">
                  <td className="py-2 px-2 pl-4 text-sm">- Variable Pay / Bonus</td>
                  <td className="py-2 px-2 text-right text-gray-400">-</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(variablePay)}</td>
                </tr>
                {includeEmployerPf && (
                <tr className="border-b border-gray-100 text-red-600">
                  <td className="py-2 px-2 pl-4 text-sm">- Employer PF (12%)</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(Math.round(calculations.annualEmployerPf/12))}</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(calculations.annualEmployerPf)}</td>
                </tr>
                )}
                {includeGratuity && (
                <tr className="border-b border-gray-100 text-red-600">
                  <td className="py-2 px-2 pl-4 text-sm">- Gratuity (4.81%)</td>
                  <td className="py-2 px-2 text-right text-gray-400">-</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(calculations.annualGratuity)}</td>
                </tr>
                )}
                
                <tr className="border-b border-gray-200 bg-gray-50 font-semibold">
                  <td className="py-2 px-2 text-gray-800">Gross Salary (Before Taxes)</td>
                  <td className="py-2 px-2 text-right">{formatCurrency(calculations.monthlyGross)}</td>
                  <td className="py-2 px-2 text-right">{formatCurrency(calculations.annualGross)}</td>
                </tr>
                
                <tr className="border-b border-gray-100 text-red-600">
                  <td className="py-2 px-2 pl-4 text-sm">- Employee PF (12%)</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(calculations.monthlyEmployeePf)}</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(calculations.annualEmployeePf)}</td>
                </tr>
                <tr className="border-b border-gray-100 text-red-600">
                  <td className="py-2 px-2 pl-4 text-sm">- Professional Tax</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(calculations.monthlyPt)}</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(calculations.annualPt)}</td>
                </tr>
                <tr className="border-b border-gray-200 text-red-600">
                  <td className="py-2 px-2 pl-4 text-sm">- Income Tax (TDS)</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(calculations.monthlyTds)}</td>
                  <td className="py-2 px-2 text-right">-{formatCurrency(calculations.annualTds)}</td>
                </tr>

                <tr className="font-bold text-[#1f618d] bg-[#f4f7fa]">
                  <td className="py-3 px-2 rounded-l">Net Take Home Salary</td>
                  <td className="py-3 px-2 text-right">{formatCurrency(calculations.monthlyInHand)}</td>
                  <td className="py-3 px-2 text-right rounded-r">{formatCurrency(calculations.annualInHand)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
        <h2>CTC vs Take Home Salary: What's the difference?</h2>
        <p>
          If you have received a job offer, the most prominent number is the <strong>CTC (Cost to Company)</strong>. However, CTC is NOT the amount that gets credited to your bank account every month. It includes several components that are deducted before you get your hands on the money.
        </p>
        
        <h3>Why is my In-Hand Salary lower than my CTC?</h3>
        <p>
          Your monthly take-home (in-hand) salary is lower because of three main reasons:
        </p>
        <ol>
          <li><strong>Employer Contributions (Invisible Deductions):</strong> Your CTC includes amounts the company pays <em>on your behalf</em>, such as the Employer's share of PF (12% of Basic) and Gratuity (4.81% of Basic). You don't see this money monthly; it goes into your retirement funds.</li>
          <li><strong>Variable Pay / Bonus:</strong> Many companies include an annual performance bonus in the CTC. If your CTC is ₹10 Lakhs with ₹1 Lakh variable, your fixed pay is only ₹9 Lakhs. This ₹1 Lakh is paid annually based on performance, not monthly.</li>
          <li><strong>Employee Deductions (Statutory):</strong> From your Gross Salary, the government mandates deductions like your share of EPF (12% of Basic), Professional Tax (₹200/month in most states), and Income Tax (TDS).</li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center font-semibold text-lg border-l-4 border-[#3498db]">
          In-Hand Salary = Gross Salary - Employee PF - Professional Tax - TDS
        </div>

        <h3>Common Salary Components Explained</h3>
        <table className="w-full border-collapse border border-gray-300 my-4 text-left text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-1/3">Component</th>
              <th className="border border-gray-300 p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Basic Salary</td>
              <td className="border border-gray-300 p-2">The core of your salary, usually 40% to 50% of your Gross Pay. PF and Gratuity are calculated on this amount. Fully taxable.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">HRA (House Rent Allowance)</td>
              <td className="border border-gray-300 p-2">Allowance to pay rent. Usually 50% of Basic (Metros) or 40% (Non-Metros). Can be partially tax-exempt if you live in a rented house.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Special Allowance</td>
              <td className="border border-gray-300 p-2">A balancing component to make up the rest of your Gross Salary. Fully taxable.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">EPF (Provident Fund)</td>
              <td className="border border-gray-300 p-2">12% of your Basic is deducted from your Gross, and another 12% is added by your employer (part of CTC). Goes into your PF account.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Gratuity</td>
              <td className="border border-gray-300 p-2">A loyalty bonus mandated by law. Calculated at 4.81% of Basic. Payable only if you complete 4 years and 240 days in the company.</td>
            </tr>
          </tbody>
        </table>

        <h3>How to negotiate better In-Hand Salary</h3>
        <ul>
          <li><strong>Reduce Variable Component:</strong> Ask HR to increase the fixed portion and reduce the variable portion of your CTC.</li>
          <li><strong>Opt-out of PF (If eligible):</strong> If your basic salary is above ₹15,000, you can technically opt-out of EPF at the start of your career, though it's highly recommended to keep it for retirement savings and tax benefits under 80C.</li>
          <li><strong>Optimize Tax Regime:</strong> Use our Income Tax Calculator to check if the New Tax Regime or Old Tax Regime gives you lower TDS. Inform your employer at the start of the year.</li>
        </ul>
      </div>
    </div>
  );
};
