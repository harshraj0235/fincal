import React from 'react';
import { Gift, TrendingUp, Star, Zap, CheckCircle, DollarSign, Target, Award } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const RewardsCashback: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Rewards & Cashback Guide - Earn ₹50,000/Year | MoneyCal"
        description="Master credit card rewards! Learn to maximize cashback, redeem points wisely, and earn ₹20,000-50,000 annually. Complete guide with strategies and best cards comparison."
        keywords="credit card rewards, credit card cashback, reward points redemption, maximize credit card rewards, cashback strategies, best reward cards India"
        canonicalUrl="https://moneycal.in/learn/credit-cards/rewards-cashback"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Maximize Credit Card Rewards and Cashback',
          description: 'Complete guide to earning maximum rewards and cashback from credit cards',
          totalTime: 'PT15M',
          step: [
            { '@type': 'HowToStep', name: 'Choose right card type', text: 'Select card matching your spending pattern' },
            { '@type': 'HowToStep', name: 'Use strategically', text: 'Maximize bonus categories and accelerated rewards' },
            { '@type': 'HowToStep', name: 'Redeem wisely', text: 'Get maximum value from points redemption' }
          ]
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="rewards-cashback"
        breadcrumb={['Learn', 'Credit Cards', 'Rewards & Cashback']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Gift className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Earn ₹20,000-50,000 Per Year FREE! 🎁</h3>
          <p className="text-gray-700">
                Smart credit card usage can give you 2-5% back on ALL purchases. If you spend ₹5 lakhs/year, that's ₹10,000-25,000 FREE money! 
                This guide shows exactly how to maximize every rupee. 💰✨
          </p>
            </div>
          </div>
        </div>

        {/* Cashback vs Rewards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cashback vs Reward Points (क्या अंतर है?)
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="h-10 w-10 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-green-900">Cashback 💰</h3>
              </div>

              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Direct money back</strong> - percentage of spending returned as cash
                </p>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">How It Works:</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Spend ₹10,000 with 5% cashback card</p>
                    <p>• Get ₹500 credited to statement</p>
                    <p>• Use to pay next bill or transfer to bank</p>
                    <p className="font-bold text-green-700">• Simple, transparent, instant value!</p>
                  </div>
                </div>

                <div className="bg-green-100 p-3 rounded">
                  <p className="font-bold text-green-900 mb-2">✅ Advantages:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Direct cash value (₹500 = ₹500)</li>
                    <li>• No redemption hassle</li>
                    <li>• Easy to understand</li>
                    <li>• No expiry typically</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-3 rounded border border-red-300">
                  <p className="font-bold text-red-900 mb-2">❌ Limitations:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Usually lower rate (1-5%)</li>
                    <li>• Limited flexibility</li>
                    <li>• Category-specific often</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Star className="h-10 w-10 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-purple-900">Reward Points 🎁</h3>
              </div>

              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Points earned</strong> on spending - redeem for products, vouchers, air miles
                </p>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">How It Works:</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Spend ₹100 = Get 1-4 points</p>
                    <p>• Accumulate over time</p>
                    <p>• Redeem: 1 point = ₹0.20-0.50 value</p>
                    <p className="font-bold text-purple-700">• Flexibility in redemption!</p>
                  </div>
                </div>

                <div className="bg-purple-100 p-3 rounded">
                  <p className="font-bold text-purple-900 mb-2">✅ Advantages:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Higher value potential (3-5%+)</li>
                    <li>• Flexible redemption options</li>
                    <li>• Transfer to airlines/hotels</li>
                    <li>• Premium products available</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-3 rounded border border-red-300">
                  <p className="font-bold text-red-900 mb-2">❌ Limitations:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Points can expire (2-3 years)</li>
                    <li>• Redemption can be complex</li>
                    <li>• Value varies by redemption</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maximizing Rewards Strategy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Earn Maximum Rewards (अधिकतम लाभ कैसे लें)
          </h2>

          <div className="space-y-6">
            {/* Strategy 1 */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Strategy 1: Match Card to Spending Category</h3>
              </div>

              <p className="text-gray-700 mb-4">
                Use different cards for different categories to maximize rewards!
              </p>

              <div className="bg-blue-50 p-5 rounded-lg">
                <p className="font-bold text-gray-900 mb-3">The Multi-Card Strategy:</p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-2 border-blue-300">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-gray-900">For Online Shopping:</p>
                      <p className="text-blue-600 font-bold">5% back</p>
                    </div>
                    <p className="text-sm text-gray-700">Use: HDFC Millennia / Amazon Pay ICICI</p>
                    <p className="text-xs text-gray-600 mt-1">Amazon, Flipkart, Swiggy, Zomato</p>
                  </div>

                  <div className="bg-white p-3 rounded border-2 border-green-300">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-gray-900">For Fuel:</p>
                      <p className="text-green-600 font-bold">4% back</p>
                    </div>
                    <p className="text-sm text-gray-700">Use: Indian Oil Axis / HDFC BP Card</p>
                    <p className="text-xs text-gray-600 mt-1">All petrol pumps</p>
                  </div>

                  <div className="bg-white p-3 rounded border-2 border-purple-300">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-gray-900">For Dining:</p>
                      <p className="text-purple-600 font-bold">10X points</p>
                    </div>
                    <p className="text-sm text-gray-700">Use: Zomato Edition RBL / Swiggy HDFC</p>
                    <p className="text-xs text-gray-600 mt-1">Restaurants, food delivery</p>
                  </div>

                  <div className="bg-white p-3 rounded border-2 border-orange-300">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-gray-900">For Everything Else:</p>
                      <p className="text-orange-600 font-bold">1-2% back</p>
                    </div>
                    <p className="text-sm text-gray-700">Use: SBI SimplyCLICK / Axis Ace</p>
                    <p className="text-xs text-gray-600 mt-1">Bills, groceries, other spends</p>
                  </div>
                </div>

                <div className="mt-4 bg-green-200 p-4 rounded-lg border-2 border-green-500">
                  <p className="font-bold text-gray-900 mb-2">💰 Annual Earnings with ₹5L Spending:</p>
                  <div className="space-y-1 text-sm text-gray-800">
                    <p>Online (₹2L @ 5%): ₹10,000</p>
                    <p>Fuel (₹60K @ 4%): ₹2,400</p>
                    <p>Dining (₹1L @ 3%): ₹3,000</p>
                    <p>Others (₹1.4L @ 1.5%): ₹2,100</p>
                    <p className="font-bold text-green-700 text-lg mt-2 pt-2 border-t-2 border-green-500">
                      Total Rewards: ₹17,500/year FREE! 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy 2 */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Strategy 2: Maximize Bonus Categories</h3>
              </div>

              <p className="text-gray-700 mb-4">
                Most cards offer EXTRA rewards (5X, 10X) on specific categories. Plan purchases around these!
              </p>

              <div className="bg-purple-50 p-5 rounded-lg">
                <p className="font-bold text-gray-900 mb-3">Examples of Bonus Categories:</p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-purple-700 mb-1">HDFC Diners Club Black:</p>
                    <p className="text-sm text-gray-700">10X points on <a href="https://offers.smartbuy.hdfcbank.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">HDFC SmartBuy</a> (Amazon, Flipkart vouchers)</p>
                    <p className="text-xs text-gray-600 mt-1">💡 Buy ₹50K Amazon voucher = 33,333 points = ₹8,333 value (16.6% return!)</p>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-purple-700 mb-1">Axis Magnus:</p>
                    <p className="text-sm text-gray-700">25X points on travel bookings via Axis Travel Edge</p>
                    <p className="text-xs text-gray-600 mt-1">💡 Book ₹50K flight = 6,250 points = ₹1,562 value (3.1% return)</p>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-purple-700 mb-1">SBI Card Elite:</p>
                    <p className="text-sm text-gray-700">10X rewards on dining, groceries, department stores</p>
                    <p className="text-xs text-gray-600 mt-1">💡 Monthly groceries ₹10K = 1,000 points monthly = ₹12,000 annually</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy 3 */}
            <div className="bg-white border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Strategy 3: Sign-Up Bonuses</h3>
              </div>

              <p className="text-gray-700 mb-4">
                Welcome bonuses can give you ₹5,000-50,000 value in first 3 months!
              </p>

              <div className="bg-green-50 p-5 rounded-lg">
                <p className="font-bold text-gray-900 mb-3">Top Welcome Bonuses (2024):</p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-2 border-green-300">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-gray-900">Axis Magnus</p>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">Premium</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">Spend ₹1L in first 30 days</p>
                    <p className="text-sm font-bold text-green-700">Get: 25,000 bonus points (₹6,250 value!)</p>
                  </div>

                  <div className="bg-white p-3 rounded border-2 border-blue-300">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-gray-900">HDFC Infinia</p>
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">Super Premium</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">Spend ₹8L in first 90 days</p>
                    <p className="text-sm font-bold text-blue-700">Get: 10,000 bonus points (₹3,333 value)</p>
                  </div>

                  <div className="bg-white p-3 rounded border-2 border-purple-300">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-gray-900">American Express Platinum Travel</p>
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">Travel</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">Spend ₹1.9L in first 90 days</p>
                    <p className="text-sm font-bold text-purple-700">Get: 50,000 bonus points (₹16,000+ value!)</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-400">
                  <p className="text-sm text-gray-800">
                    <strong>💡 Pro Tip:</strong> Time big purchases (wedding, home renovation, gadgets) with new card sign-up to earn massive bonuses!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Redemption Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Smart Redemption: Get Maximum Value (सही तरीके से भुनाएं)
          </h2>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-400 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">
              Redemption Value Comparison (Same 10,000 Points):
            </h3>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">❌ Worst: Redeem for Products</p>
                    <p className="text-sm text-gray-600">10,000 points = ₹1,500 worth items</p>
                  </div>
                  <p className="text-red-700 font-bold text-xl">₹1,500</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">⚠️ OK: Shopping Vouchers</p>
                    <p className="text-sm text-gray-600">10,000 points = ₹2,000 vouchers</p>
                  </div>
                  <p className="text-yellow-700 font-bold text-xl">₹2,000</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">✅ Good: Statement Credit</p>
                    <p className="text-sm text-gray-600">10,000 points = ₹2,500 off bill</p>
                  </div>
                  <p className="text-green-700 font-bold text-xl">₹2,500</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-blue-400">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">🌟 Better: Air Miles Transfer</p>
                    <p className="text-sm text-gray-600">10,000 points = 5,000 air miles</p>
                  </div>
                  <p className="text-blue-700 font-bold text-xl">₹3,000-5,000</p>
                </div>
              </div>

              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-green-900">🏆 BEST: Accelerated Redemption</p>
                    <p className="text-sm text-gray-600">10,000 points on premium travel booking</p>
                  </div>
                  <p className="text-green-700 font-bold text-2xl">₹5,000-7,000!</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">🎯 Golden Rule of Redemption:</p>
              <p className="text-gray-700">
                <strong>Never redeem for products!</strong> Always go for statement credit, air miles, or hotel points for maximum value.
                Same points can be worth 2-3X more!
              </p>
            </div>
          </div>
        </section>

        {/* Reward Rate Calculation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Reward Rates</h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">How to Calculate Real Return:</h3>

            <div className="bg-purple-50 p-5 rounded-lg mb-4">
              <p className="font-bold text-gray-900 mb-3">Formula:</p>
              <div className="bg-white p-4 rounded border-2 border-purple-400">
                <p className="text-center text-lg font-mono text-gray-900">
                  Return % = (Points Earned × Point Value) / Amount Spent × 100
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900 mb-3">Example 1: HDFC Diners Black (Regular Spend)</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>• Spend: ₹1,500</p>
                  <p>• Points earned: 5 points</p>
                  <p>• Point value: ₹1 each (on accelerated redemption)</p>
                  <p>• Return: (5 × ₹1) / ₹1,500 × 100</p>
                  <p className="font-bold text-blue-700 text-lg mt-2">= 0.33% return (Low)</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-bold text-green-900 mb-3">Example 2: Same Card on SmartBuy (10X)</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>• Spend: ₹1,500 on SmartBuy</p>
                  <p>• Points earned: 50 points (10X bonus!)</p>
                  <p>• Point value: ₹1 each</p>
                  <p>• Return: (50 × ₹1) / ₹1,500 × 100</p>
                  <p className="font-bold text-green-700 text-xl mt-2">= 3.33% return (Excellent!) 🎊</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-100 rounded border border-yellow-400">
              <p className="font-bold text-gray-900 mb-2">🎯 Target Return Rates:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 1-2%: Average</li>
                <li>• 2-3%: Good</li>
                <li>• 3-5%: Excellent</li>
                <li>• 5%+: Outstanding (rare, use bonus categories!)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reward Mistakes to Avoid ⚠️</h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Letting Points Expire</p>
                <p className="text-sm text-gray-700">Most cards: points expire in 2-3 years. Set reminders to redeem!</p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Overspending for Rewards</p>
                <p className="text-sm text-gray-700">
                  DON'T buy things you don't need just for 5% cashback. You lose 95% + pay interest if you can't pay full!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Not Reading Redemption Terms</p>
                <p className="text-sm text-gray-700">
                  Some redemptions need minimum points (5,000), have blackout dates, or poor conversion rates
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Paying Annual Fee for Low-Value Cards</p>
                <p className="text-sm text-gray-700">
                  If rewards earned &lt; annual fee, you're losing money! Example: ₹2,000 fee but only ₹1,500 rewards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Strategies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Reward Hacking 🎓</h2>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-400 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">For Power Users (₹5L+ Annual Spend):</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-indigo-700 mb-2">1. Transfer Points to Travel Partners</p>
                <p className="text-sm text-gray-700 mb-2">
                  Convert credit card points to airline miles at favorable rates
                </p>
                <div className="bg-indigo-50 p-3 rounded text-xs">
                  <p className="text-gray-700">
                    <strong>Example:</strong> Axis Magnus points → Vistara Club Vistara (1:1 transfer)
                  </p>
                  <p className="text-gray-700 mt-1">
                    40,000 points = Free domestic round-trip ticket (₹10,000+ value!)
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-indigo-700 mb-2">2. Milestone Benefits</p>
                <p className="text-sm text-gray-700 mb-2">
                  Many premium cards give bonus rewards at spending milestones
                </p>
                <div className="bg-indigo-50 p-3 rounded text-xs">
                  <p className="text-gray-700">
                    <strong>Example:</strong> Axis Magnus
                  </p>
                  <p className="text-gray-700">• Spend ₹15L in year = 25,000 bonus points</p>
                  <p className="text-gray-700">• Spend ₹25L = Additional 25,000 points</p>
                  <p className="font-bold text-green-700 mt-1">= ₹25,000 extra value just for spending you'd do anyway!</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-indigo-700 mb-2">3. Stack Offers & Rewards</p>
                <p className="text-sm text-gray-700 mb-2">
                  Combine card rewards + merchant cashback + bank offers
                </p>
                <div className="bg-indigo-50 p-3 rounded text-xs">
                  <p className="text-gray-700">
                    <strong>Example:</strong> Buy iPhone for ₹1,00,000
                  </p>
                  <p className="text-gray-700">• 5% card cashback = ₹5,000</p>
                  <p className="text-gray-700">• Flipkart sale discount = ₹10,000</p>
                  <p className="text-gray-700">• Bank offer (₹5K instant discount) = ₹5,000</p>
                  <p className="font-bold text-green-700 mt-1">Total Savings: ₹20,000 (20%!) 🎉</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Earning Potential */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Annual Earning Potential 💰
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300 text-sm">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Annual Spending</th>
                  <th className="border border-gray-300 p-3">At 1% (Basic)</th>
                  <th className="border border-gray-300 p-3">At 2% (Good)</th>
                  <th className="border border-gray-300 p-3">At 3% (Excellent)</th>
                  <th className="border border-gray-300 p-3">At 5% (Optimized)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">₹1,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹1,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹2,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹3,000</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">₹5,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">₹3,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹3,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹6,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹9,000</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">₹15,000</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">₹5,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹5,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹10,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹15,000</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">₹25,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">₹10,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹10,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹20,000</td>
                  <td className="border border-gray-300 p-3 text-center">₹30,000</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold text-lg">₹50,000! 🎊</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-green-100 rounded-lg border-2 border-green-400">
            <p className="font-bold text-gray-900 mb-2">💡 Realistic Goal:</p>
          <p className="text-gray-700">
              With smart card selection and strategic usage, aim for <strong>2.5-3.5% average return</strong> on all spending.
              On ₹5L annual, that's <strong>₹12,500-17,500 free per year!</strong>
          </p>
        </div>
        </section>

        {/* Tools & Resources */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons & Tools:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/types-of-credit-cards" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Types of Credit Cards</p>
                <p className="text-sm text-gray-600">Choose the right card type</p>
              </a>
              <a href="/learn/credit-cards/best-credit-cards" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Best Credit Cards 2024</p>
                <p className="text-sm text-gray-600">Top cards comparison</p>
              </a>
              <a href="/learn/credit-cards/choose-best-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">How to Choose Best Card</p>
                <p className="text-sm text-gray-600">Match card to your needs</p>
              </a>
              <a href="/tools/budget-calculator" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Budget Calculator</p>
                <p className="text-sm text-gray-600">Track spending & rewards</p>
              </a>
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section className="mb-12">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">🔗 Trusted Resources:</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <strong>Compare Cards:</strong> <a href="https://www.cardinsider.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CardInsider - Reward Card Comparison</a>
              </p>
              <p className="text-gray-700">
                <strong>Point Values:</strong> <a href="https://www.bankbazaar.com/credit-card/reward-points.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BankBazaar Reward Points Guide</a>
              </p>
              <p className="text-gray-700">
                <strong>Travel Miles:</strong> <a href="https://www.intermiles.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Intermiles - Air Miles Program</a>
              </p>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Smart card usage can earn ₹20,000-50,000 annually on regular spending</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Cashback = direct money (simple), Rewards = points (more value potential)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Use different cards for different categories (online, fuel, dining) to maximize</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Redeem for statement credit or air miles, NEVER for products (2-3X better value)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Welcome bonuses can give ₹5,000-50,000 value in first 90 days</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">DON'T overspend for rewards - only charge what you can pay FULL!</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Start Earning Rewards Today! 🎁</h2>
          <p className="text-purple-100 mb-6">
            Now you know how to maximize rewards. Learn which specific cards offer the best cashback and how to choose!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/learn/credit-cards/best-credit-cards"
              className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
            >
              Best Cards Comparison →
            </a>
            <a
              href="/learn/credit-cards/choose-best-card"
              className="inline-block bg-purple-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-purple-800 transition-colors"
            >
              Choose Your Perfect Card
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default RewardsCashback;
