import React from 'react';
import { CreditCard, Gift, Plane, Fuel, Shield, Star, Zap, TrendingUp, CheckCircle, AlertCircle, Award } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const TypesOfCreditCards: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Types of Credit Cards in India 2024 - Complete Guide | MoneyCal"
        description="Discover all types of credit cards in India: Cashback, Rewards, Travel, Fuel, Shopping, Premium cards. Compare features, benefits, fees to choose the best card for your needs."
        keywords="types of credit cards, credit card types India, cashback credit card, rewards credit card, travel credit card, fuel credit card, best credit cards India"
        canonicalUrl="/learn/credit-cards/types-of-credit-cards"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Types of Credit Cards in India 2024 - Complete Guide',
          description: 'Comprehensive guide to all types of credit cards available in India with features, benefits, and recommendations.',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          },
          publisher: {
            '@type': 'Organization',
            name: 'MoneyCal',
            logo: {
              '@type': 'ImageObject',
              url: '/logo.png'
            }
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="types-of-credit-cards"
        breadcrumb={['Learn', 'Credit Cards', 'Types of Credit Cards']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <CreditCard className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why Understanding Card Types Matters</h3>
          <p className="text-gray-700">
                There are 15+ types of credit cards in India! Choosing the right type can earn you ?20,000-50,000 extra per year in rewards. 
                This comprehensive guide helps you pick the perfect card! ???
          </p>
            </div>
          </div>
        </div>

        {/* Main Categories Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Card Types in India (??????? ????? ?? ??????)
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Overview: 8 Main Categories</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">1. Cashback Cards ??</p>
                <p className="text-sm text-gray-600">Get 1-5% cash back on purchases</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">2. Rewards Cards ??</p>
                <p className="text-sm text-gray-600">Earn points, redeem for gifts/vouchers</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">3. Travel Cards ??</p>
                <p className="text-sm text-gray-600">Airport lounge, air miles, travel insurance</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">4. Fuel Cards ?</p>
                <p className="text-sm text-gray-600">Fuel surcharge waiver, cashback</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">5. Shopping Cards ???</p>
                <p className="text-sm text-gray-600">Extra discounts on e-commerce</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">6. Premium/Super Premium ??</p>
                <p className="text-sm text-gray-600">Luxury benefits, concierge service</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">7. Student Cards ??</p>
                <p className="text-sm text-gray-600">Low fees, build credit history</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">8. Secured Cards ??</p>
                <p className="text-sm text-gray-600">Against fixed deposit, for beginners</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Type 1: Cashback Cards */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center mb-2">
              <Gift className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold">1. Cashback Credit Cards ??</h2>
            </div>
            <p className="text-green-100 text-lg">Most Popular in India - Get 1-5% Cash Back!</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What Are Cashback Cards?</h3>
              <p className="text-gray-700 mb-4">
                Cashback credit cards give you a percentage of your spending back as cash - directly credited to your statement or bank account. 
                Simple, transparent, no complex redemption needed!
              </p>

              <div className="bg-green-50 p-5 rounded-lg mb-4">
                <p className="font-bold text-gray-900 mb-3">How It Works:</p>
                <div className="space-y-2 text-gray-700">
                  <p>• Spend ?10,000 ? Get ?500 back (5% cashback)</p>
                  <p>• Cashback credited within 60-90 days</p>
                  <p>• Can be used to pay bill or transferred to account</p>
                  <p>• No points calculation, no redemption hassle!</p>
                </div>
              </div>

              <h4 className="font-bold text-lg text-gray-900 mb-3">Best Cashback Cards in India 2024:</h4>
              
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-5 mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-bold text-lg text-gray-900">HDFC Bank Millennia Credit Card</h5>
                    <p className="text-sm text-gray-600">Best Overall Cashback Card</p>
                  </div>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Top Pick</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Cashback Rate:</p>
                    <p className="text-gray-900">5% on Amazon, Flipkart, Swiggy</p>
                    <p className="text-gray-900">2.5% on other online spends</p>
                    <p className="text-gray-900">1% on offline transactions</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Annual Fee:</p>
                    <p className="text-gray-900">?1,000 (?1L annual spend waiver)</p>
                    <p className="text-sm font-semibold text-gray-700 mt-2">Income Requirement:</p>
                    <p className="text-gray-900">?25,000/month</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded border-2 border-blue-400">
                  <p className="text-sm font-semibold text-gray-900 mb-1">?? Best For:</p>
                  <p className="text-sm text-gray-700">Heavy online shoppers who use Amazon, Flipkart regularly</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-5 mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-bold text-lg text-gray-900">SBI SimplyCLICK Credit Card</h5>
                    <p className="text-sm text-gray-600">Best for E-commerce</p>
                  </div>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">Popular</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Cashback/Rewards:</p>
                    <p className="text-gray-900">10X Rewards on Amazon, Cleartrip</p>
                    <p className="text-gray-900">5X Rewards on other online</p>
                    <p className="text-gray-900">1X on offline (1 reward = ?0.25)</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Annual Fee:</p>
                    <p className="text-gray-900">?499 (?1L spend waiver)</p>
                    <p className="text-sm font-semibold text-gray-700 mt-2">Welcome Benefit:</p>
                    <p className="text-gray-900">?500 Amazon voucher</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-bold text-lg text-gray-900">Flipkart Axis Bank Credit Card</h5>
                    <p className="text-sm text-gray-600">Best for Flipkart Shoppers</p>
                  </div>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">No Fee</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Cashback Rate:</p>
                    <p className="text-gray-900">5% on Flipkart, Myntra, 2GUD</p>
                    <p className="text-gray-900">4% on partner merchants</p>
                    <p className="text-gray-900">1.5% on other spends</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Annual Fee:</p>
                    <p className="text-green-700 font-bold">?0 - LIFETIME FREE!</p>
                    <p className="text-sm font-semibold text-gray-700 mt-2">Welcome Benefit:</p>
                    <p className="text-gray-900">?500 Flipkart voucher</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">?? Who Should Get Cashback Cards:</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>? People who want simple, straightforward rewards</li>
                  <li>? Those who shop online frequently (Amazon, Flipkart)</li>
                  <li>? Users who don't want redemption hassles</li>
                  <li>? Anyone looking for maximum value with minimum complexity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Type 2: Rewards Points Cards */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center mb-2">
              <Award className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold">2. Rewards Points Credit Cards ??</h2>
            </div>
            <p className="text-purple-100 text-lg">Earn Points, Redeem for Amazing Rewards!</p>
          </div>

          <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What Are Rewards Cards?</h3>
            <p className="text-gray-700 mb-4">
              Rewards credit cards give you points for every ?100-150 spent. Accumulate points and redeem for:
              Products, Gift vouchers, Air miles, Hotel stays, Cashback
            </p>

            <div className="bg-purple-50 p-5 rounded-lg mb-4">
              <p className="font-bold text-gray-900 mb-3">How Reward Points Work:</p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border-2 border-purple-300">
                  <p className="font-semibold text-gray-900">Step 1: Earn Points</p>
                  <p className="text-sm text-gray-700">Spend ?100 = Get 1-4 reward points (varies by card)</p>
                </div>
                <div className="bg-white p-3 rounded border-2 border-purple-300">
                  <p className="font-semibold text-gray-900">Step 2: Accumulate</p>
                  <p className="text-sm text-gray-700">Points don't expire for 2-3 years (check card terms)</p>
                </div>
                <div className="bg-white p-3 rounded border-2 border-purple-300">
                  <p className="font-semibold text-gray-900">Step 3: Redeem</p>
                  <p className="text-sm text-gray-700">Exchange for products, vouchers, air miles (typically 1 point = ?0.20-0.50)</p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-lg text-gray-900 mb-3">Top Rewards Cards 2024:</h4>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 rounded-lg p-5">
                <h5 className="font-bold text-lg text-gray-900 mb-3">HDFC Diners Club Black</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Reward Rate:</p>
                    <p className="text-gray-900">5 points per ?150</p>
                    <p className="text-sm text-gray-600">(3.33% value)</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Annual Fee:</p>
                    <p className="text-gray-900">?5,000</p>
                    <p className="text-sm text-gray-600">(?5L spend waiver)</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Best Benefit:</p>
                    <p className="text-gray-900">10X on SmartBuy</p>
                    <p className="text-sm text-gray-600">Lounge access</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5">
                <h5 className="font-bold text-lg text-gray-900 mb-3">Axis Magnus (Premium)</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Reward Rate:</p>
                    <p className="text-gray-900">12 points per ?200</p>
                    <p className="text-sm text-gray-600">Accelerated on partners</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Annual Fee:</p>
                    <p className="text-gray-900">?10,000</p>
                    <p className="text-sm text-gray-600">(?15L milestone benefit)</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Transfer Partners:</p>
                    <p className="text-gray-900">Accor, Vistara</p>
                    <p className="text-sm text-gray-600">Great for travel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">? Rewards Cards Best For:</p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• High spenders (?50,000+ monthly)</li>
                <li>• Those who want flexibility in redemption</li>
                <li>• Travel enthusiasts (convert to air miles)</li>
                <li>• Premium lifestyle users</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Type 3: Travel Credit Cards */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center mb-2">
              <Plane className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold">3. Travel Credit Cards ??</h2>
            </div>
            <p className="text-blue-100 text-lg">For Frequent Flyers & Travel Lovers!</p>
          </div>

          <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What Are Travel Cards?</h3>
            <p className="text-gray-700 mb-4">
              Travel credit cards are designed for frequent travelers. They offer airport lounge access, air miles, 
              travel insurance, hotel discounts, and more!
            </p>

            <div className="bg-blue-50 p-5 rounded-lg mb-4">
              <p className="font-bold text-gray-900 mb-3">Key Travel Card Benefits:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                  <p className="font-semibold text-gray-900">Airport Lounge Access</p>
                  <p className="text-sm text-gray-600">Domestic & International lounges free</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                  <p className="font-semibold text-gray-900">Air Miles/Points</p>
                  <p className="text-sm text-gray-600">Convert to free flights</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                  <p className="font-semibold text-gray-900">Travel Insurance</p>
                  <p className="text-sm text-gray-600">Lost baggage, flight delay cover</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                  <p className="font-semibold text-gray-900">Hotel Discounts</p>
                  <p className="text-sm text-gray-600">Exclusive rates on bookings</p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-lg text-gray-900 mb-3">Best Travel Cards 2024:</h4>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-bold text-lg text-gray-900">Intermiles HDFC Bank Credit Card</h5>
                    <p className="text-sm text-gray-600">Best for Air Miles</p>
                  </div>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">Top Travel</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Air Miles:</p>
                    <p className="text-gray-900">10 miles per ?150 spent</p>
                    <p className="text-gray-900">2X on travel bookings</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Lounge Access:</p>
                    <p className="text-gray-900">4 domestic per year</p>
                    <p className="text-gray-900">Annual Fee: ?1,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-400 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-bold text-lg text-gray-900">Axis Vistara Credit Card</h5>
                    <p className="text-sm text-gray-600">Co-branded with Vistara Airlines</p>
                  </div>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">Popular</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">CV Points:</p>
                    <p className="text-gray-900">1 CV point per ?100</p>
                    <p className="text-gray-900">Bonus on Vistara bookings</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Welcome Benefit:</p>
                    <p className="text-gray-900">Free Vistara ticket</p>
                    <p className="text-gray-900">Annual Fee: ?1,500</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">?? Travel Cards Perfect For:</p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Frequent business travelers (4+ flights/year)</li>
                <li>• People who value airport lounge comfort</li>
                <li>• Those collecting air miles for free flights</li>
                <li>• International travelers needing insurance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Type 4: Fuel Credit Cards */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center mb-2">
              <Fuel className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold">4. Fuel Credit Cards ?</h2>
            </div>
            <p className="text-orange-100 text-lg">Save on Every Fill-Up!</p>
          </div>

          <div className="bg-white border-2 border-orange-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What Are Fuel Cards?</h3>
            <p className="text-gray-700 mb-4">
              Fuel credit cards offer fuel surcharge waivers (1% saved on every transaction) plus additional cashback/rewards on fuel purchases. 
              Perfect for daily commuters and car owners!
            </p>

            <div className="bg-orange-50 p-5 rounded-lg mb-4">
              <p className="font-bold text-gray-900 mb-3">How You Save:</p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border-2 border-orange-300">
                  <p className="font-semibold text-gray-900">1% Fuel Surcharge Waiver</p>
                  <p className="text-sm text-gray-700">Petrol pumps charge 1% extra on card payments - this card waives it!</p>
                  <p className="text-sm font-bold text-green-700">Save: ?10 per ?1,000 spent</p>
                </div>
                <div className="bg-white p-3 rounded border-2 border-orange-300">
                  <p className="font-semibold text-gray-900">Additional Cashback/Rewards</p>
                  <p className="text-sm text-gray-700">Extra 1-2% cashback on top of surcharge waiver</p>
                  <p className="text-sm font-bold text-green-700">Total Savings: 2-3% on fuel!</p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-lg text-gray-900 mb-3">Top Fuel Cards 2024:</h4>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-300 rounded-lg p-5">
                <h5 className="font-bold text-lg text-gray-900 mb-3">Indian Oil Axis Bank Credit Card</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Fuel Benefits:</p>
                    <p className="text-gray-900">4% cashback on Indian Oil</p>
                    <p className="text-gray-900">Surcharge waiver on ?400+</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Annual Fee:</p>
                    <p className="text-green-700 font-bold">?0 - LIFETIME FREE!</p>
                    <p className="text-sm text-gray-600">No income requirement</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-300 rounded-lg p-5">
                <h5 className="font-bold text-lg text-gray-900 mb-3">HDFC BP Credit Card</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Fuel Benefits:</p>
                    <p className="text-gray-900">6X rewards on BP fuel</p>
                    <p className="text-gray-900">25 bonus points per liter</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Annual Fee:</p>
                    <p className="text-gray-900">?500</p>
                    <p className="text-sm text-gray-600">(?50K spend waiver)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-400 rounded-lg p-5">
              <p className="font-bold text-gray-900 mb-3">?? Real Savings Example:</p>
              <div className="bg-white p-4 rounded">
                <p className="text-gray-700 mb-2">Monthly fuel expense: ?5,000</p>
                <p className="text-gray-700 mb-2">Annual fuel: ?60,000</p>
                <p className="text-gray-700 mb-2">Savings at 3%: <span className="font-bold text-green-700 text-lg">?1,800/year</span></p>
                <p className="text-sm text-gray-600 mt-2">That's 2-3 free tank fills per year!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison: All Types</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300 text-sm">
              <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Card Type</th>
                  <th className="border border-gray-300 p-3">Best For</th>
                  <th className="border border-gray-300 p-3">Typical Benefits</th>
                  <th className="border border-gray-300 p-3">Annual Fee Range</th>
                  <th className="border border-gray-300 p-3">Income Required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Cashback</td>
                  <td className="border border-gray-300 p-3">Online shoppers</td>
                  <td className="border border-gray-300 p-3">1-5% cash back</td>
                  <td className="border border-gray-300 p-3">?0-1,000</td>
                  <td className="border border-gray-300 p-3">?25,000/m</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Rewards</td>
                  <td className="border border-gray-300 p-3">High spenders</td>
                  <td className="border border-gray-300 p-3">Points, flexibility</td>
                  <td className="border border-gray-300 p-3">?1,000-10,000</td>
                  <td className="border border-gray-300 p-3">?50,000/m</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Travel</td>
                  <td className="border border-gray-300 p-3">Frequent flyers</td>
                  <td className="border border-gray-300 p-3">Lounge, air miles</td>
                  <td className="border border-gray-300 p-3">?1,000-5,000</td>
                  <td className="border border-gray-300 p-3">?35,000/m</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Fuel</td>
                  <td className="border border-gray-300 p-3">Car owners</td>
                  <td className="border border-gray-300 p-3">Fuel surcharge waiver</td>
                  <td className="border border-gray-300 p-3">?0-500</td>
                  <td className="border border-gray-300 p-3">?20,000/m</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Shopping</td>
                  <td className="border border-gray-300 p-3">E-commerce lovers</td>
                  <td className="border border-gray-300 p-3">Extra discounts</td>
                  <td className="border border-gray-300 p-3">?0-1,000</td>
                  <td className="border border-gray-300 p-3">?25,000/m</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Premium</td>
                  <td className="border border-gray-300 p-3">Luxury lifestyle</td>
                  <td className="border border-gray-300 p-3">Concierge, golf</td>
                  <td className="border border-gray-300 p-3">?5,000-50,000</td>
                  <td className="border border-gray-300 p-3">?1L+/m</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Student</td>
                  <td className="border border-gray-300 p-3">College students</td>
                  <td className="border border-gray-300 p-3">Low fees, limits</td>
                  <td className="border border-gray-300 p-3">?0-250</td>
                  <td className="border border-gray-300 p-3">No income</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Secured</td>
                  <td className="border border-gray-300 p-3">Credit builders</td>
                  <td className="border border-gray-300 p-3">Against FD</td>
                  <td className="border border-gray-300 p-3">?250-500</td>
                  <td className="border border-gray-300 p-3">No income</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Choose */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Choose the Right Type?</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Ask Yourself These Questions:</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-gray-900 mb-2">1. What's your monthly spending pattern?</p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Heavy online shopping ? <strong>Cashback Card</strong></li>
                    <li>• Mix of online/offline ? <strong>Rewards Card</strong></li>
                    <li>• Mostly fuel ? <strong>Fuel Card</strong></li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-gray-900 mb-2">2. How much do you spend monthly?</p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• ?10,000-30,000 ? <strong>Cashback/Fuel Cards</strong></li>
                    <li>• ?30,000-1,00,000 ? <strong>Rewards/Travel Cards</strong></li>
                    <li>• ?1,00,000+ ? <strong>Premium Cards</strong></li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-gray-900 mb-2">3. Do you travel frequently?</p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• 4+ flights/year ? <strong>Travel Card</strong></li>
                    <li>• Occasional travel ? <strong>Rewards Card with travel benefits</strong></li>
                    <li>• No travel ? <strong>Cashback/Shopping Cards</strong></li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-gray-900 mb-2">4. What's your credit score?</p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• No credit history ? <strong>Secured/Student Card</strong></li>
                    <li>• 650-750 ? <strong>Regular Cashback/Rewards</strong></li>
                    <li>• 750+ ? <strong>Premium/Travel Cards</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/what-is-credit-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">? Previous: What is Credit Card?</p>
                <p className="text-sm text-gray-600">Learn the basics before choosing a type</p>
              </a>
              <a href="/learn/credit-cards/choose-best-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Next: How to Choose Best Card ?</p>
                <p className="text-sm text-gray-600">Compare cards and make the right choice</p>
              </a>
              <a href="/learn/credit-cards/rewards-cashback" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Deep Dive: Rewards & Cashback</p>
                <p className="text-sm text-gray-600">Maximize your earnings</p>
              </a>
              <a href="/learn/credit-score/what-is-credit-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Learn: Credit Score Basics</p>
                <p className="text-sm text-gray-600">Improve eligibility for premium cards</p>
              </a>
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section className="mb-12">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Official Resources & Tools:</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-700">
                <strong>RBI Guidelines:</strong> <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Reserve Bank of India - Credit Card Regulations</a>
              </p>
              <p className="text-gray-700">
                <strong>Compare Cards:</strong> <a href="https://www.bankbazaar.com/credit-card.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BankBazaar Credit Card Comparison</a>
              </p>
              <p className="text-gray-700">
                <strong>Check Offers:</strong> <a href="https://www.paisabazaar.com/credit-card/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Paisabazaar Credit Card Offers</a>
              </p>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">?? Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">8 main types: Cashback, Rewards, Travel, Fuel, Shopping, Premium, Student, Secured</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Cashback cards best for online shoppers (HDFC Millennia, SBI SimplyCLICK)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Travel cards give lounge access & air miles (Intermiles, Vistara cards)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Fuel cards save 2-3% on petrol (Indian Oil Axis, HDFC BP cards)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Choose based on spending pattern, income, and lifestyle needs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Start with secured/student cards if new to credit</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Choose Your Perfect Card! ??</h2>
          <p className="text-purple-100 mb-6">
            Now that you know all types, learn how to compare and choose the best credit card for YOUR specific needs!
          </p>
          <a
            href="/learn/credit-cards/choose-best-card"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: How to Choose Best Card ?
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default TypesOfCreditCards;
