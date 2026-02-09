import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const PensionCalculator: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [employerContribution, setEmployerContribution] = useState<number>(10000);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [annuityRate, setAnnuityRate] = useState<number>(6);
  const [existingCorpus, setExistingCorpus] = useState<number>(500000);
  
  const [totalCorpus, setTotalCorpus] = useState<number>(0);
  const [monthlyPension, setMonthlyPension] = useState<number>(0);
  const [totalContribution, setTotalContribution] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  
  useEffect(() => {
    // Calculate pension corpus
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyRate = expectedReturn / 1200;
    const totalMonths = yearsToRetirement * 12;
    
    // Calculate future value of existing corpus
    let corpus = existingCorpus * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
    // Calculate future value of monthly contributions
    const monthlyTotal = monthlyContribution + employerContribution;
    const futureValue = monthlyTotal * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    corpus += futureValue;
    
    // Calculate total contribution
    const totalContrib = existingCorpus + (monthlyTotal * totalMonths);
    
    setTotalCorpus(corpus);
    setTotalContribution(totalContrib);
    setTotalReturns(corpus - totalContrib);
    
    // Calculate monthly pension (assuming 60% corpus used for annuity)
    const annuityCorpus = corpus * 0.6;
    const monthlyPensionAmount = (annuityCorpus * (annuityRate / 100)) / 12;
    
    setMonthlyPension(monthlyPensionAmount);
  }, [
    monthlyContribution,
    employerContribution,
    currentAge,
    retirementAge,
    expectedReturn,
    annuityRate,
    existingCorpus
  ]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Pension Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-contribution" className="text-sm font-medium text-neutral-700">
                Monthly Contribution (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyContribution)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-contribution"
              min="1000" 
              max="100000" 
              step="1000" 
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="employer-contribution" className="text-sm font-medium text-neutral-700">
                Employer Contribution (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(employerContribution)}
              </span>
            </div>
            <input 
              type="range" 
              id="employer-contribution"
              min="0" 
              max="100000" 
              step="1000" 
              value={employerContribution} 
              onChange={(e) => setEmployerContribution(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-corpus" className="text-sm font-medium text-neutral-700">
                Existing Pension Corpus (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingCorpus)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-corpus"
              min="0" 
              max="10000000" 
              step="100000" 
              value={existingCorpus} 
              onChange={(e) => setExistingCorpus(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="current-age" className="text-sm font-medium text-neutral-700">
                  Current Age
                </label>
                <span className="text-sm text-neutral-500">
                  {currentAge} years
                </span>
              </div>
              <input 
                type="range" 
                id="current-age"
                min="20" 
                max="59" 
                value={currentAge} 
                onChange={(e) => setCurrentAge(Number(e.target.value))}
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
                min={currentAge + 1} 
                max="70" 
                value={retirementAge} 
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                  Expected Return (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {expectedReturn}%
                </span>
              </div>
              <input 
                type="range" 
                id="expected-return"
                min="6" 
                max="15" 
                step="0.5" 
                value={expectedReturn} 
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="annuity-rate" className="text-sm font-medium text-neutral-700">
                  Annuity Rate (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {annuityRate}%
                </span>
              </div>
              <input 
                type="range" 
                id="annuity-rate"
                min="5" 
                max="8" 
                step="0.1" 
                value={annuityRate} 
                onChange={(e) => setAnnuityRate(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Pension Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Corpus</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalCorpus)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly Pension</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(monthlyPension)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Lump Sum</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalCorpus * 0.4)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Corpus Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Contribution', value: totalContribution, color: '#3b82f6' },
                { name: 'Expected Returns', value: totalReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(totalCorpus)}\nTotal Corpus`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Pension Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">NPS Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Mandatory 40% annuitization at retirement</li>
                <li>60% lump sum withdrawal (tax-free)</li>
                <li>Choice of pension fund managers</li>
                <li>Flexible asset allocation</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Tax Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Additional ₹50,000 deduction under 80CCD(1B)</li>
                <li>Employer contribution deductible under 80CCD(2)</li>
                <li>Tax-free withdrawal up to 60% of corpus</li>
                <li>EEE tax status for government employees</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Start early to build substantial corpus</li>
                <li>Consider inflation impact on pension value</li>
                <li>Review asset allocation periodically</li>
                <li>Compare annuity options at retirement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};