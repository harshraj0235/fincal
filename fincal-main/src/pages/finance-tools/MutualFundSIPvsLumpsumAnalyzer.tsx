import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Target, TrendingDown } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundSIPvsLumpsumAnalyzer: React.FC = () => {
  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);

  const calculateComparison = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    const lumpsumCorpus = lumpsumAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
    const lumpsumReturns = lumpsumCorpus - lumpsumAmount;
    
    const sipCorpus = monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    const sipTotalInvestment = monthlySIP * totalMonths;
    const sipReturns = sipCorpus - sipTotalInvestment;
    
    return {
      lumpsum: { corpus: lumpsumCorpus, investment: lumpsumAmount, returns: lumpsumReturns },
      sip: { corpus: sipCorpus, totalInvestment: sipTotalInvestment, returns: sipReturns },
      comparison: { sipAdvantage: sipCorpus - lumpsumCorpus, betterOption: sipCorpus > lumpsumCorpus ? 'SIP' : 'Lumpsum' }
    };
  };

  const results = calculateComparison();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund SIP vs Lumpsum Analyzer - Compare Investment Strategies"
        description="Compare Systematic Investment Plan (SIP) vs Lumpsum investment in mutual funds."
        keywords="SIP vs lumpsum, mutual fund investment comparison, systematic investment plan"
        url="/finance-tools/mutual-fund-sip-vs-lumpsum-analyzer"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Link to="/finance-tools" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
              <ArrowRight className="h-4 w-4 rotate-180 mr-1" />
              Back to Finance Tools
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mutual Fund SIP vs Lumpsum Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare SIP vs Lumpsum investment strategies in mutual funds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
              Investment Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lumpsum Amount (₹)</label>
                <input type="number" value={lumpsumAmount} onChange={(e) => setLumpsumAmount(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="100000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
                <input type="number" value={monthlySIP} onChange={(e) => setMonthlySIP(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="10000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                <input type="number" value={investmentPeriod} onChange={(e) => setInvestmentPeriod(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="5" />
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Lumpsum Investment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Final Corpus</h3>
                  <p className="text-2xl font-bold text-green-900">₹{results.lumpsum.corpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Total Returns</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.lumpsum.returns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingDown className="h-6 w-6 mr-2 text-blue-600" />
                SIP Investment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Final Corpus</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.sip.corpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Total Returns</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.sip.returns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Comparison Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">SIP Advantage</h3>
              <p className="text-3xl font-bold text-green-900 mb-2">₹{results.comparison.sipAdvantage.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-green-700">SIP provides better returns in this scenario</p>
            </div>
            <div className={`rounded-lg p-6 ${results.comparison.betterOption === 'SIP' ? 'bg-green-50' : 'bg-blue-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${results.comparison.betterOption === 'SIP' ? 'text-green-900' : 'text-blue-900'}`}>Better Option</h3>
              <p className={`text-3xl font-bold mb-2 ${results.comparison.betterOption === 'SIP' ? 'text-green-900' : 'text-blue-900'}`}>{results.comparison.betterOption}</p>
              <p className={`text-sm ${results.comparison.betterOption === 'SIP' ? 'text-green-700' : 'text-blue-700'}`}>
                {results.comparison.betterOption === 'SIP' ? 'SIP is better for wealth accumulation' : 'Lumpsum is better for immediate investment'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/lumpsum-vs-sip-analyzer" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Lumpsum vs SIP Analyzer</h3>
              <p className="text-sm text-gray-600">Compare lumpsum vs systematic investment</p>
            </Link>
            <Link to="/finance-tools/sip-step-up-planner" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">SIP Step-up Planner</h3>
              <p className="text-sm text-gray-600">Plan systematic increases in SIP amount</p>
            </Link>
            <Link to="/finance-tools" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">All Finance Tools</h3>
              <p className="text-sm text-gray-600">Explore our complete collection</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MutualFundSIPvsLumpsumAnalyzer;
