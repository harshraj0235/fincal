import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Home, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const HomeLoanEligibility: React.FC = () => {
  // Calculator State
  const [monthlyIncome, setMonthlyIncome] = useState<string>('80000');
  const [coApplicantIncome, setCoApplicantIncome] = useState<string>('0');
  const [existingEMI, setExistingEMI] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('20');
  const [eligibleAmount, setEligibleAmount] = useState<number>(0);
  const [monthlyEMI, setMonthlyEMI] = useState<number>(0);
  const [maxLoanByIncome, setMaxLoanByIncome] = useState<number>(0);

  useEffect(() => {
    calculateEligibility();
  }, [monthlyIncome, coApplicantIncome, existingEMI, interestRate, loanTenure]);

  const calculateEligibility = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const coIncome = parseFloat(coApplicantIncome) || 0;
    const emi = parseFloat(existingEMI) || 0;
    const rate = parseFloat(interestRate) || 8.5;
    const tenure = parseInt(loanTenure) || 20;

    const totalIncome = income + coIncome;
    
    // Maximum EMI = 50% of gross income (bank's FOIR - Fixed Obligation to Income Ratio)
    const maxEMI = (totalIncome * 0.5) - emi;
    
    if (maxEMI <= 0) {
      setEligibleAmount(0);
      setMonthlyEMI(0);
      setMaxLoanByIncome(0);
      return;
    }

    // Calculate eligible loan amount using EMI formula: P = EMI × [(1 + r)^n - 1] / [r × (1 + r)^n]
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const loanAmount = maxEMI * ((Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months)));

    setEligibleAmount(Math.round(loanAmount));
    setMonthlyEMI(Math.round(maxEMI));
    
    // Alternative calculation: Income multiplier (usually 60x monthly income)
    const incomeBasedLoan = totalIncome * 60;
    setMaxLoanByIncome(Math.round(incomeBasedLoan));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const getAffordabilityStatus = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const coIncome = parseFloat(coApplicantIncome) || 0;
    const totalIncome = income + coIncome;
    const emiRatio = (monthlyEMI / totalIncome) * 100;

    if (emiRatio <= 30) return { color: 'green', text: 'Excellent! Very comfortable EMI', icon: '🎉' };
    if (emiRatio <= 40) return { color: 'blue', text: 'Good! Manageable EMI', icon: '👍' };
    if (emiRatio <= 50) return { color: 'yellow', text: 'Maximum limit. No buffer!', icon: '⚠️' };
    return { color: 'red', text: 'Over limit! Reduce EMI or increase income', icon: '❌' };
  };

  const affordability = getAffordabilityStatus();

  return (
    <>
      <SEOHelmet
        title="Home Loan Eligibility Calculator 2025 - Check Your Loan Amount | MoneyCal"
        description="Calculate your home loan eligibility instantly! Free calculator based on income, EMI, interest rate, and tenure. Find out how much home loan you can get in India."
        keywords="home loan eligibility calculator, home loan calculator India, how much home loan can I get, home loan eligibility, EMI calculator, loan amount calculator"
        canonicalUrl="https://moneycal.in/learn/home-loans/home-loan-eligibility"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Home Loan Eligibility Calculator',
          applicationCategory: 'FinanceApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
          },
        }}
      />
      
      <LearnLayout
        title="Home Loan Eligibility Calculator"
        description="Find out exactly how much home loan you can get - with instant calculation! 🧮"
        category="Home Loans"
        difficulty="Beginner"
        readTime="12 min read"
        prevLesson={{
          title: 'Types of Home Loans in India',
          slug: '/learn/home-loans/types-of-home-loans'
        }}
        nextLesson={{
          title: 'Understanding Loan-to-Value (LTV) Ratio',
          slug: '/learn/home-loans/loan-to-value-ratio'
        }}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Calculator className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Calculator Matters</h3>
              <p className="text-gray-700">
                Don't waste time searching for homes you can't afford! This calculator shows your exact eligible loan amount BEFORE you start house hunting. Based on actual bank formulas used in India! 💯
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Calculator */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Home className="h-10 w-10" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">Home Loan Eligibility Calculator</h2>
            <p className="text-center text-blue-100">Enter your details to see how much you can borrow</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Input Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                Your Financial Details
              </h3>

              <div className="space-y-6">
                {/* Monthly Income */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Monthly Income (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-semibold"
                    placeholder="80000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Gross salary (before deductions)</p>
                </div>

                {/* Co-Applicant Income */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Co-Applicant Income (₹) - Optional
                  </label>
                  <input
                    type="number"
                    value={coApplicantIncome}
                    onChange={(e) => setCoApplicantIncome(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-semibold"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Spouse/parent/sibling income (if applying together)</p>
                </div>

                {/* Existing EMI */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Existing EMIs (₹/month)
                  </label>
                  <input
                    type="number"
                    value={existingEMI}
                    onChange={(e) => setExistingEMI(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-semibold"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Car loan, personal loan, credit card EMIs</p>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interest Rate (% per year)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-semibold"
                    placeholder="8.5"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current market rate: 8-9%</p>
                </div>

                {/* Loan Tenure */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-semibold"
                    placeholder="20"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical: 15-25 years</p>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="space-y-6">
              {/* Main Result */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
                <div className="text-center">
                  <p className="text-green-100 text-sm font-semibold mb-2">You Are Eligible For</p>
                  <div className="text-5xl font-bold mb-3">{formatCurrency(eligibleAmount)}</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4">
                    <p className="text-sm text-green-100 mb-1">Your Monthly EMI</p>
                    <p className="text-3xl font-bold">{formatCurrency(monthlyEMI)}</p>
                  </div>
                </div>
              </div>

              {/* Affordability Status */}
              <div className={`bg-${affordability.color}-50 border-2 border-${affordability.color}-300 rounded-xl p-6`}>
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{affordability.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Affordability Status</h4>
                    <p className={`text-${affordability.color}-700 font-semibold`}>{affordability.text}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Total Monthly Income:</span>
                    <strong>{formatCurrency((parseFloat(monthlyIncome) || 0) + (parseFloat(coApplicantIncome) || 0))}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Loan EMI:</span>
                    <strong>{formatCurrency(monthlyEMI)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Existing EMIs:</span>
                    <strong>{formatCurrency(parseFloat(existingEMI) || 0)}</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-gray-300">
                    <span>Total EMI Burden:</span>
                    <strong className="text-lg">
                      {(((monthlyEMI + (parseFloat(existingEMI) || 0)) / ((parseFloat(monthlyIncome) || 0) + (parseFloat(coApplicantIncome) || 0))) * 100).toFixed(1)}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Alternative Calculation */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Alternative Formula (Income Multiplier)
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Some banks use: <strong>60x monthly income</strong></p>
                  <p className="text-lg font-bold text-blue-700">
                    By this method: {formatCurrency(maxLoanByIncome)}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {eligibleAmount < maxLoanByIncome 
                      ? 'EMI-based calculation is your limit (more conservative)' 
                      : 'Income multiplier is your limit'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Banks Calculate */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Do Banks Calculate Eligibility?</h2>
          
          <div className="space-y-6">
            <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">Method 1: FOIR (Fixed Obligation to Income Ratio)</h3>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Most Common Method</strong> - Banks ensure your total EMIs don't exceed 50% of income.
                </p>
                
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Formula:</h4>
                  <div className="font-mono text-sm bg-white p-3 rounded border border-blue-300">
                    Max EMI = (Monthly Income × 50%) - Existing EMIs
                  </div>
                  <div className="mt-3 font-mono text-sm bg-white p-3 rounded border border-blue-300">
                    Loan Amount = Max EMI × [(1+r)^n - 1] / [r×(1+r)^n]
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Where: r = monthly interest rate, n = months</p>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mt-4">
                  <p className="text-gray-800"><strong>Example:</strong></p>
                  <ul className="space-y-1 text-gray-700 text-sm ml-4 mt-2">
                    <li>• Monthly Income: ₹80,000</li>
                    <li>• Existing EMI: ₹10,000 (car loan)</li>
                    <li>• Max Home Loan EMI: (₹80,000 × 50%) - ₹10,000 = <strong className="text-green-700">₹30,000</strong></li>
                    <li>• At 8.5% for 20 years: <strong className="text-green-700">Eligible for ₹36.5 lakhs</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">Method 2: Income Multiplier</h3>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Simple Approach</strong> - Some banks multiply monthly income by 50-60x.
                </p>
                
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Formula:</h4>
                  <div className="font-mono text-sm bg-white p-3 rounded border border-purple-300">
                    Max Loan = Monthly Income × 60
                  </div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mt-4">
                  <p className="text-gray-800"><strong>Example:</strong></p>
                  <ul className="space-y-1 text-gray-700 text-sm ml-4 mt-2">
                    <li>• Monthly Income: ₹80,000</li>
                    <li>• Max Loan: ₹80,000 × 60 = <strong className="text-green-700">₹48 lakhs</strong></li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-300 rounded-lg p-3 mt-3">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Banks use the LOWER of the two methods. FOIR is usually the limiting factor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Factors That Affect Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7 Factors That Affect Your Eligibility</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">1. Monthly Income</h3>
              </div>
              <p className="text-gray-700">
                <strong>Higher income = higher loan.</strong> For every ₹10K increase, you can borrow ₹6-7L more!
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">2. Co-Applicant Income</h3>
              </div>
              <p className="text-gray-700">
                <strong>Adding spouse can boost loan by 40-60%!</strong> Both incomes are fully considered.
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
                <h3 className="font-bold text-gray-900">3. Existing EMIs</h3>
              </div>
              <p className="text-gray-700">
                <strong>Each ₹10K existing EMI reduces home loan by ₹12-15L.</strong> Clear small loans first!
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">4. Interest Rate</h3>
              </div>
              <p className="text-gray-700">
                <strong>Lower rate = higher eligibility.</strong> 8% vs 9%: You can borrow ₹3-4L more on ₹40L loan!
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">5. Loan Tenure</h3>
              </div>
              <p className="text-gray-700">
                <strong>Longer tenure = higher loan.</strong> 25 years vs 15 years: 35-40% more eligibility!
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">6. CIBIL Score</h3>
              </div>
              <p className="text-gray-700">
                <strong>750+ gets best rate.</strong> Below 650: Banks reduce loan by 20-30% or reject!
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">7. Age</h3>
              </div>
              <p className="text-gray-700">
                <strong>Younger = better.</strong> Age 30: Can get 30-year loan. Age 55: Max 10 years only.
              </p>
            </div>
          </div>
        </section>

        {/* How to Increase Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Increase Your Eligibility? 🚀</h2>
          
          <div className="space-y-4">
            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Add Co-Applicant (Biggest Impact!)</h3>
                <p className="text-gray-700">Adding earning spouse/parent can increase loan by ₹15-25L instantly!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Close Existing Loans</h3>
                <p className="text-gray-700">Pay off ₹10K EMI = get ₹12-15L more home loan. Close personal loans, credit cards first!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Improve CIBIL Score to 750+</h3>
                <p className="text-gray-700">Better score = 0.25-0.5% lower rate + ₹3-5L more loan eligibility!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Extend Loan Tenure</h3>
                <p className="text-gray-700">20 years vs 25 years: Get ₹7-9L more! (But pay 2L more interest total)</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Increase Down Payment</h3>
                <p className="text-gray-700">If loan eligibility is less than needed, pay 30% down instead of 10-20%</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Show Additional Income</h3>
                <p className="text-gray-700">Rental income, freelance, consulting - provide ITR to prove. Banks consider 70% of this!</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: I earn ₹50,000/month. How much home loan can I get?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A:</strong> With ₹50K income, 8.5% interest, 20-year tenure, and no existing EMIs:<br/>
                • Max EMI: ₹25,000 (50% of income)<br/>
                • Eligible Loan: <strong>₹30-31 lakhs</strong><br/>
                • With down payment 20% (₹6-7L): Can buy property worth <strong>₹37-38 lakhs</strong><br/>
                <br/>
                <strong>Pro Tip:</strong> Add spouse as co-applicant if she earns ₹30K = total eligibility jumps to ₹50-55 lakhs!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Should I include my bonus/incentive in income?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A:</strong> YES, but banks usually consider only <strong>70-80% of variable income</strong>. For example:<br/>
                • Base Salary: ₹60,000<br/>
                • Avg Monthly Bonus: ₹20,000<br/>
                • Bank considers: ₹60K + (₹20K × 70%) = <strong>₹74,000</strong><br/>
                <br/>
                <strong>Tip:</strong> Show last 2 years' Form 16 and 6 months bank statements proving bonus credits!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: I have ₹15,000 car loan EMI. Should I close it before applying?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: DEFINITELY YES!</strong> Here's the math:<br/>
                • ₹15K EMI reduces your home loan eligibility by <strong>₹18-20 lakhs</strong><br/>
                • If car loan outstanding is ₹3-4 lakhs, close it immediately<br/>
                • Your home loan eligibility will jump ₹18L+ overnight!<br/>
                <br/>
                <strong>Golden Rule:</strong> Clear all high-interest loans (personal, credit card) before home loan application!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I get home loan if I'm self-employed?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: ABSOLUTELY YES!</strong> Self-employed eligibility formula:<br/>
                • Banks consider <strong>50-60% of your annual profit</strong> as income<br/>
                • Must show profit in last 2 years' ITR<br/>
                • Business should be 3+ years old (minimum 2 for some banks)<br/>
                • Interest rate: Same as salaried (8-9%)<br/>
                <br/>
                <strong>Example:</strong> If annual profit is ₹12L, monthly income = ₹12L/12 = ₹1L. But bank considers 50% = ₹50K/month for eligibility calculation.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Does my CIBIL score really matter that much?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES! HUGE impact!</strong> Here's reality:<br/>
                • <strong>CIBIL 800+:</strong> Best rate (8-8.25%), full eligibility, instant approval<br/>
                • <strong>CIBIL 750-799:</strong> Standard rate (8.5%), full eligibility<br/>
                • <strong>CIBIL 700-749:</strong> Rate 8.75-9%, eligibility reduced 10-15%<br/>
                • <strong>CIBIL 650-699:</strong> Rate 9.5-10%, eligibility reduced 25-30%<br/>
                • <strong>CIBIL &lt;650:</strong> Most banks reject, or charge 11-12%<br/>
                <br/>
                <strong>Real Impact:</strong> Score 800 vs 700 on ₹40L loan = saves ₹4-5 lakhs over 20 years!
              </p>
            </details>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Maximum EMI = 50% of gross monthly income (bank's FOIR limit)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Adding co-applicant can boost eligibility by 40-60% (₹15-25L more!)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Close existing EMIs before applying - each ₹10K reduces loan by ₹12-15L</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">CIBIL 750+ is crucial for best rates and full eligibility</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Longer tenure increases eligibility but costs more interest overall</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Self-employed can get same loan as salaried - just need 2 years ITR</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Understand Loan-to-Value Ratio Next! 📊</h2>
          <p className="text-blue-100 mb-6">
            Now that you know your eligibility, learn about LTV ratio and how it affects your down payment!
          </p>
          <a
            href="/learn/home-loans/loan-to-value-ratio"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Loan-to-Value (LTV) Ratio →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default HomeLoanEligibility;

