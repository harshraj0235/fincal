import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp, PieChart, ArrowUp, ArrowDown, Calendar, DollarSign, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

interface Stock {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  currency: string;
}

interface Portfolio {
  stocks: Stock[];
  totalInvestment: number;
  currentValue: number;
  overallReturn: number;
  returnPercentage: number;
}

export const NriStockInvestmentDashboard: React.FC = () => {
  const [usPortfolio, setUsPortfolio] = useState<Portfolio>({
    stocks: [],
    totalInvestment: 0,
    currentValue: 0,
    overallReturn: 0,
    returnPercentage: 0
  });
  
  const [indianPortfolio, setIndianPortfolio] = useState<Portfolio>({
    stocks: [],
    totalInvestment: 0,
    currentValue: 0,
    overallReturn: 0,
    returnPercentage: 0
  });
  
  const [exchangeRate, setExchangeRate] = useState<number>(83.25); // USD to INR
  const [taxResidency, setTaxResidency] = useState<'NRI' | 'RNOR' | 'Resident'>('NRI');
  const [showTaxInfo, setShowTaxInfo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'us' | 'india'>('us');
  
  // Sample data for demonstration
  useEffect(() => {
    // US Portfolio
    const usStocks: Stock[] = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        sector: 'Technology',
        quantity: 10,
        avgBuyPrice: 150,
        currentPrice: 175,
        currency: 'USD'
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        exchange: 'NASDAQ',
        sector: 'Technology',
        quantity: 5,
        avgBuyPrice: 280,
        currentPrice: 310,
        currency: 'USD'
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        exchange: 'NASDAQ',
        sector: 'Consumer Cyclical',
        quantity: 3,
        avgBuyPrice: 3200,
        currentPrice: 3400,
        currency: 'USD'
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        exchange: 'NASDAQ',
        sector: 'Communication Services',
        quantity: 2,
        avgBuyPrice: 2700,
        currentPrice: 2900,
        currency: 'USD'
      },
      {
        symbol: 'BRK.B',
        name: 'Berkshire Hathaway Inc.',
        exchange: 'NYSE',
        sector: 'Financial Services',
        quantity: 4,
        avgBuyPrice: 270,
        currentPrice: 290,
        currency: 'USD'
      }
    ];
    
    // Calculate US portfolio metrics
    const usTotalInvestment = usStocks.reduce((sum, stock) => sum + (stock.quantity * stock.avgBuyPrice), 0);
    const usCurrentValue = usStocks.reduce((sum, stock) => sum + (stock.quantity * stock.currentPrice), 0);
    const usOverallReturn = usCurrentValue - usTotalInvestment;
    const usReturnPercentage = (usOverallReturn / usTotalInvestment) * 100;
    
    setUsPortfolio({
      stocks: usStocks,
      totalInvestment: usTotalInvestment,
      currentValue: usCurrentValue,
      overallReturn: usOverallReturn,
      returnPercentage: usReturnPercentage
    });
    
    // Indian Portfolio
    const indianStocks: Stock[] = [
      {
        symbol: 'RELIANCE',
        name: 'Reliance Industries Ltd.',
        exchange: 'NSE',
        sector: 'Energy',
        quantity: 20,
        avgBuyPrice: 2400,
        currentPrice: 2600,
        currency: 'INR'
      },
      {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank Ltd.',
        exchange: 'NSE',
        sector: 'Financial Services',
        quantity: 15,
        avgBuyPrice: 1500,
        currentPrice: 1650,
        currency: 'INR'
      },
      {
        symbol: 'TCS',
        name: 'Tata Consultancy Services Ltd.',
        exchange: 'NSE',
        sector: 'Technology',
        quantity: 8,
        avgBuyPrice: 3300,
        currentPrice: 3500,
        currency: 'INR'
      },
      {
        symbol: 'INFY',
        name: 'Infosys Ltd.',
        exchange: 'NSE',
        sector: 'Technology',
        quantity: 25,
        avgBuyPrice: 1600,
        currentPrice: 1750,
        currency: 'INR'
      },
      {
        symbol: 'HINDUNILVR',
        name: 'Hindustan Unilever Ltd.',
        exchange: 'NSE',
        sector: 'Consumer Defensive',
        quantity: 12,
        avgBuyPrice: 2500,
        currentPrice: 2400,
        currency: 'INR'
      }
    ];
    
    // Calculate Indian portfolio metrics
    const indianTotalInvestment = indianStocks.reduce((sum, stock) => sum + (stock.quantity * stock.avgBuyPrice), 0);
    const indianCurrentValue = indianStocks.reduce((sum, stock) => sum + (stock.quantity * stock.currentPrice), 0);
    const indianOverallReturn = indianCurrentValue - indianTotalInvestment;
    const indianReturnPercentage = (indianOverallReturn / indianTotalInvestment) * 100;
    
    setIndianPortfolio({
      stocks: indianStocks,
      totalInvestment: indianTotalInvestment,
      currentValue: indianCurrentValue,
      overallReturn: indianOverallReturn,
      returnPercentage: indianReturnPercentage
    });
    
  }, []);
  
  // Get portfolio based on active tab
  const activePortfolio = activeTab === 'us' ? usPortfolio : indianPortfolio;
  
  // Convert USD to INR
  const convertToINR = (usdAmount: number) => {
    return usdAmount * exchangeRate;
  };
  
  // Format currency based on type
  const formatPortfolioCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return formatCurrency(amount);
    }
  };
  
  // Get sector allocation data for charts
  const getSectorAllocation = () => {
    const sectorMap = new Map<string, number>();
    
    activePortfolio.stocks.forEach(stock => {
      const currentValue = stock.quantity * stock.currentPrice;
      if (sectorMap.has(stock.sector)) {
        sectorMap.set(stock.sector, sectorMap.get(stock.sector)! + currentValue);
      } else {
        sectorMap.set(stock.sector, currentValue);
      }
    });
    
    const colors = ['#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#a855f7', '#0ea5e9', '#f97316', '#8b5cf6'];
    
    return Array.from(sectorMap.entries()).map(([sector, value], index) => ({
      name: sector,
      value: value,
      color: colors[index % colors.length]
    }));
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">NRI Stock Investment Dashboard</h2>
        <p className="text-neutral-600">
          Track and analyze your US and Indian stock investments in one place. Get insights on performance, tax implications, and portfolio allocation for NRI investors.
        </p>
      </div>

      {/* Portfolio Summary Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">Portfolio Summary</h3>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">
                USD to INR Rate
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(Number(e.target.value))}
                  className="input py-1 text-sm w-24"
                  min="1"
                  step="0.01"
                />
                <span className="ml-2 text-xs text-neutral-500">₹/USD</span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">
                Tax Residency Status
              </label>
              <select
                value={taxResidency}
                onChange={(e) => setTaxResidency(e.target.value as 'NRI' | 'RNOR' | 'Resident')}
                className="input py-1 text-sm"
              >
                <option value="NRI">NRI</option>
                <option value="RNOR">RNOR</option>
                <option value="Resident">Resident</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-neutral-900">US Portfolio</h4>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${usPortfolio.overallReturn >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                  {usPortfolio.returnPercentage >= 0 ? '+' : ''}{usPortfolio.returnPercentage.toFixed(2)}%
                </span>
                {usPortfolio.overallReturn >= 0 ? 
                  <ArrowUp className="h-4 w-4 text-[--success-600] ml-1" /> : 
                  <ArrowDown className="h-4 w-4 text-[--error-600] ml-1" />
                }
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-500 mb-1">Investment (USD)</p>
                <p className="text-lg font-semibold text-neutral-900">${usPortfolio.totalInvestment.toLocaleString()}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {formatCurrency(convertToINR(usPortfolio.totalInvestment))}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-neutral-500 mb-1">Current Value (USD)</p>
                <p className="text-lg font-semibold text-neutral-900">${usPortfolio.currentValue.toLocaleString()}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {formatCurrency(convertToINR(usPortfolio.currentValue))}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-neutral-500 mb-1">Gain/Loss (USD)</p>
                <p className={`text-lg font-semibold ${usPortfolio.overallReturn >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                  {usPortfolio.overallReturn >= 0 ? '+' : ''}${usPortfolio.overallReturn.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {usPortfolio.overallReturn >= 0 ? '+' : ''}{formatCurrency(convertToINR(usPortfolio.overallReturn))}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-neutral-500 mb-1">Holdings</p>
                <p className="text-lg font-semibold text-neutral-900">{usPortfolio.stocks.length}</p>
                <button
                  onClick={() => setActiveTab('us')}
                  className="text-xs text-[--primary-600] hover:text-[--primary-800] mt-1"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-neutral-900">Indian Portfolio</h4>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${indianPortfolio.overallReturn >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                  {indianPortfolio.returnPercentage >= 0 ? '+' : ''}{indianPortfolio.returnPercentage.toFixed(2)}%
                </span>
                {indianPortfolio.overallReturn >= 0 ? 
                  <ArrowUp className="h-4 w-4 text-[--success-600] ml-1" /> : 
                  <ArrowDown className="h-4 w-4 text-[--error-600] ml-1" />
                }
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-500 mb-1">Investment (INR)</p>
                <p className="text-lg font-semibold text-neutral-900">{formatCurrency(indianPortfolio.totalInvestment)}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  ${(indianPortfolio.totalInvestment / exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-neutral-500 mb-1">Current Value (INR)</p>
                <p className="text-lg font-semibold text-neutral-900">{formatCurrency(indianPortfolio.currentValue)}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  ${(indianPortfolio.currentValue / exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-neutral-500 mb-1">Gain/Loss (INR)</p>
                <p className={`text-lg font-semibold ${indianPortfolio.overallReturn >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                  {indianPortfolio.overallReturn >= 0 ? '+' : ''}{formatCurrency(indianPortfolio.overallReturn)}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {indianPortfolio.overallReturn >= 0 ? '+' : ''}${(indianPortfolio.overallReturn / exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-neutral-500 mb-1">Holdings</p>
                <p className="text-lg font-semibold text-neutral-900">{indianPortfolio.stocks.length}</p>
                <button
                  onClick={() => setActiveTab('india')}
                  className="text-xs text-[--primary-600] hover:text-[--primary-800] mt-1"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-[--primary-50] rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-[--primary-800]">Combined Portfolio Value</h4>
            <p className="text-lg font-semibold text-[--primary-900]">
              {formatCurrency(indianPortfolio.currentValue + convertToINR(usPortfolio.currentValue))}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg">
              <p className="text-xs text-neutral-500 mb-1">US Portfolio (INR)</p>
              <p className="text-base font-medium text-neutral-900">{formatCurrency(convertToINR(usPortfolio.currentValue))}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {((convertToINR(usPortfolio.currentValue) / (indianPortfolio.currentValue + convertToINR(usPortfolio.currentValue))) * 100).toFixed(1)}% of total
              </p>
            </div>
            
            <div className="p-3 bg-white rounded-lg">
              <p className="text-xs text-neutral-500 mb-1">Indian Portfolio (INR)</p>
              <p className="text-base font-medium text-neutral-900">{formatCurrency(indianPortfolio.currentValue)}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {((indianPortfolio.currentValue / (indianPortfolio.currentValue + convertToINR(usPortfolio.currentValue))) * 100).toFixed(1)}% of total
              </p>
            </div>
            
            <div className="p-3 bg-white rounded-lg">
              <p className="text-xs text-neutral-500 mb-1">Overall Return</p>
              <p className={`text-base font-medium ${
                (indianPortfolio.overallReturn + convertToINR(usPortfolio.overallReturn)) >= 0 
                  ? 'text-[--success-600]' 
                  : 'text-[--error-600]'
              }`}>
                {(indianPortfolio.overallReturn + convertToINR(usPortfolio.overallReturn)) >= 0 ? '+' : ''}
                {formatCurrency(indianPortfolio.overallReturn + convertToINR(usPortfolio.overallReturn))}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {(((indianPortfolio.overallReturn + convertToINR(usPortfolio.overallReturn)) / (indianPortfolio.totalInvestment + convertToINR(usPortfolio.totalInvestment))) * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex border-b border-neutral-200 mb-6">
          <button
            onClick={() => setActiveTab('us')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'us'
                ? 'text-[--primary-600] border-b-2 border-[--primary-600]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            US Portfolio
          </button>
          <button
            onClick={() => setActiveTab('india')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'india'
                ? 'text-[--primary-600] border-b-2 border-[--primary-600]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Indian Portfolio
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">Holdings</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Avg. Price
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Gain/Loss
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {activePortfolio.stocks.map((stock) => {
                    const investmentValue = stock.quantity * stock.avgBuyPrice;
                    const currentValue = stock.quantity * stock.currentPrice;
                    const gainLoss = currentValue - investmentValue;
                    const gainLossPercentage = (gainLoss / investmentValue) * 100;
                    
                    return (
                      <tr key={stock.symbol}>
                        <td className="px-4 py-2">
                          <div>
                            <p className="text-sm font-medium text-neutral-900">{stock.symbol}</p>
                            <p className="text-xs text-neutral-500">{stock.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-neutral-600">{stock.quantity}</td>
                        <td className="px-4 py-2 text-sm text-neutral-600">
                          {formatPortfolioCurrency(stock.avgBuyPrice, stock.currency)}
                        </td>
                        <td className="px-4 py-2 text-sm text-neutral-600">
                          {formatPortfolioCurrency(stock.currentPrice, stock.currency)}
                        </td>
                        <td className="px-4 py-2">
                          <div>
                            <p className={`text-sm font-medium ${gainLoss >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                              {gainLoss >= 0 ? '+' : ''}{formatPortfolioCurrency(gainLoss, stock.currency)}
                            </p>
                            <p className={`text-xs ${gainLoss >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                              {gainLoss >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}%
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">Sector Allocation</h4>
            <div className="h-64">
              <ResultChart 
                data={getSectorAllocation()}
                centerText={`${activeTab === 'us' ? '$' : '₹'}${Math.round(activePortfolio.currentValue).toLocaleString()}\nTotal Value`}
              />
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-[--accent-50] rounded-lg border border-[--accent-200]">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-[--accent-600] mt-0.5 mr-3" />
            <div>
              <h4 className="font-medium text-[--accent-800] mb-1">Investment Insights</h4>
              <p className="text-sm text-[--accent-700]">
                {activeTab === 'us' 
                  ? 'Your US portfolio is heavily weighted towards Technology stocks. Consider diversifying into other sectors like Healthcare and Consumer Staples for better risk management.'
                  : 'Your Indian portfolio has good sector diversification. The Financial Services sector is performing well, but Energy stocks are underperforming compared to the broader market.'}
              </p>
              <button
                onClick={() => setShowTaxInfo(!showTaxInfo)}
                className="text-sm font-medium text-[--accent-800] hover:text-[--accent-900] mt-2 flex items-center"
              >
                {showTaxInfo ? 'Hide Tax Information' : 'Show Tax Information'}
                {showTaxInfo ? 
                  <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg> : 
                  <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                }
              </button>
            </div>
          </div>
          
          {showTaxInfo && (
            <div className="mt-4 pl-8">
              <h5 className="font-medium text-[--accent-800] mb-2">Tax Implications for {taxResidency}</h5>
              <div className="space-y-3">
                {taxResidency === 'NRI' && (
                  <>
                    <p className="text-sm text-[--accent-700]">
                      <strong>US Stocks:</strong> As an NRI, you'll pay taxes in the US (withholding tax on dividends, typically 25% which can be reduced to 15% under the India-US tax treaty) and may need to report these investments in your Indian tax returns if you have Indian income.
                    </p>
                    <p className="text-sm text-[--accent-700]">
                      <strong>Indian Stocks:</strong> For Indian investments, capital gains are taxable in India. Short-term gains (held for less than 12 months) are taxed at 15%, while long-term gains above ₹1 lakh are taxed at 10% without indexation benefits.
                    </p>
                  </>
                )}
                
                {taxResidency === 'RNOR' && (
                  <>
                    <p className="text-sm text-[--accent-700]">
                      <strong>US Stocks:</strong> As an RNOR (Resident but Not Ordinarily Resident), your foreign income (including US investments) is not taxable in India unless it's derived from a business controlled in or profession set up in India.
                    </p>
                    <p className="text-sm text-[--accent-700]">
                      <strong>Indian Stocks:</strong> For Indian investments, the tax treatment is the same as for residents. Short-term gains are taxed at 15%, while long-term gains above ₹1 lakh are taxed at 10%.
                    </p>
                  </>
                )}
                
                {taxResidency === 'Resident' && (
                  <>
                    <p className="text-sm text-[--accent-700]">
                      <strong>US Stocks:</strong> As a Resident Indian, your global income is taxable in India. Capital gains from US stocks are taxed as per Indian tax laws. You can claim credit for taxes paid in the US under the DTAA.
                    </p>
                    <p className="text-sm text-[--accent-700]">
                      <strong>Indian Stocks:</strong> Short-term gains are taxed at 15%, while long-term gains above ₹1 lakh are taxed at 10% without indexation benefits.
                    </p>
                  </>
                )}
                
                <p className="text-sm text-[--accent-700]">
                  <strong>FEMA Compliance:</strong> Ensure compliance with Foreign Exchange Management Act (FEMA) regulations for your overseas investments. NRIs can invest in Indian securities through Non-Resident External (NRE) or Non-Resident Ordinary (NRO) accounts.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investment Opportunities Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Investment Opportunities for NRIs</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h4 className="font-medium text-neutral-900 mb-3 flex items-center">
              <DollarSign className="h-5 w-5 text-[--primary-600] mr-2" />
              US Investment Options
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">US Stocks & ETFs</p>
                  <p className="text-xs text-neutral-600">Direct investment in US equities through brokers like Interactive Brokers, Charles Schwab, or TD Ameritrade.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">US-focused Mutual Funds</p>
                  <p className="text-xs text-neutral-600">Invest in US markets through India-based mutual funds that focus on US equities.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">US REITs</p>
                  <p className="text-xs text-neutral-600">Real Estate Investment Trusts that provide exposure to US real estate market with regular dividend income.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h4 className="font-medium text-neutral-900 mb-3 flex items-center">
              <DollarSign className="h-5 w-5 text-[--primary-600] mr-2" />
              Indian Investment Options
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">NRE/NRO Investments</p>
                  <p className="text-xs text-neutral-600">Invest in Indian stocks, mutual funds, and bonds through Non-Resident External (NRE) or Non-Resident Ordinary (NRO) accounts.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Portfolio Investment Scheme (PIS)</p>
                  <p className="text-xs text-neutral-600">Invest in Indian stock markets through a designated PIS account with an authorized dealer bank.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-3 flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Fixed Income Options</p>
                  <p className="text-xs text-neutral-600">NRE/NRO Fixed Deposits, FCNR Deposits, and RBI Bonds offer stable returns with varying tax benefits.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Regulatory & Compliance Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Regulatory & Compliance Guide</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">US Investments Compliance</h4>
            <div className="space-y-3">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h5 className="text-sm font-medium text-neutral-900 mb-1">FBAR Reporting</h5>
                <p className="text-xs text-neutral-600">
                  If your foreign financial accounts exceed $10,000 at any time during the calendar year, you must file a Foreign Bank Account Report (FBAR) with the US Treasury Department.
                </p>
              </div>
              
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h5 className="text-sm font-medium text-neutral-900 mb-1">FATCA Compliance</h5>
                <p className="text-xs text-neutral-600">
                  The Foreign Account Tax Compliance Act (FATCA) requires foreign financial institutions to report on foreign assets held by US account holders.
                </p>
              </div>
              
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h5 className="text-sm font-medium text-neutral-900 mb-1">W-8BEN Form</h5>
                <p className="text-xs text-neutral-600">
                  Submit Form W-8BEN to your US broker to claim tax treaty benefits and reduce withholding tax on US investments.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">Indian Investments Compliance</h4>
            <div className="space-y-3">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h5 className="text-sm font-medium text-neutral-900 mb-1">FEMA Regulations</h5>
                <p className="text-xs text-neutral-600">
                  NRIs must comply with Foreign Exchange Management Act (FEMA) regulations when investing in India. Investments must be made through proper banking channels.
                </p>
              </div>
              
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h5 className="text-sm font-medium text-neutral-900 mb-1">KYC Requirements</h5>
                <p className="text-xs text-neutral-600">
                  Complete Know Your Customer (KYC) procedures with your Indian broker or mutual fund, including providing overseas address proof and PAN card.
                </p>
              </div>
              
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h5 className="text-sm font-medium text-neutral-900 mb-1">Tax Residency Certificate</h5>
                <p className="text-xs text-neutral-600">
                  Obtain a Tax Residency Certificate (TRC) from your country of residence to avail benefits under the Double Taxation Avoidance Agreement (DTAA).
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-[--warning-50] rounded-lg border border-[--warning-200]">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-[--warning-600] mt-0.5 mr-3" />
            <div>
              <h4 className="font-medium text-[--warning-800] mb-1">Important Disclaimer</h4>
              <p className="text-sm text-[--warning-700]">
                This dashboard provides general information and is not a substitute for professional financial or tax advice. Tax laws and regulations for NRIs are complex and subject to change. Please consult with a qualified tax advisor familiar with both Indian and US tax laws before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100]">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Investment Tools</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/calculators/capital-gains-tax-advanced-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Capital Gains Tax Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate tax on your investment gains</p>
          </a>
          <a 
            href="/calculators/currency-converter" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Currency Converter</h4>
            <p className="text-xs text-[--primary-600]">Convert between different currencies</p>
          </a>
          <a 
            href="/calculators/asset-allocation-planner" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Asset Allocation Planner</h4>
            <p className="text-xs text-[--primary-600]">Create a balanced portfolio based on your risk profile</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NriStockInvestmentDashboard;