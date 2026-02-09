import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { ArrowLeft, Target, TrendingUp, DollarSign, Calendar, Plus, Trash2 } from 'lucide-react';

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

const DebtStrategies: React.FC = () => {
  const navigate = useNavigate();
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card', balance: 50000, interestRate: 18, minimumPayment: 2000 },
    { id: '2', name: 'Personal Loan', balance: 200000, interestRate: 12, minimumPayment: 5000 },
    { id: '3', name: 'Car Loan', balance: 300000, interestRate: 9, minimumPayment: 8000 }
  ]);
  const [extraPayment, setExtraPayment] = useState<number>(5000);
  const [snowballTotalInterest, setSnowballTotalInterest] = useState<number>(0);
  const [avalancheTotalInterest, setAvalancheTotalInterest] = useState<number>(0);
  const [snowballMonths, setSnowballMonths] = useState<number>(0);
  const [avalancheMonths, setAvalancheMonths] = useState<number>(0);

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: 'New Debt',
      balance: 100000,
      interestRate: 10,
      minimumPayment: 3000
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const calculateDebtStrategy = (strategy: 'snowball' | 'avalanche') => {
    let currentDebts = debts.map(debt => ({ ...debt }));
    let month = 0;
    let totalInterestPaid = 0;

    while (currentDebts.some(debt => debt.balance > 0) && month < 300) {
      month++;
      
      // Calculate interest for all debts
      currentDebts.forEach(debt => {
        if (debt.balance > 0) {
          const monthlyInterest = debt.balance * (debt.interestRate / 12 / 100);
          debt.balance += monthlyInterest;
          totalInterestPaid += monthlyInterest;
        }
      });

      // Determine payment order
      let paymentOrder: Debt[];
      if (strategy === 'snowball') {
        paymentOrder = [...currentDebts].sort((a, b) => a.balance - b.balance);
      } else {
        paymentOrder = [...currentDebts].sort((a, b) => b.interestRate - a.interestRate);
      }

      // Make payments
      let availableExtra = extraPayment;
      paymentOrder.forEach(debt => {
        if (debt.balance > 0) {
          const payment = Math.min(debt.balance, debt.minimumPayment + availableExtra);
          debt.balance = Math.max(0, debt.balance - payment);
          availableExtra = Math.max(0, payment - debt.minimumPayment);
        }
      });

      if (currentDebts.every(debt => debt.balance <= 0)) {
        break;
      }
    }

    if (strategy === 'snowball') {
      setSnowballTotalInterest(totalInterestPaid);
      setSnowballMonths(month);
    } else {
      setAvalancheTotalInterest(totalInterestPaid);
      setAvalancheMonths(month);
    }
  };

  useEffect(() => {
    if (debts.length > 0) {
      calculateDebtStrategy('snowball');
      calculateDebtStrategy('avalanche');
    }
  }, [debts, extraPayment]);

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const interestSaved = snowballTotalInterest - avalancheTotalInterest;
  const timeSaved = snowballMonths - avalancheMonths;

  return (
    <>
      <SEOHelmet
        title="Debt Snowball vs Avalanche Calculator - Debt Payoff Strategies | MoneyCal.in"
        description="Compare debt snowball vs avalanche payoff strategies. See which method saves more money and time. Optimize your debt repayment strategy."
        keywords={['debt snowball', 'debt avalanche', 'debt payoff strategy', 'debt consolidation', 'debt calculator']}
        url="https://moneycal.in/loan-tools/debt-strategies"
        image="https://moneycal.in/images/debt-strategies.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Loan Tools</span>
            </button>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Debt Snowball vs Avalanche</h1>
                <p className="text-gray-600">Compare debt payoff strategies for optimal results</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Debts Management */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Debts</h2>
                  <button
                    onClick={addDebt}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Debt</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={debt.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">Debt {index + 1}</h3>
                        <button
                          onClick={() => removeDebt(debt.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Debt Name
                          </label>
                          <input
                            type="text"
                            value={debt.name}
                            onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Balance (₹)
                          </label>
                          <input
                            type="number"
                            value={debt.balance}
                            onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Interest Rate (% p.a.)
                          </label>
                          <input
                            type="number"
                            value={debt.interestRate}
                            onChange={(e) => updateDebt(debt.id, 'interestRate', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            step="0.1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Minimum Payment (₹)
                          </label>
                          <input
                            type="number"
                            value={debt.minimumPayment}
                            onChange={(e) => updateDebt(debt.id, 'minimumPayment', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Payment */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Extra Payment</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Extra Payment (₹)
                  </label>
                  <input
                    type="number"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter extra payment amount"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Additional amount to pay towards debt each month
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Debt Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Debt:</span>
                    <span className="font-semibold">₹{totalDebt.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Debts:</span>
                    <span className="font-semibold">{debts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Min. Payments:</span>
                    <span className="font-semibold">₹{debts.reduce((sum, debt) => sum + debt.minimumPayment, 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Strategy Comparison */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Snowball Strategy */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Debt Snowball</h3>
                      <p className="text-sm text-gray-600">Pay smallest debts first</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold text-red-600">₹{snowballTotalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time to Payoff:</span>
                      <span className="font-semibold">{Math.floor(snowballMonths / 12)} years {snowballMonths % 12} months</span>
                    </div>
                  </div>
                </div>

                {/* Avalanche Strategy */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Debt Avalanche</h3>
                      <p className="text-sm text-gray-600">Pay highest interest first</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold text-red-600">₹{avalancheTotalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time to Payoff:</span>
                      <span className="font-semibold">{Math.floor(avalancheMonths / 12)} years {avalancheMonths % 12} months</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Summary */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Strategy Comparison</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Interest Saved</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{Math.abs(interestSaved).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {interestSaved > 0 ? 'Avalanche saves more' : 'Snowball saves more'}
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Time Difference</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.abs(timeSaved)} months
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {timeSaved > 0 ? 'Avalanche is faster' : 'Snowball is faster'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strategy Explanation */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategy Explanation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Debt Snowball</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Pay minimum payments on all debts</li>
                      <li>• Put extra money toward smallest debt</li>
                      <li>• Builds momentum and motivation</li>
                      <li>• May cost more in total interest</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">Debt Avalanche</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Pay minimum payments on all debts</li>
                      <li>• Put extra money toward highest interest debt</li>
                      <li>• Saves the most money overall</li>
                      <li>• May take longer to see progress</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DebtStrategies;
