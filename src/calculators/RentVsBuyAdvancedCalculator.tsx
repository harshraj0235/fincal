import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Home, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const RentVsBuyAdvancedCalculator: React.FC = () => {
  // Property details
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(5);
  const [stampDuty, setStampDuty] = useState<number>(5);
  const [maintenanceMonthly, setMaintenanceMonthly] = useState<number>(3000);
  const [propertyTaxYearly, setPropertyTaxYearly] = useState<number>(12000);
  
  // Loan details
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  
  // Rent details
  const [initialRent, setInitialRent] = useState<number>(20000);
  const [rentIncrease, setRentIncrease] = useState<number>(7);
  const [securityDeposit, setSecurityDeposit] = useState<number>(60000);
  
  // HRA details
  const [monthlySalary, setMonthlySalary] = useState<number>(100000);
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [taxBracket, setTaxBracket] = useState<number>(30);
  
  // Time horizon
  const [timeHorizon, setTimeHorizon] = useState<number>(20);
  
  // Calculated values
  const [emi, setEmi] = useState<number>(0);
  const [totalCostOfBuying, setTotalCostOfBuying] = useState<number>(0);
  const [totalCostOfRenting, setTotalCostOfRenting] = useState<number>(0);
  const [propertyValueAtEnd, setPropertyValueAtEnd] = useState<number>(0);
  const [netBuyingCost, setNetBuyingCost] = useState<number>(0);
  const [hraSavings, setHraSavings] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{
    year: number;
    buyingCost: number;
    rentingCost: number;
    propertyValue: number;
    netBuyingCost: number;
  }>>([]);
  const [breakevenYear, setBreakevenYear] = useState<number | null>(null);
  
  useEffect(() => {
    // Calculate EMI
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 1200;
    const totalMonths = loanTenure * 12;
    const emiValue = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                    (Math.pow(1 + monthlyRate, totalMonths) - 1);
    setEmi(emiValue);
    
    // Calculate stamp duty and registration
    const stampDutyAmount = (propertyValue * stampDuty) / 100;
    
    // Calculate HRA exemption
    const calculateHraExemption = (rent: number, basic: number) => {
      // HRA exemption is minimum of:
      // 1. Actual HRA received (assumed 40% of basic for metro cities)
      // 2. Rent paid - 10% of basic
      // 3. 50% of basic (for metro cities)
      const actualHra = 0.4 * basic; // Assuming HRA is 40% of basic
      const rentLessBasic = rent - (0.1 * basic);
      const fiftyPercentOfBasic = 0.5 * basic;
      
      return Math.min(actualHra, Math.max(0, rentLessBasic), fiftyPercentOfBasic);
    };
    
    // Initialize yearly breakup data
    const breakup: Array<{
      year: number;
      buyingCost: number;
      rentingCost: number;
      propertyValue: number;
      netBuyingCost: number;
    }> = [];
    
    let totalBuyingCost = downPayment + stampDutyAmount;
    let totalRentingCost = securityDeposit;
    let currentPropertyValue = propertyValue;
    let currentRent = initialRent;
    let breakevenYearFound = null;
    
    for (let year = 1; year <= timeHorizon; year++) {
      // Buying costs for the year
      const yearlyEmi = emi * 12;
      const yearlyMaintenance = maintenanceMonthly * 12;
      const yearlyPropertyTax = propertyTaxYearly;
      const yearlyBuyingCost = yearlyEmi + yearlyMaintenance + yearlyPropertyTax;
      
      // Renting costs for the year
      const yearlyRent = currentRent * 12;
      const hraExemption = calculateHraExemption(currentRent, basicSalary);
      const yearlyHraSavings = hraExemption * 12 * (taxBracket / 100);
      const yearlyRentingCost = yearlyRent - yearlyHraSavings;
      
      // Update totals
      totalBuyingCost += yearlyBuyingCost;
      totalRentingCost += yearlyRentingCost;
      
      // Update property value with appreciation
      currentPropertyValue = currentPropertyValue * (1 + propertyAppreciation / 100);
      
      // Calculate net buying cost (total cost minus property value)
      const netBuying = totalBuyingCost - currentPropertyValue;
      
      // Check for breakeven point
      if (breakevenYearFound === null && netBuying <= totalRentingCost) {
        breakevenYearFound = year;
      }
      
      // Add to yearly breakup
      breakup.push({
        year,
        buyingCost: totalBuyingCost,
        rentingCost: totalRentingCost,
        propertyValue: currentPropertyValue,
        netBuyingCost: netBuying
      });
      
      // Increase rent for next year
      currentRent = currentRent * (1 + rentIncrease / 100);
    }
    
    setYearlyBreakup(breakup);
    setTotalCostOfBuying(totalBuyingCost);
    setTotalCostOfRenting(totalRentingCost);
    setPropertyValueAtEnd(currentPropertyValue);
    setNetBuyingCost(totalBuyingCost - currentPropertyValue);
    setHraSavings(breakup.reduce((total, year) => total + (initialRent * Math.pow(1 + rentIncrease/100, year.year - 1) * 12 * (taxBracket / 100) * Math.min(0.4, calculateHraExemption(initialRent * Math.pow(1 + rentIncrease/100, year.year - 1), basicSalary) / (initialRent * Math.pow(1 + rentIncrease/100, year.year - 1)))), 0));
    setBreakevenYear(breakevenYearFound);
    
  }, [
    propertyValue,
    propertyAppreciation,
    stampDuty,
    maintenanceMonthly,
    propertyTaxYearly,
    downPayment,
    loanTenure,
    interestRate,
    initialRent,
    rentIncrease,
    securityDeposit,
    monthlySalary,
    basicSalary,
    taxBracket,
    timeHorizon
  ]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Home className="w-5 h-5 mr-2 text-[--primary-600]" />
          Property & Financial Details
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-md font-medium text-neutral-900 mb-3">Property Details</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="property-value" className="text-sm font-medium text-neutral-700">
                    Property Value (₹)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {formatCurrency(propertyValue)}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="property-value"
                  min="1000000" 
                  max="20000000" 
                  step="100000" 
                  value={propertyValue} 
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="property-appreciation" className="text-sm font-medium text-neutral-700">
                    Annual Appreciation (%)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {propertyAppreciation}%
                  </span>
                </div>
                <input 
                  type="range" 
                  id="property-appreciation"
                  min="0" 
                  max="15" 
                  step="0.5" 
                  value={propertyAppreciation} 
                  onChange={(e) => setPropertyAppreciation(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="stamp-duty" className="text-sm font-medium text-neutral-700">
                      Stamp Duty (%)
                    </label>
                    <span className="text-sm text-neutral-500">
                      {stampDuty}%
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="stamp-duty"
                    min="1" 
                    max="10" 
                    step="0.5" 
                    value={stampDuty} 
                    onChange={(e) => setStampDuty(Number(e.target.value))}
                    className="slider"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="maintenance" className="text-sm font-medium text-neutral-700">
                      Monthly Maintenance (₹)
                    </label>
                    <span className="text-sm text-neutral-500">
                      {formatCurrency(maintenanceMonthly)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="maintenance"
                    min="0" 
                    max="20000" 
                    step="500" 
                    value={maintenanceMonthly} 
                    onChange={(e) => setMaintenanceMonthly(Number(e.target.value))}
                    className="slider"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="property-tax" className="text-sm font-medium text-neutral-700">
                    Yearly Property Tax (₹)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {formatCurrency(propertyTaxYearly)}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="property-tax"
                  min="0" 
                  max="100000" 
                  step="1000" 
                  value={propertyTaxYearly} 
                  onChange={(e) => setPropertyTaxYearly(Number(e.target.value))}
                  className="slider"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-md font-medium text-neutral-900 mb-3">Loan Details</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="down-payment" className="text-sm font-medium text-neutral-700">
                    Down Payment (₹)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {formatCurrency(downPayment)}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="down-payment"
                  min={propertyValue * 0.1} 
                  max={propertyValue * 0.5} 
                  step="100000" 
                  value={downPayment} 
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                      Loan Tenure (Years)
                    </label>
                    <span className="text-sm text-neutral-500">
                      {loanTenure} years
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="loan-tenure"
                    min="5" 
                    max="30" 
                    step="1" 
                    value={loanTenure} 
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="slider"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                      Interest Rate (%)
                    </label>
                    <span className="text-sm text-neutral-500">
                      {interestRate}%
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="interest-rate"
                    min="6" 
                    max="12" 
                    step="0.1" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="slider"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-md font-medium text-neutral-900 mb-3">Rent & HRA Details</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="initial-rent" className="text-sm font-medium text-neutral-700">
                    Initial Monthly Rent (₹)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {formatCurrency(initialRent)}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="initial-rent"
                  min="5000" 
                  max="100000" 
                  step="1000" 
                  value={initialRent} 
                  onChange={(e) => setInitialRent(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="rent-increase" className="text-sm font-medium text-neutral-700">
                    Annual Rent Increase (%)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {rentIncrease}%
                  </span>
                </div>
                <input 
                  type="range" 
                  id="rent-increase"
                  min="0" 
                  max="15" 
                  step="0.5" 
                  value={rentIncrease} 
                  onChange={(e) => setRentIncrease(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="security-deposit" className="text-sm font-medium text-neutral-700">
                    Security Deposit (₹)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {formatCurrency(securityDeposit)}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="security-deposit"
                  min="0" 
                  max={initialRent * 12} 
                  step="5000" 
                  value={securityDeposit} 
                  onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="basic-salary" className="text-sm font-medium text-neutral-700">
                      Basic Salary (₹)
                    </label>
                    <span className="text-sm text-neutral-500">
                      {formatCurrency(basicSalary)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="basic-salary"
                    min="10000" 
                    max={monthlySalary} 
                    step="5000" 
                    value={basicSalary} 
                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                    className="slider"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="tax-bracket" className="text-sm font-medium text-neutral-700">
                      Tax Bracket (%)
                    </label>
                    <span className="text-sm text-neutral-500">
                      {taxBracket}%
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="tax-bracket"
                    min="5" 
                    max="30" 
                    step="5" 
                    value={taxBracket} 
                    onChange={(e) => setTaxBracket(Number(e.target.value))}
                    className="slider"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-horizon" className="text-sm font-medium text-neutral-700">
                Time Horizon (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {timeHorizon} years
              </span>
            </div>
            <input 
              type="range" 
              id="time-horizon"
              min="5" 
              max="30" 
              step="1" 
              value={timeHorizon} 
              onChange={(e) => setTimeHorizon(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Analysis Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(emi)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Property Value After {timeHorizon} Years</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(propertyValueAtEnd)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Cost of Buying</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalCostOfBuying)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Cost of Renting</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalCostOfRenting)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Net Cost of Buying</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency(netBuyingCost)}
                </p>
                <p className="text-xs text-neutral-500 mt-1">(Total cost minus property value)</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">HRA Tax Savings</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency(hraSavings)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg">
            <h3 className="text-lg font-medium text-neutral-900 mb-3">Verdict</h3>
            <div className="flex items-center">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 ${
                netBuyingCost < totalCostOfRenting 
                  ? 'bg-[--success-100] text-[--success-700]' 
                  : 'bg-[--primary-100] text-[--primary-700]'
              }`}>
                <span className="text-xl">{netBuyingCost < totalCostOfRenting ? '🏠' : '🏢'}</span>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">
                  {netBuyingCost < totalCostOfRenting 
                    ? 'Buying is financially advantageous' 
                    : 'Renting is financially advantageous'}
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  {netBuyingCost < totalCostOfRenting 
                    ? `You save ${formatCurrency(totalCostOfRenting - netBuyingCost)} over ${timeHorizon} years by buying` 
                    : `You save ${formatCurrency(netBuyingCost - totalCostOfRenting)} over ${timeHorizon} years by renting`}
                </p>
                {breakevenYear && (
                  <p className="text-sm text-[--primary-600] mt-1">
                    Breakeven point: Year {breakevenYear}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Cost Comparison Over Time
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Buying Cost (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Renting Cost (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Property Value (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Net Buying Cost (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {yearlyBreakup.filter((_, index) => index % 5 === 0 || index === yearlyBreakup.length - 1 || index === breakevenYear - 1).map((year, index) => (
                  <tr key={index} className={year.year === breakevenYear ? 'bg-[--success-50]' : index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.year}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.buyingCost)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.rentingCost)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.propertyValue)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.netBuyingCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Key Considerations
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Financial Factors</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Property price and expected appreciation</li>
                <li>Interest rates and loan terms</li>
                <li>Rent inflation in your area</li>
                <li>Tax benefits (HRA exemption vs. home loan tax benefits)</li>
                <li>Maintenance costs and property taxes</li>
                <li>Opportunity cost of down payment</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Non-Financial Factors</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Job stability and potential relocations</li>
                <li>Family needs and future plans</li>
                <li>Desire for customization and ownership</li>
                <li>Maintenance responsibilities</li>
                <li>Flexibility to move</li>
                <li>Emotional value of homeownership</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>This calculator provides a financial comparison only</li>
                <li>Results are highly sensitive to property appreciation and rent inflation assumptions</li>
                <li>Consider consulting a financial advisor for personalized advice</li>
                <li>The decision to buy or rent should factor in both financial and lifestyle considerations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentVsBuyAdvancedCalculator;