import React from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../components/learn/LearnLayout';

const CollateralRequirements: React.FC = () => {
  const lessonData = {
    title: "Business Loan Collateral Requirements - व्यापारिक ऋण जमानत आवश्यकताएं",
    category: "business-loans",
    currentLesson: "collateral-requirements",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Business Loans", url: "/learn/business-loans" },
      { name: "Collateral Requirements", url: "/learn/business-loans/collateral-requirements" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Business Loan Collateral Requirements 2024 - Secured vs Unsecured Business Loans | MoneyCal</title>
        <meta name="description" content="Complete guide to business loan collateral requirements in India. Learn about secured vs unsecured business loans, types of collateral accepted, valuation process, and how to reduce collateral requirements." />
        <meta name="keywords" content="business loan collateral, secured business loan, unsecured business loan, collateral requirements, business loan security, property as collateral, machinery as collateral" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Business Loan Collateral Requirements Guide",
            "description": "Comprehensive guide to understanding collateral requirements for business loans",
            "author": {
              "@type": "Organization",
              "name": "MoneyCal"
            }
          })}
        </script>
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Business Loan Collateral Requirements
              <span className="block text-xl mt-2 text-red-100">व्यापारिक ऋण जमानत आवश्यकताएं</span>
            </h1>
            <p className="text-lg text-red-100">
              Understand collateral requirements for business loans in India. 
              Learn about secured vs unsecured loans, types of collateral, and how to optimize your loan terms.
            </p>
          </div>

          {/* What is Collateral */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              What is Collateral? / जमानत क्या है?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Definition / परिभाषा</h3>
                <p className="text-gray-700 mb-4">
                  Collateral (जमानत) is an asset or property that a borrower pledges to a lender as security for a loan. 
                  If the borrower fails to repay the loan, the lender has the right to seize and sell the collateral to recover the loan amount.
                </p>
                <p className="text-gray-700">
                  कोलैटरल एक संपत्ति या एसेट है जिसे उधारकर्ता ऋण की सुरक्षा के रूप में ऋणदाता को गिरवी रखता है। 
                  यदि उधारकर्ता ऋण चुकाने में विफल रहता है, तो ऋणदाता को ऋण राशि वसूल करने के लिए संपत्ति को जब्त करने और बेचने का अधिकार है।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Purpose of Collateral / जमानत का उद्देश्य</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Reduces lender's risk / ऋणदाता का जोखिम कम करता है</li>
                    <li>• Enables higher loan amounts / उच्च ऋण राशि की अनुमति देता है</li>
                    <li>• Results in lower interest rates / कम ब्याज दरों में परिणाम</li>
                    <li>• Provides longer repayment tenure / लंबी चुकौती अवधि प्रदान करता है</li>
                    <li>• Improves loan approval chances / ऋण स्वीकृति की संभावना बढ़ाता है</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits to Borrower / उधारकर्ता को लाभ</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Access to larger loan amounts / बड़ी ऋण राशि तक पहुंच</li>
                    <li>• Lower interest rates (2-4% less) / कम ब्याज दरें</li>
                    <li>• Easier approval process / आसान अनुमोदन प्रक्रिया</li>
                    <li>• Flexible repayment terms / लचीली चुकौती शर्तें</li>
                    <li>• Better for weak credit profile / कमजोर क्रेडिट प्रोफाइल के लिए बेहतर</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Secured vs Unsecured Business Loans */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Secured vs Unsecured Business Loans / सुरक्षित बनाम असुरक्षित व्यापारिक ऋण
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Secured Loan / सुरक्षित ऋण</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Unsecured Loan / असुरक्षित ऋण</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Collateral Required</td>
                    <td className="border border-gray-300 px-4 py-3">Yes - Property, machinery, inventory</td>
                    <td className="border border-gray-300 px-4 py-3">No collateral needed</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Loan Amount</td>
                    <td className="border border-gray-300 px-4 py-3">Higher (₹10 Lakh - ₹10 Crore+)</td>
                    <td className="border border-gray-300 px-4 py-3">Lower (₹50,000 - ₹50 Lakh)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Interest Rate</td>
                    <td className="border border-gray-300 px-4 py-3">Lower (7.5% - 12%)</td>
                    <td className="border border-gray-300 px-4 py-3">Higher (11% - 20%)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Repayment Tenure</td>
                    <td className="border border-gray-300 px-4 py-3">Longer (up to 15-20 years)</td>
                    <td className="border border-gray-300 px-4 py-3">Shorter (up to 5-7 years)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Approval Time</td>
                    <td className="border border-gray-300 px-4 py-3">Longer (15-30 days)</td>
                    <td className="border border-gray-300 px-4 py-3">Faster (3-7 days)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Documentation</td>
                    <td className="border border-gray-300 px-4 py-3">Extensive - property papers, valuation</td>
                    <td className="border border-gray-300 px-4 py-3">Minimal - KYC and business docs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Eligibility</td>
                    <td className="border border-gray-300 px-4 py-3">Easier with collateral</td>
                    <td className="border border-gray-300 px-4 py-3">Requires strong credit score</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Risk to Borrower</td>
                    <td className="border border-gray-300 px-4 py-3">High - Risk of asset seizure</td>
                    <td className="border border-gray-300 px-4 py-3">Lower - No asset at risk</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Best For</td>
                    <td className="border border-gray-300 px-4 py-3">Large businesses, expansion projects</td>
                    <td className="border border-gray-300 px-4 py-3">Small businesses, working capital</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Types of Collateral Accepted */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Types of Collateral Accepted / स्वीकृत जमानत के प्रकार
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Property / संपत्ति</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Residential Property / आवासीय संपत्ति</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• House, flat, or apartment / घर, फ्लैट, या अपार्टमेंट</li>
                      <li>• Loan up to 60-70% of property value</li>
                      <li>• Clear title required / स्पष्ट शीर्षक आवश्यक</li>
                      <li>• Interest rate: 8.5% - 11%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Commercial Property / वाणिज्यिक संपत्ति</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Office, shop, warehouse / कार्यालय, दुकान, गोदाम</li>
                      <li>• Loan up to 65-75% of property value</li>
                      <li>• Higher loan amounts possible</li>
                      <li>• Interest rate: 9% - 12%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Land / जमीन</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Agricultural or non-agricultural land</li>
                      <li>• Loan up to 50-60% of land value</li>
                      <li>• Location matters significantly</li>
                      <li>• Interest rate: 10% - 13%</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Assets / व्यापारिक संपत्ति</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Machinery & Equipment / मशीनरी और उपकरण</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Manufacturing equipment / विनिर्माण उपकरण</li>
                      <li>• Loan up to 70-80% of machinery value</li>
                      <li>• Age of machinery matters / मशीनरी की आयु महत्वपूर्ण</li>
                      <li>• Interest rate: 9.5% - 13%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Inventory & Stock / इन्वेंटरी और स्टॉक</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Raw materials, finished goods / कच्चा माल, तैयार माल</li>
                      <li>• Loan up to 50-60% of inventory value</li>
                      <li>• Regular stock audits required</li>
                      <li>• Interest rate: 10% - 14%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Vehicles / वाहन</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Commercial vehicles, trucks / वाणिज्यिक वाहन, ट्रक</li>
                      <li>• Loan up to 60-70% of vehicle value</li>
                      <li>• Must be in good condition</li>
                      <li>• Interest rate: 10.5% - 14%</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Assets / वित्तीय संपत्ति</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Fixed Deposits / सावधि जमा</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Bank FDs / बैंक एफडी</li>
                      <li>• Loan up to 90-95% of FD value</li>
                      <li>• Lowest interest rate option</li>
                      <li>• Interest rate: 8% - 10%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Insurance Policies / बीमा पॉलिसी</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Life insurance with surrender value</li>
                      <li>• Loan up to 80-90% of surrender value</li>
                      <li>• Policy must have maturity value</li>
                      <li>• Interest rate: 9% - 11%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Securities / प्रतिभूतियां</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Shares, bonds, mutual funds / शेयर, बॉन्ड, म्यूचुअल फंड</li>
                      <li>• Loan up to 50-70% of market value</li>
                      <li>• Subject to market volatility</li>
                      <li>• Interest rate: 9.5% - 12%</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Other Assets / अन्य संपत्ति</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Receivables / प्राप्य</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Accounts receivable, invoices / खाते प्राप्य, चालान</li>
                      <li>• Loan up to 70-80% of receivable value</li>
                      <li>• Customer creditworthiness checked</li>
                      <li>• Interest rate: 11% - 15%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Gold & Jewellery / सोना और आभूषण</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gold coins, bars, jewellery / सोने के सिक्के, बार, आभूषण</li>
                      <li>• Loan up to 75% of gold value</li>
                      <li>• Quick processing (1-2 days)</li>
                      <li>• Interest rate: 9% - 12%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Personal Guarantee / व्यक्तिगत गारंटी</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Director's personal guarantee / निदेशक की व्यक्तिगत गारंटी</li>
                      <li>• Used with other collateral</li>
                      <li>• Personal liability in case of default</li>
                      <li>• No specific valuation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collateral Valuation Process */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Collateral Valuation Process / जमानत मूल्यांकन प्रक्रिया
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Valuation Steps / मूल्यांकन चरण</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Initial Assessment / प्रारंभिक मूल्यांकन</h4>
                      <p className="text-gray-600 text-sm">Bank reviews collateral documents and conducts preliminary evaluation</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Site Inspection / साइट निरीक्षण</h4>
                      <p className="text-gray-600 text-sm">Bank-appointed valuator visits the property or inspects the asset</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Technical Valuation / तकनीकी मूल्यांकन</h4>
                      <p className="text-gray-600 text-sm">Professional valuer assesses market value, condition, and legal status</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Legal Verification / कानूनी सत्यापन</h4>
                      <p className="text-gray-600 text-sm">Legal team checks title deeds, ownership, and any existing liens</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Valuation Report / मूल्यांकन रिपोर्ट</h4>
                      <p className="text-gray-600 text-sm">Final valuation report submitted with loan-to-value ratio</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Valuation Factors / मूल्यांकन कारक</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Property Valuation</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Location and locality / स्थान और इलाका</li>
                      <li>• Property age and condition / संपत्ति की आयु और स्थिति</li>
                      <li>• Market trends / बाजार के रुझान</li>
                      <li>• Infrastructure and amenities / बुनियादी ढांचा और सुविधाएं</li>
                      <li>• Legal clearance / कानूनी मंजूरी</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Asset Valuation</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Current market value / वर्तमान बाजार मूल्य</li>
                      <li>• Asset age and depreciation / संपत्ति की आयु और मूल्यह्रास</li>
                      <li>• Condition and functionality / स्थिति और कार्यक्षमता</li>
                      <li>• Resale value / पुनर्विक्रय मूल्य</li>
                      <li>• Maintenance history / रखरखाव इतिहास</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Reduce Collateral Requirements */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              How to Reduce Collateral Requirements / जमानत आवश्यकताओं को कम कैसे करें
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Strengthen Credit Profile / क्रेडिट प्रोफाइल मजबूत करें</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain CIBIL score above 750 / 750 से ऊपर CIBIL स्कोर बनाए रखें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Show consistent business revenue / लगातार व्यापार राजस्व दिखाएं</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain healthy bank balance / स्वस्थ बैंक बैलेंस बनाए रखें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Build long-term banking relationship / लंबी अवधि का बैंकिंग संबंध बनाएं</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Alternative Options / वैकल्पिक विकल्प</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Consider government schemes like MUDRA / मुद्रा जैसी सरकारी योजनाओं पर विचार करें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Opt for CGTMSE guarantee / CGTMSE गारंटी चुनें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Apply for smaller loan amount initially / शुरू में छोटी ऋण राशि के लिए आवेदन करें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Provide co-applicant with strong profile / मजबूत प्रोफाइल वाले सह-आवेदक प्रदान करें</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CGTMSE Guarantee Scheme */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              CGTMSE Guarantee Scheme / CGTMSE गारंटी योजना
            </h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                Credit Guarantee Fund Trust for Micro and Small Enterprises
              </h3>
              <p className="text-gray-700 mb-4">
                CGTMSE is a government initiative that provides collateral-free loans to micro and small enterprises. 
                The scheme guarantees loans up to ₹2 crore without requiring collateral or third-party guarantee.
              </p>
              <p className="text-gray-700">
                CGTMSE एक सरकारी पहल है जो सूक्ष्म और लघु उद्यमों को कोलैटरल-मुक्त ऋण प्रदान करती है। 
                यह योजना बिना कोलैटरल या तीसरे पक्ष की गारंटी के ₹2 करोड़ तक के ऋण की गारंटी देती है।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features / मुख्य विशेषताएं</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Loan amount: Up to ₹2 crore / ऋण राशि: ₹2 करोड़ तक</li>
                  <li>• No collateral or third-party guarantee required</li>
                  <li>• Covers 75-85% of loan amount</li>
                  <li>• One-time guarantee fee: 0.75-1.5% of loan</li>
                  <li>• Annual service fee: 0.75% of outstanding balance</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Eligibility / पात्रता</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Micro and small enterprises only</li>
                  <li>• New or existing business units</li>
                  <li>• Manufacturing and service sectors</li>
                  <li>• Apply through member lending institutions</li>
                  <li>• Valid business registration required</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Apply / आवेदन कैसे करें</h3>
              <ol className="space-y-2 text-sm text-blue-800">
                <li>1. Approach any CGTMSE member lending institution (bank or NBFC)</li>
                <li>2. Submit business loan application with required documents</li>
                <li>3. Bank evaluates the application and submits to CGTMSE</li>
                <li>4. CGTMSE approves guarantee coverage</li>
                <li>5. Bank disburses loan without collateral requirement</li>
              </ol>
              <a href="https://www.cgtmse.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                Learn more about CGTMSE →
              </a>
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
                  What happens if I default on a secured business loan?
                </h3>
                <p className="text-gray-600">
                  If you default on a secured business loan, the lender has the legal right to seize and sell the collateral to recover the outstanding loan amount. Before taking this step, banks typically send multiple reminders and may offer restructuring options. It's crucial to communicate with your lender if you're facing difficulties.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I use residential property as collateral for business loan?
                </h3>
                <p className="text-gray-600">
                  Yes, you can use residential property as collateral for business loans. Banks typically offer loans up to 60-70% of the property's market value. However, you risk losing your home if you default on the loan, so ensure you have a solid repayment plan.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How is collateral value determined?
                </h3>
                <p className="text-gray-600">
                  Collateral value is determined through professional valuation considering factors like market value, condition, age, location (for property), and depreciation. Banks typically lend 50-80% of the collateral value depending on the asset type and liquidity.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I get a business loan without collateral?
                </h3>
                <p className="text-gray-600">
                  Yes, you can get unsecured business loans without collateral for amounts up to ₹50 lakh. Requirements include good credit score (750+), stable business revenue, and proper documentation. Alternatively, government schemes like MUDRA and CGTMSE offer collateral-free loans for MSMEs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I release collateral before full loan repayment?
                </h3>
                <p className="text-gray-600">
                  Collateral is typically released only after full loan repayment. However, some banks may allow partial release if you've repaid a significant portion (e.g., 75-80%) of the loan or can substitute with equivalent collateral. This is at the bank's discretion and subject to their policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default CollateralRequirements;
