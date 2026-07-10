import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, IndianRupee, User } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

export const HumanLifeValueCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(35);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(60000);
  const [existingInvestments, setExistingInvestments] = useState<number>(1000000);
  const [existingLoans, setExistingLoans] = useState<number>(2000000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [returnRate, setReturnRate] = useState<number>(8);
  
  const [humanLifeValue, setHumanLifeValue] = useState<number>(0);
  const [incomeReplacement, setIncomeReplacement] = useState<number>(0);
  const [expenseCoverage, setExpenseCoverage] = useState<number>(0);
  
  useEffect(() => {
    // Calculate Human Life Value
    const yearsToRetirement = retirementAge - age;
    const annualIncome = monthlyIncome * 12;
    const annualExpenses = monthlyExpenses * 12;
    const savingsRate = (annualIncome - annualExpenses) / annualIncome;
    
    // Calculate present value of future income
    let futureIncome = 0;
    for (let year = 1; year <= yearsToRetirement; year++) {
      const inflatedIncome = annualIncome * Math.pow(1 + inflationRate / 100, year);
      futureIncome += inflatedIncome / Math.pow(1 + returnRate / 100, year);
    }
    
    // Calculate income replacement needed
    const incomeReplace = futureIncome * (1 - savingsRate);
    
    // Calculate expense coverage needed
    let futureExpenses = 0;
    for (let year = 1; year <= yearsToRetirement; year++) {
      const inflatedExpenses = annualExpenses * Math.pow(1 + inflationRate / 100, year);
      futureExpenses += inflatedExpenses / Math.pow(1 + returnRate / 100, year);
    }
    
    // Final HLV calculation
    const hlv = Math.max(
      incomeReplace + existingLoans - existingInvestments,
      futureExpenses + existingLoans - existingInvestments
    );
    
    setHumanLifeValue(hlv);
    setIncomeReplacement(incomeReplace);
    setExpenseCoverage(futureExpenses);
  }, [
    age,
    retirementAge,
    monthlyIncome,
    monthlyExpenses,
    existingInvestments,
    existingLoans,
    inflationRate,
    returnRate
  ]);
  
  return (
    <>
      <SEOHelmet
        title="Human Life Value Calculator India 2026 - Term Insurance Cover Estimator | MoneyCal"
        description="Use the Human Life Value calculator to estimate ideal life insurance cover in India based on income, expenses, liabilities, and inflation-adjusted future needs."
        keywords="human life value calculator india, hlv calculator term insurance, life cover requirement calculator, income replacement calculator india, how much term insurance do i need"
        url="/calculators/human-life-value-calculator"
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <User className="w-5 h-5 mr-2 text-[--primary-600]" />
          Personal Details
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="age" className="text-sm font-medium text-neutral-700">
                  Current Age
                </label>
                <span className="text-sm text-neutral-500">
                  {age} years
                </span>
              </div>
              <input 
                type="range" 
                id="age"
                min="18" 
                max="59" 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="retirement-age" className="text-sm font-medium text-neutral-700">
                  Retirement Age
                </label>
                <span className="text-sm text-neutral-500">
                  {retirementAge} years
                </span>
              </div>
              <input 
                type="range" 
                id="retirement-age"
                min={age + 1} 
                max="70" 
                value={retirementAge} 
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-income" className="text-sm font-medium text-neutral-700">
                Monthly Income (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyIncome)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-income"
              min="20000" 
              max="1000000" 
              step="5000" 
              value={monthlyIncome} 
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-expenses" className="text-sm font-medium text-neutral-700">
                Monthly Expenses (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyExpenses)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-expenses"
              min="10000" 
              max={monthlyIncome} 
              step="5000" 
              value={monthlyExpenses} 
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-investments" className="text-sm font-medium text-neutral-700">
                Existing Investments (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingInvestments)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-investments"
              min="0" 
              max="10000000" 
              step="100000" 
              value={existingInvestments} 
              onChange={(e) => setExistingInvestments(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-loans" className="text-sm font-medium text-neutral-700">
                Existing Loans (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingLoans)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-loans"
              min="0" 
              max="10000000" 
              step="100000" 
              value={existingLoans} 
              onChange={(e) => setExistingLoans(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="inflation-rate" className="text-sm font-medium text-neutral-700">
                  Inflation Rate (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {inflationRate}%
                </span>
              </div>
              <input 
                type="range" 
                id="inflation-rate"
                min="4" 
                max="10" 
                step="0.5" 
                value={inflationRate} 
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="return-rate" className="text-sm font-medium text-neutral-700">
                  Return Rate (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {returnRate}%
                </span>
              </div>
              <input 
                type="range" 
                id="return-rate"
                min="6" 
                max="15" 
                step="0.5" 
                value={returnRate} 
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Human Life Value Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Human Life Value</p>
              <p className="text-xl font-bold text-[--primary-900]">{formatCurrency(humanLifeValue)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Income Replacement</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(incomeReplacement)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Expense Coverage</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(expenseCoverage)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Calculation Details
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Financial Summary</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Annual Income</span>
                  <span className="font-medium">{formatCurrency(monthlyIncome * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Expenses</span>
                  <span className="font-medium">{formatCurrency(monthlyExpenses * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Savings</span>
                  <span className="font-medium">{formatCurrency((monthlyIncome - monthlyExpenses) * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Years to Retirement</span>
                  <span className="font-medium">{retirementAge - age} years</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Assets & Liabilities</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Total Investments</span>
                  <span className="font-medium text-[--success-600]">{formatCurrency(existingInvestments)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Loans</span>
                  <span className="font-medium text-[--error-600]">{formatCurrency(existingLoans)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span>Net Worth</span>
                  <span className="font-medium">{formatCurrency(existingInvestments - existingLoans)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Insurance Recommendations</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Term Insurance: {formatCurrency(Math.max(humanLifeValue, 0))}</li>
                <li>Critical Illness Cover: {formatCurrency(Math.min(monthlyIncome * 24, 2000000))}</li>
                <li>Personal Accident Cover: {formatCurrency(Math.min(monthlyIncome * 60, 5000000))}</li>
                <li>Income Replacement Ratio: {((incomeReplacement / (monthlyIncome * 12 * (retirementAge - age))) * 100).toFixed(1)}%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="mt-10 space-y-6">
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">Human Life Value calculator: how to pick the right insurance cover</h2>
        <p className="text-neutral-700 mb-3">
          Human Life Value (HLV) is a practical framework to estimate the economic value of your future income for your dependents. In simple words, it answers:
          if income stops today, what amount should your family receive so that goals, liabilities, and regular expenses remain funded? This calculator combines
          income replacement and expense coverage views, then adjusts for current assets and outstanding loans to arrive at a realistic protection number.
        </p>
        <p className="text-neutral-700 mb-3">
          People often search for <strong>how much term insurance cover do I need in India</strong> and
          <strong> HLV calculator for salaried professionals</strong>. A common mistake is selecting an arbitrary round number without checking liabilities,
          inflation, and earning years left. This page helps you quantify those variables. Treat the output as planning guidance, then finalize cover based on
          your family profile, loan structure, and risk tolerance.
        </p>
        <p className="text-neutral-700">
          Use this calculator together with the{' '}
          <Link to="/calculators/term-insurance-calculator" className="underline">Term Insurance Calculator</Link>,{' '}
          <Link to="/calculators/retirement-calculator" className="underline">Retirement Calculator</Link>, and{' '}
          <Link to="/calculators/pension-calculator" className="underline">Pension Calculator</Link>. For policy literacy and claim rights, refer to{' '}
          <a href="https://irdai.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">IRDAI</a>.
        </p>
      </div>
    </section>
    </>
  );
};