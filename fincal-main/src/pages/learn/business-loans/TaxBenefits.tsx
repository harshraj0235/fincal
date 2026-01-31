import React from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../../components/learn/LearnLayout';

const TaxBenefits: React.FC = () => {
  const lessonData = {
    title: "Business Loan Tax Benefits 2024 - Interest Deduction Under Section 37(1) | MoneyCal",
    category: "business-loans",
    currentLesson: "tax-benefits",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Business Loans", url: "/learn/business-loans" },
      { name: "Tax Benefits", url: "/learn/business-loans/tax-benefits" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Business Loan Tax Benefits 2024 - Interest Deduction, Section 37(1), Depreciation Benefits | MoneyCal</title>
        <meta name="description" content="Complete guide to tax benefits on business loans in India. Learn about interest deduction under Section 37(1), depreciation benefits, processing fee deduction, and how to claim tax benefits on business loans." />
        <meta name="keywords" content="business loan tax benefits, section 37(1), business loan interest deduction, depreciation on business assets, tax saving on business loan, business loan tax exemption" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Business Loan Tax Benefits Guide",
            "description": "Comprehensive guide to tax deductions and benefits on business loans in India"
          })}
        </script>
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Business Loan Tax Benefits 2024
              <span className="block text-xl mt-2 text-green-100">व्यापारिक ऋण कर लाभ 2024</span>
            </h1>
            <p className="text-lg text-green-100">
              Learn about tax deductions and benefits available on business loans in India. 
              Understand Section 37(1), depreciation benefits, and how to maximize your tax savings.
            </p>
          </div>

          {/* Overview of Tax Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tax Benefits on Business Loans / व्यापारिक ऋण पर कर लाभ
            </h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-green-900 mb-3">Key Tax Benefits / मुख्य कर लाभ</h3>
              <p className="text-gray-700 mb-4">
                Business loans offer significant tax advantages under the Income Tax Act, 1961. 
                Both interest paid and principal repayment can provide tax benefits under different sections, 
                helping reduce your overall tax liability and improving business cash flow.
              </p>
              <p className="text-gray-700">
                आयकर अधिनियम, 1961 के तहत व्यापारिक ऋण महत्वपूर्ण कर लाभ प्रदान करते हैं। 
                भुगतान किया गया ब्याज और मूलधन चुकौती दोनों विभिन्न धाराओं के तहत कर लाभ प्रदान कर सकते हैं, 
                जिससे आपकी कुल कर देनदारी कम हो जाती है और व्यापार नकदी प्रवाह में सुधार होता है।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                <h3 className="font-semibold text-blue-900 mb-2">Interest Deduction</h3>
                <p className="text-sm text-blue-700">Full interest amount deductible under Section 37(1)</p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">15%-40%</div>
                <h3 className="font-semibold text-green-900 mb-2">Depreciation Benefits</h3>
                <p className="text-sm text-green-700">On assets purchased with business loan</p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                <h3 className="font-semibold text-purple-900 mb-2">Processing Fee</h3>
                <p className="text-sm text-purple-700">One-time deduction in year of payment</p>
              </div>
            </div>
          </div>

          {/* Section 37(1) - Interest Deduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Section 37(1): Business Loan Interest Deduction / धारा 37(1): व्यापारिक ऋण ब्याज कटौती
            </h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">What is Section 37(1)?</h3>
              <p className="text-gray-700 mb-4">
                Section 37(1) of the Income Tax Act allows businesses to claim deduction on interest paid on business loans. 
                The interest must be paid for business purposes and should not be capital in nature. 
                This deduction is available to all business entities - proprietorships, partnerships, LLPs, and companies.
              </p>
              <p className="text-gray-700">
                आयकर अधिनियम की धारा 37(1) व्यवसायों को व्यापारिक ऋणों पर भुगतान किए गए ब्याज पर कटौती का दावा करने की अनुमति देती है। 
                ब्याज व्यावसायिक उद्देश्यों के लिए भुगतान किया जाना चाहिए और पूंजीगत प्रकृति का नहीं होना चाहिए। 
                यह कटौती सभी व्यावसायिक संस्थाओं के लिए उपलब्ध है - एकल स्वामित्व, साझेदारी, LLP, और कंपनियां।
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Eligibility Criteria / पात्रता मानदंड</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Business Purpose / व्यावसायिक उद्देश्य
                    </h4>
                    <p className="text-sm text-gray-600">Loan must be used exclusively for business operations, working capital, or business expansion</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Revenue Expenditure / राजस्व व्यय
                    </h4>
                    <p className="text-sm text-gray-600">Interest should be for revenue purposes, not for acquisition of capital assets</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Actual Payment / वास्तविक भुगतान
                    </h4>
                    <p className="text-sm text-gray-600">Interest must be actually paid during the financial year to claim deduction</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Documented Proof / प्रलेखित प्रमाण
                    </h4>
                    <p className="text-sm text-gray-600">Maintain loan agreement, bank statements, and interest payment receipts</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Claim / दावा कैसे करें</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Maintain Proper Records / उचित रिकॉर्ड बनाए रखें</h4>
                      <p className="text-gray-600 text-sm">Keep loan agreement, bank statements showing EMI payments, and interest certificates from lender</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Calculate Interest Component / ब्याज घटक की गणना करें</h4>
                      <p className="text-gray-600 text-sm">Separate interest and principal components from total EMI paid during the year</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Report in ITR / ITR में रिपोर्ट करें</h4>
                      <p className="text-gray-600 text-sm">Claim interest as business expense under "Interest on Borrowings" in ITR-3 or ITR-4</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Maintain Documentation / दस्तावेजीकरण बनाए रखें</h4>
                      <p className="text-gray-600 text-sm">Keep all proofs for 7 years as per Income Tax Act requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Depreciation Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Depreciation Benefits on Assets / संपत्ति पर मूल्यह्रास लाभ
            </h2>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">Depreciation on Business Assets / व्यावसायिक संपत्ति पर मूल्यह्रास</h3>
              <p className="text-gray-700">
                If you purchase business assets (machinery, equipment, vehicles, computers) using a business loan, 
                you can claim depreciation on these assets under Section 32 of the Income Tax Act. 
                Depreciation rates vary from 15% to 40% depending on the asset type.
              </p>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Asset Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Depreciation Rate</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Section</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Building / भवन</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">10%</td>
                    <td className="border border-gray-300 px-4 py-3">Section 32</td>
                    <td className="border border-gray-300 px-4 py-3">Factory, office, warehouse</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Plant & Machinery / संयंत्र और मशीनरी</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">15%</td>
                    <td className="border border-gray-300 px-4 py-3">Section 32</td>
                    <td className="border border-gray-300 px-4 py-3">Manufacturing equipment</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Computers & Software / कंप्यूटर और सॉफ्टवेयर</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">40%</td>
                    <td className="border border-gray-300 px-4 py-3">Section 32</td>
                    <td className="border border-gray-300 px-4 py-3">Laptops, servers, software</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Motor Vehicles / मोटर वाहन</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">15%</td>
                    <td className="border border-gray-300 px-4 py-3">Section 32</td>
                    <td className="border border-gray-300 px-4 py-3">Cars, trucks, delivery vans</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Furniture & Fixtures / फर्नीचर और फिक्सचर</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">10%</td>
                    <td className="border border-gray-300 px-4 py-3">Section 32</td>
                    <td className="border border-gray-300 px-4 py-3">Office furniture, fittings</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Note / महत्वपूर्ण नोट</h3>
              <p className="text-yellow-800 text-sm">
                You can claim both interest deduction (Section 37) and depreciation (Section 32) on assets purchased with business loan. 
                However, interest on loan used for purchasing depreciable assets should be capitalized and claimed as depreciation, not as revenue expenditure.
              </p>
            </div>
          </div>

          {/* Other Tax Deductions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Other Tax Deductions / अन्य कर कटौतियां
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Processing Fees / प्रसंस्करण शुल्क</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• One-time deduction in the year of payment / भुगतान के वर्ष में एकमुश्त कटौती</li>
                  <li>• Claimed under Section 37(1) as business expense</li>
                  <li>• Include documentation charges, legal fees</li>
                  <li>• Typically 0.5% - 2% of loan amount</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Prepayment Charges / पूर्व भुगतान शुल्क</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Deductible as business expense / व्यावसायिक व्यय के रूप में कटौती योग्य</li>
                  <li>• Claimed in the year of prepayment</li>
                  <li>• Only if loan was for business purposes</li>
                  <li>• Maintain payment receipts</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal & Professional Fees / कानूनी और पेशेवर शुल्क</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Lawyer fees for loan agreement / ऋण समझौते के लिए वकील शुल्क</li>
                  <li>• CA fees for documentation</li>
                  <li>• Valuation fees for collateral</li>
                  <li>• Deductible under Section 37(1)</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Late Payment Charges / देर से भुगतान शुल्क</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Penalty for delayed EMI payment / विलंबित EMI भुगतान के लिए जुर्माना</li>
                  <li>• Generally not deductible</li>
                  <li>• Considered penal in nature</li>
                  <li>• Avoid late payments to maintain credit score</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tax Calculation Example */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tax Benefit Calculation Example / कर लाभ गणना उदाहरण
            </h2>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Business Loan Scenario / व्यापारिक ऋण परिदृश्य</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-700"><strong>Loan Amount:</strong> ₹20,00,000</p>
                  <p className="text-gray-700"><strong>Interest Rate:</strong> 10% p.a.</p>
                  <p className="text-gray-700"><strong>Tenure:</strong> 5 years</p>
                  <p className="text-gray-700"><strong>Annual Interest (Year 1):</strong> ₹1,90,000</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong>Processing Fee:</strong> ₹20,000</p>
                  <p className="text-gray-700"><strong>Asset Purchased:</strong> Machinery worth ₹20 lakh</p>
                  <p className="text-gray-700"><strong>Depreciation Rate:</strong> 15%</p>
                  <p className="text-gray-700"><strong>Tax Slab:</strong> 30%</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Deduction Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Amount (₹)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Tax Saving @ 30%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Interest Deduction (Section 37)</td>
                    <td className="border border-gray-300 px-4 py-3">₹1,90,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">₹57,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Processing Fee Deduction (Section 37)</td>
                    <td className="border border-gray-300 px-4 py-3">₹20,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">₹6,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Depreciation (Section 32)</td>
                    <td className="border border-gray-300 px-4 py-3">₹3,00,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">₹90,000</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-3 font-bold">Total Tax Saving (Year 1)</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold">₹5,10,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold text-green-700">₹1,53,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Total Benefit / कुल लाभ</h3>
              <p className="text-green-800">
                In this example, the business saves ₹1,53,000 in taxes in the first year alone. 
                Over the 5-year loan tenure, the cumulative tax savings could exceed ₹6 lakh, 
                significantly reducing the effective cost of borrowing.
              </p>
            </div>
          </div>

          {/* Tips to Maximize Tax Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tips to Maximize Tax Benefits / कर लाभ को अधिकतम करने के लिए टिप्स
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Documentation Tips / दस्तावेजीकरण टिप्स</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain separate business bank account / अलग व्यावसायिक बैंक खाता रखें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Keep all loan documents and payment receipts / सभी ऋण दस्तावेज और भुगतान रसीदें रखें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Obtain interest certificate from lender annually</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain depreciation schedule for assets / संपत्ति के लिए मूल्यह्रास अनुसूची बनाए रखें</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Planning Tips / योजना टिप्स</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Consult CA before taking loan / ऋण लेने से पहले CA से परामर्श करें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Ensure loan agreement specifies business purpose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Time loan disbursement for tax planning / कर योजना के लिए ऋण वितरण का समय</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Review and optimize tax strategy annually</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Mistakes to Avoid */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Common Mistakes to Avoid / बचने योग्य सामान्य गलतियां
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Documentation Errors / दस्तावेज़ीकरण त्रुटियां</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Not maintaining proper loan documentation</li>
                  <li>• Missing interest certificates from lender</li>
                  <li>• Mixing personal and business transactions</li>
                  <li>• Incomplete depreciation records</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Claiming Errors / दावा त्रुटियां</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Claiming personal loan interest as business expense</li>
                  <li>• Double claiming (interest + depreciation on same asset)</li>
                  <li>• Not reporting loan proceeds in books</li>
                  <li>• Claiming more than actual interest paid</li>
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
                  Can I claim tax deduction on business loan principal repayment?
                </h3>
                <p className="text-gray-600">
                  No, principal repayment is not directly deductible. However, if you purchase depreciable assets with the loan, 
                  you can claim depreciation on those assets which indirectly provides tax benefit. 
                  Only interest paid is deductible under Section 37(1).
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Is there any limit on business loan interest deduction?
                </h3>
                <p className="text-gray-600">
                  No, there is no upper limit on business loan interest deduction under Section 37(1). 
                  You can claim the entire interest amount paid during the financial year as business expense, 
                  provided it is used for business purposes and properly documented.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can proprietorships and partnerships claim business loan tax benefits?
                </h3>
                <p className="text-gray-600">
                  Yes, all business entities including sole proprietorships, partnerships, LLPs, and companies can claim tax benefits on business loans. 
                  The deduction is claimed in business income computation, reducing taxable profit.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What documents are required to claim business loan tax benefits?
                </h3>
                <p className="text-gray-600">
                  Required documents include loan agreement, sanction letter, bank statements showing EMI payments, 
                  annual interest certificate from lender, asset purchase invoices (if applicable), 
                  and depreciation schedule. Maintain these for 7 years as per Income Tax Act.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I claim tax benefit if I use business loan for personal purposes?
                </h3>
                <p className="text-gray-600">
                  No, tax benefits are available only if the loan is used exclusively for business purposes. 
                  If you use business loan for personal expenses, you cannot claim interest deduction and may face scrutiny from tax authorities. 
                  Always maintain clear distinction between business and personal finances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default TaxBenefits;
