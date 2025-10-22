import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calculator, TrendingUp, CheckCircle, AlertCircle, ExternalLink, DollarSign, Award } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const StudyInIndia: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="study-in-india"
      breadcrumb={['Learn', 'Education Loans', 'Education Loan for Study in India']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <BookOpen className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Education Loan for Study in India 2025 | भारत में पढ़ाई के लिए लोन
            </h1>
            <p className="text-green-100 text-lg">IIT, NIT, AIIMS, IIM, Top Engineering & Medical colleges - Complete loan guide</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to ₹20L</div>
            <div className="text-sm text-green-100">Max Loan Amount</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">8.5-11%</div>
            <div className="text-sm text-green-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">No Collateral</div>
            <div className="text-sm text-green-100">Up to ₹7.5L</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹0 EMI</div>
            <div className="text-sm text-green-100">During Course</div>
          </div>
        </div>
      </div>

      {/* What is Study in India Loan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Study in India Education Loan | भारत में पढ़ाई लोन</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Study in India education loan</strong> is specifically designed for students pursuing higher education in Indian institutions like IITs, NITs, IIMs, AIIMS, top engineering, medical, and management colleges.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>हिंदी में:</strong> भारत में पढ़ाई के लिए एजुकेशन लोन खासतौर पर IIT, NIT, IIM, AIIMS और अन्य टॉप कॉलेजों में पढ़ने वाले छात्रों के लिए है।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3">✅ Eligible Courses | योग्य कोर्स</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Engineering:</strong> B.Tech, M.Tech from IIT, NIT, IIIT</li>
              <li>• <strong>Medical:</strong> MBBS, BDS, MD, MS from AIIMS, government medical colleges</li>
              <li>• <strong>Management:</strong> MBA, PGDM from IIM, top B-schools</li>
              <li>• <strong>Law:</strong> LLB, LLM from NLU, top law schools</li>
              <li>• <strong>CA/CS/CMA:</strong> Professional courses (ICAI, ICSI, ICMAI)</li>
              <li>• <strong>Design:</strong> NID, NIFT, IIT design courses</li>
              <li>• <strong>Agriculture:</strong> B.Sc, M.Sc Agriculture from top institutions</li>
              <li>• <strong>Science:</strong> BSc, MSc, PhD from IISc, IISERs</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-blue-900 mb-3">📚 Top Institutions Covered</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>IITs:</strong> 23 Indian Institutes of Technology</li>
              <li>• <strong>NITs:</strong> 31 National Institutes of Technology</li>
              <li>• <strong>IIMs:</strong> 20 Indian Institutes of Management</li>
              <li>• <strong>AIIMS:</strong> All India Institute of Medical Sciences</li>
              <li>• <strong>IISc:</strong> Indian Institute of Science, Bangalore</li>
              <li>• <strong>IISERs:</strong> Indian Institutes of Science Education and Research</li>
              <li>• <strong>Government colleges:</strong> State engineering, medical colleges</li>
              <li>• <strong>Private:</strong> BITS, VIT, Manipal, SRM (recognized by UGC/AICTE)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Loan Amount Coverage */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What Does the Loan Cover? | लोन में क्या शामिल है?</h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-xl text-blue-900 mb-4">✅ Covered Expenses:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Tuition Fees:</strong> Full course fees (100% covered)
                    <div className="text-sm text-gray-600">पूरी ट्यूशन फीस</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Hostel Fees:</strong> Accommodation charges
                    <div className="text-sm text-gray-600">हॉस्टल फीस</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Books & Study Materials:</strong> Up to ₹50,000
                    <div className="text-sm text-gray-600">किताबें और स्टडी मटेरियल</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Equipment/Instruments:</strong> Laptop, medical instruments (if course requires)
                    <div className="text-sm text-gray-600">लैपटॉप, उपकरण</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Exam/Library Fees:</strong> Semester fees, library charges
                    <div className="text-sm text-gray-600">परीक्षा शुल्क</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Caution Deposit:</strong> Refundable deposits
                    <div className="text-sm text-gray-600">जमा राशि</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xl text-red-900 mb-4">❌ NOT Covered:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Mess charges</strong> - Food expenses</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Personal expenses</strong> - Shopping, entertainment</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Travel costs</strong> - Home to college travel</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Mobile/Internet</strong> - Personal telecom bills</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Coaching fees</strong> - Private tuition/coaching</span>
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
          Interest Rates 2025 | ब्याज दरें
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank</th>
                <th className="px-6 py-4 text-left">Up to ₹7.5L</th>
                <th className="px-6 py-4 text-left">Above ₹7.5L</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">SBI (Central Sector Scheme)</td>
                <td className="px-6 py-4 text-green-600 font-bold">No collateral<br/>8.50% - 9.50%</td>
                <td className="px-6 py-4">Collateral required<br/>9.00% - 10.00%</td>
                <td className="px-6 py-4">₹10,000</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">Bank of Baroda</td>
                <td className="px-6 py-4 text-green-600 font-bold">No collateral<br/>8.75% - 9.75%</td>
                <td className="px-6 py-4">Collateral required<br/>9.25% - 10.50%</td>
                <td className="px-6 py-4">₹7,500</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">Canara Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">No collateral<br/>9.00% - 10.00%</td>
                <td className="px-6 py-4">Collateral required<br/>9.50% - 10.75%</td>
                <td className="px-6 py-4">₹5,000</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">HDFC Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">Co-applicant guarantee<br/>9.50% - 11.00%</td>
                <td className="px-6 py-4">Collateral required<br/>10.00% - 11.50%</td>
                <td className="px-6 py-4">1% of loan</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">ICICI Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">Co-applicant guarantee<br/>10.00% - 11.50%</td>
                <td className="px-6 py-4">Collateral required<br/>10.50% - 12.00%</td>
                <td className="px-6 py-4">₹10,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <p className="text-gray-700">
            <strong>💡 Special Schemes:</strong> Government of India offers <strong>Central Sector Interest Subsidy Scheme</strong> for students from economically weaker sections. 
            Interest during moratorium period is paid by the government!
            <br />
            <span className="text-gray-600">कमजोर आर्थिक वर्ग के छात्रों के लिए सरकार ब्याज सब्सिडी देती है।</span>
          </p>
        </div>
      </section>

      {/* Real Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Real Course Examples | वास्तविक उदाहरण</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h4 className="text-xl font-bold text-blue-700 mb-4">IIT B.Tech Example</h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between"><span>Course Duration:</span><span className="font-bold">4 years</span></div>
              <div className="flex justify-between"><span>Tuition Fee:</span><span>₹2,00,000/year</span></div>
              <div className="flex justify-between"><span>Hostel Fee:</span><span>₹80,000/year</span></div>
              <div className="flex justify-between"><span>Books & Equipment:</span><span>₹50,000/year</span></div>
              <div className="flex justify-between pt-3 border-t"><span>Total per year:</span><span className="font-bold">₹3,30,000</span></div>
              <div className="flex justify-between text-xl pt-3 border-t"><span>Total Loan:</span><span className="font-bold text-blue-600">₹13,20,000</span></div>
              <div className="pt-3 border-t">
                <div className="text-sm text-green-600 font-bold">✅ No collateral needed (below ₹7.5L per year)</div>
                <div className="text-sm text-blue-600 font-bold">Interest Rate: 8.5% - 9.5%</div>
                <div className="text-sm text-gray-600">EMI starts after course + 1 year</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <h4 className="text-xl font-bold text-purple-700 mb-4">IIM MBA Example</h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between"><span>Course Duration:</span><span className="font-bold">2 years</span></div>
              <div className="flex justify-between"><span>Tuition Fee:</span><span>₹11,00,000/year</span></div>
              <div className="flex justify-between"><span>Hostel Fee:</span><span>₹1,50,000/year</span></div>
              <div className="flex justify-between"><span>Books & Laptop:</span><span>₹1,00,000 (one-time)</span></div>
              <div className="flex justify-between pt-3 border-t"><span>Total per year:</span><span className="font-bold">₹12,50,000</span></div>
              <div className="flex justify-between text-xl pt-3 border-t"><span>Total Loan:</span><span className="font-bold text-purple-600">₹26,00,000</span></div>
              <div className="pt-3 border-t">
                <div className="text-sm text-red-600 font-bold">⚠️ Collateral required (above ₹7.5L per year)</div>
                <div className="text-sm text-blue-600 font-bold">Interest Rate: 9.0% - 10.5%</div>
                <div className="text-sm text-gray-600">EMI starts after MBA + 1 year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required | आवश्यक दस्तावेज</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Student Documents:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✓ <strong>Admission letter</strong> from college</li>
              <li>✓ <strong>Fee structure</strong> from college</li>
              <li>✓ <strong>PAN Card & Aadhaar Card</strong></li>
              <li>✓ <strong>10th, 12th mark sheets</strong></li>
              <li>✓ <strong>Entrance exam scorecard</strong> (JEE, NEET, CAT, etc.)</li>
              <li>✓ <strong>Passport size photos</strong></li>
              <li>✓ <strong>Bank account statements</strong> (last 6 months)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Co-Applicant Documents:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✓ <strong>PAN Card & Aadhaar Card</strong></li>
              <li>✓ <strong>Income proof</strong> (Salary slips/ITR)</li>
              <li>✓ <strong>Bank statements</strong> (last 6-12 months)</li>
              <li>✓ <strong>Employment proof</strong> (appointment letter)</li>
              <li>✓ <strong>Form 16</strong> (for salaried)</li>
              <li>✓ <strong>Business proof</strong> (for self-employed)</li>
              <li>✓ <strong>Property documents</strong> (if collateral required)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Repayment */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Repayment Schedule | रीपेमेंट</h2>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300">
          <h3 className="text-2xl font-bold text-green-700 mb-6">Moratorium Period Explained | मोहलत अवधि</h3>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg text-gray-900 mb-3">What is Moratorium? | मोहलत क्या है?</h4>
              <p className="text-gray-700 mb-3">
                <strong>Moratorium</strong> is a grace period during which you don't need to pay EMI. 
                For study in India loans, moratorium = <strong>Course duration + 6 months to 1 year</strong> after course completion.
              </p>
              <p className="text-gray-600">
                मोहलत अवधि वह समय है जब आपको EMI नहीं देनी होती। कोर्स + 6 महीने से 1 साल बाद तक।
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg text-gray-900 mb-3">Example Timeline:</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">1</div>
                  <div><strong>Year 1-4:</strong> B.Tech course (No EMI, only simple interest accrues)</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">2</div>
                  <div><strong>Year 5:</strong> 1 year moratorium after graduation (Find job, No EMI)</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">3</div>
                  <div><strong>Year 6-15:</strong> EMI repayment starts (10-15 years)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply Online | ऑनलाइन आवेदन करें</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://sbi.co.in/web/personal-banking/loans/education-loans/student-loan-scheme" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">SBI Student Loan</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
          <a href="https://www.bankofbaroda.in/personal-banking/loans/education-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">Bank of Baroda</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
          <a href="https://canarabank.com/english/scripts/Educationloan.aspx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">Canara Bank</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans/study-abroad" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Study Abroad Loan</div>
            <div className="text-sm text-green-100">USA, UK, Canada, Australia</div>
          </Link>
          <Link to="/learn/education-loans/eligibility-documents" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Eligibility & Documents</div>
            <div className="text-sm text-green-100">Complete requirements</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default StudyInIndia;

