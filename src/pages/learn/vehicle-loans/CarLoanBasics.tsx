import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Calculator, TrendingUp, Shield, AlertCircle, ExternalLink, CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const CarLoanBasics: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="car-loan-basics"
      breadcrumb={['Learn', 'Vehicle Loans', 'Car Loan Basics India 2025']}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Car className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Car Loan Basics India 2025 | कार लोन की पूरी जानकारी
            </h1>
            <p className="text-blue-100 text-lg">
              Complete guide to car loans: eligibility, interest rates, EMI calculation, documents, and approval process
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">7-14%</div>
            <div className="text-sm text-blue-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to 90%</div>
            <div className="text-sm text-blue-100">Loan Amount</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">1-7 Years</div>
            <div className="text-sm text-blue-100">Loan Tenure</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">24 Hours</div>
            <div className="text-sm text-blue-100">Quick Approval</div>
          </div>
        </div>
      </div>

      {/* What is Car Loan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Car className="h-8 w-8 mr-3 text-blue-600" />
          What is a Car Loan? | कार लोन क्या है?
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            A <strong>car loan (कार लोन)</strong> is a secured loan that helps you purchase a new or used car by paying for the vehicle cost in monthly installments (EMI). The car itself acts as collateral, meaning the lender can repossess it if you default on payments.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>कार लोन हिंदी में:</strong> कार लोन एक सुरक्षित ऋण है जो आपको नई या पुरानी कार खरीदने में मदद करता है। आप कार की कीमत को मासिक किस्तों (EMI) में चुका सकते हैं।
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Key Concept | मुख्य बात
            </h4>
            <p className="text-gray-700">
              <strong>Banks typically finance 80-90% of car's on-road price.</strong> You need to pay 10-20% as down payment upfront.
              <br />
              <span className="text-gray-600">बैंक आमतौर पर कार की ऑन-रोड कीमत का 80-90% फाइनेंस करते हैं। आपको 10-20% डाउन पेमेंट देना होता है।</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3">✅ Advantages | लाभ</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Instant ownership:</strong> Drive home your dream car today</li>
              <li>• <strong>Tax benefits:</strong> Deductions for self-employed/business use</li>
              <li>• <strong>Preserve savings:</strong> Keep emergency funds intact</li>
              <li>• <strong>Build credit:</strong> Improve CIBIL score with timely payments</li>
              <li>• <strong>तुरंत मालिक बनें:</strong> आज ही अपनी कार घर लाएं</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3">⚠️ Disadvantages | नुकसान</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Interest cost:</strong> Pay 20-40% more than car price</li>
              <li>• <strong>Depreciation:</strong> Car value drops 15% per year</li>
              <li>• <strong>EMI burden:</strong> Monthly payment obligation</li>
              <li>• <strong>Repossession risk:</strong> Car can be seized if you default</li>
              <li>• <strong>ब्याज लागत:</strong> कार की कीमत से 20-40% अधिक चुकाएं</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How Car Loan Works */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How Car Loan Works in India | कार लोन कैसे काम करता है
        </h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 mb-6">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Choose Your Car | कार चुनें</h4>
                <p className="text-gray-700">Select new or used car, negotiate price with dealer. कार का चयन करें और डीलर से कीमत तय करें।</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Check Eligibility | पात्रता जांचें</h4>
                <p className="text-gray-700">Use <Link to="/calculators/car-loan-calculator" className="text-blue-600 underline">car loan calculator</Link> to check eligibility based on income, age, CIBIL score.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Submit Documents | दस्तावेज जमा करें</h4>
                <p className="text-gray-700">Provide identity proof, income proof, address proof, PAN card, bank statements. दस्तावेज जमा करें।</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Get Approval | मंजूरी पाएं</h4>
                <p className="text-gray-700">Bank verifies documents and approves loan within 24-48 hours. 1-2 दिन में मंजूरी मिलती है।</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">5</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Pay EMI | EMI भुगतान करें</h4>
                <p className="text-gray-700">Start paying monthly EMI. Complete payments and own the car fully. मासिक EMI चुकाएं।</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interest Rates 2025 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-green-600" />
          Car Loan Interest Rates 2025 | ब्याज दरें
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank / Lender</th>
                <th className="px-6 py-4 text-left">Interest Rate (p.a.)</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
                <th className="px-6 py-4 text-left">Loan Tenure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">SBI Car Loan</td>
                <td className="px-6 py-4 text-green-600 font-bold">7.50% - 9.20%</td>
                <td className="px-6 py-4">₹2,000 + GST</td>
                <td className="px-6 py-4">Up to 7 years</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">HDFC Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.50% - 10.50%</td>
                <td className="px-6 py-4">₹4,999</td>
                <td className="px-6 py-4">Up to 7 years</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">ICICI Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.75% - 11.25%</td>
                <td className="px-6 py-4">₹3,500</td>
                <td className="px-6 py-4">Up to 7 years</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">Axis Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">9.00% - 12.00%</td>
                <td className="px-6 py-4">Up to ₹5,000</td>
                <td className="px-6 py-4">Up to 7 years</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">Kotak Mahindra</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.70% - 11.00%</td>
                <td className="px-6 py-4">₹999 onwards</td>
                <td className="px-6 py-4">Up to 5 years</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <p className="text-gray-700">
            <strong>💡 Pro Tip:</strong> Interest rates vary based on your CIBIL score (750+), income, employer profile, and loan tenure. 
            Compare rates from multiple banks before deciding.
            <br />
            <span className="text-gray-600">अपने CIBIL स्कोर के आधार पर ब्याज दरें अलग होती हैं। कई बैंकों की तुलना करें।</span>
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Car Loan Eligibility Criteria | पात्रता मानदंड
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Salaried Individuals | नौकरीपेशा</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Age:</strong> 21 to 65 years</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Income:</strong> Minimum ₹25,000/month (varies by city)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Work Experience:</strong> At least 1-2 years</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>CIBIL Score:</strong> 750+ for best rates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Employer:</strong> Reputed company/MNC preferred</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Self-Employed | स्व-रोजगार</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Age:</strong> 21 to 65 years</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Income:</strong> Minimum ₹3-4 lakh/year</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Business Vintage:</strong> Minimum 2-3 years</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>CIBIL Score:</strong> 750+ recommended</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span><strong>ITR:</strong> Last 2-3 years returns required</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            to="/learn/vehicle-loans/eligibility-calculator"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Check Your Eligibility | पात्रता जांचें
          </Link>
        </div>
      </section>

      {/* EMI Example */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="h-8 w-8 mr-3 text-blue-600" />
          Car Loan EMI Example | EMI उदाहरण
        </h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
              <div className="text-2xl font-bold text-blue-600">₹5,00,000</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">Interest Rate</div>
              <div className="text-2xl font-bold text-green-600">9.5% p.a.</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">Tenure</div>
              <div className="text-2xl font-bold text-purple-600">5 Years</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-gray-600 mb-2">Monthly EMI</div>
                <div className="text-3xl font-bold text-blue-600">₹10,458</div>
              </div>
              <div>
                <div className="text-gray-600 mb-2">Total Interest</div>
                <div className="text-3xl font-bold text-red-600">₹1,27,480</div>
              </div>
              <div>
                <div className="text-gray-600 mb-2">Total Payment</div>
                <div className="text-3xl font-bold text-green-600">₹6,27,480</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a 
              href="/calculators/car-loan-calculator"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Your EMI | अपना EMI कैलकुलेट करें
            </a>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Official Resources | आधिकारिक संसाधन
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <a 
            href="https://sbi.co.in/web/personal-banking/loans/auto-loans/car-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400"
          >
            <span className="font-semibold text-gray-900">SBI Car Loan Official</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
          
          <a 
            href="https://www.hdfcbank.com/personal/borrow/popular-loans/car-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400"
          >
            <span className="font-semibold text-gray-900">HDFC Car Loan</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
          
          <a 
            href="https://www.icicibank.com/personal-banking/loans/car-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400"
          >
            <span className="font-semibold text-gray-900">ICICI Car Loan</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
          
          <a 
            href="https://www.axisbank.com/retail/loans/car-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400"
          >
            <span className="font-semibold text-gray-900">Axis Bank Car Loan</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Get Your Car? | कार खरीदने के लिए तैयार?</h3>
        <p className="mb-6">Continue learning about vehicle loans with our next lessons:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/learn/vehicle-loans/two-wheeler-loan"
            className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30"
          >
            <div className="font-bold mb-1">Next: Two Wheeler Loan Guide</div>
            <div className="text-sm text-blue-100">Learn about bike and scooter loans</div>
          </Link>
          
          <Link
            to="/learn/vehicle-loans/interest-rates"
            className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30"
          >
            <div className="font-bold mb-1">Car Loan Interest Rates 2025</div>
            <div className="text-sm text-blue-100">Compare rates from all banks</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default CarLoanBasics;

