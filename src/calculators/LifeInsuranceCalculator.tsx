import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, Shield } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

type PolicyType = 'endowment' | 'moneyBack' | 'ulip' | 'wholeLife';

interface PolicyDetails {
  name: string;
  description: string;
  minTerm: number;
  maxTerm: number;
  returnRate: number;
}

const policyTypes: Record<PolicyType, PolicyDetails> = {
  endowment: {
    name: 'Endowment Plan',
    description: 'Savings + Insurance with guaranteed returns',
    minTerm: 10,
    maxTerm: 30,
    returnRate: 6
  },
  moneyBack: {
    name: 'Money Back Policy',
    description: 'Periodic returns during policy term',
    minTerm: 15,
    maxTerm: 25,
    returnRate: 5.5
  },
  ulip: {
    name: 'ULIP',
    description: 'Market-linked returns with insurance',
    minTerm: 5,
    maxTerm: 20,
    returnRate: 10
  },
  wholeLife: {
    name: 'Whole Life Plan',
    description: 'Lifetime coverage with savings',
    minTerm: 20,
    maxTerm: 40,
    returnRate: 7
  }
};

export const LifeInsuranceCalculator: React.FC = () => {
  const [policyType, setPolicyType] = useState<PolicyType>('endowment');
  const [age, setAge] = useState<number>(30);
  const [coverAmount, setCoverAmount] = useState<number>(2000000);
  const [policyTerm, setPolicyTerm] = useState<number>(20);
  const [monthlyPremium, setMonthlyPremium] = useState<number>(0);
  const [maturityValue, setMaturityValue] = useState<number>(0);
  
  useEffect(() => {
    // Calculate premium and maturity value
    const policy = policyTypes[policyType];
    
    // Base premium calculation
    let basePremium = coverAmount / (policyTerm * 12);
    
    // Age factor
    basePremium *= (1 + (age - 25) * 0.02);
    
    // Policy type factor
    switch (policyType) {
      case 'endowment':
        basePremium *= 1.2;
        break;
      case 'moneyBack':
        basePremium *= 1.3;
        break;
      case 'ulip':
        basePremium *= 1.1;
        break;
      case 'wholeLife':
        basePremium *= 1.4;
        break;
    }
    
    setMonthlyPremium(basePremium);
    
    // Calculate maturity value
    const totalPremium = basePremium * 12 * policyTerm;
    const maturity = totalPremium * Math.pow(1 + policy.returnRate / 100, policyTerm);
    setMaturityValue(maturity);
    
  }, [policyType, age, coverAmount, policyTerm]);
  
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-[--primary-600]" />
          Life Insurance Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Policy Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(policyTypes).map(([key, policy]) => (
                <button
                  key={key}
                  onClick={() => setPolicyType(key as PolicyType)}
                  className={`p-4 rounded-lg text-left ${
                    policyType === key
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <div className="font-medium">{policy.name}</div>
                  <div className="text-sm mt-1 opacity-80">{policy.description}</div>
                </button>
              ))}
            </div>
          </div>
          
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
              min="500000" 
              max="10000000" 
              step="100000" 
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
              min={policyTypes[policyType].minTerm} 
              max={policyTypes[policyType].maxTerm} 
              value={policyTerm} 
              onChange={(e) => setPolicyTerm(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Policy Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly Premium</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyPremium)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Annual Premium</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyPremium * 12)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Value</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maturityValue)}</p>
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
                  <span>Expected Returns</span>
                  <span className="font-medium">{policyTypes[policyType].returnRate}% p.a.</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Policy Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                {policyType === 'endowment' && (
                  <>
                    <li>Guaranteed maturity benefit</li>
                    <li>Death benefit equal to sum assured</li>
                    <li>Bonus additions</li>
                    <li>Loan facility available</li>
                  </>
                )}
                {policyType === 'moneyBack' && (
                  <>
                    <li>Periodic survival benefits</li>
                    <li>Guaranteed maturity benefit</li>
                    <li>Death benefit with bonuses</li>
                    <li>Regular liquidity</li>
                  </>
                )}
                {policyType === 'ulip' && (
                  <>
                    <li>Market-linked returns</li>
                    <li>Flexibility in fund selection</li>
                    <li>Switching between funds</li>
                    <li>Transparency in charges</li>
                  </>
                )}
                {policyType === 'wholeLife' && (
                  <>
                    <li>Lifetime coverage</li>
                    <li>Guaranteed additions</li>
                    <li>Premium payment limited term</li>
                    <li>Legacy planning</li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Tax benefits under Section 80C</li>
                <li>Maturity amount tax-free under Section 10(10D)</li>
                <li>Grace period of 30 days for premium payment</li>
                <li>Policy revival available within 2 years</li>
                <li>Loan facility available after 3 years</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12"><CalculatorContentWrapper title="Life Insurance Calculator" description="Calculate life insurance coverage needed for family financial security. Compare endowment, money-back, ULIP, and whole life policies. Plan adequate protection." benefits={["Calculate required life cover for family","Compare different policy types","Understand returns vs pure protection","Plan adequate financial security"]} howToSteps={[{step:"Assess Coverage",details:"Calculate based on income replacement, debts, and future goals"},{step:"Choose Policy Type",details:"Term for pure protection, endowment for savings+insurance"}]} examples={[{scenario:"Family Protection",inputs:[{label:"Age",value:"35"},{label:"Cover",value:"₹50L"}],result:"Adequate for family security",explanation:"Covers 10x annual income for dependents"}]} tips:["Buy term insurance early","Separate insurance from investment","Review coverage every 3-5 years"]} mistakes={["Buying insufficient cover","Mixing insurance with investment in expensive ULIPs"]} faqs={[{question:"How much life insurance do I need?",answer:"10-15x annual income + debts + goals. Term insurance is cheapest way to get adequate cover."}]} relatedCalculators={[{name:"Term Insurance",url:"/calculators/term-insurance-calculator",description:"Term insurance premium"}]} lastUpdated="2025-01-20"/></div>
    </>
  );
};