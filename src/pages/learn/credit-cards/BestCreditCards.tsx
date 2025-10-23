import React from 'react';
import { Award, Star, TrendingUp, Zap, Gift, CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const BestCreditCards: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Best Credit Cards in India 2024 - Top 20 Cards Reviewed | MoneyCal"
        description="Complete guide to best credit cards in India 2024. Top cards for cashback, rewards, travel, fuel, lifetime free. Compare features, benefits and choose the perfect card."
        keywords="best credit cards India, top credit cards 2024, best cashback card, best travel card, lifetime free credit cards, premium credit cards"
        canonicalUrl="https://moneycal.in/learn/credit-cards/best-credit-cards"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Best Credit Cards in India 2024 - Complete Review',
          description: 'Comprehensive review of top credit cards in India across all categories',
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
        currentLesson="best-credit-cards"
        breadcrumb={['Learn', 'Credit Cards', 'Best Credit Cards']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Award className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Find Your Perfect Credit Card Match!</h3>
              <p className="text-gray-700">
                With 500+ cards available, we've shortlisted the BEST in each category. 
                Whether you want cashback, travel rewards, or lifetime free - we've got you covered! 🏆💳
              </p>
            </div>
          </div>
        </div>

        {/* Best Lifetime Free Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🥇 Best Lifetime Free Credit Cards (Zero Annual Fee)
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-5 rounded-xl text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">1. Flipkart Axis Bank Credit Card</h3>
                  <p className="text-sm text-blue-100">Best for Online Shopping</p>
                </div>
                <Award className="h-10 w-10" />
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Benefits:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 5% cashback on Flipkart, Myntra</li>
                      <li>• 4% on preferred partners</li>
                      <li>• 1% on all other spends</li>
                      <li>• Lifetime free (₹0 fee forever!)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Eligibility:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Income: ₹18,000/month</li>
                      <li>• Credit Score: 650+</li>
                      <li>• Age: 21-65 years</li>
                      <li>• Easy approval!</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-100 p-2 rounded mt-2 text-xs text-center">
                  <p className="font-bold text-green-800">Annual Savings: ₹10,000-20,000 on ₹2L online shopping!</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-5 rounded-xl text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">2. Amazon Pay ICICI Credit Card</h3>
                  <p className="text-sm text-purple-100">Best for Amazon Prime Members</p>
                </div>
                <Star className="h-10 w-10" />
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Benefits:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 5% cashback on Amazon (Prime)</li>
                      <li>• 2% on Amazon (Non-Prime)</li>
                      <li>• 1% on other spends</li>
                      <li>• Lifetime free (₹0 fee)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Eligibility:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Income: ₹20,000/month</li>
                      <li>• Credit Score: 650+</li>
                      <li>• Instant approval for ICICI customers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-5 rounded-xl text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">3. SBI SimplySAVE Credit Card</h3>
                  <p className="text-sm text-green-100">Best for Dining & Movies</p>
                </div>
                <Gift className="h-10 w-10" />
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Benefits:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 10% off on dining, movies</li>
                      <li>• 5% cashback on groceries, utilities</li>
                      <li>• 1% on all other spends</li>
                      <li>• Fuel surcharge waiver</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Eligibility:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Income: ₹25,000/month</li>
                      <li>• Fee: Waived on ₹1L spend</li>
                      <li>• Credit Score: 700+</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Cashback Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            💰 Best Cashback Credit Cards
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-5 rounded-xl text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">1. SBI Cashback Credit Card</h3>
                  <p className="text-sm text-orange-100">Highest Cashback in India!</p>
                </div>
                <Zap className="h-10 w-10" />
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Benefits:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• <strong>5% cashback</strong> on online (Amazon, Flipkart, etc.)</li>
                      <li>• 1% on offline & wallet recharges</li>
                      <li>• Annual fee: ₹999 (₹4,999 value!)</li>
                      <li>• Waived on ₹2L annual spend</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Annual Earnings:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• ₹2L online spend = ₹10,000 cashback</li>
                      <li>• ₹1L offline = ₹1,000 cashback</li>
                      <li className="font-bold text-green-700">Total: ₹11,000/year!</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-100 p-2 rounded mt-2 text-xs text-center">
                  <p className="font-bold text-green-800">₹999 fee → ₹11,000 cashback = ₹10,000 net profit!</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-400 to-teal-500 p-5 rounded-xl text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">2. HDFC Millennia Credit Card</h3>
                  <p className="text-sm text-green-100">Best All-Rounder</p>
                </div>
                <TrendingUp className="h-10 w-10" />
              </div>
              <div className="bg-white p-4 rounded text-gray-700 text-sm">
                <p className="font-bold text-gray-900 mb-2">Benefits:</p>
                <ul className="space-y-1 text-xs">
                  <li>• 5% cashback on Smartbuy (Amazon, Flipkart vouchers)</li>
                  <li>• 2.5% cashback on PayZapp, SmartBuy utilities</li>
                  <li>• 1% on all other spends</li>
                  <li>• ₹1,000 Amazon voucher on ₹1L spend in first 90 days</li>
                  <li>• Annual fee: ₹1,000 (waived on ₹1L spend)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Travel Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ✈️ Best Travel Credit Cards
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-400 to-purple-500 p-5 rounded-xl text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">1. Axis Magnus Credit Card</h3>
                  <p className="text-sm text-indigo-100">Premium Travel Powerhouse</p>
                </div>
                <Award className="h-10 w-10" />
              </div>
              <div className="bg-white p-4 rounded text-gray-700 text-sm">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Benefits:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 12 Edge Rewards points per ₹200</li>
                      <li>• 25,000 points on ₹1L spend (every month!)</li>
                      <li>• Unlimited airport lounge access</li>
                      <li>• Annual fee: ₹10,000 (worth it for high spenders)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Eligibility:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Income: ₹1.5L/month</li>
                      <li>• Credit Score: 800+</li>
                      <li>• Annual spend: ₹10L+ needed</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-100 p-2 rounded mt-2 text-xs text-center">
                  <p className="font-bold text-purple-800">Value: 20-25% return on ₹10L+ annual spend!</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-400 to-sky-500 p-5 rounded-xl text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">2. HDFC Diners Black Credit Card</h3>
                  <p className="text-sm text-blue-100">Luxury Travel Benefits</p>
                </div>
                <Star className="h-10 w-10" />
              </div>
              <div className="bg-white p-4 rounded text-gray-700 text-sm">
                <p className="font-bold text-gray-900 mb-2">Benefits:</p>
                <ul className="space-y-1 text-xs">
                  <li>• 10 Reward Points per ₹150</li>
                  <li>• 2 free domestic lounge visits/quarter</li>
                  <li>• Unlimited international lounge access</li>
                  <li>• Golf privileges, Priority Pass</li>
                  <li>• Annual fee: ₹10,000</li>
                  <li>• Income: ₹2L/month</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Comparison - Top 10 Cards
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300 text-xs">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">Card Name</th>
                  <th className="border border-gray-300 p-2">Best For</th>
                  <th className="border border-gray-300 p-2">Key Benefit</th>
                  <th className="border border-gray-300 p-2">Annual Fee</th>
                  <th className="border border-gray-300 p-2">Income Req.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-100">
                  <td className="border border-gray-300 p-2 font-semibold">Flipkart Axis</td>
                  <td className="border border-gray-300 p-2">Online shopping</td>
                  <td className="border border-gray-300 p-2">5% Flipkart</td>
                  <td className="border border-gray-300 p-2 text-center text-green-700">₹0</td>
                  <td className="border border-gray-300 p-2 text-center">₹18K</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2 font-semibold">Amazon Pay ICICI</td>
                  <td className="border border-gray-300 p-2">Amazon shopping</td>
                  <td className="border border-gray-300 p-2">5% Amazon</td>
                  <td className="border border-gray-300 p-2 text-center text-green-700">₹0</td>
                  <td className="border border-gray-300 p-2 text-center">₹20K</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 font-semibold">SBI Cashback</td>
                  <td className="border border-gray-300 p-2">All online</td>
                  <td className="border border-gray-300 p-2">5% cashback</td>
                  <td className="border border-gray-300 p-2 text-center">₹999</td>
                  <td className="border border-gray-300 p-2 text-center">₹20K</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2 font-semibold">HDFC Millennia</td>
                  <td className="border border-gray-300 p-2">All-rounder</td>
                  <td className="border border-gray-300 p-2">5% on Smartbuy</td>
                  <td className="border border-gray-300 p-2 text-center">₹1,000*</td>
                  <td className="border border-gray-300 p-2 text-center">₹35K</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 font-semibold">Axis Magnus</td>
                  <td className="border border-gray-300 p-2">Travel</td>
                  <td className="border border-gray-300 p-2">12 pts/₹200</td>
                  <td className="border border-gray-300 p-2 text-center">₹10,000</td>
                  <td className="border border-gray-300 p-2 text-center">₹1.5L</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2 font-semibold">HDFC Regalia</td>
                  <td className="border border-gray-300 p-2">Lifestyle</td>
                  <td className="border border-gray-300 p-2">4 pts/₹150</td>
                  <td className="border border-gray-300 p-2 text-center">₹2,500*</td>
                  <td className="border border-gray-300 p-2 text-center">₹1L</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 font-semibold">ICICI Coral</td>
                  <td className="border border-gray-300 p-2">Mid-range</td>
                  <td className="border border-gray-300 p-2">2 pts/₹100</td>
                  <td className="border border-gray-300 p-2 text-center">₹500*</td>
                  <td className="border border-gray-300 p-2 text-center">₹35K</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2 font-semibold">Axis Vistara</td>
                  <td className="border border-gray-300 p-2">Frequent flyers</td>
                  <td className="border border-gray-300 p-2">Air miles</td>
                  <td className="border border-gray-300 p-2 text-center">₹3,000</td>
                  <td className="border border-gray-300 p-2 text-center">₹50K</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 font-semibold">IndianOil ICICI</td>
                  <td className="border border-gray-300 p-2">Fuel</td>
                  <td className="border border-gray-300 p-2">Fuel waiver</td>
                  <td className="border border-gray-300 p-2 text-center text-green-700">₹0</td>
                  <td className="border border-gray-300 p-2 text-center">₹20K</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2 font-semibold">HDFC Infinia</td>
                  <td className="border border-gray-300 p-2">Ultra premium</td>
                  <td className="border border-gray-300 p-2">16 pts/₹150</td>
                  <td className="border border-gray-300 p-2 text-center">₹10,000</td>
                  <td className="border border-gray-300 p-2 text-center">₹3L</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-600 mt-2">* Fee waived on minimum annual spend</p>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/types-of-credit-cards" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Types of Credit Cards</p>
                <p className="text-sm text-gray-600">Understand all categories</p>
              </a>
              <a href="/learn/credit-cards/choose-best-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">How to Choose</p>
                <p className="text-sm text-gray-600">Match card to needs</p>
              </a>
              <a href="/learn/credit-cards/rewards-cashback" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Maximize Rewards</p>
                <p className="text-sm text-gray-600">Earn ₹50K/year</p>
              </a>
              <a href="/learn/credit-cards/application-process" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Apply Now</p>
                <p className="text-sm text-gray-600">Get approved fast</p>
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
              <span className="text-gray-800">Best lifetime free: Flipkart Axis (5% cashback), Amazon Pay ICICI (5% Amazon), SBI SimplySAVE</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Best cashback: SBI Cashback (5% online = ₹10K/year on ₹2L spend)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Best travel: Axis Magnus (25K bonus/month), HDFC Diners Black (unlimited lounges)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Beginners: Start with lifetime free cards (Flipkart/Amazon) - zero risk, good rewards</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Premium cards worth it only if annual spend &gt; ₹5-10 lakhs (else stick to free cards)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Check income eligibility before applying - wrong applications hurt credit score</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply? 🎯</h2>
          <p className="text-yellow-100 mb-6">
            Choose your perfect card and start earning rewards today!
          </p>
          <a
            href="/learn/credit-cards/application-process"
            className="inline-block bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-yellow-50 transition-colors"
          >
            Application Process Guide →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default BestCreditCards;
