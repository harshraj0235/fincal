import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Search, TrendingUp, Shield, CreditCard, Building2,
  Smartphone, Briefcase, Globe, Brain, ArrowRight, Star, Clock,
  Target, Award, Users, Zap, ChevronRight, Filter, Sparkles, Wallet
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

/**
 * MoneyCal Learn Hub - Complete Financial Education Platform
 * 10 Categories | 75+ Comprehensive Lessons
 * Hindi + English | Indian Context | Free Forever
 */

interface LearnCategory {
  id: string;
  name: string;
  nameHindi: string;
  icon: React.ReactNode;
  description: string;
  totalLessons: number;
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed';
  color: string;
  status: 'available' | 'coming-soon';
  slug: string;
}

const LearnHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const learnCategories: LearnCategory[] = [
    {
      id: '1',
      name: 'Money Management & Budgeting',
      nameHindi: 'पैसे का प्रबंधन और बजट',
      icon: <Shield className="w-8 h-8" />,
      description: 'Master budgeting, emergency funds, cash flow, and wealth-building habits',
      totalLessons: 8,
      estimatedHours: 6,
      difficulty: 'Beginner',
      color: 'from-green-500 to-emerald-600',
      status: 'available',
      slug: 'money-management'
    },
    {
      id: '2',
      name: 'Savings & Bank Products',
      nameHindi: 'बचत और बैंक उत्पाद',
      icon: <CreditCard className="w-8 h-8" />,
      description: 'FDs, RDs, savings accounts, and maximizing bank returns in India',
      totalLessons: 8,
      estimatedHours: 5,
      difficulty: 'Beginner',
      color: 'from-blue-500 to-cyan-600',
      status: 'available',
      slug: 'savings-bank-products'
    },
    {
      id: '11',
      name: 'Loan Basics & Fundamentals',
      nameHindi: 'लोन की बुनियादी बातें',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'Understand loans: EMI, interest rates, CIBIL, eligibility, secured vs unsecured',
      totalLessons: 20,
      estimatedHours: 12,
      difficulty: 'Beginner',
      color: 'from-indigo-500 to-blue-600',
      status: 'available',
      slug: 'loans'
    },
    {
      id: '12',
      name: 'Home Loans Complete Guide',
      nameHindi: 'होम लोन संपूर्ण गाइड',
      icon: <Globe className="w-8 h-8" />,
      description: 'Home loan eligibility, tax benefits, prepayment, balance transfer, documentation',
      totalLessons: 20,
      estimatedHours: 14,
      difficulty: 'Intermediate',
      color: 'from-orange-500 to-red-600',
      status: 'available',
      slug: 'home-loans'
    },
    {
      id: '13',
      name: 'Personal Loans Mastery',
      nameHindi: 'पर्सनल लोन में महारत',
      icon: <Wallet className="w-8 h-8" />,
      description: 'Personal loan types, instant approval, interest rates, debt consolidation',
      totalLessons: 21,
      estimatedHours: 12,
      difficulty: 'Beginner',
      color: 'from-pink-500 to-rose-600',
      status: 'available',
      slug: 'personal-loans'
    },
    {
      id: '14',
      name: 'Vehicle Loans (Car, Bike)',
      nameHindi: 'वाहन लोन (कार, बाइक)',
      icon: <Target className="w-8 h-8" />,
      description: 'Car loans, bike loans, interest rates, insurance, down payment strategies',
      totalLessons: 16,
      estimatedHours: 10,
      difficulty: 'Beginner',
      color: 'from-teal-500 to-cyan-600',
      status: 'available',
      slug: 'vehicle-loans'
    },
    {
      id: '15',
      name: 'Business Loans & MSME',
      nameHindi: 'व्यवसाय लोन और एमएसएमई',
      icon: <Briefcase className="w-8 h-8" />,
      description: 'Business loans, MSME schemes, Mudra loan, working capital, startup financing',
      totalLessons: 16,
      estimatedHours: 11,
      difficulty: 'Advanced',
      color: 'from-purple-500 to-indigo-600',
      status: 'available',
      slug: 'business-loans'
    },
    {
      id: '16',
      name: 'Credit Cards Complete Guide',
      nameHindi: 'क्रेडिट कार्ड संपूर्ण गाइड',
      icon: <CreditCard className="w-8 h-8" />,
      description: 'Credit card basics, rewards, EMI, interest charges, fraud protection, best cards',
      totalLessons: 21,
      estimatedHours: 13,
      difficulty: 'Beginner',
      color: 'from-yellow-500 to-amber-600',
      status: 'available',
      slug: 'credit-cards'
    },
    {
      id: '17',
      name: 'Credit Score & CIBIL',
      nameHindi: 'क्रेडिट स्कोर और सिबिल',
      icon: <Star className="w-8 h-8" />,
      description: 'Check credit score free, improve CIBIL, dispute errors, loan approval impact',
      totalLessons: 11,
      estimatedHours: 7,
      difficulty: 'Intermediate',
      color: 'from-emerald-500 to-green-600',
      status: 'available',
      slug: 'credit-score'
    },
    {
      id: '18',
      name: 'Education Loans Guide',
      nameHindi: 'शिक्षा लोन गाइड',
      icon: <Users className="w-8 h-8" />,
      description: 'Study in India/abroad, collateral-free loans, scholarships, tax benefits',
      totalLessons: 11,
      estimatedHours: 8,
      difficulty: 'Intermediate',
      color: 'from-blue-500 to-indigo-600',
      status: 'available',
      slug: 'education-loans'
    },
    {
      id: '19',
      name: 'Gold Loans Complete Guide',
      nameHindi: 'गोल्ड लोन संपूर्ण गाइड',
      icon: <Award className="w-8 h-8" />,
      description: 'Gold loan basics, interest rates, best banks, valuation, repayment options',
      totalLessons: 11,
      estimatedHours: 7,
      difficulty: 'Beginner',
      color: 'from-yellow-500 to-orange-600',
      status: 'available',
      slug: 'gold-loans'
    },
    {
      id: '3',
      name: 'Investing & Wealth Creation',
      nameHindi: 'निवेश और संपत्ति निर्माण',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Stocks, mutual funds, SIPs, asset allocation for long-term wealth',
      totalLessons: 10,
      estimatedHours: 8,
      difficulty: 'Mixed',
      color: 'from-purple-500 to-indigo-600',
      status: 'coming-soon',
      slug: 'investing-wealth'
    },
    {
      id: '4',
      name: 'Insurance, Retirement & Estate',
      nameHindi: 'बीमा, सेवानिवृत्ति और संपत्ति',
      icon: <Shield className="w-8 h-8" />,
      description: 'Life, health insurance, NPS, retirement planning, and estate basics',
      totalLessons: 7,
      estimatedHours: 6,
      difficulty: 'Intermediate',
      color: 'from-red-500 to-orange-600',
      status: 'coming-soon',
      slug: 'insurance-retirement'
    },
    {
      id: '5',
      name: 'Taxation & Compliance',
      nameHindi: 'कर और अनुपालन',
      icon: <Building2 className="w-8 h-8" />,
      description: 'Income tax, 80C deductions, ITR filing, and tax optimization',
      totalLessons: 7,
      estimatedHours: 5,
      difficulty: 'Intermediate',
      color: 'from-yellow-500 to-amber-600',
      status: 'coming-soon',
      slug: 'taxation-compliance'
    },
    {
      id: '6',
      name: 'FinTech & Digital Payments',
      nameHindi: 'फिनटेक और डिजिटल भुगतान',
      icon: <Smartphone className="w-8 h-8" />,
      description: 'UPI, digital wallets, online banking, and cybersecurity',
      totalLessons: 6,
      estimatedHours: 4,
      difficulty: 'Beginner',
      color: 'from-pink-500 to-rose-600',
      status: 'coming-soon',
      slug: 'fintech-payments'
    },
    {
      id: '7',
      name: 'Business Finance & Entrepreneurship',
      nameHindi: 'व्यवसाय वित्त और उद्यमिता',
      icon: <Briefcase className="w-8 h-8" />,
      description: 'Startup funding, business loans, cash flow, scaling strategies',
      totalLessons: 7,
      estimatedHours: 6,
      difficulty: 'Advanced',
      color: 'from-teal-500 to-cyan-600',
      status: 'coming-soon',
      slug: 'business-entrepreneurship'
    },
    {
      id: '8',
      name: 'Advanced Topics & Specialised Finance',
      nameHindi: 'उन्नत विषय और विशेष वित्त',
      icon: <Globe className="w-8 h-8" />,
      description: 'Real estate, commodities, forex, global markets, derivatives',
      totalLessons: 7,
      estimatedHours: 7,
      difficulty: 'Advanced',
      color: 'from-indigo-500 to-purple-600',
      status: 'coming-soon',
      slug: 'advanced-finance'
    },
    {
      id: '9',
      name: 'Behavioural Finance & Money Psychology',
      nameHindi: 'व्यवहार वित्त और पैसे की मनोविज्ञान',
      icon: <Brain className="w-8 h-8" />,
      description: 'Money mindset, biases, habits, emotional spending control',
      totalLessons: 7,
      estimatedHours: 5,
      difficulty: 'Mixed',
      color: 'from-orange-500 to-red-600',
      status: 'coming-soon',
      slug: 'behavioural-finance'
    },
    {
      id: '10',
      name: 'Crypto & Emerging Assets',
      nameHindi: 'क्रिप्टो और उभरते संपत्ति',
      icon: <Zap className="w-8 h-8" />,
      description: 'Bitcoin, Ethereum, NFTs, blockchain basics for Indian investors',
      totalLessons: 6,
      estimatedHours: 4,
      difficulty: 'Advanced',
      color: 'from-violet-500 to-fuchsia-600',
      status: 'coming-soon',
      slug: 'crypto-emerging'
    }
  ];

  const filteredCategories = learnCategories.filter(cat => {
    const matchesSearch = 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.nameHindi.includes(searchQuery) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = 
      selectedDifficulty === 'all' || 
      cat.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    
    return matchesSearch && matchesDifficulty;
  });

  const stats = {
    totalCategories: learnCategories.length,
    totalLessons: learnCategories.reduce((sum, cat) => sum + cat.totalLessons, 0),
    totalHours: learnCategories.reduce((sum, cat) => sum + cat.estimatedHours, 0),
    availableNow: learnCategories.filter(c => c.status === 'available').length
  };

  return (
    <>
      <SEOHelmet
        title="Learn Financial Planning for Free - 75+ Lessons | MoneyCal India"
        description="Master personal finance with 75+ free lessons in Hindi & English. Money management, investing, taxation, insurance, business finance. Indian context, expert guidance."
        keywords="financial education India, learn personal finance Hindi, money management course, investing lessons, taxation guide India, free financial literacy, वित्तीय शिक्षा"
        url="/learn"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex justify-center items-center gap-3 mb-6">
                <Sparkles className="w-12 h-12 text-yellow-300" />
                <h1 className="text-5xl md:text-6xl font-bold">
                  MoneyCal Learn
                </h1>
              </div>
              <p className="text-2xl md:text-3xl mb-4 text-white/90">
                Master Personal Finance - 100% Free Forever
              </p>
              <p className="text-xl md:text-2xl text-white/80 mb-8">
                वित्तीय शिक्षा - हिंदी और अंग्रेजी में | भारतीय संदर्भ
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                {[
                  { icon: <BookOpen className="w-6 h-6" />, label: 'Categories', value: stats.totalCategories },
                  { icon: <Target className="w-6 h-6" />, label: 'Lessons', value: `${stats.totalLessons}+` },
                  { icon: <Clock className="w-6 h-6" />, label: 'Hours', value: `${stats.totalHours}+` },
                  { icon: <Users className="w-6 h-6" />, label: 'Available Now', value: stats.availableNow }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
                  >
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                From budgeting basics to advanced investing, taxation, and business finance—everything you need 
                to build wealth in India. Bilingual content, Indian examples, expert guidance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories, lessons, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-lg"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-lg appearance-none bg-white"
                >
                  <option value="all">All Difficulty Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>

            {searchQuery && (
              <div className="mt-4 text-sm text-gray-600">
                Found <strong className="text-indigo-600">{filteredCategories.length}</strong> categories matching "{searchQuery}"
              </div>
            )}
          </motion.div>
        </section>

        {/* Categories Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={category.status === 'available' ? `/learn/${category.slug}` : '#'}
                  className={`block h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    category.status === 'coming-soon' ? 'opacity-70' : ''
                  }`}
                >
                  {/* Category Header */}
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute -right-8 -top-8 opacity-20">
                      {React.cloneElement(category.icon as React.ReactElement, { className: 'w-32 h-32' })}
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                          {category.icon}
                        </div>
                        {category.status === 'available' ? (
                          <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold">
                            AVAILABLE NOW
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold">
                            COMING SOON
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:scale-105 transition-transform">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white/90">{category.nameHindi}</p>
                    </div>
                  </div>

                  {/* Category Body */}
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <div className="text-xl font-bold text-gray-900">{category.totalLessons}</div>
                        <div className="text-xs text-gray-600">Lessons</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <div className="text-xl font-bold text-gray-900">{category.estimatedHours}h</div>
                        <div className="text-xs text-gray-600">Duration</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <div className="text-sm font-bold text-gray-900">{category.difficulty}</div>
                        <div className="text-xs text-gray-600">Level</div>
                      </div>
                    </div>

                    {/* CTA */}
                    {category.status === 'available' ? (
                      <div className="flex items-center justify-between text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Start Learning</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="text-gray-400 font-semibold">
                        Coming Soon - Stay Tuned!
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore More Financial Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              to="/calculators"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl text-white">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Calculators</h3>
              </div>
              <p className="text-gray-600 mb-3">
                100+ free financial calculators for EMI, SIP, tax, retirement, and more
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                Explore Calculators <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            <Link 
              to="/news"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl text-white">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Financial News</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Daily updates on markets, IPOs, business trends, and economic analysis
              </p>
              <div className="flex items-center text-red-600 font-semibold group-hover:translate-x-1 transition-transform">
                Read Latest News <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            <Link 
              to="/blog"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Blog & Guides</h3>
              </div>
              <p className="text-gray-600 mb-3">
                In-depth articles, how-to guides, and financial strategies for Indians
              </p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                Read Blog <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Learn with MoneyCal?
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { 
                  icon: <Star className="w-8 h-8" />, 
                  title: '100% Free', 
                  desc: 'All lessons free forever. No hidden costs.' 
                },
                { 
                  icon: <Globe className="w-8 h-8" />, 
                  title: 'Hindi + English', 
                  desc: 'Bilingual content for Indian audience.' 
                },
                { 
                  icon: <Award className="w-8 h-8" />, 
                  title: 'Expert Guidance', 
                  desc: 'Created by certified financial planners.' 
                },
                { 
                  icon: <Zap className="w-8 h-8" />, 
                  title: 'Practical', 
                  desc: 'Real Indian examples, calculators, and tools.' 
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/80">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Financial Education Journey Today
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of Indians building wealth through education
            </p>
            <Link
              to="/learn/money-management"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              <BookOpen className="w-6 h-6" />
              Start with Money Management
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default LearnHub;

