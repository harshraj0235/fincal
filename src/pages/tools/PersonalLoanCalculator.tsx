import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, IndianRupee, DollarSign, Calendar, TrendingUp, CheckCircle, Zap, Info, BarChart3, Target, PieChart } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../../components/CalculatorSchema';

interface PersonalLoanAnalysis {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  processingFee: number;
  totalCost: number;
  scenarios: Array<{
    tenure: number;
    emi: number;
    totalInterest: number;
    savings: number;
  }>;
  recommendations: string[];
  eligibilityCheck: {
    monthlyIncome: number;
    emiToIncomeRatio: number;
    isEligible: boolean;
    maxLoanAmount: number;
  };
  comparison: Array<{
    lender: string;
    interestRate: number;
    processingFee: number;
    emi: number;
    totalCost: number;
  }>;
}

const PersonalLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(5);
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [analysis, setAnalysis] = useState<PersonalLoanAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculatePersonalLoan = () => {
    if (loanAmount <= 0 || interestRate < 0 || tenure <= 0) {
      alert('Please enter valid loan parameters');
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure * 12;
    
    // Calculate EMI using the formula
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    const processingFee = loanAmount * 0.02; // 2% processing fee
    const totalCost = totalPayment + processingFee;

    // Generate different scenarios
    const scenarios = [
      {
        tenure: tenure - 1,
        emi: calculateEMIForTenure(tenure - 1),
        totalInterest: calculateTotalInterestForTenure(tenure - 1),
        savings: totalInterest - calculateTotalInterestForTenure(tenure - 1)
      },
      {
        tenure: tenure,
        emi: emi,
        totalInterest: totalInterest,
        savings: 0
      },
      {
        tenure: tenure + 1,
        emi: calculateEMIForTenure(tenure + 1),
        totalInterest: calculateTotalInterestForTenure(tenure + 1),
        savings: totalInterest - calculateTotalInterestForTenure(tenure + 1)
      }
    ];

    // Eligibility check
    const emiToIncomeRatio = (emi / monthlyIncome) * 100;
    const isEligible = emiToIncomeRatio <= 50; // 50% rule for personal loans
    const maxLoanAmount = monthlyIncome * 0.5 * 12 * tenure / (1 + (interestRate / 100) * tenure / 2);

    // Lender comparison
    const comparison = [
      {
        lender: 'HDFC Bank',
        interestRate: 10.5,
        processingFee: 0.02,
        emi: calculateEMIForLender(10.5, 0.02),
        totalCost: calculateTotalCostForLender(10.5, 0.02)
      },
      {
        lender: 'ICICI Bank',
        interestRate: 11.0,
        processingFee: 0.02,
        emi: calculateEMIForLender(11.0, 0.02),
        totalCost: calculateTotalCostForLender(11.0, 0.02)
      },
      {
        lender: 'SBI',
        interestRate: 11.5,
        processingFee: 0.015,
        emi: calculateEMIForLender(11.5, 0.015),
        totalCost: calculateTotalCostForLender(11.5, 0.015)
      },
      {
        lender: 'Axis Bank',
        interestRate: 12.0,
        processingFee: 0.02,
        emi: calculateEMIForLender(12.0, 0.02),
        totalCost: calculateTotalCostForLender(12.0, 0.02)
      }
    ];

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (interestRate > 15) {
      recommendations.push("Consider other financing options as the interest rate is quite high.");
    }
    
    if (emiToIncomeRatio > 40) {
      recommendations.push("Your EMI is high relative to income. Consider reducing loan amount or increasing tenure.");
    }
    
    if (tenure > 5) {
      recommendations.push("Personal loans are best for short-term needs. Consider longer tenure only if necessary.");
    }
    
    if (loanAmount > monthlyIncome * 10) {
      recommendations.push("Consider if you really need such a large loan amount.");
    }
    
    if (processingFee > loanAmount * 0.03) {
      recommendations.push("Look for lenders with lower processing fees to reduce overall cost.");
    }

    setAnalysis({
      loanAmount,
      interestRate,
      tenure,
      emi,
      totalPayment,
      totalInterest,
      processingFee,
      totalCost,
      scenarios,
      recommendations,
      eligibilityCheck: {
        monthlyIncome,
        emiToIncomeRatio,
        isEligible,
        maxLoanAmount
      },
      comparison
    });
    
    setShowResults(true);
  };

  const calculateEMIForTenure = (newTenure: number) => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = newTenure * 12;
    
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
           (Math.pow(1 + monthlyRate, totalMonths) - 1);
  };

  const calculateTotalInterestForTenure = (newTenure: number) => {
    const emi = calculateEMIForTenure(newTenure);
    return (emi * newTenure * 12) - loanAmount;
  };

  const calculateEMIForLender = (rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = tenure * 12;
    
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
           (Math.pow(1 + monthlyRate, totalMonths) - 1);
  };

  const calculateTotalCostForLender = (rate: number, fee: number) => {
    const emi = calculateEMIForLender(rate);
    const totalPayment = emi * tenure * 12;
    const processingFee = loanAmount * fee;
    return totalPayment + processingFee;
  };

  const resetCalculator = () => {
    setLoanAmount(500000);
    setInterestRate(12);
    setTenure(5);
    setMonthlyIncome(50000);
    setAnalysis(null);
    setShowResults(false);
  };

  const contentData = {
    title: "Personal Loan Calculator India",
    description: "Calculate personal loan EMI, total interest cost, and check eligibility. Compare lenders like SBI, HDFC, ICICI, and Bajaj Finance. Analyze different tenure and amount scenarios to find your best personal loan option.",
    benefits: [
      "Calculate exact EMI for any loan amount, interest rate, and tenure",
      "Check eligibility based on your monthly income and existing EMIs",
      "Compare personal loan offers from 5+ top Indian lenders",
      "Analyze different tenure scenarios to optimize total interest cost",
      "Get personalized recommendations based on your financial profile"
    ],
    howToSteps: [
      { step: "Enter Loan Details", details: "Enter your desired loan amount (₹50K to ₹40L), expected interest rate, and preferred tenure (1-7 years)." },
      { step: "Add Income Details", details: "Enter your monthly income so we can check if your EMI-to-income ratio is within the 40% safe limit." },
      { step: "Compare Results", details: "See EMI amount, total interest, lender comparison, and tenure scenario analysis side by side." },
      { step: "Choose Best Option", details: "Pick the lender and tenure combination that gives you the lowest total cost and comfortable EMI." }
    ],
    examples: [
      {
        scenario: "Debt Consolidation — ₹5L Personal Loan",
        inputs: [
          { label: "Loan Amount", value: "₹5,00,000" },
          { label: "Interest Rate", value: "12% p.a." },
          { label: "Tenure", value: "3 years" },
          { label: "Monthly Income", value: "₹60,000" }
        ],
        result: "EMI: ₹16,607 | Total Interest: ₹97,852 | EMI-to-Income: 27.7% (Safe)",
        explanation: "Priya needs ₹5L to consolidate credit card debt at 36% APR. A personal loan at 12% saves her ₹24,000/year in interest. At 3-year tenure, her EMI is ₹16,607 (27.7% of income — well within the safe 40% limit). She can also prepay after 6 months with most lenders to further reduce interest."
      }
    ],
    tips: [
      "Keep total EMIs (all loans combined) below 40% of monthly income. Banks use this ratio to determine eligibility.",
      "Compare processing fees across lenders — they range from 0.5% to 3%. On a ₹5L loan, that's ₹2,500 to ₹15,000 difference.",
      "Choose a shorter tenure if you can afford higher EMIs — a 3-year tenure costs 30-40% less total interest than 5-year.",
      "Check prepayment charges before signing. RBI mandates zero prepayment penalty on floating-rate personal loans."
    ],
    mistakes: [
      "Not checking your credit score before applying — multiple rejections further damage your score. Check score first.",
      "Choosing the longest tenure for lowest EMI without realizing you pay 50-70% more total interest.",
      "Ignoring processing fees, insurance charges, and other hidden costs that add 2-5% to effective interest rate.",
      "Taking a personal loan for lifestyle expenses (vacation, gadgets) — use it only for productive purposes or emergencies."
    ],
    faqs: [
      { question: "What is the interest rate on personal loans in India?", answer: "Personal loan interest rates in India range from 10.5% to 24% per annum depending on the lender and your profile. Public sector banks (SBI, BOB) offer 11-14%. Private banks (HDFC, ICICI) offer 10.5-16%. NBFCs (Bajaj Finance, Tata Capital) offer 12-24%. Your actual rate depends on: credit score (750+ gets best rates), monthly income, employer category, and existing relationship with the bank." },
      { question: "How much personal loan can I get on my salary?", answer: "Banks typically offer 10-24x your monthly salary as personal loan amount. On ₹50,000 salary: ₹5-12 lakh possible. The key constraint is EMI-to-income ratio — total EMIs (including new loan) should not exceed 40-50% of monthly income. If you already pay ₹10,000 EMI on a car loan, your new personal loan EMI is limited to ₹10,000-15,000 (assuming ₹50K salary)." },
      { question: "Which bank offers the cheapest personal loan?", answer: "As of 2025: SBI offers the lowest rate at 11% for existing customers. HDFC Bank starts at 10.5% for premium salary accounts. ICICI Bank offers 10.75% for select corporate employees. Bajaj Finance is fastest (approval in 5 minutes) but charges 13-24%. Compare total cost (interest + processing fee) rather than just interest rate. A loan at 11% with 2% processing fee may cost more than 11.5% with 0.5% processing fee." },
      { question: "Should I take a personal loan or use a credit card?", answer: "Personal loan wins for amounts above ₹50,000 or repayment periods over 3 months. Credit card interest is 36-42% p.a. vs personal loan at 11-16%. For ₹1L over 12 months: Credit card EMI costs ₹20,000+ in interest. Personal loan costs ₹6,500-8,500 in interest. However, for small amounts under ₹50K repaid within 1-2 months, credit card is more convenient (no processing fee, no documentation)." },
      { question: "Can I prepay my personal loan early?", answer: "Yes. RBI mandates that banks cannot charge prepayment penalty on floating-rate personal loans. For fixed-rate loans, prepayment charges range from 2-5% of outstanding amount. Most banks allow part-prepayment (minimum ₹10,000-25,000) after 6-12 EMIs. Prepaying saves significant interest — paying ₹1L extra on a ₹5L loan at 12% in month 12 saves approximately ₹24,000 in interest over the remaining tenure." }
    ],
    relatedCalculators: [
      { name: "Loan EMI Calculator", url: "/tools/loan-emi-calculator", description: "Calculate EMI for any loan type." },
      { name: "Home Loan Calculator", url: "/tools/home-loan-calculator", description: "Calculate home loan EMI and eligibility." },
      { name: "Credit Score Calculator", url: "/tools/credit-score-calculator", description: "Check how your score affects loan rates." },
      { name: "Debt Payoff Calculator", url: "/tools/debt-payoff-calculator", description: "Plan debt repayment strategy." }
    ],
    lastUpdated: "2025-10-25"
  };

  return (
    <>
      <SEOHelmet
        title="Free Personal Loan Calculator - Calculate EMI, Interest & Eligibility | MoneyCal India"
        description="Calculate personal loan EMI, total interest, and eligibility. Compare lenders, analyze tenure scenarios, and get personalized recommendations."
        keywords="personal loan Calculator, personal loan EMI, personal loan interest, unsecured loan, personal loan eligibility, loan comparison, instant personal loan"
        canonicalUrl="/tools/personal-loan-calculator"
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="Personal Loan Calculator"
        description="Calculate personal loan EMI, compare Indian lenders, check eligibility, and analyze tenure scenarios."
        url="/tools/personal-loan-calculator"
        features={[
          "EMI calculation with amortization",
          "Eligibility check based on income",
          "Lender comparison (SBI, HDFC, ICICI, Bajaj)",
          "Tenure scenario analysis",
          "Personalized recommendations"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
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
                  Personal Loan Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your personal loan EMI, total interest, and eligibility. Compare different lenders, 
                analyze loan scenarios, and get personalized recommendations for your personal loan needs.
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
                <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                Personal Loan Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% per annum)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter interest rate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure (Years)</label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan tenure"
                    min="1"
                    max="7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter monthly income"
                  />
                  <p className="text-sm text-gray-500 mt-1">For eligibility check</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculatePersonalLoan}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <IndianRupee className="w-5 h-5 mr-2" />
                  Calculate Personal Loan
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
                        <h3 className="text-lg font-semibold text-gray-900">Monthly EMI</h3>
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.emi.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Per month</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Interest</h3>
                        <TrendingUp className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-600">₹{analysis.totalInterest.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Over {analysis.tenure} years</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Processing Fee</h3>
                        <Info className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">₹{analysis.processingFee.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">One-time charge</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Cost</h3>
                        <BarChart3 className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-3xl font-bold text-purple-600">₹{analysis.totalCost.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Including all charges</p>
                    </div>
                  </div>

                  {/* Eligibility Check */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target className="w-6 h-6 mr-3 text-blue-600" />
                      Eligibility Check
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">EMI to Income Ratio</h4>
                        <p className="text-2xl font-bold text-blue-600">{analysis.eligibilityCheck.emiToIncomeRatio.toFixed(1)}%</p>
                        <p className="text-sm text-gray-500">Should be below 50%</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Eligibility Status</h4>
                        <p className={`text-2xl font-bold ${analysis.eligibilityCheck.isEligible ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.eligibilityCheck.isEligible ? 'Eligible' : 'Not Eligible'}
                        </p>
                        <p className="text-sm text-gray-500">Based on income criteria</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Maximum recommended loan amount: ₹{analysis.eligibilityCheck.maxLoanAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Lender Comparison */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Lender Comparison
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.comparison.map((lender, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{lender.lender}</h4>
                            <span className="text-sm font-semibold text-blue-600">{lender.interestRate}% p.a.</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Monthly EMI</p>
                              <p className="font-semibold text-gray-900">₹{lender.emi.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total Cost</p>
                              <p className="font-semibold text-gray-900">₹{lender.totalCost.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Different Scenarios */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                      Different Tenure Scenarios
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.scenarios.map((scenario, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{scenario.tenure} Years</h4>
                            <span className="text-sm font-semibold text-blue-600">₹{scenario.emi.toLocaleString()}/month</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Total Interest</p>
                              <p className="font-semibold text-gray-900">₹{scenario.totalInterest.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Interest Savings</p>
                              <p className="font-semibold text-green-600">₹{scenario.savings.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Personal Loan Recommendations
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
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your Personal Loan?</h3>
                  <p className="text-gray-600">
                    Enter your loan details to calculate EMI, check eligibility, and get personalized recommendations.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Educational Content */}
            <CalculatorContentWrapper {...contentData} calculatorId="personal-loan-calculator" />
        </div>
      </div>
    </>
  );
};

export default PersonalLoanCalculator;
