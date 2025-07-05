import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, Shield } from 'lucide-react';

export const TermInsuranceCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [coverAmount, setCoverAmount] = useState<number>(10000000);
  const [policyTerm, setPolicyTerm] = useState<number>(30);
  const [smoker, setSmoker] = useState<boolean>(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [annualPremium, setAnnualPremium] = useState<number>(0);
  const [monthlyPremium, setMonthlyPremium] = useState<number>(0);
  
  useEffect(() => {
    // Calculate premium based on various factors
    let basePremium = (coverAmount / 1000) * 0.2;
    
    // Age factor
    basePremium *= (1 + (age - 25) * 0.03);
    
    // Gender factor
    if (gender === 'female') {
      basePremium *= 0.9; // Women generally get lower premiums
    }
    
    // Smoker factor
    if (smoker) {
      basePremium *= 1.5;
    }
    
    // Policy term factor
    basePremium *= (1 + (policyTerm - 20) * 0.02);
    
    setAnnualPremium(basePremium);
    setMonthlyPremium(basePremium / 12);
  }, [age, coverAmount, policyTerm, smoker, gender]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-[--primary-600]" />
          Term Insurance Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="cover-amount" className="text-sm font-medium text-neutral-700">
                Cover Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(coverAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="cover-amount"
              min="1000000" 
              max="50000000" 
              step="500000" 
              value={coverAmount} 
              onChange={(e) => setCoverAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="age" className="text-sm font-medium text-neutral-700">
                Age (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {age} years
              </span>
            </div>
            <input 
              type="range" 
              id="age"
              min="18" 
              max="65" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="policy-term" className="text-sm font-medium text-neutral-700">
                Policy Term (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {policyTerm} years
              </span>
            </div>
            <input 
              type="range" 
              id="policy-term"
              min="5" 
              max="40" 
              value={policyTerm} 
              onChange={(e) => setPolicyTerm(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Gender
              </label>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    gender === 'male'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setGender('male')}
                >
                  Male
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    gender === 'female'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setGender('female')}
                >
                  Female
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="smoker"
                checked={smoker}
                onChange={(e) => setSmoker(e.target.checked)}
                className="rounded border-neutral-300 text-[--primary-600] focus:ring-[--primary-500]"
              />
              <label htmlFor="smoker" className="text-sm font-medium text-neutral-700">
                Smoker
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Premium Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Annual Premium</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(annualPremium)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly Premium</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyPremium)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Policy Details
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Coverage Details</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Sum Assured</span>
                  <span className="font-medium">{formatCurrency(coverAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Policy Term</span>
                  <span className="font-medium">{policyTerm} years</span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage Till Age</span>
                  <span className="font-medium">{age + policyTerm} years</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Premium Payment Options</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Annual Mode</span>
                  <span className="font-medium">{formatCurrency(annualPremium)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Mode</span>
                  <span className="font-medium">{formatCurrency(monthlyPremium)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Premium (Annual)</span>
                  <span className="font-medium">{formatCurrency(annualPremium * policyTerm)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Death benefit of {formatCurrency(coverAmount)}</li>
                <li>Tax benefits under Section 80C</li>
                <li>Option to add riders for enhanced protection</li>
                <li>High claim settlement ratio</li>
                <li>24x7 claim assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};