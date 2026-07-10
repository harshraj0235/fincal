import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, Calculator, TrendingUp, FileText, Shield, 
  Clock, Award, BookOpen, CheckCircle, DollarSign,
  Target, Users, Building, Factory, ArrowRight, Star, Zap, Globe, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const businessLoansLessons = [
  { id: 1, title: 'Business Loan Basics India 2025', titleHindi: 'बिजनेस लोन बेसिक्स', slug: 'business-loan-basics', icon: Briefcase, color: 'from-blue-500 to-cyan-500', difficulty: 'Beginner', duration: '12 min' },
  { id: 2, title: 'MSME Loan Complete Guide', titleHindi: 'MSME लोन गाइड', slug: 'msme-loan-guide', icon: Factory, color: 'from-green-500 to-emerald-500', difficulty: 'Intermediate', duration: '15 min', badge: 'Hot' },
  { id: 3, title: 'Startup Business Loan 2025', titleHindi: 'स्टार्टअप लोन', slug: 'startup-loan', icon: Zap, color: 'from-purple-500 to-pink-500', difficulty: 'Intermediate', duration: '14 min' },
  { id: 4, title: 'Working Capital Loan Guide', titleHindi: 'वर्किंग कैपिटल लोन', slug: 'working-capital-loan', icon: DollarSign, color: 'from-orange-500 to-red-500', difficulty: 'Intermediate', duration: '13 min' },
  { id: 5, title: 'Machinery & Equipment Loan', titleHindi: 'मशीनरी लोन', slug: 'machinery-loan', icon: Building, color: 'from-indigo-500 to-purple-500', difficulty: 'Intermediate', duration: '11 min' },
  { id: 6, title: 'Mudra Loan Scheme (PMMY)', titleHindi: 'मुद्रा लोन योजना', slug: 'mudra-loan', icon: Award, color: 'from-pink-500 to-rose-500', difficulty: 'Beginner', duration: '13 min', badge: 'Government' },
  { id: 7, title: 'Business Loan Eligibility', titleHindi: 'पात्रता मानदंड', slug: 'eligibility-criteria', icon: CheckCircle, color: 'from-cyan-500 to-blue-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 8, title: 'Business Loan Interest Rates 2025', titleHindi: 'ब्याज दरें 2025', slug: 'interest-rates', icon: TrendingUp, color: 'from-yellow-500 to-orange-500', difficulty: 'Intermediate', duration: '12 min' },
  { id: 9, title: 'Documents Required for Business Loan', titleHindi: 'आवश्यक दस्तावेज', slug: 'documents-required', icon: FileText, color: 'from-green-500 to-teal-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 10, title: 'Business Loan Application Process', titleHindi: 'आवेदन प्रक्रिया', slug: 'application-process', icon: Target, color: 'from-red-500 to-pink-500', difficulty: 'Intermediate', duration: '11 min' },
  { id: 11, title: 'Collateral vs Unsecured Business Loan', titleHindi: 'कोलैटरल बनाम अनसिक्योर्ड', slug: 'collateral-vs-unsecured', icon: Shield, color: 'from-purple-500 to-indigo-500', difficulty: 'Intermediate', duration: '12 min' },
  { id: 12, title: 'Business Loan EMI Calculator', titleHindi: 'EMI कैलकुलेटर', slug: 'emi-calculator', icon: IndianRupee, color: 'from-blue-500 to-indigo-500', difficulty: 'Beginner', duration: '8 min', badge: 'Tool' },
  { id: 13, title: 'Invoice Discounting & Factoring', titleHindi: 'इनवॉइस डिस्काउंटिंग', slug: 'invoice-discounting', icon: FileText, color: 'from-teal-500 to-green-500', difficulty: 'Advanced', duration: '14 min' },
  { id: 14, title: 'Government Business Loan Schemes', titleHindi: 'सरकारी योजनाएं', slug: 'government-schemes', icon: Globe, color: 'from-orange-500 to-amber-500', difficulty: 'Intermediate', duration: '15 min' },
  { id: 15, title: 'Business Loan Tax Benefits', titleHindi: 'टैक्स बेनिफिट', slug: 'tax-benefits', icon: DollarSign, color: 'from-green-500 to-emerald-500', difficulty: 'Intermediate', duration: '10 min' },
];

const BusinessLoansHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Business Loans India 2025: Complete Guide (15 Lessons) | MSME, Startup, Mudra Loan | बिजनेस लोन"
        description="Master business loans in India with 15 comprehensive lessons. MSME loan, startup funding, working capital, machinery loan, Mudra scheme, eligibility, interest rates. हिंदी में भी!"
        keywords="business loan India, MSME loan, startup loan, working capital loan, machinery loan, Mudra loan scheme, business loan interest rate 2025, unsecured business loan, बिजनेस लोन, एमएसएमई लोन"
        url="/learn/business-loans"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Business Loans', url: '/learn/business-loans' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Business Loans Complete Guide India 2025",
          description: "Business loans hub covering MSME, startup funding, working capital, machinery loans, Mudra, eligibility, rates, documents.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: businessLoansLessons.length
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Business Loans Complete Guide 💼🏭
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
              MSME loans, startup funding, working capital, machinery loans, Mudra scheme - Complete business financing guide
            </p>
            <p className="text-lg text-indigo-600 font-semibold">
              बिजनेस लोन की पूरी जानकारी | Grow Your Business with Smart Financing
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-indigo-600">15</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-green-600">3 Hours</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-purple-600">₹50Cr</div>
                <div className="text-sm text-gray-600">Max Loan</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-orange-600">Free</div>
                <div className="text-sm text-gray-600">100% Free</div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/learn"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ← Back to All Courses
              </Link>
            </div>
          </motion.div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessLoansLessons.map((lesson, index) => {
              const Icon = lesson.icon;
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/learn/business-loans/${lesson.slug}`}
                    className="block h-full"
                  >
                    <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-indigo-300 overflow-hidden group">
                      <div className={`bg-gradient-to-r ${lesson.color} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 opacity-10">
                          <Icon className="h-32 w-32 transform rotate-12" />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                              #{lesson.id}
                            </div>
                            {lesson.badge && (
                              <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                                {lesson.badge}
                              </div>
                            )}
                          </div>
                          <Icon className="h-10 w-10 mb-3" />
                          <h3 className="text-lg font-bold leading-tight group-hover:scale-105 transition-transform mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-xs text-white/80">{lesson.titleHindi}</p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            lesson.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {lesson.difficulty}
                          </span>
                          <span className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {lesson.duration}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-indigo-600 font-semibold group-hover:text-indigo-700 flex items-center">
                            Start Learning
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Course Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🎓 What You'll Master | आप क्या सीखेंगे
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">MSME Loan Complete Guide</h4>
                    <p className="text-gray-600 text-sm">Micro, Small, Medium enterprise financing up to ₹50Cr</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Startup Funding Options</h4>
                    <p className="text-gray-600 text-sm">Seed funding, angel investors, govt schemes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Working Capital Solutions</h4>
                    <p className="text-gray-600 text-sm">Cash flow management, inventory financing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Mudra Loan Scheme</h4>
                    <p className="text-gray-600 text-sm">₹10L loan without collateral for small business</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Machinery & Equipment Financing</h4>
                    <p className="text-gray-600 text-sm">Up to 90% funding for business assets</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Interest Rates 11-18%</h4>
                    <p className="text-gray-600 text-sm">Compare SBI, HDFC, ICICI, Axis rates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Invoice Discounting</h4>
                    <p className="text-gray-600 text-sm">Get immediate cash against pending invoices</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Eligibility Criteria</h4>
                    <p className="text-gray-600 text-sm">Business vintage, turnover, profit requirements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Document Checklist</h4>
                    <p className="text-gray-600 text-sm">GST, ITR, financials, ownership proof</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Collateral vs Unsecured</h4>
                    <p className="text-gray-600 text-sm">When collateral needed, how to avoid it</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Government Schemes</h4>
                    <p className="text-gray-600 text-sm">PMMY, CGTSME, Stand-up India, Startup India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Application Process</h4>
                    <p className="text-gray-600 text-sm">Step-by-step loan application guide</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Tax Benefits</h4>
                    <p className="text-gray-600 text-sm">Interest deduction, asset depreciation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">EMI Calculator Tool</h4>
                    <p className="text-gray-600 text-sm">Calculate business loan EMI instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">🧮 Business Loan Tools | कैलकुलेटर</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/business-loan-calculator" className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40">
                <div><div className="font-semibold">Business Loan EMI</div><div className="text-sm text-indigo-100">Calculate monthly EMI</div></div>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="/calculators/working-capital-calculator" className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40">
                <div><div className="font-semibold">Working Capital</div><div className="text-sm text-indigo-100">Calculate requirement</div></div>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="/calculators/loan-calculator" className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40">
                <div><div className="font-semibold">Loan Eligibility</div><div className="text-sm text-indigo-100">Check eligibility</div></div>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Related Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Learning Paths | अन्य कोर्स</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/learn" className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200">
                <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Loan Basics</h4>
                <p className="text-sm text-gray-600">20 lessons • लोन की बुनियादी जानकारी</p>
              </Link>
              <Link to="/learn/personal-loans" className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200">
                <Users className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Personal Loans</h4>
                <p className="text-sm text-gray-600">20 lessons • पर्सनल लोन</p>
              </Link>
              <Link to="/learn/education-loans" className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all border-2 border-green-200">
                <Award className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Education Loans</h4>
                <p className="text-sm text-gray-600">10 lessons • एजुकेशन लोन</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BusinessLoansHub;

