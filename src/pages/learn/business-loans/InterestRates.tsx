import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../../components/learn/LearnLayout';

const InterestRates: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const time = parseInt(tenure) || 0;

    if (principal > 0 && rate > 0 && time > 0) {
      const monthlyRate = rate / (12 * 100);
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) / 
                  (Math.pow(1 + monthlyRate, time) - 1);
      
      const totalPayment = emi * time;
      const totalInterest = totalPayment - principal;

      setResult({
        emi: Math.round(emi),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        principal: principal
      });
    }
  };

  const lessonData = {
    title: "Business Loan Interest Rates 2024 - Compare Business Loan Interest Rates in India | MoneyCal",
    category: "business-loans",
    currentLesson: "interest-rates",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Business Loans", url: "/learn/business-loans" },
      { name: "Interest Rates", url: "/learn/business-loans/interest-rates" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Business Loan Interest Rates 2024 - Compare Business Loan Interest Rates in India | MoneyCal</title>
        <meta name="description" content="Compare business loan interest rates from top banks in India. Get latest interest rates for MSME loans, startup loans, working capital loans, and term loans. Calculate EMI and total interest." />
        <meta name="keywords" content="business loan interest rates, MSME loan interest rates, startup loan rates, working capital loan rates, business loan EMI calculator, business loan comparison" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Business Loan Interest Rates Guide",
            "description": "Complete guide to business loan interest rates and EMI calculation",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Understand Interest Rate Types",
                "text": "Learn about fixed and floating interest rates for business loans"
              },
              {
                "@type": "HowToStep", 
                "name": "Compare Bank Rates",
                "text": "Compare interest rates from different banks and NBFCs"
              },
              {
                "@type": "HowToStep",
                "name": "Calculate EMI",
                "text": "Use EMI calculator to determine monthly payments and total interest"
              }
            ]
          })}
        </script>
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Business Loan Interest Rates 2024
              <span className="block text-xl mt-2 text-purple-100">व्यापारिक ऋण ब्याज दरें 2024</span>
            </h1>
            <p className="text-lg text-purple-100">
              Compare business loan interest rates from top banks and NBFCs in India. 
              Get the latest rates for MSME loans, startup loans, and working capital loans.
            </p>
          </div>

          {/* EMI Calculator */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Business Loan EMI Calculator / व्यापारिक ऋण EMI कैलकुलेटर</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount / ऋण राशि (₹)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure / अवधि (Months)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="Enter tenure"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={calculateEMI}
              className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
            >
              Calculate EMI / EMI की गणना करें
            </button>

            {result && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-purple-800">Monthly EMI</h3>
                  <div className="text-2xl font-bold text-purple-600">₹{result.emi.toLocaleString()}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-blue-800">Total Payment</h3>
                  <div className="text-2xl font-bold text-blue-600">₹{result.totalPayment.toLocaleString()}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-green-800">Total Interest</h3>
                  <div className="text-2xl font-bold text-green-600">₹{result.totalInterest.toLocaleString()}</div>
                </div>
              </div>
            )}
          </div>

          {/* Current Interest Rates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Current Business Loan Interest Rates / वर्तमान व्यापारिक ऋण ब्याज दरें
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bank/NBFC</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">MSME Loan</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Working Capital</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Term Loan</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Startup Loan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">State Bank of India</td>
                    <td className="border border-gray-300 px-4 py-3">8.50% - 12.50%</td>
                    <td className="border border-gray-300 px-4 py-3">9.00% - 13.00%</td>
                    <td className="border border-gray-300 px-4 py-3">8.75% - 12.75%</td>
                    <td className="border border-gray-300 px-4 py-3">10.50% - 14.50%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">HDFC Bank</td>
                    <td className="border border-gray-300 px-4 py-3">9.00% - 13.50%</td>
                    <td className="border border-gray-300 px-4 py-3">9.50% - 14.00%</td>
                    <td className="border border-gray-300 px-4 py-3">9.25% - 13.75%</td>
                    <td className="border border-gray-300 px-4 py-3">11.00% - 15.50%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">ICICI Bank</td>
                    <td className="border border-gray-300 px-4 py-3">9.25% - 14.00%</td>
                    <td className="border border-gray-300 px-4 py-3">9.75% - 14.50%</td>
                    <td className="border border-gray-300 px-4 py-3">9.50% - 14.25%</td>
                    <td className="border border-gray-300 px-4 py-3">11.25% - 16.00%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Axis Bank</td>
                    <td className="border border-gray-300 px-4 py-3">9.50% - 14.50%</td>
                    <td className="border border-gray-300 px-4 py-3">10.00% - 15.00%</td>
                    <td className="border border-gray-300 px-4 py-3">9.75% - 14.75%</td>
                    <td className="border border-gray-300 px-4 py-3">11.50% - 16.50%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Kotak Mahindra Bank</td>
                    <td className="border border-gray-300 px-4 py-3">10.00% - 15.00%</td>
                    <td className="border border-gray-300 px-4 py-3">10.50% - 15.50%</td>
                    <td className="border border-gray-300 px-4 py-3">10.25% - 15.25%</td>
                    <td className="border border-gray-300 px-4 py-3">12.00% - 17.00%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Bajaj Finserv</td>
                    <td className="border border-gray-300 px-4 py-3">11.00% - 16.00%</td>
                    <td className="border border-gray-300 px-4 py-3">11.50% - 16.50%</td>
                    <td className="border border-gray-300 px-4 py-3">11.25% - 16.25%</td>
                    <td className="border border-gray-300 px-4 py-3">13.00% - 18.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              * Interest rates are indicative and may vary based on credit profile, business type, and loan amount. 
              Rates are subject to change without notice.
            </p>
          </div>

          {/* Interest Rate Types */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Types of Interest Rates / ब्याज दर के प्रकार
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Fixed Interest Rate / निश्चित ब्याज दर</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Stable EMI</h4>
                      <p className="text-gray-600 text-sm">EMI remains constant throughout loan tenure</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Predictable Budgeting</h4>
                      <p className="text-gray-600 text-sm">Easy to plan monthly cash flow</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-100 text-red-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Higher Initial Rate</h4>
                      <p className="text-gray-600 text-sm">Usually 0.5-1% higher than floating rate</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Floating Interest Rate / अस्थिर ब्याज दर</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Lower Initial Rate</h4>
                      <p className="text-gray-600 text-sm">Usually 0.5-1% lower than fixed rate</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Market Linked</h4>
                      <p className="text-gray-600 text-sm">Rate changes with RBI policy rates</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-yellow-100 text-yellow-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">EMI Fluctuation</h4>
                      <p className="text-gray-600 text-sm">EMI may increase or decrease with rate changes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Factors Affecting Interest Rates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Factors Affecting Interest Rates / ब्याज दर को प्रभावित करने वाले कारक
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Factors / व्यापारिक कारक</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Business Type</h4>
                      <p className="text-gray-600 text-sm">Manufacturing and trading get better rates than services</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Business Age</h4>
                      <p className="text-gray-600 text-sm">Older businesses with track record get lower rates</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Annual Revenue</h4>
                      <p className="text-gray-600 text-sm">Higher revenue businesses get preferential rates</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Collateral</h4>
                      <p className="text-gray-600 text-sm">Secured loans get lower interest rates</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Factors / व्यक्तिगत कारक</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Credit Score</h4>
                      <p className="text-gray-600 text-sm">CIBIL score above 750 gets best rates</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Existing Relationship</h4>
                      <p className="text-gray-600 text-sm">Existing customers get preferential rates</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Loan Amount</h4>
                      <p className="text-gray-600 text-sm">Higher loan amounts may get better rates</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Loan Tenure</h4>
                      <p className="text-gray-600 text-sm">Shorter tenure loans may have lower rates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips to Get Lower Interest Rates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tips to Get Lower Interest Rates / कम ब्याज दर पाने के टिप्स
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Improve Credit Profile / क्रेडिट प्रोफाइल सुधारें</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain CIBIL score above 750</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Pay existing EMIs on time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Keep credit utilization below 30%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Avoid multiple loan applications</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Strengthen Business Profile / व्यापार प्रोफाइल मजबूत करें</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Show consistent revenue growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain healthy bank balance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Provide collateral if possible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Build relationship with bank</span>
                  </li>
                </ul>
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
                  What is the current business loan interest rate in India?
                </h3>
                <p className="text-gray-600">
                  Business loan interest rates in India typically range from 8.5% to 18% per annum, depending on the lender, loan type, and borrower's credit profile. Public sector banks generally offer lower rates compared to private banks and NBFCs.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Which type of interest rate is better for business loans?
                </h3>
                <p className="text-gray-600">
                  Fixed interest rates are better if you want predictable EMIs and stable cash flow planning. Floating rates are better if you expect interest rates to decrease in the future. Consider your risk appetite and business cash flow stability when choosing.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I negotiate business loan interest rates?
                </h3>
                <p className="text-gray-600">
                  Yes, you can negotiate interest rates based on your credit profile, business performance, existing relationship with the bank, and loan amount. Strong business fundamentals and good credit score give you better negotiating power.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How often do floating interest rates change?
                </h3>
                <p className="text-gray-600">
                  Floating interest rates are linked to RBI's repo rate and bank's base rate. They typically change when RBI announces monetary policy changes (usually every 2-3 months). Banks may also revise rates based on their internal policies.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What additional charges are involved in business loans?
                </h3>
                <p className="text-gray-600">
                  Business loans may include processing fees (0.5-2% of loan amount), prepayment charges, late payment fees, documentation charges, and legal charges. Always check the total cost of borrowing, not just the interest rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default InterestRates;
