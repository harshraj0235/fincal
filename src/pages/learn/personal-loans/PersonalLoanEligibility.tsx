import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, User, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const PersonalLoanEligibility: React.FC = () => {
  // Calculator State
  const [monthlyIncome, setMonthlyIncome] = useState<string>('80000');
  const [coApplicantIncome, setCoApplicantIncome] = useState<string>('0');
  const [existingEMI, setExistingEMI] = useState<string>('15000');
  const [interestRate, setInterestRate] = useState<string>('13');
  const [loanTenure, setLoanTenure] = useState<string>('3');
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
    const rate = parseFloat(interestRate) || 13;
    const tenure = parseInt(loanTenure) || 3;

    const totalIncome = income + coIncome;
    
    // Maximum EMI = 50% of gross income (bank's FOIR - Fixed Obligation to Income Ratio)
    const maxEMI = (totalIncome * 0.5) - emi;
    
    if (maxEMI <= 0) {
      setEligibleAmount(0);
      setMonthlyEMI(0);
      setMaxLoanByIncome(0);
      return;
    }

    // Calculate loan amount using EMI formula
    const monthlyRate = rate / (12 * 100);
    const emiMultiplier = (monthlyRate * Math.pow(1 + monthlyRate, tenure * 12)) / 
                         (Math.pow(1 + monthlyRate, tenure * 12) - 1);
    
    const loanAmount = maxEMI / emiMultiplier;
    
    setEligibleAmount(Math.round(loanAmount));
    setMonthlyEMI(Math.round(maxEMI));
    setMaxLoanByIncome(Math.round(loanAmount));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getEligibilityStatus = () => {
    if (eligibleAmount >= 500000) return { status: 'Excellent', color: 'green', icon: CheckCircle };
    if (eligibleAmount >= 200000) return { status: 'Good', color: 'blue', icon: CheckCircle };
    if (eligibleAmount >= 100000) return { status: 'Fair', color: 'yellow', icon: AlertCircle };
    return { status: 'Low', color: 'red', icon: AlertCircle };
  };

  const eligibilityInfo = getEligibilityStatus();
  const EligibilityIcon = eligibilityInfo.icon;

  return (
    <>
      <SEOHelmet
        title="Personal Loan Eligibility Calculator: Check How Much You Can Get 2025 | MoneyCal"
        description="Calculate your personal loan eligibility instantly! Check loan amount, EMI, and approval chances. Free calculator with real-time results for Indian borrowers."
        keywords="personal loan eligibility calculator, personal loan eligibility check, how much personal loan can I get, personal loan EMI calculator, loan eligibility India"
        canonicalUrl="https://moneycal.in/learn/personal-loans/personal-loan-eligibility"
      />
      
      <LearnLayout
        title="Personal Loan Eligibility Calculator"
        description="Calculate how much personal loan you can get and your EMI! 📊"
        category="Personal Loans"
        difficulty="Beginner"
        readTime="10 min read"
        prevLesson={{
          title: 'Types of Personal Loans in India',
          slug: '/learn/personal-loans/types-of-personal-loans'
        }}
        nextLesson={{
          title: 'Interest Rates Explained (11-15%)',
          slug: '/learn/personal-loans/interest-rates-explained'
        }}
      >
        {/* Calculator Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Personal Loan Eligibility Calculator</h2>
            <p className="text-gray-700 text-lg">
              Enter your details to see how much personal loan you're eligible for! Banks typically approve loans where EMI doesn't exceed 50% of your income. 💰
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                Enter Your Details
              </h3>
              
              <div className="space-y-6">
                {/* Monthly Income */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Income (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                    placeholder="80000"
                  />
                  <p className="text-sm text-gray-600 mt-1">Your gross monthly salary/income</p>
                </div>

                {/* Co-Applicant Income */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Co-Applicant Income (₹)
                  </label>
                  <input
                    type="number"
                    value={coApplicantIncome}
                    onChange={(e) => setCoApplicantIncome(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-600 mt-1">Spouse/parent income (if applicable)</p>
                </div>

                {/* Existing EMI */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Existing EMI (₹)
                  </label>
                  <input
                    type="number"
                    value={existingEMI}
                    onChange={(e) => setExistingEMI(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                    placeholder="15000"
                  />
                  <p className="text-sm text-gray-600 mt-1">Current home loan, car loan, personal loan EMIs</p>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                    placeholder="13"
                  />
                  <p className="text-sm text-gray-600 mt-1">Personal loan rates: 11-18% (varies by bank & profile)</p>
                </div>

                {/* Loan Tenure */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Tenure (Years)
                  </label>
                  <select
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                  >
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5">5 Years</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-1">Personal loans: 1-5 years maximum</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Your Eligibility Results
              </h3>
              
              {eligibleAmount > 0 ? (
                <div className="space-y-6">
                  {/* Eligibility Status */}
                  <div className={`bg-${eligibilityInfo.color}-50 border-2 border-${eligibilityInfo.color}-300 rounded-xl p-6`}>
                    <div className="flex items-center mb-3">
                      <EligibilityIcon className={`h-8 w-8 text-${eligibilityInfo.color}-600 mr-3`} />
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900">Eligibility: {eligibilityInfo.status}</h4>
                        <p className={`text-${eligibilityInfo.color}-700`}>
                          {eligibilityInfo.status === 'Excellent' && 'You can get high loan amounts with best rates!'}
                          {eligibilityInfo.status === 'Good' && 'Good eligibility! You can get decent loan amounts.'}
                          {eligibilityInfo.status === 'Fair' && 'Fair eligibility. Consider improving income or reducing existing EMIs.'}
                          {eligibilityInfo.status === 'Low' && 'Low eligibility. Focus on increasing income or clearing existing debts.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Loan Amount */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">Maximum Loan Amount</h4>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {formatCurrency(eligibleAmount)}
                      </div>
                      <p className="text-sm text-gray-600">Based on your income and existing EMIs</p>
                    </div>
                  </div>

                  {/* Monthly EMI */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">Monthly EMI</h4>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(monthlyEMI)}
                      </div>
                      <p className="text-sm text-gray-600">For {loanTenure} years @ {interestRate}%</p>
                    </div>
                  </div>

                  {/* Income Utilization */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">Income Utilization</h4>
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        {Math.round((monthlyEMI / (parseFloat(monthlyIncome) + parseFloat(coApplicantIncome))) * 100)}%
                      </div>
                      <p className="text-sm text-gray-600">of your total monthly income</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-red-800 mb-2">Not Eligible</h4>
                  <p className="text-red-700">
                    Your existing EMIs are too high compared to your income. 
                    Consider reducing existing debts or increasing income.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Eligibility Factors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Affects Your Eligibility?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Positive Factors:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">High Monthly Income</p>
                  <p className="text-sm text-gray-700">₹1L+ monthly income gets better rates and higher amounts</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Low Existing EMIs</p>
                  <p className="text-sm text-gray-700">Less than 30% of income in existing EMIs</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Good CIBIL Score</p>
                  <p className="text-sm text-gray-700">750+ CIBIL score gets best rates and quick approval</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Stable Employment</p>
                  <p className="text-sm text-gray-700">2+ years in same company or business</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-red-900 mb-4 text-xl">❌ Negative Factors:</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">High Existing EMIs</p>
                  <p className="text-sm text-gray-700">More than 50% of income in existing EMIs</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Low CIBIL Score</p>
                  <p className="text-sm text-gray-700">Below 650 CIBIL score reduces eligibility</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Irregular Income</p>
                  <p className="text-sm text-gray-700">Freelancing, commission-based, or unstable income</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Recent Job Change</p>
                  <p className="text-sm text-gray-700">Less than 6 months in current job</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips to Improve Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips to Improve Your Eligibility</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-blue-900 mb-3">Immediate Actions:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Add co-applicant with good income</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Prepay existing high-interest loans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Apply with multiple banks for best rates</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-3">Long-term Strategy:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Improve CIBIL score to 750+</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Increase monthly income through side hustle</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Maintain stable employment for 2+ years</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Banks approve loans where EMI ≤ 50% of gross monthly income</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Higher income + lower existing EMIs = higher loan eligibility</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">CIBIL score 750+ gets best rates and quick approval</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Add co-applicant or prepay existing loans to improve eligibility</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Understand Interest Rates Next! 💰</h2>
          <p className="text-purple-100 mb-6">
            Now that you know your eligibility, let's understand how personal loan interest rates work and how to get the best rates!
          </p>
          <a
            href="/learn/personal-loans/interest-rates-explained"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Interest Rates Explained →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default PersonalLoanEligibility;
