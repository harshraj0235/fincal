import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, Calculator, TrendingUp, FileText, Shield, 
  Clock, Award, BookOpen, CheckCircle, DollarSign,
  Briefcase, Search, CreditCard,
  Zap, TrendingDown, RefreshCw, Bike, ArrowRight, Star, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const vehicleLoansLessons = [
  { id: 1, title: 'Car Loan Basics India 2025', titleHindi: 'कार लोन बेसिक्स', slug: 'car-loan-basics', icon: Car, color: 'from-blue-500 to-cyan-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 2, title: 'Two Wheeler Loan Guide', titleHindi: 'टू व्हीलर लोन', slug: 'two-wheeler-loan', icon: Bike, color: 'from-orange-500 to-red-500', difficulty: 'Beginner', duration: '8 min' },
  { id: 3, title: 'New vs Used Car Loan', titleHindi: 'नई बनाम पुरानी कार', slug: 'new-vs-used-car-loan', icon: Car, color: 'from-purple-500 to-pink-500', difficulty: 'Beginner', duration: '9 min' },
  { id: 4, title: 'Vehicle Loan Eligibility Calculator', titleHindi: 'वाहन लोन पात्रता', slug: 'eligibility-calculator', icon: IndianRupee, color: 'from-green-500 to-emerald-500', difficulty: 'Beginner', duration: '10 min', badge: 'Calculator' },
  { id: 5, title: 'Car Loan Interest Rates 2025', titleHindi: 'कार लोन ब्याज दर', slug: 'interest-rates', icon: TrendingUp, color: 'from-indigo-500 to-purple-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 6, title: 'Down Payment Strategy', titleHindi: 'डाउन पेमेंट रणनीति', slug: 'down-payment-strategy', icon: DollarSign, color: 'from-pink-500 to-rose-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 7, title: 'Vehicle Loan Documents Required', titleHindi: 'आवश्यक दस्तावेज', slug: 'documents-required', icon: FileText, color: 'from-cyan-500 to-blue-500', difficulty: 'Beginner', duration: '7 min' },
  { id: 8, title: 'Car Loan Application Process', titleHindi: 'आवेदन प्रक्रिया', slug: 'application-process', icon: Search, color: 'from-yellow-500 to-orange-500', difficulty: 'Beginner', duration: '9 min' },
  { id: 9, title: 'Vehicle Insurance with Loan', titleHindi: 'वाहन बीमा', slug: 'vehicle-insurance', icon: Shield, color: 'from-green-500 to-teal-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 10, title: 'Car Loan EMI Calculator', titleHindi: 'कार EMI कैलकुलेटर', slug: 'emi-calculator', icon: IndianRupee, color: 'from-red-500 to-pink-500', difficulty: 'Beginner', duration: '8 min', badge: 'Tool' },
  { id: 11, title: 'Balance Transfer for Car Loans', titleHindi: 'बैलेंस ट्रांसफर', slug: 'balance-transfer', icon: RefreshCw, color: 'from-purple-500 to-indigo-500', difficulty: 'Advanced', duration: '10 min' },
  { id: 12, title: 'Vehicle Loan Prepayment Guide', titleHindi: 'प्रीपेमेंट गाइड', slug: 'prepayment-guide', icon: TrendingDown, color: 'from-blue-500 to-indigo-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 13, title: 'Best Banks for Car Loan 2025', titleHindi: 'बेस्ट बैंक', slug: 'best-banks', icon: Award, color: 'from-teal-500 to-green-500', difficulty: 'Intermediate', duration: '11 min' },
  { id: 14, title: 'Dealer Finance vs Bank Loan', titleHindi: 'डीलर बनाम बैंक', slug: 'dealer-vs-bank', icon: Briefcase, color: 'from-orange-500 to-amber-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 15, title: 'EV Loan & Government Subsidy', titleHindi: 'EV लोन सब्सिडी', slug: 'ev-loan-subsidy', icon: Zap, color: 'from-green-500 to-emerald-500', difficulty: 'Intermediate', duration: '12 min', badge: 'Hot' },
];

const VehicleLoansHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Vehicle Loans India 2025: Car & Bike Loan Complete Guide (15 Lessons) | कार लोन गाइड"
        description="Master car loans and two-wheeler loans in India with 15 comprehensive lessons. Learn about interest rates, eligibility, EMI Calculator, down payment, insurance, EV loans. हिंदी में भी!"
        keywords="car loan India, two wheeler loan, bike loan, vehicle loan Calculator, car loan interest rate 2025, car loan eligibility, EV loan subsidy, कार लोन, बाइक लोन"
        url="/learn/vehicle-loans"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Vehicle Loans', url: '/learn/vehicle-loans' }
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Vehicle Loans Complete Guide India 2025',
          description: 'Complete 15-lesson course on car loans, two-wheeler loans, EV loans, eligibility, interest rates, and smart financing in India. हिंदी + English',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            sameAs: 'https://moneycal.in',
          },
          numberOfCredits: 15,
          courseCode: 'VEHICLE-LOANS-2025',
          inLanguage: ['en', 'hi'],
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: 'PT2H30M',
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-2xl shadow-lg">
                <Car className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Vehicle Loans Complete Guide 🚗🏍️
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
              Master car loans & two-wheeler loans in India! From eligibility to EMI, down payment to EV subsidies.
            </p>
            <p className="text-lg text-blue-600 font-semibold">
              कार और बाइक लोन की पूरी जानकारी | 2025 Latest Guide
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-green-600">2.5h</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-cyan-600">3</div>
                <div className="text-sm text-gray-600">Calculators</div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
              <p className="text-gray-700 text-sm">Follow lessons, use eligibility and EMI tools, compare bank vs dealer, and plan insurance.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
              <p className="text-gray-700 text-sm">Eligibility → new vs used → down payment → rate choice → insurance → refinance/prepayment.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
              <p className="text-gray-700 text-sm">Compare dealer vs bank offers. Plan EV loan with subsidy. Optimize EMI with higher down payment.</p>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleLoansLessons.map((lesson, index) => {
              const Icon = lesson.icon;
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/learn/vehicle-loans/${lesson.slug}`}
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
                    <h4 className="font-semibold text-gray-900">Car Loan Complete Process</h4>
                    <p className="text-gray-600 text-sm">कार लोन की पूरी प्रक्रिया - Application to approval</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Two Wheeler Loans (Bike/Scooter)</h4>
                    <p className="text-gray-600 text-sm">बाइक और स्कूटर लोन - Easy approval guide</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Interest Rates 7-14%</h4>
                    <p className="text-gray-600 text-sm">ब्याज दरें समझें - Get lowest rates in 2025</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">New vs Used Car Financing</h4>
                    <p className="text-gray-600 text-sm">नई या पुरानी कार - Which loan is better?</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Down Payment Strategy</h4>
                    <p className="text-gray-600 text-sm">डाउन पेमेंट - How much to pay upfront</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Vehicle Insurance Guide</h4>
                    <p className="text-gray-600 text-sm">बीमा जरूरी - Mandatory insurance explained</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">EV Loan & Subsidies</h4>
                    <p className="text-gray-600 text-sm">इलेक्ट्रिक वाहन - Government subsidy benefits</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Eligibility Calculator</h4>
                    <p className="text-gray-600 text-sm">पात्रता जांचें - Check loan eligibility instantly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">EMI Calculator Tool</h4>
                    <p className="text-gray-600 text-sm">EMI कैलकुलेट करें - Monthly payment calculator</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Best Banks 2025</h4>
                    <p className="text-gray-600 text-sm">बेस्ट बैंक - SBI, HDFC, ICICI, Axis comparison</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Dealer vs Bank Loan</h4>
                    <p className="text-gray-600 text-sm">कौन बेहतर - In-house finance or bank loan</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Balance Transfer</h4>
                    <p className="text-gray-600 text-sm">कम ब्याज दर - Switch to lower rates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Prepayment Strategy</h4>
                    <p className="text-gray-600 text-sm">जल्दी चुकाएं - Save interest with prepayment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Documents Checklist</h4>
                    <p className="text-gray-600 text-sm">दस्तावेज सूची - Complete document guide</p>
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
            className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">🧮 Vehicle Loan Calculators | कैलकुलेटर</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <a 
                href="/calculators/car-loan-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">Car Loan EMI Calculator</div>
                  <div className="text-sm text-blue-100">कार EMI कैलकुलेट करें</div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </a>

              <a 
                href="/calculators/bike-loan-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">Bike Loan Calculator</div>
                  <div className="text-sm text-blue-100">बाइक लोन कैलकुलेटर</div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </a>

              <a 
                href="/calculators/loan-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">Loan Eligibility</div>
                  <div className="text-sm text-blue-100">पात्रता जांचें</div>
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
                to="/learn"
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
                <CreditCard className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Personal Loans</h4>
                <p className="text-sm text-gray-600">20 lessons • पर्सनल लोन गाइड</p>
              </Link>

              <Link
                to="/learn/home-loans"
                className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all border-2 border-green-200"
              >
                <BookOpen className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Home Loans</h4>
                <p className="text-sm text-gray-600">20 lessons • होम लोन कोर्स</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default VehicleLoansHub;

