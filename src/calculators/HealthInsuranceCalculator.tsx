import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, IndianRupee, Heart } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

interface FamilyMember {
  age: number;
  relation: string;
  preExisting: boolean;
}

export const HealthInsuranceCalculator: React.FC = () => {
  const [coverAmount, setCoverAmount] = useState<number>(500000);
  const [city, setCity] = useState<'metro' | 'non-metro'>('metro');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { age: 35, relation: 'Self', preExisting: false },
    { age: 32, relation: 'Spouse', preExisting: false }
  ]);
  const [annualPremium, setAnnualPremium] = useState<number>(0);
  const [monthlyPremium, setMonthlyPremium] = useState<number>(0);
  
  useEffect(() => {
    // Calculate premium based on various factors
    let basePremium = (coverAmount / 100000) * 1000;
    
    // City factor
    if (city === 'metro') {
      basePremium *= 1.1;
    }
    
    // Age and pre-existing conditions factor
    familyMembers.forEach(member => {
      let memberPremium = basePremium * (1 + (member.age - 25) * 0.02);
      if (member.preExisting) {
        memberPremium *= 1.3;
      }
      basePremium += memberPremium;
    });
    
    setAnnualPremium(basePremium);
    setMonthlyPremium(basePremium / 12);
  }, [coverAmount, city, familyMembers]);
  
  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { age: 30, relation: 'Child', preExisting: false }]);
  };
  
  const removeFamilyMember = (index: number) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };
  
  const updateFamilyMember = (index: number, updates: Partial<FamilyMember>) => {
    setFamilyMembers(familyMembers.map((member, i) => 
      i === index ? { ...member, ...updates } : member
    ));
  };
  
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-[--primary-600]" />
          Health Insurance Details
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
              min="100000" 
              max="5000000" 
              step="100000" 
              value={coverAmount} 
              onChange={(e) => setCoverAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              City Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  city === 'metro'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setCity('metro')}
              >
                Metro City
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  city === 'non-metro'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setCity('non-metro')}
              >
                Non-Metro City
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neutral-900">Family Members</h3>
            {familyMembers.map((member, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-neutral-200">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={member.relation}
                    onChange={(e) => updateFamilyMember(index, { relation: e.target.value })}
                    className="text-sm font-medium bg-transparent border-none p-0 focus:ring-0"
                  />
                  {index > 1 && (
                    <button
                      onClick={() => removeFamilyMember(index)}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-neutral-600">Age</label>
                      <span className="text-sm text-neutral-500">{member.age} years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="80"
                      value={member.age}
                      onChange={(e) => updateFamilyMember(index, { age: Number(e.target.value) })}
                      className="slider"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={member.preExisting}
                      onChange={(e) => updateFamilyMember(index, { preExisting: e.target.checked })}
                      className="rounded border-neutral-300 text-[--primary-600] focus:ring-[--primary-500]"
                    />
                    <label className="text-sm text-neutral-600">
                      Pre-existing Conditions
                    </label>
                  </div>
                </div>
              </div>
            ))}
            
            {familyMembers.length < 6 && (
              <button
                onClick={addFamilyMember}
                className="w-full py-2 px-4 border-2 border-dashed border-neutral-300 rounded-lg text-neutral-600 hover:border-neutral-400 hover:text-neutral-700 transition-colors"
              >
                + Add Family Member
              </button>
            )}
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
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Policy Details
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Coverage Details</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Sum Insured</span>
                  <span className="font-medium">{formatCurrency(coverAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Family Members</span>
                  <span className="font-medium">{familyMembers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>City Type</span>
                  <span className="font-medium">{city === 'metro' ? 'Metro' : 'Non-Metro'}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Cashless treatment at network hospitals</li>
                <li>Pre and post hospitalization coverage</li>
                <li>Day care procedures covered</li>
                <li>No claim bonus benefit</li>
                <li>Tax benefits under Section 80D</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>30 days initial waiting period</li>
                <li>2 years waiting period for pre-existing diseases</li>
                <li>Lifelong renewability</li>
                <li>Free health check-up every 4 claim-free years</li>
                <li>AYUSH treatment coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12"><CalculatorContentWrapper title="Health Insurance Calculator" description="Calculate health insurance premium and coverage needed for family. Compare individual vs family floater policies. Plan adequate medical insurance for India." benefits={["Calculate health insurance premium","Compare individual vs family floater","Understand coverage needs by age","Plan adequate medical protection"]} howToSteps={[{step:"Choose Coverage Amount",details:"₹5-10L for individuals, ₹10-20L for families in metro cities"},{step:"Add Family Members",details:"Family floater covers spouse + kids at lower cost than individual policies"}]} examples={[{scenario:"Family of 4",inputs:[{label:"Cover",value:"₹10L"},{label:"Members",value:"Self+Spouse+2 Kids"}],result:"₹15-20K annual premium",explanation:"Adequate coverage for family medical needs"}]} tips={["Buy ₹10L+ cover minimum","Take family floater for cost savings"]} mistakes={["Buying insufficient cover","Not disclosing pre-existing conditions"]} faqs={[{question:"How much health insurance do I need?",answer:"₹10-20L for families in metro cities considering medical inflation."}]} relatedCalculators={[{name:"Term Insurance",url:"/calculators/term-insurance-calculator",description:"Life insurance planning"}]} lastUpdated="2025-01-20"/></div>
    </>
  );
};