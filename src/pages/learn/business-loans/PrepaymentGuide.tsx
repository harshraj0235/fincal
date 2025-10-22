import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../components/learn/LearnLayout';

const PrepaymentGuide: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [prepaymentAmount, setPrepaymentAmount] = useState('');
  const [prepaymentMonth, setPrepaymentMonth] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculatePrepayment = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const time = parseInt(tenure) || 0;
    const prepay = parseFloat(prepaymentAmount) || 0;
    const prepayMonth = parseInt(prepaymentMonth) || 0;

    if (principal > 0 && rate > 0 && time > 0) {
      // Calculate EMI without prepayment
      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const totalPayment = emi * time;
      const totalInterest = totalPayment - principal;

      // Calculate with prepayment
      let newPrincipal = principal;
      let newTenure = time;
      let interestSaved = 0;

      if (prepay > 0 && prepayMonth > 0 && prepayMonth < time) {
        // Calculate outstanding after prepayment month
        for (let i = 0; i < prepayMonth; i++) {
          const interest = newPrincipal * rate;
          const principalPaid = emi - interest;
          newPrincipal -= principalPaid;
        }
        
        // After prepayment
        newPrincipal -= prepay;
        
        // Calculate new tenure
        newTenure = Math.ceil(Math.log(emi / (emi - newPrincipal * rate)) / Math.log(1 + rate));
        
        const newTotalPayment = (emi * prepayMonth) + prepay + (emi * newTenure);
        const newTotalInterest = newTotalPayment - principal;
        interestSaved = totalInterest - newTotalInterest;
      }

      setResult({
        originalEMI: Math.round(emi),
        originalTenure: time,
        originalInterest: Math.round(totalInterest),
        newTenure: prepay > 0 ? prepayMonth + newTenure : time,
        interestSaved: Math.round(interestSaved),
        tenureReduced: prepay > 0 ? time - (prepayMonth + newTenure) : 0
      });
    }
  };

  const lessonData = {
    title: "Business Loan Prepayment Guide - व्यापारिक ऋण पूर्व भुगतान गाइड",
    category: "business-loans",
    currentLesson: "prepayment-guide",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Business Loans", url: "/learn/business-loans" },
      { name: "Prepayment Guide", url: "/learn/business-loans/prepayment-guide" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Business Loan Prepayment Guide 2024 - Prepayment Charges, Benefits & Calculator | MoneyCal</title>
        <meta name="description" content="Complete guide to business loan prepayment in India. Learn about prepayment charges, benefits, strategies, tax implications, and use our prepayment calculator to save on interest." />
        <meta name="keywords" content="business loan prepayment, prepayment charges, prepayment calculator, early loan repayment, business loan foreclosure, prepayment benefits, interest savings" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Business Loan Prepayment Guide",
            "description": "Learn how to prepay business loan and save on interest",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Calculate Prepayment Benefits",
                "text": "Use prepayment calculator to determine interest savings"
              },
              {
                "@type": "HowToStep",
                "name": "Check Prepayment Charges",
                "text": "Review your loan agreement for prepayment penalties"
              },
              {
                "@type": "HowToStep",
                "name": "Choose Prepayment Strategy",
                "text": "Decide between partial prepayment and full foreclosure"
              }
            ]
          })}
        </script>
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Business Loan Prepayment Guide
              <span className="block text-xl mt-2 text-teal-100">व्यापारिक ऋण पूर्व भुगतान गाइड</span>
            </h1>
            <p className="text-lg text-teal-100">
              Learn everything about business loan prepayment, foreclosure, charges, and strategies to save on interest. 
              Use our calculator to estimate your savings.
            </p>
          </div>

          {/* Prepayment Calculator */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Prepayment Savings Calculator / पूर्व भुगतान बचत कैलकुलेटर</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount / ऋण राशि (₹)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate / ब्याज दर (% p.a.)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="Enter interest rate"
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure / ऋण अवधि (Months)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="Enter tenure"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prepayment Amount / पूर्व भुगतान राशि (₹)
                </label>
                <input
                  type="number"
                  value={prepaymentAmount}
                  onChange={(e) => setPrepaymentAmount(e.target.value)}
                  placeholder="Enter prepayment amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prepayment After (Months) / कितने महीने बाद (माह)
                </label>
                <input
                  type="number"
                  value={prepaymentMonth}
                  onChange={(e) => setPrepaymentMonth(e.target.value)}
                  placeholder="Enter month number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={calculatePrepayment}
              className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors"
            >
              Calculate Savings / बचत की गणना करें
            </button>

            {result && (
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-teal-800">Interest Saved</h3>
                    <div className="text-2xl font-bold text-teal-600">₹{result.interestSaved.toLocaleString()}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-blue-800">Tenure Reduced</h3>
                    <div className="text-2xl font-bold text-blue-600">{result.tenureReduced} Months</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-green-800">New Tenure</h3>
                    <div className="text-2xl font-bold text-green-600">{result.newTenure} Months</div>
                  </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Actual savings may vary based on prepayment charges, loan type, and bank policies. 
                    This calculator provides an estimate only.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* What is Prepayment */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              What is Business Loan Prepayment? / व्यापारिक ऋण पूर्व भुगतान क्या है?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Prepayment / पूर्व भुगतान</h3>
                <p className="text-gray-700 mb-4">
                  Business loan prepayment refers to paying off your business loan (partially or fully) before the scheduled tenure ends. 
                  This helps reduce the total interest burden and can free up credit for future needs.
                </p>
                <p className="text-gray-700">
                  व्यापारिक ऋण पूर्व भुगतान का मतलब है निर्धारित अवधि समाप्त होने से पहले अपने व्यापारिक ऋण को (आंशिक या पूर्ण रूप से) चुकाना। 
                  इससे कुल ब्याज बोझ कम होता है और भविष्य की जरूरतों के लिए क्रेडिट मुक्त हो जाता है।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Partial Prepayment / आंशिक पूर्व भुगतान</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Pay lump sum amount towards principal / मूलधन के लिए एकमुश्त राशि का भुगतान</li>
                    <li>• Reduces outstanding principal balance</li>
                    <li>• Either reduces EMI or shortens tenure</li>
                    <li>• Can be done multiple times during loan tenure</li>
                    <li>• Minimum amount varies by bank (₹1-5 lakh)</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Full Foreclosure / पूर्ण समापन</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Pay entire outstanding loan at once / एक साथ पूरे बकाया ऋण का भुगतान</li>
                    <li>• Closes the loan account completely</li>
                    <li>• No further EMIs required</li>
                    <li>• Collateral released (if any)</li>
                    <li>• May attract foreclosure charges</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits of Prepayment */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Benefits of Business Loan Prepayment / व्यापारिक ऋण पूर्व भुगतान के लाभ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Benefits / वित्तीय लाभ</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Interest Savings / ब्याज बचत</h4>
                      <p className="text-gray-600 text-sm">Reduce total interest outgo significantly by paying off principal early</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Reduced Debt Burden / ऋण बोझ कम</h4>
                      <p className="text-gray-600 text-sm">Lower monthly EMI or shorter loan tenure frees up cash flow</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Improved Cash Flow / बेहतर नकदी प्रवाह</h4>
                      <p className="text-gray-600 text-sm">More funds available for business operations and growth</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Strategic Benefits / रणनीतिक लाभ</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Credit Score Improvement / क्रेडिट स्कोर सुधार</h4>
                      <p className="text-gray-600 text-sm">Demonstrates financial discipline and improves creditworthiness</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Collateral Release / जमानत मुक्त</h4>
                      <p className="text-gray-600 text-sm">Get back pledged assets for future use or additional financing</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Debt-Free Status / ऋण-मुक्त स्थिति</h4>
                      <p className="text-gray-600 text-sm">Psychological relief and better financial health for business</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prepayment Charges */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Prepayment Charges / पूर्व भुगतान शुल्क
            </h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-3">RBI Guidelines on Prepayment / पूर्व भुगतान पर RBI दिशानिर्देश</h3>
              <p className="text-gray-700 mb-4">
                As per RBI guidelines effective from May 2019, banks cannot charge prepayment or foreclosure charges on business loans with floating interest rates. 
                However, fixed-rate loans may attract prepayment charges as per loan agreement.
              </p>
              <p className="text-gray-700">
                मई 2019 से प्रभावी RBI दिशानिर्देशों के अनुसार, बैंक फ्लोटिंग ब्याज दर वाले व्यापारिक ऋणों पर पूर्व भुगतान या फोरक्लोजर शुल्क नहीं ले सकते हैं। 
                हालांकि, निश्चित दर ऋणों पर ऋण समझौते के अनुसार पूर्व भुगतान शुल्क लग सकता है।
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Loan Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Prepayment Charges</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Lock-in Period</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Floating Rate Loan</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">NIL / शून्य</td>
                    <td className="border border-gray-300 px-4 py-3">None / कोई नहीं</td>
                    <td className="border border-gray-300 px-4 py-3">As per RBI guidelines</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Fixed Rate Loan</td>
                    <td className="border border-gray-300 px-4 py-3 text-red-600">2-5% of outstanding</td>
                    <td className="border border-gray-300 px-4 py-3">6-12 months</td>
                    <td className="border border-gray-300 px-4 py-3">Check loan agreement</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Working Capital Loan</td>
                    <td className="border border-gray-300 px-4 py-3">NIL / शून्य</td>
                    <td className="border border-gray-300 px-4 py-3">None / कोई नहीं</td>
                    <td className="border border-gray-300 px-4 py-3">Usually floating rate</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Term Loan</td>
                    <td className="border border-gray-300 px-4 py-3">Varies / अलग-अलग</td>
                    <td className="border border-gray-300 px-4 py-3">3-6 months</td>
                    <td className="border border-gray-300 px-4 py-3">Depends on rate type</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Typical Prepayment Charges Structure</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Within 6 months: 5% of outstanding principal</li>
                  <li>• 6-12 months: 3% of outstanding principal</li>
                  <li>• 12-24 months: 2% of outstanding principal</li>
                  <li>• After 24 months: 1% or NIL</li>
                </ul>
                <p className="text-xs text-blue-600 mt-3">* Applies only to fixed-rate loans</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">How to Avoid Prepayment Charges</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Choose floating rate business loans</li>
                  <li>• Wait for lock-in period to end</li>
                  <li>• Negotiate waiver during loan sanction</li>
                  <li>• Make prepayment from own sources (not refinancing)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prepayment Strategies */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Smart Prepayment Strategies / स्मार्ट पूर्व भुगतान रणनीतियाँ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">When to Prepay / कब पूर्व भुगतान करें</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">When you have surplus business profits / जब आपके पास अधिशेष व्यापार लाभ है</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">During early loan tenure for maximum savings / अधिकतम बचत के लिए शुरुआती ऋण अवधि के दौरान</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">When loan interest rate is higher than investment returns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Before planning major business expansion / बड़े व्यापार विस्तार की योजना से पहले</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">When NOT to Prepay / कब पूर्व भुगतान न करें</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span className="text-gray-700">When prepayment charges are very high / जब पूर्व भुगतान शुल्क बहुत अधिक हो</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span className="text-gray-700">If it depletes emergency business reserves / यदि यह आपातकालीन व्यापार भंडार को समाप्त करता है</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span className="text-gray-700">When you can get higher ROI from business investment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span className="text-gray-700">Near the end of loan tenure (already paid most interest)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prepayment Process */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Business Loan Prepayment Process / व्यापारिक ऋण पूर्व भुगतान प्रक्रिया
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Request Prepayment Quote / पूर्व भुगतान उद्धरण का अनुरोध करें</h3>
                  <p className="text-gray-600 text-sm">
                    Contact your bank and request a prepayment quote. This will include outstanding principal, 
                    accrued interest, and any prepayment charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Review Charges and Calculate Savings / शुल्क समीक्षा करें</h3>
                  <p className="text-gray-600 text-sm">
                    Calculate net savings after deducting prepayment charges. Ensure prepayment is financially beneficial.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Submit Prepayment Request / पूर्व भुगतान अनुरोध जमा करें</h3>
                  <p className="text-gray-600 text-sm">
                    Fill prepayment application form and submit to your bank branch or online portal.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Make Payment / भुगतान करें</h3>
                  <p className="text-gray-600 text-sm">
                    Pay the prepayment amount through cheque, NEFT, RTGS, or online transfer. Keep payment receipt.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Confirmation / पुष्टि प्राप्त करें</h3>
                  <p className="text-gray-600 text-sm">
                    Bank will provide prepayment acknowledgment, updated loan statement, and revised EMI schedule (for partial prepayment) 
                    or loan closure letter (for full foreclosure).
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">6</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Collect Documents / दस्तावेज एकत्र करें</h3>
                  <p className="text-gray-600 text-sm">
                    For full foreclosure, collect No Objection Certificate (NOC), original loan documents, 
                    and collateral release documents (if applicable).
                  </p>
                </div>
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
                  Can I prepay my business loan without any charges?
                </h3>
                <p className="text-gray-600">
                  Yes, if your business loan has a floating interest rate, you can prepay without any charges as per RBI guidelines. 
                  Fixed-rate loans may attract prepayment charges of 2-5% depending on the bank and lock-in period.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Is partial prepayment better than full foreclosure?
                </h3>
                <p className="text-gray-600">
                  Partial prepayment is better if you want to maintain liquidity for business operations while reducing interest burden. 
                  Full foreclosure is ideal if you have sufficient funds and want to completely eliminate the debt obligation.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  When is the best time to prepay a business loan?
                </h3>
                <p className="text-gray-600">
                  The best time to prepay is during the early tenure of your loan (first 2-3 years) when most of your EMI goes towards interest. 
                  Prepaying early maximizes interest savings. Also, prepay when you have surplus business profits and no immediate expansion plans.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Will prepayment improve my credit score?
                </h3>
                <p className="text-gray-600">
                  Yes, prepayment demonstrates financial discipline and responsible credit behavior, which can positively impact your credit score. 
                  It also reduces your debt-to-income ratio, making you more eligible for future loans.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How long does it take to process business loan prepayment?
                </h3>
                <p className="text-gray-600">
                  Prepayment processing typically takes 7-15 days. After payment, the bank updates your loan account, issues acknowledgment, 
                  and provides revised documents. For full foreclosure, collateral release (if any) may take additional 15-30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default PrepaymentGuide;
