import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, TrendingUp, DollarSign, PiggyBank, BarChart3, AlertCircle, CheckCircle, Zap, Info, Star, Clock, Home, Car, GraduationCap, Heart } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  type: 'short-term' | 'medium-term' | 'long-term';
}

interface GoalAnalysis {
  totalGoals: number;
  totalTargetAmount: number;
  totalCurrentAmount: number;
  totalRemainingAmount: number;
  totalMonthlyContribution: number;
  goals: Array<{
    goal: FinancialGoal;
    monthlyContribution: number;
    monthsToTarget: number;
    isOnTrack: boolean;
    progress: number;
    recommendations: string[];
  }>;
  overallRecommendations: string[];
  priorityBreakdown: Array<{
    priority: string;
    count: number;
    totalAmount: number;
    color: string;
  }>;
  timelineAnalysis: Array<{
    period: string;
    goals: number;
    totalAmount: number;
    description: string;
  }>;
}

const FinancialGoalPlanner: React.FC = () => {
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 200000,
      currentAmount: 50000,
      targetDate: '2025-12-31',
      priority: 'high',
      category: 'emergency',
      type: 'short-term'
    },
    {
      id: '2',
      name: 'Home Purchase',
      targetAmount: 2000000,
      currentAmount: 300000,
      targetDate: '2027-06-30',
      priority: 'high',
      category: 'home',
      type: 'long-term'
    }
  ]);

  const [analysis, setAnalysis] = useState<GoalAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const categories = [
    { id: 'emergency', name: 'Emergency Fund', icon: <AlertCircle className="w-5 h-5" />, color: 'bg-red-500' },
    { id: 'home', name: 'Home Purchase', icon: <Home className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: 'car', name: 'Car Purchase', icon: <Car className="w-5 h-5" />, color: 'bg-green-500' },
    { id: 'education', name: 'Education', icon: <GraduationCap className="w-5 h-5" />, color: 'bg-purple-500' },
    { id: 'wedding', name: 'Wedding', icon: <Heart className="w-5 h-5" />, color: 'bg-pink-500' },
    { id: 'vacation', name: 'Vacation', icon: <Star className="w-5 h-5" />, color: 'bg-yellow-500' },
    { id: 'retirement', name: 'Retirement', icon: <PiggyBank className="w-5 h-5" />, color: 'bg-indigo-500' },
    { id: 'business', name: 'Business', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-orange-500' },
    { id: 'other', name: 'Other', icon: <Target className="w-5 h-5" />, color: 'bg-gray-500' }
  ];

  const addGoal = () => {
    const newGoal: FinancialGoal = {
      id: Date.now().toString(),
      name: '',
      targetAmount: 0,
      currentAmount: 0,
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'medium',
      category: 'other',
      type: 'medium-term'
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id: string, field: keyof FinancialGoal, value: any) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const calculateGoals = () => {
    if (goals.length === 0 || goals.some(goal => !goal.name || goal.targetAmount <= 0)) {
      alert('Please enter valid financial goal information');
      return;
    }

    const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const totalRemainingAmount = totalTargetAmount - totalCurrentAmount;

    // Calculate individual goal analysis
    const goalAnalysis = goals.map(goal => {
      const remainingAmount = goal.targetAmount - goal.currentAmount;
      const targetDate = new Date(goal.targetDate);
      const currentDate = new Date();
      const monthsToTarget = Math.max(1, Math.ceil((targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30)));
      
      const monthlyContribution = remainingAmount / monthsToTarget;
      const progress = (goal.currentAmount / goal.targetAmount) * 100;
      const isOnTrack = monthlyContribution > 0 && monthlyContribution <= (goal.targetAmount * 0.1);

      const recommendations: string[] = [];
      
      if (goal.currentAmount === 0) {
        recommendations.push("Start saving immediately, even small amounts add up over time.");
      }
      
      if (monthlyContribution > goal.targetAmount * 0.2) {
        recommendations.push("Consider extending your target date or reducing the goal amount.");
      }
      
      if (goal.priority === 'high' && monthlyContribution < goal.targetAmount * 0.05) {
        recommendations.push("This is a high-priority goal. Consider increasing your monthly contribution.");
      }
      
      if (progress > 80) {
        recommendations.push("Great progress! You're almost at your goal.");
      }

      if (goal.type === 'short-term' && monthsToTarget > 12) {
        recommendations.push("This is a short-term goal but has a long timeline. Consider if it's realistic.");
      }

      return {
        goal,
        monthlyContribution,
        monthsToTarget,
        isOnTrack,
        progress,
        recommendations
      };
    });

    const totalMonthlyContribution = goalAnalysis.reduce((sum, analysis) => sum + analysis.monthlyContribution, 0);

    // Generate overall recommendations
    const overallRecommendations: string[] = [];
    
    if (totalMonthlyContribution > totalTargetAmount * 0.3) {
      overallRecommendations.push("Your total monthly savings target is quite high. Consider prioritizing your goals.");
    }
    
    if (goals.filter(g => g.priority === 'high').length > 3) {
      overallRecommendations.push("You have many high-priority goals. Consider focusing on 2-3 most important ones first.");
    }
    
    if (totalCurrentAmount / totalTargetAmount < 0.1) {
      overallRecommendations.push("You're just starting your savings journey. Focus on building momentum with smaller, achievable goals.");
    }

    // Priority breakdown
    const priorityBreakdown = [
      {
        priority: 'High Priority',
        count: goals.filter(g => g.priority === 'high').length,
        totalAmount: goals.filter(g => g.priority === 'high').reduce((sum, g) => sum + g.targetAmount, 0),
        color: 'bg-red-500'
      },
      {
        priority: 'Medium Priority',
        count: goals.filter(g => g.priority === 'medium').length,
        totalAmount: goals.filter(g => g.priority === 'medium').reduce((sum, g) => sum + g.targetAmount, 0),
        color: 'bg-yellow-500'
      },
      {
        priority: 'Low Priority',
        count: goals.filter(g => g.priority === 'low').length,
        totalAmount: goals.filter(g => g.priority === 'low').reduce((sum, g) => sum + g.targetAmount, 0),
        color: 'bg-green-500'
      }
    ];

    // Timeline analysis
    const timelineAnalysis = [
      {
        period: 'Short-term (0-2 years)',
        goals: goals.filter(g => g.type === 'short-term').length,
        totalAmount: goals.filter(g => g.type === 'short-term').reduce((sum, g) => sum + g.targetAmount, 0),
        description: 'Goals achievable within 2 years'
      },
      {
        period: 'Medium-term (2-5 years)',
        goals: goals.filter(g => g.type === 'medium-term').length,
        totalAmount: goals.filter(g => g.type === 'medium-term').reduce((sum, g) => sum + g.targetAmount, 0),
        description: 'Goals achievable within 2-5 years'
      },
      {
        period: 'Long-term (5+ years)',
        goals: goals.filter(g => g.type === 'long-term').length,
        totalAmount: goals.filter(g => g.type === 'long-term').reduce((sum, g) => sum + g.targetAmount, 0),
        description: 'Goals achievable in 5+ years'
      }
    ];

    setAnalysis({
      totalGoals: goals.length,
      totalTargetAmount,
      totalCurrentAmount,
      totalRemainingAmount,
      totalMonthlyContribution,
      goals: goalAnalysis,
      overallRecommendations,
      priorityBreakdown,
      timelineAnalysis
    });
    
    setShowResults(true);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || <Target className="w-5 h-5" />;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'short-term': return 'bg-blue-100 text-blue-800';
      case 'medium-term': return 'bg-purple-100 text-purple-800';
      case 'long-term': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resetCalculator = () => {
    setGoals([
      {
        id: '1',
        name: 'Emergency Fund',
        targetAmount: 200000,
        currentAmount: 50000,
        targetDate: '2025-12-31',
        priority: 'high',
        category: 'emergency',
        type: 'short-term'
      },
      {
        id: '2',
        name: 'Home Purchase',
        targetAmount: 2000000,
        currentAmount: 300000,
        targetDate: '2027-06-30',
        priority: 'high',
        category: 'home',
        type: 'long-term'
      }
    ]);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Financial Goal Planner - Plan & Track Your Financial Goals | MoneyCal India"
        description="Plan and track multiple financial goals with our comprehensive goal planner. Set priorities, timelines, and get personalized recommendations to achieve your financial objectives."
        keywords="financial goal planner, goal setting, financial planning, savings goals, goal tracking, financial objectives, money management, personal finance"
        url="/tools/financial-goal-planner"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Financial Goal Planner",
          "description": "Plan and track multiple financial goals with personalized recommendations",
          "url": "/tools/financial-goal-planner",
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
                  Financial Goal Planner
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Plan and track multiple financial goals with personalized timelines, priorities, and recommendations. 
                Turn your financial dreams into achievable, actionable plans.
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
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Financial Goals
              </h2>

              {/* Goals List */}
              <div className="space-y-4 mb-6">
                {goals.map((goal, index) => (
                  <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Goal #{index + 1}</h3>
                      {goals.length > 1 && (
                        <button
                          onClick={() => removeGoal(goal.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                        <input
                          type="text"
                          value={goal.name}
                          onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Emergency Fund, Home Purchase"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={goal.category}
                          onChange={(e) => updateGoal(goal.id, 'category', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount (₹)</label>
                        <input
                          type="number"
                          value={goal.targetAmount}
                          onChange={(e) => updateGoal(goal.id, 'targetAmount', Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter target amount"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Amount (₹)</label>
                        <input
                          type="number"
                          value={goal.currentAmount}
                          onChange={(e) => updateGoal(goal.id, 'currentAmount', Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter current savings"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                        <input
                          type="date"
                          value={goal.targetDate}
                          onChange={(e) => updateGoal(goal.id, 'targetDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <select
                          value={goal.priority}
                          onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon</label>
                        <select
                          value={goal.type}
                          onChange={(e) => updateGoal(goal.id, 'type', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="short-term">Short-term (0-2 years)</option>
                          <option value="medium-term">Medium-term (2-5 years)</option>
                          <option value="long-term">Long-term (5+ years)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Goal Button */}
              <button
                onClick={addGoal}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 mb-6"
              >
                + Add Another Goal
              </button>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={calculateGoals}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Plan My Goals
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
                        <h3 className="text-lg font-semibold text-gray-900">Total Goals</h3>
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">{analysis.totalGoals}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Target</h3>
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.totalTargetAmount.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Saved</h3>
                        <PiggyBank className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-3xl font-bold text-purple-600">₹{analysis.totalCurrentAmount.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Monthly Need</h3>
                        <Calendar className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">₹{analysis.totalMonthlyContribution.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Individual Goals */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                      Goal Analysis
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.goals.map((goalAnalysis, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg ${getCategoryColor(goalAnalysis.goal.category)} text-white mr-3`}>
                                {getCategoryIcon(goalAnalysis.goal.category)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{goalAnalysis.goal.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goalAnalysis.goal.priority)}`}>
                                    {goalAnalysis.goal.priority} priority
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(goalAnalysis.goal.type)}`}>
                                    {goalAnalysis.goal.type}
                                  </span>
                                  {goalAnalysis.isOnTrack ? (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                      On Track
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                      Needs Attention
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-gray-500">Target</p>
                              <p className="font-semibold text-gray-900">₹{goalAnalysis.goal.targetAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Current</p>
                              <p className="font-semibold text-gray-900">₹{goalAnalysis.goal.currentAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Monthly Need</p>
                              <p className="font-semibold text-gray-900">₹{goalAnalysis.monthlyContribution.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Time Left</p>
                              <p className="font-semibold text-gray-900">{goalAnalysis.monthsToTarget} months</p>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{goalAnalysis.progress.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min(100, goalAnalysis.progress)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Recommendations */}
                          {goalAnalysis.recommendations.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Recommendations:</p>
                              <ul className="space-y-1">
                                {goalAnalysis.recommendations.map((rec, recIndex) => (
                                  <li key={recIndex} className="text-sm text-gray-600 flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Priority Breakdown */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3 text-blue-600" />
                      Priority Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.priorityBreakdown.map((priority, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${priority.color} mr-3`}></div>
                            <span className="font-medium text-gray-900">{priority.priority}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{priority.count} goals</p>
                            <p className="text-sm text-gray-500">₹{priority.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Analysis */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Clock className="w-6 h-6 mr-3 text-blue-600" />
                      Timeline Analysis
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.timelineAnalysis.map((timeline, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{timeline.period}</h4>
                            <span className="text-sm text-gray-500">{timeline.goals} goals</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{timeline.description}</p>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{timeline.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overall Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Overall Recommendations
                    </h3>
                    
                    <div className="space-y-3">
                      {analysis.overallRecommendations.map((recommendation, index) => (
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
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Plan Your Financial Goals?</h3>
                  <p className="text-gray-600">
                    Add your financial goals to get a comprehensive plan with timelines, priorities, and personalized recommendations.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Financial Goal Planning Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">SMART Goal Setting</h3>
                <p className="text-gray-600 mb-4">
                  Set Specific, Measurable, Achievable, Relevant, and Time-bound goals for better success rates.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Specific: Define exactly what you want</li>
                  <li>• Measurable: Set clear amounts and deadlines</li>
                  <li>• Achievable: Ensure goals are realistic</li>
                  <li>• Relevant: Align with your priorities</li>
                  <li>• Time-bound: Set specific target dates</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Priority Management</h3>
                <p className="text-gray-600 mb-4">
                  Prioritize your goals to focus on what matters most and avoid spreading yourself too thin.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High Priority: Essential needs and emergencies</li>
                  <li>• Medium Priority: Important wants and future needs</li>
                  <li>• Low Priority: Nice-to-have items and luxuries</li>
                  <li>• Focus on 2-3 goals at a time maximum</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Timeline Planning</h3>
                <p className="text-gray-600 mb-4">
                  Plan your goals across different time horizons for better financial management and achievement.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Short-term: 0-2 years (emergency fund, vacation)</li>
                  <li>• Medium-term: 2-5 years (car, education)</li>
                  <li>• Long-term: 5+ years (home, retirement)</li>
                  <li>• Balance across all time horizons</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FinancialGoalPlanner;
