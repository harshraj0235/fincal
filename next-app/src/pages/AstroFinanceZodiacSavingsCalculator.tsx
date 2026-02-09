import React, { useState } from 'react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const AstroFinanceZodiacSavingsCalculator: React.FC = () => {
  const [zodiac, setZodiac] = useState('Aries');
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [savingsGoal, setSavingsGoal] = useState(1000000);
  const [timeframe, setTimeframe] = useState(5);
  const [result, setResult] = useState<{
    recommendedSavings: number;
    strategy: string;
    tips: string[];
    bestAccounts: string[];
  } | null>(null);

  const calculateSavings = () => {
    const zodiacStrategies = {
      Aries: {
        strategy: 'Aggressive Growth',
        tips: ['Start with 20% of income', 'Focus on equity investments', 'Set ambitious goals'],
        bestAccounts: ['Equity Mutual Funds', 'Direct Stocks', 'PPF']
      },
      Taurus: {
        strategy: 'Stable & Secure',
        tips: ['Save 30% of income', 'Focus on fixed deposits', 'Build emergency fund first'],
        bestAccounts: ['Fixed Deposits', 'PPF', 'Gold ETFs']
      },
      Gemini: {
        strategy: 'Diversified Approach',
        tips: ['Save 25% of income', 'Mix of equity and debt', 'Regular review needed'],
        bestAccounts: ['Balanced Mutual Funds', 'Sukanya Samriddhi', 'NPS']
      },
      Cancer: {
        strategy: 'Family-Focused',
        tips: ['Save 35% of income', 'Prioritize insurance', 'Plan for family needs'],
        bestAccounts: ['Insurance Policies', 'Child Plans', 'PPF']
      },
      Leo: {
        strategy: 'Leadership Style',
        tips: ['Save 20% of income', 'Consider business investments', 'Focus on growth'],
        bestAccounts: ['Equity Funds', 'Business Loans', 'Real Estate']
      },
      Virgo: {
        strategy: 'Systematic Planning',
        tips: ['Save 30% of income', 'Use SIP approach', 'Track everything'],
        bestAccounts: ['SIP Mutual Funds', 'Systematic FDs', 'NPS']
      },
      Libra: {
        strategy: 'Balanced Approach',
        tips: ['Save 25% of income', 'Balance risk and return', 'Regular rebalancing'],
        bestAccounts: ['Balanced Funds', 'Debt Funds', 'PPF']
      },
      Scorpio: {
        strategy: 'Strategic & Secretive',
        tips: ['Save 35% of income', 'Research thoroughly', 'Keep investments private'],
        bestAccounts: ['Direct Equity', 'Private Equity', 'Gold']
      },
      Sagittarius: {
        strategy: 'Adventure & Growth',
        tips: ['Save 20% of income', 'Consider international investments', 'Long-term focus'],
        bestAccounts: ['International Funds', 'Equity Funds', 'Real Estate']
      },
      Capricorn: {
        strategy: 'Conservative & Disciplined',
        tips: ['Save 40% of income', 'Focus on traditional instruments', 'Patience is key'],
        bestAccounts: ['PPF', 'Fixed Deposits', 'Government Bonds']
      },
      Aquarius: {
        strategy: 'Innovative & Future-Focused',
        tips: ['Save 25% of income', 'Consider new-age investments', 'Tech-focused approach'],
        bestAccounts: ['Tech Funds', 'Cryptocurrency', 'Startup Investments']
      },
      Pisces: {
        strategy: 'Intuitive & Spiritual',
        tips: ['Save 30% of income', 'Trust your instincts', 'Consider charitable giving'],
        bestAccounts: ['Ethical Funds', 'Gold', 'Charity Trusts']
      }
    };

    const strategy = zodiacStrategies[zodiac as keyof typeof zodiacStrategies];
    const availableForSavings = monthlyIncome - monthlyExpenses;
    const recommendedSavings = Math.min(availableForSavings * 0.8, availableForSavings);

    setResult({
      recommendedSavings,
      strategy: strategy.strategy,
      tips: strategy.tips,
      bestAccounts: strategy.bestAccounts
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 glow-text text-center">Zodiac Savings Calculator</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Zodiac Sign</label>
            <select value={zodiac} onChange={e => setZodiac(e.target.value)} className="input">
              {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Income (₹)</label>
            <input type="number" value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Expenses (₹)</label>
            <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Savings Goal (₹)</label>
            <input type="number" value={savingsGoal} onChange={e => setSavingsGoal(Number(e.target.value))} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timeframe (Years)</label>
            <input type="number" value={timeframe} onChange={e => setTimeframe(Number(e.target.value))} className="input" />
          </div>
          <button onClick={calculateSavings} className="astro-finance-btn w-full">Calculate Savings Strategy</button>
        </div>
        
        {result && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-green-50 border-l-4 border-green-400 rounded">
              <h2 className="text-xl font-semibold mb-4">Your {result.strategy} Savings Plan</h2>
              <div className="text-2xl font-bold text-green-700 mb-2">
                ₹{result.recommendedSavings.toLocaleString()}/month
              </div>
              <p className="text-neutral-700">Recommended monthly savings amount</p>
            </div>
            
            <div className="p-6 bg-blue-50 border-l-4 border-blue-400 rounded">
              <h3 className="text-lg font-semibold mb-4">Personalized Tips</h3>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-neutral-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 bg-purple-50 border-l-4 border-purple-400 rounded">
              <h3 className="text-lg font-semibold mb-4">Recommended Accounts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.bestAccounts.map((account, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg shadow text-center">
                    <span className="text-purple-700 font-medium">{account}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroFinanceZodiacSavingsCalculator; 