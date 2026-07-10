import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Shield, AlertTriangle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const NetWorthCalculator: React.FC = () => {
  const [assets, setAssets] = useState({
    cash: 50000,
    investments: 1000000,
    realEstate: 5000000,
    vehicles: 500000,
    otherAssets: 200000
  });

  const [liabilities, setLiabilities] = useState({
    mortgages: 3000000,
    loans: 300000,
    creditCards: 50000,
    otherDebts: 0
  });

  const totalAssets = Object.values(assets).reduce((sum, value) => sum + value, 0);
  const totalLiabilities = Object.values(liabilities).reduce((sum, value) => sum + value, 0);
  const netWorth = totalAssets - totalLiabilities;
  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

  const contentData = {
    title: 'Net Worth Calculator India 2026',
    description: 'Calculate your exact personal net worth by listing your assets and liabilities. This tool helps you track your wealth growth over time, detect dangerous debt-to-asset ratios early, and make smarter personal finance decisions. Essential for annual financial planning, early retirement (FIRE) tracking, and wealth building in India.',
    benefits: [
      'Single-view snapshot of your complete financial health',
      'Calculates your true Wealth (Net Worth) vs just your Income',
      'Exposes dangerous Debt-to-Asset ratios before they become a crisis',
      'Perfect for tracking FIRE (Financial Independence, Retire Early) progress',
      'Reveals how much of your net worth is locked in illiquid assets (like real estate)',
      '100% free personal balance sheet calculator for Indians'
    ],
    howToSteps: [
      {
        step: 'Calculate Liquid Assets (Cash & Bank)',
        details: 'Include your savings accounts, current accounts, physical cash, and any sweep-in FDs. These are funds you can access immediately without penalty.'
      },
      {
        step: 'Add Investments (Growth Assets)',
        details: 'Include the CURRENT MARKET VALUE of your Mutual Funds, Stocks, PPF, EPF, NPS, Fixed Deposits, and Bonds. Do not enter the invested amount; enter the current value.'
      },
      {
        step: 'Estimate Physical Assets (Real Estate & Gold)',
        details: 'Enter a CONSERVATIVE market value for your primary home, plots, and gold jewelry. For vehicles, deduct 15-20% depreciation per year. Overvaluing these gives a false sense of wealth.'
      },
      {
        step: 'List All Liabilities (Debts)',
        details: 'Enter the OUTSTANDING PRINCIPAL of your Home Loan, Car Loan, Personal Loans, and the total outstanding balance on your Credit Cards. Do not add future interest; only add the principal you owe today.'
      },
      {
        step: 'Analyze the Debt-to-Asset Ratio',
        details: 'If your total liabilities are ₹50 Lakhs and total assets are ₹1 Crore, your ratio is 50%. Aim to keep this below 40%. A high ratio means a large portion of your wealth is financed by the bank.'
      }
    ],
    tips: [
      'Track your Net Worth twice a year. Tracking it monthly can cause stress due to stock market volatility.',
      'A negative net worth is common in your 20s (due to education loans). Focus on making the number less negative every year.',
      'Your primary house shouldn\'t be your ONLY asset. A house doesn\'t generate cash flow for retirement.',
      'Aim for a Debt-to-Asset ratio below 30% by age 40.',
      'Focus on increasing your \"Investments\" column rather than your \"Vehicles\" column.'
    ],
    mistakes: [
      'Entering the purchase price of a car instead of its current depreciated value.',
      'Entering the total payable amount of a loan (including future interest) instead of just the outstanding principal.',
      'Assuming a high Net Worth means you are financially secure (If 95% of your net worth is in one illiquid house, you are \"House Rich, Cash Poor\").',
      'Not including Employee Provident Fund (EPF) balance as an asset.',
      'Comparing your Net Worth to others instead of comparing it to your own Net Worth from last year.'
    ],
    examples: [
      {
        scenario: 'Young Professional (Age 28)',
        inputs: [
          { label: 'Assets', value: 'Cash: ₹1L, EPF: ₹3L, MFs: ₹4L, Car: ₹5L' },
          { label: 'Liabilities', value: 'Car Loan: ₹4L, Edu Loan: ₹2L' },
          { label: 'Calculation', value: 'Total Assets (13L) - Liabilities (6L)' }
        ],
        result: 'Net Worth: ₹7 Lakhs',
        explanation: 'Despite having a car loan and education loan, consistent SIPs and EPF contributions have kept the net worth firmly in the positive territory. The next goal is to clear the education loan to boost net worth faster.'
      },
      {
        scenario: 'Mid-Career Couple (Age 38)',
        inputs: [
          { label: 'Assets', value: 'House: ₹80L, EPF/PPF: ₹20L, MFs: ₹15L' },
          { label: 'Liabilities', value: 'Home Loan: ₹50L, Credit Card: ₹1L' },
          { label: 'Calculation', value: 'Total Assets (1.15 Cr) - Liabilities (51L)' }
        ],
        result: 'Net Worth: ₹64 Lakhs',
        explanation: 'While they own an ₹80 Lakh house, they still owe ₹50 Lakhs to the bank. Their true wealth (Net Worth) is ₹64 Lakhs. Their Debt-to-Asset ratio is 44%, which is acceptable for home owners but should be reduced over the next 10 years.'
      }
    ],
    faqs: [
      {
        question: 'What is a good Net Worth by age in India?',
        answer: 'There is no strict rule, but a popular formula is: Target Net Worth = (Age × Gross Annual Income) / 10. E.g., if you are 30 and earn ₹15 Lakhs/year, your target net worth should be around ₹45 Lakhs.'
      },
      {
        question: 'Should I include my primary residence in my Net Worth?',
        answer: 'Yes, it is legally your asset. However, for FIRE (Early Retirement) calculations, many experts recommend excluding the primary residence because you cannot sell it to fund your daily living expenses without becoming homeless.'
      },
      {
        question: 'Why did my Net Worth drop even though I saved money?',
        answer: 'This happens if the stock market crashes or property values decline. If you saved ₹50,000 but your mutual fund portfolio dropped by ₹1,00,000, your net worth will decrease by ₹50,000. This is normal; focus on the long-term trend.'
      },
      {
        question: 'Is EPF (Provident Fund) considered an asset?',
        answer: 'Absolutely! Your EPF balance is one of your strongest debt assets. You can check your current balance on the EPFO portal and add it to your \"Investments\" column.'
      }
    ],
    relatedCalculators: [
      { name: 'Retirement Calculator', url: '/calculators/retirement-calculator', description: 'See if your net worth is enough to retire' },
      { name: 'Debt Payoff Calculator', url: '/calculators/debt-payoff-calculator', description: 'Strategy to reduce your liabilities' },
      { name: 'Budget Calculator', url: '/calculators/budget-calculator', description: 'Control cash flow to increase assets' }
    ],
    lastUpdated: '2026-02-15'
  };

  const handleAssetChange = (field: keyof typeof assets) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssets(prev => ({
      ...prev,
      [field]: Number(e.target.value) || 0
    }));
  };

  const handleLiabilityChange = (field: keyof typeof liabilities) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiabilities(prev => ({
      ...prev,
      [field]: Number(e.target.value) || 0
    }));
  };

  return (
    <>
      <SEOHelmet
        title="Net Worth Calculator India 2026 - Assets vs Liabilities Tracker | MoneyCal"
        description="Free net worth calculator for India. Calculate your true wealth by subtracting liabilities from assets. Track your FIRE journey and debt-to-asset ratio."
        keywords="net worth calculator india, personal balance sheet calculator, assets liabilities calculator india, how to calculate net worth, financial health tracker, FIRE calculator"
        url="/calculators/net-worth-calculator"
      />
      <CalculatorSchema
        name="Net Worth Calculator India"
        description="Calculate personal net worth by subtracting liabilities from assets. Track wealth growth over time."
        url="/calculators/net-worth-calculator"
        features={['Assets vs liabilities calculation', 'Personal net worth tracking', 'Debt-to-asset ratio analysis', 'FIRE planning support']}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-15"
      />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Net Worth Calculator</h1>
        <p className="text-lg text-center text-gray-700 mb-8">Calculate your true wealth by balancing your Assets against your Liabilities.</p>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                Assets (What You Own)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cash & Bank Accounts</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={assets.cash}
                      onChange={handleAssetChange('cash')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Investments (MFs, Stocks, EPF)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={assets.investments}
                      onChange={handleAssetChange('investments')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Real Estate (Market Value)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={assets.realEstate}
                      onChange={handleAssetChange('realEstate')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicles (Depreciated Value)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={assets.vehicles}
                      onChange={handleAssetChange('vehicles')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Assets (Gold, etc.)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={assets.otherAssets}
                      onChange={handleAssetChange('otherAssets')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Assets:</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(totalAssets)}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingDown className="w-6 h-6 mr-2 text-red-500" />
                Liabilities (What You Owe)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Home Loan (Principal Left)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={liabilities.mortgages}
                      onChange={handleLiabilityChange('mortgages')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car/Personal Loans</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={liabilities.loans}
                      onChange={handleLiabilityChange('loans')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit Card Debt</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={liabilities.creditCards}
                      onChange={handleLiabilityChange('creditCards')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Debts (Family, etc.)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={liabilities.otherDebts}
                      onChange={handleLiabilityChange('otherDebts')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Liabilities:</span>
                <span className="text-xl font-bold text-red-600">{formatCurrency(totalLiabilities)}</span>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-2 border-indigo-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-indigo-600" />
                Your Net Worth Summary
              </h3>
              
              <div className="bg-white rounded-xl p-5 shadow-sm mb-4 border border-indigo-50">
                <p className="text-sm text-gray-600 mb-1">Total Net Worth</p>
                <p className={`text-4xl font-bold ${netWorth >= 0 ? 'text-indigo-600' : 'text-red-600'}`}>
                  {formatCurrency(netWorth)}
                </p>
                <p className="text-xs text-gray-500 mt-2">Assets minus Liabilities</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-indigo-50 mb-4">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Debt-to-Asset Ratio</p>
                    <p className={`text-2xl font-bold ${debtToAssetRatio > 50 ? 'text-red-600' : debtToAssetRatio > 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {debtToAssetRatio.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className={`h-2.5 rounded-full ${debtToAssetRatio > 50 ? 'bg-red-500' : debtToAssetRatio > 30 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min(100, debtToAssetRatio)}%` }}
                  ></div>
                </div>
              </div>

              {debtToAssetRatio > 50 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start mt-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-red-800">
                    <strong>High Debt Warning:</strong> More than 50% of your assets are financed by debt. Focus heavily on clearing high-interest liabilities before making new investments.
                  </p>
                </div>
              )}
              
              {debtToAssetRatio <= 50 && debtToAssetRatio > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start mt-4">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    <strong>Healthy Balance:</strong> Your debt levels are manageable compared to your assets. Keep growing your investments to reduce this ratio further.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <CalculatorContentWrapper
        contentData={contentData}
        title="Comprehensive Guide to Tracking Net Worth in India"
      />
    </>
  );
};

export default NetWorthCalculator;
