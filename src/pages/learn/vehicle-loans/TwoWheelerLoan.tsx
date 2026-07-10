import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, IndianRupee, TrendingUp, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const TwoWheelerLoan: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="two-wheeler-loan"
      breadcrumb={['Learn', 'Vehicle Loans', 'Two Wheeler Loan Guide']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Bike className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Two Wheeler Loan India 2025 | बाइक लोन गाइड
            </h1>
            <p className="text-orange-100 text-lg">
              Complete guide to bike and scooter loans: interest rates, eligibility, EMI, documents, instant approval
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">9-18%</div>
            <div className="text-sm text-orange-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to 90%</div>
            <div className="text-sm text-orange-100">Loan Amount</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">1-5 Years</div>
            <div className="text-sm text-orange-100">Tenure</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">1 Hour</div>
            <div className="text-sm text-orange-100">Quick Approval</div>
          </div>
        </div>
      </div>

      {/* What is Two Wheeler Loan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Bike className="h-8 w-8 mr-3 text-orange-600" />
          What is Two Wheeler Loan? | बाइक लोन क्या है?
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            A <strong>two-wheeler loan (टू व्हीलर लोन)</strong> is a secured personal loan for purchasing bikes, scooters, or mopeds. Banks and NBFCs (Non-Banking Financial Companies) offer quick approval with minimal documentation - often within 1 hour!
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>बाइक लोन हिंदी में:</strong> बाइक लोन एक सुरक्षित ऋण है जो आपको बाइक, स्कूटर या मोपेड खरीदने में मदद करता है। 1 घंटे में मंजूरी मिल सकती है!
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-orange-900 mb-3 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Quick Fact | मुख्य बात
            </h4>
            <p className="text-gray-700">
              <strong>Two-wheeler loans are easier to get than car loans!</strong> Lower EMI, faster approval, less documentation. Ideal for first-time borrowers.
              <br />
              <span className="text-gray-600">बाइक लोन कार लोन से आसान है! कम EMI, तेज मंजूरी, कम दस्तावेज।</span>
            </p>
          </div>
        </div>
      </section>

      {/* Interest Rates */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-green-600" />
          Bike Loan Interest Rates 2025 | ब्याज दरें
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Lender</th>
                <th className="px-6 py-4 text-left">Interest Rate</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
                <th className="px-6 py-4 text-left">Tenure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-orange-50">
                <td className="px-6 py-4 font-semibold">HDFC Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">10.50% - 15.00%</td>
                <td className="px-6 py-4">₹999 onwards</td>
                <td className="px-6 py-4">Up to 5 years</td>
              </tr>
              <tr className="hover:bg-orange-50">
                <td className="px-6 py-4 font-semibold">Bajaj Finserv</td>
                <td className="px-6 py-4 text-green-600 font-bold">12.00% - 18.00%</td>
                <td className="px-6 py-4">Up to 5.5%</td>
                <td className="px-6 py-4">Up to 5 years</td>
              </tr>
              <tr className="hover:bg-orange-50">
                <td className="px-6 py-4 font-semibold">Hero FinCorp</td>
                <td className="px-6 py-4 text-green-600 font-bold">11.00% - 16.00%</td>
                <td className="px-6 py-4">₹999</td>
                <td className="px-6 py-4">Up to 4 years</td>
              </tr>
              <tr className="hover:bg-orange-50">
                <td className="px-6 py-4 font-semibold">Tata Capital</td>
                <td className="px-6 py-4 text-green-600 font-bold">12.50% - 17.50%</td>
                <td className="px-6 py-4">2% of loan</td>
                <td className="px-6 py-4">Up to 4 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Eligibility */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Two Wheeler Loan Eligibility | पात्रता मानदंड
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Age:</strong> 18 to 65 years (कम से कम 18 साल)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Income:</strong> Minimum ₹10,000/month (₹10,000 मासिक आय)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span><strong>CIBIL Score:</strong> 650+ preferred (No score for first-timers OK)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Employment:</strong> Salaried/Self-employed/Student (any)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Documents:</strong> PAN, Aadhaar, Salary slip/Bank statement</span>
            </li>
          </ul>
          
          <div className="mt-6 text-center">
            <a 
              href="/calculators/bike-loan-calculator"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
            >
              <IndianRupee className="h-5 w-5 mr-2" />
              Calculate Bike EMI | बाइक EMI कैलकुलेट करें
            </a>
          </div>
        </div>
      </section>

      {/* EMI Example */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <IndianRupee className="h-8 w-8 mr-3 text-orange-600" />
          Bike Loan EMI Example | EMI उदाहरण
        </h2>
        
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
              <div className="text-2xl font-bold text-orange-600">₹80,000</div>
              <div className="text-xs text-gray-500">(Bike price ₹1L, 20% down)</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">Interest Rate</div>
              <div className="text-2xl font-bold text-green-600">12% p.a.</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">Tenure</div>
              <div className="text-2xl font-bold text-purple-600">3 Years</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-gray-600 mb-2">Monthly EMI</div>
                <div className="text-3xl font-bold text-orange-600">₹2,660</div>
              </div>
              <div>
                <div className="text-gray-600 mb-2">Total Interest</div>
                <div className="text-3xl font-bold text-red-600">₹15,760</div>
              </div>
              <div>
                <div className="text-gray-600 mb-2">Total Payment</div>
                <div className="text-3xl font-bold text-green-600">₹95,760</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How to Apply | आवेदन कैसे करें
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">1. Choose Your Bike | बाइक चुनें</h4>
            <p className="text-gray-700">Visit showroom, select model, negotiate on-road price with dealer.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">2. Check Eligibility | पात्रता जांचें</h4>
            <p className="text-gray-700">Use <a href="/calculators/bike-loan-calculator" className="text-orange-600 underline font-semibold">bike loan calculator</a> to check eligibility and EMI.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">3. Submit Documents Online | ऑनलाइन आवेदन</h4>
            <p className="text-gray-700">Upload PAN, Aadhaar, salary slip, and bank statement. Get instant approval!</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">4. Get Loan Disbursed | लोन प्राप्त करें</h4>
            <p className="text-gray-700">Loan amount directly paid to dealer. Ride home your bike same day!</p>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Apply for Two Wheeler Loan | बाइक लोन के लिए आवेदन करें
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <a 
            href="https://www.hdfcbank.com/personal/borrow/popular-loans/two-wheeler-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400"
          >
            <span className="font-semibold text-gray-900">HDFC Two Wheeler Loan</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
          
          <a 
            href="https://www.bajajfinserv.in/two-wheeler-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400"
          >
            <span className="font-semibold text-gray-900">Bajaj Finserv Bike Loan</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
          
          <a 
            href="https://www.herofinlease.com/two-wheeler-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400"
          >
            <span className="font-semibold text-gray-900">Hero FinCorp</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
          
          <a 
            href="https://www.tatacapital.com/two-wheeler-loan.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400"
          >
            <span className="font-semibold text-gray-900">Tata Capital</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <p className="mb-6">Explore more vehicle loan topics:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/learn/vehicle-loans/new-vs-used-car-loan"
            className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30"
          >
            <div className="font-bold mb-1">Next: New vs Used Car Loan</div>
            <div className="text-sm text-orange-100">Compare financing options</div>
          </Link>
          
          <Link
            to="/learn/vehicle-loans/eligibility-calculator"
            className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30"
          >
            <div className="font-bold mb-1">Eligibility Calculator</div>
            <div className="text-sm text-orange-100">Check your loan eligibility</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default TwoWheelerLoan;

