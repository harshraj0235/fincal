import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Calendar, Info } from 'lucide-react';

export const GratuityCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(50000);
  const [yearsOfService, setYearsOfService] = useState<number>(10);
  const [gratuityAmount, setGratuityAmount] = useState<number>(0);
  const [isEligible, setIsEligible] = useState<boolean>(true);
  
  useEffect(() => {
    // Check eligibility (minimum 5 years of service)
    const eligible = yearsOfService >= 5;
    setIsEligible(eligible);
    
    if (eligible) {
      // Gratuity Formula: (15 * Last Drawn Salary * Years of Service) / 26
      // Last Drawn Salary includes Basic Salary + DA
      const gratuity = (15 * salary * yearsOfService) / 26;
      setGratuityAmount(gratuity);
    } else {
      setGratuityAmount(0);
    }
  }, [salary, yearsOfService]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Gratuity Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="salary" className="text-sm font-medium text-neutral-700">
                Last Drawn Monthly Salary (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(salary)}
              </span>
            </div>
            <input 
              type="range" 
              id="salary"
              min="10000" 
              max="500000" 
              step="1000" 
              value={salary} 
              onChange={(e) => setSalary(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹10K</span>
              <span>₹5L</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="years" className="text-sm font-medium text-neutral-700">
                Years of Service
              </label>
              <span className="text-sm text-neutral-500">
                {yearsOfService} years
              </span>
            </div>
            <input 
              type="range" 
              id="years"
              min="0" 
              max="40" 
              step="1" 
              value={yearsOfService} 
              onChange={(e) => setYearsOfService(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>0 years</span>
              <span>40 years</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Gratuity Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Eligibility Status</p>
              <p className={`text-xl font-bold ${isEligible ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {isEligible ? 'Eligible' : 'Not Eligible'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Gratuity Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(gratuityAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[--primary-600]" />
            Calculation Details
          </h2>
          <div className="mt-4 p-6 bg-neutral-50 rounded-lg">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Monthly Salary</span>
                <span className="font-medium">{formatCurrency(salary)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Years of Service</span>
                <span className="font-medium">{yearsOfService} years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Calculation Factor</span>
                <span className="font-medium">15/26</span>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Gratuity Amount</span>
                  <span className="font-medium text-[--primary-600]">{formatCurrency(gratuityAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-[--accent-50] rounded-lg border border-[--accent-100]">
          <h3 className="text-lg font-semibold text-[--accent-900] mb-4">
            <Info className="w-5 h-5 inline mr-2" />
            Important Notes
          </h3>
          <div className="space-y-3 text-sm text-[--accent-800]">
            <p>• Gratuity is payable to an employee after 5 years of continuous service</p>
            <p>• The formula used is: (15 × Last Drawn Salary × Years of Service) ÷ 26</p>
            <p>• Last drawn salary includes Basic Salary + Dearness Allowance</p>
            <p>• Maximum gratuity amount exempt from tax is ₹20 lakhs</p>
            <p>• Gratuity is calculated on completed years of service</p>
            <p>• Service period of 6 months or more is considered as 1 year</p>
            <p>• Gratuity is payable on:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Superannuation</li>
              <li>Retirement</li>
              <li>Resignation</li>
              <li>Death or disablement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};