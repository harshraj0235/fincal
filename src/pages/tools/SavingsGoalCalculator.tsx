import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Target, Calendar, TrendingUp, IndianRupee, AlertCircle, PieChart } from 'lucide-react';

const SavingsGoalCalculator: React.FC = () => {
  const [goal, setGoal] = useState({
    targetAmount: 500000,
    currentAmount: 50000,
    targetDate: '2025-12-31',
    expectedReturn: 8
  });

  const calculateRequiredMonthlyContribution = () => {
    const months = getMonthsBetween(new Date(), new Date(goal.targetDate));
    const futureValue = goal.targetAmount - goal.currentAmount;
    const monthlyRate = goal.expectedReturn / 100 / 12;
    
    if (months > 0 && monthlyRate > 0) {
      return futureValue * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
    }
    return 0;
  };

  const getMonthsBetween = (date1: Date, date2: Date) => {
    const yearDiff = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();
    return yearDiff * 12 + monthDiff;
  };

  const getProjectedValue = () => {
    const months = getMonthsBetween(new Date(), new Date(goal.targetDate));
    const monthlyRate = goal.expectedReturn / 100 / 12;
    const requiredMonthly = calculateRequiredMonthlyContribution();
    
    // Calculate future value of current amount
    const currentFutureValue = goal.currentAmount * Math.pow(1 + monthlyRate, months);
    
    // Calculate future value of monthly contributions
    const contributionFutureValue = requiredMonthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    
    return currentFutureValue + contributionFutureValue;
  };

  const getGoalProgress = () => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const getTimeToGoal = () => {
    const months = getMonthsBetween(new Date(), new Date(goal.targetDate));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  const getAchievabilityStatus = () => {
    const projectedValue = getProjectedValue();
    
    if (projectedValue >= goal.targetAmount * 0.95) {
      return { status: 'Achievable', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (projectedValue >= goal.targetAmount * 0.8) {
      return { status: 'Challenging', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    } else {
      return { status: 'Difficult', color: 'text-red-600', bg: 'bg-red-50' };
    }
  };

  const achievabilityStatus = getAchievabilityStatus();

  const getRecommendations = () => {
    const recommendations = [];
    const projectedValue = getProjectedValue();
    
    if (projectedValue < goal.targetAmount) {
      recommendations.push({
        type: 'warning',
        message: 'Consider increasing your monthly contribution or extending the timeline to reach your goal.'
      });
    }
    
    if (goal.expectedReturn < 6) {
      recommendations.push({
        type: 'info',
        message: 'Consider higher-return investments like equity funds for long-term goals.'
      });
    }
    
    if (getGoalProgress() < 10) {
      recommendations.push({
        type: 'info',
        message: 'Start with a smaller initial amount and gradually increase your contributions.'
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();

  const getYearlyBreakdown = () => {
    const months = getMonthsBetween(new Date(), new Date(goal.targetDate));
    const yearlyBreakdown = [];
    const monthlyRate = goal.expectedReturn / 100 / 12;
    const requiredMonthly = calculateRequiredMonthlyContribution();
    
    let currentValue = goal.currentAmount;
    
    for (let year = 1; year <= Math.ceil(months / 12); year++) {
      const yearStartValue = currentValue;
      
      // Calculate value at end of year
      for (let month = 1; month <= 12 && (year - 1) * 12 + month <= months; month++) {
        currentValue = currentValue * (1 + monthlyRate) + requiredMonthly;
      }
      
      const yearEndValue = currentValue;
      const yearContribution = Math.min(12, months - (year - 1) * 12) * requiredMonthly;
      const yearGrowth = yearEndValue - yearStartValue - yearContribution;
      
      yearlyBreakdown.push({
        year,
        yearStartValue,
        yearContribution,
        yearGrowth,
        yearEndValue
      });
    }
    
    return yearlyBreakdown;
  };

  const yearlyBreakdown = getYearlyBreakdown();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <SEOHelmet
        title="Savings Goal Calculator India - Calculate Monthly Savings Required | MoneyCal India"
        description="Calculate how much you need to save monthly to reach your financial goals. Plan for house purchase, education, retirement, and other major expenses with our savings goal calculator."
        keywords="savings goal Calculator, monthly savings Calculator, financial goal planning, savings target, goal Calculator, savings planner, financial planning calculator"
        canonicalUrl="/tools/savings-goal-calculator"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Savings Goal Calculator India
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate how much you need to save monthly to reach your financial goals. Plan for major expenses like house purchase, education, retirement, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Goal Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-blue-600" />
                  Goal Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={goal.targetAmount}
                      onChange={(e) => setGoal({ ...goal, targetAmount: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter target amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={goal.currentAmount}
                      onChange={(e) => setGoal({ ...goal, currentAmount: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter current amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={goal.targetDate}
                      onChange={(e) => setGoal({ ...goal, targetDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={goal.expectedReturn}
                      onChange={(e) => setGoal({ ...goal, expectedReturn: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter expected return"
                    />
                  </div>
                </div>
              </div>

              {/* Yearly Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-green-600" />
                  Yearly Breakdown
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Start Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Contributions</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Growth</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">End Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyBreakdown.map((item) => (
                        <tr key={item.year} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{item.year}</td>
                          <td className="py-3 px-4 text-right text-gray-900">₹{item.yearStartValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-blue-600">₹{item.yearContribution.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-green-600">₹{item.yearGrowth.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-purple-600 font-semibold">₹{item.yearEndValue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Goal Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <IndianRupee className="w-6 h-6 mr-2 text-purple-600" />
                  Goal Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Target Amount</span>
                    <span className="font-semibold text-blue-600">₹{goal.targetAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Current Amount</span>
                    <span className="font-semibold text-green-600">₹{goal.currentAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Required Monthly</span>
                    <span className="font-semibold text-purple-600">₹{calculateRequiredMonthlyContribution().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-700">Time to Goal</span>
                    <span className="font-semibold text-orange-600">{getTimeToGoal()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                    <span className="text-teal-700">Projected Value</span>
                    <span className="font-semibold text-teal-600">₹{getProjectedValue().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Progress Tracking */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-green-600" />
                  Progress Tracking
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Goal Progress</span>
                      <span className="text-sm text-gray-600">{getGoalProgress().toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${getGoalProgress()}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${achievabilityStatus.bg}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Achievability</span>
                      <span className={`font-semibold ${achievabilityStatus.color}`}>
                        {achievabilityStatus.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                  Key Insights
                </h2>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Total Contributions:</strong> ₹{(calculateRequiredMonthlyContribution() * getMonthsBetween(new Date(), new Date(goal.targetDate))).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Interest Earned:</strong> ₹{(getProjectedValue() - goal.currentAmount - (calculateRequiredMonthlyContribution() * getMonthsBetween(new Date(), new Date(goal.targetDate)))).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Monthly Rate:</strong> {(goal.expectedReturn / 12).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-orange-600" />
                  Recommendations
                </h2>
                
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      rec.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}>
                      <p className={`text-sm ${
                        rec.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                      }`}>
                        {rec.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Savings Goal Planning Guide</h2>
            
            <div className="prose max-w-none">
              <h3>What is a Savings Goal?</h3>
              <p>
                A savings goal is a specific financial target you want to achieve within a certain timeframe. 
                It could be for a house down payment, education expenses, retirement, or any other major financial objective.
              </p>
              
              <h3>Types of Savings Goals</h3>
              <ul>
                <li><strong>Short-term Goals (1-3 years):</strong> Emergency fund, vacation, car purchase</li>
                <li><strong>Medium-term Goals (3-7 years):</strong> House down payment, education expenses</li>
                <li><strong>Long-term Goals (7+ years):</strong> Retirement, children's education, wealth building</li>
              </ul>
              
              <h3>How to Set Realistic Savings Goals</h3>
              <ol>
                <li><strong>Define Your Goal:</strong> Be specific about what you want to achieve</li>
                <li><strong>Set a Timeline:</strong> Determine when you want to achieve the goal</li>
                <li><strong>Calculate the Amount:</strong> Estimate the total amount needed</li>
                <li><strong>Consider Inflation:</strong> Factor in price increases over time</li>
                <li><strong>Plan Monthly Contributions:</strong> Calculate required monthly savings</li>
                <li><strong>Choose Investment Vehicle:</strong> Select appropriate savings/investment options</li>
              </ol>
              
              <h3>Investment Options for Different Goals</h3>
              <ul>
                <li><strong>Short-term Goals:</strong> Fixed deposits, liquid funds, short-term debt funds</li>
                <li><strong>Medium-term Goals:</strong> Balanced funds, hybrid funds, large-cap funds</li>
                <li><strong>Long-term Goals:</strong> Equity funds, index funds, direct equity</li>
              </ul>
              
              <h3>Tips for Achieving Savings Goals</h3>
              <ul>
                <li>Start early to benefit from compound interest</li>
                <li>Automate your savings contributions</li>
                <li>Increase contributions annually</li>
                <li>Review and adjust goals regularly</li>
                <li>Use windfalls (bonuses, tax refunds) for goals</li>
                <li>Cut unnecessary expenses to boost savings</li>
              </ul>
              
              <h3>Common Mistakes to Avoid</h3>
              <ul>
                <li>Setting unrealistic timelines or amounts</li>
                <li>Not considering inflation in calculations</li>
                <li>Choosing inappropriate investment vehicles</li>
                <li>Not reviewing and adjusting goals regularly</li>
                <li>Dipping into goal savings for other expenses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCalculator;
