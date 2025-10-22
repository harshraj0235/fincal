import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../../components/learn/LearnLayout';

const EligibilityCalculator: React.FC = () => {
  const [businessType, setBusinessType] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [businessAge, setBusinessAge] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [existingLoans, setExistingLoans] = useState('');
  const [collateral, setCollateral] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateEligibility = () => {
    const revenue = parseFloat(annualRevenue) || 0;
    const age = parseInt(businessAge) || 0;
    const score = parseInt(creditScore) || 0;
    const loans = parseFloat(existingLoans) || 0;
    const collateralValue = parseFloat(collateral) || 0;

    let eligibilityScore = 0;
    let maxLoanAmount = 0;
    let recommendations: string[] = [];

    // Business Type Scoring
    switch (businessType) {
      case 'manufacturing':
        eligibilityScore += 25;
        break;
      case 'trading':
        eligibilityScore += 20;
        break;
      case 'services':
        eligibilityScore += 15;
        break;
      case 'startup':
        eligibilityScore += 5;
        break;
      default:
        eligibilityScore += 10;
    }

    // Revenue Scoring
    if (revenue >= 10000000) {
      eligibilityScore += 30;
      maxLoanAmount = revenue * 0.3;
    } else if (revenue >= 5000000) {
      eligibilityScore += 25;
      maxLoanAmount = revenue * 0.25;
    } else if (revenue >= 1000000) {
      eligibilityScore += 20;
      maxLoanAmount = revenue * 0.2;
    } else if (revenue >= 500000) {
      eligibilityScore += 15;
      maxLoanAmount = revenue * 0.15;
    } else {
      eligibilityScore += 10;
      maxLoanAmount = revenue * 0.1;
    }

    // Business Age Scoring
    if (age >= 5) {
      eligibilityScore += 20;
    } else if (age >= 3) {
      eligibilityScore += 15;
    } else if (age >= 1) {
      eligibilityScore += 10;
    } else {
      eligibilityScore += 5;
      recommendations.push('बिजनेस को कम से कम 1 साल का ट्रैक रिकॉर्ड बनाने की सलाह दी जाती है');
    }

    // Credit Score Scoring
    if (score >= 750) {
      eligibilityScore += 20;
    } else if (score >= 700) {
      eligibilityScore += 15;
    } else if (score >= 650) {
      eligibilityScore += 10;
    } else {
      eligibilityScore += 5;
      recommendations.push('CIBIL स्कोर सुधारने के लिए समय पर EMI भरें और क्रेडिट यूटिलाइजेशन कम रखें');
    }

    // Existing Loans Impact
    if (loans > revenue * 0.4) {
      eligibilityScore -= 15;
      recommendations.push('मौजूदा लोन का बोझ कम करें - DTI ratio 40% से कम रखें');
    }

    // Collateral Bonus
    if (collateralValue > 0) {
      eligibilityScore += 10;
      maxLoanAmount += collateralValue * 0.7;
    }

    // Generate recommendations
    if (eligibilityScore < 50) {
      recommendations.push('बिजनेस प्लान को मजबूत बनाएं और फाइनेंशियल डॉक्यूमेंट्स तैयार करें');
      recommendations.push('कुछ महीनों तक नियमित रेवेन्यू बनाए रखें');
    }

    if (businessType === 'startup') {
      recommendations.push('स्टार्टअप के लिए सरकारी स्कीम्स जैसे MUDRA या SIDBI का लाभ उठाएं');
    }

    setResult({
      eligibilityScore: Math.max(0, Math.min(100, eligibilityScore)),
      maxLoanAmount: Math.round(maxLoanAmount),
      recommendations,
      businessType,
      annualRevenue: revenue,
      businessAge: age
    });
  };

  const lessonData = {
    title: "Business Loan Eligibility Calculator - व्यापारिक ऋण पात्रता कैलकुलेटर",
    category: "business-loans",
    currentLesson: "eligibility-calculator",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Business Loans", url: "/learn/business-loans" },
      { name: "Eligibility Calculator", url: "/learn/business-loans/eligibility-calculator" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Business Loan Eligibility Calculator 2024 - Check Your Business Loan Eligibility Online | MoneyCal</title>
        <meta name="description" content="Calculate your business loan eligibility instantly. Check maximum loan amount, eligibility score, and get personalized recommendations for business loans in India. Free online calculator." />
        <meta name="keywords" content="business loan eligibility calculator, business loan eligibility check, maximum business loan amount, business loan requirements, MSME loan eligibility, startup loan eligibility" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Business Loan Eligibility Calculator",
            "description": "Calculate your business loan eligibility and maximum loan amount",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Enter Business Details",
                "text": "Fill in your business type, annual revenue, and business age"
              },
              {
                "@type": "HowToStep", 
                "name": "Add Financial Information",
                "text": "Enter credit score, existing loans, and collateral value"
              },
              {
                "@type": "HowToStep",
                "name": "Get Eligibility Results",
                "text": "View your eligibility score and maximum loan amount"
              }
            ]
          })}
        </script>
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Business Loan Eligibility Calculator
              <span className="block text-xl mt-2 text-blue-100">व्यापारिक ऋण पात्रता कैलकुलेटर</span>
            </h1>
            <p className="text-lg text-blue-100">
              Instantly check your business loan eligibility and get personalized recommendations. 
              Calculate maximum loan amount based on your business profile and financial health.
            </p>
          </div>

          {/* Calculator Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Business Loan Eligibility Calculator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type / व्यापार का प्रकार
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Business Type</option>
                  <option value="manufacturing">Manufacturing / विनिर्माण</option>
                  <option value="trading">Trading / व्यापार</option>
                  <option value="services">Services / सेवाएं</option>
                  <option value="startup">Startup / स्टार्टअप</option>
                  <option value="retail">Retail / खुदरा</option>
                  <option value="wholesale">Wholesale / थोक</option>
                </select>
              </div>

              {/* Annual Revenue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue / वार्षिक आय (₹)
                </label>
                <input
                  type="number"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(e.target.value)}
                  placeholder="Enter annual revenue"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Business Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Age / व्यापार की आयु (Years)
                </label>
                <input
                  type="number"
                  value={businessAge}
                  onChange={(e) => setBusinessAge(e.target.value)}
                  placeholder="Years in business"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Credit Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Score / क्रेडिट स्कोर
                </label>
                <input
                  type="number"
                  value={creditScore}
                  onChange={(e) => setCreditScore(e.target.value)}
                  placeholder="CIBIL/Experian score"
                  min="300"
                  max="900"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Existing Loans */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing Loan EMI / मौजूदा ऋण EMI (₹/month)
                </label>
                <input
                  type="number"
                  value={existingLoans}
                  onChange={(e) => setExistingLoans(e.target.value)}
                  placeholder="Monthly EMI payments"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Collateral Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collateral Value / जमानत की कीमत (₹)
                </label>
                <input
                  type="number"
                  value={collateral}
                  onChange={(e) => setCollateral(e.target.value)}
                  placeholder="Property/asset value"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={calculateEligibility}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mt-6"
            >
              Calculate Eligibility / पात्रता की गणना करें
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Eligibility Results / पात्रता परिणाम</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Eligibility Score */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl text-center">
                  <h3 className="text-lg font-semibold mb-2">Eligibility Score</h3>
                  <div className="text-4xl font-bold">{result.eligibilityScore}%</div>
                  <p className="text-green-100 mt-2">
                    {result.eligibilityScore >= 70 ? 'Excellent' : 
                     result.eligibilityScore >= 50 ? 'Good' : 'Needs Improvement'}
                  </p>
                </div>

                {/* Max Loan Amount */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center">
                  <h3 className="text-lg font-semibold mb-2">Max Loan Amount</h3>
                  <div className="text-4xl font-bold">₹{result.maxLoanAmount.toLocaleString()}</div>
                  <p className="text-blue-100 mt-2">Based on your profile</p>
                </div>

                {/* Business Type */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl text-center">
                  <h3 className="text-lg font-semibold mb-2">Business Type</h3>
                  <div className="text-2xl font-bold capitalize">{result.businessType}</div>
                  <p className="text-purple-100 mt-2">{result.businessAge} years old</p>
                </div>
              </div>

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                    Recommendations / सुझाव
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        <span className="text-yellow-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Business Loan Eligibility Factors */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Business Loan Eligibility Factors / व्यापारिक ऋण पात्रता के कारक
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Primary Factors / मुख्य कारक</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Business Revenue / व्यापारिक आय</h4>
                      <p className="text-gray-600 text-sm">Minimum ₹5 lakh annual revenue for most lenders</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Business Age / व्यापार की आयु</h4>
                      <p className="text-gray-600 text-sm">Minimum 1-2 years of business operations</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Credit Score / क्रेडिट स्कोर</h4>
                      <p className="text-gray-600 text-sm">Minimum 650+ CIBIL score preferred</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Secondary Factors / द्वितीयक कारक</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-orange-100 text-orange-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Debt-to-Income Ratio / ऋण-आय अनुपात</h4>
                      <p className="text-gray-600 text-sm">Should be below 40% of monthly income</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-100 text-red-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Collateral / जमानत</h4>
                      <p className="text-gray-600 text-sm">Property or assets as security (optional)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-indigo-100 text-indigo-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Business Type / व्यापार का प्रकार</h4>
                      <p className="text-gray-600 text-sm">Manufacturing and trading preferred</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility by Business Type */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Eligibility by Business Type / व्यापार प्रकार के अनुसार पात्रता
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Business Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Min Revenue</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Min Age</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Max Loan</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Interest Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Manufacturing / विनिर्माण</td>
                    <td className="border border-gray-300 px-4 py-3">₹10 Lakh</td>
                    <td className="border border-gray-300 px-4 py-3">1 Year</td>
                    <td className="border border-gray-300 px-4 py-3">₹2 Crore</td>
                    <td className="border border-gray-300 px-4 py-3">8.5% - 15%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Trading / व्यापार</td>
                    <td className="border border-gray-300 px-4 py-3">₹5 Lakh</td>
                    <td className="border border-gray-300 px-4 py-3">1 Year</td>
                    <td className="border border-gray-300 px-4 py-3">₹1 Crore</td>
                    <td className="border border-gray-300 px-4 py-3">9% - 16%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Services / सेवाएं</td>
                    <td className="border border-gray-300 px-4 py-3">₹3 Lakh</td>
                    <td className="border border-gray-300 px-4 py-3">2 Years</td>
                    <td className="border border-gray-300 px-4 py-3">₹50 Lakh</td>
                    <td className="border border-gray-300 px-4 py-3">10% - 18%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Startup / स्टार्टअप</td>
                    <td className="border border-gray-300 px-4 py-3">₹1 Lakh</td>
                    <td className="border border-gray-300 px-4 py-3">6 Months</td>
                    <td className="border border-gray-300 px-4 py-3">₹25 Lakh</td>
                    <td className="border border-gray-300 px-4 py-3">12% - 20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips to Improve Eligibility */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tips to Improve Business Loan Eligibility / व्यापारिक ऋण पात्रता बेहतर बनाने के टिप्स
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Health / वित्तीय स्वास्थ्य</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain regular business bank statements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Keep debt-to-income ratio below 40%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Show consistent revenue growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain good credit score (650+)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Documentation / दस्तावेजीकरण</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Prepare detailed business plan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain proper bookkeeping records</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">File ITR returns on time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Keep GST registration updated</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Government Schemes */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Government Business Loan Schemes / सरकारी व्यापारिक ऋण योजनाएं
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">MUDRA Loan / मुद्रा ऋण</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Loan amount: ₹50,000 - ₹10 Lakh</li>
                  <li>• Interest rate: 8.5% - 12%</li>
                  <li>• No collateral required</li>
                  <li>• For micro and small enterprises</li>
                </ul>
                <a href="https://www.mudra.org.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Learn more →
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">SIDBI Loan / सिडबी ऋण</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Loan amount: ₹10 Lakh - ₹5 Crore</li>
                  <li>• Interest rate: 7.5% - 10%</li>
                  <li>• Collateral may be required</li>
                  <li>• For MSME sector</li>
                </ul>
                <a href="https://www.sidbi.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Learn more →
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Stand-Up India / स्टैंड-अप इंडिया</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Loan amount: ₹10 Lakh - ₹1 Crore</li>
                  <li>• Interest rate: 8.5% - 10%</li>
                  <li>• For SC/ST/Women entrepreneurs</li>
                  <li>• Greenfield projects only</li>
                </ul>
                <a href="https://www.standupmitra.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Learn more →
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">PSB Loans in 59 Minutes / 59 मिनट में ऋण</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Loan amount: ₹1 Lakh - ₹5 Crore</li>
                  <li>• Interest rate: 8.5% - 12%</li>
                  <li>• Quick approval process</li>
                  <li>• Online application</li>
                </ul>
                <a href="https://www.psbloansin59minutes.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Learn more →
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions / अक्सर पूछे जाने वाले प्रश्न
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What is the minimum business age for a business loan?
                </h3>
                <p className="text-gray-600">
                  Most banks require a minimum business age of 1-2 years. However, some lenders offer loans to businesses as young as 6 months, especially for startups with strong business plans.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I get a business loan without collateral?
                </h3>
                <p className="text-gray-600">
                  Yes, many banks offer unsecured business loans up to ₹50 lakh without collateral. However, secured loans typically offer lower interest rates and higher loan amounts.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How is business loan eligibility calculated?
                </h3>
                <p className="text-gray-600">
                  Eligibility is calculated based on business revenue, age, credit score, existing debt, and business type. Banks typically offer 15-30% of annual revenue as loan amount.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What documents are required for business loan eligibility?
                </h3>
                <p className="text-gray-600">
                  Required documents include business registration, bank statements, ITR returns, GST registration, business plan, and financial statements. The exact requirements vary by lender.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I improve my business loan eligibility?
                </h3>
                <p className="text-gray-600">
                  Yes, you can improve eligibility by maintaining good credit score, reducing existing debt, showing consistent revenue growth, and providing proper documentation. Consider government schemes like MUDRA for better terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default EligibilityCalculator;
