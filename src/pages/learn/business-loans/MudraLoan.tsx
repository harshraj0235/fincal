import React from 'react';
import { Link } from 'react-router-dom';
import { Award, IndianRupee, CheckCircle, AlertCircle, ExternalLink, TrendingUp } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const MudraLoan: React.FC = () => {
  return (
    <LearnLayout
      category="business-loans"
      currentLesson="mudra-loan"
      breadcrumb={['Learn', 'Business Loans', 'Mudra Loan Scheme (PMMY)']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Award className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Mudra Loan Scheme 2025 (PMMY) | मुद्रा लोन योजना
            </h1>
            <p className="text-pink-100 text-lg">
              Pradhan Mantri MUDRA Yojana - Up to ₹10 lakh without collateral | Government scheme for micro businesses
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹10 Lakh</div>
            <div className="text-sm text-pink-100">Max Loan</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">No Collateral</div>
            <div className="text-sm text-pink-100">Security Free</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">8-12%</div>
            <div className="text-sm text-pink-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">5 Years</div>
            <div className="text-sm text-pink-100">Max Tenure</div>
          </div>
        </div>
      </div>

      {/* What is Mudra */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Mudra Loan? | मुद्रा लोन क्या है?</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>MUDRA (Micro Units Development & Refinance Agency)</strong> loan is a Government of India scheme launched in 2015 to provide funding to micro and small businesses. 
            The biggest advantage: <strong>NO collateral required</strong> for loans up to ₹10 lakh!
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>मुद्रा लोन हिंदी में:</strong> मुद्रा लोन भारत सरकार की योजना है जो सूक्ष्म और लघु व्यवसायों को ₹10 लाख तक का लोन <strong>बिना किसी सुरक्षा (collateral)</strong> के देती है।
          </p>
          
          <div className="bg-pink-50 border-l-4 border-pink-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-pink-900 mb-3">✨ Who Can Apply? | कौन आवेदन कर सकता है?</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Small shop owners</strong> - Kirana stores, retail shops (किराना दुकान)</li>
              <li>• <strong>Manufacturing units</strong> - Small factories, production (छोटे कारखाने)</li>
              <li>• <strong>Service providers</strong> - Salons, repair shops, tailors (सेवा प्रदाता)</li>
              <li>• <strong>Food business</strong> - Restaurants, catering, food trucks (खाद्य व्यवसाय)</li>
              <li>• <strong>Transport</strong> - Auto, taxi, truck owners (परिवहन)</li>
              <li>• <strong>Artisans</strong> - Handicrafts, handloom workers (कारीगर)</li>
              <li>• <strong>Street vendors</strong> - Hawkers, small sellers (फेरीवाले)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Three Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Three Categories of Mudra Loan | मुद्रा के तीन प्रकार
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300">
            <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
              Shishu | शिशु
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Up to ₹50,000</h3>
            <p className="text-gray-700 mb-4">For businesses in startup/nascent stage</p>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h5 className="font-semibold text-gray-900 mb-3">Best For:</h5>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• New small shop opening</li>
                <li>• Buy equipment/tools</li>
                <li>• Initial inventory purchase</li>
                <li>• Rickshaw, cart purchase</li>
                <li>• Beauty parlor setup</li>
              </ul>
            </div>
            <div className="bg-green-100 p-3 rounded text-sm">
              <strong>Example:</strong> ₹30,000 for buying sewing machines to start tailoring business
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-300">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
              Kishore | किशोर
            </div>
            <h3 className="text-2xl font-bold text-blue-700 mb-4">₹50,000 - ₹5 Lakh</h3>
            <p className="text-gray-700 mb-4">For established businesses seeking growth</p>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h5 className="font-semibold text-gray-900 mb-3">Best For:</h5>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Expand existing shop</li>
                <li>• Buy machinery</li>
                <li>• Increase inventory</li>
                <li>• Commercial vehicle</li>
                <li>• Working capital</li>
              </ul>
            </div>
            <div className="bg-blue-100 p-3 rounded text-sm">
              <strong>Example:</strong> ₹3 lakh for buying auto-rickshaw for transport business
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-400 ring-4 ring-purple-100">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
              Tarun | तरुण
            </div>
            <h3 className="text-2xl font-bold text-purple-700 mb-4">₹5 Lakh - ₹10 Lakh</h3>
            <p className="text-gray-700 mb-4">For well-established businesses for expansion</p>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h5 className="font-semibold text-gray-900 mb-3">Best For:</h5>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Significant expansion</li>
                <li>• New branch opening</li>
                <li>• Heavy machinery</li>
                <li>• Large inventory</li>
                <li>• Technology upgrade</li>
              </ul>
            </div>
            <div className="bg-purple-100 p-3 rounded text-sm">
              <strong>Example:</strong> ₹8 lakh for opening new branch of successful restaurant
            </div>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Apply for Mudra Loan | मुद्रा लोन आवेदन
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://www.mudra.org.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-pink-400">
            <span className="font-semibold text-gray-900">Mudra Official Portal</span>
            <ExternalLink className="h-5 w-5 text-pink-600" />
          </a>
          
          <a href="https://www.udyamimitra.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-pink-400">
            <span className="font-semibold text-gray-900">Udyami Mitra Portal</span>
            <ExternalLink className="h-5 w-5 text-pink-600" />
          </a>
          
          <a href="https://sbi.co.in/web/business/sme/government-schemes/pmmy" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-pink-400">
            <span className="font-semibold text-gray-900">SBI Mudra Loan</span>
            <ExternalLink className="h-5 w-5 text-pink-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/business-loans/startup-loan" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Startup Business Loan</div>
            <div className="text-sm text-pink-100">Funding for new startups</div>
          </Link>
          <Link to="/learn/business-loans/working-capital-loan" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Working Capital Loan</div>
            <div className="text-sm text-pink-100">Operations funding</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default MudraLoan;

