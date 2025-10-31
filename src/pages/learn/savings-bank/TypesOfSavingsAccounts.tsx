import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, CreditCard, Check, X, DollarSign,
  AlertTriangle, Target, CheckCircle, TrendingUp, Shield, Zap, Award
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TypesOfSavingsAccounts: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'zero' | 'regular' | 'salary' | 'premium'>('regular');

  const accountTypes = {
    zero: {
      name: 'Zero Balance Account',
      nameHindi: 'ज़ीरो बैलेंस खाता',
      minBalance: '₹0',
      interest: '2.7-3.5%',
      charges: 'No minimum balance penalty',
      bestFor: 'Students, first-time account holders, low-income users',
      pros: ['No minimum balance required', 'Free debit card', 'Basic banking facilities', 'Ideal for beginners'],
      cons: ['Lower interest rates', 'Limited free transactions', 'Basic features only', 'May have annual fees'],
      topBanks: ['Kotak 811', 'ICICI Bank', 'HDFC DigiSave', 'Axis Bank Asap']
    },
    regular: {
      name: 'Regular Savings Account',
      nameHindi: 'नियमित बचत खाता',
      minBalance: '₹5,000-₹10,000',
      interest: '3.0-4.0%',
      charges: '₹500-₹750/quarter if below minimum',
      bestFor: 'Salaried employees, general public',
      pros: ['Higher interest than zero balance', 'More free transactions', 'Better customer service', 'Branch access'],
      cons: ['Minimum balance required', 'Penalty if balance drops', 'Average interest rates'],
      topBanks: ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank']
    },
    salary: {
      name: 'Salary Account',
      nameHindi: 'सैलरी खाता',
      minBalance: '₹0 (while employed)',
      interest: '3.5-4.0%',
      charges: 'Becomes regular account if no salary for 3 months',
      bestFor: 'Salaried employees (company-provided)',
      pros: ['Zero balance while working', 'Free insurance/OD facility', 'Pre-approved loans', 'Preferential rates'],
      cons: ['Must receive salary monthly', 'Converts to regular if job lost', 'Bank decided by employer'],
      topBanks: ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra']
    },
    premium: {
      name: 'Premium/Wealth Account',
      nameHindi: 'प्रीमियम/वेल्थ खाता',
      minBalance: '₹1,00,000-₹5,00,000',
      interest: '4.0-6.0%',
      charges: '₹5,000-₹10,000/quarter penalty',
      bestFor: 'High net worth individuals (₹10L+ savings)',
      pros: ['Higher interest rates', 'Unlimited ATM withdrawals', 'Dedicated relationship manager', 'Airport lounge access', 'Free insurance'],
      cons: ['Very high minimum balance', 'Steep penalties', 'Opportunity cost (could invest better)'],
      topBanks: ['HDFC Imperia', 'ICICI Wealth', 'Axis Burgundy', 'SBI Wealth']
    }
  };

  const currentType = accountTypes[selectedType];

  return (
    <>
      <SEOHelmet
        title="Types of Savings Accounts India: Zero Balance, Salary, Premium | MoneyCal"
        description="Compare savings accounts in Hindi & English: Zero balance, regular, salary, premium. Features, charges, interest rates. Choose best for your needs."
        keywords="types of savings accounts India, zero balance account, salary account, premium account, savings account comparison, बचत खाते के प्रकार"
        url="/learn/savings-bank-products/types-of-savings-accounts-zero-balance-salary-india"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Savings & Bank Products</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 1 of 8</span>
                <Link 
                  to="/learn/savings-bank-products/fixed-deposits-fd-interest-rates-tax-ladder-strategy-india"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  Lesson 1 • 40 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Types of Savings Accounts in India
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  भारत में बचत खातों के प्रकार - सही चुनाव करें
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Understand 4 types: Zero balance, Regular, Salary, Premium/Wealth accounts',
                  'Compare features, minimum balance, interest rates, charges',
                  'Choose the right account type for your financial situation',
                  'Learn how to avoid penalties and maximize benefits',
                  'Switch between account types when needed'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Interactive Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📊 Interactive Account Comparison
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {(['zero', 'regular', 'salary', 'premium'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    selectedType === type
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {type === 'zero' && 'Zero Balance'}
                  {type === 'regular' && 'Regular'}
                  {type === 'salary' && 'Salary'}
                  {type === 'premium' && 'Premium'}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{currentType.name}</h3>
              <p className="text-blue-700 mb-6">{currentType.nameHindi}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Minimum Balance</div>
                  <div className="text-2xl font-bold text-gray-900">{currentType.minBalance}</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Interest Rate</div>
                  <div className="text-2xl font-bold text-green-700">{currentType.interest}</div>
                </div>
                <div className="bg-white rounded-lg p-4 md:col-span-2">
                  <div className="text-sm text-gray-600 mb-1">Charges</div>
                  <div className="text-lg font-bold text-red-700">{currentType.charges}</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 mb-4">
                <strong className="text-gray-900 block mb-2">👥 Best For:</strong>
                <p className="text-gray-700">{currentType.bestFor}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <strong className="text-green-800 block mb-2">✅ Pros:</strong>
                  <ul className="space-y-1 text-sm text-green-900">
                    {currentType.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <strong className="text-red-800 block mb-2">❌ Cons:</strong>
                  <ul className="space-y-1 text-sm text-red-900">
                    {currentType.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <strong className="text-gray-900 block mb-2">🏦 Top Banks:</strong>
                <div className="flex flex-wrap gap-2">
                  {currentType.topBanks.map((bank, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {bank}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Quick Decision Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🎯 Which Account Should YOU Choose?
            </h2>

            <div className="space-y-4">
              {[
                { situation: 'Student or first job (salary &lt;₹25K)', account: 'Zero Balance', why: 'No penalty if balance is low. Learn banking basics risk-free.' },
                { situation: 'Salaried employee (₹30K-₹1L)', account: 'Salary Account', why: 'Free while employed. Good benefits. No minimum balance pressure.' },
                { situation: 'Freelancer/Business owner', account: 'Regular Account', why: 'Flexible. Can maintain higher balance. Better for varied cash flows.' },
                { situation: 'High net worth (₹10L+ savings)', account: 'Premium/Wealth', why: 'Dedicated service, higher interest, exclusive benefits worth the ₹1L minimum.' }
              ].map((guide, i) => (
                <div key={i} className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
                  <div className="flex items-start justify-between mb-2">
                    <strong className="text-blue-900">{guide.situation}</strong>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                      {guide.account}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700"><strong>Why:</strong> {guide.why}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Key Takeaways
            </h2>
            <div className="space-y-3">
              {[
                'Zero Balance: Best for students, first account. No penalty. Interest 2.7-3.5%.',
                'Regular: Most common. ₹5-10K minimum balance. Interest 3-4%. Penalty ₹500-750/quarter.',
                'Salary: Free while employed. Converts to regular if no salary for 3 months.',
                'Premium: For rich (₹10L+ savings). ₹1L minimum. Interest 4-6%. VIP service.',
                'Choose based on income: &lt;₹25K → Zero Balance, ₹30K-1L → Salary, &gt;₹10L savings → Premium'
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="text-xl font-bold text-white/80">{i + 1}.</span>
                  <p className="text-white">{takeaway}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Detailed Comparison Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg overflow-x-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📊 Complete Comparison Table
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-3 text-left">Feature</th>
                    <th className="p-3">Zero Balance</th>
                    <th className="p-3">Regular</th>
                    <th className="p-3">Salary</th>
                    <th className="p-3">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Minimum Balance</td>
                    <td className="p-3 text-center">₹0</td>
                    <td className="p-3 text-center">₹5K-10K</td>
                    <td className="p-3 text-center">₹0*</td>
                    <td className="p-3 text-center">₹1L-5L</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Interest Rate</td>
                    <td className="p-3 text-center">2.7-3.5%</td>
                    <td className="p-3 text-center">3.0-4.0%</td>
                    <td className="p-3 text-center">3.5-4.0%</td>
                    <td className="p-3 text-center">4.0-6.0%</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Free ATM Withdrawals</td>
                    <td className="p-3 text-center">3-5/month</td>
                    <td className="p-3 text-center">5-10/month</td>
                    <td className="p-3 text-center">10-20/month</td>
                    <td className="p-3 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Debit Card</td>
                    <td className="p-3 text-center">Basic (free)</td>
                    <td className="p-3 text-center">Classic (₹150)</td>
                    <td className="p-3 text-center">Platinum (free)</td>
                    <td className="p-3 text-center">World/Signature</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Netbanking</td>
                    <td className="p-3 text-center">✓ Basic</td>
                    <td className="p-3 text-center">✓ Full</td>
                    <td className="p-3 text-center">✓ Full</td>
                    <td className="p-3 text-center">✓ Priority</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Branch Priority</td>
                    <td className="p-3 text-center">Regular Queue</td>
                    <td className="p-3 text-center">Regular Queue</td>
                    <td className="p-3 text-center">Separate Queue</td>
                    <td className="p-3 text-center">VIP Lounge</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Relationship Manager</td>
                    <td className="p-3 text-center">✗</td>
                    <td className="p-3 text-center">✗</td>
                    <td className="p-3 text-center">✗</td>
                    <td className="p-3 text-center">✓ Dedicated</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Insurance (Accidental)</td>
                    <td className="p-3 text-center">₹1L</td>
                    <td className="p-3 text-center">₹2-5L</td>
                    <td className="p-3 text-center">₹10L</td>
                    <td className="p-3 text-center">₹50L-1Cr</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Locker Discount</td>
                    <td className="p-3 text-center">✗</td>
                    <td className="p-3 text-center">10-20%</td>
                    <td className="p-3 text-center">20-30%</td>
                    <td className="p-3 text-center">50% or Free</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Airport Lounge</td>
                    <td className="p-3 text-center">✗</td>
                    <td className="p-3 text-center">✗</td>
                    <td className="p-3 text-center">2-4/year</td>
                    <td className="p-3 text-center">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>*Note:</strong> Salary account requires monthly salary credit. Converts to regular if no salary for 3 consecutive months.</p>
            </div>
          </motion.section>

          {/* Real Indian Examples */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💡 Real Indian Examples (असली भारतीय उदाहरण)
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <strong className="text-lg text-green-900">Success Story: Rahul (College Student, Mumbai)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> 21 years old, receives ₹8,000/month pocket money from parents. 
                  Wanted to save but worried about minimum balance penalties.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Solution:</strong> Opened <strong>Kotak 811 Zero Balance Account</strong>
                </p>
                <p className="text-gray-700">
                  <strong>Result:</strong> Saved ₹45,000 in 2 years (₹2K-3K per month). No penalty ever paid. 
                  Got 3.5% interest (₹1,575). Learned banking basics. Now upgraded to regular account after getting job at ₹45K/month.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <strong className="text-lg text-blue-900">Smart Move: Priya (Software Engineer, Bengaluru)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> Salary ₹80,000/month. Company gave ICICI Bank salary account. 
                  Bank kept pushing to upgrade to premium account (₹1L minimum balance).
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Decision:</strong> Stuck with <strong>Salary Account</strong> (zero balance). 
                  Put savings in mutual funds SIP instead of keeping ₹1L idle.
                </p>
                <p className="text-gray-700">
                  <strong>Smart Why:</strong> ₹1L in premium account = 5% interest = ₹5,000/year. 
                  Same ₹1L in equity mutual fund = 12% average = ₹12,000/year. Saved ₹7,000 extra + no stress of maintaining balance.
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                  <strong className="text-lg text-purple-900">Worth It: Mr. Sharma (Business Owner, Delhi)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> 45 years old, runs successful export business. 
                  Maintains ₹25 lakh average balance across multiple accounts. Wastes 2 hours/week in bank queues.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Upgrade:</strong> Consolidated to <strong>HDFC Imperia (Premium Account)</strong> - ₹2L minimum balance
                </p>
                <p className="text-gray-700">
                  <strong>Benefits Worth It:</strong> Dedicated RM (handles all work via WhatsApp), VIP lounge in branch (no queue), 
                  Free locker (saves ₹15K/year), Airport lounge unlimited (saves ₹15K/year), Higher FD rates (6% vs 5.5% = extra ₹12,500 on ₹25L), 
                  Priority loan approval. <strong>Total savings: ₹42,000/year + time saved = 104 hours.</strong>
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <strong className="text-lg text-red-900">Mistake to Avoid: Amit (Freelancer, Pune)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> Freelance graphic designer. Irregular income (₹20K some months, ₹1L other months). 
                  Opened regular account with ₹10K minimum balance requirement.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Problem:</strong> In lean months, balance dropped below ₹10K. Paid ₹750 penalty every quarter. 
                  Over 2 years = 8 quarters × ₹750 = <strong>₹6,000 wasted in penalties!</strong>
                </p>
                <p className="text-gray-700">
                  <strong>Better Option:</strong> Should have kept zero balance account for safety. 
                  Transfer to FD/mutual fund when balance crosses ₹50K. For freelancers: <strong>Zero balance account is safer.</strong>
                </p>
              </div>
            </div>
          </motion.section>

          {/* How to Switch Accounts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🔄 How to Switch Between Account Types
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Upgrading (Zero Balance → Regular → Premium)</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                    <div>
                      <strong>Check Eligibility:</strong> Premium needs ₹10L+ average balance for 6 months, 
                      stable income proof (ITR, salary slips).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                    <div>
                      <strong>Visit Branch or Apply Online:</strong> Most banks allow upgrade via netbanking. 
                      Takes 7-10 working days.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                    <div>
                      <strong>Documents Needed:</strong> PAN card, latest ITR, 6 months bank statements, 
                      address proof if changed.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                    <div>
                      <strong>Same Account Number:</strong> Your account number stays same. Only type changes. 
                      No need to update mandates/links.
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-900 mb-4">Downgrading (Premium → Regular → Zero Balance)</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                    <div>
                      <strong>When to Consider:</strong> If you can't maintain minimum balance, or want to invest money instead, 
                      or lost job/income source.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                    <div>
                      <strong>Write to Bank:</strong> Email or letter requesting downgrade. Mention reason (optional). 
                      Most banks process in 5-7 days.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                    <div>
                      <strong>Return Premium Benefits:</strong> Debit card will be downgraded. 
                      Airport lounge access stops. Relationship manager reassigned.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                    <div>
                      <strong>No Penalty:</strong> Banks don't charge for downgrading. You can upgrade again anytime.
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">Special Case: Salary Account After Job Loss</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Automatic Conversion:</strong> If no salary credit for 3 consecutive months, 
                  bank automatically converts to regular savings account.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>What Happens:</strong>
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">→</span>
                    <span>Minimum balance requirement activates (usually ₹10,000)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">→</span>
                    <span>Free ATM withdrawals reduce from 20 to 5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">→</span>
                    <span>Penalties start if below minimum balance</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Pro Tip:</strong> If you lose job, immediately request downgrade to zero balance account 
                  (before 3 months). Avoid penalties during job search period.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Common Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚠️ 7 Common Mistakes to Avoid
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: 'Opening premium account because "bank said it's better"',
                  reality: 'Banks push premium for higher balance. Only worth if you genuinely have ₹10L+ to park idle.',
                  fix: 'Stick to regular/salary account. Invest extra money in FD/mutual funds instead.'
                },
                {
                  mistake: 'Keeping all money in savings account',
                  reality: 'Savings account gives apenas 3-4% interest. Inflation is 6%. You're losing 2% purchasing power every year.',
                  fix: 'Keep apenas 3-6 months emergency fund in savings. Rest in FD (7%), mutual fund (12%), stocks.'
                },
                {
                  mistake: 'Not monitoring minimum balance',
                  reality: '₹750 penalty every quarter = ₹3,000/year wasted! Many people don't even notice these deductions.',
                  fix: 'Set mobile alert when balance drops below ₹12K (if ₹10K minimum needed). Switch to zero balance if struggling.'
                },
                {
                  mistake: 'Ignoring salary account benefits',
                  reality: 'Salary accounts have free insurance (₹5-10L), OD facility, pre-approved loans at lower rates.',
                  fix: 'Use salary account for salary + bills. Open separate zero balance for savings/investments.'
                },
                {
                  mistake: 'Opening too many accounts for "offers"',
                  reality: 'More accounts = more confusion, higher chance of penalties, difficult to track, KYC hassles.',
                  fix: 'Maximum 2 accounts: 1 primary (salary/regular) + 1 backup (zero balance). Close unused accounts.'
                },
                {
                  mistake: 'Not negotiating with bank',
                  reality: 'Banks often waive penalties if you ask, especially for long-term customers. Interest rates can be negotiated for large deposits.',
                  fix: 'Call customer care. Politely explain situation. Ask for one-time waiver. Works 60% of times!'
                },
                {
                  mistake: 'Keeping premium account after retirement',
                  reality: 'After 60, you need money for expenses, not ₹2L sitting idle for "VIP benefits". Airport lounge is useless if you barely travel.',
                  fix: 'Downgrade to senior citizen savings account (higher interest 0.5% extra). Use freed ₹2L for better returns.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-3">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <div>
                      <p className="text-red-900 font-bold mb-2">❌ Mistake: {item.mistake}</p>
                      <p className="text-gray-700 mb-2"><strong>Reality:</strong> {item.reality}</p>
                      <p className="text-green-700"><strong>✅ Fix:</strong> {item.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Expert Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 shadow-lg border-2 border-yellow-400"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              💡 Pro Tips from Banking Experts
            </h2>

            <div className="space-y-4">
              {[
                'Open 2 accounts: Primary (salary/regular) for income + 1 zero balance (different bank) as backup. If ATM card stolen/lost, you have backup.',
                'Link UPI to zero balance account, not salary account. If UPI gets hacked, loss is limited.',
                'Set auto-sweep: If balance crosses ₹50K, automatically transfer to FD. Earns 7% instead of 3.5%. HDFC, ICICI have this feature.',
                'Use credit card for spending, not debit card. Credit card has better fraud protection + cashback/rewards. Pay full bill from savings account.',
                'Senior citizens: Get SCSS (Senior Citizen Savings Scheme) - 8.2% interest (higher than premium account 5-6%). Better option than keeping ₹15L in savings.',
                'Salary account holders: Negotiate for higher insurance cover. Banks give ₹10L, pero you can ask for ₹25-50L if good salary (₹1L+ per month).',
                'Check SMS alerts daily. 90% frauds caught early if you notice unauthorized transactions within 24 hours.',
                'Maintain ₹5K-10K buffer over minimum balance. Don't keep exact minimum. ATM charges, debit card annual fee can cause unexpected drops.'
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800"><strong>Tip {i + 1}:</strong> {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Can I have both zero balance and regular account in same bank?',
                  a: 'Yes! You can have multiple accounts. Pero it's usually not needed. Better to have accounts in 2 different banks for backup.'
                },
                {
                  q: 'If my salary is ₹40K, should I keep ₹10K minimum or invest it?',
                  a: 'Keep apenas 3 months expenses in savings (₹40K × 3 = ₹1.2L). Rest invest in FD/mutual funds. Savings account is apenas for liquidity, not wealth building.'
                },
                {
                  q: 'Premium account charges ₹10,000 penalty. Is it illegal?',
                  a: 'No. You agreed to maintain ₹1L minimum. If you drop below, bank can charge as per terms. Read account opening form carefully.'
                },
                {
                  q: 'Bank offering "free premium upgrade" - should I accept?',
                  a: 'Ask: What\'s the minimum balance? What if I can\'t maintain? Most "free" upgrades have hidden catches (higher minimum after 6 months). Read fine print.'
                },
                {
                  q: 'Lost job. Salary account will become regular. What to do?',
                  a: 'Option 1: Close account, open zero balance elsewhere. Option 2: Request downgrade to zero balance before 3 months. Option 3: Maintain ₹10K minimum (if you have savings).'
                },
                {
                  q: 'Should I keep ₹5 lakh in premium account for higher interest?',
                  a: 'No. Premium gives 5-6% interest. Pero you can get: FD = 7.5%, Debt mutual fund = 8%, Balanced fund = 10%. Premium account makes sense for VIP service, not interest.'
                },
                {
                  q: 'Can I negotiate minimum balance requirement?',
                  a: 'Usually no for standard accounts. Pero if you have ₹10L+ deposits/loans with bank, relationship manager might lower it for you specially.'
                },
                {
                  q: 'Zero balance account has annual fee ₹500. Is it truly zero balance?',
                  a: 'Zero balance means no minimum balance penalty. Annual fees are for debit card/services. Read carefully - some banks have "zero balance" pero charge ₹300-500 annually.'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <p className="font-bold text-lg text-gray-900 mb-2">Q{i + 1}: {faq.q}</p>
                  <p className="text-gray-700"><strong>A:</strong> {faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Action Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your Action Checklist
            </h2>

            <div className="space-y-3">
              {[
                'Check your current account type via netbanking/passbook',
                'Calculate: Did you pay any penalty in last 6 months? If yes, consider zero balance',
                'Check average balance last 6 months. If consistently ₹50K+, explore FD options',
                'Set minimum balance alert at ₹12K (if ₹10K minimum)',
                'If salary account and job stable, use it. Don\'t upgrade to premium unnecessarily',
                'Close unused accounts (makes life simpler)',
                'Keep apenas 3-6 months emergency fund in savings, rest invest',
                'Enable SMS alerts for all transactions'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Master Fixed Deposits (FD) Strategy</h3>
            <p className="mb-6 text-purple-100">Learn FD laddering, tax-saving FDs, when to break FD, and how to get 8%+ returns!</p>
            <Link
              to="/learn/savings-bank-products/fixed-deposits-fd-interest-rates-tax-ladder-strategy-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: FD Complete Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypesOfSavingsAccounts;



