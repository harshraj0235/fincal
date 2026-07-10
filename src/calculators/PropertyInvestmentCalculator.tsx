import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const PropertyInvestmentCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(5);
  const [monthlyRental, setMonthlyRental] = useState<number>(25000);
  const [annualRentIncrease, setAnnualRentIncrease] = useState<number>(5);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(5);
  const [maintenanceCost, setMaintenanceCost] = useState<number>(2000);
  
  const [totalReturns, setTotalReturns] = useState<number>(0);
  const [rentalReturns, setRentalReturns] = useState<number>(0);
  const [appreciationReturns, setAppreciationReturns] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);
  
  useEffect(() => {
    // Calculate returns
    let totalRental = 0;
    let currentRent = monthlyRental;
    
    // Calculate total rental income
    for (let year = 1; year <= holdingPeriod; year++) {
      totalRental += currentRent * 12;
      currentRent *= (1 + annualRentIncrease / 100);
    }
    
    // Deduct maintenance costs
    const totalMaintenance = maintenanceCost * 12 * holdingPeriod;
    const netRentalReturns = totalRental - totalMaintenance;
    
    // Calculate appreciation returns
    const futureValue = propertyValue * Math.pow(1 + annualAppreciation / 100, holdingPeriod);
    const appreciationValue = futureValue - propertyValue;
    
    // Calculate total returns and ROI
    const totalReturn = netRentalReturns + appreciationValue;
    const returnOnInvestment = (totalReturn / propertyValue) * 100;
    
    setRentalReturns(netRentalReturns);
    setAppreciationReturns(appreciationValue);
    setTotalReturns(totalReturn);
    setRoi(returnOnInvestment);
  }, [
    propertyValue,
    downPayment,
    annualAppreciation,
    monthlyRental,
    annualRentIncrease,
    holdingPeriod,
    maintenanceCost
  ]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Details
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
              max={propertyValue} 
              step="100000" 
              value={downPayment} 
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-rental" className="text-sm font-medium text-neutral-700">
                Monthly Rental (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyRental)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-rental"
              min="5000" 
              max="500000" 
              step="1000" 
              value={monthlyRental} 
              onChange={(e) => setMonthlyRental(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="holding-period" className="text-sm font-medium text-neutral-700">
                Holding Period (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {holdingPeriod} years
              </span>
            </div>
            <input 
              type="range" 
              id="holding-period"
              min="1" 
              max="30" 
              step="1" 
              value={holdingPeriod} 
              onChange={(e) => setHoldingPeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="maintenance" className="text-sm font-medium text-neutral-700">
                Monthly Maintenance (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(maintenanceCost)}
              </span>
            </div>
            <input 
              type="range" 
              id="maintenance"
              min="0" 
              max="50000" 
              step="500" 
              value={maintenanceCost} 
              onChange={(e) => setMaintenanceCost(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Returns</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalReturns)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Return on Investment</p>
              <p className="text-xl font-bold text-neutral-900">{roi.toFixed(2)}%</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Annual ROI</p>
              <p className="text-xl font-bold text-neutral-900">{(roi / holdingPeriod).toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Returns Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Rental Returns', value: rentalReturns, color: '#3b82f6' },
                { name: 'Appreciation', value: appreciationReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(totalReturns)}\nTotal Returns`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Investment Analysis
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Returns Breakup</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Total Rental Income</span>
                  <span className="font-medium">{formatCurrency(rentalReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Property Appreciation</span>
                  <span className="font-medium">{formatCurrency(appreciationReturns)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span className="font-medium">Total Returns</span>
                  <span className="font-medium">{formatCurrency(totalReturns)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Metrics</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Rental Yield</span>
                  <span className="font-medium">
                    {((monthlyRental * 12 / propertyValue) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price to Rent Ratio</span>
                  <span className="font-medium">
                    {(propertyValue / (monthlyRental * 12)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Break-even Period</span>
                  <span className="font-medium">
                    {Math.ceil(propertyValue / (monthlyRental * 12 - maintenanceCost * 12))} years
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Investment Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Consider location growth potential</li>
                <li>Research rental demand in the area</li>
                <li>Account for property taxes and insurance</li>
                <li>Plan for periodic renovations</li>
                <li>Keep emergency funds for repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};