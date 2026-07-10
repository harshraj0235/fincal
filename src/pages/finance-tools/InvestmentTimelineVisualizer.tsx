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
  Calendar,
  MapPin, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface TimelineMilestone {
  year: number;
  age: number;
  event: string;
  amount: number;
  type: 'investment' | 'goal' | 'milestone';
  description: string;
  color: string;
}

interface InvestmentGoal {
  name: string;
  targetAmount: number;
  targetYear: number;
  currentAge: number;
  monthlyInvestment: number;
  expectedReturn: number;
  timeline: TimelineMilestone[];
}

const InvestmentTimelineVisualizer: React.FC = () => {
  const [currentAge, setCurrentAge] = useState('25');
  const [retirementAge, setRetirementAge] = useState('60');
  const [monthlyInvestment, setMonthlyInvestment] = useState('10000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [goals, setGoals] = useState<InvestmentGoal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<InvestmentGoal | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const defaultGoals: InvestmentGoal[] = [
    {
      name: 'Emergency Fund',
      targetAmount: 500000,
      targetYear: 2,
      currentAge: 25,
      monthlyInvestment: 20000,
      expectedReturn: 8,
      timeline: []
    },
    {
      name: 'House Down Payment',
      targetAmount: 2000000,
      targetYear: 5,
      currentAge: 25,
      monthlyInvestment: 30000,
      expectedReturn: 10,
      timeline: []
    },
    {
      name: 'Children Education',
      targetAmount: 5000000,
      targetYear: 15,
      currentAge: 25,
      monthlyInvestment: 15000,
      expectedReturn: 12,
      timeline: []
    },
    {
      name: 'Retirement Corpus',
      targetAmount: 50000000,
      targetYear: 35,
      currentAge: 25,
      monthlyInvestment: 25000,
      expectedReturn: 12,
      timeline: []
    }
  ];

  useEffect(() => {
    if (defaultGoals.length > 0) {
      setGoals(defaultGoals);
      calculateTimeline(defaultGoals[0]);
    }
  }, []);

  const calculateTimeline = (goal: InvestmentGoal) => {
    const timeline: TimelineMilestone[] = [];
    const currentAgeNum = parseInt(currentAge);
    const years = goal.targetYear;
    const monthlyAmount = goal.monthlyInvestment;
    const annualReturn = goal.expectedReturn / 100;

    // Calculate milestones every 2 years
    for (let year = 0; year <= years; year += 2) {
      const futureValue = monthlyAmount * 12 * ((Math.pow(1 + annualReturn, year) - 1) / annualReturn);
      const age = currentAgeNum + year;
      
      timeline.push({
        year,
        age,
        event: `${goal.name} - Year ${year}`,
        amount: futureValue,
        type: 'investment',
        description: `Age ${age}: ₹${futureValue.toLocaleString()} accumulated`,
        color: year === 0 ? 'bg-blue-500' : year === years ? 'bg-green-500' : 'bg-yellow-500'
      });
    }

    // Add goal achievement milestone
    timeline.push({
      year: years,
      age: currentAgeNum + years,
      event: `${goal.name} Goal Achieved`,
      amount: goal.targetAmount,
      type: 'goal',
      description: `Target: ₹${goal.targetAmount.toLocaleString()}`,
      color: 'bg-green-600'
    });

    setSelectedGoal({ ...goal, timeline });
    setShowTimeline(true);
  };

  const addCustomGoal = () => {
    const newGoal: InvestmentGoal = {
      name: 'Custom Goal',
      targetAmount: 1000000,
      targetYear: 10,
      currentAge: parseInt(currentAge),
      monthlyInvestment: parseInt(monthlyInvestment),
      expectedReturn: parseFloat(expectedReturn),
      timeline: []
    };
    
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    calculateTimeline(newGoal);
  };

  const resetGoals = () => {
    setGoals(defaultGoals);
    calculateTimeline(defaultGoals[0]);
  };

  return (
    <>
      <SEOHelmet
        title="Investment Timeline Visualizer - Plan Your Financial Journey | MoneyCal"
        description="Visualize your investment journey with our timeline tool. Plan financial goals, track milestones, and see your wealth growth over time with interactive timeline visualization."
        keywords="investment timeline, financial planning, investment milestones, wealth visualization, financial goals, investment journey, retirement planning"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Investment Timeline Visualizer
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Visualize your investment journey and plan your financial milestones. Track your wealth growth, 
                set goals, and see your path to financial freedom with interactive timeline visualization.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-100">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Timeline Planning
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Goal Tracking
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Wealth Visualization
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-purple-600" />
                  Investment Parameters
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Age
                      </label>
                      <input
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        placeholder="25"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retirement Age
                    </label>
                    <input
                      type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                        placeholder="60"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Investment (₹)
                    </label>
                    <input
                      type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                        placeholder="10000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Return (%)
                    </label>
                    <input
                      type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        placeholder="12"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Financial Goals</h3>
                    <div className="space-y-3">
                      {goals.map((goal, index) => (
                        <button
                          key={index}
                          onClick={() => calculateTimeline(goal)}
                          className={`w-full p-3 rounded-lg border transition-colors ${
                            selectedGoal?.name === goal.name
                              ? 'bg-purple-100 border-purple-300 text-purple-900'
                              : 'bg-white border-gray-200 hover:bg-purple-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{goal.name}</span>
                            <span className="text-sm text-gray-600">₹{goal.targetAmount.toLocaleString()}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Target: {goal.targetYear} years | Monthly: ₹{goal.monthlyInvestment.toLocaleString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={addCustomGoal}
                      className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    >
                      Add Custom Goal
                    </button>
                    <button
                      onClick={resetGoals}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset Goals
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Timeline Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-purple-600" />
                  Investment Timeline
                </h2>

                {selectedGoal && showTimeline ? (
                  <div className="space-y-6">
                    {/* Goal Summary */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-purple-800 mb-2">{selectedGoal.name}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-purple-700">Target Amount:</p>
                          <p className="font-bold text-purple-900">₹{selectedGoal.targetAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-purple-700">Time Period:</p>
                          <p className="font-bold text-purple-900">{selectedGoal.targetYear} years</p>
                        </div>
                        <div>
                          <p className="text-purple-700">Monthly Investment:</p>
                          <p className="font-bold text-purple-900">₹{selectedGoal.monthlyInvestment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-purple-700">Expected Return:</p>
                          <p className="font-bold text-purple-900">{selectedGoal.expectedReturn}%</p>
                  </div>
                </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Investment Journey</h4>
                      <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                        
                        {selectedGoal.timeline.map((milestone, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="relative flex items-start mb-6"
                          >
                            {/* Timeline Dot */}
                            <div className={`absolute left-2 w-4 h-4 rounded-full ${milestone.color} border-2 border-white shadow-md`}></div>
                            
                            {/* Content */}
                            <div className="ml-8 bg-gray-50 rounded-lg p-4 flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-semibold text-gray-900">{milestone.event}</h5>
                                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-gray-900">₹{milestone.amount.toLocaleString()}</p>
                                  <p className="text-xs text-gray-500">Age {milestone.age}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Summary */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-800 mb-2">Progress Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-700">Total Investment Period:</p>
                          <p className="font-bold text-green-900">{selectedGoal.targetYear} years</p>
                        </div>
                        <div>
                          <p className="text-green-700">Total Amount Invested:</p>
                          <p className="font-bold text-green-900">₹{(selectedGoal.monthlyInvestment * 12 * selectedGoal.targetYear).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-green-700">Expected Final Value:</p>
                          <p className="font-bold text-green-900">₹{selectedGoal.timeline[selectedGoal.timeline.length - 2]?.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-green-700">Wealth Multiplier:</p>
                          <p className="font-bold text-green-900">{(selectedGoal.timeline[selectedGoal.timeline.length - 2]?.amount / (selectedGoal.monthlyInvestment * 12 * selectedGoal.targetYear)).toFixed(2)}x</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select a financial goal to visualize your investment timeline</p>
                </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Plan Your Financial Journey with Timeline Visualization
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Goal-Based Planning
                  </h3>
                  <p className="text-gray-700">
                    Set specific financial goals and visualize your path to achieving them with interactive timeline tracking.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Wealth Visualization
                  </h3>
                  <p className="text-gray-700">
                    See your wealth grow over time with detailed milestone tracking and progress visualization.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-600" />
                    Time-Based Analysis
                  </h3>
                  <p className="text-gray-700">
                    Understand how time and compound interest work together to build your wealth.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-orange-600" />
                    Progress Tracking
                  </h3>
                  <p className="text-gray-700">
                    Track your progress towards financial goals and stay motivated with visual milestones.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Key Benefits of Timeline Planning
                </h3>
                <div className="space-y-4 text-purple-700">
                  <p>
                    <strong>Visual Motivation:</strong> See your wealth grow over time to stay motivated and committed to your investment plan.
                  </p>
                  <p>
                    <strong>Goal Clarity:</strong> Define specific financial goals with clear timelines and target amounts.
                  </p>
                  <p>
                    <strong>Progress Tracking:</strong> Monitor your progress towards financial milestones and adjust strategies as needed.
                  </p>
                  <p>
                    <strong>Compound Interest Visualization:</strong> Understand how compound interest works over different time periods.
                  </p>
                  <p>
                    <strong>Retirement Planning:</strong> Plan your retirement corpus with realistic timelines and investment amounts.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Start Your Investment Journey Today
                </h3>
                <p className="text-green-700">
                  Use our Investment Timeline Visualizer to plan your financial future, set clear goals, 
                  and track your progress towards financial freedom. Visualize your wealth growth and 
                  stay motivated on your investment journey.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvestmentTimelineVisualizer;
