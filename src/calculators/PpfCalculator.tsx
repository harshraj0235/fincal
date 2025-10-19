import React, { useState, useEffect } from 'react';
import { formatCurrency, calculatePPF } from '../utils/calculatorUtils';
import { Sliders, Calculator, LineChart, Info, ExternalLink, TrendingUp, PiggyBank } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { BarChart } from '../components/BarChart';
import WhyChooseUs from '../components/WhyChooseUs';

export const PpfCalculator: React.FC = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [timePeriod, setTimePeriod] = useState<number>(15);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{year: number; investment: number; interest: number; balance: number}>>([]);
  
  // Manual input states
  const [manualYearlyInvestment, setManualYearlyInvestment] = useState<string>(yearlyInvestment.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualTimePeriod, setManualTimePeriod] = useState<string>(timePeriod.toString());
  
  useEffect(() => {
    const result = calculatePPF(yearlyInvestment, interestRate, timePeriod);
    setTotalInvestment(result.totalInvestment);
    setTotalInterest(result.totalInterest);
    setMaturityValue(result.maturityValue);
    setYearlyBreakup(result.yearlyBreakup);
  }, [yearlyInvestment, interestRate, timePeriod]);
  
  // Update slider values when manual inputs change
  const handleManualYearlyInvestmentChange = (value: string) => {
    setManualYearlyInvestment(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 500 && numValue <= 150000) {
      setYearlyInvestment(numValue);
    }
  };
  
  const handleManualInterestRateChange = (value: string) => {
    setManualInterestRate(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 10) {
      setInterestRate(numValue);
    }
  };
  
  const handleManualTimePeriodChange = (value: string) => {
    setManualTimePeriod(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 15 && numValue <= 50) {
      setTimePeriod(numValue);
    }
  };
  
  // Update manual input values when sliders change
  useEffect(() => {
    setManualYearlyInvestment(yearlyInvestment.toString());
    setManualInterestRate(interestRate.toString());
    setManualTimePeriod(timePeriod.toString());
  }, [yearlyInvestment, interestRate, timePeriod]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-primary-600" />
          PPF Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="yearly-investment" className="text-sm font-medium text-neutral-700">
                Yearly Investment (₹)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {formatCurrency(yearlyInvestment)}
                </span>
                <input 
                  type="number"
                  value={manualYearlyInvestment}
                  onChange={(e) => handleManualYearlyInvestmentChange(e.target.value)}
                  className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="500"
                  max="150000"
                  step="500"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="yearly-investment"
              min="500" 
              max="150000" 
              step="500" 
              value={yearlyInvestment} 
              onChange={(e) => setYearlyInvestment(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹500</span>
              <span>₹1,50,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                Interest Rate (% p.a.)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {interestRate.toFixed(2)}%
                </span>
                <input 
                  type="number"
                  value={manualInterestRate}
                  onChange={(e) => handleManualInterestRateChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="5"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="interest-rate"
              min="5" 
              max="10" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>5%</span>
              <span>10%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-period" className="text-sm font-medium text-neutral-700">
                Time Period (Years)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {timePeriod} years
                </span>
                <input 
                  type="number"
                  value={manualTimePeriod}
                  onChange={(e) => handleManualTimePeriodChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="15"
                  max="50"
                  step="5"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="time-period"
              min="15" 
              max="50" 
              step="5" 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>15 Years</span>
              <span>50 Years</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">PPF Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Interest Earned</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Value</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(maturityValue)}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-accent-50 rounded-lg border border-accent-100">
          <div className="flex items-start">
            <Calculator className="h-5 w-5 text-accent-600 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-accent-800">
                Your yearly investment of <span className="font-semibold">{formatCurrency(yearlyInvestment)}</span> for <span className="font-semibold">{timePeriod} years</span> at <span className="font-semibold">{interestRate}% p.a.</span> will grow to <span className="font-semibold">{formatCurrency(maturityValue)}</span>, generating <span className="font-semibold">{formatCurrency(totalInterest)}</span> in interest.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            PPF Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Interest Earned', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityValue)}\nMaturity Value`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <LineChart className="w-5 h-5 mr-2 text-primary-600" />
            Balance Growth
          </h2>
          <div className="mt-4 h-64">
            <BarChart 
              data={yearlyBreakup.filter((_, index) => index % 5 === 0 || index === yearlyBreakup.length - 1)}
              xKey="year"
              yKey="balance"
              color="#3b82f6"
              xLabel="Year"
              yLabel="Balance (₹)"
              formatY={(value) => formatCurrency(value)}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            Yearly Breakup
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Investment (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Interest (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {yearlyBreakup.map((year, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.year}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.investment)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.interest)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* FAQ Section */}
      <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
          <Info className="w-6 h-6 mr-2 text-blue-600" />
          PPF Calculator - Frequently Asked Questions (2025)
        </h2>
        <div className="space-y-6 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What is PPF (Public Provident Fund)?</h3>
            <p className="text-gray-600">
              PPF is a long-term savings scheme backed by the Government of India. It offers guaranteed returns with EEE (Exempt-Exempt-Exempt) tax benefits. 
              Current interest rate is 7.1% p.a. (updated quarterly). Visit <a href="https://www.nsiindia.gov.in/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">NSI India <ExternalLink className="w-3 h-3 inline" /></a> for official information.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What is the minimum and maximum investment in PPF?</h3>
            <p className="text-gray-600">
              Minimum: ₹500 per year. Maximum: ₹1,50,000 per year (₹1.5 lakh). You can invest in lump sum or installments (max 12 per year).
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How is PPF interest calculated?</h3>
            <p className="text-gray-600">
              Interest is calculated on the minimum balance between the 5th and last day of each month. It's compounded annually and credited at year-end.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What is the lock-in period for PPF?</h3>
            <p className="text-gray-600">
              PPF has a lock-in period of 15 years from the end of the financial year in which the account was opened. 
              It can be extended in blocks of 5 years. Partial withdrawals allowed from 7th year.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What are the tax benefits of PPF?</h3>
            <p className="text-gray-600">
              PPF offers triple tax benefits (EEE): Investment eligible for deduction under Section 80C (up to ₹1.5 lakh), 
              Interest earned is tax-free, Maturity amount is tax-free. Learn more about <a href="https://moneycal.in/calculators/section-80c-calculator" className="underline text-blue-700">Section 80C deductions</a>.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I withdraw from PPF before maturity?</h3>
            <p className="text-gray-600">
              Partial withdrawals are allowed from the 7th financial year. Loans can be taken from the 3rd to 6th year. 
              Premature closure allowed only in specific cases like medical emergencies or higher education.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Is PPF better than other tax-saving investments?</h3>
            <p className="text-gray-600">
              PPF offers guaranteed returns with zero risk and complete tax exemption. Compare with other options using our 
              <a href="https://moneycal.in/calculators/tax-saving-investment-calculator" className="underline text-blue-700 ml-1">Tax Saving Investment Calculator</a> and 
              <a href="https://moneycal.in/calculators/nps-calculator" className="underline text-blue-700 ml-1">NPS Calculator</a> to make informed decisions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How to open a PPF account?</h3>
            <p className="text-gray-600">
              You can open PPF accounts at any nationalized bank, post office, or online through internet banking. 
              Documents required: PAN card, Aadhaar, address proof, and passport-size photograph. Visit 
              <a href="https://www.indiapost.gov.in/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 ml-1">India Post <ExternalLink className="w-3 h-3 inline" /></a> or your bank's website.
            </p>
          </div>
        </div>
      </div>

      {/* Related Calculators */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Investment Calculators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://moneycal.in/calculators/nps-calculator"
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="font-medium text-gray-900">NPS Calculator</div>
            <div className="text-sm text-gray-600">Calculate NPS returns and tax benefits</div>
          </a>
          <a
            href="https://moneycal.in/calculators/sip-calculator"
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="font-medium text-gray-900">SIP Calculator</div>
            <div className="text-sm text-gray-600">Calculate mutual fund SIP returns</div>
          </a>
          <a
            href="https://moneycal.in/calculators/sukanya-samriddhi-calculator"
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="font-medium text-gray-900">Sukanya Samriddhi</div>
            <div className="text-sm text-gray-600">Girl child savings scheme</div>
          </a>
        </div>
      </div>
    </div>
  );
};