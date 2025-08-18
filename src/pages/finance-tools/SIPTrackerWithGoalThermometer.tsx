import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  Calculator, 
  DollarSign, 
  PieChart, 
  LineChart, 
  Activity,
  Info,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Thermometer,
  Calendar,
  Plus,
  Minus
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface SIPGoal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  monthlyInvestment: number;
  expectedReturn: number;
  currentAmount: number;
  startDate: string;
  progress: number;
  status: 'on-track' | 'ahead' | 'behind';
  monthlyData: {
    month: string;
    investment: number;
    returns: number;
    totalAmount: number;
    progress: number;
  }[];
}

const SIPTrackerWithGoalThermometer: React.FC = () => {
  const [goals, setGoals] = useState<SIPGoal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<SIPGoal | null>(null);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    monthlyInvestment: '',
    expectedReturn: '12',
    startDate: new Date().toISOString().split('T')[0]
  });

  const defaultGoals: SIPGoal[] = [
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 500000,
      targetDate: '2025-12-31',
      monthlyInvestment: 20000,
      expectedReturn: 8,
      currentAmount: 180000,
      startDate: '2023-01-01',
      progress: 36,
      status: 'on-track',
      monthlyData: generateMonthlyData(20000, 8, 180000, 500000, '2023-01-01', '2025-12-31')
    },
    {
      id: '2',
      name: 'House Down Payment',
      targetAmount: 2000000,
      targetDate: '2027-06-30',
      monthlyInvestment: 30000,
      expectedReturn: 10,
      currentAmount: 450000,
      startDate: '2022-06-01',
      progress: 22.5,
      status: 'ahead',
      monthlyData: generateMonthlyData(30000, 10, 450000, 2000000, '2022-06-01', '2027-06-30')
    },
    {
      id: '3',
      name: 'Children Education',
      targetAmount: 5000000,
      targetDate: '2030-12-31',
      monthlyInvestment: 15000,
      expectedReturn: 12,
      currentAmount: 120000,
      startDate: '2024-01-01',
      progress: 2.4,
      status: 'behind',
      monthlyData: generateMonthlyData(15000, 12, 120000, 5000000, '2024-01-01', '2030-12-31')
    }
  ];

  useEffect(() => {
    setGoals(defaultGoals);
  }, []);

  function generateMonthlyData(
    monthlyInvestment: number,
    expectedReturn: number,
    currentAmount: number,
    targetAmount: number,
    startDate: string,
    targetDate: string
  ) {
    const start = new Date(startDate);
    const target = new Date(targetDate);
    const months = Math.ceil((target.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    const data = [];
    let runningAmount = 0;
    
    for (let i = 1; i <= Math.min(months, 24); i++) {
      const investment = monthlyInvestment;
      const returns = runningAmount * (expectedReturn / 100 / 12);
      runningAmount += investment + returns;
      
      data.push({
        month: `Month ${i}`,
        investment,
        returns,
        totalAmount: runningAmount,
        progress: (runningAmount / targetAmount) * 100
      });
    }
    
    return data;
  }

  const addGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate || !newGoal.monthlyInvestment) {
      alert('Please fill all required fields');
      return;
    }

    const goal: SIPGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      targetDate: newGoal.targetDate,
      monthlyInvestment: parseFloat(newGoal.monthlyInvestment),
      expectedReturn: parseFloat(newGoal.expectedReturn),
      currentAmount: 0,
      startDate: newGoal.startDate,
      progress: 0,
      status: 'on-track',
      monthlyData: generateMonthlyData(
        parseFloat(newGoal.monthlyInvestment),
        parseFloat(newGoal.expectedReturn),
        0,
        parseFloat(newGoal.targetAmount),
        newGoal.startDate,
        newGoal.targetDate
      )
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      targetDate: '',
      monthlyInvestment: '',
      expectedReturn: '12',
      startDate: new Date().toISOString().split('T')[0]
    });
    setShowAddGoal(false);
  };

  const updateGoalProgress = (goalId: string, newAmount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const progress = (newAmount / goal.targetAmount) * 100;
        const status = progress >= 100 ? 'ahead' : progress >= 80 ? 'on-track' : 'behind';
        
        return {
          ...goal,
          currentAmount: newAmount,
          progress,
          status
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    if (selectedGoal?.id === goalId) {
      setSelectedGoal(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ahead': return <TrendingUp className="w-4 h-4" />;
      case 'on-track': return <Target className="w-4 h-4" />;
      case 'behind': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderThermometer = (progress: number) => {
    const height = Math.min(progress, 100);
    const color = progress >= 100 ? 'bg-green-500' : progress >= 80 ? 'bg-blue-500' : progress >= 50 ? 'bg-yellow-500' : 'bg-red-500';
    
    return (
      <div className="relative w-8 h-32 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`absolute bottom-0 w-full ${color} transition-all duration-1000 ease-out`}
          style={{ height: `${height}%` }}
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-300 rounded-full" />
      </div>
    );
  };

  return (
    <>
      <SEOHelmet
        title="SIP Tracker with Goal Thermometer - Track Investment Progress | MoneyCal"
        description="Track your SIP investments with visual goal thermometers. Monitor progress towards financial goals, analyze performance, and stay motivated with interactive progress tracking."
        keywords="SIP tracker, goal thermometer, investment progress, financial goals, SIP monitoring, investment tracking, goal visualization"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                SIP Tracker with Goal Thermometer
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Track your SIP investments with visual goal thermometers. Monitor progress towards 
                financial goals and stay motivated with interactive progress tracking.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-100">
                <div className="flex items-center">
                  <Thermometer className="w-4 h-4 mr-2" />
                  Goal Tracking
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Progress Monitoring
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Analysis
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Goals Overview */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Your Financial Goals</h2>
              <button
                onClick={() => setShowAddGoal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Goal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedGoal(goal)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{goal.name}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                            {getStatusIcon(goal.status)}
                          </span>
                          <span className="text-sm text-gray-600 capitalize">{goal.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderThermometer(goal.progress)}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-semibold">₹{goal.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-semibold">₹{goal.currentAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-semibold text-green-600">{goal.progress.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly SIP:</span>
                        <span className="font-semibold">₹{goal.monthlyInvestment.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            goal.progress >= 100 ? 'bg-green-500' : 
                            goal.progress >= 80 ? 'bg-blue-500' : 
                            goal.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(goal.progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Goal Details Modal */}
        {selectedGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedGoal.name}</h2>
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <AlertCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Amount:</span>
                      <span className="font-semibold">₹{selectedGoal.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Amount:</span>
                      <span className="font-semibold">₹{selectedGoal.currentAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Investment:</span>
                      <span className="font-semibold">₹{selectedGoal.monthlyInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Return:</span>
                      <span className="font-semibold">{selectedGoal.expectedReturn}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Date:</span>
                      <span className="font-semibold">{new Date(selectedGoal.targetDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-semibold">{new Date(selectedGoal.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Update Progress</h4>
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        placeholder="Enter new amount"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        onChange={(e) => updateGoalProgress(selectedGoal.id, parseFloat(e.target.value) || 0)}
                      />
                      <button
                        onClick={() => deleteGoal(selectedGoal.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedGoal.monthlyData.map((data, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{data.month}</span>
                          <span className="text-sm text-gray-600">{data.progress.toFixed(1)}%</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Investment:</span>
                            <span>₹{data.investment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Returns:</span>
                            <span className={data.returns >= 0 ? 'text-green-600' : 'text-red-600'}>
                              ₹{data.returns.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total:</span>
                            <span className="font-semibold">₹{data.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Goal</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    placeholder="e.g., Emergency Fund"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount (₹)</label>
                  <input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    placeholder="500000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Investment (₹)</label>
                  <input
                    type="number"
                    value={newGoal.monthlyInvestment}
                    onChange={(e) => setNewGoal({...newGoal, monthlyInvestment: e.target.value})}
                    placeholder="10000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                  <input
                    type="number"
                    value={newGoal.expectedReturn}
                    onChange={(e) => setNewGoal({...newGoal, expectedReturn: e.target.value})}
                    placeholder="12"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newGoal.startDate}
                    onChange={(e) => setNewGoal({...newGoal, startDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={addGoal}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Add Goal
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Track Your Financial Goals with Visual Progress
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Thermometer className="w-5 h-5 mr-2 text-green-600" />
                    Visual Progress Tracking
                  </h3>
                  <p className="text-gray-700">
                    See your progress towards financial goals with intuitive thermometer visualizations 
                    that make tracking easy and motivating.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Goal Management
                  </h3>
                  <p className="text-gray-700">
                    Set multiple financial goals, track their progress independently, and manage 
                    your investment strategy effectively.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                    Performance Analysis
                  </h3>
                  <p className="text-gray-700">
                    Analyze monthly progress, track returns, and understand how your investments 
                    are performing over time.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-orange-600" />
                    Status Monitoring
                  </h3>
                  <p className="text-gray-700">
                    Monitor goal status (ahead, on-track, behind) and get insights to adjust 
                    your investment strategy as needed.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Benefits of Goal-Based SIP Tracking
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Motivation:</strong> Visual progress tracking keeps you motivated and committed to your financial goals.
                  </p>
                  <p>
                    <strong>Accountability:</strong> Regular monitoring helps you stay accountable and on track with your investments.
                  </p>
                  <p>
                    <strong>Adjustment:</strong> Identify when you need to increase investments or adjust strategies to meet goals.
                  </p>
                  <p>
                    <strong>Celebration:</strong> Celebrate milestones and achievements as you progress towards your financial goals.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Start Tracking Your Goals Today
                </h3>
                <p className="text-blue-700">
                  Use our SIP Tracker with Goal Thermometer to visualize your progress, stay motivated, 
                  and achieve your financial goals. Set up multiple goals, track their progress, and 
                  make informed investment decisions to secure your financial future.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SIPTrackerWithGoalThermometer;