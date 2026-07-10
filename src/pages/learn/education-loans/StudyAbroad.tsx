import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, IndianRupee, TrendingUp, CheckCircle, AlertCircle, ExternalLink, DollarSign, Award, MapPin, Plane } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const StudyAbroad: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="study-abroad"
      breadcrumb={['Learn', 'Education Loans', 'Study Abroad Loan (USA, UK, Canada)']}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Globe className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Study Abroad Education Loan 2025 | विदेश में पढ़ाई के लिए लोन
            </h1>
            <p className="text-purple-100 text-lg">
              Complete guide for USA, UK, Canada, Australia, Germany, Singapore - MS, MBA, PhD funding
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to ₹1.5Cr</div>
            <div className="text-sm text-purple-100">Max Loan Amount</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">9-13%</div>
            <div className="text-sm text-purple-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹0 EMI</div>
            <div className="text-sm text-purple-100">During Course</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">15 Years</div>
            <div className="text-sm text-purple-100">Repayment</div>
          </div>
        </div>
      </div>

      {/* What is Study Abroad Loan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Globe className="h-8 w-8 mr-3 text-purple-600" />
          What is Study Abroad Education Loan? | विदेश में पढ़ाई लोन क्या है?
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            A <strong>Study Abroad Education Loan</strong> is specifically designed for Indian students pursuing higher education in foreign universities. 
            It covers tuition fees, living expenses, travel, visa, insurance, and all study-related costs for courses in USA, UK, Canada, Australia, Germany, Singapore, and other countries.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>हिंदी में:</strong> विदेश में पढ़ाई के लिए एजुकेशन लोन भारतीय छात्रों को विदेशी यूनिवर्सिटी में पढ़ने के लिए दिया जाता है। 
            यह ट्यूशन फीस, रहने का खर्च, यात्रा, वीजा, बीमा और सभी अध्ययन संबंधी खर्चों को कवर करता है।
          </p>
          
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-purple-900 mb-3 flex items-center">
              <Plane className="h-5 w-5 mr-2" />
              Why Study Abroad Loans are Different | क्यों अलग है?
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Higher loan amounts:</strong> Up to ₹1.5 crore (vs ₹20L for India)</li>
              <li>• <strong>Covers living costs:</strong> Rent, food, utilities abroad</li>
              <li>• <strong>Travel included:</strong> One-way/return airfare</li>
              <li>• <strong>Longer moratorium:</strong> Course + 6-12 months job search</li>
              <li>• <strong>Currency fluctuation:</strong> Banks provide forex support</li>
              <li>• <strong>Co-applicant mandatory:</strong> Parent/guardian as co-borrower required</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Top Countries & Costs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="h-8 w-8 mr-3 text-blue-600" />
          Top Study Destinations & Total Costs | देश और खर्च
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* USA */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-blue-700">🇺🇸 USA</h3>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">Most Popular</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-blue-900">Top Universities:</strong>
                <p className="text-sm">MIT, Stanford, Harvard, CMU, UC Berkeley, Columbia, NYU</p>
              </div>
              <div>
                <strong className="text-blue-900">Popular Courses:</strong>
                <p className="text-sm">MS Computer Science, MBA, Data Science, AI/ML, Engineering</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-blue-900">Annual Tuition:</strong>
                <p className="text-2xl font-bold text-blue-600">$25,000 - $60,000</p>
                <p className="text-sm text-gray-600">(₹20L - ₹50L per year)</p>
              </div>
              <div>
                <strong className="text-blue-900">Living Cost (per year):</strong>
                <p className="text-xl font-bold text-orange-600">$15,000 - $25,000</p>
                <p className="text-sm text-gray-600">(₹12L - ₹20L) - Rent, food, transport</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-blue-900">Total 2-Year MS Cost:</strong>
                <p className="text-3xl font-bold text-red-600">₹65L - ₹1.4Cr</p>
              </div>
              <div>
                <strong className="text-blue-900">Typical Loan Required:</strong>
                <p className="text-2xl font-bold text-purple-600">₹50L - ₹1Cr</p>
              </div>
            </div>
          </div>

          {/* UK */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-red-700">🇬🇧 UK</h3>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">1-Year Masters</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-red-900">Top Universities:</strong>
                <p className="text-sm">Oxford, Cambridge, Imperial, LSE, UCL, Edinburgh, Manchester</p>
              </div>
              <div>
                <strong className="text-red-900">Popular Courses:</strong>
                <p className="text-sm">MS Data Science, MBA, Finance, Business Analytics, Engineering</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-red-900">Annual Tuition:</strong>
                <p className="text-2xl font-bold text-red-600">£15,000 - £35,000</p>
                <p className="text-sm text-gray-600">(₹16L - ₹35L per year)</p>
              </div>
              <div>
                <strong className="text-red-900">Living Cost (per year):</strong>
                <p className="text-xl font-bold text-orange-600">£12,000 - £18,000</p>
                <p className="text-sm text-gray-600">(₹12L - ₹18L) - London is expensive</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-red-900">Total 1-Year Masters Cost:</strong>
                <p className="text-3xl font-bold text-red-600">₹30L - ₹55L</p>
              </div>
              <div>
                <strong className="text-red-900">Typical Loan Required:</strong>
                <p className="text-2xl font-bold text-purple-600">₹25L - ₹45L</p>
              </div>
            </div>
          </div>

          {/* Canada */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-green-700">🇨🇦 Canada</h3>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">PR Friendly</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-green-900">Top Universities:</strong>
                <p className="text-sm">Toronto, UBC, McGill, Waterloo, McMaster, Alberta</p>
              </div>
              <div>
                <strong className="text-green-900">Popular Courses:</strong>
                <p className="text-sm">MS CS, MBA, Engineering, Data Science, Business Management</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-green-900">Annual Tuition:</strong>
                <p className="text-2xl font-bold text-green-600">CAD 15,000 - 35,000</p>
                <p className="text-sm text-gray-600">(₹9L - ₹22L per year)</p>
              </div>
              <div>
                <strong className="text-green-900">Living Cost (per year):</strong>
                <p className="text-xl font-bold text-orange-600">CAD 12,000 - 20,000</p>
                <p className="text-sm text-gray-600">(₹7L - ₹12L) - Affordable</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-green-900">Total 2-Year Masters Cost:</strong>
                <p className="text-3xl font-bold text-red-600">₹35L - ₹70L</p>
              </div>
              <div>
                <strong className="text-green-900">Typical Loan Required:</strong>
                <p className="text-2xl font-bold text-purple-600">₹30L - ₹55L</p>
              </div>
            </div>
          </div>

          {/* Australia */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-yellow-700">🇦🇺 Australia</h3>
              <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">Work Friendly</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-yellow-900">Top Universities:</strong>
                <p className="text-sm">Melbourne, Sydney, ANU, UNSW, Monash, Queensland</p>
              </div>
              <div>
                <strong className="text-yellow-900">Popular Courses:</strong>
                <p className="text-sm">MS Engineering, MBA, IT, Mining, Business, Healthcare</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-yellow-900">Annual Tuition:</strong>
                <p className="text-2xl font-bold text-yellow-600">AUD 20,000 - 45,000</p>
                <p className="text-sm text-gray-600">(₹11L - ₹25L per year)</p>
              </div>
              <div>
                <strong className="text-yellow-900">Living Cost (per year):</strong>
                <p className="text-xl font-bold text-orange-600">AUD 18,000 - 25,000</p>
                <p className="text-sm text-gray-600">(₹10L - ₹14L) - Sydney/Melbourne</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-yellow-900">Total 2-Year Masters Cost:</strong>
                <p className="text-3xl font-bold text-red-600">₹45L - ₹80L</p>
              </div>
              <div>
                <strong className="text-yellow-900">Typical Loan Required:</strong>
                <p className="text-2xl font-bold text-purple-600">₹35L - ₹65L</p>
              </div>
            </div>
          </div>

          {/* Germany */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border-2 border-gray-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-700">🇩🇪 Germany</h3>
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold">Low Cost</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-gray-900">Top Universities:</strong>
                <p className="text-sm">TUM, RWTH Aachen, Heidelberg, LMU Munich, Berlin TU</p>
              </div>
              <div>
                <strong className="text-gray-900">Popular Courses:</strong>
                <p className="text-sm">MS Engineering, Computer Science, Automotive, Manufacturing</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-gray-900">Annual Tuition:</strong>
                <p className="text-2xl font-bold text-green-600">€0 - €3,000</p>
                <p className="text-sm text-gray-600">(₹0 - ₹2.5L) - Public unis FREE!</p>
              </div>
              <div>
                <strong className="text-gray-900">Living Cost (per year):</strong>
                <p className="text-xl font-bold text-orange-600">€10,000 - €12,000</p>
                <p className="text-sm text-gray-600">(₹9L - ₹11L) - Very affordable</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-gray-900">Total 2-Year Masters Cost:</strong>
                <p className="text-3xl font-bold text-red-600">₹18L - ₹25L</p>
              </div>
              <div>
                <strong className="text-gray-900">Typical Loan Required:</strong>
                <p className="text-2xl font-bold text-purple-600">₹15L - ₹20L</p>
              </div>
            </div>
          </div>

          {/* Singapore */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-teal-700">🇸🇬 Singapore</h3>
              <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">Top Quality</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-teal-900">Top Universities:</strong>
                <p className="text-sm">NUS, NTU, SMU, INSEAD (Asia campus)</p>
              </div>
              <div>
                <strong className="text-teal-900">Popular Courses:</strong>
                <p className="text-sm">MBA, MS CS, Finance, Business, Data Science</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-teal-900">Annual Tuition:</strong>
                <p className="text-2xl font-bold text-teal-600">SGD 30,000 - 55,000</p>
                <p className="text-sm text-gray-600">(₹18L - ₹33L per year)</p>
              </div>
              <div>
                <strong className="text-teal-900">Living Cost (per year):</strong>
                <p className="text-xl font-bold text-orange-600">SGD 15,000 - 20,000</p>
                <p className="text-sm text-gray-600">(₹9L - ₹12L) - Expensive city</p>
              </div>
              <div className="pt-3 border-t">
                <strong className="text-teal-900">Total 2-Year Masters Cost:</strong>
                <p className="text-3xl font-bold text-red-600">₹55L - ₹90L</p>
              </div>
              <div>
                <strong className="text-teal-900">Typical Loan Required:</strong>
                <p className="text-2xl font-bold text-purple-600">₹45L - ₹75L</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h4 className="font-bold text-blue-900 mb-3">💡 Key Decision Factors:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2">
              <li>• <strong>USA:</strong> Highest ROI, tech jobs, but expensive</li>
              <li>• <strong>UK:</strong> 1-year masters saves time & money</li>
              <li>• <strong>Canada:</strong> Easy PR pathway, affordable</li>
            </ul>
            <ul className="space-y-2">
              <li>• <strong>Australia:</strong> Work rights, lifestyle, good education</li>
              <li>• <strong>Germany:</strong> FREE tuition, learn German</li>
              <li>• <strong>Singapore:</strong> Asian hub, close to India, quality education</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What Does Loan Cover */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          What Does Study Abroad Loan Cover? | लोन में क्या शामिल है?
        </h2>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-xl text-green-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                ✅ Covered Expenses | कवर होने वाले खर्च
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Tuition Fees:</strong> Complete course fees (100%)
                  <div className="text-sm text-gray-600">पूरी ट्यूशन फीस</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Accommodation:</strong> Hostel/on-campus/off-campus rent
                  <div className="text-sm text-gray-600">आवास खर्च (हॉस्टल/अपार्टमेंट)</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Living Expenses:</strong> Food, utilities, internet (typically 80% of actual cost)
                  <div className="text-sm text-gray-600">रहने का खर्च</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Travel:</strong> Round-trip airfare (India to study country)
                  <div className="text-sm text-gray-600">हवाई यात्रा खर्च</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Books & Study Material:</strong> Course-related books, subscriptions
                  <div className="text-sm text-gray-600">किताबें और स्टडी मटेरियल</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Laptop/Equipment:</strong> If mandatory for course
                  <div className="text-sm text-gray-600">लैपटॉप/उपकरण</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Visa & Immigration:</strong> Visa fees, SEVIS (USA), IHS (UK)
                  <div className="text-sm text-gray-600">वीजा शुल्क</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Health Insurance:</strong> Mandatory student insurance
                  <div className="text-sm text-gray-600">स्वास्थ्य बीमा</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Exam Fees:</strong> GRE, GMAT, TOEFL, IELTS, application fees
                  <div className="text-sm text-gray-600">परीक्षा शुल्क</div>
                </li>
                <li className="bg-white p-3 rounded-lg shadow-sm">
                  <strong>Caution Deposit:</strong> University security deposit (refundable)
                  <div className="text-sm text-gray-600">जमा राशि</div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xl text-red-900 mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 mr-2" />
                ❌ NOT Covered | कवर नहीं होने वाले खर्च
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <strong>Shopping & Luxury:</strong> Clothes, gadgets, personal items
                  <div className="text-sm text-gray-600">खरीदारी</div>
                </li>
                <li className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <strong>Entertainment:</strong> Movies, trips, parties, travel
                  <div className="text-sm text-gray-600">मनोरंजन खर्च</div>
                </li>
                <li className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <strong>Parking/Vehicle:</strong> Car purchase, parking fees
                  <div className="text-sm text-gray-600">गाड़ी खर्च</div>
                </li>
                <li className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <strong>Family Visit:</strong> Family travel to visit you
                  <div className="text-sm text-gray-600">परिवार की यात्रा</div>
                </li>
                <li className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <strong>Extra Trips Home:</strong> Additional India visits beyond one return
                  <div className="text-sm text-gray-600">अतिरिक्त भारत यात्रा</div>
                </li>
                <li className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <strong>Non-approved Courses:</strong> Additional certifications, hobby courses
                  <div className="text-sm text-gray-600">अतिरिक्त कोर्स</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interest Rates */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-green-600" />
          Study Abroad Loan Interest Rates 2025 | ब्याज दरें
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank / NBFC</th>
                <th className="px-6 py-4 text-left">Up to ₹7.5L</th>
                <th className="px-6 py-4 text-left">₹7.5L - ₹30L</th>
                <th className="px-6 py-4 text-left">Above ₹30L</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">SBI Scholar Loan</td>
                <td className="px-6 py-4 text-green-600 font-bold">9.50% - 10.50%<br/><span className="text-xs text-gray-600">No collateral</span></td>
                <td className="px-6 py-4">10.00% - 11.00%<br/><span className="text-xs text-gray-600">Co-applicant guarantee</span></td>
                <td className="px-6 py-4">10.50% - 11.50%<br/><span className="text-xs text-gray-600">Collateral required</span></td>
                <td className="px-6 py-4">₹10,000</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">HDFC Credila</td>
                <td className="px-6 py-4 text-green-600 font-bold">10.00% - 11.50%</td>
                <td className="px-6 py-4">11.00% - 12.00%</td>
                <td className="px-6 py-4">11.50% - 13.00%</td>
                <td className="px-6 py-4">1% of loan</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">Axis Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">10.50% - 12.00%</td>
                <td className="px-6 py-4">11.00% - 12.50%</td>
                <td className="px-6 py-4">11.50% - 13.50%</td>
                <td className="px-6 py-4">₹10,000</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">ICICI Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">10.50% - 11.50%</td>
                <td className="px-6 py-4">11.00% - 12.00%</td>
                <td className="px-6 py-4">11.50% - 12.50%</td>
                <td className="px-6 py-4">₹10,000</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">Auxilo (NBFC)</td>
                <td className="px-6 py-4 text-green-600 font-bold">11.50% - 12.50%</td>
                <td className="px-6 py-4">12.00% - 13.00%</td>
                <td className="px-6 py-4">12.50% - 14.00%</td>
                <td className="px-6 py-4">2% of loan</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">Avanse (NBFC)</td>
                <td className="px-6 py-4 text-green-600 font-bold">11.00% - 12.00%</td>
                <td className="px-6 py-4">12.00% - 13.00%</td>
                <td className="px-6 py-4">12.50% - 13.50%</td>
                <td className="px-6 py-4">1.5% of loan</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <p className="text-gray-700 mb-3">
            <strong>💡 Pro Tips for Lower Interest:</strong>
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Co-applicant's CIBIL 750+:</strong> Can reduce rate by 0.5-1%</li>
            <li>• <strong>Collateral:</strong> Property/FD as collateral gets you 0.5-1% lower rate</li>
            <li>• <strong>Top university:</strong> Ivy League, Russell Group, G13 universities get priority & better rates</li>
            <li>• <strong>STEM courses:</strong> CS, Engineering, Data Science get preferential rates (better job prospects)</li>
            <li>• <strong>Existing customer:</strong> If parent has account, may get 0.25-0.5% discount</li>
          </ul>
        </div>
      </section>

      {/* Real MS USA Example */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <IndianRupee className="h-8 w-8 mr-3 text-blue-600" />
          Real Example: MS in USA | वास्तविक उदाहरण
        </h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-300">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">MS Computer Science at University of California, San Diego (UCSD)</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="font-bold text-lg text-gray-900 mb-4">Year 1 Costs (2024-25):</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between pb-2 border-b"><span>Tuition Fee:</span><span className="font-bold">$28,000</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Health Insurance:</span><span>$2,500</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Accommodation (12 months):</span><span>$12,000</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Food & Groceries:</span><span>$4,800</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Books & Supplies:</span><span>$1,200</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Transport (local):</span><span>$1,500</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Personal Expenses:</span><span>$2,000</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Laptop (one-time):</span><span>$1,500</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Visa, SEVIS, Exams:</span><span>$1,000</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Airfare (round-trip):</span><span>$1,200</span></div>
                <div className="flex justify-between text-xl pt-3 border-t-2"><span><strong>Year 1 Total:</strong></span><span className="font-bold text-blue-600">$55,700</span></div>
                <div className="text-center text-2xl font-bold text-red-600 pt-2">= ₹46,00,000</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="font-bold text-lg text-gray-900 mb-4">Year 2 Costs (2025-26):</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between pb-2 border-b"><span>Tuition Fee:</span><span className="font-bold">$28,000</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Health Insurance:</span><span>$2,500</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Accommodation (12 months):</span><span>$12,000</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Food & Groceries:</span><span>$4,800</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Books & Supplies:</span><span>$1,000</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Transport (local):</span><span>$1,500</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Personal Expenses:</span><span>$2,000</span></div>
                <div className="flex justify-between pb-2 border-b"><span>Misc & Contingency:</span><span>$1,500</span></div>
                <div className="flex justify-between text-xl pt-3 border-t-2"><span><strong>Year 2 Total:</strong></span><span className="font-bold text-blue-600">$53,300</span></div>
                <div className="text-center text-2xl font-bold text-red-600 pt-2">= ₹44,00,000</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Loan & Repayment Details:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-lg"><span>Total 2-Year Cost:</span><span className="font-bold text-red-600">$109,000</span></div>
                <div className="flex justify-between text-2xl pb-3 border-b-2"><span></span><span className="font-bold text-red-600">₹90,00,000</span></div>
                <div className="flex justify-between"><span>Self-funded (20%):</span><span className="font-bold">₹18,00,000</span></div>
                <div className="flex justify-between text-2xl text-purple-600 pt-3 border-t-2"><span><strong>Loan Required:</strong></span><span className="font-bold">₹72,00,000</span></div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between"><span>Interest Rate:</span><span className="font-bold text-green-600">10.5% p.a.</span></div>
                <div className="flex justify-between"><span>Moratorium:</span><span>2 years course + 1 year = 3 years</span></div>
                <div className="flex justify-between"><span>Repayment Period:</span><span>12 years after moratorium</span></div>
                <div className="flex justify-between text-2xl text-blue-600 pt-3 border-t-2"><span><strong>Monthly EMI:</strong></span><span className="font-bold">₹1,01,250</span></div>
                <div className="text-sm text-gray-600 pt-2">Starts after graduation + 1 year job search</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-600 text-white rounded-xl p-6">
            <h4 className="font-bold text-xl mb-3">💰 Financial Reality Check:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><strong>Total Interest Paid:</strong> ₹73,00,000</p>
                <p className="mb-2"><strong>Total Repayment:</strong> ₹1,45,00,000</p>
                <p className="mb-2"><strong>Tax Benefit (₹50K × 12 years):</strong> ₹6,00,000 saved</p>
              </div>
              <div>
                <p className="mb-2"><strong>Average MS CS salary in USA:</strong> $95,000/year</p>
                <p className="mb-2"><strong>Loan can be repaid in:</strong> 3-4 years if focused</p>
                <p className="mb-2"><strong>ROI Timeline:</strong> 5-7 years total</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collateral Requirements */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Collateral Requirements | कोलैटरल आवश्यकता
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h4 className="font-bold text-xl text-green-900 mb-4">Non-Collateral Loans (Up to ₹7.5L)</h4>
            <p className="text-gray-700 mb-4">
              Most banks offer education loans up to ₹7.5 lakh without any collateral. Only co-applicant (parent/guardian) guarantee required.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700"><strong>✅ Good for:</strong> Germany, some Canadian universities, partial funding for UK</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <h4 className="font-bold text-xl text-orange-900 mb-4">Collateral-Based Loans (Above ₹7.5L)</h4>
            <p className="text-gray-700 mb-4">
              For loans above ₹7.5 lakh, banks require collateral (security). Acceptable collateral:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• <strong>Residential property</strong> in parent's name</li>
              <li>• <strong>Commercial property</strong></li>
              <li>• <strong>Fixed Deposits</strong> (3-4 times loan amount)</li>
              <li>• <strong>Government bonds</strong></li>
              <li>• <strong>LIC policies</strong> with surrender value</li>
            </ul>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700"><strong>⚠️ Required for:</strong> USA, UK, Canada, Australia, Singapore (most cases)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Complete Document Checklist | पूरी दस्तावेज सूची
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Student Documents:</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ <strong>I-20 / CAS / Offer Letter</strong> (official admission)</li>
              <li>✓ <strong>Fee structure</strong> from university</li>
              <li>✓ <strong>PAN Card & Aadhaar</strong></li>
              <li>✓ <strong>10th, 12th, UG mark sheets</strong></li>
              <li>✓ <strong>GRE/GMAT/TOEFL/IELTS</strong> scores</li>
              <li>✓ <strong>Passport copy</strong></li>
              <li>✓ <strong>Visa application proof</strong></li>
              <li>✓ <strong>Bank statements</strong> (6 months)</li>
              <li>✓ <strong>Passport size photos</strong></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Co-Applicant Documents:</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ <strong>PAN Card & Aadhaar</strong></li>
              <li>✓ <strong>Income proof</strong> (Salary slips/ITR for 2-3 years)</li>
              <li>✓ <strong>Form 16</strong> (for salaried)</li>
              <li>✓ <strong>Bank statements</strong> (last 12 months)</li>
              <li>✓ <strong>Employment proof</strong></li>
              <li>✓ <strong>Business proof</strong> (for self-employed: GST, shop act)</li>
              <li>✓ <strong>Financial statements</strong> (if business)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Collateral Documents (if required):</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ <strong>Property papers</strong> (sale deed, title deed)</li>
              <li>✓ <strong>Property valuation</strong> report</li>
              <li>✓ <strong>Encumbrance certificate</strong> (last 13 years)</li>
              <li>✓ <strong>Property tax receipts</strong></li>
              <li>✓ <strong>FD certificates</strong> (if using FD)</li>
              <li>✓ <strong>LIC policy documents</strong> (if pledging)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Apply for Study Abroad Loan | आवेदन करें
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://sbi.co.in/web/personal-banking/loans/education-loans/scholar-loan-scheme" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-purple-400">
            <span className="font-semibold text-gray-900">SBI Scholar Loan</span>
            <ExternalLink className="h-5 w-5 text-purple-600" />
          </a>
          
          <a href="https://www.hdfccredila.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-purple-400">
            <span className="font-semibold text-gray-900">HDFC Credila</span>
            <ExternalLink className="h-5 w-5 text-purple-600" />
          </a>
          
          <a href="https://www.auxilo.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-purple-400">
            <span className="font-semibold text-gray-900">Auxilo Education Loan</span>
            <ExternalLink className="h-5 w-5 text-purple-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <p className="mb-6">Deep dive into specific aspects of education loans:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans/collateral-vs-non-collateral" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Next: Collateral vs Non-Collateral</div>
            <div className="text-sm text-purple-100">Detailed comparison & strategy</div>
          </Link>
          
          <Link to="/learn/education-loans/tax-benefits" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Tax Benefits Section 80E</div>
            <div className="text-sm text-purple-100">Save ₹50,000/year on taxes!</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default StudyAbroad;

