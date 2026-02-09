import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ExternalLink, CheckCircle, TrendingDown, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const ScholarshipsAlternatives: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="scholarships-alternatives"
      breadcrumb={['Learn', 'Education Loans', 'Scholarships & Loan Alternatives']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Award className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Scholarships & Education Loan Alternatives | स्कॉलरशिप और विकल्प
            </h1>
            <p className="text-red-100 text-lg">Reduce loan burden by ₹5-50 lakh! Merit, need-based, government scholarships</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹5L-50L</div>
            <div className="text-sm text-red-100">Scholarship Amount</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">100+</div>
            <div className="text-sm text-red-100">Scholarships</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Free</div>
            <div className="text-sm text-red-100">Many Options</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Apply Now</div>
            <div className="text-sm text-red-100">Before Deadlines</div>
          </div>
        </div>
      </div>

      {/* Top Scholarships for Study in India */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Scholarships for Study in India | भारत में पढ़ाई के लिए</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-xl text-blue-700">1. National Scholarship Portal (NSP)</h4>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">Government</span>
            </div>
            <p className="text-gray-700 mb-3">
              Central and state government scholarships for students from SC/ST/OBC/Minority/EWS categories.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Amount:</h5>
                <p className="text-2xl font-bold text-blue-600">₹10,000 - ₹2,00,000/year</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Eligibility:</h5>
                <p className="text-sm text-gray-700">SC/ST/OBC, Family income &lt; ₹8L/year, Merit-based</p>
              </div>
            </div>
            <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              Apply on NSP Portal <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-xl text-green-700">2. AICTE Pragati & Saksham Scholarships</h4>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">For Girls</span>
            </div>
            <p className="text-gray-700 mb-3">
              For girl students in engineering (Pragati) and differently-abled students (Saksham).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-900 mb-2">Amount:</h5>
                <p className="text-2xl font-bold text-green-600">₹50,000/year</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-900 mb-2">Eligibility:</h5>
                <p className="text-sm text-gray-700">Girl students, AICTE-approved colleges, Family income &lt; ₹8L</p>
              </div>
            </div>
            <a href="https://www.aicte-india.org/schemes/students-development-schemes/pragati-scholarship-scheme-for-girls" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center text-green-600 hover:text-green-700 font-semibold">
              Apply on AICTE Portal <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <h4 className="font-bold text-xl text-purple-700 mb-3">3. Central Sector Scheme (Merit-Based)</h4>
            <p className="text-gray-700 mb-3">Merit-based scholarship for students from economically weaker sections.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Amount:</h5>
                <p className="text-2xl font-bold text-purple-600">₹10,000 - ₹20,000/year</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Eligibility:</h5>
                <p className="text-sm text-gray-700">12th pass from CBSE, Family income &lt; ₹4.5L</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Abroad Scholarships */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Scholarships for Study Abroad | विदेश में पढ़ाई</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-xl text-blue-700">1. Fulbright-Nehru Master's Fellowships (USA)</h4>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">Full Funding</span>
            </div>
            <p className="text-gray-700 mb-3">
              Prestigious fellowship for Indian students to pursue Master's degree in USA. Covers full tuition + living expenses.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Coverage:</h5>
                <p className="text-2xl font-bold text-blue-600">100% Funding</p>
                <p className="text-sm text-gray-600">Tuition + living + health insurance + airfare</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Eligibility:</h5>
                <p className="text-sm text-gray-700">Indian citizen, UG completed, Strong academics, Leadership</p>
              </div>
            </div>
            <a href="https://www.usief.org.in/Fellowships/Fulbright-Nehru-Master-s-Fellowships.aspx" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              Apply on USIEF Portal <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <h4 className="font-bold text-xl text-purple-700 mb-3">2. Chevening Scholarships (UK)</h4>
            <p className="text-gray-700 mb-3">
              UK government's global scholarship program. Covers full tuition + monthly stipend for 1-year Master's.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Coverage:</h5>
                <p className="text-2xl font-bold text-purple-600">100% Funding</p>
                <p className="text-sm text-gray-600">Tuition + £1,236/month stipend + flights</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Eligibility:</h5>
                <p className="text-sm text-gray-700">Indian citizen, 2+ years work exp, Leadership potential</p>
              </div>
            </div>
            <a href="https://www.chevening.org/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold">
              Apply on Chevening Portal <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <h4 className="font-bold text-xl text-orange-700 mb-3">3. DAAD Scholarships (Germany)</h4>
            <p className="text-gray-700 mb-3">
              German Academic Exchange Service scholarships for Master's and PhD in Germany.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h5 className="font-semibold text-orange-900 mb-2">Coverage:</h5>
                <p className="text-2xl font-bold text-orange-600">€861/month</p>
                <p className="text-sm text-gray-600">Plus tuition waiver + health insurance</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h5 className="font-semibold text-orange-900 mb-2">Eligibility:</h5>
                <p className="text-sm text-gray-700">UG degree, Good academics, Research proposal</p>
              </div>
            </div>
            <a href="https://www.daad.in/en/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold">
              Apply on DAAD Portal <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* University Scholarships */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">University-Specific Scholarships | यूनिवर्सिटी स्कॉलरशिप</h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-300">
          <p className="text-lg text-gray-700 mb-6">
            Many universities offer merit-based and need-based scholarships directly. These can reduce your education loan requirement significantly!
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-bold text-lg text-blue-900 mb-3">USA University Scholarships:</h4>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Graduate Assistantship (GA):</strong> Work 20hrs/week as TA/RA, get tuition waiver + $1,500-2,500/month stipend
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Merit-based Scholarships:</strong> $5,000-20,000/year based on GRE, GPA, profile
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Departmental Scholarships:</strong> Engineering, CS departments often give $10,000-15,000/year
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-bold text-lg text-green-900 mb-3">UK University Scholarships:</h4>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Rhodes Scholarship (Oxford):</strong> Full funding + stipend (most prestigious)
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Gates Cambridge:</strong> Full scholarship for Cambridge PhD students
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>University-specific:</strong> Imperial, UCL, Edinburgh offer £5,000-15,000/year scholarships
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Private Scholarships */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Private & Corporate Scholarships | निजी स्कॉलरशिप</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Inlaks Shivdasani Foundation</h4>
            <p className="text-gray-700 mb-3">For Master's/PhD at top global universities</p>
            <div className="bg-blue-50 p-4 rounded-lg mb-3">
              <div className="flex justify-between mb-2"><span>Amount:</span><span className="font-bold text-blue-600">$50,000 - $100,000</span></div>
              <div className="text-sm text-gray-600">Covers tuition + living for 1-2 years</div>
            </div>
            <a href="https://www.inlaksscholarships.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 font-semibold">Apply <ExternalLink className="h-4 w-4 ml-1" /></a>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Tata Scholarship (Cornell University)</h4>
            <p className="text-gray-700 mb-3">For Indian students at Cornell University</p>
            <div className="bg-orange-50 p-4 rounded-lg mb-3">
              <div className="flex justify-between mb-2"><span>Amount:</span><span className="font-bold text-orange-600">Up to $70,000/year</span></div>
              <div className="text-sm text-gray-600">Covers most of tuition fees</div>
            </div>
            <a href="https://admissions.cornell.edu/financial-aid" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-orange-600 font-semibold">Learn More <ExternalLink className="h-4 w-4 ml-1" /></a>
          </div>
        </div>
      </section>

      {/* How to Combine Scholarship + Loan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Smart Strategy: Scholarship + Loan Combination | स्मार्ट रणनीति</h2>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300">
          <h3 className="text-2xl font-bold text-green-700 mb-6">Example: MS in USA with Scholarship</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h5 className="font-semibold text-lg text-gray-900 mb-3">Total Cost Breakdown:</h5>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between"><span>Tuition (2 years):</span><span>$56,000</span></div>
                <div className="flex justify-between"><span>Living (2 years):</span><span>$30,000</span></div>
                <div className="flex justify-between"><span>Other expenses:</span><span>$10,000</span></div>
                <div className="flex justify-between pt-3 border-t text-xl"><span><strong>Total:</strong></span><span className="font-bold text-red-600">$96,000</span></div>
                <div className="text-center text-2xl font-bold text-red-600">= ₹80,00,000</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h5 className="font-semibold text-lg text-gray-900 mb-3">Funding Sources:</h5>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between text-green-600"><span>University Scholarship:</span><span className="font-bold">-$20,000</span></div>
                <div className="flex justify-between text-green-600"><span>Graduate Assistantship (2 yr):</span><span className="font-bold">-$30,000</span></div>
                <div className="flex justify-between text-blue-600"><span>Self-funded (savings):</span><span className="font-bold">-$10,000</span></div>
                <div className="flex justify-between pt-3 border-t text-xl"><span><strong>Remaining:</strong></span><span className="font-bold text-orange-600">$36,000</span></div>
                <div className="text-center text-2xl font-bold text-purple-600">= ₹30,00,000 (loan needed)</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-600 text-white rounded-xl p-6 text-center">
            <div className="text-lg mb-2">Loan Reduced By:</div>
            <div className="text-5xl font-bold mb-2">62%</div>
            <div className="text-sm">(From ₹80L to ₹30L - Save ₹50L with scholarships!) 🎉</div>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🔗 Scholarship Portals | स्कॉलरशिप पोर्टल</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-red-400">
            <span className="font-semibold text-gray-900">National Scholarship Portal</span>
            <ExternalLink className="h-5 w-5 text-red-600" />
          </a>
          <a href="https://www.buddy4study.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-red-400">
            <span className="font-semibold text-gray-900">Buddy4Study</span>
            <ExternalLink className="h-5 w-5 text-red-600" />
          </a>
          <a href="https://www.scholarshipportal.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-red-400">
            <span className="font-semibold text-gray-900">Scholarship Portal</span>
            <ExternalLink className="h-5 w-5 text-red-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Education Loans Complete! | कोर्स पूर्ण 🎉</h3>
        <p className="mb-6">Congratulations! You have mastered education loans. Explore other loan types:</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/learn/education-loans" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Back to Education Loans Hub</div>
            <div className="text-sm text-red-100">Review all 10 lessons</div>
          </Link>
          <Link to="/learn/vehicle-loans" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Vehicle Loans (15 lessons)</div>
            <div className="text-sm text-red-100">Car & bike loans</div>
          </Link>
          <Link to="/learn/business-loans" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Business Loans (15 lessons)</div>
            <div className="text-sm text-red-100">MSME, startup funding</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default ScholarshipsAlternatives;

