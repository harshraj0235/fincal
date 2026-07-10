import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, Search, PieChart, BarChart as BarChartIcon, Info } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

export const MutualFundOverlapChecker: React.FC = () => {
  const [fund1, setFund1] = useState<string>('');
  const [fund2, setFund2] = useState<string>('');
  const [searchTerm1, setSearchTerm1] = useState<string>('');
  const [searchTerm2, setSearchTerm2] = useState<string>('');
  const [searchResults1, setSearchResults1] = useState<string[]>([]);
  const [searchResults2, setSearchResults2] = useState<string[]>([]);
  const [overlapPercentage, setOverlapPercentage] = useState<number | null>(null);
  const [commonStocks, setCommonStocks] = useState<{name: string, fund1Weight: number, fund2Weight: number}[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  // Sample mutual fund data
  const mutualFunds = [
    'HDFC Top 100 Fund',
    'Axis Bluechip Fund',
    'Mirae Asset Large Cap Fund',
    'SBI Blue Chip Fund',
    'ICICI Prudential Bluechip Fund',
    'Aditya Birla Sun Life Frontline Equity Fund',
    'Kotak Bluechip Fund',
    'Nippon India Large Cap Fund',
    'UTI Equity Fund',
    'DSP Top 100 Equity Fund',
    'Canara Robeco Bluechip Equity Fund',
    'Invesco India Large Cap Fund',
    'Tata Large Cap Fund',
    'IDFC Large Cap Fund',
    'Franklin India Bluechip Fund',
    'HDFC Mid-Cap Opportunities Fund',
    'Axis Midcap Fund',
    'Kotak Emerging Equity Fund',
    'DSP Midcap Fund',
    'SBI Magnum Midcap Fund',
    'ICICI Prudential Midcap Fund',
    'Nippon India Growth Fund',
    'L&T Midcap Fund',
    'Invesco India Midcap Fund',
    'Tata Mid Cap Growth Fund',
    'HDFC Small Cap Fund',
    'Axis Small Cap Fund',
    'Kotak Small Cap Fund',
    'SBI Small Cap Fund',
    'Nippon India Small Cap Fund'
  ];
  
  // Sample stock holdings data (in a real app, this would come from an API)
  const fundHoldings: Record<string, {name: string, weight: number}[]> = {
    'HDFC Top 100 Fund': [
      {name: 'ICICI Bank', weight: 9.8},
      {name: 'HDFC Bank', weight: 9.2},
      {name: 'Reliance Industries', weight: 8.5},
      {name: 'Infosys', weight: 7.3},
      {name: 'TCS', weight: 5.9},
      {name: 'Larsen & Toubro', weight: 4.8},
      {name: 'Axis Bank', weight: 4.2},
      {name: 'ITC', weight: 3.9},
      {name: 'SBI', weight: 3.7},
      {name: 'Kotak Mahindra Bank', weight: 3.5}
    ],
    'Axis Bluechip Fund': [
      {name: 'HDFC Bank', weight: 9.5},
      {name: 'ICICI Bank', weight: 9.1},
      {name: 'Infosys', weight: 8.2},
      {name: 'TCS', weight: 7.8},
      {name: 'Reliance Industries', weight: 7.5},
      {name: 'Bharti Airtel', weight: 5.2},
      {name: 'Kotak Mahindra Bank', weight: 4.9},
      {name: 'Avenue Supermarts', weight: 4.5},
      {name: 'Bajaj Finance', weight: 4.1},
      {name: 'HUL', weight: 3.8}
    ],
    'Mirae Asset Large Cap Fund': [
      {name: 'HDFC Bank', weight: 9.7},
      {name: 'ICICI Bank', weight: 8.9},
      {name: 'Reliance Industries', weight: 8.6},
      {name: 'Infosys', weight: 7.5},
      {name: 'TCS', weight: 6.2},
      {name: 'SBI', weight: 5.1},
      {name: 'L&T', weight: 4.7},
      {name: 'Axis Bank', weight: 4.3},
      {name: 'HUL', weight: 3.9},
      {name: 'ITC', weight: 3.6}
    ]
  };
  
  // Add some sample data for other funds
  for (const fund of mutualFunds) {
    if (!fundHoldings[fund]) {
      // Generate random holdings for funds without specific data
      const randomHoldings = [
        {name: 'HDFC Bank', weight: Math.random() * 10},
        {name: 'ICICI Bank', weight: Math.random() * 9},
        {name: 'Reliance Industries', weight: Math.random() * 8},
        {name: 'Infosys', weight: Math.random() * 7},
        {name: 'TCS', weight: Math.random() * 6},
        {name: 'Bharti Airtel', weight: Math.random() * 5},
        {name: 'HUL', weight: Math.random() * 4},
        {name: 'ITC', weight: Math.random() * 4},
        {name: 'SBI', weight: Math.random() * 4},
        {name: 'Axis Bank', weight: Math.random() * 3}
      ];
      
      fundHoldings[fund] = randomHoldings.sort((a, b) => b.weight - a.weight);
    }
  }
  
  // Search functionality
  useEffect(() => {
    if (searchTerm1) {
      const results = mutualFunds.filter(fund => 
        fund.toLowerCase().includes(searchTerm1.toLowerCase())
      );
      setSearchResults1(results);
    } else {
      setSearchResults1([]);
    }
  }, [searchTerm1]);
  
  useEffect(() => {
    if (searchTerm2) {
      const results = mutualFunds.filter(fund => 
        fund.toLowerCase().includes(searchTerm2.toLowerCase())
      );
      setSearchResults2(results);
    } else {
      setSearchResults2([]);
    }
  }, [searchTerm2]);
  
  // Calculate overlap
  const calculateOverlap = () => {
    if (!fund1 || !fund2) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const holdings1 = fundHoldings[fund1] || [];
      const holdings2 = fundHoldings[fund2] || [];
      
      // Find common stocks
      const common: {name: string, fund1Weight: number, fund2Weight: number}[] = [];
      
      holdings1.forEach(stock1 => {
        const matchingStock = holdings2.find(stock2 => stock2.name === stock1.name);
        if (matchingStock) {
          common.push({
            name: stock1.name,
            fund1Weight: stock1.weight,
            fund2Weight: matchingStock.weight
          });
        }
      });
      
      // Calculate overlap percentage (using the minimum weight of each common stock)
      let overlapWeight = 0;
      common.forEach(stock => {
        overlapWeight += Math.min(stock.fund1Weight, stock.fund2Weight);
      });
      
      setOverlapPercentage(overlapWeight);
      setCommonStocks(common.sort((a, b) => 
        (Math.min(b.fund1Weight, b.fund2Weight) - Math.min(a.fund1Weight, a.fund2Weight))
      ));
      setIsAnalyzing(false);
    }, 1500);
  };
  
  return (
    <>
    <SEOHelmet
      title="Mutual Fund Overlap Checker India 2026 - Portfolio Diversification Tool | MoneyCal"
      description="Check mutual fund overlap, common holdings, and duplication percentage to improve diversification across your India portfolio."
      keywords="mutual fund overlap checker india, mutual fund portfolio overlap tool, common holdings mutual funds, diversification checker"
      url="/calculators/mutual-fund-overlap-checker"
    />
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Mutual Fund Overlap Checker</h2>
        <p className="text-neutral-600">
          Compare two mutual funds to see how much their portfolios overlap. High overlap means you may be investing in the same stocks through different funds, reducing diversification.
        </p>
      </div>

      {/* Fund Selection Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Select First Fund
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchTerm1}
                onChange={(e) => setSearchTerm1(e.target.value)}
                placeholder="Search for a mutual fund..."
                className="input pl-10"
              />
            </div>
            {searchResults1.length > 0 && (
              <div className="mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-10 border border-neutral-200">
                {searchResults1.map((result, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 focus:bg-neutral-100"
                    onClick={() => {
                      setFund1(result);
                      setSearchTerm1(result);
                      setSearchResults1([]);
                    }}
                  >
                    {result}
                  </button>
                ))}
              </div>
            )}
            
            {fund1 && (
              <div className="mt-2 p-3 bg-neutral-50 rounded-lg">
                <h3 className="font-medium text-neutral-900">{fund1}</h3>
                <p className="text-xs text-neutral-500 mt-1">Top 5 Holdings:</p>
                <div className="mt-1 space-y-1">
                  {fundHoldings[fund1]?.slice(0, 5).map((holding, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-neutral-700">{holding.name}</span>
                      <span className="text-neutral-600">{holding.weight.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Select Second Fund
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchTerm2}
                onChange={(e) => setSearchTerm2(e.target.value)}
                placeholder="Search for a mutual fund..."
                className="input pl-10"
              />
            </div>
            {searchResults2.length > 0 && (
              <div className="mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-10 border border-neutral-200">
                {searchResults2.map((result, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 focus:bg-neutral-100"
                    onClick={() => {
                      setFund2(result);
                      setSearchTerm2(result);
                      setSearchResults2([]);
                    }}
                  >
                    {result}
                  </button>
                ))}
              </div>
            )}
            
            {fund2 && (
              <div className="mt-2 p-3 bg-neutral-50 rounded-lg">
                <h3 className="font-medium text-neutral-900">{fund2}</h3>
                <p className="text-xs text-neutral-500 mt-1">Top 5 Holdings:</p>
                <div className="mt-1 space-y-1">
                  {fundHoldings[fund2]?.slice(0, 5).map((holding, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-neutral-700">{holding.name}</span>
                      <span className="text-neutral-600">{holding.weight.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={calculateOverlap}
            disabled={!fund1 || !fund2 || isAnalyzing}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              !fund1 || !fund2 || isAnalyzing
                ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                : 'bg-[--primary-600] text-white hover:bg-[--primary-700]'
            }`}
          >
            {isAnalyzing ? 'Analyzing Overlap...' : 'Check Portfolio Overlap'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {overlapPercentage !== null && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Overlap Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-[--primary-50] rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Portfolio Overlap</p>
              <p className="text-3xl font-bold text-[--primary-800]">{overlapPercentage.toFixed(1)}%</p>
              <div className="mt-2 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    overlapPercentage < 15 ? 'bg-[--success-500]' : 
                    overlapPercentage < 30 ? 'bg-[--warning-500]' : 
                    'bg-[--error-500]'
                  }`}
                  style={{ width: `${Math.min(100, overlapPercentage)}%` }}
                ></div>
              </div>
              <p className="text-xs mt-2 text-neutral-600">
                {overlapPercentage < 15 
                  ? 'Low overlap - Good diversification' 
                  : overlapPercentage < 30 
                  ? 'Moderate overlap - Consider rebalancing' 
                  : 'High overlap - Diversification concern'}
              </p>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Common Holdings</p>
              <p className="text-3xl font-bold text-neutral-900">{commonStocks.length}</p>
              <p className="text-xs mt-2 text-neutral-600">
                Number of stocks that appear in both funds
              </p>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Diversification Score</p>
              <p className="text-3xl font-bold text-neutral-900">
                {Math.max(1, Math.min(10, Math.round(10 - (overlapPercentage / 10))))}
                <span className="text-lg">/10</span>
              </p>
              <p className="text-xs mt-2 text-neutral-600">
                Higher score indicates better diversification
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-neutral-900 mb-3">Common Holdings</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {fund1} Weight
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {fund2} Weight
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Overlap Contribution
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {commonStocks.map((stock, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-neutral-900">{stock.name}</td>
                      <td className="px-4 py-2 text-sm text-neutral-600">{stock.fund1Weight.toFixed(1)}%</td>
                      <td className="px-4 py-2 text-sm text-neutral-600">{stock.fund2Weight.toFixed(1)}%</td>
                      <td className="px-4 py-2 text-sm text-neutral-600">
                        {Math.min(stock.fund1Weight, stock.fund2Weight).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-4 bg-[--accent-50] rounded-lg border border-[--accent-200]">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-[--accent-700] mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-[--accent-800] mb-1">Overlap Analysis Insights</h4>
                <p className="text-sm text-[--accent-700] mb-2">
                  {overlapPercentage < 15 
                    ? 'These funds have minimal overlap, providing good diversification in your portfolio.' 
                    : overlapPercentage < 30 
                    ? 'These funds have moderate overlap. While not critical, you may want to consider if both are necessary in your portfolio.' 
                    : 'These funds have significant overlap, which may reduce the diversification benefits of holding both. Consider replacing one with a fund that invests in different stocks or sectors.'}
                </p>
                <p className="text-sm text-[--accent-700]">
                  Remember that some overlap is normal, especially among funds in the same category. The key is to ensure your overall portfolio is well-diversified across different asset classes, sectors, and market capitalizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">Understanding Mutual Fund Overlap</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-neutral-900 mb-2">Why Overlap Matters</h4>
            <p className="text-sm text-neutral-600 mb-3">
              When multiple mutual funds in your portfolio invest in the same stocks, you're essentially paying multiple fund management fees for the same investments. This reduces the diversification benefits of holding multiple funds.
            </p>
            <p className="text-sm text-neutral-600">
              High overlap can lead to:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-600 mt-2 space-y-1">
              <li>Concentrated exposure to specific stocks</li>
              <li>Higher risk during market downturns</li>
              <li>Redundant fund management fees</li>
              <li>Difficulty in tracking actual sector allocation</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-neutral-900 mb-2">How to Use This Information</h4>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-2">
              <li><strong>Low overlap (0-15%):</strong> Ideal for diversification. These funds complement each other well.</li>
              <li><strong>Moderate overlap (15-30%):</strong> Acceptable but monitor. Consider if both funds serve distinct purposes in your portfolio.</li>
              <li><strong>High overlap (30%+):</strong> Potential redundancy. Consider replacing one fund or reallocating to a different category.</li>
              <li><strong>Very high overlap (50%+):</strong> Significant redundancy. Strongly consider consolidating to avoid duplicate fees.</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-[--primary-50] rounded-lg">
          <h4 className="font-medium text-[--primary-800] mb-2">Diversification Strategies</h4>
          <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-2">
            <li>Combine funds from different categories (Large Cap, Mid Cap, Small Cap)</li>
            <li>Include funds with different investment styles (Growth, Value, Blend)</li>
            <li>Consider sector-specific funds for targeted exposure</li>
            <li>Add international funds to diversify beyond Indian markets</li>
            <li>Include debt funds to balance equity risk</li>
          </ul>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100]">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Investment Tools</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/calculators/asset-allocation-planner" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Asset Allocation Planner</h4>
            <p className="text-xs text-[--primary-600]">Create a balanced portfolio based on your risk profile</p>
          </a>
          <a 
            href="/calculators/risk-appetite-assessment" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Risk Appetite Assessment</h4>
            <p className="text-xs text-[--primary-600]">Determine your investment risk tolerance</p>
          </a>
          <a 
            href="/calculators/mutual-fund-returns-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Mutual Fund Returns Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate potential returns on your mutual fund investments</p>
          </a>
        </div>
      </div>
    </div>
    <section className="mt-10">
      <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3">
        <h2 className="text-2xl font-bold text-neutral-900">Use overlap analysis to avoid duplicate risk</h2>
        <p className="text-neutral-700">If two funds hold very similar top stocks, your portfolio may look diversified but can behave like one fund during volatility.</p>
        <p className="text-neutral-700">Combine this checker with <Link to="/calculators/asset-allocation-planner" className="underline">Asset Allocation Planner</Link> and <Link to="/calculators/risk-appetite-assessment" className="underline">Risk Appetite Assessment</Link> for better portfolio structure.</p>
        <p className="text-neutral-700">For methodology and disclosure context, review investor resources on <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">SEBI</a> and <a href="https://www.amfiindia.com/" target="_blank" rel="noopener noreferrer" className="underline">AMFI</a>.</p>
      </div>
    </section>
    </>
  );
};

export default MutualFundOverlapChecker;