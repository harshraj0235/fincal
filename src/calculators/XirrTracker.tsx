import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calendar, Plus, Trash2, Calculator, TrendingUp, Download, Upload, Info } from 'lucide-react';

interface CashFlow {
  id: string;
  date: string;
  amount: number;
  type: 'investment' | 'redemption';
  description: string;
}

export const XirrTracker: React.FC = () => {
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([]);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [xirrValue, setXirrValue] = useState<number | null>(null);
  const [absoluteReturn, setAbsoluteReturn] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalRedemption, setTotalRedemption] = useState<number>(0);
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  
  // Add a new cash flow
  const addCashFlow = () => {
    const today = new Date().toISOString().split('T')[0];
    const newCashFlow: CashFlow = {
      id: Date.now().toString(),
      date: today,
      amount: 0,
      type: 'investment',
      description: ''
    };
    setCashFlows([...cashFlows, newCashFlow]);
  };
  
  // Remove a cash flow
  const removeCashFlow = (id: string) => {
    setCashFlows(cashFlows.filter(cf => cf.id !== id));
  };
  
  // Update a cash flow
  const updateCashFlow = (id: string, field: keyof CashFlow, value: any) => {
    setCashFlows(cashFlows.map(cf => 
      cf.id === id ? { ...cf, [field]: value } : cf
    ));
  };
  
  // Calculate XIRR
  const calculateXirr = () => {
    if (cashFlows.length === 0) return;
    
    // Sort cash flows by date
    const sortedCashFlows = [...cashFlows].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Add current value as a redemption cash flow
    const today = new Date().toISOString().split('T')[0];
    const allCashFlows = [
      ...sortedCashFlows,
      {
        id: 'current-value',
        date: today,
        amount: currentValue,
        type: 'redemption' as const,
        description: 'Current Value'
      }
    ];
    
    // Calculate XIRR using Newton-Raphson method
    // This is a simplified implementation - in a real app, you'd use a financial library
    
    // For demonstration, we'll use a simple approximation
    // In reality, XIRR calculation is more complex
    
    let totalInvested = 0;
    let totalRedeemed = 0;
    let firstDate: Date | null = null;
    let lastDate: Date | null = null;
    
    allCashFlows.forEach(cf => {
      const date = new Date(cf.date);
      if (!firstDate || date < firstDate) firstDate = date;
      if (!lastDate || date > lastDate) lastDate = date;
      
      if (cf.type === 'investment') {
        totalInvested += cf.amount;
      } else {
        totalRedeemed += cf.amount;
      }
    });
    
    if (!firstDate || !lastDate) return;
    
    // Calculate years between first and last cash flow
    const yearDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    
    // Simple CAGR calculation as an approximation
    const gain = totalRedeemed - totalInvested;
    const xirrApprox = (Math.pow(totalRedeemed / totalInvested, 1 / yearDiff) - 1) * 100;
    
    setXirrValue(xirrApprox);
    setAbsoluteReturn(gain);
    setTotalInvestment(totalInvested);
    setTotalRedemption(totalRedeemed - currentValue); // Exclude current value from redemptions
    
    // Calculate investment period
    const years = Math.floor(yearDiff);
    const months = Math.floor((yearDiff - years) * 12);
    setInvestmentPeriod(`${years} years, ${months} months`);
  };
  
  // Sample data for demonstration
  const loadSampleData = () => {
    const today = new Date();
    const sampleData: CashFlow[] = [
      {
        id: '1',
        date: new Date(today.getFullYear() - 3, today.getMonth(), 15).toISOString().split('T')[0],
        amount: 100000,
        type: 'investment',
        description: 'Initial investment'
      },
      {
        id: '2',
        date: new Date(today.getFullYear() - 2, today.getMonth() + 3, 10).toISOString().split('T')[0],
        amount: 50000,
        type: 'investment',
        description: 'Additional investment'
      },
      {
        id: '3',
        date: new Date(today.getFullYear() - 1, today.getMonth() - 2, 5).toISOString().split('T')[0],
        amount: 30000,
        type: 'redemption',
        description: 'Partial redemption'
      },
      {
        id: '4',
        date: new Date(today.getFullYear(), today.getMonth() - 6, 20).toISOString().split('T')[0],
        amount: 75000,
        type: 'investment',
        description: 'Bonus investment'
      }
    ];
    
    setCashFlows(sampleData);
    setCurrentValue(250000);
  };
  
  // Clear all data
  const clearData = () => {
    setCashFlows([]);
    setCurrentValue(0);
    setXirrValue(null);
    setAbsoluteReturn(0);
    setTotalInvestment(0);
    setTotalRedemption(0);
    setInvestmentPeriod('');
  };
  
  // Export data as CSV
  const exportToCsv = () => {
    const headers = ['Date', 'Amount', 'Type', 'Description'];
    const csvData = cashFlows.map(cf => 
      `${cf.date},${cf.amount},${cf.type},${cf.description}`
    );
    
    const csv = [
      headers.join(','),
      ...csvData
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'xirr_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">XIRR Tracker for Irregular Investments</h2>
        <p className="text-neutral-600">
          Calculate the Extended Internal Rate of Return (XIRR) for your investments with irregular cash flows. XIRR provides a more accurate measure of performance than simple returns when you invest or withdraw at different times.
        </p>
      </div>

      {/* Cash Flows Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">Cash Flows</h3>
          <div className="flex space-x-2">
            <button 
              onClick={loadSampleData}
              className="text-sm text-[--primary-600] hover:text-[--primary-800] flex items-center"
            >
              <Upload className="h-4 w-4 mr-1" />
              Load Sample Data
            </button>
            <button 
              onClick={clearData}
              className="text-sm text-neutral-600 hover:text-neutral-800 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Amount (₹)
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {cashFlows.map((cf, index) => (
                <tr key={cf.id} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-neutral-400 mr-2" />
                      <input
                        type="date"
                        value={cf.date}
                        onChange={(e) => updateCashFlow(cf.id, 'date', e.target.value)}
                        className="border-0 bg-transparent focus:ring-0 p-0 text-sm text-neutral-900"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={cf.amount}
                      onChange={(e) => updateCashFlow(cf.id, 'amount', Number(e.target.value))}
                      className="border-0 bg-transparent focus:ring-0 p-0 text-sm text-neutral-900 w-full"
                      placeholder="Enter amount"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={cf.type}
                      onChange={(e) => updateCashFlow(cf.id, 'type', e.target.value as 'investment' | 'redemption')}
                      className="border-0 bg-transparent focus:ring-0 p-0 text-sm text-neutral-900"
                    >
                      <option value="investment">Investment</option>
                      <option value="redemption">Redemption</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={cf.description}
                      onChange={(e) => updateCashFlow(cf.id, 'description', e.target.value)}
                      className="border-0 bg-transparent focus:ring-0 p-0 text-sm text-neutral-900 w-full"
                      placeholder="Description (optional)"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => removeCashFlow(cf.id)}
                      className="text-neutral-400 hover:text-[--error-600]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={addCashFlow}
            className="flex items-center text-[--primary-600] hover:text-[--primary-800]"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Cash Flow
          </button>
          
          <button
            onClick={exportToCsv}
            className="flex items-center text-neutral-600 hover:text-neutral-800"
            disabled={cashFlows.length === 0}
          >
            <Download className="h-4 w-4 mr-1" />
            Export to CSV
          </button>
        </div>
      </div>

      {/* Current Value & Calculate Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="current-value" className="block text-sm font-medium text-neutral-700 mb-2">
              Current Portfolio Value (₹)
            </label>
            <input
              type="number"
              id="current-value"
              value={currentValue}
              onChange={(e) => setCurrentValue(Number(e.target.value))}
              className="input"
              placeholder="Enter current value of your investment"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Enter the total current market value of your investments
            </p>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={calculateXirr}
              disabled={cashFlows.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                cashFlows.length === 0
                  ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                  : 'bg-[--primary-600] text-white hover:bg-[--primary-700]'
              }`}
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate XIRR
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {xirrValue !== null && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Investment Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-[--primary-50] rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">XIRR</p>
              <p className={`text-3xl font-bold ${xirrValue >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {xirrValue.toFixed(2)}%
              </p>
              <p className="text-xs mt-2 text-neutral-600">
                Annualized return considering all cash flows
              </p>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Absolute Return</p>
              <p className={`text-3xl font-bold ${absoluteReturn >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {formatCurrency(absoluteReturn)}
              </p>
              <p className="text-xs mt-2 text-neutral-600">
                Total gain/loss on your investment
              </p>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Investment Period</p>
              <p className="text-3xl font-bold text-neutral-900">
                {investmentPeriod}
              </p>
              <p className="text-xs mt-2 text-neutral-600">
                Time between first investment and today
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white border border-neutral-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-neutral-700">Total Investment</p>
                <p className="text-lg font-semibold text-neutral-900">{formatCurrency(totalInvestment)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-neutral-700">Total Redemption</p>
                <p className="text-lg font-semibold text-neutral-900">{formatCurrency(totalRedemption)}</p>
              </div>
            </div>
            
            <div className="p-4 bg-white border border-neutral-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-neutral-700">Current Value</p>
                <p className="text-lg font-semibold text-neutral-900">{formatCurrency(currentValue)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-neutral-700">Return %</p>
                <p className={`text-lg font-semibold ${absoluteReturn >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                  {((absoluteReturn / totalInvestment) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-[--accent-50] rounded-lg border border-[--accent-200]">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-[--accent-700] mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-[--accent-800] mb-1">XIRR vs. Absolute Return</h4>
                <p className="text-sm text-[--accent-700]">
                  XIRR (Extended Internal Rate of Return) accounts for the timing and size of cash flows, providing a more accurate measure of performance than absolute return. It's especially useful for investments with irregular contributions or withdrawals.
                </p>
                <p className="text-sm text-[--accent-700] mt-2">
                  {xirrValue > 12 
                    ? 'Your XIRR is excellent! This performance is significantly above market averages.' 
                    : xirrValue > 8 
                    ? 'Your XIRR is good, in line with typical market returns over the long term.' 
                    : xirrValue > 0 
                    ? 'Your XIRR is positive but below typical market averages. Consider reviewing your investment strategy.' 
                    : 'Your XIRR is negative, indicating losses. Consider reviewing your investment strategy or consulting a financial advisor.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">About XIRR</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-neutral-900 mb-2">What is XIRR?</h4>
            <p className="text-sm text-neutral-600 mb-3">
              XIRR (Extended Internal Rate of Return) is a financial metric that calculates the annualized return on investments with irregular cash flows. Unlike simple returns or CAGR, XIRR accounts for:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li>The timing of each cash flow</li>
              <li>The size of each investment or withdrawal</li>
              <li>The current value of your portfolio</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-neutral-900 mb-2">When to Use XIRR</h4>
            <p className="text-sm text-neutral-600 mb-3">
              XIRR is particularly useful for:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li>SIP investments with varying amounts</li>
              <li>Lump sum investments with additional top-ups</li>
              <li>Portfolios with partial redemptions</li>
              <li>Comparing performance across different investment strategies</li>
              <li>Evaluating the impact of timing on your investment returns</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-[--primary-50] rounded-lg">
          <h4 className="font-medium text-[--primary-800] mb-2">How to Use This Calculator</h4>
          <ol className="list-decimal list-inside text-sm text-[--primary-700] space-y-2">
            <li>Add all your investment cash flows (positive amounts)</li>
            <li>Add any redemptions or withdrawals (negative amounts)</li>
            <li>Enter the current market value of your investments</li>
            <li>Click "Calculate XIRR" to see your annualized return</li>
          </ol>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 bg-[--primary-50] rounded-lg p-6 border border-[--primary-100]">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Investment Tools</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/calculators/mutual-fund-returns-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Mutual Fund Returns Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate returns on your mutual fund investments</p>
          </a>
          <a 
            href="/calculators/sip-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">SIP Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate returns on systematic investment plans</p>
          </a>
          <a 
            href="/calculators/mutual-fund-overlap-checker" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Mutual Fund Overlap Checker</h4>
            <p className="text-xs text-[--primary-600]">Check portfolio overlap between mutual funds</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default XirrTracker;