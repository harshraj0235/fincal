import React from 'react';
import { Scale, Gem, IndianRupee, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ValuationProcess: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Gold Loan Valuation Process - How Banks Value Your Gold 2024 | MoneyCal"
        description="Learn how banks determine gold value for loans. Understand purity testing, weight calculation, LTV ratio, and get maximum loan amount on your gold jewelry."
        keywords="gold loan valuation, gold purity test, gold loan calculation, how banks value gold, gold loan LTV"
        canonicalUrl="/learn/gold-loans/valuation-process"
      />
      
      <LearnLayout
        category="gold-loans"
        currentLesson="valuation-process"
        breadcrumb={['Learn', 'Gold Loans', 'Valuation Process']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Scale className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Understanding gold valuation helps you get the best loan amount! Learn how banks calculate value and maximize your loan eligibility. ⚖️💎
              </p>
            </div>
          </div>
        </div>

        {/* Valuation Formula */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How Gold Valuation Works (स्वर्ण मूल्यांकन)
          </h2>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">The Valuation Formula</h3>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center space-y-4">
                <div className="text-lg text-gray-700">
                  <strong>Loan Amount</strong> = Gold Weight × Purity × Gold Rate × LTV%
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong><br/>
                    50 grams × 91.67% (22K) × ₹6,000/gram × 75% LTV<br/>
                    <span className="text-2xl font-bold text-green-700">= ₹2,06,250</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step by Step Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Valuation Process</h2>
          
          <div className="space-y-6">
            <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <span className="font-bold text-blue-700 text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Purity Testing (शुद्धता परीक्षण)</h3>
              </div>
              
              <p className="text-gray-700 mb-4">Bank checks gold purity using electronic testing machines</p>
              
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">Common Purity Levels:</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="font-bold text-gray-900">24 Karat (99.9% pure)</span>
                      <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm font-bold">100%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="font-bold text-gray-900">22 Karat (91.67% pure)</span>
                      <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm font-bold">91.67%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="font-bold text-gray-900">18 Karat (75% pure)</span>
                      <span className="bg-orange-200 px-3 py-1 rounded-full text-sm font-bold">75%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="font-bold text-gray-900">14 Karat (58.33% pure)</span>
                      <span className="bg-red-200 px-3 py-1 rounded-full text-sm font-bold">58.33%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-100 p-3 rounded">
                  <p className="text-sm text-gray-800">
                    💡 <strong>Note:</strong> Most banks accept 18K to 24K. Some accept 14K but at lower valuation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <span className="font-bold text-green-700 text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Weight Measurement (वजन)</h3>
              </div>
              
              <p className="text-gray-700 mb-4">Precise digital weighing of net gold weight (excluding stones)</p>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">Important Points:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Gross Weight</strong> - Total weight of jewelry</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Net Weight</strong> - Pure gold weight (stones/gems removed)</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Stones, diamonds, pearls are NOT considered in valuation</span>
                  </li>
                </ul>
                
                <div className="mt-4 bg-white p-3 rounded border-2 border-green-300">
                  <p className="text-sm text-gray-800">
                    <strong>Example:</strong> Necklace with stones<br/>
                    Gross Weight: 50g | Stone Weight: 5g<br/>
                    <span className="text-green-700 font-bold">→ Net Gold Weight: 45g (used for loan calculation)</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <span className="font-bold text-purple-700 text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Current Gold Rate</h3>
              </div>
              
              <p className="text-gray-700 mb-4">Banks use today's market gold rate (updated daily)</p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">Rate Sources:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ India Bullion & Jewellers Association (IBJA)</li>
                  <li>✓ Multi Commodity Exchange (MCX)</li>
                  <li>✓ Bank's internal rates (usually 2-3% lower than market)</li>
                </ul>
                
                <div className="mt-4 bg-white p-3 rounded border-2 border-purple-300">
                  <p className="text-gray-800 font-semibold">Current Typical Rates (Example):</p>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-yellow-100 p-2 rounded">
                      <p className="text-sm text-gray-700">24K Gold</p>
                      <p className="font-bold text-gray-900">₹6,500/gram</p>
                    </div>
                    <div className="bg-yellow-100 p-2 rounded">
                      <p className="text-sm text-gray-700">22K Gold</p>
                      <p className="font-bold text-gray-900">₹5,960/gram</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 rounded-full p-3 mr-4">
                  <span className="font-bold text-orange-700 text-lg">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">LTV Ratio Application</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                <strong>Loan-to-Value (LTV)</strong> - Maximum loan as percentage of gold value
              </p>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">RBI Guidelines:</p>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-2 border-orange-300">
                    <p className="text-gray-700">
                      <strong>Regular Banks:</strong> Up to 75% LTV
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border-2 border-orange-300">
                    <p className="text-gray-700">
                      <strong>NBFCs:</strong> Up to 75-80% LTV
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded border-2 border-green-300">
                    <p className="text-sm text-gray-800">
                      💡 <strong>Tip:</strong> NBFCs often offer slightly higher LTV than banks!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Valuation Example</h2>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Rajesh's Gold Loan Calculation</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <p className="font-semibold text-gray-900 mb-2">Gold Jewelry Details:</p>
                <div className="space-y-1 text-gray-700">
                  <p>• Total items: 5 pieces (necklace, bangles, rings)</p>
                  <p>• Gross weight: 100 grams</p>
                  <p>• Stones weight: 10 grams</p>
                  <p>• <strong>Net gold weight: 90 grams</strong></p>
                  <p>• Purity: 22 Karat (91.67%)</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                <p className="font-semibold text-gray-900 mb-2">Step 1: Calculate Pure Gold Weight</p>
                <p className="text-gray-700">
                  90 grams × 91.67% = <strong className="text-blue-700">82.5 grams of pure gold</strong>
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                <p className="font-semibold text-gray-900 mb-2">Step 2: Calculate Gold Value</p>
                <p className="text-gray-700">
                  82.5 grams × ₹6,500/gram (24K rate) = <strong className="text-purple-700">₹5,36,250</strong>
                </p>
              </div>

              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                <p className="font-semibold text-gray-900 mb-2">Step 3: Apply LTV (75%)</p>
                <p className="text-gray-700">
                  ₹5,36,250 × 75% = <strong className="text-green-700 text-2xl">₹4,02,187</strong>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  ✅ Rajesh can get up to ₹4 lakh gold loan!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Factors Affecting Valuation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Factors That Affect Your Loan Amount</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-3">✅ Increases Loan Amount</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Higher purity gold (22K, 24K)</li>
                <li>• More gold weight</li>
                <li>• Rising gold prices</li>
                <li>• Choosing NBFCs (higher LTV)</li>
                <li>• Gold coins/bars from banks</li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
              <h3 className="font-bold text-lg text-red-900 mb-3">❌ Decreases Loan Amount</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lower purity (14K, 18K)</li>
                <li>• Heavy stones/gems (not counted)</li>
                <li>• Falling gold prices</li>
                <li>• Bank's conservative valuation</li>
                <li>• Damaged/broken jewelry</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips to Maximize Your Loan Amount 💡</h2>

          <div className="space-y-4">
            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-lg p-5">
              <Gem className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Pledge Higher Purity Gold</h3>
                <p className="text-gray-700">22K gives better valuation than 18K</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-lg p-5">
              <IndianRupee className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Compare Multiple Banks</h3>
                <p className="text-gray-700">Some banks offer 5-10% better valuation</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-lg p-5">
              <Shield className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Clean Your Gold Jewelry</h3>
                <p className="text-gray-700">Clean gold speeds up valuation process</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Keep Purchase Bills</h3>
                <p className="text-gray-700">Helps verify authenticity and speeds up process</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Loan Amount = Weight × Purity × Gold Rate × LTV%</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Banks accept 18K to 24K gold, with 22K being most common</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">LTV ratio: 75% for banks, up to 80% for NBFCs</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Stones and gems are excluded from gold weight</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Repayment Options! 💳</h2>
          <p className="text-yellow-100 mb-6">
            Learn about different repayment schemes and choose the best EMI plan for your gold loan!
          </p>
          <a
            href="/learn/gold-loans/repayment-options"
            className="inline-block bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-yellow-50 transition-colors"
          >
            Next: Repayment Options →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default ValuationProcess;

