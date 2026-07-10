import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee, PieChart, TrendingUp, Shield, Clock, Plus, Minus, ArrowRight } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const LiquidFundCalculator: React.FC = () => {
  // States
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [liquidFundReturn, setLiquidFundReturn] = useState<number>(7.0); // Assuming 7%
  const [savingsAccountReturn, setSavingsAccountReturn] = useState<number>(3.5); // Assuming 3.5%
  
  // Results
  const [liquidMaturity, setLiquidMaturity] = useState<number>(0);
  const [savingsMaturity, setSavingsMaturity] = useState<number>(0);
  const [additionalEarnings, setAdditionalEarnings] = useState<number>(0);

  // Constants
  const minAmount = 10000;
  const maxAmount = 10000000;
  const minDays = 7;
  const maxDays = 365;

  const calculateReturns = () => {
    // Simple Interest for short term days
    const liquidEarnings = (investmentAmount * liquidFundReturn * durationDays) / (100 * 365);
    const savingsEarnings = (investmentAmount * savingsAccountReturn * durationDays) / (100 * 365);

    setLiquidMaturity(investmentAmount + liquidEarnings);
    setSavingsMaturity(investmentAmount + savingsEarnings);
    setAdditionalEarnings(liquidEarnings - savingsEarnings);
  };

  useEffect(() => {
    calculateReturns();
  }, [investmentAmount, durationDays, liquidFundReturn, savingsAccountReturn]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title="Liquid Fund vs Savings Account Calculator India 2026 | MoneyCal"
        description="Free online Liquid Fund Calculator for India. Compare liquid mutual fund returns with your bank savings account. See how much extra wealth you can build with idle cash."
        keywords="Liquid fund vs savings account calculator, best liquid fund return calculator 2026, liquid fund post tax return calculator India, liquid fund calculator online, emergency fund calculator"
        url="/calculators/liquid-fund-calculator"
        type="website"
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Liquid Fund <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Calculator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Stop losing money to inflation in a savings account. Calculate your extra earnings by parking idle cash in a Liquid Mutual Fund.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <PieChart className="w-6 h-6 text-blue-500" />
              Investment Details
            </h3>

            <div className="space-y-8">
              {/* Investment Amount */}
              <div>
                <label className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                  <span>Idle Cash to Invest</span>
                  <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{formatCurrency(investmentAmount)}</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg font-bold text-gray-900"
                  />
                </div>
                <input
                  type="range"
                  min={minAmount}
                  max={maxAmount}
                  step={10000}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full mt-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                  <span>Investment Duration</span>
                  <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{durationDays} Days</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold"><Clock className="w-5 h-5"/></span>
                  <input
                    type="number"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg font-bold text-gray-900"
                  />
                </div>
                <input
                  type="range"
                  min={minDays}
                  max={maxDays}
                  step={1}
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full mt-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Liquid Fund Return */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Liquid Fund Return
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.1}
                      value={liquidFundReturn}
                      onChange={(e) => setLiquidFundReturn(Number(e.target.value))}
                      className="w-full pl-4 pr-8 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all text-lg font-bold text-gray-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                  </div>
                </div>

                {/* Savings Return */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Savings A/c Return
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.1}
                      value={savingsAccountReturn}
                      onChange={(e) => setSavingsAccountReturn(Number(e.target.value))}
                      className="w-full pl-4 pr-8 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none transition-all text-lg font-bold text-gray-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-3xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-xl font-medium text-blue-100 mb-2">Extra Wealth Created</h3>
              <div className="text-5xl md:text-6xl font-black mb-8">
                {formatCurrency(additionalEarnings)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-2 text-blue-100 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">Liquid Fund Maturity</span>
                  </div>
                  <div className="text-2xl font-bold">{formatCurrency(liquidMaturity)}</div>
                  <div className="text-sm text-green-300 mt-1">@ {liquidFundReturn}% p.a.</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-2 text-blue-100 mb-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    <span className="font-semibold">Savings A/c Maturity</span>
                  </div>
                  <div className="text-2xl font-bold">{formatCurrency(savingsMaturity)}</div>
                  <div className="text-sm text-red-300 mt-1">@ {savingsAccountReturn}% p.a.</div>
                </div>
              </div>
            </div>

            {/* Information & CTA */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why use a Liquid Fund?</h3>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Better Returns</h4>
                    <p className="text-sm text-gray-600 mt-1">Historically, liquid funds have offered 1-3% higher returns than average savings bank accounts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">High Liquidity</h4>
                    <p className="text-sm text-gray-600 mt-1">Redeem your money in 24 hours. Many funds now offer instant redemption up to ₹50,000.</p>
                  </div>
                </div>
              </div>
              
              <a href="/discover/liquid-fund-calculator-launch" className="inline-flex items-center justify-center w-full bg-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-black transition-colors group">
                Read Complete Guide on Liquid Funds
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>

        {/* SEO Focused Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12 mt-12 prose prose-lg max-w-none prose-blue">
          <h2>Liquid Fund vs Savings Account Calculator: Maximize Your Emergency Fund</h2>
          <p>
            When it comes to parking idle cash or building an emergency fund, most Indians default to a standard savings bank account. However, with the <strong>Liquid Fund Calculator</strong>, you can instantly see the opportunity cost of leaving your money idle. By comparing the returns, our <em>liquid fund vs savings account calculator</em> demonstrates how much extra wealth you can generate.
          </p>
          
          <h3>What is a Liquid Fund?</h3>
          <p>
            A Liquid Fund is a category of debt mutual fund that invests in highly liquid money market instruments like Treasury Bills, Commercial Papers, and Certificates of Deposit with a maturity of up to 91 days. They are known for high safety, stable returns, and high liquidity, making them the best liquid funds for short-term parking of money.
          </p>

          <h3>Liquid Fund Post Tax Return Calculator India</h3>
          <p>
            Starting April 1, 2023, the taxation for debt mutual funds, including liquid funds, was updated. Capital gains from liquid funds are now added to your total income and taxed according to your applicable income tax slab rate, regardless of the holding period. Despite the loss of indexation benefits, liquid funds remain attractive due to their competitive pre-tax yields compared to traditional savings accounts.
          </p>

          <h3>Liquid Fund vs FD Calculator</h3>
          <p>
            While Fixed Deposits (FDs) offer fixed returns, they lock in your money. If you break an FD prematurely, banks levy a penalty (usually 1%). Liquid funds have no such lock-in and usually have zero exit load after 7 days, giving you the flexibility to withdraw your money whenever an emergency strikes.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LiquidFundCalculator;
