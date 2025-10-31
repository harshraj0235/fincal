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

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Master Fixed Deposits</h3>
            <Link
              to="/learn/savings-bank-products/fixed-deposits-fd-interest-rates-tax-ladder-strategy-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: FD Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypesOfSavingsAccounts;



