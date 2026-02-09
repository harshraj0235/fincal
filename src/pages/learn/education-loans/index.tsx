import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Calculator, TrendingUp, FileText, Shield, 
  Clock, Award, BookOpen, CheckCircle, DollarSign,
  Target, Globe, Briefcase, Users, ArrowRight, Star, Zap
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const educationLoansLessons = [
  { id: 1, title: 'What is Education Loan India?', titleHindi: 'एजुकेशन लोन क्या है', slug: 'what-is-education-loan', icon: GraduationCap, color: 'from-blue-500 to-cyan-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 2, title: 'Education Loan for Study in India', titleHindi: 'भारत में पढ़ाई के लिए', slug: 'study-in-india', icon: BookOpen, color: 'from-green-500 to-emerald-500', difficulty: 'Beginner', duration: '12 min' },
  { id: 3, title: 'Study Abroad Loan (USA, UK, Canada)', titleHindi: 'विदेश में पढ़ाई लोन', slug: 'study-abroad', icon: Globe, color: 'from-purple-500 to-pink-500', difficulty: 'Intermediate', duration: '15 min', badge: 'Popular' },
  { id: 4, title: 'Education Loan Eligibility & Documents', titleHindi: 'पात्रता और दस्तावेज', slug: 'eligibility-documents', icon: FileText, color: 'from-orange-500 to-red-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 5, title: 'Education Loan Interest Rates 2025', titleHindi: 'ब्याज दरें 2025', slug: 'interest-rates', icon: TrendingUp, color: 'from-indigo-500 to-purple-500', difficulty: 'Intermediate', duration: '12 min' },
  { id: 6, title: 'Repayment & Moratorium Period', titleHindi: 'रीपेमेंट और मोहलत', slug: 'repayment-moratorium', icon: Clock, color: 'from-pink-500 to-rose-500', difficulty: 'Intermediate', duration: '11 min' },
  { id: 7, title: 'Education Loan Tax Benefits 80E', titleHindi: 'टैक्स बेनिफिट 80E', slug: 'tax-benefits', icon: DollarSign, color: 'from-cyan-500 to-blue-500', difficulty: 'Intermediate', duration: '9 min', badge: 'Save Tax' },
  { id: 8, title: 'Collateral vs Non-Collateral Loan', titleHindi: 'कोलैटरल बनाम नॉन-कोलैटरल', slug: 'collateral-vs-non-collateral', icon: Shield, color: 'from-yellow-500 to-orange-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 9, title: 'Education Loan EMI Calculator', titleHindi: 'EMI कैलकुलेटर', slug: 'emi-calculator', icon: Calculator, color: 'from-green-500 to-teal-500', difficulty: 'Beginner', duration: '8 min', badge: 'Tool' },
  { id: 10, title: 'Scholarships & Loan Alternatives', titleHindi: 'स्कॉलरशिप विकल्प', slug: 'scholarships-alternatives', icon: Award, color: 'from-red-500 to-pink-500', difficulty: 'Beginner', duration: '13 min' },
];

const EducationLoansHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Education Loan India 2025: Complete Guide (10 Lessons) | Study Loan for India & Abroad | एजुकेशन लोन"
        description="Master education loans in India with 10 comprehensive lessons. Study loan for India & abroad (USA, UK, Canada), eligibility, interest rates, tax benefits 80E, collateral vs non-collateral. हिंदी में भी!"
        keywords="education loan India, student loan India, study abroad loan, education loan eligibility, education loan interest rate 2025, collateral free education loan, education loan tax benefit, study in USA loan, एजुकेशन लोन, छात्र ऋण"
        canonicalUrl="https://moneycal.in/learn/education-loans"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Education Loans Complete Guide India 2025',
          description: 'Complete 10-lesson course on education loans in India covering study loans for India & abroad, eligibility, tax benefits, repayment strategies. हिंदी + English',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            sameAs: 'https://moneycal.in',
          },
          numberOfCredits: 10,
          courseCode: 'EDUCATION-LOANS-2025',
          inLanguage: ['en', 'hi'],
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: 'PT2H',
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Education Loans Complete Guide 🎓📚
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
              Study loans for India & abroad (USA, UK, Canada) | Eligibility, interest rates, tax benefits, repayment
            </p>
            <p className="text-lg text-blue-600 font-semibold">
              एजुकेशन लोन की पूरी जानकारी | Make Your Dreams Come True
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-blue-600">10</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-green-600">2 Hours</div>
                <div className="text-sm text-gray-600">Total Duration</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-purple-600">₹1.5Cr</div>
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
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to All Courses
              </Link>
            </div>
          </motion.div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationLoansLessons.map((lesson, index) => {
              const Icon = lesson.icon;
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/learn/education-loans/${lesson.slug}`}
                    className="block h-full"
                  >
                    <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 overflow-hidden group">
                      {/* Card Header */}
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

                      {/* Card Body */}
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
                          <span className="text-blue-600 font-semibold group-hover:text-blue-700 flex items-center">
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
            className="mt-16 bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🎓 What You'll Master | आप क्या सीखेंगे
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Education Loan Basics</h4>
                    <p className="text-gray-600 text-sm">Types, eligibility, documents, complete process</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Study in India Loans</h4>
                    <p className="text-gray-600 text-sm">IIT, MBBS, Engineering, MBA loans up to ₹20L</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Study Abroad Loans</h4>
                    <p className="text-gray-600 text-sm">USA, UK, Canada, Australia - Up to ₹1.5 Cr</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Interest Rates 8-12%</h4>
                    <p className="text-gray-600 text-sm">Compare SBI, HDFC, Axis, ICICI rates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Tax Benefits Section 80E</h4>
                    <p className="text-gray-600 text-sm">Save up to ₹50,000/year on taxes</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Moratorium Period</h4>
                    <p className="text-gray-600 text-sm">Course + 1 year grace period before EMI</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Collateral vs Non-Collateral</h4>
                    <p className="text-gray-600 text-sm">Up to ₹7.5L without collateral</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Repayment Strategies</h4>
                    <p className="text-gray-600 text-sm">Smart EMI planning after graduation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Scholarships & Alternatives</h4>
                    <p className="text-gray-600 text-sm">Reduce loan burden with scholarships</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">EMI Calculator Tool</h4>
                    <p className="text-gray-600 text-sm">Calculate monthly payments instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links to Calculators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">🧮 Education Loan Calculators | कैलकुलेटर</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <a 
                href="/calculators/education-loan-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">Education Loan EMI</div>
                  <div className="text-sm text-blue-100">Calculate monthly EMI</div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </a>

              <a 
                href="/calculators/study-abroad-cost-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">Study Abroad Cost</div>
                  <div className="text-sm text-blue-100">Total cost estimator</div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </a>

              <a 
                href="/calculators/loan-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">Loan Eligibility</div>
                  <div className="text-sm text-blue-100">Check eligibility</div>
                </div>
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
              <Link
                to="/learn/loans"
                className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200"
              >
                <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Loan Basics</h4>
                <p className="text-sm text-gray-600">20 lessons • लोन की बुनियादी जानकारी</p>
              </Link>

              <Link
                to="/learn/personal-loans"
                className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200"
              >
                <Users className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Personal Loans</h4>
                <p className="text-sm text-gray-600">20 lessons • पर्सनल लोन गाइड</p>
              </Link>

              <Link
                to="/learn/vehicle-loans"
                className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all border-2 border-green-200"
              >
                <Zap className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Vehicle Loans</h4>
                <p className="text-sm text-gray-600">15 lessons • कार/बाइक लोन</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EducationLoansHub;

