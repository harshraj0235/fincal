import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator } from 'lucide-react';

export const Section80DCalculator: React.FC = () => {
  const [selfPremium, setSelfPremium] = useState<number>(25000);
  const [parentsPremium, setParentsPremium] = useState<number>(25000);
  const [parentsAge, setParentsAge] = useState<'below60' | 'above60'>('below60');
  const [totalDeduction, setTotalDeduction] = useState<number>(0);
  
  useEffect(() => {
    const selfLimit = 25000;
    const parentsLimit = parentsAge === 'above60' ? 50000 : 25000;
    
    const selfDeduction = Math.min(selfPremium, selfLimit);
    const parentsDeduction = Math.min(parentsPremium, parentsLimit);
    
    setTotalDeduction(selfDeduction + parentsDeduction);
  }, [selfPremium, parentsPremium, parentsAge]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Health Insurance Premium Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="self-premium" className="text-sm font-medium text-neutral-700">
                Self & Family Premium (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(selfPremium)}
              </span>
            </div>
            <input 
              type="range" 
              id="self-premium"
              min="0" 
              max="50000" 
              step="1000" 
              value={selfPremium} 
              onChange={(e) => setSelfPremium(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹50,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="parents-premium" className="text-sm font-medium text-neutral-700">
                Parents Premium (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(parentsPremium)}
              </span>
            </div>
            <input 
              type="range" 
              id="parents-premium"
              min="0" 
              max="75000" 
              step="1000" 
              value={parentsPremium} 
              onChange={(e) => setParentsPremium(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹75,000</span>
            </div>
          </div>
          
          <div className="pt-4">
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Parents Age Group
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  parentsAge === 'below60'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setParentsAge('below60')}
              >
                Below 60 years
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  parentsAge === 'above60'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setParentsAge('above60')}
              >
                60 years & above
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Deduction Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Self & Family</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatCurrency(Math.min(selfPremium, 25000))}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Parents</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatCurrency(Math.min(parentsPremium, parentsAge === 'above60' ? 50000 : 25000))}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Deduction</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalDeduction)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Section 80D Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Self & Family Coverage</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Maximum deduction of ₹25,000 for self, spouse, and dependent children</li>
                <li>Includes health insurance premium and preventive health checkup</li>
                <li>Preventive health checkup deduction capped at ₹5,000</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Parents Coverage</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Additional deduction for parents' health insurance premium</li>
                <li>₹25,000 if parents are below 60 years</li>
                <li>₹50,000 if parents are 60 years or above</li>
                <li>Includes preventive health checkup up to ₹5,000</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Premium must be paid through non-cash mode</li>
                <li>Policy should be from a registered insurer</li>
                <li>Deduction available under old tax regime only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};