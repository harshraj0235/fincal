import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, AlertCircle, User, Briefcase, Home } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const EligibilityDocuments: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="eligibility-documents"
      breadcrumb={['Learn', 'Education Loans', 'Education Loan Eligibility & Documents']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <FileText className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Education Loan Eligibility & Documents 2025 | पात्रता और दस्तावेज
            </h1>
            <p className="text-orange-100 text-lg">Complete checklist - Student, co-applicant, collateral documents</p>
          </div>
        </div>
      </div>

      {/* Student Eligibility */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <User className="h-8 w-8 mr-3 text-orange-600" />
          Student Eligibility Criteria | छात्र पात्रता
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-xl text-gray-900 mb-4">Basic Criteria:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Age:</strong> 16-35 years (typically 18-30 preferred)
                    <p className="text-sm text-gray-600">आयु: 16-35 साल</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Citizenship:</strong> Must be Indian citizen/resident
                    <p className="text-sm text-gray-600">भारतीय नागरिक होना अनिवार्य</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Academic Qualification:</strong> 12th pass minimum (for UG), UG completed (for PG)
                    <p className="text-sm text-gray-600">न्यूनतम शैक्षिक योग्यता</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Admission Confirmed:</strong> Must have admission letter / I-20 / CAS from recognized institution
                    <p className="text-sm text-gray-600">मान्यता प्राप्त संस्थान में प्रवेश पक्का होना चाहिए</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Entrance Exam:</strong> Good scores in JEE, NEET, CAT, GRE, GMAT, IELTS (as applicable)
                    <p className="text-sm text-gray-600">अच्छे एंट्रेंस एग्जाम स्कोर</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Academic Record:</strong> Minimum 50-60% marks in previous exams
                    <p className="text-sm text-gray-600">पिछली परीक्षाओं में न्यूनतम अंक</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xl text-gray-900 mb-4">Course Eligibility:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Recognized Institution:</strong> UGC, AICTE, MCI, BCI approved
                    <p className="text-sm text-gray-600">मान्यता प्राप्त संस्थान</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Full-Time Courses:</strong> Part-time, distance, correspondence NOT eligible
                    <p className="text-sm text-gray-600">फुल टाइम कोर्स ही योग्य हैं</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Higher Education:</strong> Graduation, post-graduation, PhD, professional courses
                    <p className="text-sm text-gray-600">उच्च शिक्षा कोर्स</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Job-Oriented:</strong> Engineering, Medical, MBA, Law (career-focused courses preferred)
                    <p className="text-sm text-gray-600">नौकरी उन्मुख कोर्स</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Applicant Eligibility */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Briefcase className="h-8 w-8 mr-3 text-blue-600" />
          Co-Applicant Eligibility | सह-आवेदक पात्रता
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            <strong>Co-applicant (सह-आवेदक) is MANDATORY for education loans.</strong> Usually parent/guardian who will be legally responsible for loan repayment.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-3">Who Can Be Co-Applicant?</h5>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Father (most common)</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Mother</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Spouse (for married students)</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Legal guardian</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Sibling (in some cases)</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Father-in-law/Mother-in-law</span></li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h5 className="font-semibold text-green-900 mb-3">Co-Applicant Requirements:</h5>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Age:</strong> Below 60-65 years at loan maturity</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Income:</strong> Stable income source (salaried/business/pension)</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>CIBIL Score:</strong> 700+ (750+ for non-collateral)</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Repayment Capacity:</strong> EMI should be &lt;40% of monthly income</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>No Defaults:</strong> No history of loan defaults or bankruptcy</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Document Checklist */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Complete Document Checklist | पूरी दस्तावेज सूची
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
            <h4 className="font-bold text-xl text-blue-700 mb-4">Student Documents</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ PAN Card (mandatory)</li>
              <li>✓ Aadhaar Card</li>
              <li>✓ Passport (for abroad studies)</li>
              <li>✓ 10th mark sheet</li>
              <li>✓ 12th mark sheet</li>
              <li>✓ UG degree & mark sheets (for PG courses)</li>
              <li>✓ Entrance exam scorecard (JEE/NEET/CAT/GRE/GMAT)</li>
              <li>✓ TOEFL/IELTS scores (for abroad)</li>
              <li>✓ Admission/Offer letter</li>
              <li>✓ I-20 (USA) / CAS (UK)</li>
              <li>✓ Fee structure from university</li>
              <li>✓ Bank account statements (6 months)</li>
              <li>✓ Passport size photos (4-6)</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
            <h4 className="font-bold text-xl text-green-700 mb-4">Co-Applicant Documents</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ PAN Card</li>
              <li>✓ Aadhaar Card</li>
              <li>✓ <strong>For Salaried:</strong></li>
              <li className="ml-4">• Salary slips (last 3-6 months)</li>
              <li className="ml-4">• Form 16 (last 2 years)</li>
              <li className="ml-4">• Employment certificate</li>
              <li className="ml-4">• Appointment letter</li>
              <li>✓ <strong>For Self-Employed:</strong></li>
              <li className="ml-4">• ITR (last 2-3 years)</li>
              <li className="ml-4">• Business proof (GST, Shop Act)</li>
              <li className="ml-4">• Audited financials</li>
              <li className="ml-4">• Business address proof</li>
              <li>✓ Bank statements (12 months)</li>
              <li>✓ Passport size photos</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300">
            <h4 className="font-bold text-xl text-purple-700 mb-4">Collateral Documents (if required)</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ <strong>For Property:</strong></li>
              <li className="ml-4">• Sale deed / Title deed</li>
              <li className="ml-4">• Property tax receipts</li>
              <li className="ml-4">• Encumbrance Certificate (13-30 years)</li>
              <li className="ml-4">• 7/12 extract (Maharashtra)</li>
              <li className="ml-4">• Approved building plan</li>
              <li className="ml-4">• Property valuation report</li>
              <li>✓ <strong>For Fixed Deposit:</strong></li>
              <li className="ml-4">• FD certificate</li>
              <li className="ml-4">• FD receipt</li>
              <li className="ml-4">• Lien marking letter</li>
              <li>✓ <strong>For LIC/Bonds:</strong></li>
              <li className="ml-4">• Policy documents</li>
              <li className="ml-4">• Surrender value statement</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Rejection Reasons */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Applications Get Rejected | अस्वीकृति के कारण</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3 text-xl">❌ Top Rejection Reasons:</h4>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Low co-applicant CIBIL score</strong> (&lt;700)</li>
              <li>• <strong>Insufficient co-applicant income</strong> (EMI &gt; 50% of income)</li>
              <li>• <strong>Unrecognized institution</strong> (not UGC/AICTE approved)</li>
              <li>• <strong>Part-time/distance course</strong></li>
              <li>• <strong>Incomplete documents</strong> (missing admission letter, fee structure)</li>
              <li>• <strong>Poor academic record</strong> (&lt;50% marks)</li>
              <li>• <strong>Co-applicant has existing loan defaults</strong></li>
              <li>• <strong>Unstable co-applicant employment</strong> (frequent job changes)</li>
              <li>• <strong>Property issues</strong> (disputes, unclear title)</li>
              <li>• <strong>Student too old</strong> (&gt;35 years)</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 text-xl">✅ How to Improve Approval Chances:</h4>
            <ul className="space-y-3 text-gray-700">
              <li>• Choose co-applicant with highest income & best CIBIL</li>
              <li>• Apply to top-ranked recognized universities</li>
              <li>• Submit complete, accurate documents in one go</li>
              <li>• Maintain good academic record (60%+ marks)</li>
              <li>• Get good entrance exam scores (GRE 315+, GMAT 700+)</li>
              <li>• Apply 3-6 months before course start (don't rush)</li>
              <li>• Co-applicant should close existing small loans if possible</li>
              <li>• Consider collateral if available (improves approval odds)</li>
              <li>• Apply to multiple banks simultaneously</li>
              <li>• Show scholarship/assistantship offer (if any)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans/interest-rates" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Interest Rates 2025</div>
            <div className="text-sm text-orange-100">Compare all banks</div>
          </Link>
          <Link to="/learn/education-loans/emi-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">EMI Calculator</div>
            <div className="text-sm text-orange-100">Calculate your EMI</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default EligibilityDocuments;

