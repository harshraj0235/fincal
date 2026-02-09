import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, FileText, TrendingUp, AlertCircle, CheckCircle, Zap, Info, Star, Receipt, PiggyBank, Target } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface IncomeTaxAnalysis {
  grossIncome: number;
  deductions: {
    standardDeduction: number;
    hra: number;
    lta: number;
    medicalInsurance: number;
    homeLoanInterest: number;
    educationLoanInterest: number;
    elss: number;
    ppf: number;
    nps: number;
    otherDeductions: number;
  };
  totalDeductions: number;
  taxableIncome: number;
  taxLiability: number;
  cess: number;
  totalTax: number;
  netIncome: number;
  effectiveTaxRate: number;
  recommendations: string[];
  taxSavingOptions: Array<{
    option: string;
    maxAmount: number;
    currentAmount: number;
    potentialSavings: number;
    description: string;
  }>;
  oldVsNewRegime: {
    oldRegimeTax: number;
    newRegimeTax: number;
    savings: number;
    recommendation: string;
  };
}

const IncomeTaxCalculator: React.FC = () => {
  const [grossIncome, setGrossIncome] = useState(1000000);
  const [age, setAge] = useState(30);
  const [regime, setRegime] = useState<'old' | 'new'>('old');
  const [deductions, setDeductions] = useState({
    standardDeduction: 50000,
    hra: 120000,
    lta: 0,
    medicalInsurance: 25000,
    homeLoanInterest: 0,
    educationLoanInterest: 0,
    elss: 0,
    ppf: 0,
    nps: 0,
    otherDeductions: 0
  });
  const [analysis, setAnalysis] = useState<IncomeTaxAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateTax = () => {
    if (grossIncome <= 0) {
      alert('Please enter a valid gross income');
      return;
    }

    const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + value, 0);
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    
    let taxLiability = 0;
    
    if (regime === 'old') {
      // Old tax regime calculation
      if (taxableIncome <= 250000) {
        taxLiability = 0;
      } else if (taxableIncome <= 500000) {
        taxLiability = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        taxLiability = 12500 + (taxableIncome - 500000) * 0.20;
      } else {
        taxLiability = 112500 + (taxableIncome - 1000000) * 0.30;
      }
    } else {
      // New tax regime calculation
      if (taxableIncome <= 300000) {
        taxLiability = 0;
      } else if (taxableIncome <= 600000) {
        taxLiability = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        taxLiability = 15000 + (taxableIncome - 600000) * 0.10;
      } else if (taxableIncome <= 1200000) {
        taxLiability = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        taxLiability = 90000 + (taxableIncome - 1200000) * 0.20;
      } else {
        taxLiability = 150000 + (taxableIncome - 1500000) * 0.30;
      }
    }

    const cess = taxLiability * 0.04; // 4% cess
    const totalTax = taxLiability + cess;
    const netIncome = grossIncome - totalTax;
    const effectiveTaxRate = (totalTax / grossIncome) * 100;

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (totalDeductions < grossIncome * 0.1) {
      recommendations.push("Consider maximizing your tax-saving investments to reduce tax liability.");
    }
    
    if (deductions.elss === 0 && deductions.ppf === 0) {
      recommendations.push("Invest in ELSS mutual funds or PPF to save up to ₹1.5 lakh under Section 80C.");
    }
    
    if (deductions.nps === 0) {
      recommendations.push("Consider NPS investment for additional ₹50,000 deduction under Section 80CCD(1B).");
    }
    
    if (deductions.medicalInsurance < 25000) {
      recommendations.push("Maximize health insurance premium deduction up to ₹25,000 (₹50,000 for senior citizens).");
    }
    
    if (deductions.homeLoanInterest === 0 && grossIncome > 500000) {
      recommendations.push("Consider home loan for tax benefits on interest up to ₹2 lakh under Section 24.");
    }

    // Tax saving options
    const taxSavingOptions = [
      {
        option: "ELSS Mutual Funds",
        maxAmount: 150000,
        currentAmount: deductions.elss,
        potentialSavings: Math.min(150000 - deductions.elss, 150000) * 0.30,
        description: "Equity Linked Savings Scheme under Section 80C"
      },
      {
        option: "PPF",
        maxAmount: 150000,
        currentAmount: deductions.ppf,
        potentialSavings: Math.min(150000 - deductions.ppf, 150000) * 0.30,
        description: "Public Provident Fund under Section 80C"
      },
      {
        option: "NPS",
        maxAmount: 50000,
        currentAmount: deductions.nps,
        potentialSavings: Math.min(50000 - deductions.nps, 50000) * 0.30,
        description: "National Pension System under Section 80CCD(1B)"
      },
      {
        option: "Health Insurance",
        maxAmount: 25000,
        currentAmount: deductions.medicalInsurance,
        potentialSavings: Math.min(25000 - deductions.medicalInsurance, 25000) * 0.30,
        description: "Medical insurance premium under Section 80D"
      }
    ];

    // Old vs New regime comparison
    const oldRegimeTax = calculateOldRegimeTax(taxableIncome);
    const newRegimeTax = calculateNewRegimeTax(taxableIncome);
    const savings = Math.abs(oldRegimeTax - newRegimeTax);
    const recommendation = oldRegimeTax < newRegimeTax ? 
      "Old regime is better for you" : 
      "New regime is better for you";

    setAnalysis({
      grossIncome,
      deductions,
      totalDeductions,
      taxableIncome,
      taxLiability,
      cess,
      totalTax,
      netIncome,
      effectiveTaxRate,
      recommendations,
      taxSavingOptions,
      oldVsNewRegime: {
        oldRegimeTax,
        newRegimeTax,
        savings,
        recommendation
      }
    });
    
    setShowResults(true);
  };

  const calculateOldRegimeTax = (taxableIncome: number) => {
    if (taxableIncome <= 250000) return 0;
    if (taxableIncome <= 500000) return (taxableIncome - 250000) * 0.05;
    if (taxableIncome <= 1000000) return 12500 + (taxableIncome - 500000) * 0.20;
    return 112500 + (taxableIncome - 1000000) * 0.30;
  };

  const calculateNewRegimeTax = (taxableIncome: number) => {
    if (taxableIncome <= 300000) return 0;
    if (taxableIncome <= 600000) return (taxableIncome - 300000) * 0.05;
    if (taxableIncome <= 900000) return 15000 + (taxableIncome - 600000) * 0.10;
    if (taxableIncome <= 1200000) return 45000 + (taxableIncome - 900000) * 0.15;
    if (taxableIncome <= 1500000) return 90000 + (taxableIncome - 1200000) * 0.20;
    return 150000 + (taxableIncome - 1500000) * 0.30;
  };

  const updateDeduction = (field: keyof typeof deductions, value: number) => {
    setDeductions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setGrossIncome(1000000);
    setAge(30);
    setRegime('old');
    setDeductions({
      standardDeduction: 50000,
      hra: 120000,
      lta: 0,
      medicalInsurance: 25000,
      homeLoanInterest: 0,
      educationLoanInterest: 0,
      elss: 0,
      ppf: 0,
      nps: 0,
      otherDeductions: 0
    });
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Income Tax Calculator - Calculate Your Tax Liability | MoneyCal India"
        description="Calculate your income tax liability with our comprehensive tax calculator. Compare old vs new tax regime, find tax-saving opportunities, and get personalized recommendations for tax planning."
        keywords="income tax calculator, tax planning, tax saving, old tax regime, new tax regime, tax deductions, income tax, tax calculator India"
        url="/tools/income-tax-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Income Tax Calculator",
          "description": "Calculate income tax liability and find tax-saving opportunities",
          "url": "https://moneycal.in/tools/income-tax-calculator",
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
                  Income Tax Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your income tax liability and find the best tax-saving opportunities. 
                Compare old vs new tax regime and get personalized recommendations for tax planning.
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
                <Calculator className="w-6 h-6 mr-3 text-blue-600" />
                Tax Calculation
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gross Annual Income (₹)</label>
                  <input
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your gross annual income"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <select
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={30}>Below 60</option>
                      <option value={60}>60-80 years</option>
                      <option value={80}>Above 80</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Regime</label>
                    <select
                      value={regime}
                      onChange={(e) => setRegime(e.target.value as 'old' | 'new')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="old">Old Regime</option>
                      <option value="new">New Regime</option>
                    </select>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Deductions & Exemptions</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Standard Deduction (₹)</label>
                      <input
                        type="number"
                        value={deductions.standardDeduction}
                        onChange={(e) => updateDeduction('standardDeduction', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="50,000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">HRA (₹)</label>
                      <input
                        type="number"
                        value={deductions.hra}
                        onChange={(e) => updateDeduction('hra', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="House Rent Allowance"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical Insurance (₹)</label>
                      <input
                        type="number"
                        value={deductions.medicalInsurance}
                        onChange={(e) => updateDeduction('medicalInsurance', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Health insurance premium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ELSS Investment (₹)</label>
                      <input
                        type="number"
                        value={deductions.elss}
                        onChange={(e) => updateDeduction('elss', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ELSS mutual funds (max ₹1.5L)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">PPF (₹)</label>
                      <input
                        type="number"
                        value={deductions.ppf}
                        onChange={(e) => updateDeduction('ppf', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Public Provident Fund"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">NPS (₹)</label>
                      <input
                        type="number"
                        value={deductions.nps}
                        onChange={(e) => updateDeduction('nps', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="National Pension System (max ₹50K)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Home Loan Interest (₹)</label>
                      <input
                        type="number"
                        value={deductions.homeLoanInterest}
                        onChange={(e) => updateDeduction('homeLoanInterest', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Home loan interest (max ₹2L)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Other Deductions (₹)</label>
                      <input
                        type="number"
                        value={deductions.otherDeductions}
                        onChange={(e) => updateDeduction('otherDeductions', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Other eligible deductions"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateTax}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Tax
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
                        <h3 className="text-lg font-semibold text-gray-900">Taxable Income</h3>
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.taxableIncome.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">After deductions</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Tax</h3>
                        <DollarSign className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-600">₹{analysis.totalTax.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Including cess</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Net Income</h3>
                        <PiggyBank className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.netIncome.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Take home</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Effective Tax Rate</h3>
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{analysis.effectiveTaxRate.toFixed(1)}%</p>
                      <p className="text-sm text-gray-500 mt-1">Of gross income</p>
                    </div>
                  </div>

                  {/* Old vs New Regime Comparison */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Receipt className="w-6 h-6 mr-3 text-blue-600" />
                      Old vs New Regime Comparison
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Old Regime</h4>
                        <p className="text-2xl font-bold text-blue-600">₹{analysis.oldVsNewRegime.oldRegimeTax.toLocaleString()}</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">New Regime</h4>
                        <p className="text-2xl font-bold text-green-600">₹{analysis.oldVsNewRegime.newRegimeTax.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        {analysis.oldVsNewRegime.recommendation}
                      </p>
                      <p className="text-sm text-gray-600">
                        Potential savings: ₹{analysis.oldVsNewRegime.savings.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Tax Saving Options */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target className="w-6 h-6 mr-3 text-blue-600" />
                      Tax Saving Opportunities
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.taxSavingOptions.map((option, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{option.option}</h4>
                            <span className="text-sm font-semibold text-green-600">
                              Save ₹{option.potentialSavings.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Current: ₹{option.currentAmount.toLocaleString()}</span>
                            <span className="text-gray-500">Max: ₹{option.maxAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Tax Planning Recommendations
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
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your Tax?</h3>
                  <p className="text-gray-600">
                    Enter your income and deduction details to calculate your tax liability and find tax-saving opportunities.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tax Planning Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Saving Investments</h3>
                <p className="text-gray-600 mb-4">
                  Maximize your tax savings by investing in eligible instruments under various sections.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Section 80C: ELSS, PPF, EPF (₹1.5L)</li>
                  <li>• Section 80CCD(1B): NPS (₹50K)</li>
                  <li>• Section 80D: Health insurance (₹25K)</li>
                  <li>• Section 24: Home loan interest (₹2L)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Old vs New Regime</h3>
                <p className="text-gray-600 mb-4">
                  Choose the right tax regime based on your deductions and income level.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Old regime: More deductions available</li>
                  <li>• New regime: Lower tax rates, fewer deductions</li>
                  <li>• Compare both before filing</li>
                  <li>• Can switch annually</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Planning Tips</h3>
                <p className="text-gray-600 mb-4">
                  Effective tax planning strategies to minimize your tax liability legally.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Start planning early in the year</li>
                  <li>• Maximize all available deductions</li>
                  <li>• Consider timing of investments</li>
                  <li>• Keep proper documentation</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default IncomeTaxCalculator;
