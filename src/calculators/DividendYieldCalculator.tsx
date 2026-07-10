import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, TrendingUp, PieChart, Calendar, DollarSign } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import SEOHelmet from '../components/SEOHelmet';

export const DividendYieldCalculator: React.FC = () => {
  const [stockPrice, setStockPrice] = useState<number>(1000);
  const [annualDividend, setAnnualDividend] = useState<number>(50);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [reinvestDividends, setReinvestDividends] = useState<boolean>(true);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [expectedGrowth, setExpectedGrowth] = useState<number>(5);
  const [dividendGrowth, setDividendGrowth] = useState<number>(7);
  const [taxRate, setTaxRate] = useState<number>(10);
  
  // Calculated values
  const [initialYield, setInitialYield] = useState<number>(0);
  const [totalShares, setTotalShares] = useState<number>(0);
  const [totalDividends, setTotalDividends] = useState<number>(0);
  const [finalValue, setFinalValue] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{
    year: number;
    shares: number;
    dividendPerShare: number;
    dividendAmount: number;
    stockPrice: number;
    portfolioValue: number;
  }>>([]);
  
  useEffect(() => {
    // Calculate initial dividend yield
    const yield_ = (annualDividend / stockPrice) * 100;
    setInitialYield(yield_);
    
    // Calculate initial shares
    const shares = investmentAmount / stockPrice;
    setTotalShares(shares);
    
    // Calculate year-by-year breakdown
    let currentShares = shares;
    let currentDividendPerShare = annualDividend;
    let currentStockPrice = stockPrice;
    let totalDividendAmount = 0;
    
    const breakdown = [];
    
    for (let year = 1; year <= investmentPeriod; year++) {
      // Calculate dividend for the year
      const dividendAmount = currentShares * currentDividendPerShare;
      const afterTaxDividend = dividendAmount * (1 - taxRate / 100);
      totalDividendAmount += afterTaxDividend;
      
      // If reinvesting dividends, buy more shares
      if (reinvestDividends) {
        const additionalShares = afterTaxDividend / currentStockPrice;
        currentShares += additionalShares;
      }
      
      // Increase dividend per share based on dividend growth rate
      currentDividendPerShare *= (1 + dividendGrowth / 100);
      
      // Increase stock price based on expected growth rate
      currentStockPrice *= (1 + expectedGrowth / 100);
      
      // Calculate portfolio value
      const portfolioValue = currentShares * currentStockPrice;
      
      breakdown.push({
        year,
        shares: currentShares,
        dividendPerShare: currentDividendPerShare,
        dividendAmount: dividendAmount,
        stockPrice: currentStockPrice,
        portfolioValue
      });
    }
    
    setYearlyBreakup(breakdown);
    
    // Set final values
    const finalBreakdown = breakdown[breakdown.length - 1];
    setTotalDividends(totalDividendAmount);
    setFinalValue(finalBreakdown.portfolioValue);
    setTotalReturn((finalBreakdown.portfolioValue - investmentAmount) / investmentAmount * 100);
    
  }, [stockPrice, annualDividend, investmentAmount, reinvestDividends, investmentPeriod, expectedGrowth, dividendGrowth, taxRate]);
  
  return (
    <>
    <SEOHelmet
      title="Dividend Yield & Reinvestment Calculator India 2026 - DRIP Planner | MoneyCal"
      description="Calculate dividend yield, after-tax dividend income, and long-term growth impact with reinvestment (DRIP) scenarios."
      keywords="dividend yield calculator india, dividend reinvestment calculator, drip return calculator, after tax dividend income calculator"
      url="/calculators/dividend-yield-calculator"
    />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-[--primary-600]" />
          Dividend Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="stock-price" className="text-sm font-medium text-neutral-700">
                Current Stock Price (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(stockPrice)}
              </span>
            </div>
            <input 
              type="range" 
              id="stock-price"
              min="10" 
              max="10000" 
              step="10" 
              value={stockPrice} 
              onChange={(e) => setStockPrice(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="annual-dividend" className="text-sm font-medium text-neutral-700">
                Annual Dividend per Share (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(annualDividend)}
              </span>
            </div>
            <input 
              type="range" 
              id="annual-dividend"
              min="0" 
              max={stockPrice * 0.2} 
              step="1" 
              value={annualDividend} 
              onChange={(e) => setAnnualDividend(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-amount" className="text-sm font-medium text-neutral-700">
                Investment Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(investmentAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="investment-amount"
              min="1000" 
              max="10000000" 
              step="1000" 
              value={investmentAmount} 
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-period" className="text-sm font-medium text-neutral-700">
                Investment Period (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {investmentPeriod} years
              </span>
            </div>
            <input 
              type="range" 
              id="investment-period"
              min="1" 
              max="30" 
              step="1" 
              value={investmentPeriod} 
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="expected-growth" className="text-sm font-medium text-neutral-700">
                  Stock Price Growth (% p.a.)
                </label>
                <span className="text-sm text-neutral-500">
                  {expectedGrowth}%
                </span>
              </div>
              <input 
                type="range" 
                id="expected-growth"
                min="0" 
                max="20" 
                step="0.5" 
                value={expectedGrowth} 
                onChange={(e) => setExpectedGrowth(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="dividend-growth" className="text-sm font-medium text-neutral-700">
                  Dividend Growth (% p.a.)
                </label>
                <span className="text-sm text-neutral-500">
                  {dividendGrowth}%
                </span>
              </div>
              <input 
                type="range" 
                id="dividend-growth"
                min="0" 
                max="20" 
                step="0.5" 
                value={dividendGrowth} 
                onChange={(e) => setDividendGrowth(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="tax-rate" className="text-sm font-medium text-neutral-700">
                  Dividend Tax Rate (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {taxRate}%
                </span>
              </div>
              <input 
                type="range" 
                id="tax-rate"
                min="0" 
                max="30" 
                step="1" 
                value={taxRate} 
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="reinvest-dividends"
                checked={reinvestDividends}
                onChange={(e) => setReinvestDividends(e.target.checked)}
                className="h-4 w-4 text-[--primary-600] focus:ring-[--primary-500] border-neutral-300 rounded"
              />
              <label htmlFor="reinvest-dividends" className="ml-2 block text-sm text-neutral-700">
                Reinvest Dividends
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Dividend Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Initial Dividend Yield</p>
              <p className="text-xl font-bold text-neutral-900">{initialYield.toFixed(2)}%</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Dividends</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalDividends)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Final Share Count</p>
              <p className="text-xl font-bold text-neutral-900">{totalShares.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Final Portfolio Value</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(finalValue)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Return</p>
              <p className="text-xl font-bold text-[--success-600]">{totalReturn.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Investment Breakdown
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Initial Investment', value: investmentAmount, color: '#3b82f6' },
                { name: 'Capital Appreciation', value: finalValue - investmentAmount - totalDividends, color: '#f59e0b' },
                { name: 'Dividend Income', value: totalDividends, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(finalValue)}\nFinal Value`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[--primary-600]" />
            Year-by-Year Breakdown
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Shares</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Dividend/Share (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Dividend Amount (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Stock Price (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Portfolio Value (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {yearlyBreakup.map((year, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.year}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.shares.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.dividendPerShare)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.dividendAmount)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.stockPrice)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.portfolioValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Dividend Investing Insights
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Power of Dividend Reinvestment</h3>
              <p className="text-sm text-neutral-600">
                Reinvesting dividends can significantly boost your returns through compounding. When you reinvest dividends, you're buying more shares that will generate additional dividends in the future, creating a snowball effect.
              </p>
              <div className="mt-3 flex items-center">
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                  <div className="bg-[--primary-600] h-2.5 rounded-full" style={{ width: `${Math.min(100, reinvestDividends ? 100 : 60)}%` }}></div>
                </div>
                <span className="ml-2 text-xs text-neutral-500">
                  {reinvestDividends ? 'Compounding enabled' : 'No compounding'}
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Dividend Growth Importance</h3>
              <p className="text-sm text-neutral-600">
                Companies that consistently increase their dividends can provide growing income streams and often outperform the market over time. A 7% dividend growth rate means your income doubles approximately every 10 years.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-neutral-100 rounded">
                  <p className="text-neutral-700">5-Year Growth</p>
                  <p className="font-medium text-neutral-900">{((Math.pow(1 + dividendGrowth/100, 5) - 1) * 100).toFixed(0)}%</p>
                </div>
                <div className="p-2 bg-neutral-100 rounded">
                  <p className="text-neutral-700">10-Year Growth</p>
                  <p className="font-medium text-neutral-900">{((Math.pow(1 + dividendGrowth/100, 10) - 1) * 100).toFixed(0)}%</p>
                </div>
                <div className="p-2 bg-neutral-100 rounded">
                  <p className="text-neutral-700">20-Year Growth</p>
                  <p className="font-medium text-neutral-900">{((Math.pow(1 + dividendGrowth/100, 20) - 1) * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Tax Considerations</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Dividends in India are taxed at your income tax slab rate</li>
                <li>Companies deduct a 10% TDS if dividend exceeds ₹5,000 in a financial year</li>
                <li>Long-term capital gains from stock appreciation are taxed at 10% above ₹1 lakh</li>
                <li>Consider holding dividend stocks in tax-advantaged accounts when possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="mt-10">
      <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3">
        <h2 className="text-2xl font-bold text-neutral-900">Dividend yield vs total return: what investors should track</h2>
        <p className="text-neutral-700">High dividend yield alone does not guarantee better outcomes. Reinvestment rate, dividend growth, and tax impact determine long-term compounding.</p>
        <p className="text-neutral-700">Use this tool with <Link to="/calculators/compound-interest-calculator" className="underline">Compound Interest Calculator</Link> and <Link to="/calculators/capital-gains-tax-advanced-calculator" className="underline">Capital Gains Tax Advanced Calculator</Link> for post-tax return planning.</p>
        <p className="text-neutral-700">For disclosures and market standards, validate data with recognized exchange and regulator sources such as <a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" className="underline">NSE</a> and <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">SEBI</a>.</p>
      </div>
    </section>
    </>
  );
};

export default DividendYieldCalculator;