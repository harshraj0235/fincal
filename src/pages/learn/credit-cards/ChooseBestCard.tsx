import React from 'react';
import { Target, CheckCircle, AlertCircle, TrendingUp, DollarSign, Star, Zap } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ChooseBestCard: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Choose Best Credit Card for You in India 2024 | MoneyCal"
        description="Complete guide to choosing the best credit card based on your spending patterns, income, credit score and needs. Compare cashback, rewards, travel, fuel cards and make the right choice."
        keywords="best credit card India, how to choose credit card, credit card comparison, cashback vs rewards, best credit card for beginners"
        canonicalUrl="https://moneycal.in/learn/credit-cards/choose-best-card"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'How to Choose the Best Credit Card - Complete Guide',
          description: 'Step-by-step guide to selecting the perfect credit card based on your needs and spending patterns',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="choose-best-card"
        breadcrumb={['Learn', 'Credit Cards', 'Choose Best Card']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Target className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Find Your Perfect Credit Card Match!</h3>
              <p className="text-gray-700">
                With 500+ credit cards in India, choosing the right one is crucial! Wrong card = wasted benefits. 
                Right card = ₹50,000+ annual rewards. This guide helps you make the perfect choice! 💳✨
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: Know Your Spending Pattern */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Step 1: Analyze Your Spending Pattern (खर्च का पैटर्न)
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Where Do You Spend Most?</h3>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Track Your Monthly Spending:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900 mb-1">🛒 Online Shopping</p>
                      <p className="text-sm text-gray-700">Amazon, Flipkart, Myntra, etc.</p>
                      <p className="text-xs text-gray-600 mt-1">If ₹10K+/month → <strong>Cashback Card</strong></p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-900 mb-1">⛽ Fuel</p>
                      <p className="text-sm text-gray-700">Petrol/Diesel purchases</p>
                      <p className="text-xs text-gray-600 mt-1">If ₹4K+/month → <strong>Fuel Card</strong></p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-1">🍽️ Dining</p>
                      <p className="text-sm text-gray-700">Restaurants, food delivery</p>
                      <p className="text-xs text-gray-600 mt-1">If ₹5K+/month → <strong>Dining Rewards Card</strong></p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="font-bold text-orange-900 mb-1">🛍️ Grocery</p>
                      <p className="text-sm text-gray-700">Supermarkets, BigBasket</p>
                      <p className="text-xs text-gray-600 mt-1">If ₹8K+/month → <strong>Grocery Card</strong></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-pink-50 p-3 rounded">
                      <p className="font-bold text-pink-900 mb-1">✈️ Travel</p>
                      <p className="text-sm text-gray-700">Flights, hotels, bookings</p>
                      <p className="text-xs text-gray-600 mt-1">If ₹15K+/month → <strong>Travel Card</strong></p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="font-bold text-yellow-900 mb-1">💊 Healthcare</p>
                      <p className="text-sm text-gray-700">Medical bills, pharmacy</p>
                      <p className="text-xs text-gray-600 mt-1">Limited options, check rewards</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="font-bold text-red-900 mb-1">🎓 Education</p>
                      <p className="text-sm text-gray-700">School fees, tuition</p>
                      <p className="text-xs text-gray-600 mt-1">High-limit cards needed</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded">
                      <p className="font-bold text-indigo-900 mb-1">📱 Bills & Utilities</p>
                      <p className="text-sm text-gray-700">Phone, electricity, etc.</p>
                      <p className="text-xs text-gray-600 mt-1">Cashback cards work well</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
                <p className="font-bold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  Check your last 3 months' bank statements to identify top 3 spending categories. 
                  Choose a card that rewards those categories most!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Match Card to Income */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Step 2: Match Card to Your Income Level
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Income-Based Card Categories:</h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-5 rounded-lg text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg">Entry-Level Cards</p>
                    <p className="text-sm text-green-100">Income: ₹15,000-30,000/month</p>
                  </div>
                  <Star className="h-8 w-8" />
                </div>
                <div className="bg-white p-4 rounded text-gray-700">
                  <p className="font-semibold text-gray-900 mb-2">Best Options:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Flipkart Axis Bank Credit Card (Lifetime free)</li>
                    <li>• Amazon Pay ICICI Credit Card (Lifetime free)</li>
                    <li>• SBI SimplyCLICK (₹499 annual fee)</li>
                    <li>• HDFC Moneyback+ (₹500 annual fee)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-2">
                    <strong>Benefits:</strong> 1-5% cashback, low/no fees, easy approval
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-5 rounded-lg text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg">Mid-Range Cards</p>
                    <p className="text-sm text-blue-100">Income: ₹30,000-75,000/month</p>
                  </div>
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="bg-white p-4 rounded text-gray-700">
                  <p className="font-semibold text-gray-900 mb-2">Best Options:</p>
                  <ul className="text-sm space-y-1">
                    <li>• HDFC Millennia (₹1,000 annual fee, waived on ₹1L spend)</li>
                    <li>• SBI Cashback Credit Card (₹999 annual fee)</li>
                    <li>• ICICI Coral Credit Card (₹500 annual fee)</li>
                    <li>• Axis Ace Credit Card (₹499 annual fee)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-2">
                    <strong>Benefits:</strong> 5-10% rewards, airport lounge access, fuel waiver
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-5 rounded-lg text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg">Premium Cards</p>
                    <p className="text-sm text-purple-100">Income: ₹75,000-2,00,000/month</p>
                  </div>
                  <Zap className="h-8 w-8" />
                </div>
                <div className="bg-white p-4 rounded text-gray-700">
                  <p className="font-semibold text-gray-900 mb-2">Best Options:</p>
                  <ul className="text-sm space-y-1">
                    <li>• HDFC Regalia (₹2,500 annual fee)</li>
                    <li>• Axis Vistara Credit Card (₹3,000 annual fee)</li>
                    <li>• ICICI Emeralde Credit Card (₹3,000 annual fee)</li>
                    <li>• SBI Prime Credit Card (₹2,999 annual fee)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-2">
                    <strong>Benefits:</strong> 10-15% rewards, complimentary lounges, travel perks
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-5 rounded-lg text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg">Super Premium Cards</p>
                    <p className="text-sm text-yellow-100">Income: ₹2,00,000+/month</p>
                  </div>
                  <DollarSign className="h-8 w-8" />
                </div>
                <div className="bg-white p-4 rounded text-gray-700">
                  <p className="font-semibold text-gray-900 mb-2">Best Options:</p>
                  <ul className="text-sm space-y-1">
                    <li>• HDFC Infinia (₹10,000 annual fee)</li>
                    <li>• Axis Magnus (₹10,000 annual fee)</li>
                    <li>• American Express Platinum (₹50,000 annual fee)</li>
                    <li>• HDFC Diners Black (₹10,000 annual fee)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-2">
                    <strong>Benefits:</strong> 20-33% value, unlimited lounges, concierge, luxury perks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Card Type Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Step 3: Choose Card Type Based on Benefits
          </h2>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-100 border-2 border-orange-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Compare Different Card Types:</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 text-sm">
                <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Card Type</th>
                    <th className="border border-gray-300 p-3">Best For</th>
                    <th className="border border-gray-300 p-3">Rewards</th>
                    <th className="border border-gray-300 p-3">Annual Fee</th>
                    <th className="border border-gray-300 p-3">Example Cards</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">Cashback</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">Online shoppers</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-700">5-10%</td>
                    <td className="border border-gray-300 p-3 text-center">₹0-999</td>
                    <td className="border border-gray-300 p-3 text-xs">SBI Cashback, Amazon Pay</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3 font-semibold">Rewards</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">All spends</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-blue-700">2-10X</td>
                    <td className="border border-gray-300 p-3 text-center">₹500-2,500</td>
                    <td className="border border-gray-300 p-3 text-xs">HDFC Millennia, Regalia</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-gray-300 p-3 font-semibold">Travel</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">Frequent travelers</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-purple-700">15-20X</td>
                    <td className="border border-gray-300 p-3 text-center">₹3,000-10,000</td>
                    <td className="border border-gray-300 p-3 text-xs">Axis Magnus, Vistara</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 p-3 font-semibold">Fuel</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">Daily commuters</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-orange-700">1-5%</td>
                    <td className="border border-gray-300 p-3 text-center">₹0-500</td>
                    <td className="border border-gray-300 p-3 text-xs">IndianOil ICICI, BPCL SBI</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-3 font-semibold">Premium</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">High spenders</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-yellow-700">20-33%</td>
                    <td className="border border-gray-300 p-3 text-center">₹10,000-50,000</td>
                    <td className="border border-gray-300 p-3 text-xs">HDFC Infinia, Amex Platinum</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Decision Tree */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Decision Tree (निर्णय गाइड)
          </h2>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Follow This Simple Guide:</h3>

            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
                <p className="font-bold text-blue-900 mb-3 text-lg">🎯 If You're a Beginner:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>✅ <strong>Start with:</strong> Lifetime free cards (Flipkart Axis, Amazon Pay ICICI)</p>
                  <p>✅ <strong>Why:</strong> No annual fee, easy approval, build credit history</p>
                  <p>✅ <strong>Avoid:</strong> Premium cards with high fees until you understand usage</p>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <p className="font-bold text-green-900 mb-3 text-lg">🛒 If You Shop Online A LOT:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>✅ <strong>Best Choice:</strong> Cashback cards (SBI Cashback 5%, Amazon Pay 5%)</p>
                  <p>✅ <strong>Secondary:</strong> Keep a rewards card for other spends</p>
                  <p>✅ <strong>Annual Savings:</strong> ₹20,000-40,000 on ₹4L online shopping</p>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-300">
                <p className="font-bold text-purple-900 mb-3 text-lg">✈️ If You Travel Frequently:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>✅ <strong>Best Choice:</strong> Travel cards (Axis Magnus, HDFC Diners Black)</p>
                  <p>✅ <strong>Benefits:</strong> Free airport lounges, air miles, hotel discounts</p>
                  <p>✅ <strong>Worth it if:</strong> You fly 6+ times/year or spend ₹2L+/year on travel</p>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-2 border-orange-300">
                <p className="font-bold text-orange-900 mb-3 text-lg">⛽ If You Have High Fuel Expenses:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>✅ <strong>Best Choice:</strong> Fuel credit cards (IndianOil ICICI, BPCL SBI)</p>
                  <p>✅ <strong>Savings:</strong> 1% fuel surcharge waiver + 2-5% rewards</p>
                  <p>✅ <strong>Annual Savings:</strong> ₹3,000-5,000 on ₹60K fuel expenses</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-300">
                <p className="font-bold text-yellow-900 mb-3 text-lg">💰 If You Want Maximum Rewards:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>✅ <strong>Strategy:</strong> Use 2-3 cards for different categories</p>
                  <p>✅ <strong>Card 1:</strong> Cashback for online (5%)</p>
                  <p>✅ <strong>Card 2:</strong> Dining rewards (10X)</p>
                  <p>✅ <strong>Card 3:</strong> General spend (HDFC Regalia 4X)</p>
                  <p>✅ <strong>Result:</strong> Maximize rewards across all spend categories</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            5 Common Mistakes to Avoid (गलतियां)
          </h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Choosing Based on Brand Name Only</h4>
                <p className="text-sm text-gray-700">
                  Premium brand doesn't mean best for you! Match card to YOUR spending pattern, not brand prestige.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Ignoring Annual Fees</h4>
                <p className="text-sm text-gray-700">
                  A ₹10,000 annual fee card needs ₹2-3L spend to break even. Start with free/low fee cards first!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Not Reading Terms & Conditions</h4>
                <p className="text-sm text-gray-700">
                  Hidden charges, reward caps, exclusions can make attractive offers useless. Read fine print!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Applying for Multiple Cards at Once</h4>
                <p className="text-sm text-gray-700">
                  Multiple applications hurt credit score. Apply for one, wait 6 months, then next.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Choosing Card You Can't Afford</h4>
                <p className="text-sm text-gray-700">
                  High limits tempt overspending. Choose card aligned with your income and payment capacity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/types-of-credit-cards" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Types of Credit Cards</p>
                <p className="text-sm text-gray-600">Learn about all card types</p>
              </a>
              <a href="/learn/credit-cards/rewards-cashback" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Rewards vs Cashback</p>
                <p className="text-sm text-gray-600">Understand reward programs</p>
              </a>
              <a href="/learn/credit-cards/application-process" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Application Process</p>
                <p className="text-sm text-gray-600">How to apply once chosen</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Better score = better cards</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Analyze spending pattern FIRST - choose card that rewards your top 3 categories</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Match card to income: Entry (₹15K+), Mid (₹30K+), Premium (₹75K+), Super Premium (₹2L+)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Beginners: Start with lifetime free cards (Flipkart Axis, Amazon Pay ICICI)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Consider annual fee vs benefits: High fee cards need ₹2-3L+ annual spend to be worth it</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Avoid: Choosing by brand, ignoring fees, applying for multiple cards simultaneously</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Pro strategy: Use 2-3 cards for different categories to maximize rewards</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Found Your Perfect Card? Apply Now! 💳</h2>
          <p className="text-blue-100 mb-6">
            Now that you know how to choose, learn the application process to get approved!
          </p>
          <a
            href="/learn/credit-cards/application-process"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Application Process →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default ChooseBestCard;
