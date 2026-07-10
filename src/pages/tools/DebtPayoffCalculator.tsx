import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingDown, Target, Calendar, DollarSign, AlertCircle, CheckCircle, BarChart3, PieChart, Zap, Clock, PiggyBank } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../../components/CalculatorSchema';

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

  const contentData = {
    title: "Debt Payoff Calculator India",
    description: "Compare debt payoff strategies — Snowball vs Avalanche methods. Calculate how much interest you can save, how quickly you can become debt-free, and get a personalized plan to eliminate credit card debt, personal loans, and other liabilities.",
    benefits: [
      "Compare Snowball and Avalanche payoff strategies side-by-side",
      "Calculate total interest savings with extra monthly payments",
      "See exact months to become debt-free under each strategy",
      "Manage multiple debts — credit cards, personal loans, home loans",
      "Get personalized recommendations based on your debt profile"
    ],
    howToSteps: [
      { step: "Add All Your Debts", details: "Enter each debt with its name, type, outstanding balance, interest rate, and minimum monthly payment." },
      { step: "Set Extra Payment Amount", details: "Enter any additional amount you can pay monthly beyond the minimum. Even ₹1,000 extra can save lakhs in interest." },
      { step: "Compare Strategies", details: "See results for Minimum Payments, Debt Snowball (smallest balance first), and Debt Avalanche (highest interest first)." },
      { step: "Choose Your Plan", details: "Pick the strategy that works best — Avalanche saves most money, Snowball gives fastest psychological wins." }
    ],
    examples: [
      {
        scenario: "Credit Card + Personal Loan — Avalanche Method",
        inputs: [
          { label: "Credit Card", value: "₹50,000 at 36% APR" },
          { label: "Personal Loan", value: "₹3,00,000 at 14%" },
          { label: "Extra Payment", value: "₹5,000/month" }
        ],
        result: "Debt-free in 38 months | Save ₹87,000 in interest vs minimum payments",
        explanation: "By targeting the 36% credit card first (Avalanche), you eliminate the most expensive debt fastest. The ₹5,000 extra payment goes to the credit card until it's paid off, then snowballs into the personal loan. Total interest saved vs just paying minimums: ₹87,000."
      }
    ],
    tips: [
      "Even ₹1,000 extra per month can cut years off your debt payoff timeline and save tens of thousands in interest.",
      "Use the Debt Avalanche method (highest interest first) to save the most money mathematically.",
      "If you need motivation, use Debt Snowball (smallest balance first) — quick wins keep you on track.",
      "Once a debt is paid off, redirect its full payment to the next debt — this creates a 'snowball' effect."
    ],
    mistakes: [
      "Paying only minimum payments — this maximizes interest costs and can take 10+ years to clear credit card debt.",
      "Taking a new loan to pay off credit cards without fixing spending habits — you end up with even more debt.",
      "Ignoring high-interest debt while investing — credit card interest (36%) far exceeds investment returns (12%).",
      "Not having an emergency fund — unexpected expenses force you back into debt, undoing all progress."
    ],
    faqs: [
      { question: "What is the Debt Snowball method?", answer: "The Debt Snowball method means paying minimum payments on all debts and putting any extra money toward the smallest balance first. Once that debt is paid off, you roll its payment into the next smallest debt. Popularized by Dave Ramsey, this method provides quick psychological wins that keep you motivated, even though it may cost slightly more in total interest than the Avalanche method." },
      { question: "What is the Debt Avalanche method?", answer: "The Debt Avalanche method means paying minimum payments on all debts and putting any extra money toward the debt with the highest interest rate first. This is mathematically optimal — it minimizes total interest paid and gets you debt-free at the lowest cost. However, it may take longer to see your first debt disappear if your highest-interest debt also has a large balance." },
      { question: "Which debt payoff method is better — Snowball or Avalanche?", answer: "Mathematically, Avalanche always saves more money. But behaviorally, Snowball works better for many people because the quick wins maintain motivation. If your highest-interest debt is also your smallest, both methods are identical! Choose Avalanche if you're disciplined with numbers, choose Snowball if you need early wins to stay motivated." },
      { question: "Should I invest or pay off debt first?", answer: "Compare the interest rates. If your debt charges 15-36% interest (credit cards, personal loans), pay it off first — no investment consistently earns that much. If your debt charges 7-9% (home loan), you could invest in equity while making regular payments, since equity returns 12-15% long-term. Always maintain an emergency fund regardless." },
      { question: "How much extra payment should I make?", answer: "Every rupee helps, but aim for at least 10-20% of your total minimum payments as extra. For example, if your total minimums are ₹10,000/month, try to pay ₹11,000-12,000. Even ₹1,000 extra on a ₹50,000 credit card at 36% APR saves ₹15,000+ in interest and pays it off 18 months earlier." }
    ],
    relatedCalculators: [
      { name: "Loan EMI Calculator", url: "/tools/loan-emi-calculator", description: "Calculate EMI for any loan type." },
      { name: "Personal Loan Calculator", url: "/tools/personal-loan-calculator", description: "Compare personal loan options." },
      { name: "Home Loan Calculator", url: "/tools/home-loan-calculator", description: "Plan your home loan payments." },
      { name: "Credit Score Calculator", url: "/tools/credit-score-calculator", description: "Check how debt affects your credit score." }
    ],
    lastUpdated: "2025-10-25"
  };

  return (
    <>
      <SEOHelmet
        title="Free Debt Payoff Calculator - Snowball vs Avalanche Method | MoneyCal India"
        description="Compare debt payoff strategies using Snowball or Avalanche method. Calculate interest savings, payoff timeline, and get a personalized plan to become debt-free."
        keywords="debt payoff Calculator, debt snowball, debt avalanche, debt consolidation, credit card debt, personal loan, debt management, interest savings"
        canonicalUrl="/tools/debt-payoff-calculator"
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="Debt Payoff Calculator"
        description="Compare Snowball vs Avalanche debt payoff strategies. Calculate interest savings and get a personalized debt-free plan."
        url="/tools/debt-payoff-calculator"
        features={[
          "Snowball vs Avalanche strategy comparison",
          "Multiple debt tracking",
          "Interest savings calculation",
          "Personalized recommendations"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
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
            <CalculatorContentWrapper {...contentData} calculatorId="debt-payoff-calculator" />
        </div>
      </div>
    </>
  );
};

export default DebtPayoffCalculator;
