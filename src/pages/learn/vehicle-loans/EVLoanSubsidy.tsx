import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingDown, CheckCircle, ExternalLink } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const EVLoanSubsidy: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="ev-loan-subsidy"
      breadcrumb={['Learn', 'Vehicle Loans', 'EV Loan & Government Subsidy 2025']}
    >
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Zap className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              EV Loan & Government Subsidy 2025 | इलेक्ट्रिक वाहन लोन
            </h1>
            <p className="text-green-100 text-lg">
              Save up to ₹3.5 lakh with FAME-III subsidy + lower interest rates on electric vehicles
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">6-9%</div>
            <div className="text-sm text-green-100">EV Loan Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹1.5L</div>
            <div className="text-sm text-green-100">FAME Subsidy</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹1.5L</div>
            <div className="text-sm text-green-100">State Subsidy</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Zero</div>
            <div className="text-sm text-green-100">Road Tax</div>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">FAME-III Subsidy 2025 | FAME सब्सिडी</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>FAME (Faster Adoption and Manufacturing of Electric Vehicles)</strong> is Government of India scheme providing purchase incentives on electric vehicles. 
            FAME-III extends till 2027 with enhanced subsidies.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>हिंदी में:</strong> FAME भारत सरकार की योजना है जो इलेक्ट्रिक वाहन खरीदने पर सब्सिडी देती है। 2027 तक FAME-III चलेगी।
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl overflow-hidden border">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Vehicle Type</th>
                  <th className="px-6 py-4 text-left">Central Subsidy (FAME-III)</th>
                  <th className="px-6 py-4 text-left">State Subsidy (Avg)</th>
                  <th className="px-6 py-4 text-left">Total Subsidy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4 font-semibold">Electric 2-Wheeler</td>
                  <td className="px-6 py-4 text-green-600 font-bold">₹15,000/kWh</td>
                  <td className="px-6 py-4">₹10,000-30,000</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Up to ₹60,000</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4 font-semibold">Electric 3-Wheeler</td>
                  <td className="px-6 py-4 text-green-600 font-bold">₹10,000/kWh</td>
                  <td className="px-6 py-4">₹20,000-50,000</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Up to ₹80,000</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4 font-semibold">Electric 4-Wheeler</td>
                  <td className="px-6 py-4 text-green-600 font-bold">₹10,000/kWh (max ₹1.5L)</td>
                  <td className="px-6 py-4">₹1-2 lakh</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Up to ₹3.5 lakh</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4 font-semibold">Electric Bus</td>
                  <td className="px-6 py-4 text-green-600 font-bold">₹50,000/kWh</td>
                  <td className="px-6 py-4">Varies</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Up to ₹40 lakh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">State-wise Additional Subsidies | राज्य सब्सिडी</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Delhi EV Policy 2024</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>₹30,000</strong> for e-2W</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>₹1.5 lakh</strong> for e-4W</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>100% road tax waiver</strong></span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>100% registration fee waiver</strong></span></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Maharashtra EV Policy</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>₹25,000</strong> for e-2W</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>₹1 lakh</strong> for e-4W</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>100% road tax exemption</strong></span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Scrapping incentive: ₹10,000</strong></span></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Gujarat EV Policy</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>₹20,000</strong> for e-2W</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>₹1.5 lakh</strong> for e-4W</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>100% SGST reimbursement</strong></span></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Karnataka EV Policy</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>₹15,000</strong> for e-2W</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>₹1 lakh</strong> for e-4W</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>100% road tax & reg. fee waiver</strong></span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">EV Loan Interest Rates | EV लोन ब्याज दरें</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank</th>
                <th className="px-6 py-4 text-left">EV Loan Rate</th>
                <th className="px-6 py-4 text-left">Regular Car Rate</th>
                <th className="px-6 py-4 text-left">Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 font-semibold">SBI</td><td className="px-6 py-4 text-green-600 font-bold">6.50% - 7.50%</td><td className="px-6 py-4">7.50% - 9.20%</td><td className="px-6 py-4 text-green-600">1-1.7% lower</td></tr>
              <tr><td className="px-6 py-4 font-semibold">HDFC Bank</td><td className="px-6 py-4 text-green-600 font-bold">7.50% - 8.50%</td><td className="px-6 py-4">8.50% - 10.50%</td><td className="px-6 py-4 text-green-600">1-2% lower</td></tr>
              <tr><td className="px-6 py-4 font-semibold">ICICI Bank</td><td className="px-6 py-4 text-green-600 font-bold">7.75% - 9.00%</td><td className="px-6 py-4">8.75% - 11.25%</td><td className="px-6 py-4 text-green-600">1-2.25% lower</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Axis Bank</td><td className="px-6 py-4 text-green-600 font-bold">8.00% - 9.50%</td><td className="px-6 py-4">9.00% - 12.00%</td><td className="px-6 py-4 text-green-600">1-2.5% lower</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Total Savings Example | कुल बचत उदाहरण</h2>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300">
          <h3 className="text-2xl font-bold text-green-700 mb-6">Buying Tata Nexon EV in Delhi (2025)</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg text-gray-900 mb-3">💰 Price Breakdown:</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between"><span>Ex-showroom Price:</span><span className="font-bold">₹15,00,000</span></div>
                <div className="flex justify-between text-red-600"><span>- FAME-III Subsidy:</span><span className="font-bold">-₹1,50,000</span></div>
                <div className="flex justify-between text-red-600"><span>- Delhi State Subsidy:</span><span className="font-bold">-₹1,50,000</span></div>
                <div className="flex justify-between text-red-600"><span>- Road Tax Waiver:</span><span className="font-bold">-₹75,000</span></div>
                <div className="flex justify-between text-red-600"><span>- Registration Waiver:</span><span className="font-bold">-₹20,000</span></div>
                <div className="flex justify-between pt-3 border-t text-xl"><span>Effective Price:</span><span className="font-bold text-green-600">₹11,05,000</span></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg text-gray-900 mb-3">📊 Loan Details:</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between"><span>Effective Price:</span><span className="font-bold">₹11,05,000</span></div>
                <div className="flex justify-between"><span>Down Payment (20%):</span><span>₹2,21,000</span></div>
                <div className="flex justify-between"><span>Loan Amount:</span><span className="font-bold">₹8,84,000</span></div>
                <div className="flex justify-between"><span>Interest Rate:</span><span className="font-bold text-green-600">7.5%</span></div>
                <div className="flex justify-between"><span>Tenure:</span><span>5 years</span></div>
                <div className="flex justify-between pt-3 border-t text-xl"><span>Monthly EMI:</span><span className="font-bold text-blue-600">₹17,700</span></div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-600 text-white rounded-xl p-6 text-center">
            <div className="text-lg mb-2">Total Savings with EV:</div>
            <div className="text-5xl font-bold mb-2">₹3,95,000</div>
            <div className="text-sm">Subsidies (₹3.95L) + Lower interest (₹30K over 5 years) + No road tax</div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Apply for EV Subsidy | सब्सिडी कैसे प्राप्त करें</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">Step 1: Check Eligibility</h4>
            <p className="text-gray-700">Vehicle must be eligible under FAME-III scheme. Check list on fame2.heavyindustries.gov.in</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">Step 2: Buy from Authorized Dealer</h4>
            <p className="text-gray-700">Subsidy is auto-deducted at purchase. Dealer claims subsidy from government later.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">Step 3: State Subsidy Application</h4>
            <p className="text-gray-700">Apply online on state transport website within 30 days of purchase with RC copy.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources | आधिकारिक लिंक</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="https://fame2.heavyindustries.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400"><span className="font-semibold text-gray-900">FAME-III Official Portal</span><ExternalLink className="h-5 w-5 text-green-600" /></a>
          <a href="https://ev.delhi.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400"><span className="font-semibold text-gray-900">Delhi EV Policy Portal</span><ExternalLink className="h-5 w-5 text-green-600" /></a>
        </div>
      </section>

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Vehicle Loans Complete! | कोर्स पूर्ण हुआ 🎉</h3>
        <p className="mb-6">Congratulations! You have completed all 15 lessons on vehicle loans. You are now an expert!</p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Back to Vehicle Loans Hub</div><div className="text-sm text-green-100">Review all 15 lessons</div></Link>
          <Link to="/learn" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Explore More Courses</div><div className="text-sm text-green-100">Education, Business, Gold Loans...</div></Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default EVLoanSubsidy;

