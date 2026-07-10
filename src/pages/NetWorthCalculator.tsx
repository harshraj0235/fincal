import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { Briefcase, TrendingUp, DollarSign, Home, Car, CreditCard, Building, Plus, Trash2, Download, Save, BarChart3 } from 'lucide-react';

interface Asset {
  id: number;
  name: string;
  value: number;
  category: string;
}

interface Liability {
  id: number;
  name: string;
  value: number;
  category: string;
}

const NetWorthCalculator: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, name: 'Savings Account', value: 0, category: 'Cash & Savings' },
    { id: 2, name: 'Investment Portfolio', value: 0, category: 'Investments' },
    { id: 3, name: 'Real Estate', value: 0, category: 'Real Estate' },
    { id: 4, name: 'Vehicle', value: 0, category: 'Personal Property' }
  ]);

  const [liabilities, setLiabilities] = useState<Liability[]>([
    { id: 1, name: 'Home Loan', value: 0, category: 'Mortgage' },
    { id: 2, name: 'Car Loan', value: 0, category: 'Vehicle Loan' },
    { id: 3, name: 'Credit Card Debt', value: 0, category: 'Credit Cards' },
    { id: 4, name: 'Personal Loan', value: 0, category: 'Personal Loans' }
  ]);

  const assetCategories = [
    'Cash & Savings', 'Investments', 'Real Estate', 'Personal Property', 
    'Business Assets', 'Retirement Accounts', 'Insurance Cash Value', 'Other'
  ];

  const liabilityCategories = [
    'Mortgage', 'Vehicle Loan', 'Credit Cards', 'Personal Loans', 
    'Student Loans', 'Business Loans', 'Tax Liabilities', 'Other'
  ];

  const handleAssetChange = (id: number, field: string, value: string | number) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, [field]: field === 'value' ? Number(value) : value } : asset
    ));
  };

  const handleLiabilityChange = (id: number, field: string, value: string | number) => {
    setLiabilities(liabilities.map(liability => 
      liability.id === id ? { ...liability, [field]: field === 'value' ? Number(value) : value } : liability
    ));
  };

  const addAsset = () => {
    const newId = Math.max(...assets.map(a => a.id)) + 1;
    setAssets([...assets, { id: newId, name: '', value: 0, category: 'Other' }]);
  };

  const addLiability = () => {
    const newId = Math.max(...liabilities.map(l => l.id)) + 1;
    setLiabilities([...liabilities, { id: newId, name: '', value: 0, category: 'Other' }]);
  };

  const removeAsset = (id: number) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const removeLiability = (id: number) => {
    setLiabilities(liabilities.filter(liability => liability.id !== id));
  };

  const getTotalAssets = () => assets.reduce((sum, asset) => sum + asset.value, 0);
  const getTotalLiabilities = () => liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const getNetWorth = () => getTotalAssets() - getTotalLiabilities();

  const getCategoryTotal = (items: Asset[] | Liability[], category: string) => {
    return items
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.value, 0);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('netWorthData', JSON.stringify({ assets, liabilities }));
    alert('Net worth data saved successfully!');
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('netWorthData');
    if (saved) {
      const data = JSON.parse(saved);
      setAssets(data.assets);
      setLiabilities(data.liabilities);
    }
  };

  const contentData = {
    title: "Net Worth Calculator India",
    description: "Calculate your net worth by tracking all your assets (savings, investments, real estate, vehicles) and liabilities (home loan, car loan, credit card debt). Understand your true financial position, monitor wealth growth over time, and get actionable tips to improve your net worth.",
    
    benefits: [
      "Get a complete snapshot of your financial health in one place",
      "Track all assets across categories — cash, investments, real estate, personal property",
      "Monitor all liabilities — mortgages, vehicle loans, credit cards, personal loans",
      "See your asset-to-liability ratio for financial stability assessment",
      "Save and load your data for regular monthly tracking",
      "Get personalized financial health assessment and improvement tips"
    ],
    
    howToSteps: [
      { step: "Add Your Assets", details: "List all your assets with their current market value. Include savings accounts, FDs, mutual funds, stocks, real estate, vehicles, gold, and any other valuable possessions." },
      { step: "Add Your Liabilities", details: "List all outstanding debts — home loans, car loans, personal loans, credit card balances, education loans, and any other money you owe." },
      { step: "Review Your Net Worth", details: "The calculator instantly shows your net worth (Assets minus Liabilities), along with category-wise breakdown and asset-to-liability ratio." },
      { step: "Save & Track Monthly", details: "Save your data and revisit monthly. Tracking net worth over time is the best indicator of whether you are building wealth or losing it." }
    ],
    
    examples: [
      {
        scenario: "Young Professional (Age 28) — Starting Out",
        inputs: [
          { label: "Savings Account", value: "\u20b92,50,000" },
          { label: "Mutual Funds (SIP)", value: "\u20b94,00,000" },
          { label: "PPF Balance", value: "\u20b91,50,000" },
          { label: "Education Loan", value: "\u20b93,00,000" },
          { label: "Credit Card Balance", value: "\u20b925,000" }
        ],
        result: "Net Worth: \u20b94,75,000 | Assets: \u20b98,00,000 | Liabilities: \u20b93,25,000",
        explanation: "Rahul is 28, earning \u20b960K/month. His net worth of \u20b94.75L is solid for his age. His asset-to-liability ratio is 2.5x (healthy). Key positives: No high-interest debt, building SIP portfolio. Action: Continue SIPs, clear education loan in 1 year, start building emergency fund to 6 months expenses (\u20b93.6L)."
      },
      {
        scenario: "Mid-Career Family (Age 38) — Home Owner",
        inputs: [
          { label: "Savings & FD", value: "\u20b915,00,000" },
          { label: "Mutual Funds & Stocks", value: "\u20b925,00,000" },
          { label: "House (Market Value)", value: "\u20b985,00,000" },
          { label: "Car", value: "\u20b96,00,000" },
          { label: "Home Loan Outstanding", value: "\u20b945,00,000" },
          { label: "Car Loan", value: "\u20b93,50,000" }
        ],
        result: "Net Worth: \u20b982,50,000 | Assets: \u20b91,31,00,000 | Liabilities: \u20b948,50,000",
        explanation: "Priya and Amit (38) have a net worth of \u20b982.5L. Their asset-to-liability ratio is 2.7x. Real estate forms 65% of assets — this is typical but risky (illiquid). Action: Increase financial assets (MF, stocks) to at least 30% of total assets, prepay home loan with annual bonuses, and ensure adequate term insurance (\u20b91Cr minimum)."
      }
    ],
    
    tips: [
      "Track net worth monthly on the same date. This single number tells you more about financial progress than salary or income.",
      "Focus on increasing the gap between assets and liabilities. Even \u20b95,000/month net worth growth means \u20b960K/year progress.",
      "Don't count depreciating assets (phones, electronics, furniture) — only include items with resale value like vehicles and property.",
      "Aim for an asset-to-liability ratio above 2.0x. Below 1.0x means you owe more than you own — a red flag requiring immediate action."
    ],
    
    mistakes: [
      "Overvaluing illiquid assets like property at 'expected' prices instead of realistic market value.",
      "Ignoring small liabilities like credit card balances, buy-now-pay-later dues, and informal loans from friends/family.",
      "Not tracking net worth regularly — checking only once a year misses trends and warning signs.",
      "Confusing income with wealth. A high salary with high spending and no savings leads to zero net worth growth."
    ],
    
    faqs: [
      { question: "What is net worth and why does it matter?", answer: "Net worth is the difference between what you own (assets) and what you owe (liabilities). It's the single best measure of your financial health. A positive and growing net worth means you're building wealth. A negative net worth means you owe more than you own. Unlike income, which measures cash flow, net worth measures accumulated wealth. Two people earning \u20b91L/month can have vastly different net worths based on spending, saving, and investing habits." },
      { question: "What should I include as assets?", answer: "Include all items of value: Bank savings and FDs, mutual funds, stocks, bonds, EPF and PPF balances, NPS corpus, real estate (current market value), vehicles (current resale value, not purchase price), gold and jewelry (at current rates), business equity, insurance cash/surrender value, and any other valuable possessions. Don't include everyday items like phones or furniture unless they have significant resale value." },
      { question: "What counts as a liability?", answer: "Include all debts and obligations: Home loan outstanding principal, car loan, personal loans, education loans, credit card balances (full outstanding), buy-now-pay-later dues, loans from friends/family, any EMIs or installments pending, and tax liabilities if significant. Always use the outstanding principal (not the original loan amount) for accuracy." },
      { question: "What is a good net worth for my age in India?", answer: "A common benchmark: Your net worth should be at least (Age × Annual Income) ÷ 10. For example, a 30-year-old earning \u20b912L/year should target net worth of at least \u20b936L. By 40: 5-8x annual income. By 50: 10-15x annual income. By retirement (60): 20-25x annual expenses. These are rough guidelines — the key is consistent growth, not hitting exact numbers. If your net worth is growing by at least 15-20% per year, you're on track." },
      { question: "How often should I calculate my net worth?", answer: "Monthly is ideal. Pick a fixed date (like the 1st of each month) and update all values. This creates a trend that helps you spot issues early — like creeping lifestyle inflation or insufficient savings. At minimum, calculate quarterly. Annual tracking misses important patterns and doesn't give you enough data points to course-correct." }
    ],
    
    relatedCalculators: [
      { name: "Retirement Calculator", url: "/tools/retirement-calculator", description: "Plan how much corpus you need for retirement." },
      { name: "SIP Calculator", url: "/tools/sip-calculator", description: "Calculate mutual fund SIP returns for asset building." },
      { name: "Home Loan Calculator", url: "/tools/home-loan-calculator", description: "Plan your biggest liability — the home loan EMI." },
      { name: "Income Tax Calculator", url: "/tools/income-tax-calculator", description: "Optimize taxes to increase savings and net worth." }
    ],
    
    lastUpdated: "2025-10-25"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <SEOHelmet
        title="Net Worth Calculator - Calculate Your Financial Net Worth India 2025"
        description="Calculate your net worth by tracking assets and liabilities. Free online net worth calculator with category breakdown, financial health assessment, and wealth building tips for India."
        keywords="net worth calculator, financial net worth, assets liabilities calculator, wealth calculator, financial position calculator, net worth tracker India"
        canonicalUrl="/calculators/net-worth-calculator"
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="Net Worth Calculator"
        description="Calculate your financial net worth by tracking all assets and liabilities. Get category-wise breakdown and financial health assessment."
        url="/calculators/net-worth-calculator"
        features={[
          "Track assets across 8 categories",
          "Monitor all liabilities and debts",
          "Asset-to-liability ratio analysis",
          "Save and load data for monthly tracking",
          "Financial health assessment with tips"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Net Worth Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your net worth by tracking all your assets and liabilities. 
            Understand your financial position and plan for wealth building.
          </p>
        </div>

        {/* Net Worth Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-green-600">₹{getTotalAssets().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Liabilities</p>
                <p className="text-2xl font-bold text-red-600">₹{getTotalLiabilities().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Net Worth</p>
                <p className={`text-2xl font-bold ${getNetWorth() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{getNetWorth().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Assets Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Assets
              </h2>
              <button
                onClick={addAsset}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Asset
              </button>
            </div>

            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Asset Name</label>
                      <input
                        type="text"
                        value={asset.name}
                        onChange={(e) => handleAssetChange(asset.id, 'name', e.target.value)}
                        placeholder="e.g., Savings Account"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category</label>
                      <select
                        value={asset.category}
                        onChange={(e) => handleAssetChange(asset.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      >
                        {assetCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Value (₹)</label>
                        <input
                          type="number"
                          value={asset.value}
                          onChange={(e) => handleAssetChange(asset.id, 'value', e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeAsset(asset.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-red-600" />
                Liabilities
              </h2>
              <button
                onClick={addLiability}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Liability
              </button>
            </div>

            <div className="space-y-4">
              {liabilities.map((liability) => (
                <div key={liability.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Liability Name</label>
                      <input
                        type="text"
                        value={liability.name}
                        onChange={(e) => handleLiabilityChange(liability.id, 'name', e.target.value)}
                        placeholder="e.g., Home Loan"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category</label>
                      <select
                        value={liability.category}
                        onChange={(e) => handleLiabilityChange(liability.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      >
                        {liabilityCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Amount (₹)</label>
                        <input
                          type="number"
                          value={liability.value}
                          onChange={(e) => handleLiabilityChange(liability.id, 'value', e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeLiability(liability.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Asset Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              Asset Breakdown
            </h3>
            
            <div className="space-y-3">
              {assetCategories.map(category => {
                const total = getCategoryTotal(assets, category);
                if (total === 0) return null;
                
                const percentage = (total / getTotalAssets()) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-700">{category}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-gray-800">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Liability Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-red-600" />
              Liability Breakdown
            </h3>
            
            <div className="space-y-3">
              {liabilityCategories.map(category => {
                const total = getCategoryTotal(liabilities, category);
                if (total === 0) return null;
                
                const percentage = (total / getTotalLiabilities()) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-700">{category}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-gray-800">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={saveToLocalStorage}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Data
          </button>
          <button
            onClick={loadFromLocalStorage}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            Load Data
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>

        {/* Financial Health Assessment */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Health Assessment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Net Worth Analysis</h3>
              <div className="space-y-3">
                {getNetWorth() >= 0 ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✅ Positive Net Worth</p>
                    <p className="text-green-700 text-sm">Your assets exceed your liabilities. Great financial position!</p>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">⚠️ Negative Net Worth</p>
                    <p className="text-red-700 text-sm">Focus on reducing debt and building assets to improve your position.</p>
                  </div>
                )}
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-medium">📊 Asset to Liability Ratio</p>
                  <p className="text-blue-700 text-sm">
                    {getTotalLiabilities() > 0 ? 
                      `Your assets are ${(getTotalAssets() / getTotalLiabilities()).toFixed(1)}x your liabilities.` :
                      'No liabilities recorded.'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Improvement Tips</h3>
              <div className="space-y-2 text-gray-700">
                <p>• <strong>Increase savings</strong> and emergency fund</p>
                <p>• <strong>Invest regularly</strong> in diversified assets</p>
                <p>• <strong>Pay off high-interest debt</strong> first</p>
                <p>• <strong>Track net worth monthly</strong> to monitor progress</p>
                <p>• <strong>Consider insurance</strong> to protect assets</p>
                <p>• <strong>Plan for retirement</strong> with long-term investments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-yellow-700">
            This calculator provides estimates for educational purposes. For accurate financial assessment, 
            consult with a qualified financial advisor. Asset values may fluctuate and should be updated regularly. 
            This tool is not a substitute for professional financial advice.
          </p>
        </div>

        {/* Educational Content */}
        <div className="mb-8">
          <CalculatorContentWrapper {...contentData} />
        </div>
      </div>
    </div>
  );
};

export default NetWorthCalculator; 
