import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Calculator, TrendingUp, DollarSign,
  CheckCircle, XCircle, AlertTriangle, Lightbulb, Target,
  FileText, Award, Shield, Zap, BookOpen, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const IncomeTaxBasics: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState(800000);
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [deductions80C, setDeductions80C] = useState(150000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);

  // Calculate tax for Old Regime
  const calculateOldRegimeTax = () => {
    const taxableIncome = annualIncome - deductions80C - homeLoanInterest - 50000; // 50K standard deduction
    let tax = 0;
    
    if (taxableIncome <= 250000) tax = 0;
    else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20;
    else tax = 112500 + (taxableIncome - 1000000) * 0.30;
    
    // Add 4% cess
    return tax * 1.04;
  };

  // Calculate tax for New Regime
  const calculateNewRegimeTax = () => {
    const taxableIncome = annualIncome - 50000; // Only 50K standard deduction
    let tax = 0;
    
    if (taxableIncome <= 300000) tax = 0;
    else if (taxableIncome <= 700000) tax = (taxableIncome - 300000) * 0.05;
    else if (taxableIncome <= 1000000) tax = 20000 + (taxableIncome - 700000) * 0.10;
    else if (taxableIncome <= 1200000) tax = 50000 + (taxableIncome - 1000000) * 0.15;
    else if (taxableIncome <= 1500000) tax = 80000 + (taxableIncome - 1200000) * 0.20;
    else tax = 140000 + (taxableIncome - 1500000) * 0.30;
    
    // Add 4% cess
    return tax * 1.04;
  };

  const oldRegimeTax = calculateOldRegimeTax();
  const newRegimeTax = calculateNewRegimeTax();
  const savings = regime === 'old' && oldRegimeTax < newRegimeTax ? newRegimeTax - oldRegimeTax : 
                  regime === 'new' && newRegimeTax < oldRegimeTax ? oldRegimeTax - newRegimeTax : 0;

  return (
    <>
      <SEOHelmet 
        title="Income Tax Basics India: Tax Slabs, Old vs New Regime 2025 | MoneyCal Learn" 
        description="Complete income tax guide in Hindi & English. Tax slabs FY 2024-25, old regime vs new regime Calculator, which is better for you, deductions explained." 
        keywords="income tax India, tax slabs 2025, old vs new regime, income tax Calculator, 80C deductions, आयकर स्लैब, tax planning India" 
        url="/learn/taxation-compliance/income-tax-basics-india-slabs-old-vs-new-regime-2025" 
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Taxation & Compliance</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 1 of 7</span>
                <Link 
                  to="/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  Lesson 1 • 60 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Income Tax Basics: Slabs & Regimes
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  आयकर की बुनियादी बातें - 2025 गाइड
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Understand tax slabs for FY 2024-25 (Old vs New Regime)',
                  'Calculate your tax liability using interactive calculator',
                  'Choose the RIGHT regime for your situation (save ₹20K-50K annually)',
                  'Learn all deductions under Section 80C, 80D, HRA, etc.',
                  'File ITR correctly and claim refunds',
                  'Avoid common mistakes that trigger notices from Income Tax Department'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Interactive Tax Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <IndianRupee className="w-8 h-8 text-blue-600" />
              🧮 Old vs New Regime Tax Calculator
            </h2>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Annual Income (₹):</label>
                  <input 
                    type="number" 
                    value={annualIncome} 
                    onChange={(e) => setAnnualIncome(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg font-semibold"
                    min="0"
                    step="10000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">80C Deductions (₹):</label>
                  <input 
                    type="number" 
                    value={deductions80C} 
                    onChange={(e) => setDeductions80C(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg font-semibold"
                    min="0"
                    max="150000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Home Loan Interest (80EEA):</label>
                  <input 
                    type="number" 
                    value={homeLoanInterest} 
                    onChange={(e) => setHomeLoanInterest(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg font-semibold"
                    min="0"
                    max="200000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => setRegime('old')}
                  className={`px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                    regime === 'old'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-blue-300'
                  }`}
                >
                  Old Regime
                </button>
                <button
                  onClick={() => setRegime('new')}
                  className={`px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                    regime === 'new'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-green-300'
                  }`}
                >
                  New Regime
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Tax Liability:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Old Regime Tax</div>
                    <div className="text-2xl font-bold text-blue-700">₹{oldRegimeTax.toFixed(0).toLocaleString()}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">New Regime Tax</div>
                    <div className="text-2xl font-bold text-green-700">₹{newRegimeTax.toFixed(0).toLocaleString()}</div>
                  </div>
                  <div className={`rounded-lg p-4 ${oldRegimeTax < newRegimeTax ? 'bg-blue-100' : 'bg-green-100'}`}>
                    <div className="text-sm text-gray-600 mb-1">Better Choice</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {oldRegimeTax < newRegimeTax ? 'OLD' : 'NEW'}
                    </div>
                    <div className="text-sm text-gray-600">Save ₹{Math.abs(oldRegimeTax - newRegimeTax).toFixed(0).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Detailed Tax Slabs Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg overflow-x-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📊 Tax Slabs FY 2024-25 (Complete Breakdown)
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-blue-400 rounded-xl p-6 bg-blue-50">
                <h3 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Old Regime (पुराना नियम)
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">₹0 - ₹2.5 Lakh</span>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold">0%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">No tax (Tax-free income)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">₹2.5L - ₹5 Lakh</span>
                      <span className="bg-yellow-600 text-white px-3 py-1 rounded-full font-bold">5%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Tax: ₹12,500 max in this slab</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">₹5L - ₹10 Lakh</span>
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full font-bold">20%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Tax: ₹1,00,000 max in this slab</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Above ₹10 Lakh</span>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold">30%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Highest tax bracket</p>
                  </div>
                </div>

                <div className="mt-4 bg-green-100 rounded-lg p-4">
                  <strong className="text-green-900 block mb-2">✅ Deductions Allowed:</strong>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Section 80C: ₹1.5L (PPF, ELSS, Insurance)</li>
                    <li>• Section 80D: ₹25K-50K (Health Insurance)</li>
                    <li>• HRA: Rent paid exemption</li>
                    <li>• Home Loan Interest: ₹2L (self-occupied)</li>
                    <li>• Standard Deduction: ₹50K</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-green-400 rounded-xl p-6 bg-green-50">
                <h3 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  New Regime (नया नियम)
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">₹0 - ₹3 Lakh</span>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold">0%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">No tax (₹50K higher than old!)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">₹3L - ₹7 Lakh</span>
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full font-bold">5%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Tax: ₹20,000 max in this slab</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">₹7L - ₹10 Lakh</span>
                      <span className="bg-yellow-600 text-white px-3 py-1 rounded-full font-bold">10%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Tax: ₹30,000 max in this slab</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">₹10L - ₹12 Lakh</span>
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold">15%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Tax: ₹30,000 max in this slab</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">₹12L - ₹15 Lakh</span>
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full font-bold">20%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Tax: ₹60,000 max in this slab</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Above ₹15 Lakh</span>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold">30%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Highest tax bracket</p>
                  </div>
                </div>

                <div className="mt-4 bg-red-100 rounded-lg p-4">
                  <strong className="text-red-900 block mb-2">❌ Deductions NOT Allowed:</strong>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• NO Section 80C deductions</li>
                    <li>• NO HRA exemption</li>
                    <li>• NO Home Loan interest</li>
                    <li>• ONLY ₹50K standard deduction</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Real Examples */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💡 Real Indian Examples (Which Regime to Choose?)
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <strong className="text-lg text-green-900">Example 1: Priya (Software Engineer, ₹8L Salary)</strong>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Income:</strong> ₹8,00,000/year</p>
                  <p><strong>Investments:</strong> ₹1.5L in PPF + ELSS (80C), ₹25K health insurance (80D)</p>
                  <p><strong>Renting:</strong> Yes (₹20K/month = ₹2.4L/year rent)</p>
                  
                  <div className="bg-white rounded-lg p-4 mt-3">
                    <strong className="block mb-2">Tax Calculation:</strong>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold mb-1">Old Regime:</p>
                        <p className="text-xs">Taxable: ₹8L - ₹1.5L (80C) - ₹1L (HRA) - ₹50K = ₹5L</p>
                        <p className="text-xs">Tax: ₹12,500 (5% on ₹2.5L above exemption)</p>
                        <p className="font-bold text-blue-700">Total Tax: ₹13,000 (with cess)</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">New Regime:</p>
                        <p className="text-xs">Taxable: ₹8L - ₹50K = ₹7.5L</p>
                        <p className="text-xs">Tax: ₹20K (5% on ₹4L) + ₹5K (10% on ₹50K)</p>
                        <p className="font-bold text-green-700">Total Tax: ₹26,000 (with cess)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 rounded-lg p-4">
                    <strong className="text-blue-900">✅ Verdict: OLD REGIME</strong>
                    <p className="text-sm text-blue-800 mt-1">Saves ₹13,000/year because she invests ₹1.5L + pays rent (HRA benefit)</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                  <strong className="text-lg text-yellow-900">Example 2: Rahul (Marketing Manager, ₹12L Salary)</strong>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Income:</strong> ₹12,00,000/year</p>
                  <p><strong>Investments:</strong> Apenas ₹50K in mutual funds (doesn't max out 80C)</p>
                  <p><strong>Living:</strong> Own house (no rent, no home loan)</p>
                  
                  <div className="bg-white rounded-lg p-4 mt-3">
                    <strong className="block mb-2">Tax Calculation:</strong>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold mb-1">Old Regime:</p>
                        <p className="text-xs">Taxable: ₹12L - ₹50K (80C) - ₹50K (std) = ₹11L</p>
                        <p className="text-xs">Tax: ₹12.5K + ₹1L + ₹30K = ₹1,42,500</p>
                        <p className="font-bold text-blue-700">Total Tax: ₹1,48,200 (with cess)</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">New Regime:</p>
                        <p className="text-xs">Taxable: ₹12L - ₹50K = ₹11.5L</p>
                        <p className="text-xs">Tax: ₹20K + ₹30K + ₹30K + ₹45K = ₹1,25,000</p>
                        <p className="font-bold text-green-700">Total Tax: ₹1,30,000 (with cess)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-100 rounded-lg p-4">
                    <strong className="text-green-900">✅ Verdict: NEW REGIME</strong>
                    <p className="text-sm text-green-800 mt-1">Saves ₹18,200/year because he doesn't invest much anyway (no 80C, no HRA)</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                  <strong className="text-lg text-purple-900">Example 3: Sunil (Self-Employed, ₹15L Income)</strong>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Income:</strong> ₹15,00,000/year (business)</p>
                  <p><strong>Investments:</strong> ₹1.5L (80C) + ₹2L home loan interest + ₹50K health insurance (80D)</p>
                  <p><strong>Tax-Saving:</strong> Maximizes all deductions</p>
                  
                  <div className="bg-white rounded-lg p-4 mt-3">
                    <strong className="block mb-2">Tax Calculation:</strong>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold mb-1">Old Regime:</p>
                        <p className="text-xs">Taxable: ₹15L - ₹1.5L - ₹2L - ₹50K - ₹50K = ₹11L</p>
                        <p className="text-xs">Tax: ₹12.5K + ₹1L + ₹30K = ₹1,42,500</p>
                        <p className="font-bold text-blue-700">Total Tax: ₹1,48,200 (with cess)</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">New Regime:</p>
                        <p className="text-xs">Taxable: ₹15L - ₹50K = ₹14.5L</p>
                        <p className="text-xs">Tax: ₹20K + ₹30K + ₹30K + ₹60K + ₹1.05L = ₹2,65,000</p>
                        <p className="font-bold text-red-700">Total Tax: ₹2,75,600 (with cess)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 rounded-lg p-4">
                    <strong className="text-blue-900">✅ Verdict: OLD REGIME (Clear Winner!)</strong>
                    <p className="text-sm text-blue-800 mt-1">
                      Saves ₹1,27,400/year by using all deductions! For high earners with investments + home loan, 
                      old regime is ALWAYS better.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Quick Decision Tree */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🌳 Which Regime Should YOU Choose? (Decision Tree)
            </h2>

            <div className="space-y-4">
              {[
                {
                  situation: 'I invest ₹1.5L/year in PPF/ELSS/LIC + pay rent',
                  regime: 'OLD REGIME',
                  reason: 'You can claim 80C (₹1.5L) + HRA exemption. Tax savings will be ₹30K-70K depending on income.',
                  color: 'blue'
                },
                {
                  situation: 'I have home loan (paying ₹1-2L interest/year)',
                  regime: 'OLD REGIME',
                  reason: 'Home loan interest is deductible up to ₹2L in old regime. Saves ₹40K-60K tax.',
                  color: 'blue'
                },
                {
                  situation: `My income is < ₹7L and I don't invest much`,
                  regime: 'NEW REGIME',
                  reason: 'New regime has higher exemption limit (₹3L vs ₹2.5L). Lower tax rates in ₹3-7L bracket.',
                  color: 'green'
                },
                {
                  situation: 'I want simple filing (no paperwork for investments)',
                  regime: 'NEW REGIME',
                  reason: 'No need to submit proofs for 80C, HRA, etc. Just file based on income. Simpler.',
                  color: 'green'
                },
                {
                  situation: 'My company provides HRA + I claim LTA/medical',
                  regime: 'OLD REGIME',
                  reason: `All these exemptions available in old regime. New regime doesn't allow them.`,
                  color: 'blue'
                },
                {
                  situation: `I'm freelancer/self-employed with few expenses`,
                  regime: 'NEW REGIME',
                  reason: `If not investing in 80C or paying home loan interest, new regime's lower rates are better.`,
                  color: 'green'
                }
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-6 border-l-4 ${
                  item.color === 'blue' ? 'bg-blue-50 border-blue-500' : 'bg-green-50 border-green-500'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <strong className="text-lg text-gray-900">{item.situation}</strong>
                    <span className={`px-4 py-2 rounded-full font-bold text-white ${
                      item.color === 'blue' ? 'bg-blue-600' : 'bg-green-600'
                    }`}>
                      {item.regime}
                    </span>
                  </div>
                  <p className="text-gray-700"><strong>Why:</strong> {item.reason}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 80C Deductions Explained */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💰 Section 80C: ₹1.5 Lakh Tax-Saving Investments
            </h2>

            <p className="text-gray-700 mb-6">
              <strong>Section 80C</strong> allows you to claim deduction up to <strong>₹1,50,000</strong> on specific investments. 
              This reduces your taxable income, saving ₹15,000-45,000 in tax depending on your bracket.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: 'PPF (Public Provident Fund)',
                  nameHindi: 'पीपीएफ',
                  returns: '7.1% tax-free',
                  lock: '15 years',
                  maxLimit: '₹1.5L/year',
                  pros: 'Safest, government-backed, tax-free returns',
                  cons: 'Long lock-in, lower returns than equity',
                  verdict: 'Best for conservative investors'
                },
                {
                  name: 'ELSS (Equity Mutual Funds)',
                  nameHindi: 'ईएलएसएस',
                  returns: '12-15% (market-linked)',
                  lock: '3 years (shortest!)',
                  maxLimit: '₹1.5L/year',
                  pros: 'Highest returns, shortest lock-in, wealth creation',
                  cons: 'Market risk, can give negative returns',
                  verdict: 'Best for young investors (age 25-40)'
                },
                {
                  name: 'Life Insurance Premium',
                  nameHindi: 'जीवन बीमा प्रीमियम',
                  returns: 'Protection (not investment)',
                  lock: 'Till policy term',
                  maxLimit: 'Premium amount',
                  pros: 'Family protection + tax saving combined',
                  cons: 'Not an investment, no returns',
                  verdict: 'Take term insurance anyway, tax benefit is bonus'
                },
                {
                  name: '5-Year Bank FD',
                  nameHindi: 'पांच साल की एफडी',
                  returns: '6.5-7.5% taxable',
                  lock: '5 years',
                  maxLimit: 'No limit',
                  pros: 'Safe, guaranteed returns, seniors get higher rates',
                  cons: 'Interest is taxable, moderate returns',
                  verdict: 'Good for senior citizens (age 60+)'
                },
                {
                  name: 'National Savings Certificate',
                  nameHindi: 'एनएससी',
                  returns: '7.7% compounded',
                  lock: '5 years',
                  maxLimit: 'No limit',
                  pros: 'Post office scheme, guaranteed returns',
                  cons: 'Interest taxable, post office only',
                  verdict: 'Alternative to FD, slightly higher rate'
                },
                {
                  name: 'Sukanya Samriddhi (Girl Child)',
                  nameHindi: 'सुकन्या समृद्धि',
                  returns: '8.2% tax-free',
                  lock: 'Till daughter turns 21',
                  maxLimit: '₹1.5L/year',
                  pros: 'Highest safe returns, tax-free, for daughters',
                  cons: 'Only for girl child under 10 years',
                  verdict: 'BEST option if you have daughter'
                }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <strong className="text-lg text-gray-900">{item.name}</strong>
                      <p className="text-sm text-gray-600">{item.nameHindi}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-700">{item.returns}</div>
                      <div className="text-xs text-gray-600">Lock: {item.lock}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Max Limit:</span>
                        <strong className="block">{item.maxLimit}</strong>
                      </div>
                      <div>
                        <span className="text-gray-600">Returns:</span>
                        <strong className="block">{item.returns}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p><strong className="text-green-700">✅ Pros:</strong> {item.pros}</p>
                    <p><strong className="text-red-700">❌ Cons:</strong> {item.cons}</p>
                    <p className="bg-blue-100 rounded-lg p-2"><strong>Best For:</strong> {item.verdict}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-50 rounded-xl p-6 border-2 border-yellow-400">
              <strong className="text-yellow-900 text-lg block mb-3">🎯 How to Fill ₹1.5L Tax-Saving Quota:</strong>
              <p className="text-gray-700 mb-3">
                <strong>Example Strategy for 30-year-old earning ₹10L/year:</strong>
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">→</span>
                  <span><strong>₹12K/year:</strong> Term insurance (₹1 Cr cover) - <em>Protection + tax saving</em></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">→</span>
                  <span><strong>₹1,38,000/year:</strong> ELSS mutual fund SIP (₹11,500/month) - <em>Wealth building + tax saving</em></span>
                </li>
              </ul>
              <p className="text-green-700 font-bold mt-3">
                ✅ Total: ₹1.5L invested. Tax saved: ₹46,800 (31.2% bracket). After 20 years: ₹1.47 Cr wealth @ 12% returns!
              </p>
            </div>
          </motion.section>

          {/* Common Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚠️ 8 Common Income Tax Mistakes to Avoid
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: 'Choosing new regime without calculating',
                  reality: 'Many people switch to new regime thinking "lower rates = less tax". Pero if you invest ₹1.5L, old regime can save ₹20K-50K more!',
                  fix: 'Use Calculator above. Compare both regimes. Choose based on YOUR investments, not generic advice.'
                },
                {
                  mistake: 'Not filing ITR because "income is below ₹5L"',
                  reality: 'Even if no tax due, you should file ITR. Needed for loan applications, visa, proof of income. Also you might have TDS refund.',
                  fix: 'File ITR every year even if income is ₹2.5L-₹5L. Takes apenas 30 minutes online. ITR is proof of income.'
                },
                {
                  mistake: 'Missing deadline (July 31)',
                  reality: 'Late filing attracts ₹5,000 penalty (₹1,000 if income < ₹5L). Also delays refund by 3-6 months.',
                  fix: 'File by June 30 to avoid rush. ITR website crashes in last week. Early filing = faster refund.'
                },
                {
                  mistake: 'Not claiming HRA when paying rent',
                  reality: 'If you pay ₹15K/month rent, you can claim ₹1.2-1.5L HRA exemption. Saves ₹24K-37K tax!',
                  fix: 'Submit rent receipts + landlord PAN to employer. HRA exemption is HUGE tax saver for renters.'
                },
                {
                  mistake: 'Investing in tax-saving FD instead of ELSS',
                  reality: 'Tax-saving FD gives 6.5% taxable returns. ELSS gives 12% tax-free (LTCG exempt up to ₹1.25L). Over 20 years: ELSS creates ₹1.3 Cr vs FD apenas ₹50L.',
                  fix: `Young? Choose ELSS for 80C. Senior citizen? Tax-saving FD is okay. Don't choose based on "safety" alone - choose based on AGE.`
                },
                {
                  mistake: 'Not declaring interest income (FD, savings)',
                  reality: `Banks report your FD interest to Income Tax. If you don't declare, automatic notice. Penalty 50% of tax + interest!`,
                  fix: 'Declare ALL income: Salary + FD interest + rental + capital gains. Income Tax has your bank data anyway.'
                },
                {
                  mistake: 'Paying advance tax late (for self-employed)',
                  reality: 'If tax liability > ₹10K, you must pay advance tax in 4 installments. Missing deadlines = 1% interest per month!',
                  fix: 'Pay by June 15, Sept 15, Dec 15, Mar 15. Even rough estimates okay. Adjust in final ITR filing.'
                },
                {
                  mistake: `Not using employer's tax calculator`,
                  reality: 'Many salaried people overpay tax all year, then wait for refund. Why give interest-free loan to government?',
                  fix: `At start of financial year, submit investment proofs to employer. They'll deduct correct TDS. No overpayment = no refund wait.`
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-3">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <div>
                      <p className="text-red-900 font-bold mb-2 text-lg">❌ {item.mistake}</p>
                      <p className="text-gray-700 mb-2"><strong>Reality:</strong> {item.reality}</p>
                      <p className="text-green-700"><strong>✅ Fix:</strong> {item.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Expert Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 shadow-lg border-2 border-yellow-400"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              💡 Pro Tax-Saving Tips from CAs
            </h2>

            <div className="space-y-4">
              {[
                'You can SWITCH regimes every year! Try new regime this year, if tax is higher, switch to old next year. Calculate both every year in April.',
                'HRA exemption formula: Minimum of (Actual rent - 10% salary, 50% salary for metros, Actual HRA received). Use Calculator for exact amount.',
                `Standard deduction ₹50K is automatic for salaried. No proof needed. It's on top of 80C. So ₹2L deductions possible (₹1.5L 80C + ₹50K std).`,
                'If salary > ₹15L, definitely choose old regime. With 80C + home loan + HRA, you can save ₹1L-2L in tax vs new regime.',
                `Don't wait till March to invest for tax saving. Start in April. ₹12,500/month ELSS SIP throughout year is better than ₹1.5L lump sum in March.`,
                `Senior citizens (60+) get higher exemption: ₹3L tax-free in old regime (vs ₹2.5L for others). Always choose old regime if you're 60+.`,
                'Form 12BB: Submit to employer by Feb to declare investments. They adjust TDS. Otherwise you pay full tax, get refund later (waste of time).',
                'Use Income Tax Refund for investments. Many people spend ₹40K-60K refund. Instead invest it immediately in ELSS/PPF to compound for next year.'
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800"><strong>Tip {i + 1}:</strong> {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'I earn ₹6L/year. Do I need to pay tax?',
                  a: 'Depends on regime. New regime: ₹6L - ₹3L exemption - ₹50K std deduction = ₹2.5L taxable × 5% = ₹12,500 tax. Old regime: If you invest ₹1.5L (80C), taxable = ₹4L × 5% = apenas ₹10,400 tax. So yes, pero can be minimized.'
                },
                {
                  q: 'Can I switch between old and new regime every year?',
                  a: 'YES for salaried employees. Choose while filing ITR. You can switch annually. For business/self-employed: Once you choose new regime, cannot go back to old. Careful!'
                },
                {
                  q: 'What if I forget to declare ₹50K FD interest?',
                  a: `Income Tax already knows (banks report it). You'll get notice. Penalty: 50% of tax + interest @1% per month. Always declare all income - IT has your data via Form 26AS.`
                },
                {
                  q: 'My employer deducted ₹80K TDS but actual tax is apenas ₹60K. How to get ₹20K back?',
                  a: `File ITR. Claim refund. It will be credited to your bank in 30-90 days. This happens when employer doesn't consider your 80C investments properly.`
                },
                {
                  q: 'Is advance tax applicable for salaried employees?',
                  a: 'Usually NO. Your employer deducts TDS monthly (advance tax). Advance tax is apenas for self-employed, freelancers, those with rental/capital gains income.'
                },
                {
                  q: 'I invested ₹1.5L in January-March. Can I claim 80C for full year?',
                  a: `YES! Doesn't matter when in financial year (Apr-Mar) you invest. As long as it's invested before Mar 31, you can claim full deduction.`
                },
                {
                  q: 'Should I take HRA or new regime (without HRA)?',
                  a: 'Calculate both. If rent is ₹12K/month (₹1.44L/year), HRA exemption saves ₹31K-46K tax. New regime saves ₹10-15K. OLD REGIME + HRA wins if you pay significant rent.'
                },
                {
                  q: 'Can I claim both home loan principal (80C) and interest (24b)?',
                  a: 'YES! Principal repayment (up to ₹1.5L) under 80C. Interest (up to ₹2L) under Section 24(b). Total ₹3.5L deduction possible if you have home loan!'
                },
                {
                  q: 'New regime is "default" - what does it mean?',
                  a: `If you don't choose, Income Tax assumes new regime. You can still switch to old while filing ITR. Choose wisely based on investments. Don't just go with "default".`
                },
                {
                  q: `I'm 62 years old. Different tax slabs for me?`,
                  a: `Yes! Senior citizens (60-80 years): ₹3L tax-free in old regime. Super seniors (80+ years): ₹5L tax-free. New regime: Same slabs as everyone (no senior citizen benefit). Always choose old regime if you're 60+.`
                }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <p className="font-bold text-lg text-gray-900 mb-2">Q{i + 1}: {faq.q}</p>
                  <p className="text-gray-700"><strong>A:</strong> {faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Action Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your Tax-Saving Action Plan (Start Today!)
            </h2>

            <div className="space-y-3">
              {[
                'Calculate tax in BOTH regimes using Calculator above',
                'If old regime is better: Start ₹12,500/month ELSS SIP immediately (₹1.5L/year)',
                'Submit Form 12BB to employer (declare investments) by February',
                'Pay rent? Claim HRA (submit receipts + landlord PAN)',
                'Have home loan? Claim principal (80C) + interest (24b) deductions',
                'Buy term insurance (₹10-15K) + health insurance (₹15-25K) - protection + tax saving',
                `File ITR by June 30 (don't wait till July 31)`,
                'Check Form 26AS before filing (all TDS, interest income auto-populated)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>💰 Potential Savings:</strong> By choosing right regime + maxing out deductions, 
                someone earning ₹10L can save ₹30K-80K in tax every year. 
                <strong> Over 30 years = ₹9-24 LAKH saved!</strong> Start planning today.
              </p>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Section 80C - ₹1.5 Lakh Tax Saving Deep Dive</h3>
            <p className="mb-6 text-purple-100">
              Master ALL Section 80C investments: PPF vs ELSS vs NSC vs Tax-saving FD. 
              Which gives best returns + tax savings? Complete comparison!
            </p>
            <Link
              to="/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Section 80C Complete Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeTaxBasics;
