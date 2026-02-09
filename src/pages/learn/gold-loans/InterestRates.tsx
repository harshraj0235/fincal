import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../../components/learn/LearnLayout';

const InterestRates: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('100000');
  const [interestRate, setInterestRate] = useState('10');
  const [tenure, setTenure] = useState('12');
  const [emi, setEmi] = useState<number | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseInt(tenure);
    
    if (P > 0 && r > 0 && n > 0) {
      const monthlyEMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(monthlyEMI));
    }
  };

  const lessonData = {
    category: "gold-loans",
    currentLesson: "interest-rates",
    breadcrumb: ['Learn', 'Gold Loans', 'Interest Rates']
  };

  return (
    <>
      <Helmet>
        <title>Gold Loan Interest Rates 2024 - Compare Best Gold Loan Interest Rates in India | MoneyCal</title>
        <meta name="description" content="Compare gold loan interest rates from top banks and NBFCs in India. Find lowest interest rates, calculate EMI, and choose the best gold loan for your needs. Updated rates for 2024." />
        <meta name="keywords" content="gold loan interest rate, gold loan rates, lowest gold loan rate, gold loan EMI calculator, gold loan comparison, best gold loan rates" />
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Gold Loan Interest Rates 2024
              <span className="block text-xl mt-2 text-yellow-100">स्वर्ण ऋण ब्याज दरें 2024</span>
            </h1>
            <p className="text-lg text-yellow-100">
              Compare gold loan interest rates from top banks and NBFCs. 
              Find the lowest rates and calculate your monthly EMI instantly!
            </p>
          </div>

          {/* EMI Calculator */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gold Loan EMI Calculator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure (Months)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <button
              onClick={calculateEMI}
              className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700"
            >
              Calculate EMI
            </button>

            {emi && (
              <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <div className="text-sm text-green-700 mb-2">Your Monthly EMI</div>
                <div className="text-4xl font-bold text-green-600">₹{emi.toLocaleString()}</div>
              </div>
            )}
          </div>

          {/* Current Interest Rates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Current Gold Loan Interest Rates
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left">Bank/NBFC</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Interest Rate</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Processing Fee</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Max Tenure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Muthoot Finance</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">7.35% - 12%</td>
                    <td className="border border-gray-300 px-4 py-3">NIL - 1%</td>
                    <td className="border border-gray-300 px-4 py-3">12 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Manappuram Finance</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">7.50% - 12%</td>
                    <td className="border border-gray-300 px-4 py-3">NIL - 1%</td>
                    <td className="border border-gray-300 px-4 py-3">12 months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">HDFC Bank</td>
                    <td className="border border-gray-300 px-4 py-3">9.50% - 14%</td>
                    <td className="border border-gray-300 px-4 py-3">0.50% - 1%</td>
                    <td className="border border-gray-300 px-4 py-3">24 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">ICICI Bank</td>
                    <td className="border border-gray-300 px-4 py-3">10% - 15%</td>
                    <td className="border border-gray-300 px-4 py-3">1% - 2%</td>
                    <td className="border border-gray-300 px-4 py-3">12 months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">State Bank of India</td>
                    <td className="border border-gray-300 px-4 py-3">9.00% - 11.50%</td>
                    <td className="border border-gray-300 px-4 py-3">0.50%</td>
                    <td className="border border-gray-300 px-4 py-3">36 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Axis Bank</td>
                    <td className="border border-gray-300 px-4 py-3">10.50% - 16%</td>
                    <td className="border border-gray-300 px-4 py-3">1%</td>
                    <td className="border border-gray-300 px-4 py-3">12 months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">IIFL Finance</td>
                    <td className="border border-gray-300 px-4 py-3">9% - 13%</td>
                    <td className="border border-gray-300 px-4 py-3">1%</td>
                    <td className="border border-gray-300 px-4 py-3">12 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Rupeek</td>
                    <td className="border border-gray-300 px-4 py-3">8.50% - 12%</td>
                    <td className="border border-gray-300 px-4 py-3">NIL</td>
                    <td className="border border-gray-300 px-4 py-3">12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              *Interest rates are indicative and subject to change. Actual rates may vary based on loan amount, gold purity, and customer profile.
            </p>
          </div>

          {/* Factors Affecting Interest Rates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Factors Affecting Gold Loan Interest Rates
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-3">🏦 Lender Type</h3>
                <p className="text-gray-700 text-sm">
                  NBFCs typically offer lower rates (7.35%-12%) compared to banks (9%-16%). 
                  Government banks usually have moderate rates with longer tenure options.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-3">💰 Loan Amount</h3>
                <p className="text-gray-700 text-sm">
                  Higher loan amounts often get better interest rates. 
                  Loans above ₹5 lakh may qualify for preferential rates from some lenders.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-purple-900 mb-3">⏱️ Loan Tenure</h3>
                <p className="text-gray-700 text-sm">
                  Shorter tenure loans (3-6 months) may have slightly lower rates. 
                  Longer tenures provide flexibility but might cost more in total interest.
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-bold text-orange-900 mb-3">💎 Gold Purity</h3>
                <p className="text-gray-700 text-sm">
                  Higher karat gold (22-24K) gets better rates and higher LTV. 
                  18K jewelry may attract slightly higher interest rates.
                </p>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="font-bold text-pink-900 mb-3">👤 Customer Profile</h3>
                <p className="text-gray-700 text-sm">
                  Existing customers, repeat borrowers, and those with good repayment history 
                  may get preferential rates from lenders.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-bold text-yellow-900 mb-3">📍 Location</h3>
                <p className="text-gray-700 text-sm">
                  Interest rates may vary slightly by region and branch. 
                  Urban areas typically have more competitive rates due to higher competition.
                </p>
              </div>
            </div>
          </div>

          {/* How to Get Lower Interest Rates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              How to Get Lower Interest Rates
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Compare Multiple Lenders</h3>
                  <p className="text-gray-600 text-sm">
                    Don't settle for the first offer. Compare rates from at least 3-4 banks and NBFCs. 
                    Use online comparison tools and negotiate for better rates.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Opt for Shorter Tenure</h3>
                  <p className="text-gray-600 text-sm">
                    Choose shorter loan tenure if possible. Not only will you pay less interest overall, 
                    but you may also get a lower interest rate from some lenders.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Leverage Existing Relationships</h3>
                  <p className="text-gray-600 text-sm">
                    If you're an existing customer with good repayment history, 
                    ask for preferential rates. Banks often offer better terms to loyal customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Pledge Higher Purity Gold</h3>
                  <p className="text-gray-600 text-sm">
                    22-24 karat gold coins or bars get better rates than 18-20 karat jewelry. 
                    Consider pledging higher purity gold if you want lower interest rates.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Check for Promotional Offers</h3>
                  <p className="text-gray-600 text-sm">
                    NBFCs and banks often run promotional campaigns with reduced rates during festivals 
                    or special occasions. Time your loan application accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interest Rate Comparison by Loan Amount */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Interest Rate Comparison by Loan Amount
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Up to ₹1 Lakh</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">NBFCs:</span>
                    <span className="font-semibold text-green-600">7.35% - 10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Banks:</span>
                    <span className="font-semibold">9% - 14%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Best for: Emergency needs, short-term requirements
                  </p>
                </div>
              </div>

              <div className="border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-600 mb-4">₹1-5 Lakh</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">NBFCs:</span>
                    <span className="font-semibold text-green-600">7.50% - 9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Banks:</span>
                    <span className="font-semibold">8.5% - 13%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Best for: Education, business needs, home renovation
                  </p>
                </div>
              </div>

              <div className="border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-4">Above ₹5 Lakh</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">NBFCs:</span>
                    <span className="font-semibold text-green-600">7.35% - 8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Banks:</span>
                    <span className="font-semibold">8% - 12%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Best for: Business expansion, large investments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Which bank offers the lowest gold loan interest rate?
                </h3>
                <p className="text-gray-600">
                  NBFCs like Muthoot Finance and Manappuram Finance typically offer the lowest rates starting from 7.35% p.a. 
                  Among banks, State Bank of India offers competitive rates starting from 9% p.a. However, actual rates vary based on loan amount and tenure.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Are gold loan interest rates fixed or floating?
                </h3>
                <p className="text-gray-600">
                  Most gold loans have fixed interest rates that remain constant throughout the loan tenure. 
                  However, if you extend your loan period, the new extension may have a different interest rate based on prevailing market conditions.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I negotiate gold loan interest rates?
                </h3>
                <p className="text-gray-600">
                  Yes, interest rates are negotiable, especially if you're borrowing a large amount, have a good relationship with the lender, 
                  or can show competitive offers from other institutions. Existing customers often get better negotiating power.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How is gold loan interest calculated - daily, monthly, or annually?
                </h3>
                <p className="text-gray-600">
                  Gold loan interest is calculated on a reducing balance basis, usually monthly. 
                  The interest rate quoted is annual (per annum), but actual interest is calculated monthly on the outstanding principal amount.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Do interest rates change if gold prices fluctuate?
                </h3>
                <p className="text-gray-600">
                  No, your interest rate remains fixed once the loan is sanctioned, regardless of gold price fluctuations. 
                  However, if gold prices fall significantly and your LTV exceeds the allowed limit, the lender may ask for additional gold or partial repayment.
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
