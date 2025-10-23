import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const BillingCycle: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Billing Cycle Explained 2024 - Dates & Timeline | MoneyCal"
        description="Complete guide to credit card billing cycle in India. Understand statement date, due date, grace period, interest-free period and optimize your payment timing to save money."
        keywords="credit card billing cycle, statement date, due date, grace period, interest free period, billing date"
        canonicalUrl="https://moneycal.in/learn/credit-cards/billing-cycle"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card Billing Cycle - Complete Guide',
          description: 'Learn how credit card billing cycles work and optimize payment timing',
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
        currentLesson="billing-cycle"
        breadcrumb={['Learn', 'Credit Cards', 'Billing Cycle']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Calendar className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Master the Billing Cycle - Never Pay Interest!</h3>
              <p className="text-gray-700">
                Understanding billing cycles helps you time purchases perfectly, maximize interest-free period (up to 50 days!), 
                and never pay a rupee in interest. This is the secret to smart credit card usage! 📅💰
              </p>
            </div>
          </div>
        </div>

        {/* What is Billing Cycle */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What is Credit Card Billing Cycle? (बिलिंग साइकिल क्या है?)
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Definition:</h3>
            
            <div className="bg-white p-5 rounded-lg border-2 border-green-300 mb-4">
              <p className="text-lg text-gray-800 mb-3">
                <strong>Billing Cycle</strong> = The time period between two credit card statement generation dates (usually 30 days).
              </p>
              
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">Real Example:</p>
                <p className="text-sm text-gray-700">
                  If your statement is generated on <strong>1st of every month</strong>, your billing cycle is from 
                  <strong> 2nd of previous month to 1st of current month</strong> (30 days).
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-bold text-gray-900 mb-3">Key Dates in Billing Cycle:</p>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white p-3 rounded text-center">
                  <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Statement Date</p>
                  <p className="text-xs text-gray-600">1st of month</p>
                  <p className="text-xs text-blue-700 mt-1">Bill generated</p>
                </div>
                <div className="bg-white p-3 rounded text-center">
                  <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Due Date</p>
                  <p className="text-xs text-gray-600">20th of month</p>
                  <p className="text-xs text-orange-700 mt-1">Last date to pay</p>
                </div>
                <div className="bg-white p-3 rounded text-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Grace Period</p>
                  <p className="text-xs text-gray-600">20 days</p>
                  <p className="text-xs text-green-700 mt-1">Interest-free</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Visualization */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Billing Cycle Timeline (समय रेखा)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">30-Day Billing Cycle Example:</h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-5 rounded-lg border-2 border-blue-400">
                <p className="font-bold text-blue-900 mb-3 text-lg">📅 Example Timeline (Dec-Jan):</p>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded border-2 border-gray-300">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">2nd December - 1st January</p>
                        <p className="text-sm text-gray-600">Billing Cycle Period (30 days)</p>
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">Active</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      All transactions made during this period will appear in next statement
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded border-2 border-green-300">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">1st January</p>
                        <p className="text-sm text-gray-600">Statement Generation Date</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Statement</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Your bill is generated showing all transactions from 2nd Dec to 1st Jan
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded border-2 border-orange-300">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">2nd January - 20th January</p>
                        <p className="text-sm text-gray-600">Grace Period (19 days)</p>
                      </div>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">Grace</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      You have 19 days to pay the bill without any interest charges
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded border-2 border-red-300">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">20th January</p>
                        <p className="text-sm text-gray-600">Payment Due Date</p>
                      </div>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">Deadline</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Last date</strong> to pay without late fee. Pay before this date!
                    </p>
                  </div>

                  <div className="bg-red-100 p-4 rounded border-2 border-red-500">
                    <div className="flex items-center mb-2">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <p className="font-bold text-red-900">21st January onwards</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      If not paid: Late fee (₹500-1,500) + Interest (42% p.a.) + CIBIL score drops
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-400">
                <p className="font-bold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  Set auto-pay for <strong>3 days before due date</strong> to account for bank processing time. 
                  Never wait till the last day!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interest-Free Period */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interest-Free Period Magic (ब्याज मुक्त अवधि)
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-blue-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Get 20-50 Days Interest-Free Credit!</h3>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <p className="font-bold text-gray-900 mb-3 text-lg">How It Works:</p>
                
                <div className="space-y-3">
                  <div className="bg-green-50 p-4 rounded">
                    <p className="font-bold text-green-900 mb-2">Scenario 1: Purchase on Day 1 of Cycle</p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>• Purchase date: <strong>2nd December</strong></p>
                      <p>• Statement date: <strong>1st January</strong> (30 days later)</p>
                      <p>• Due date: <strong>20th January</strong> (20 more days)</p>
                      <p className="font-bold text-green-700">Total interest-free: 30 + 20 = <strong>50 days!</strong></p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded">
                    <p className="font-bold text-blue-900 mb-2">Scenario 2: Purchase on Last Day of Cycle</p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>• Purchase date: <strong>1st January</strong></p>
                      <p>• Statement date: <strong>1st January</strong> (same day)</p>
                      <p>• Due date: <strong>20th January</strong> (20 days)</p>
                      <p className="font-bold text-blue-700">Total interest-free: <strong>20 days only</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-5 rounded-lg border-2 border-green-500">
                <p className="font-bold text-gray-900 mb-3 text-lg">🎯 Smart Strategy:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Make large purchases RIGHT AFTER statement date for maximum 50-day free period</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Avoid purchases just before statement date (only get 20 days)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Plan big spends (appliances, electronics) around billing cycle</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded mt-3 border-2 border-green-400">
                  <p className="font-bold text-gray-900 text-sm mb-1">Real Savings Example:</p>
                  <p className="text-xs text-gray-700">
                    Buy ₹50,000 laptop on 2nd Dec → Get till 20th Jan to pay (50 days) → 
                    Keep ₹50K in FD earning 6% = ₹410 interest earned for free!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates Explained */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Important Dates Explained (महत्वपूर्ण तिथियां)
          </h2>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
            <div className="space-y-5">
              <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
                <div className="flex items-center mb-3">
                  <Calendar className="h-7 w-7 text-blue-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">1. Statement Generation Date</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  The date when your monthly bill is prepared and sent to you.
                </p>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-gray-900 mb-2">What Happens:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• All transactions from previous cycle are totaled</li>
                    <li>• Statement PDF is generated</li>
                    <li>• Email/SMS sent with bill summary</li>
                    <li>• Available in mobile app/net banking</li>
                    <li>• New billing cycle starts next day</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <Clock className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">2. Payment Due Date</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  Last date to make payment without late fee or interest charges.
                </p>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-gray-900 mb-2">Critical Rules:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Minimum 15-20 days after statement date (RBI rule)</li>
                    <li>• Payment must be credited BY this date</li>
                    <li>• Different for each card type/bank</li>
                    <li>• Missing this = Late fee + Interest + CIBIL damage</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-300">
                <div className="flex items-center mb-3">
                  <DollarSign className="h-7 w-7 text-purple-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">3. Grace Period (Interest-Free)</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  Time between statement date and due date where you can pay without interest.
                </p>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-gray-900 mb-2">Details:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Typically 15-25 days (varies by bank)</li>
                    <li>• Available ONLY if you paid full last month</li>
                    <li>• Lost if you carry forward balance</li>
                    <li>• Applies to purchases only (NOT cash withdrawals)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Example Walkthrough */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Real Billing Cycle Example (वास्तविक उदाहरण)
          </h2>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Meet Rahul - Let's Track His Billing Cycle:</h3>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-gray-300">
                <p className="font-bold text-gray-900 mb-3">Rahul's Card Details:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Statement Date: 15th of every month</li>
                  <li>• Due Date: 5th of next month</li>
                  <li>• Grace Period: 20 days</li>
                  <li>• Credit Limit: ₹1,00,000</li>
                </ul>
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-bold text-blue-900 mb-1">5th December:</p>
                  <p className="text-gray-700">Bought ₹15,000 laptop on Amazon</p>
                </div>

                <div className="bg-green-50 p-3 rounded">
                  <p className="font-bold text-green-900 mb-1">10th December:</p>
                  <p className="text-gray-700">Paid ₹2,000 for dinner</p>
                </div>

                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-bold text-purple-900 mb-1">15th December (Statement Date):</p>
                  <p className="text-gray-700">Statement generated showing ₹17,000 total</p>
                </div>

                <div className="bg-orange-50 p-3 rounded">
                  <p className="font-bold text-orange-900 mb-1">20th December:</p>
                  <p className="text-gray-700">Bought ₹5,000 groceries (goes to NEXT statement)</p>
                </div>

                <div className="bg-yellow-100 p-3 rounded border-2 border-yellow-400">
                  <p className="font-bold text-gray-900 mb-1">3rd January (Before Due Date):</p>
                  <p className="text-gray-700">Rahul pays full ₹17,000</p>
                  <p className="text-green-700 font-bold text-xs mt-1">✅ No interest! No late fee! Credit score safe!</p>
                </div>

                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-bold text-blue-900 mb-1">5th January (Due Date):</p>
                  <p className="text-gray-700">Payment received, marked as paid on time</p>
                </div>

                <div className="bg-green-100 p-3 rounded border-2 border-green-400">
                  <p className="font-bold text-green-900 mb-1">15th January (Next Statement):</p>
                  <p className="text-gray-700">New bill shows only ₹5,000 (grocery from 20th Dec)</p>
                  <p className="text-green-700 font-bold text-xs mt-1">✅ Rahul's cycle continues smoothly!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Billing Cycle Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            5 Common Billing Cycle Mistakes (गलतियां)
          </h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Confusing Statement Date with Due Date</h4>
                <p className="text-sm text-gray-700">
                  Statement on 1st doesn't mean due on 1st! Check your specific due date (usually 15-25 days later).
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Paying ON Due Date (Not Before)</h4>
                <p className="text-sm text-gray-700">
                  Bank processing takes 1-2 days! Payment made on due date might credit AFTER, causing late fee. Pay 3 days early!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Not Knowing Your Billing Cycle</h4>
                <p className="text-sm text-gray-700">
                  Leads to surprise bills and missed payments. Check statement for your specific cycle dates.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Assuming Transactions Appear Immediately</h4>
                <p className="text-sm text-gray-700">
                  Transactions can take 2-3 days to appear. Your available limit may not show recent spends yet.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Ignoring Credit Utilization Reporting Date</h4>
                <p className="text-sm text-gray-700">
                  Banks report utilization on statement date, not due date! Pay BEFORE statement to show low utilization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Optimization Strategies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Billing Cycle Optimization Strategies (रणनीतियां)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Tips to Maximize Benefits:</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">Strategy 1: Time Large Purchases</p>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Make big purchases 2-3 days AFTER statement date for maximum interest-free period.
                </p>
                <div className="bg-green-50 p-2 rounded text-xs text-gray-700">
                  Example: Statement on 1st → Buy ₹50K on 3rd → Get till 20th next month = 47 days free credit!
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">Strategy 2: Pay Before Statement Date</p>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  To show low credit utilization (boosts score), pay BEFORE statement is generated.
                </p>
                <div className="bg-blue-50 p-2 rounded text-xs text-gray-700">
                  Example: Spent ₹80K, pay ₹60K before statement → Statement shows only ₹20K = 20% utilization!
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-purple-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">Strategy 3: Use Multiple Cards</p>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  If you have 2 cards with different billing dates, optimize spending across both.
                </p>
                <div className="bg-purple-50 p-2 rounded text-xs text-gray-700">
                  Card 1: Statement 1st → Use for early month purchases | Card 2: Statement 15th → Use for mid-month purchases
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-orange-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">Strategy 4: Set Calendar Reminders</p>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Never miss due date! Set 3 reminders:
                </p>
                <div className="bg-orange-50 p-2 rounded text-xs text-gray-700 space-y-1">
                  <p>• Statement date (check bill received)</p>
                  <p>• 3 days before due (make payment)</p>
                  <p>• Due date (verify payment credited)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/statement-guide" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Statement Reading Guide</p>
                <p className="text-sm text-gray-600">Understand your bill</p>
              </a>
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">Payment Strategy</p>
                <p className="text-sm text-gray-600">Why pay full before due</p>
              </a>
              <a href="/learn/credit-cards/interest-rates-charges" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Interest & Charges</p>
                <p className="text-sm text-gray-600">42% APR explained</p>
              </a>
              <a href="/learn/credit-score/how-calculated" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Credit Score Factors</p>
                <p className="text-sm text-gray-600">Utilization timing matters</p>
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
              <span className="text-gray-800">Billing cycle = 30 days between statements, usually fixed dates (e.g., 1st-1st, 15th-15th)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Key dates: Statement date → Due date (15-25 days later) → Grace period</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Interest-free period: 20-50 days (maximum if you buy just after statement date)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Pay 3 days BEFORE due date to ensure payment credits on time</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit utilization reported on statement date, not due date - pay early to show low utilization</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Optimize: Large purchases after statement date, pay before statement for low utilization, set reminders</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Master the Timing! ⏰</h2>
          <p className="text-blue-100 mb-6">
            Now understand your statement and make smart payment decisions!
          </p>
          <a
            href="/learn/credit-cards/statement-guide"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Read Your Statement →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default BillingCycle;
