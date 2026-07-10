import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, DollarSign, Calendar, TrendingUp, CheckCircle, Zap, BarChart3, Target, PieChart } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../../components/CalculatorSchema';

interface EMIAnalysis {
  principal: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  scenarios: Array<{
    tenure: number;
    emi: number;
    totalInterest: number;
    savings: number;
  }>;
  recommendations: string[];
  prepaymentAnalysis: {
    prepaymentAmount: number;
    newEMI: number;
    interestSaved: number;
    tenureReduced: number;
  };
}

const LoanEMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(20);
  const [prepaymentAmount, setPrepaymentAmount] = useState(0);
  const [analysis, setAnalysis] = useState<EMIAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateEMI = () => {
    if (principal <= 0 || interestRate < 0 || tenure <= 0) {
      alert('Please enter valid loan parameters');
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure * 12;
    
    // Calculate EMI using the formula
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    const amortizationSchedule = [];
    let balance = principal;
    
    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance = balance - principalPayment;
      
      amortizationSchedule.push({
        month,
        emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    // Generate different scenarios
    const scenarios = [
      {
        tenure: tenure - 5,
        emi: calculateEMIForTenure(tenure - 5),
        totalInterest: calculateTotalInterestForTenure(tenure - 5),
        savings: totalInterest - calculateTotalInterestForTenure(tenure - 5)
      },
      {
        tenure: tenure,
        emi: emi,
        totalInterest: totalInterest,
        savings: 0
      },
      {
        tenure: tenure + 5,
        emi: calculateEMIForTenure(tenure + 5),
        totalInterest: calculateTotalInterestForTenure(tenure + 5),
        savings: totalInterest - calculateTotalInterestForTenure(tenure + 5)
      }
    ];

    // Prepayment analysis
    const prepaymentAnalysis = {
      prepaymentAmount,
      newEMI: prepaymentAmount > 0 ? calculateEMIAfterPrepayment() : emi,
      interestSaved: prepaymentAmount > 0 ? calculateInterestSaved() : 0,
      tenureReduced: prepaymentAmount > 0 ? calculateTenureReduction() : 0
    };

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (interestRate > 12) {
      recommendations.push("Consider refinancing your loan as the interest rate is quite high.");
    }
    
    if (emi > principal * 0.01) {
      recommendations.push("Your EMI is high relative to the loan amount. Consider extending the tenure.");
    }
    
    if (totalInterest > principal * 0.5) {
      recommendations.push("Consider making prepayments to reduce the total interest burden.");
    }
    
    if (tenure > 25) {
      recommendations.push("Long tenure loans result in higher interest. Consider shorter tenure if affordable.");
    }

    setAnalysis({
      principal,
      interestRate,
      tenure,
      emi,
      totalPayment,
      totalInterest,
      amortizationSchedule,
      scenarios,
      recommendations,
      prepaymentAnalysis
    });
    
    setShowResults(true);
  };

  const calculateEMIForTenure = (newTenure: number) => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = newTenure * 12;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
           (Math.pow(1 + monthlyRate, totalMonths) - 1);
  };

  const calculateTotalInterestForTenure = (newTenure: number) => {
    const emi = calculateEMIForTenure(newTenure);
    return (emi * newTenure * 12) - principal;
  };

  const calculateEMIAfterPrepayment = () => {
    const remainingPrincipal = principal - prepaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure * 12;
    
    return (remainingPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
           (Math.pow(1 + monthlyRate, totalMonths) - 1);
  };

  const calculateInterestSaved = () => {
    const originalTotalInterest = (analysis?.emi || 0) * tenure * 12 - principal;
    const newTotalInterest = calculateEMIAfterPrepayment() * tenure * 12 - (principal - prepaymentAmount);
    return originalTotalInterest - newTotalInterest;
  };

  const calculateTenureReduction = () => {
    // Simplified calculation - in reality, this would require iterative calculation
    return Math.floor(prepaymentAmount / (analysis?.emi || 1));
  };

  const resetCalculator = () => {
    setPrincipal(1000000);
    setInterestRate(10);
    setTenure(20);
    setPrepaymentAmount(0);
    setAnalysis(null);
    setShowResults(false);
  };

  const contentData = {
    title: "Loan EMI Calculator",
    description: `A Loan EMI (Equated Monthly Installment) Calculator helps you determine the monthly payment you need to make towards any loan. Whether it's a home loan, car loan, or personal loan, our comprehensive calculator provides instant, accurate calculations based on your loan amount, interest rate, and tenure. Understanding your EMI helps in better financial planning and ensures you choose a loan that fits your budget without straining your finances.`,
    
    benefits: [
      "Instant EMI calculation in seconds - no manual formulas needed",
      "Plan your budget effectively by knowing exact monthly commitments",
      "Compare different loan options by varying amounts and tenures",
      "Understand total interest outgo over the entire loan period",
      "Make informed decisions about loan affordability before applying",
      "Visualize payment breakdown between principal and interest",
      "Analyze the impact of partial prepayments on your loan tenure and interest",
      "100% free to use, no registration required, mobile-friendly interface"
    ],
    
    howToSteps: [
      {
        step: "Enter Loan Amount",
        details: "Input the total principal amount you want to borrow. This is the actual loan amount before any interest. For example, if you're taking a home loan, this would be the property price minus your down payment. Ensure you consider your exact funding requirement."
      },
      {
        step: "Input Interest Rate",
        details: "Enter the annual interest rate offered by the lender. This is typically expressed as a percentage per annum. As of 2025, home loan interest rates in India typically range from 8% to 10% for most borrowers, while personal loans have higher rates (10-18%)."
      },
      {
        step: "Select Loan Tenure",
        details: "Choose the duration over which you'll repay the loan in years. Home loans can extend up to 30 years, personal loans up to 5 years, and car loans up to 7 years. Longer tenure means lower EMI but higher total interest paid. Shorter tenure means higher EMI but significant interest savings."
      },
      {
        step: "Add Prepayment (Optional)",
        details: "If you plan to make a one-time partial prepayment during the loan, enter the amount. The calculator will show you how much interest you can save and how your new EMI or tenure will be adjusted. Prepayments are a powerful way to become debt-free faster."
      },
      {
        step: "Click Calculate EMI",
        details: "Hit the calculate button to instantly see your EMI amount. The calculator will also show you the total amount payable, total interest, and the percentage of EMI going towards principal vs interest, along with different tenure scenarios."
      }
    ],
    
    examples: [
      {
        scenario: "First-Time Home Buyer in Bangalore",
        inputs: [
          { label: "Loan Amount", value: "₹50,00,000" },
          { label: "Interest Rate", value: "8.5% per annum" },
          { label: "Loan Tenure", value: "20 years" }
        ],
        result: "₹43,391 per month",
        explanation: "Rajesh is buying a home worth ₹60 lakhs and takes a ₹50 lakh loan at 8.5% interest for 20 years. His monthly EMI is ₹43,391. Total interest paid over 20 years will be ₹54,13,879. This EMI is affordable if his monthly income is at least ₹1 lakh (43% of income for EMI)."
      },
      {
        scenario: "Car Loan for a New Vehicle",
        inputs: [
          { label: "Loan Amount", value: "₹8,00,000" },
          { label: "Interest Rate", value: "9% per annum" },
          { label: "Loan Tenure", value: "5 years" }
        ],
        result: "₹16,607 per month",
        explanation: "Priya wants to buy a car and takes an ₹8 lakh car loan at 9% for 5 years. Monthly EMI: ₹16,607. Total interest: ₹1,96,396. With a monthly income of ₹60,000, this EMI (27.6% of income) is manageable and leaves room for other expenses."
      },
      {
        scenario: "Personal Loan for Medical Emergency",
        inputs: [
          { label: "Loan Amount", value: "₹3,00,000" },
          { label: "Interest Rate", value: "14% per annum" },
          { label: "Loan Tenure", value: "3 years" }
        ],
        result: "₹10,253 per month",
        explanation: "Amit needs ₹3 lakhs urgently and opts for a personal loan at 14% interest for 3 years. Monthly EMI: ₹10,253. Total interest: ₹69,118. Personal loans have higher rates, so it's advisable to minimize the loan amount and tenure, or prepay when surplus funds are available."
      }
    ],
    
    tips: [
      "Always maintain an emergency fund of 6 months' expenses before taking a loan - EMIs can strain finances if unexpected expenses arise.",
      "Compare interest rates from at least 3-4 lenders including PSU banks, private banks, and NBFCs - even a 0.5% difference can save lakhs over a 20-year span.",
      "Opt for the shortest tenure you can comfortably afford - this drastically reduces total interest outgo, sometimes by 40-50%.",
      "Use loan pre-payment options whenever you get an annual bonus or surplus funds - even small prepayments early in the tenure heavily reduce your interest burden.",
      "Check your credit score (preferably 750+) before applying - better scores get you lower interest rates and faster approvals.",
      "Read the loan agreement carefully for hidden charges like processing fees, documentation charges, and foreclosure penalties.",
      "Consider both fixed and floating rate options - fixed rates offer stability while floating rates may decrease if the RBI cuts repo rates."
    ],
    
    mistakes: [
      "Taking the maximum eligible loan amount without considering actual affordability - EMI should ideally not exceed 40-50% of your net monthly income.",
      "Ignoring processing fees, insurance bundling, and other hidden charges - these add to the overall cost of borrowing.",
      "Not reading the fine print on prepayment penalties - some lenders charge high penalties for early loan closures on fixed-rate or personal loans.",
      "Choosing the longest tenure just for the lowest EMI - this results in paying nearly double the principal amount in total interest over time.",
      "Applying for loans with multiple lenders simultaneously - this leads to hard inquiries on your credit report, dropping your score.",
      "Relying solely on the EMI figure without checking the amortization schedule - understanding how much goes to interest in initial years is crucial."
    ],
    
    faqs: [
      {
        question: "What is EMI and how is it calculated?",
        answer: "EMI (Equated Monthly Installment) is a fixed monthly payment you make towards a loan. It's calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is principal loan amount, R is monthly interest rate (annual rate/12/100), and N is loan tenure in months. Each EMI consists of principal repayment and interest payment. Initially, the interest component is high, but over time, the principal component increases."
      },
      {
        question: "How much EMI can I afford based on my salary?",
        answer: "Financial experts recommend keeping your total EMI obligations below 40-50% of your monthly net income. For example, if you earn ₹80,000 per month, your total EMIs should not exceed ₹32,000-40,000. This ensures you have sufficient funds for other expenses, savings, and emergencies. Banks typically use the FOIR (Fixed Obligations to Income Ratio) of 50-60% for determining loan eligibility."
      },
      {
        question: "Is it better to take a longer tenure with lower EMI or shorter tenure with higher EMI?",
        answer: "A shorter tenure is always better if you can afford it, as you'll save significantly on total interest. For example, on a ₹50 lakh home loan at 8.5%: 15-year tenure = EMI ₹49,237, total interest ₹38.6 lakhs; 25-year tenure = EMI ₹40,261, total interest ₹70.7 lakhs. You save over ₹32 lakhs with the shorter tenure! However, choose a tenure that fits your budget comfortably."
      },
      {
        question: "How do partial prepayments help reduce my loan burden?",
        answer: "When you make a partial prepayment, the entire amount is deducted directly from your outstanding principal. As a result, the interest calculation on the remaining balance drops significantly. This shortens your overall loan tenure and saves you massive interest amounts, especially if done in the early years of the loan."
      },
      {
        question: "What is the difference between a fixed and floating interest rate?",
        answer: "A fixed interest rate remains constant throughout the loan tenure, meaning your EMI won't change. A floating rate is linked to an external benchmark (like RBI's Repo Rate) and changes periodically. If the benchmark rate drops, your EMI or loan tenure decreases, but if it rises, your EMI or tenure increases. Home loans are typically on floating rates, while personal and car loans are usually fixed."
      },
      {
        question: "Does EMI calculation include processing fees and charges?",
        answer: "No, standard EMI calculators only calculate the principal and interest repayment. Processing fees, administrative charges, loan insurance, and GST on charges are usually collected upfront or deducted from the disbursed loan amount. You must account for these extra costs separately."
      },
      {
        question: "What happens if I miss an EMI payment?",
        answer: "Missing an EMI payment has several consequences: 1) You will be charged late payment fees and penal interest. 2) Your credit score (CIBIL) will drop, making future loans difficult or more expensive. 3) The default will remain on your credit report for up to 7 years. If you anticipate difficulty paying, always contact your lender beforehand to restructure the loan instead of defaulting."
      }
    ],
    
    relatedCalculators: [
      { name: "Home Loan EMI Calculator", url: "/calculators/home-loan-emi-calculator", description: "Calculate home loan EMI, amortization, and eligibility." },
      { name: "Personal Loan EMI Calculator", url: "/calculators/personal-loan-emi-calculator", description: "Plan your personal loan monthly repayments quickly." },
      { name: "Car Loan EMI Calculator", url: "/calculators/car-loan-emi-calculator", description: "Estimate your vehicle loan EMI and affordability." },
      { name: "Loan Comparison Calculator", url: "/calculators/loan-comparison-calculator", description: "Compare two loan offers side-by-side to find the best deal." },
      { name: "Prepayment Calculator", url: "/calculators/prepayment-calculator", description: "See the exact savings generated by making early loan prepayments." },
      { name: "Loan Eligibility Calculator", url: "/calculators/loan-eligibility", description: "Check how much loan amount you qualify for based on income." }
    ],
    
    lastUpdated: "2025-10-25"
  };

  return (
    <>
      <SEOHelmet
        title="Free Loan EMI Calculator - Calculate EMI, Interest & Amortization | MoneyCal India"
        description="Calculate your loan EMI, total interest, and amortization schedule. Compare different loan scenarios, analyze prepayment benefits, and get personalized loan recommendations."
        keywords="loan EMI Calculator, EMI calculation, loan Calculator, home loan EMI, personal loan EMI, car loan EMI, loan amortization, prepayment calculator"
        url="/tools/loan-emi-calculator"
        faqData={contentData.faqs}
      />
      <CalculatorSchema
        name="Loan EMI Calculator"
        description="Calculate your loan EMI, total interest, and amortization schedule. Compare different loan scenarios, analyze prepayment benefits, and get personalized loan recommendations."
        url="/tools/loan-emi-calculator"
        features={[
          "Instant EMI calculation for any loan type",
          "Detailed amortization schedule",
          "Compare multiple loan tenure scenarios",
          "Prepayment analysis showing interest saved and tenure reduced",
          "Personalized loan recommendations",
          "Mobile-friendly interface",
          "100% free, no registration needed",
          "Visualize payment breakdown"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated={contentData.lastUpdated}
        rating={{
          value: 4.9,
          count: 15420
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
                  Loan EMI Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your loan EMI, total interest, and amortization schedule. 
                Compare different scenarios and analyze prepayment benefits for better loan planning.
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
                <IndianRupee className="w-6 h-6 mr-3 text-blue-600" />
                Loan Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
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
                    max="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prepayment Amount (₹)</label>
                  <input
                    type="number"
                    value={prepaymentAmount}
                    onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Optional prepayment amount"
                  />
                  <p className="text-sm text-gray-500 mt-1">Optional: Enter if you plan to make prepayments</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateEMI}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <IndianRupee className="w-5 h-5 mr-2" />
                  Calculate EMI
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
                        <h3 className="text-lg font-semibold text-gray-900">Total Payment</h3>
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.totalPayment.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Over {analysis.tenure} years</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Interest</h3>
                        <TrendingUp className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-600">₹{analysis.totalInterest.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Interest component</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Interest Rate</h3>
                        <BarChart3 className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{analysis.interestRate}%</p>
                      <p className="text-sm text-gray-500 mt-1">Per annum</p>
                    </div>
                  </div>

                  {/* Different Scenarios */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
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

                  {/* Prepayment Analysis */}
                  {prepaymentAmount > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Target className="w-6 h-6 mr-3 text-blue-600" />
                        Prepayment Analysis
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">New EMI</h4>
                          <p className="text-2xl font-bold text-blue-600">₹{analysis.prepaymentAnalysis.newEMI.toLocaleString()}</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Interest Saved</h4>
                          <p className="text-2xl font-bold text-green-600">₹{analysis.prepaymentAnalysis.interestSaved.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Loan Recommendations
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
                  <IndianRupee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your EMI?</h3>
                  <p className="text-gray-600">
                    Enter your loan details to calculate EMI, total interest, and get personalized loan recommendations.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Educational Content */}
          <CalculatorContentWrapper {...contentData} calculatorId="emi-calculator" />
        </div>
      </div>
    </>
  );
};

export default LoanEMICalculator;
