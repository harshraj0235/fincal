import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingDown, Target, Calendar, DollarSign, AlertCircle, CheckCircle, BarChart3, PieChart, Zap, Clock, PiggyBank } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  type: 'credit-card' | 'personal-loan' | 'home-loan' | 'car-loan' | 'other';
}

interface PayoffStrategy {
  name: string;
  description: string;
  totalInterest: number;
  totalPayments: number;
  monthsToPayoff: number;
  monthlyPayment: number;
  savings: number;
  color: string;
  icon: React.ReactNode;
}

interface DebtAnalysis {
  totalDebt: number;
  totalMonthlyPayments: number;
  averageInterestRate: number;
  strategies: PayoffStrategy[];
  recommendations: string[];
  debtBreakdown: Array<{
    debt: Debt;
    percentage: number;
    color: string;
  }>;
}

const DebtPayoffCalculator: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: '1',
      name: 'Credit Card',
      balance: 50000,
      interestRate: 18,
      minimumPayment: 2500,
      type: 'credit-card'
    }
  ]);
  const [extraPayment, setExtraPayment] = useState(0);
  const [analysis, setAnalysis] = useState<DebtAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: '',
      balance: 0,
      interestRate: 0,
      minimumPayment: 0,
      type: 'credit-card'
    };
    setDebts([...debts, newDebt]);
  };

  const updateDebt = (id: string, field: keyof Debt, value: any) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const calculatePayoff = () => {
    if (debts.length === 0 || debts.some(debt => !debt.name || debt.balance <= 0)) {
      alert('Please enter valid debt information');
      return;
    }

    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalMonthlyPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
    const averageInterestRate = debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length;

    // Calculate different payoff strategies
    const strategies: PayoffStrategy[] = [
      {
        name: 'Minimum Payments',
        description: 'Pay only minimum payments on all debts',
        totalInterest: calculateTotalInterest(debts, 0, 'minimum'),
        totalPayments: totalDebt + calculateTotalInterest(debts, 0, 'minimum'),
        monthsToPayoff: calculateMonthsToPayoff(debts, 0, 'minimum'),
        monthlyPayment: totalMonthlyPayments,
        savings: 0,
        color: 'bg-red-500',
        icon: <AlertCircle className="w-5 h-5" />
      },
      {
        name: 'Debt Snowball',
        description: 'Pay minimums on all debts, extra on smallest balance',
        totalInterest: calculateTotalInterest(debts, extraPayment, 'snowball'),
        totalPayments: totalDebt + calculateTotalInterest(debts, extraPayment, 'snowball'),
        monthsToPayoff: calculateMonthsToPayoff(debts, extraPayment, 'snowball'),
        monthlyPayment: totalMonthlyPayments + extraPayment,
        savings: calculateTotalInterest(debts, 0, 'minimum') - calculateTotalInterest(debts, extraPayment, 'snowball'),
        color: 'bg-blue-500',
        icon: <TrendingDown className="w-5 h-5" />
      },
      {
        name: 'Debt Avalanche',
        description: 'Pay minimums on all debts, extra on highest interest rate',
        totalInterest: calculateTotalInterest(debts, extraPayment, 'avalanche'),
        totalPayments: totalDebt + calculateTotalInterest(debts, extraPayment, 'avalanche'),
        monthsToPayoff: calculateMonthsToPayoff(debts, extraPayment, 'avalanche'),
        monthlyPayment: totalMonthlyPayments + extraPayment,
        savings: calculateTotalInterest(debts, 0, 'minimum') - calculateTotalInterest(debts, extraPayment, 'avalanche'),
        color: 'bg-green-500',
        icon: <Target className="w-5 h-5" />
      }
    ];

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (averageInterestRate > 15) {
      recommendations.push("Your average interest rate is high. Consider debt consolidation or balance transfers.");
    }
    
    if (totalDebt > 100000) {
      recommendations.push("You have significant debt. Consider professional debt counseling services.");
    }
    
    if (extraPayment > 0) {
      recommendations.push("Great job on making extra payments! This will significantly reduce your total interest.");
    } else {
      recommendations.push("Consider making extra payments to reduce your total interest and payoff time.");
    }
    
    if (strategies[2].savings > strategies[1].savings) {
      recommendations.push("Debt Avalanche method will save you more money in interest than Debt Snowball.");
    } else {
      recommendations.push("Debt Snowball method provides psychological benefits by eliminating smaller debts first.");
    }

    // Debt breakdown for pie chart
    const debtBreakdown = debts.map(debt => ({
      debt,
      percentage: (debt.balance / totalDebt) * 100,
      color: getDebtColor(debt.type)
    }));

    setAnalysis({
      totalDebt,
      totalMonthlyPayments,
      averageInterestRate,
      strategies,
      recommendations,
      debtBreakdown
    });
    
    setShowResults(true);
  };

  const calculateTotalInterest = (debts: Debt[], extraPayment: number, method: string): number => {
    // Simplified calculation - in reality, this would be more complex
    let totalInterest = 0;
    
    debts.forEach(debt => {
      const monthlyRate = debt.interestRate / 100 / 12;
      let balance = debt.balance;
      let monthlyPayment = debt.minimumPayment;
      
      if (method === 'snowball' && extraPayment > 0) {
        // Add extra payment to smallest debt
        const smallestDebt = debts.reduce((min, d) => d.balance < min.balance ? d : min);
        if (debt.id === smallestDebt.id) {
          monthlyPayment += extraPayment;
        }
      } else if (method === 'avalanche' && extraPayment > 0) {
        // Add extra payment to highest interest debt
        const highestInterestDebt = debts.reduce((max, d) => d.interestRate > max.interestRate ? d : max);
        if (debt.id === highestInterestDebt.id) {
          monthlyPayment += extraPayment;
        }
      }
      
      let months = 0;
      while (balance > 0 && months < 600) { // Max 50 years
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
        balance -= principalPayment;
        totalInterest += interestPayment;
        months++;
      }
    });
    
    return totalInterest;
  };

  const calculateMonthsToPayoff = (debts: Debt[], extraPayment: number, method: string): number => {
    // Simplified calculation
    let maxMonths = 0;
    
    debts.forEach(debt => {
      const monthlyRate = debt.interestRate / 100 / 12;
      let balance = debt.balance;
      let monthlyPayment = debt.minimumPayment;
      
      if (method === 'snowball' && extraPayment > 0) {
        const smallestDebt = debts.reduce((min, d) => d.balance < min.balance ? d : min);
        if (debt.id === smallestDebt.id) {
          monthlyPayment += extraPayment;
        }
      } else if (method === 'avalanche' && extraPayment > 0) {
        const highestInterestDebt = debts.reduce((max, d) => d.interestRate > max.interestRate ? d : max);
        if (debt.id === highestInterestDebt.id) {
          monthlyPayment += extraPayment;
        }
      }
      
      let months = 0;
      while (balance > 0 && months < 600) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
        balance -= principalPayment;
        months++;
      }
      
      maxMonths = Math.max(maxMonths, months);
    });
    
    return maxMonths;
  };

  const getDebtColor = (type: string) => {
    switch (type) {
      case 'credit-card': return 'bg-red-500';
      case 'personal-loan': return 'bg-blue-500';
      case 'home-loan': return 'bg-green-500';
      case 'car-loan': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getDebtIcon = (type: string) => {
    switch (type) {
      case 'credit-card': return <CreditCard className="w-5 h-5" />;
      case 'personal-loan': return <DollarSign className="w-5 h-5" />;
      case 'home-loan': return <PiggyBank className="w-5 h-5" />;
      case 'car-loan': return <Target className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const resetCalculator = () => {
    setDebts([{
      id: '1',
      name: 'Credit Card',
      balance: 50000,
      interestRate: 18,
      minimumPayment: 2500,
      type: 'credit-card'
    }]);
    setExtraPayment(0);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Debt Payoff Calculator - Snowball vs Avalanche Method | MoneyCal India"
        description="Calculate the best debt payoff strategy using snowball or avalanche method. Compare different approaches and save money on interest payments with our comprehensive debt calculator."
        keywords="debt payoff calculator, debt snowball, debt avalanche, debt consolidation, credit card debt, personal loan, debt management, interest savings"
        url="/tools/debt-payoff-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Debt Payoff Calculator",
          "description": "Calculate the best debt payoff strategy and save money on interest",
          "url": "https://moneycal.in/tools/debt-payoff-calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Debt Payoff Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare debt payoff strategies using Snowball vs Avalanche methods. 
                Find the best approach to eliminate your debt and save money on interest.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                Debt Information
              </h2>

              {/* Debts List */}
              <div className="space-y-4 mb-6">
                {debts.map((debt, index) => (
                  <div key={debt.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Debt #{index + 1}</h3>
                      {debts.length > 1 && (
                        <button
                          onClick={() => removeDebt(debt.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Debt Name</label>
                        <input
                          type="text"
                          value={debt.name}
                          onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Credit Card, Personal Loan"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Debt Type</label>
                        <select
                          value={debt.type}
                          onChange={(e) => updateDebt(debt.id, 'type', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="credit-card">Credit Card</option>
                          <option value="personal-loan">Personal Loan</option>
                          <option value="home-loan">Home Loan</option>
                          <option value="car-loan">Car Loan</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Balance (₹)</label>
                        <input
                          type="number"
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter current balance"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={debt.interestRate}
                          onChange={(e) => updateDebt(debt.id, 'interestRate', Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter annual interest rate"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Payment (₹)</label>
                        <input
                          type="number"
                          value={debt.minimumPayment}
                          onChange={(e) => updateDebt(debt.id, 'minimumPayment', Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter minimum payment"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Debt Button */}
              <button
                onClick={addDebt}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 mb-6"
              >
                + Add Another Debt
              </button>

              {/* Extra Payment */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Monthly Payment (₹)
                </label>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter extra amount you can pay monthly"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Additional amount you can pay towards debt each month
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={calculatePayoff}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Calculate Payoff Strategy
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {showResults && analysis && (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Debt</h3>
                        <CreditCard className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-600">₹{analysis.totalDebt.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Monthly Payments</h3>
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.totalMonthlyPayments.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Avg Interest Rate</h3>
                        <TrendingDown className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{analysis.averageInterestRate.toFixed(1)}%</p>
                    </div>
                  </div>

                  {/* Payoff Strategies Comparison */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                      Payoff Strategy Comparison
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.strategies.map((strategy, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg ${strategy.color} text-white mr-3`}>
                                {strategy.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{strategy.name}</h4>
                                <p className="text-sm text-gray-600">{strategy.description}</p>
                              </div>
                            </div>
                            {strategy.savings > 0 && (
                              <div className="text-right">
                                <p className="text-sm font-semibold text-green-600">Save ₹{strategy.savings.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">vs minimum payments</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Total Interest</p>
                              <p className="font-semibold text-gray-900">₹{strategy.totalInterest.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total Payments</p>
                              <p className="font-semibold text-gray-900">₹{strategy.totalPayments.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Time to Payoff</p>
                              <p className="font-semibold text-gray-900">{strategy.monthsToPayoff} months</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Monthly Payment</p>
                              <p className="font-semibold text-gray-900">₹{strategy.monthlyPayment.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Debt Breakdown */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Debt Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.debtBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${item.color} text-white mr-3`}>
                              {getDebtIcon(item.debt.type)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.debt.name}</p>
                              <p className="text-sm text-gray-600">{item.debt.interestRate}% interest</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{item.debt.balance.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{item.percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Personalized Recommendations
                    </h3>
                    
                    <div className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!showResults && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Plan Your Debt Payoff?</h3>
                  <p className="text-gray-600">
                    Enter your debt information to compare different payoff strategies and find the best approach to eliminate your debt.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Educational Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Debt Payoff Strategies Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Debt Snowball Method</h3>
                <p className="text-gray-600 mb-4">
                  Pay minimums on all debts, then put extra money toward the smallest balance first.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Provides psychological motivation</li>
                  <li>• Quick wins with small debts</li>
                  <li>• May pay more interest overall</li>
                  <li>• Good for motivation-focused people</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Debt Avalanche Method</h3>
                <p className="text-gray-600 mb-4">
                  Pay minimums on all debts, then put extra money toward the highest interest rate first.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Saves the most money on interest</li>
                  <li>• Mathematically optimal approach</li>
                  <li>• May take longer to see progress</li>
                  <li>• Good for logic-focused people</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Debt Consolidation</h3>
                <p className="text-gray-600 mb-4">
                  Combine multiple debts into a single loan with a lower interest rate.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Simplifies payment management</li>
                  <li>• May reduce interest rates</li>
                  <li>• Requires good credit score</li>
                  <li>• Watch out for fees and terms</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DebtPayoffCalculator;
