import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Calculator, TrendingUp, CheckCircle, AlertCircle, Home, CreditCard } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const CollateralVsNonCollateral: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="collateral-vs-non-collateral"
      breadcrumb={['Learn', 'Education Loans', 'Collateral vs Non-Collateral Loan']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Shield className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Collateral vs Non-Collateral Education Loan | कोलैटरल बनाम नॉन-कोलैटरल
            </h1>
            <p className="text-yellow-100 text-lg">Complete guide: When collateral needed, acceptable securities, non-collateral options</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to ₹7.5L</div>
            <div className="text-sm text-yellow-100">No Collateral</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Above ₹7.5L</div>
            <div className="text-sm text-yellow-100">Collateral Needed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">1-2%</div>
            <div className="text-sm text-yellow-100">Rate Reduction</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">3-4x</div>
            <div className="text-sm text-yellow-100">FD Value Needed</div>
          </div>
        </div>
      </div>

      {/* Main Comparison */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Comparison | विस्तृत तुलना</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Factor</th>
                <th className="px-6 py-4 text-left">Non-Collateral Loan</th>
                <th className="px-6 py-4 text-left">Collateral-Based Loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Max Loan Amount</td>
                <td className="px-6 py-4 text-orange-600">Up to ₹7.5 lakh</td>
                <td className="px-6 py-4 text-green-600 font-bold">Up to ₹1.5 crore</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Interest Rate</td>
                <td className="px-6 py-4 text-orange-600">10% - 13% (Higher)</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.5% - 11% (Lower)</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Security Required</td>
                <td className="px-6 py-4 text-green-600 font-bold">None</td>
                <td className="px-6 py-4 text-orange-600">Property/FD/Bonds</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Co-Applicant</td>
                <td className="px-6 py-4">Parent/Guardian (Mandatory)</td>
                <td className="px-6 py-4">Parent/Guardian (Mandatory)</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Processing Time</td>
                <td className="px-6 py-4 text-green-600 font-bold">3-7 days</td>
                <td className="px-6 py-4 text-orange-600">10-15 days (valuation needed)</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Documentation</td>
                <td className="px-6 py-4 text-green-600">Minimal</td>
                <td className="px-6 py-4 text-orange-600">Extensive (property papers, valuation)</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Approval Rate</td>
                <td className="px-6 py-4 text-orange-600">Moderate (70-80%)</td>
                <td className="px-6 py-4 text-green-600 font-bold">High (90-95%)</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Risk to Family</td>
                <td className="px-6 py-4 text-green-600 font-bold">Low (only co-applicant guarantee)</td>
                <td className="px-6 py-4 text-red-600">High (property can be seized)</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-4 font-semibold">Best For</td>
                <td className="px-6 py-4">Germany, Canada, partial UK funding</td>
                <td className="px-6 py-4">USA, UK, Australia (full funding)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Acceptable Collateral */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Acceptable Collateral Types | स्वीकार्य कोलैटरल</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-300">
            <div className="flex items-center mb-4">
              <Home className="h-10 w-10 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-blue-700">1. Residential Property</h3>
            </div>
            <p className="text-gray-700 mb-4">
              House, flat, or land in parent's/co-applicant's name can be pledged as collateral.
            </p>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h5 className="font-semibold text-gray-900 mb-3">Requirements:</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Clear title:</strong> Property should be free from any disputes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Market value:</strong> Should be 1.5-2x of loan amount</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>No existing loan:</strong> Preferably no home loan on it</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Documents:</strong> Sale deed, 7/12 extract, property tax receipts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Valuation:</strong> Bank-approved valuer will assess market value</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Loan-to-Value (LTV):</strong> Banks typically offer 50-60% of property market value as education loan. 
                Example: ₹1 crore property = ₹50-60 lakh loan.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300">
            <div className="flex items-center mb-4">
              <CreditCard className="h-10 w-10 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-green-700">2. Fixed Deposits (FD)</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Fixed Deposits can be pledged instead of property. Easier and faster process.
            </p>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h5 className="font-semibold text-gray-900 mb-3">Requirements:</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>FD value:</strong> Typically 110-125% of loan amount (margin money)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Same bank:</strong> FD should be in the lending bank (preferred)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Interest earned:</strong> You continue to earn FD interest during loan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Lien marked:</strong> FD is marked with lien (can't withdraw till loan closes)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Fast approval:</strong> Within 2-3 days (no valuation needed)</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> For ₹40 lakh loan, you need FD of ₹44-50 lakh. Your FD earns 6-7% interest, 
                while loan charges 9-10%. Net effective cost reduces!
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">3. Government Bonds & Securities</h4>
            <p className="text-gray-700 mb-3">NSC, KVP, LIC policies with surrender value can be used.</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>NSC, KVP certificates</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>LIC policies (surrender value 90-100% of loan)</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Gold bonds, sovereign bonds</span></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">4. Other Assets</h4>
            <p className="text-gray-700 mb-3">In some cases, banks accept alternative collateral:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span>Commercial property</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span>Agricultural land (in some cases)</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span>Shares, mutual funds (rarely)</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Real Cost Comparison | वास्तविक लागत तुलना</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-300">
            <h3 className="text-xl font-bold text-orange-700 mb-4">Non-Collateral Loan</h3>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold mb-2">Loan Details:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Loan Amount:</span><span className="font-bold">₹7,50,000</span></div>
                  <div className="flex justify-between"><span>Interest Rate:</span><span className="font-bold text-red-600">11% p.a.</span></div>
                  <div className="flex justify-between"><span>Tenure:</span><span>10 years</span></div>
                  <div className="flex justify-between"><span>Moratorium:</span><span>3 years</span></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold mb-2">Cost Breakdown:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Simple interest (3 yr):</span><span className="font-bold">₹2,47,500</span></div>
                  <div className="flex justify-between"><span>New Principal:</span><span className="font-bold">₹9,97,500</span></div>
                  <div className="flex justify-between pt-2 border-t"><span>Monthly EMI:</span><span className="font-bold text-orange-600">₹13,744</span></div>
                  <div className="flex justify-between"><span>Total Interest:</span><span className="font-bold text-red-600">₹9,01,780</span></div>
                  <div className="flex justify-between pt-2 border-t text-lg"><span><strong>Total Cost:</strong></span><span className="font-bold">₹16,51,780</span></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-400 ring-4 ring-green-100">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">✅ Lower Cost</div>
            <h3 className="text-xl font-bold text-green-700 mb-4">Collateral-Based Loan</h3>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold mb-2">Loan Details:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Loan Amount:</span><span className="font-bold">₹7,50,000</span></div>
                  <div className="flex justify-between"><span>Interest Rate:</span><span className="font-bold text-green-600">9% p.a.</span></div>
                  <div className="flex justify-between"><span>Tenure:</span><span>10 years</span></div>
                  <div className="flex justify-between"><span>Moratorium:</span><span>3 years</span></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold mb-2">Cost Breakdown:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Simple interest (3 yr):</span><span className="font-bold">₹2,02,500</span></div>
                  <div className="flex justify-between"><span>New Principal:</span><span className="font-bold">₹9,52,500</span></div>
                  <div className="flex justify-between pt-2 border-t"><span>Monthly EMI:</span><span className="font-bold text-green-600">₹12,062</span></div>
                  <div className="flex justify-between"><span>Total Interest:</span><span className="font-bold text-red-600">₹6,95,920</span></div>
                  <div className="flex justify-between pt-2 border-t text-lg"><span><strong>Total Cost:</strong></span><span className="font-bold">₹14,45,920</span></div>
                </div>
              </div>
              
              <div className="bg-green-600 text-white rounded-lg p-4 text-center mt-4">
                <div className="text-sm mb-1">You Save:</div>
                <div className="text-3xl font-bold">₹2,05,860</div>
                <div className="text-xs">Compared to non-collateral option!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Choose What */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Choose What? | कब क्या चुनें?</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-orange-900 mb-3 text-xl">Choose Non-Collateral If:</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Loan amount &lt; ₹7.5 lakh</strong>
                  <p className="text-sm text-gray-600">Study in India, Germany, partial Canada/UK funding</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Family has no property</strong>
                  <p className="text-sm text-gray-600">Living in rented house, no FD available</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Need quick approval</strong>
                  <p className="text-sm text-gray-600">Admission deadline approaching, no time for property valuation</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Don't want to risk property</strong>
                  <p className="text-sm text-gray-600">Emotional/practical reasons - family home at stake</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Can manage with lower amount</strong>
                  <p className="text-sm text-gray-600">Scholarships + self-funding + ₹7.5L loan sufficient</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 text-xl">Choose Collateral-Based If:</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Need &gt; ₹7.5 lakh</strong>
                  <p className="text-sm text-gray-600">USA, UK, Australia full funding required</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Family has property/FD</strong>
                  <p className="text-sm text-gray-600">Owned house or substantial FD available</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Want lower interest rate</strong>
                  <p className="text-sm text-gray-600">Save 1-2% on interest = ₹2-5 lakh savings over tenure</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Higher approval chances</strong>
                  <p className="text-sm text-gray-600">Collateral improves approval odds to 90-95%</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Co-applicant CIBIL is low</strong>
                  <p className="text-sm text-gray-600">Collateral compensates for weak credit profile</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hybrid Options */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Hybrid & Alternative Options | वैकल्पिक विकल्प</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-300">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">1. Third-Party Guarantee (Non-Collateral Alternative)</h3>
            <p className="text-gray-700 mb-4">
              Some banks/NBFCs offer loans up to ₹40 lakh without collateral if you provide <strong>third-party guarantee</strong>:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Who Can Be Guarantor?</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Close relative (uncle, aunt)</li>
                  <li>• Family friend</li>
                  <li>• Employer/company</li>
                  <li>• High net-worth individual</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Guarantor Requirements:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• High income (₹10L+ per year)</li>
                  <li>• Excellent CIBIL (750+)</li>
                  <li>• Stable job/business</li>
                  <li>• Willing to take legal liability</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="text-sm text-gray-700">
                <strong>⚠️ Risk:</strong> If student defaults, guarantor is legally liable to repay the loan. Choose guarantor wisely!
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-300">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">2. NBFC Non-Collateral Loans (Higher Rates)</h3>
            <p className="text-gray-700 mb-4">
              NBFCs like Auxilo, Avanse, HDFC Credila offer non-collateral loans up to ₹40-50 lakh based on:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Top university:</strong> Ivy League, Russell Group get priority</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span><strong>High-demand courses:</strong> CS, Data Science, AI/ML preferred</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Co-applicant income:</strong> ₹15L+ annual income</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Student profile:</strong> Good academic record, entrance scores</span></li>
            </ul>
            <div className="mt-4 bg-white rounded-lg p-4">
              <div className="flex justify-between mb-2"><span className="font-semibold">Interest Rate:</span><span className="font-bold text-red-600">11.5% - 14%</span></div>
              <div className="flex justify-between"><span className="font-semibold">Processing Fee:</span><span>2-3% of loan</span></div>
              <p className="text-xs text-gray-600 mt-2">Higher than bank, but no collateral needed for amounts up to ₹40-50L</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Valuation Process */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Valuation Process | संपत्ति मूल्यांकन प्रक्रिया</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            If you are pledging property as collateral, bank conducts <strong>property valuation</strong> to determine market value:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
              <div className="flex-1">
                <h5 className="font-bold text-lg text-gray-900 mb-2">Bank Empaneled Valuer Appointed</h5>
                <p className="text-gray-700">Bank assigns approved valuer to inspect and assess property market value.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
              <div className="flex-1">
                <h5 className="font-bold text-lg text-gray-900 mb-2">Physical Inspection</h5>
                <p className="text-gray-700 mb-2">Valuer visits property to check:</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Location, area, construction quality</li>
                  <li>• Market rates in locality</li>
                  <li>• Legal status, approvals</li>
                  <li>• Age of property, condition</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
              <div className="flex-1">
                <h5 className="font-bold text-lg text-gray-900 mb-2">Valuation Report Submitted</h5>
                <p className="text-gray-700">Valuer submits report with estimated market value. Bank approves loan at 50-60% of this value.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
              <div className="flex-1">
                <h5 className="font-bold text-lg text-gray-900 mb-2">Legal Verification</h5>
                <p className="text-gray-700 mb-2">Bank's legal team verifies:</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Clear title (no disputes/litigation)</li>
                  <li>• Encumbrance certificate (EC) for 13-30 years</li>
                  <li>• Approved building plan</li>
                  <li>• Property tax paid up-to-date</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Valuation Costs | मूल्यांकन शुल्क
            </h4>
            <div className="space-y-2 text-gray-700">
              <p><strong>Valuation Fee:</strong> ₹3,000 - ₹10,000 (paid by borrower)</p>
              <p><strong>Legal Fee:</strong> ₹2,000 - ₹5,000</p>
              <p><strong>Timeline:</strong> 7-10 days for complete process</p>
              <p className="text-sm text-gray-600 mt-2">These are one-time costs but add to your overall loan expenses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans/eligibility-documents" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Eligibility & Documents</div>
            <div className="text-sm text-yellow-100">Complete requirements guide</div>
          </Link>
          <Link to="/learn/education-loans/scholarships-alternatives" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Scholarships & Alternatives</div>
            <div className="text-sm text-yellow-100">Reduce loan burden</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default CollateralVsNonCollateral;

