import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const tools = [
  {
    slug: 'budget-tracker',
    title: 'Comprehensive Monthly Budget Tracker',
    description: 'Input income, expenses, and savings goals. Visualize spending with charts. Sync with Google Calendar for reminders.',
    keywords: ['monthly budget tracker India', 'free budget planner online', 'personal budget tool'],
  },
  {
    slug: 'debt-payoff-calculator',
    title: 'Debt Payoff Calculator',
    description: 'Input multiple debts, compare snowball/avalanche methods, and set repayment milestones with notifications.',
    keywords: ['debt payoff calculator India', 'free debt repayment tool', 'credit card payoff planner'],
  },
  {
    slug: 'investment-portfolio-tracker',
    title: 'Investment Portfolio Tracker',
    description: 'Track stocks, mutual funds, SIPs. Calculate returns and sync with Indian exchanges for real-time data.',
    keywords: ['investment portfolio tracker India', 'mutual fund tracker free', 'stock portfolio calculator'],
  },
  {
    slug: 'net-worth-calculator',
    title: 'Net Worth Calculator',
    description: 'Input assets and liabilities to calculate net worth. Track changes over time with a historical graph.',
    keywords: ['net worth calculator India', 'free net worth tracker', 'personal finance net worth tool'],
  },
  {
    slug: 'vacation-budget-planner',
    title: 'Vacation Budget Planner',
    description: 'Plan trip expenses, set a budget, and track spending in real-time. Currency conversion for international trips.',
    keywords: ['vacation budget planner India', 'travel budget calculator free', 'holiday expense tracker'],
  },
  {
    slug: 'subscription-manager',
    title: 'Subscription Manager',
    description: 'List subscriptions, costs, and renewal dates. Get alerts for renewals and price changes.',
    keywords: ['subscription manager India', 'free subscription tracker', 'recurring expense tool'],
  },
  {
    slug: 'savings-goal-tracker',
    title: 'Savings Goal Tracker',
    description: 'Set savings goals, track progress, and export plans to PDF. Link to task management tools for milestones.',
    keywords: ['savings goal tracker India', 'free savings planner', 'financial goal calculator'],
  },
];

const ProductivityTools: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <SEOHelmet
        title="Productivity Tools Suite | Free Budget, Debt, Investment, and Savings Trackers for India"
        description="Explore our suite of productivity-focused financial tools: budget tracker, debt payoff calculator, investment portfolio tracker, net worth calculator, vacation planner, subscription manager, and savings goal tracker. Free, mobile-friendly, and optimized for Indian users."
        keywords={[
          'productivity tools India',
          'budget tracker',
          'debt payoff calculator',
          'investment tracker',
          'net worth calculator',
          'vacation budget planner',
          'subscription manager',
          'savings goal tracker',
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-700">Productivity Tools Suite</h1>
      <p className="text-center text-lg mb-10 text-gray-700 max-w-2xl mx-auto">
        Boost your financial productivity with our free, mobile-friendly tools. Track your budget, pay off debt, manage investments, calculate net worth, plan vacations, manage subscriptions, and set savings goals—all in one place!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tools.map(tool => (
          <div key={tool.slug} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{tool.title}</h2>
              <p className="text-gray-700 mb-4">{tool.description}</p>
            </div>
            <button
              onClick={() => navigate(`/${tool.slug}`)}
              className="mt-4 px-5 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg shadow hover:scale-105 transition-transform"
              aria-label={`Open ${tool.title}`}
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductivityTools; 