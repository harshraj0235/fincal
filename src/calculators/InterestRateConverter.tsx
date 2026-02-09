import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export const InterestRateConverter: React.FC = () => {
  const [rateType, setRateType] = useState<'flat' | 'reducing' | 'apr' | 'eir'>('flat');
  const [rate, setRate] = useState<number>(10);
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [tenure, setTenure] = useState<number>(12);
  const [convertedRates, setConvertedRates] = useState<Record<string, number>>({
    flat: 0,
    reducing: 0,
    apr: 0,
    eir: 0
  });
  
  useEffect(() => {
    // Convert between different interest rate types
    let flatRate = 0;
    let reducingRate = 0;
    let aprRate = 0;
    let eirRate = 0;
    
    switch (rateType) {
      case 'flat':
        flatRate = rate;
        reducingRate = (2 * rate * tenure) / (tenure + 1);
        aprRate = reducingRate + 2; // Approximate APR
        eirRate = Math.pow(1 + reducingRate / 1200, 12) - 1;
        break;
        
      case 'reducing':
        reducingRate = rate;
        flatRate = (rate * (tenure + 1)) / (2 * tenure);
        aprRate = rate + 2; // Approximate APR
        eirRate = Math.pow(1 + rate / 1200, 12) - 1;
        break;
        
      case 'apr':
        aprRate = rate;
        reducingRate = rate - 2; // Approximate reducing rate
        flatRate = (reducingRate * (tenure + 1)) / (2 * tenure);
        eirRate = Math.pow(1 + reducingRate / 1200, 12) - 1;
        break;
        
      case 'eir':
        eirRate = rate;
        reducingRate = (Math.pow(1 + rate, 1/12) - 1) * 1200;
        flatRate = (reducingRate * (tenure + 1)) / (2 * tenure);
        aprRate = reducingRate + 2;
        break;
    }
    
    setConvertedRates({
      flat: flatRate,
      reducing: reducingRate,
      apr: aprRate,
      eir: eirRate * 100
    });
  }, [rate, rateType, tenure]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Interest Rate Conversion
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Rate Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  rateType === 'flat'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setRateType('flat')}
              >
                Flat Rate
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  rateType === 'reducing'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setRateType('reducing')}
              >
                Reducing Rate
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  rateType === 'apr'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setRateType('apr')}
              >
                APR
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  rateType === 'eir'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setRateType('eir')}
              >
                EIR
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="rate" className="block text-sm font-medium text-neutral-700 mb-2">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="input"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          
          <div>
            <label htmlFor="loan-amount" className="block text-sm font-medium text-neutral-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              id="loan-amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="input"
              min="0"
              step="1000"
            />
          </div>
          
          <div>
            <label htmlFor="tenure" className="block text-sm font-medium text-neutral-700 mb-2">
              Loan Tenure (Months)
            </label>
            <input
              type="number"
              id="tenure"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="input"
              min="1"
              max="360"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Converted Rates</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Flat Rate</p>
              <p className="text-xl font-bold text-neutral-900">{convertedRates.flat.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">Reducing Balance</p>
              <p className="text-xl font-bold text-neutral-900">{convertedRates.reducing.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">APR</p>
              <p className="text-xl font-bold text-neutral-900">{convertedRates.apr.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">EIR</p>
              <p className="text-xl font-bold text-neutral-900">{convertedRates.eir.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Interest Rate Types
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Flat Rate</h3>
              <p className="text-sm text-neutral-600">
                Interest is calculated on the full loan amount throughout the loan tenure. 
                This method typically results in higher effective interest rates.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Reducing Balance</h3>
              <p className="text-sm text-neutral-600">
                Interest is calculated on the remaining principal amount after each EMI payment. 
                This is the most common method used for loans.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Annual Percentage Rate (APR)</h3>
              <p className="text-sm text-neutral-600">
                Includes the interest rate plus other costs like processing fees and insurance premiums. 
                Provides a more comprehensive view of borrowing costs.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Effective Interest Rate (EIR)</h3>
              <p className="text-sm text-neutral-600">
                Takes into account the compounding effect of interest and shows the actual cost of borrowing 
                on an annual basis.
              </p>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Always compare loans using the same interest rate type</li>
                <li>EIR is typically higher than the nominal interest rate</li>
                <li>Flat rates appear lower but result in higher interest payments</li>
                <li>Consider all fees and charges when comparing loans</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};