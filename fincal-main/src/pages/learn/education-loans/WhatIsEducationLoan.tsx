import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Calculator, TrendingUp, CheckCircle, AlertCircle, ExternalLink, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const WhatIsEducationLoan: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="what-is-education-loan"
      breadcrumb={['Learn', 'Education Loans', 'What is Education Loan India?']}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <GraduationCap className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              What is Education Loan India 2025? | एजुकेशन लोन क्या है?
            </h1>
            <p className="text-blue-100 text-lg">
              Complete guide: Types, eligibility, interest rates, repayment - Make your education dreams come true!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to ₹1.5Cr</div>
            <div className="text-sm text-blue-100">Max Loan Amount</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">8-12%</div>
            <div className="text-sm text-blue-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">15 Years</div>
            <div className="text-sm text-blue-100">Max Repayment</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Course+1 Yr</div>
            <div className="text-sm text-blue-100">Moratorium</div>
          </div>
        </div>
      </div>

      {/* What is Education Loan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <GraduationCap className="h-8 w-8 mr-3 text-blue-600" />
          What is Education Loan? | एजुकेशन लोन क्या है?
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            An <strong>education loan (एजुकेशन लोन)</strong> is a financial aid provided by banks and financial institutions to students for pursuing higher education in India or abroad. 
            It covers tuition fees, hostel fees, books, equipment, and other study-related expenses.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>एजुकेशन लोन हिंदी में:</strong> एजुकेशन लोन एक वित्तीय सहायता है जो बैंक और वित्तीय संस्थान छात्रों को उच्च शिक्षा के लिए देते हैं। यह ट्यूशन फीस, हॉस्टल, किताबें और अन्य खर्चों को कवर करता है।
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Key Feature | मुख्य विशेषता
            </h4>
            <p className="text-gray-700">
              <strong>Moratorium Period:</strong> You don't need to pay EMI during your course period + 6 months to 1 year after completing the course. This gives you time to find a job!
              <br />
              <span className="text-gray-600">मोहलत अवधि: कोर्स के दौरान + कोर्स खत्म होने के 6 महीने से 1 साल बाद तक EMI नहीं देनी होती।</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3">✅ What is Covered | क्या कवर होता है</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Tuition fees</strong> - Full course fees (ट्यूशन फीस)</li>
              <li>• <strong>Hostel/Accommodation</strong> - Rent, mess charges (हॉस्टल खर्च)</li>
              <li>• <strong>Books & equipment</strong> - Study materials (किताबें)</li>
              <li>• <strong>Travel expenses</strong> - One-time airfare for abroad (यात्रा खर्च)</li>
              <li>• <strong>Exam fees</strong> - Entrance, semester exams (परीक्षा शुल्क)</li>
              <li>• <strong>Computer/Laptop</strong> - If required for course (लैपटॉप)</li>
              <li>• <strong>Study tour</strong> - Educational trips (शैक्षिक दौरे)</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3">❌ What is NOT Covered | क्या कवर नहीं होता</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Personal expenses</strong> - Shopping, entertainment (व्यक्तिगत खर्च)</li>
              <li>• <strong>Pocket money</strong> - Daily expenses (जेब खर्च)</li>
              <li>• <strong>Luxury items</strong> - Phones, bikes (लग्जरी सामान)</li>
              <li>• <strong>Course not recognized</strong> - Unaccredited courses (मान्यता प्राप्त नहीं)</li>
              <li>• <strong>Part-time courses</strong> - Only full-time eligible (पार्ट टाइम नहीं)</li>
              <li>• <strong>Distance education</strong> - Most banks don't cover (दूरस्थ शिक्षा)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Types of Education Loans */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Types of Education Loans | एजुकेशन लोन के प्रकार
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">1. Study in India Loan</h3>
            <p className="text-gray-700 mb-4">For pursuing education in Indian institutions</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Max Amount:</strong> Up to ₹20 lakh</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Interest Rate:</strong> 8.5% - 11% p.a.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Collateral:</strong> Not required for loans up to ₹7.5L</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Courses:</strong> IIT, MBBS, Engineering, MBA, etc.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-300 ring-4 ring-purple-100">
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">Most Popular</div>
            <h3 className="text-2xl font-bold text-purple-700 mb-4">2. Study Abroad Loan</h3>
            <p className="text-gray-700 mb-4">For pursuing education in foreign universities</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Max Amount:</strong> Up to ₹1.5 crore</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Interest Rate:</strong> 9% - 12% p.a.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Collateral:</strong> Required for loans above ₹7.5L</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Countries:</strong> USA, UK, Canada, Australia, Germany</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Education Loan Eligibility | पात्रता मानदंड
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-xl text-gray-900 mb-4">Student Eligibility | छात्र पात्रता</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Age:</strong> 18-35 years (typically)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Citizenship:</strong> Indian citizen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Academic:</strong> Admission confirmed in recognized institution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Co-applicant:</strong> Parent/Guardian as co-borrower</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Previous education:</strong> 12th pass minimum</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xl text-gray-900 mb-4">Co-Applicant Requirements</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Relation:</strong> Parent, spouse, sibling, in-laws</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Income:</strong> Stable income source (salaried/business)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>CIBIL:</strong> Good credit score (750+)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Age:</strong> Below 60 years at loan maturity</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Repayment:</strong> Sufficient income to repay EMI</span>
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
          Education Loan Interest Rates 2025 | ब्याज दरें
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank</th>
                <th className="px-6 py-4 text-left">Study in India</th>
                <th className="px-6 py-4 text-left">Study Abroad</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">SBI (Student Loan Scheme)</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.50% - 10.00%</td>
                <td className="px-6 py-4 text-green-600 font-bold">9.50% - 11.50%</td>
                <td className="px-6 py-4">₹10,000</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">HDFC Credila</td>
                <td className="px-6 py-4 text-green-600 font-bold">9.00% - 11.50%</td>
                <td className="px-6 py-4 text-green-600 font-bold">10.00% - 13.00%</td>
                <td className="px-6 py-4">1% of loan</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">ICICI Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">9.50% - 11.50%</td>
                <td className="px-6 py-4 text-green-600 font-bold">10.50% - 12.50%</td>
                <td className="px-6 py-4">Upto ₹10,000</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">Axis Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">10.00% - 12.00%</td>
                <td className="px-6 py-4 text-green-600 font-bold">11.00% - 13.50%</td>
                <td className="px-6 py-4">₹10,000</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">Bank of Baroda</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.75% - 10.50%</td>
                <td className="px-6 py-4 text-green-600 font-bold">9.75% - 11.75%</td>
                <td className="px-6 py-4">₹7,500</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <p className="text-gray-700">
            <strong>💡 Note:</strong> Interest rates vary based on loan amount, co-applicant income, collateral, and credit score. 
            Interest on education loan is tax-deductible under Section 80E (save up to ₹50,000/year)!
            <br />
            <span className="text-gray-600">एजुकेशन लोन पर ब्याज सेक्शन 80E के तहत टैक्स में छूट मिलती है!</span>
          </p>
        </div>
      </section>

      {/* Example Calculation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="h-8 w-8 mr-3 text-blue-600" />
          Education Loan Example | उदाहरण
        </h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">MBA in IIM - Education Loan Example</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg text-gray-900 mb-3">Course Details:</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between"><span>Tuition Fee (2 years):</span><span className="font-bold">₹20,00,000</span></div>
                <div className="flex justify-between"><span>Hostel &amp; Books:</span><span className="font-bold">₹3,00,000</span></div>
                <div className="flex justify-between"><span>Other Expenses:</span><span className="font-bold">₹2,00,000</span></div>
                <div className="flex justify-between pt-3 border-t text-xl"><span>Total Loan:</span><span className="font-bold text-blue-600">₹25,00,000</span></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg text-gray-900 mb-3">Loan Terms:</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between"><span>Interest Rate:</span><span className="font-bold text-green-600">9.5% p.a.</span></div>
                <div className="flex justify-between"><span>Moratorium:</span><span>2 years + 1 year = 3 years</span></div>
                <div className="flex justify-between"><span>Repayment Period:</span><span>10 years after moratorium</span></div>
                <div className="flex justify-between pt-3 border-t text-xl"><span>Monthly EMI:</span><span className="font-bold text-blue-600">₹32,332</span></div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-600 text-white rounded-xl p-6">
            <h4 className="font-bold text-xl mb-3">💡 Smart Facts:</h4>
            <ul className="space-y-2">
              <li>• No EMI during MBA (2 years) + 1 year job search</li>
              <li>• Total interest paid: ₹13,79,840</li>
              <li>• Tax saving (Section 80E): ₹50,000/year × 10 years = ₹5,00,000 saved!</li>
              <li>• Actual cost after tax benefit: ₹33,79,840</li>
            </ul>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Apply for Education Loan | आवेदन करें
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://sbi.co.in/web/personal-banking/loans/education-loans" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400">
            <span className="font-semibold text-gray-900">SBI Education Loan</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
          
          <a href="https://www.hdfccredila.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400">
            <span className="font-semibold text-gray-900">HDFC Credila</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
          
          <a href="https://www.icicibank.com/personal-banking/loans/education-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400">
            <span className="font-semibold text-gray-900">ICICI Education Loan</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <p className="mb-6">Now that you understand education loans, explore specific types:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans/study-in-india" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Next: Study in India Loan</div>
            <div className="text-sm text-blue-100">IIT, MBBS, Engineering, MBA</div>
          </Link>
          
          <Link to="/learn/education-loans/study-abroad" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Study Abroad Loan</div>
            <div className="text-sm text-blue-100">USA, UK, Canada, Australia</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default WhatIsEducationLoan;

