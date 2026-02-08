import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Shield, Calculator, TrendingUp, Target, AlertCircle, PieChart } from 'lucide-react';

const TaxSavingCalculator: React.FC = () => {
  const [userData, setUserData] = useState({
    annualIncome: 800000,
    age: 30,
    currentTaxSavingInvestments: 0,
    taxRegime: 'old' // 'old' or 'new'
  });

  const [investments, setInvestments] = useState({
    elss: 0,
    ppf: 0,
    nps: 0,
    lifeInsurance: 0,
    healthInsurance: 0,
    homeLoan: 0,
    educationLoan: 0,
    medicalExpenses: 0,
    otherDeductions: 0
  });

  const [results, setResults] = useState({
    totalDeductions: 0,
    taxableIncome: 0,
    taxLiability: 0,
    taxSaved: 0,
    effectiveTaxRate: 0,
    remainingLimit: 0
  });

  const calculateTaxSavings = () => {
    const { annualIncome, age, taxRegime } = userData;
    const { elss, ppf, nps, lifeInsurance, healthInsurance, homeLoan, educationLoan, medicalExpenses, otherDeductions } = investments;
    
    // Calculate total deductions under Section 80C
    const section80C = Math.min(elss + ppf + lifeInsurance, 150000);
    
    // Calculate NPS deduction (additional 50k for 80CCD(1B))
    const npsDeduction = Math.min(nps, 50000);
    
    // Calculate health insurance deduction
    const healthDeduction = Math.min(healthInsurance, 25000);
    
    // Calculate home loan interest deduction
    const homeLoanDeduction = Math.min(homeLoan, 200000);
    
    // Calculate education loan interest deduction
    const educationLoanDeduction = educationLoan;
    
    // Calculate medical expenses deduction
    const medicalDeduction = Math.min(medicalExpenses, 40000);
    
    // Calculate total deductions
    const totalDeductions = section80C + npsDeduction + healthDeduction + homeLoanDeduction + educationLoanDeduction + medicalDeduction + otherDeductions;
    
    // Calculate taxable income
    const taxableIncome = Math.max(annualIncome - totalDeductions, 0);
    
    // Calculate tax liability based on regime
    let taxLiability = 0;
    let taxWithoutDeductions = 0;
    
    if (taxRegime === 'old') {
      // Old tax regime calculation
      taxLiability = calculateOldTax(taxableIncome);
      taxWithoutDeductions = calculateOldTax(annualIncome);
    } else {
      // New tax regime calculation
      taxLiability = calculateNewTax(taxableIncome);
      taxWithoutDeductions = calculateNewTax(annualIncome);
    }
    
    // Calculate tax saved
    const taxSaved = taxWithoutDeductions - taxLiability;
    
    // Calculate effective tax rate
    const effectiveTaxRate = (taxLiability / annualIncome) * 100;
    
    // Calculate remaining limit under 80C
    const remainingLimit = Math.max(150000 - (elss + ppf + lifeInsurance), 0);
    
    setResults({
      totalDeductions,
      taxableIncome,
      taxLiability,
      taxSaved,
      effectiveTaxRate,
      remainingLimit
    });
  };

  const calculateOldTax = (income: number) => {
    if (income <= 250000) return 0;
    if (income <= 500000) return (income - 250000) * 0.05;
    if (income <= 1000000) return 12500 + (income - 500000) * 0.20;
    return 112500 + (income - 1000000) * 0.30;
  };

  const calculateNewTax = (income: number) => {
    if (income <= 300000) return 0;
    if (income <= 600000) return (income - 300000) * 0.05;
    if (income <= 900000) return 15000 + (income - 600000) * 0.10;
    if (income <= 1200000) return 45000 + (income - 900000) * 0.15;
    if (income <= 1500000) return 90000 + (income - 1200000) * 0.20;
    return 150000 + (income - 1500000) * 0.30;
  };

  React.useEffect(() => {
    calculateTaxSavings();
  }, [userData, investments]);

  const handleUserDataChange = (field: string, value: number | string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleInvestmentChange = (field: string, value: number) => {
    setInvestments({ ...investments, [field]: value });
  };

  const getTaxRegimeRecommendation = () => {
    const oldTax = calculateOldTax(userData.annualIncome - results.totalDeductions);
    const newTax = calculateNewTax(userData.annualIncome);
    
    if (oldTax < newTax) {
      return {
        regime: 'Old Tax Regime',
        color: 'text-green-600',
        bg: 'bg-green-50',
        savings: newTax - oldTax,
        reason: 'Old regime offers better tax savings with deductions.'
      };
    } else {
      return {
        regime: 'New Tax Regime',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        savings: oldTax - newTax,
        reason: 'New regime offers better tax savings with lower rates.'
      };
    }
  };

  const taxRegimeRecommendation = getTaxRegimeRecommendation();

  const getInvestmentRecommendations = () => {
    const recommendations = [];
    
    if (results.remainingLimit > 0) {
      recommendations.push({
        type: 'ELSS',
        amount: Math.min(results.remainingLimit, 50000),
        reason: 'Tax-saving mutual funds with potential for higher returns'
      });
    }
    
    if (investments.healthInsurance < 25000) {
      recommendations.push({
        type: 'Health Insurance',
        amount: 25000 - investments.healthInsurance,
        reason: 'Essential protection with tax benefits'
      });
    }
    
    if (investments.nps < 50000) {
      recommendations.push({
        type: 'NPS',
        amount: 50000 - investments.nps,
        reason: 'Additional 50k deduction under 80CCD(1B)'
      });
    }
    
    return recommendations;
  };

  const investmentRecommendations = getInvestmentRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <SEOHelmet
        title="Tax Saving Investment Calculator - Maximize Your Tax Savings | MoneyCal India"
        description="Calculate your tax savings with various investment options like ELSS, PPF, NPS, and insurance. Get personalized recommendations to maximize your tax benefits and reduce tax liability."
        keywords="tax saving calculator, tax saving investments, ELSS, PPF, NPS, tax deductions, income tax calculator, tax planning, 80C deductions"
        canonicalUrl="https://moneycal.in/tools/tax-saving-calculator"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tax Saving Investment Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maximize your tax savings with strategic investments in ELSS, PPF, NPS, and insurance. Get personalized recommendations to reduce your tax liability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income (₹)
                    </label>
                    <input
                      type="number"
                      value={userData.annualIncome}
                      onChange={(e) => handleUserDataChange('annualIncome', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter annual income"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={userData.age}
                      onChange={(e) => handleUserDataChange('age', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter age"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Regime
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="old"
                          checked={userData.taxRegime === 'old'}
                          onChange={(e) => handleUserDataChange('taxRegime', e.target.value)}
                          className="mr-2"
                        />
                        Old Tax Regime (with deductions)
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="new"
                          checked={userData.taxRegime === 'new'}
                          onChange={(e) => handleUserDataChange('taxRegime', e.target.value)}
                          className="mr-2"
                        />
                        New Tax Regime (lower rates)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-green-600" />
                  Investment Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ELSS (₹) - Section 80C
                    </label>
                    <input
                      type="number"
                      value={investments.elss}
                      onChange={(e) => handleInvestmentChange('elss', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter ELSS investment"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PPF (₹) - Section 80C
                    </label>
                    <input
                      type="number"
                      value={investments.ppf}
                      onChange={(e) => handleInvestmentChange('ppf', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter PPF investment"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NPS (₹) - Section 80CCD(1B)
                    </label>
                    <input
                      type="number"
                      value={investments.nps}
                      onChange={(e) => handleInvestmentChange('nps', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter NPS investment"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Life Insurance (₹) - Section 80C
                    </label>
                    <input
                      type="number"
                      value={investments.lifeInsurance}
                      onChange={(e) => handleInvestmentChange('lifeInsurance', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter life insurance premium"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Health Insurance (₹) - Section 80D
                    </label>
                    <input
                      type="number"
                      value={investments.healthInsurance}
                      onChange={(e) => handleInvestmentChange('healthInsurance', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter health insurance premium"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Loan Interest (₹) - Section 24
                    </label>
                    <input
                      type="number"
                      value={investments.homeLoan}
                      onChange={(e) => handleInvestmentChange('homeLoan', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter home loan interest"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education Loan Interest (₹) - Section 80E
                    </label>
                    <input
                      type="number"
                      value={investments.educationLoan}
                      onChange={(e) => handleInvestmentChange('educationLoan', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter education loan interest"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Expenses (₹) - Section 80DDB
                    </label>
                    <input
                      type="number"
                      value={investments.medicalExpenses}
                      onChange={(e) => handleInvestmentChange('medicalExpenses', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter medical expenses"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Deductions (₹)
                    </label>
                    <input
                      type="number"
                      value={investments.otherDeductions}
                      onChange={(e) => handleInvestmentChange('otherDeductions', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter other deductions"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Tax Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Tax Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Annual Income</span>
                    <span className="font-semibold text-gray-900">₹{userData.annualIncome.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Total Deductions</span>
                    <span className="font-semibold text-blue-600">₹{results.totalDeductions.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Taxable Income</span>
                    <span className="font-semibold text-green-600">₹{results.taxableIncome.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-red-700">Tax Liability</span>
                    <span className="font-semibold text-red-600">₹{results.taxLiability.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Tax Saved</span>
                    <span className="font-semibold text-purple-600">₹{results.taxSaved.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-700">Effective Tax Rate</span>
                    <span className="font-semibold text-yellow-600">{results.effectiveTaxRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Tax Regime Recommendation */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-600" />
                  Tax Regime Recommendation
                </h2>
                
                <div className={`p-4 rounded-lg ${taxRegimeRecommendation.bg}`}>
                  <div className="text-center mb-4">
                    <div className={`text-2xl font-bold ${taxRegimeRecommendation.color} mb-2`}>
                      {taxRegimeRecommendation.regime}
                    </div>
                    <p className="text-sm text-gray-600">{taxRegimeRecommendation.reason}</p>
                    <div className="mt-2 text-lg font-semibold text-green-600">
                      Additional Savings: ₹{taxRegimeRecommendation.savings.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 80C Status */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-blue-600" />
                  Section 80C Status
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Used Limit</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(investments.elss + investments.ppf + investments.lifeInsurance).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Remaining Limit</span>
                    <span className="font-semibold text-green-600">₹{results.remainingLimit.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${((investments.elss + investments.ppf + investments.lifeInsurance) / 150000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Investment Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-blue-600" />
                  Investment Recommendations
                </h2>
                
                <div className="space-y-3">
                  {investmentRecommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-900">{rec.type}</div>
                      <div className="text-sm text-blue-700">Amount: ₹{rec.amount.toLocaleString()}</div>
                      <div className="text-sm text-blue-600">{rec.reason}</div>
                    </div>
                  ))}
                  
                  {investmentRecommendations.length === 0 && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-green-800">Great! You're maximizing your tax benefits.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tax Saving Investment Guide</h2>
            
            <div className="prose max-w-none">
              <h3>Understanding Tax Saving Investments</h3>
              <p>
                Tax saving investments help you reduce your taxable income and save on taxes while building wealth. 
                These investments come with various tax benefits under different sections of the Income Tax Act.
              </p>
              
              <h3>Popular Tax Saving Options</h3>
              <ul>
                <li><strong>ELSS (Equity Linked Savings Scheme):</strong> Tax-saving mutual funds with 3-year lock-in</li>
                <li><strong>PPF (Public Provident Fund):</strong> Government-backed scheme with 15-year tenure</li>
                <li><strong>NPS (National Pension System):</strong> Retirement planning with additional 50k deduction</li>
                <li><strong>Life Insurance:</strong> Term insurance premiums qualify for 80C deduction</li>
                <li><strong>Health Insurance:</strong> Premiums qualify for 80D deduction up to ₹25,000</li>
                <li><strong>Home Loan:</strong> Interest payments qualify for 24(b) deduction up to ₹2 lakh</li>
              </ul>
              
              <h3>Tax Deduction Limits</h3>
              <ul>
                <li><strong>Section 80C:</strong> ₹1.5 lakh (ELSS, PPF, Life Insurance, etc.)</li>
                <li><strong>Section 80CCD(1B):</strong> ₹50,000 (Additional NPS contribution)</li>
                <li><strong>Section 80D:</strong> ₹25,000 (Health Insurance)</li>
                <li><strong>Section 24(b):</strong> ₹2 lakh (Home Loan Interest)</li>
                <li><strong>Section 80E:</strong> No limit (Education Loan Interest)</li>
              </ul>
              
              <h3>Old vs New Tax Regime</h3>
              <ul>
                <li><strong>Old Regime:</strong> Higher tax rates but allows deductions and exemptions</li>
                <li><strong>New Regime:</strong> Lower tax rates but limited deductions</li>
                <li><strong>Choice:</strong> You can choose between regimes each year</li>
                <li><strong>Recommendation:</strong> Calculate both and choose the beneficial one</li>
              </ul>
              
              <h3>Tax Planning Tips</h3>
              <ul>
                <li>Start tax planning early in the financial year</li>
                <li>Maximize 80C limit with a mix of ELSS and PPF</li>
                <li>Consider NPS for additional 50k deduction</li>
                <li>Ensure adequate health insurance coverage</li>
                <li>Keep track of all eligible deductions</li>
                <li>Review and optimize your tax strategy annually</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSavingCalculator;
