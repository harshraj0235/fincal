import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Home } from 'lucide-react';

export const StampDutyCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [state, setState] = useState<string>('maharashtra');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [gender, setGender] = useState<'male' | 'female' | 'joint'>('male');
  
  const [stampDuty, setStampDuty] = useState<number>(0);
  const [registrationCharges, setRegistrationCharges] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  
  useEffect(() => {
    // Calculate stamp duty based on state and property type
    let rate = 0;
    switch (state) {
      case 'maharashtra':
        rate = propertyType === 'residential' ? 5 : 6;
        // Gender-based concession in Maharashtra
        if (propertyType === 'residential') {
          if (gender === 'female') rate = 4;
          else if (gender === 'joint') rate = 4.5;
        }
        break;
      case 'karnataka':
        rate = propertyType === 'residential' ? 5.6 : 6.6;
        break;
      case 'delhi':
        rate = propertyType === 'residential' ? 6 : 7;
        break;
      default:
        rate = 5;
    }
    
    const calculatedStampDuty = (propertyValue * rate) / 100;
    const calculatedRegistration = Math.min(propertyValue * 0.01, 30000);
    
    setStampDuty(calculatedStampDuty);
    setRegistrationCharges(calculatedRegistration);
    setTotalCost(propertyValue + calculatedStampDuty + calculatedRegistration);
  }, [propertyValue, state, propertyType, gender]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Home className="w-5 h-5 mr-2 text-[--primary-600]" />
          Property Details
        </h2>
        
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
              max="50000000" 
              step="100000" 
              value={propertyValue} 
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input"
            >
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Property Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  propertyType === 'residential'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPropertyType('residential')}
              >
                Residential
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  propertyType === 'commercial'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPropertyType('commercial')}
              >
                Commercial
              </button>
            </div>
          </div>
          
          {state === 'maharashtra' && propertyType === 'residential' && (
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Property Ownership
              </label>
              <div className="grid grid-cols-3 gap-2">
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
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    gender === 'joint'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setGender('joint')}
                >
                  Joint
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Cost Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Stamp Duty</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(stampDuty)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Registration Charges</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(registrationCharges)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Cost</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalCost)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Calculation Details
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Cost Breakup</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Property Value</span>
                  <span className="font-medium">{formatCurrency(propertyValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stamp Duty</span>
                  <span className="font-medium">{formatCurrency(stampDuty)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Charges</span>
                  <span className="font-medium">{formatCurrency(registrationCharges)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span className="font-medium">Total Cost</span>
                  <span className="font-medium">{formatCurrency(totalCost)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Applicable Rates</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Stamp Duty Rate</span>
                  <span className="font-medium">{(stampDuty / propertyValue * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Rate</span>
                  <span className="font-medium">1% (max ₹30,000)</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Rates vary by state and property type</li>
                <li>Some states offer concessions for women buyers</li>
                <li>Additional charges may apply for specific locations</li>
                <li>Rates are subject to change by state governments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};