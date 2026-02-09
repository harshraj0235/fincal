import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertCircle, CheckCircle, TrendingUp, ExternalLink } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const VehicleInsurance: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="vehicle-insurance"
      breadcrumb={['Learn', 'Vehicle Loans', 'Vehicle Insurance with Loan']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Shield className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Vehicle Insurance with Car Loan | वाहन बीमा गाइड
            </h1>
            <p className="text-green-100 text-lg">
              Complete guide: Comprehensive vs Third Party, insurance requirements, best policies 2025
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Mandatory</div>
            <div className="text-sm text-green-100">For Loan</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">IDV Based</div>
            <div className="text-sm text-green-100">Premium</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹15K-40K</div>
            <div className="text-sm text-green-100">Annual Cost</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">1 Year</div>
            <div className="text-sm text-green-100">Validity</div>
          </div>
        </div>
      </div>

      {/* Why Insurance is Mandatory */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Insurance is Mandatory for Car Loan? | बीमा क्यों जरूरी है?</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            When you take a car loan, the vehicle acts as <strong>collateral</strong> (security). Banks mandate <strong>comprehensive insurance</strong> to protect their investment. 
            If the car is damaged/stolen, insurance compensates the bank for remaining loan amount.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>हिंदी में:</strong> कार लोन लेने पर, वाहन बैंक की सुरक्षा (कोलैटरल) के रूप में काम करता है। बैंक व्यापक बीमा (Comprehensive Insurance) अनिवार्य करते हैं ताकि कार के नुकसान या चोरी की स्थिति में उन्हें मुआवजा मिल सके।
          </p>
          
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Important Rule | महत्वपूर्ण नियम
            </h4>
            <p className="text-gray-700">
              <strong>No insurance = No loan!</strong> All banks require valid comprehensive insurance throughout the loan tenure. 
              Bank will be listed as <strong>insurance nominee</strong> on your policy.
              <br />
              <span className="text-gray-600">बिना बीमा के लोन नहीं मिलता! पूरे लोन टेन्योर में वैध बीमा रखना अनिवार्य है।</span>
            </p>
          </div>
        </div>
      </section>

      {/* Types of Insurance */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Car Insurance | कार बीमा के प्रकार</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Comprehensive Insurance */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300 ring-4 ring-green-100">
            <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
              ✅ Required for Loan | लोन के लिए जरूरी
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
              <Shield className="h-8 w-8 mr-2" />
              Comprehensive Insurance
            </h3>
            <p className="text-gray-700 mb-4">
              Covers <strong>Own Damage (OD) + Third Party (TP)</strong> liabilities. Protects against accidents, theft, fire, natural calamities.
            </p>
            
            <div className="space-y-3 mb-6">
              <h5 className="font-bold text-green-900">What is Covered:</h5>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Accident damage</strong> - Repair costs for your car</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Theft</strong> - Full car value (IDV) if stolen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Fire damage</strong> - Engine/body damage by fire</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Natural calamities</strong> - Flood, earthquake, cyclone</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Man-made disasters</strong> - Riots, strikes, vandalism</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Third-party liability</strong> - Injury/property damage to others</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Personal accident cover</strong> - ₹15 lakh for driver</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <h5 className="font-bold text-gray-900 mb-2">Annual Premium (Example):</h5>
              <div className="text-3xl font-bold text-green-600 mb-1">₹25,000 - ₹40,000</div>
              <p className="text-sm text-gray-600">For ₹10L car (varies by city, model, IDV)</p>
            </div>
            
            <div className="bg-green-100 rounded-lg p-4">
              <p className="text-gray-700 text-sm">
                <strong>Best For:</strong> Cars with active loan, new cars (0-5 years), expensive cars. Mandatory for bank loans.
              </p>
            </div>
          </div>

          {/* Third Party Insurance */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
            <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
              ❌ Not Allowed for Loan | लोन के लिए नहीं
            </div>
            <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
              Third Party Insurance
            </h3>
            <p className="text-gray-700 mb-4">
              Covers <strong>only Third Party</strong> liabilities. Does NOT cover own car damage. Cannot be used for loan cars.
            </p>
            
            <div className="space-y-3 mb-6">
              <h5 className="font-bold text-blue-900">What is Covered:</h5>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Third-party death</strong> - Up to ₹7.5 lakh</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Third-party injury</strong> - Medical expenses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Property damage</strong> - Other vehicle/property</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Personal accident</strong> - ₹15 lakh for driver</span>
                </li>
              </ul>
              
              <h5 className="font-bold text-red-900 mt-4">What is NOT Covered:</h5>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Own car damage</strong> - You pay from pocket</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Theft</strong> - No coverage</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Fire/Natural disasters</strong> - Not covered</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <h5 className="font-bold text-gray-900 mb-2">Annual Premium (Example):</h5>
              <div className="text-3xl font-bold text-blue-600 mb-1">₹2,000 - ₹3,000</div>
              <p className="text-sm text-gray-600">Fixed by government, same for all cars</p>
            </div>
            
            <div className="bg-blue-100 rounded-lg p-4">
              <p className="text-gray-700 text-sm">
                <strong>Best For:</strong> Old cars (10+ years), loan-free cars, budget buyers. NOT for loan cars!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IDV Explained */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is IDV (Insured Declared Value)? | IDV क्या है?</h2>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>IDV (Insured Declared Value)</strong> is the maximum amount insurance company will pay if your car is stolen or totally damaged (beyond repair).
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>IDV हिंदी में:</strong> IDV वह अधिकतम राशि है जो बीमा कंपनी देगी अगर आपकी कार चोरी हो जाए या पूरी तरह नष्ट हो जाए।
          </p>
          
          <div className="bg-white rounded-xl p-6 mb-6">
            <h4 className="font-bold text-xl text-purple-900 mb-4">How IDV is Calculated:</h4>
            <div className="space-y-3 text-gray-700">
              <p><strong>IDV = Current Market Value of Car</strong></p>
              <p>IDV decreases every year due to depreciation (मूल्यह्रास):</p>
              <ul className="space-y-2 ml-6">
                <li>• <strong>1st year:</strong> 5% depreciation</li>
                <li>• <strong>2nd year:</strong> 10% depreciation</li>
                <li>• <strong>3rd year:</strong> 15% depreciation</li>
                <li>• <strong>4th year:</strong> 20% depreciation</li>
                <li>• <strong>5th year:</strong> 25% depreciation</li>
                <li>• <strong>After 5 years:</strong> Mutually agreed value</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-purple-100 rounded-xl p-6">
            <h4 className="font-bold text-xl text-purple-900 mb-4">Example Calculation:</h4>
            <div className="space-y-2 text-gray-700">
              <p><strong>Car On-Road Price (2024):</strong> ₹10,00,000</p>
              <p><strong>Year 1 IDV:</strong> ₹10,00,000 - 5% = ₹9,50,000</p>
              <p><strong>Year 2 IDV:</strong> ₹10,00,000 - 15% = ₹8,50,000</p>
              <p><strong>Year 3 IDV:</strong> ₹10,00,000 - 30% = ₹7,00,000</p>
              <p className="pt-3 border-t"><strong>Premium = ~2-3% of IDV + TP premium</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Calculation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Insurance Premium Breakdown | प्रीमियम ब्रेकडाउन</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Car Value (IDV)</th>
                <th className="px-6 py-4 text-left">Own Damage (OD)</th>
                <th className="px-6 py-4 text-left">Third Party (TP)</th>
                <th className="px-6 py-4 text-left">Total Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">₹5,00,000</td>
                <td className="px-6 py-4">₹10,000 - ₹12,000</td>
                <td className="px-6 py-4">₹2,072</td>
                <td className="px-6 py-4 text-green-600 font-bold">₹12,000 - ₹14,000</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">₹10,00,000</td>
                <td className="px-6 py-4">₹20,000 - ₹25,000</td>
                <td className="px-6 py-4">₹2,072</td>
                <td className="px-6 py-4 text-green-600 font-bold">₹22,000 - ₹27,000</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">₹15,00,000</td>
                <td className="px-6 py-4">₹30,000 - ₹35,000</td>
                <td className="px-6 py-4">₹2,072</td>
                <td className="px-6 py-4 text-green-600 font-bold">₹32,000 - ₹37,000</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-semibold">₹20,00,000</td>
                <td className="px-6 py-4">₹40,000 - ₹50,000</td>
                <td className="px-6 py-4">₹2,072</td>
                <td className="px-6 py-4 text-green-600 font-bold">₹42,000 - ₹52,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <p className="text-gray-700">
            <strong>💡 Note:</strong> Premiums vary based on city (Zone), car model, anti-theft devices, No Claim Bonus (NCB), and add-on covers.
            Mumbai/Delhi have higher premiums than tier-2/3 cities.
          </p>
        </div>
      </section>

      {/* Add-on Covers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Recommended Add-on Covers | अतिरिक्त कवर</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Zero Depreciation Cover
            </h4>
            <p className="text-gray-700 mb-3">
              No depreciation deduction on spare parts during claim settlement. Get 100% claim amount for parts replacement.
            </p>
            <div className="bg-green-50 rounded-lg p-3 text-sm text-gray-700">
              <strong>Cost:</strong> +10-15% of base premium<br />
              <strong>Best For:</strong> New cars (0-5 years)
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Engine Protection Cover
            </h4>
            <p className="text-gray-700 mb-3">
              Covers engine damage due to water logging, oil leakage, or hydrostatic lock. Essential for monsoon months.
            </p>
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700">
              <strong>Cost:</strong> +₹1,000 - ₹3,000<br />
              <strong>Best For:</strong> Mumbai, Bangalore, Chennai
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Return to Invoice (RTI)
            </h4>
            <p className="text-gray-700 mb-3">
              Get full invoice value (not depreciated IDV) in case of total loss or theft. Bridges gap between IDV and invoice price.
            </p>
            <div className="bg-purple-50 rounded-lg p-3 text-sm text-gray-700">
              <strong>Cost:</strong> +5-10% of base premium<br />
              <strong>Best For:</strong> Brand new cars
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Roadside Assistance (RSA)
            </h4>
            <p className="text-gray-700 mb-3">
              24x7 emergency assistance: towing, flat tire, fuel delivery, battery jumpstart, lockout service.
            </p>
            <div className="bg-orange-50 rounded-lg p-3 text-sm text-gray-700">
              <strong>Cost:</strong> +₹300 - ₹800<br />
              <strong>Best For:</strong> All cars, long-distance travelers
            </div>
          </div>
        </div>
      </section>

      {/* No Claim Bonus */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">No Claim Bonus (NCB) | नो क्लेम बोनस</h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>NCB (No Claim Bonus)</strong> is a discount on renewal premium for not making any insurance claims in previous year. 
            Rewards safe driving!
          </p>
          
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">20%</div>
              <div className="text-sm text-gray-600">1st Year</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">25%</div>
              <div className="text-sm text-gray-600">2nd Year</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">35%</div>
              <div className="text-sm text-gray-600">3rd Year</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">45%</div>
              <div className="text-sm text-gray-600">4th Year</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">50%</div>
              <div className="text-sm text-gray-600">5th Year+</div>
            </div>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h5 className="font-semibold text-green-900 mb-2">Example Savings:</h5>
            <p className="text-gray-700">
              <strong>Base Premium:</strong> ₹25,000<br />
              <strong>With 50% NCB:</strong> ₹12,500<br />
              <strong>Annual Saving:</strong> ₹12,500 🎉
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Companies */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Car Insurance Companies 2025 | बेस्ट इंश्योरेंस कंपनियां</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://www.icicilombard.com/motor-insurance/car-insurance" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">ICICI Lombard</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
          <a href="https://www.hdfcergo.com/motor-insurance/car-insurance" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">HDFC ERGO</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
          <a href="https://www.bajajallianz.com/motor-insurance/car-insurance-online.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-green-400">
            <span className="font-semibold text-gray-900">Bajaj Allianz</span>
            <ExternalLink className="h-5 w-5 text-green-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/emi-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Car Loan EMI Calculator</div>
            <div className="text-sm text-green-100">Calculate monthly payments</div>
          </Link>
          <Link to="/learn/vehicle-loans/prepayment-guide" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Prepayment Guide</div>
            <div className="text-sm text-green-100">Save on interest</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default VehicleInsurance;

