import React from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../../components/learn/LearnLayout';

const WhatIsGoldLoan: React.FC = () => {
  const lessonData = {
    title: "What is Gold Loan? - स्वर्ण ऋण क्या है?",
    category: "gold-loans",
    currentLesson: "what-is-gold-loan",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Gold Loans", url: "/learn/gold-loans" },
      { name: "What is Gold Loan", url: "/learn/gold-loans/what-is-gold-loan" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>What is Gold Loan? Complete Guide to Gold Loans in India 2024 | MoneyCal</title>
        <meta name="description" content="Complete guide to gold loans in India. Learn what is gold loan, how it works, benefits, eligibility, interest rates, and how to apply for gold loan against your gold jewelry." />
        <meta name="keywords" content="what is gold loan, gold loan meaning, gold loan kya hai, gold loan benefits, gold loan eligibility, gold loan process, loan against gold" />
        <link rel="canonical" href="https://moneycal.in/learn/gold-loans/what-is-gold-loan" />
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              What is Gold Loan?
              <span className="block text-xl mt-2 text-yellow-100">स्वर्ण ऋण क्या है?</span>
            </h1>
            <p className="text-lg text-yellow-100">
              Learn everything about gold loans - the fastest and easiest way to get instant cash by pledging your gold jewelry. 
              No credit score required, minimal documentation, and quick approval!
            </p>
          </div>

          {/* Definition */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Understanding Gold Loan / स्वर्ण ऋण को समझना
            </h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-3">What is Gold Loan? / स्वर्ण ऋण क्या है?</h3>
              <p className="text-gray-700 mb-4">
                A gold loan is a secured loan where you pledge your gold ornaments, jewelry, or coins as collateral to obtain immediate funds from a bank or NBFC. 
                The lender keeps your gold safe in their vault and returns it once you repay the loan. 
                It's one of the quickest ways to get cash - often within 15-30 minutes!
              </p>
              <p className="text-gray-700">
                स्वर्ण ऋण एक सुरक्षित ऋण है जहां आप बैंक या NBFC से तत्काल धन प्राप्त करने के लिए अपने सोने के आभूषण, गहने या सिक्कों को गिरवी रखते हैं। 
                ऋणदाता आपके सोने को अपनी तिजोरी में सुरक्षित रखता है और जब आप ऋण चुकाते हैं तो इसे वापस कर देता है। 
                यह नकदी प्राप्त करने के सबसे तेज़ तरीकों में से एक है - अक्सर 15-30 मिनट के भीतर!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-blue-900 mb-2">Quick Process</h3>
                <p className="text-sm text-blue-700">Get loan in 15-30 minutes with minimal paperwork</p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-green-900 mb-2">Up to 75% LTV</h3>
                <p className="text-sm text-green-700">Get loan up to 75% of your gold's market value</p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="font-bold text-purple-900 mb-2">Minimal Docs</h3>
                <p className="text-sm text-purple-700">Just ID proof and gold - no income proof needed</p>
              </div>
            </div>
          </div>

          {/* How Gold Loan Works */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              How Gold Loan Works / स्वर्ण ऋण कैसे काम करता है
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Bank/NBFC / बैंक/NBFC पर जाएं</h3>
                  <p className="text-gray-600">
                    Visit the nearest branch of a bank or NBFC offering gold loans. You can also apply online and visit the branch for gold valuation.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Gold Valuation / सोने का मूल्यांकन</h3>
                  <p className="text-gray-600">
                    Bank's certified valuator checks the purity (karat) and weight of your gold using electronic testing machines. 
                    They determine the market value based on current gold prices.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Loan Amount Calculation / ऋण राशि की गणना</h3>
                  <p className="text-gray-600">
                    Based on gold value, the bank offers 60-75% as loan amount (called Loan-to-Value or LTV ratio). 
                    For example, if your gold is worth ₹1 lakh, you can get ₹60,000 to ₹75,000 as loan.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Documentation / दस्तावेजीकरण</h3>
                  <p className="text-gray-600">
                    Submit basic KYC documents (Aadhaar, PAN card) and sign the loan agreement. 
                    The bank provides you with a gold receipt acknowledging the pledged jewelry.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Loan Disbursement / ऋण वितरण</h3>
                  <p className="text-gray-600">
                    Loan amount is instantly credited to your bank account or given as cash/cheque. 
                    Your gold is stored securely in the bank's insured vault.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-lg">6</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Repayment & Gold Release / पुनर्भुगतान और सोना वापसी</h3>
                  <p className="text-gray-600">
                    Repay the loan with interest through EMI or bullet payment. 
                    Once fully repaid, your gold is returned immediately with proper verification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Key Features of Gold Loans / स्वर्ण ऋण की मुख्य विशेषताएं
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Loan Terms / ऋण शर्तें</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong>Loan Amount:</strong> ₹5,000 to ₹1 Crore+ depending on gold value
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong>Interest Rate:</strong> 7.35% - 16% per annum
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong>Loan Tenure:</strong> 3 months to 3 years (flexible)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong>LTV Ratio:</strong> Up to 75% of gold value
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits / लाभ</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <div>
                      <strong>No Credit Score Required:</strong> Anyone can apply
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <div>
                      <strong>Quick Approval:</strong> Get money in 15-30 minutes
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <div>
                      <strong>Lower Interest:</strong> Cheaper than personal loans
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <div>
                      <strong>Safe Storage:</strong> Gold kept in insured bank vaults
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Types of Gold Accepted */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Types of Gold Accepted / स्वीकृत सोने के प्रकार
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <div className="text-3xl mb-3">💍</div>
                <h3 className="font-bold text-gray-800 mb-2">Gold Jewelry / सोने के आभूषण</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Necklaces, bangles, chains</li>
                  <li>• Rings, earrings, bracelets</li>
                  <li>• Minimum 18 karat purity</li>
                  <li>• With or without stones (stone value excluded)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <div className="text-3xl mb-3">🪙</div>
                <h3 className="font-bold text-gray-800 mb-2">Gold Coins / सोने के सिक्के</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Bank-issued gold coins</li>
                  <li>• BIS hallmarked coins</li>
                  <li>• 22-24 karat purity</li>
                  <li>• Usually higher LTV than jewelry</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <div className="text-3xl mb-3">📏</div>
                <h3 className="font-bold text-gray-800 mb-2">Gold Bars / सोने की छड़ें</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Gold bars and biscuits</li>
                  <li>• Must be BIS hallmarked</li>
                  <li>• 22-24 karat purity</li>
                  <li>• Best LTV ratios offered</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Not Accepted / स्वीकार नहीं किया जाता</h3>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• Gold jewelry below 18 karat purity</li>
                <li>• Gold-plated or imitation jewelry</li>
                <li>• Damaged or broken pieces (may be accepted at lower value)</li>
                <li>• Antique jewelry with significant making charges</li>
              </ul>
            </div>
          </div>

          {/* Gold Loan vs Other Loans */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Gold Loan vs Other Loans / स्वर्ण ऋण बनाम अन्य ऋण
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Gold Loan</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Personal Loan</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Credit Card</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Interest Rate</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">7.35% - 16%</td>
                    <td className="border border-gray-300 px-4 py-3">10.5% - 24%</td>
                    <td className="border border-gray-300 px-4 py-3">36% - 48%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Approval Time</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">15-30 minutes</td>
                    <td className="border border-gray-300 px-4 py-3">1-3 days</td>
                    <td className="border border-gray-300 px-4 py-3">7-15 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Credit Score</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">Not Required</td>
                    <td className="border border-gray-300 px-4 py-3">750+ Required</td>
                    <td className="border border-gray-300 px-4 py-3">700+ Required</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Documentation</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">Minimal (ID + Gold)</td>
                    <td className="border border-gray-300 px-4 py-3">Extensive</td>
                    <td className="border border-gray-300 px-4 py-3">Moderate</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Income Proof</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">Not Required</td>
                    <td className="border border-gray-300 px-4 py-3">Required</td>
                    <td className="border border-gray-300 px-4 py-3">Required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* When to Take Gold Loan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              When to Take a Gold Loan? / स्वर्ण ऋण कब लें?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Best Use Cases / सर्वोत्तम उपयोग</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Medical emergencies / चिकित्सा आपातकाल</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Business working capital needs / व्यापार कार्यशील पूंजी</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Education fees payment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Wedding or family functions / शादी या पारिवारिक समारोह</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Home renovation / घर का नवीनीकरण</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Debt consolidation at lower interest</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Advantages / लाभ</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">Don't need to sell your gold permanently</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">Get instant cash without waiting / तुरंत नकदी मिलती है</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">Lower interest than unsecured loans</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">No impact on credit score if repaid on time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">Flexible repayment options available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Terms */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Important Gold Loan Terms / महत्वपूर्ण स्वर्ण ऋण शब्दावली
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">LTV (Loan-to-Value) Ratio</h3>
                <p className="text-gray-600 text-sm">
                  The percentage of gold's market value you can borrow. RBI allows up to 75% LTV for gold loans. 
                  For example, if your gold is worth ₹1 lakh, you can get up to ₹75,000 as loan.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Karat / कैरट</h3>
                <p className="text-gray-600 text-sm">
                  Measure of gold purity. 24 karat is pure gold (99.9%). Most jewelry is 22 karat (91.6% pure) or 18 karat (75% pure). 
                  Higher karat means higher loan value.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Bullet Repayment / बुलेट पुनर्भुगतान</h3>
                <p className="text-gray-600 text-sm">
                  A repayment option where you pay only interest during the loan tenure and repay the entire principal at the end. 
                  Useful for short-term needs and business owners.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Gold Auction / सोने की नीलामी</h3>
                <p className="text-gray-600 text-sm">
                  If you fail to repay the loan, the bank can auction your gold after giving you proper notice. 
                  Any excess amount after recovering the loan is returned to you.
                </p>
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
                  Is gold loan better than selling gold?
                </h3>
                <p className="text-gray-600">
                  Yes, gold loans are better because you get money without losing your gold permanently. 
                  You can repay and get your gold back, while if you sell, you lose ownership forever. 
                  Gold prices may also increase in future, so keeping it is beneficial.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What happens if I don't repay the gold loan?
                </h3>
                <p className="text-gray-600">
                  If you don't repay within the agreed tenure, the bank sends reminders and may extend the deadline with additional interest. 
                  If you still don't pay, the bank can auction your gold to recover the dues. Any excess amount after loan recovery is returned to you.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I take gold loan on my wife's/mother's jewelry?
                </h3>
                <p className="text-gray-600">
                  Yes, you can take a loan on gold owned by your family members, but they must give written consent and be present during the gold pledge. 
                  Both the jewelry owner and loan applicant need to provide KYC documents.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Is my gold safe with the bank?
                </h3>
                <p className="text-gray-600">
                  Yes, banks and NBFCs store pledged gold in secure, insured vaults with 24/7 security. 
                  They are regulated by RBI and must maintain strict safety standards. 
                  You also get a detailed receipt describing your gold items.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I repay gold loan early without penalty?
                </h3>
                <p className="text-gray-600">
                  Yes, most banks allow early repayment of gold loans without any prepayment penalty. 
                  You can close the loan anytime and get your gold back immediately. 
                  This flexibility makes gold loans ideal for short-term needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default WhatIsGoldLoan;
