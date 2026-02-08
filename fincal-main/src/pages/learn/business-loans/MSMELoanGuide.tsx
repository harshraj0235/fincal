import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Calculator, TrendingUp, CheckCircle, AlertCircle, ExternalLink, Award, Building } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const MSMELoanGuide: React.FC = () => {
  return (
    <LearnLayout
      category="business-loans"
      currentLesson="msme-loan-guide"
      breadcrumb={['Learn', 'Business Loans', 'MSME Loan Complete Guide']}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Factory className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              MSME Loan Complete Guide India 2025 | एमएसएमई लोन गाइड
            </h1>
            <p className="text-green-100 text-lg">
              Micro, Small & Medium Enterprise loans - Up to ₹50 Cr funding | Government schemes, subsidies, benefits
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to ₹50Cr</div>
            <div className="text-sm text-green-100">Max Loan Amount</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">9-15%</div>
            <div className="text-sm text-green-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">No Collateral</div>
            <div className="text-sm text-green-100">Up to ₹2Cr</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">CGT Scheme</div>
            <div className="text-sm text-green-100">80% Guarantee</div>
          </div>
        </div>
      </div>

      {/* What is MSME */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Factory className="h-8 w-8 mr-3 text-green-600" />
          What is MSME? | MSME क्या है?
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>MSME (Micro, Small and Medium Enterprises)</strong> are businesses classified based on investment in plant & machinery/equipment and annual turnover. 
            Government of India provides special benefits, subsidies, and easier credit to MSME sectors.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>MSME हिंदी में:</strong> सूक्ष्म, लघु और मध्यम उद्यम (MSME) व्यवसाय हैं जो निवेश और टर्नओवर के आधार पर वर्गीकृत होते हैं। सरकार इन्हें विशेष लाभ देती है।
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Investment in Plant & Machinery</th>
                  <th className="px-6 py-4 text-left">Annual Turnover</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4 font-semibold text-green-700">Micro Enterprise</td>
                  <td className="px-6 py-4">Up to ₹1 Crore</td>
                  <td className="px-6 py-4">Up to ₹5 Crore</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4 font-semibold text-blue-700">Small Enterprise</td>
                  <td className="px-6 py-4">₹1 Cr - ₹10 Cr</td>
                  <td className="px-6 py-4">₹5 Cr - ₹50 Cr</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4 font-semibold text-purple-700">Medium Enterprise</td>
                  <td className="px-6 py-4">₹10 Cr - ₹50 Cr</td>
                  <td className="px-6 py-4">₹50 Cr - ₹250 Cr</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3">How to Check Your MSME Category?</h4>
            <p className="text-gray-700">
              <strong>Example:</strong> If your manufacturing business has ₹80 lakh investment in machinery and ₹3 crore annual turnover, you are a <strong>Micro Enterprise</strong>. 
              Get Udyam Registration certificate from <a href="https://udyamregistration.gov.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">udyamregistration.gov.in</a> (free, online, instant!)
            </p>
          </div>
        </div>
      </section>

      {/* MSME Loan Benefits */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          MSME Loan Benefits & Schemes | MSME लाभ और योजनाएं
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-300">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Credit Guarantee Scheme (CGT)</h3>
            <p className="text-gray-700 mb-4">
              <strong>CGTMSE (Credit Guarantee Trust for Micro and Small Enterprises)</strong> provides 75-80% guarantee to banks. 
              This allows MSMEs to get loans <strong>without collateral</strong> up to ₹2 crore!
            </p>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h5 className="font-semibold text-gray-900 mb-3">How CGT Works:</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Bank lends ₹1 crore to your MSME</li>
                <li>• CGTMSE guarantees 80% (₹80 lakh) to bank</li>
                <li>• If you default, CGTMSE pays bank ₹80L</li>
                <li>• Bank's risk reduced = easier approval for you!</li>
                <li>• You don't need to pledge property/assets</li>
              </ul>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Guarantee Fee:</strong> 0.75-1% one-time (paid by bank, sometimes passed to you)
                <br />
                <strong>Benefit:</strong> Get ₹10L-2Cr loan without collateral!
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Priority Sector Lending (PSL)</h3>
            <p className="text-gray-700 mb-4">
              RBI mandates that 40% of bank lending must go to priority sectors (including MSMEs). This ensures easy credit availability for small businesses.
            </p>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h5 className="font-semibold text-gray-900 mb-3">PSL Benefits for MSMEs:</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Lower interest rates (banks incentivized)</span></li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Faster approval process</span></li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Easier eligibility norms</span></li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Special government schemes access</span></li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Interest subvention (subsidy) on some loans</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MSME Loan Schemes */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Top MSME Loan Schemes 2025 | शीर्ष MSME योजनाएं
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-xl text-purple-700">1. Mudra Loan (PMMY)</h4>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">Most Popular</span>
            </div>
            <p className="text-gray-700 mb-4">
              Pradhan Mantri MUDRA Yojana - Loans up to ₹10 lakh without collateral for micro-enterprises.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Shishu (शिशु)</h5>
                <p className="text-2xl font-bold text-purple-600">Up to ₹50,000</p>
                <p className="text-xs text-gray-600">For starting business</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Kishore (किशोर)</h5>
                <p className="text-2xl font-bold text-purple-600">₹50K - ₹5L</p>
                <p className="text-xs text-gray-600">For established business</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Tarun (तरुण)</h5>
                <p className="text-2xl font-bold text-purple-600">₹5L - ₹10L</p>
                <p className="text-xs text-gray-600">For expansion</p>
              </div>
            </div>
            <a href="https://www.mudra.org.in/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-purple-600 font-semibold">
              Apply for Mudra Loan <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h4 className="font-bold text-xl text-blue-700 mb-3">2. Stand-Up India Scheme</h4>
            <p className="text-gray-700 mb-4">
              For SC/ST and women entrepreneurs. Loans between ₹10 lakh to ₹1 crore for greenfield enterprises.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm mb-2"><strong>Loan Amount:</strong></p>
                <p className="text-2xl font-bold text-blue-600">₹10L - ₹1Cr</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm mb-2"><strong>Interest Rate:</strong></p>
                <p className="text-2xl font-bold text-green-600">Base Rate + 3%</p>
              </div>
            </div>
            <a href="https://www.standupmitra.in/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-blue-600 font-semibold">
              Apply on Stand-Up India Portal <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <h4 className="font-bold text-xl text-orange-700 mb-3">3. CLCSS (Credit Linked Capital Subsidy Scheme)</h4>
            <p className="text-gray-700 mb-4">
              Get <strong>15% capital subsidy</strong> (up to ₹15 lakh) on technology upgradation for MSMEs.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Example:</strong> You buy ₹50 lakh machinery → Get ₹7.5 lakh subsidy → Effective cost only ₹42.5 lakh!
              </p>
              <p className="text-xs text-gray-600">Available for specified manufacturing sectors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interest Rates */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          MSME Loan Interest Rates 2025 | ब्याज दरें
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank</th>
                <th className="px-6 py-4 text-left">Up to ₹25L</th>
                <th className="px-6 py-4 text-left">₹25L - ₹2Cr</th>
                <th className="px-6 py-4 text-left">Above ₹2Cr</th>
                <th className="px-6 py-4 text-left">Processing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">SBI</td>
                <td className="px-6 py-4 text-green-600 font-bold">11.00% - 12.50%</td>
                <td className="px-6 py-4">12.00% - 13.50%</td>
                <td className="px-6 py-4">13.00% - 14.50%</td>
                <td className="px-6 py-4">1%</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">HDFC Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">13.00% - 15.00%</td>
                <td className="px-6 py-4">14.00% - 16.00%</td>
                <td className="px-6 py-4">15.00% - 17.00%</td>
                <td className="px-6 py-4">2%</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">ICICI Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">13.50% - 15.50%</td>
                <td className="px-6 py-4">14.50% - 16.50%</td>
                <td className="px-6 py-4">15.50% - 17.50%</td>
                <td className="px-6 py-4">2%</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">Axis Bank</td>
                <td className="px-6 py-4">14.00% - 16.00%</td>
                <td className="px-6 py-4">15.00% - 17.00%</td>
                <td className="px-6 py-4">16.00% - 18.00%</td>
                <td className="px-6 py-4">2%</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">Bank of Baroda</td>
                <td className="px-6 py-4 text-green-600 font-bold">11.50% - 13.00%</td>
                <td className="px-6 py-4">12.50% - 14.00%</td>
                <td className="px-6 py-4">13.50% - 15.00%</td>
                <td className="px-6 py-4">1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Official MSME Resources | आधिकारिक संसाधन
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://udyamregistration.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">Udyam Registration</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
          
          <a href="https://www.cgtmse.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">CGTMSE Portal</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
          
          <a href="https://msme.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">MSME Ministry</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/business-loans/mudra-loan" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Mudra Loan Scheme</div>
            <div className="text-sm text-green-100">₹10L without collateral</div>
          </Link>
          <Link to="/learn/business-loans/working-capital-loan" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Working Capital Loan</div>
            <div className="text-sm text-green-100">Daily operations funding</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default MSMELoanGuide;

