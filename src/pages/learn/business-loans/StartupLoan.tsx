import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, IndianRupee, TrendingUp, CheckCircle, AlertCircle, ExternalLink, Award, Rocket } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const StartupLoan: React.FC = () => {
  return (
    <LearnLayout
      category="business-loans"
      currentLesson="startup-loan"
      breadcrumb={['Learn', 'Business Loans', 'Startup Business Loan 2025']}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Zap className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Startup Business Loan India 2025 | स्टार्टअप लोन गाइड
            </h1>
            <p className="text-purple-100 text-lg">
              Complete funding guide for startups - Angel investors, venture capital, government schemes, bank loans
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to ₹10Cr</div>
            <div className="text-sm text-purple-100">Max Funding</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">12-20%</div>
            <div className="text-sm text-purple-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">No Revenue</div>
            <div className="text-sm text-purple-100">Also Eligible</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Tax Exempt</div>
            <div className="text-sm text-purple-100">3 Years</div>
          </div>
        </div>
      </div>

      {/* What is Startup Loan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Zap className="h-8 w-8 mr-3 text-purple-600" />
          What is Startup Business Loan? | स्टार्टअप लोन क्या है?
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            A <strong>Startup Business Loan</strong> is specialized funding for new businesses (0-5 years old) that don't have established revenue, profit history, or collateral. 
            These loans focus on business idea, market potential, and founder's vision rather than traditional eligibility criteria.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>स्टार्टअप लोन हिंदी में:</strong> स्टार्टअप लोन नए व्यवसायों (0-5 साल पुराने) के लिए विशेष फंडिंग है जिनके पास राजस्व या लाभ का इतिहास नहीं है। यह बिजनेस आइडिया और मार्केट संभावना पर केंद्रित है।
          </p>
          
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-purple-900 mb-3 flex items-center">
              <Rocket className="h-5 w-5 mr-2" />
              What Makes Startup Loans Different? | क्या अलग है?
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>No revenue requirement:</strong> Even pre-revenue startups can apply</li>
              <li>• <strong>Idea-based evaluation:</strong> Business plan, market research matter more</li>
              <li>• <strong>Flexible collateral:</strong> Personal guarantee or future receivables accepted</li>
              <li>• <strong>Longer moratorium:</strong> 6-12 months grace period before EMI</li>
              <li>• <strong>Government support:</strong> SIDBI, Startup India schemes available</li>
              <li>• <strong>Higher risk = higher rate:</strong> Interest rates 14-20% (higher than MSME)</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3">✅ Eligible Startups | योग्य स्टार्टअप</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Tech startups:</strong> SaaS, mobile apps, AI/ML, fintech</li>
              <li>• <strong>E-commerce:</strong> Online stores, marketplaces, D2C brands</li>
              <li>• <strong>Food & beverage:</strong> Cloud kitchens, cafes, QSRs</li>
              <li>• <strong>Healthcare:</strong> Telemedicine, diagnostics, health-tech</li>
              <li>• <strong>Education:</strong> Ed-tech, coaching, skill development</li>
              <li>• <strong>Manufacturing:</strong> Innovative products, sustainable goods</li>
              <li>• <strong>Services:</strong> Consulting, marketing, logistics</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-blue-900 mb-3">📋 Requirements</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>DPIIT recognition:</strong> Registered on Startup India portal</li>
              <li>• <strong>Business plan:</strong> Detailed 3-5 year projection</li>
              <li>• <strong>Market research:</strong> TAM, SAM, SOM analysis</li>
              <li>• <strong>Founder experience:</strong> Relevant industry experience</li>
              <li>• <strong>Product/Service ready:</strong> At least MVP (Minimum Viable Product)</li>
              <li>• <strong>Legal entity:</strong> Pvt Ltd, LLP registration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Funding Options */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Startup Funding Options | स्टार्टअप फंडिंग विकल्प
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
            <h3 className="text-xl font-bold text-blue-700 mb-4">1. Bank Term Loan</h3>
            <p className="text-gray-700 mb-4">Traditional loan from banks for established startups (2+ years)</p>
            <div className="bg-white p-4 rounded-lg shadow mb-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Amount:</span><span className="font-bold">₹10L - ₹5Cr</span></div>
                <div className="flex justify-between"><span>Rate:</span><span className="font-bold text-green-600">12-16% p.a.</span></div>
                <div className="flex justify-between"><span>Tenure:</span><span>3-7 years</span></div>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded text-sm">
              <strong>Best for:</strong> Revenue-generating startups with 2+ years track record
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300 ring-4 ring-purple-100">
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">Popular</div>
            <h3 className="text-xl font-bold text-purple-700 mb-4">2. Startup India Seed Fund</h3>
            <p className="text-gray-700 mb-4">Government seed funding for early-stage startups</p>
            <div className="bg-white p-4 rounded-lg shadow mb-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Amount:</span><span className="font-bold">Up to ₹50L</span></div>
                <div className="flex justify-between"><span>Type:</span><span className="font-bold text-green-600">Grant/Equity</span></div>
                <div className="flex justify-between"><span>Repayment:</span><span>No repayment!</span></div>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded text-sm">
              <strong>Best for:</strong> Early-stage tech/innovative startups
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
            <h3 className="text-xl font-bold text-green-700 mb-4">3. Angel Investors</h3>
            <p className="text-gray-700 mb-4">High net-worth individuals investing in startups</p>
            <div className="bg-white p-4 rounded-lg shadow mb-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Amount:</span><span className="font-bold">₹25L - ₹2Cr</span></div>
                <div className="flex justify-between"><span>Type:</span><span className="font-bold text-blue-600">Equity</span></div>
                <div className="flex justify-between"><span>Stake:</span><span>5-20% equity</span></div>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded text-sm">
              <strong>Best for:</strong> Scalable tech startups with growth potential
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">4. Venture Capital (VC)</h4>
            <p className="text-gray-700 mb-3">Professional investors funding high-growth startups</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-orange-50 p-3 rounded"><strong>Amount:</strong> ₹2Cr - ₹100Cr</div>
              <div className="bg-blue-50 p-3 rounded"><strong>Stake:</strong> 10-40% equity</div>
              <div className="bg-green-50 p-3 rounded"><strong>Stage:</strong> Series A, B, C</div>
              <div className="bg-purple-50 p-3 rounded"><strong>Best for:</strong> Unicorn potential</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">5. SIDBI (Startup Assistance)</h4>
            <p className="text-gray-700 mb-3">Small Industries Development Bank of India</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded"><strong>Amount:</strong> ₹50L - ₹10Cr</div>
              <div className="bg-green-50 p-3 rounded"><strong>Rate:</strong> 11-14% p.a.</div>
              <div className="bg-purple-50 p-3 rounded"><strong>Tenure:</strong> 5-10 years</div>
              <div className="bg-orange-50 p-3 rounded"><strong>Collateral:</strong> May be waived</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interest Rates */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-green-600" />
          Startup Loan Interest Rates 2025 | ब्याज दरें
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Lender Type</th>
                <th className="px-6 py-4 text-left">Typical Amount</th>
                <th className="px-6 py-4 text-left">Interest/Equity</th>
                <th className="px-6 py-4 text-left">Pros</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">Bank Loan</td>
                <td className="px-6 py-4">₹10L - ₹5Cr</td>
                <td className="px-6 py-4 text-green-600 font-bold">12-16% p.a.</td>
                <td className="px-6 py-4 text-sm">No equity dilution, full control</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">SIDBI</td>
                <td className="px-6 py-4">₹50L - ₹10Cr</td>
                <td className="px-6 py-4 text-green-600 font-bold">11-14% p.a.</td>
                <td className="px-6 py-4 text-sm">Lower rate, flexible terms</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">Angel Investors</td>
                <td className="px-6 py-4">₹25L - ₹2Cr</td>
                <td className="px-6 py-4 text-orange-600">5-20% equity</td>
                <td className="px-6 py-4 text-sm">Mentorship, network access</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">Venture Capital</td>
                <td className="px-6 py-4">₹2Cr - ₹100Cr</td>
                <td className="px-6 py-4 text-red-600">15-40% equity</td>
                <td className="px-6 py-4 text-sm">Large funding, scaling support</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="px-6 py-4 font-semibold">Startup India Fund</td>
                <td className="px-6 py-4">Up to ₹50L</td>
                <td className="px-6 py-4 text-green-600 font-bold">0% (Grant)</td>
                <td className="px-6 py-4 text-sm">Free money, no repayment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Startup India Scheme */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Startup India Scheme Benefits | स्टार्टअप इंडिया लाभ
        </h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-300">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">Government of India - Startup India Initiative</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-bold text-lg text-blue-900 mb-4">Tax Benefits:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>3-year tax holiday:</strong> 100% income tax exemption for 3 consecutive years (out of first 10 years)
                    <p className="text-sm text-gray-600">3 साल तक कोई इनकम टैक्स नहीं!</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Angel tax exemption:</strong> No tax on angel investment received
                    <p className="text-sm text-gray-600">एंजेल निवेश पर कोई टैक्स नहीं</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Capital gains exemption:</strong> Under Section 54GB
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-bold text-lg text-blue-900 mb-4">Other Benefits:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Easy compliance:</strong> Self-certification for labor & environment laws
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>IPR protection:</strong> 80% rebate on patent filing fees
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Public procurement:</strong> Exemption from EMD (Earnest Money Deposit)
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Networking:</strong> Access to incubators, accelerators
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a href="https://www.startupindia.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:shadow-xl transition-all">
              <Award className="h-5 w-5 mr-2" />
              Register on Startup India Portal
            </a>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Startup Funding Resources | फंडिंग संसाधन
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://www.startupindia.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-purple-400">
            <span className="font-semibold text-gray-900">Startup India Portal</span>
            <ExternalLink className="h-5 w-5 text-purple-600" />
          </a>
          
          <a href="https://www.sidbi.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-purple-400">
            <span className="font-semibold text-gray-900">SIDBI Official</span>
            <ExternalLink className="h-5 w-5 text-purple-600" />
          </a>
          
          <a href="https://www.indiafilings.com/startup-india-registration" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-purple-400">
            <span className="font-semibold text-gray-900">DPIIT Registration</span>
            <ExternalLink className="h-5 w-5 text-purple-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/business-loans/government-schemes" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Government Schemes</div>
            <div className="text-sm text-purple-100">All govt business loan schemes</div>
          </Link>
          <Link to="/learn/business-loans/eligibility-criteria" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Eligibility Criteria</div>
            <div className="text-sm text-purple-100">Check if you qualify</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default StartupLoan;

