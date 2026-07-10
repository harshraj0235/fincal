import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, Home } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const RentVsBuyCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [monthlyRent, setMonthlyRent] = useState<number>(25000);
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [annualRentIncrease, setAnnualRentIncrease] = useState<number>(5);
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(5);
  const [annualMaintenance, setAnnualMaintenance] = useState<number>(24000);
  
  const [monthlyEmi, setMonthlyEmi] = useState<number>(0);
  const [totalRentPaid, setTotalRentPaid] = useState<number>(0);
  const [totalCostOfBuying, setTotalCostOfBuying] = useState<number>(0);
  const [propertyValueAfterTenure, setPropertyValueAfterTenure] = useState<number>(0);
  
  useEffect(() => {
    // Calculate EMI
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 1200;
    const totalMonths = loanTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    // Calculate total rent paid
    let totalRent = 0;
    let currentRent = monthlyRent;
    for (let year = 1; year <= loanTenure; year++) {
      totalRent += currentRent * 12;
      currentRent *= (1 + annualRentIncrease / 100);
    }
    
    // Calculate total cost of buying
    const totalEmi = emi * totalMonths;
    const totalMaintenance = annualMaintenance * loanTenure;
    const totalBuyingCost = downPayment + totalEmi + totalMaintenance;
    
    // Calculate property value after tenure
    const futureValue = propertyValue * Math.pow(1 + annualAppreciation / 100, loanTenure);
    
    setMonthlyEmi(emi);
    setTotalRentPaid(totalRent);
    setTotalCostOfBuying(totalBuyingCost);
    setPropertyValueAfterTenure(futureValue);
  }, [
    propertyValue,
    monthlyRent,
    downPayment,
    loanTenure,
    interestRate,
    annualRentIncrease,
    annualAppreciation,
    annualMaintenance
  ]);
  
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
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-rent" className="text-sm font-medium text-neutral-700">
                Monthly Rent (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyRent)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-rent"
              min="5000" 
              max="500000" 
              step="1000" 
              value={monthlyRent} 
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="slider"
            />
          </div>
          
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
              max={propertyValue * 0.9} 
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
                max="15" 
                step="0.1" 
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="rent-increase" className="text-sm font-medium text-neutral-700">
                  Annual Rent Increase (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {annualRentIncrease}%
                </span>
              </div>
              <input 
                type="range" 
                id="rent-increase"
                min="0" 
                max="15" 
                step="0.5" 
                value={annualRentIncrease} 
                onChange={(e) => setAnnualRentIncrease(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="appreciation" className="text-sm font-medium text-neutral-700">
                  Annual Appreciation (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {annualAppreciation}%
                </span>
              </div>
              <input 
                type="range" 
                id="appreciation"
                min="0" 
                max="20" 
                step="0.5" 
                value={annualAppreciation} 
                onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="maintenance" className="text-sm font-medium text-neutral-700">
                Annual Maintenance (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(annualMaintenance)}
              </span>
            </div>
            <input 
              type="range" 
              id="maintenance"
              min="0" 
              max="120000" 
              step="1000" 
              value={annualMaintenance} 
              onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Monthly Payments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyEmi)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Current Monthly Rent</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyRent)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Cost Comparison
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Cost of Buying', value: totalCostOfBuying, color: '#3b82f6' },
                { name: 'Total Rent Paid', value: totalRentPaid, color: '#f59e0b' }
              ]}
              centerText={`${formatCurrency(propertyValueAfterTenure)}\nProperty Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Detailed Analysis
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Buying Costs</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Down Payment</span>
                  <span className="font-medium">{formatCurrency(downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total EMI Payments</span>
                  <span className="font-medium">{formatCurrency(monthlyEmi * loanTenure * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Maintenance</span>
                  <span className="font-medium">{formatCurrency(annualMaintenance * loanTenure)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span className="font-medium">Total Cost of Buying</span>
                  <span className="font-medium">{formatCurrency(totalCostOfBuying)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Renting Costs</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Total Rent Paid</span>
                  <span className="font-medium">{formatCurrency(totalRentPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Rent in Final Year</span>
                  <span className="font-medium">
                    {formatCurrency(monthlyRent * Math.pow(1 + annualRentIncrease / 100, loanTenure))}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Key Insights</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>
                  {totalCostOfBuying > totalRentPaid 
                    ? 'Renting costs less than buying over the given period'
                    : 'Buying costs less than renting over the given period'}
                </li>
                <li>Property value appreciation: {formatCurrency(propertyValueAfterTenure - propertyValue)}</li>
                <li>Net cost of buying (after appreciation): {formatCurrency(totalCostOfBuying - propertyValueAfterTenure)}</li>
                <li>
                  Monthly investment needed while renting: 
                  {formatCurrency((totalCostOfBuying - totalRentPaid) / (loanTenure * 12))}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};