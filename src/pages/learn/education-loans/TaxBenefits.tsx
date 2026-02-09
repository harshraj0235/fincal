import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Calculator, TrendingDown, CheckCircle, AlertCircle, ExternalLink, Award, FileText } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const TaxBenefits: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="tax-benefits"
      breadcrumb={['Learn', 'Education Loans', 'Education Loan Tax Benefits 80E']}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <DollarSign className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Education Loan Tax Benefits Section 80E | टैक्स बेनिफिट 80E
            </h1>
            <p className="text-cyan-100 text-lg">
              Save up to ₹50,000 per year on taxes! Complete guide with examples, calculations, and filing process
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹50,000</div>
            <div className="text-sm text-cyan-100">Max Tax Saving/Year</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">8 Years</div>
            <div className="text-sm text-cyan-100">Benefit Duration</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm text-cyan-100">Interest Deductible</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">No Limit</div>
            <div className="text-sm text-cyan-100">On Interest Amount</div>
          </div>
        </div>
      </div>

      {/* What is Section 80E */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <DollarSign className="h-8 w-8 mr-3 text-cyan-600" />
          What is Section 80E? | सेक्शन 80E क्या है?
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Section 80E of Income Tax Act</strong> allows you to claim tax deduction on the <strong>interest paid</strong> on education loan. 
            This benefit is available for 8 years starting from the year you begin repaying the loan.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>सेक्शन 80E हिंदी में:</strong> आयकर अधिनियम की धारा 80E एजुकेशन लोन पर चुकाए गए ब्याज पर टैक्स छूट देती है। यह लाभ लोन चुकाना शुरू करने के वर्ष से 8 साल तक मिलता है।
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <h4 className="font-bold text-green-900 mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Key Benefits | मुख्य लाभ
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>100% interest deductible</strong> - No upper limit on interest amount</li>
                <li>• <strong>8-year benefit period</strong> - Starting from first repayment year</li>
                <li>• <strong>Available to student OR parent</strong> - Whoever is paying the loan</li>
                <li>• <strong>Any recognized institution</strong> - India or abroad</li>
                <li>• <strong>Higher education only</strong> - After 12th standard</li>
                <li>• <strong>No income limit</strong> - Available to all taxpayers</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Important Conditions | शर्तें
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Only interest, not principal</strong> - EMI principal part not deductible</li>
                <li>• <strong>Loan from financial institution</strong> - Not from friends/family</li>
                <li>• <strong>Higher education courses only</strong> - Graduation, post-graduation, PhD</li>
                <li>• <strong>For self, spouse, children</strong> - Not for siblings/relatives</li>
                <li>• <strong>Cannot be transferred</strong> - If parent pays, parent claims (not student)</li>
                <li>• <strong>8 years max</strong> - Even if loan continues beyond 8 years</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="h-8 w-8 mr-3 text-blue-600" />
          Tax Saving Calculation Examples | टैक्स बचत उदाहरण
        </h2>
        
        <div className="space-y-6">
          {/* Example 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-300">
            <h3 className="text-2xl font-bold text-blue-700 mb-6">Example 1: Study in India (IIM MBA)</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-lg text-gray-900 mb-4">Loan Details:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between"><span>Total Loan Amount:</span><span className="font-bold">₹25,00,000</span></div>
                  <div className="flex justify-between"><span>Interest Rate:</span><span className="font-bold">9.5% p.a.</span></div>
                  <div className="flex justify-between"><span>Moratorium Period:</span><span>3 years (2 yr MBA + 1 yr)</span></div>
                  <div className="flex justify-between"><span>Repayment Period:</span><span>10 years</span></div>
                  <div className="flex justify-between pt-3 border-t text-xl"><span>Monthly EMI:</span><span className="font-bold text-blue-600">₹32,332</span></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-lg text-gray-900 mb-4">Annual Interest Paid (Year-wise):</h4>
                <div className="space-y-2 text-gray-700 text-sm">
                  <div className="flex justify-between"><span>Year 1 (repayment starts):</span><span className="font-bold text-red-600">₹2,85,000</span></div>
                  <div className="flex justify-between"><span>Year 2:</span><span className="font-bold">₹2,60,000</span></div>
                  <div className="flex justify-between"><span>Year 3:</span><span className="font-bold">₹2,33,000</span></div>
                  <div className="flex justify-between"><span>Year 4:</span><span className="font-bold">₹2,04,000</span></div>
                  <div className="flex justify-between"><span>Year 5:</span><span className="font-bold">₹1,73,000</span></div>
                  <div className="flex justify-between"><span>Year 6:</span><span className="font-bold">₹1,40,000</span></div>
                  <div className="flex justify-between"><span>Year 7:</span><span className="font-bold">₹1,05,000</span></div>
                  <div className="flex justify-between"><span>Year 8:</span><span className="font-bold">₹68,000</span></div>
                  <div className="flex justify-between pt-3 border-t-2 text-base"><span><strong>8-Year Total Interest:</strong></span><span className="font-bold text-red-600">₹15,68,000</span></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="font-bold text-xl text-gray-900 mb-4">Tax Benefit Calculation (Assuming 30% Tax Bracket):</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between"><span>Total Interest (8 years):</span><span className="font-bold">₹15,68,000</span></div>
                  <div className="flex justify-between"><span>Tax Rate:</span><span className="font-bold">30%</span></div>
                  <div className="flex justify-between text-xl pt-3 border-t-2"><span><strong>Tax Saved (8 years):</strong></span><span className="font-bold text-green-600">₹4,70,400</span></div>
                  <div className="flex justify-between"><span>Average Per Year:</span><span className="font-bold">₹58,800</span></div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2"><strong>Real Savings Breakdown:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Year 1: Save ₹85,500 on tax</li>
                    <li>• Year 2: Save ₹78,000 on tax</li>
                    <li>• Year 3: Save ₹69,900 on tax</li>
                    <li>• Year 4-8: Decreasing benefit</li>
                    <li className="pt-2 border-t font-bold">Total 8-year benefit = ₹4.7L</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-green-600 text-white rounded-xl p-6 text-center">
              <div className="text-lg mb-2">Your Effective Loan Cost Reduces By:</div>
              <div className="text-5xl font-bold mb-2">₹4,70,400</div>
              <div className="text-sm">Thanks to Section 80E tax deduction! 🎉</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-300">
            <h3 className="text-2xl font-bold text-purple-700 mb-6">Example 2: Study Abroad USA (MS Computer Science)</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-lg text-gray-900 mb-4">Loan Details:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between"><span>Total Loan Amount:</span><span className="font-bold">₹72,00,000</span></div>
                  <div className="flex justify-between"><span>Interest Rate:</span><span className="font-bold">10.5% p.a.</span></div>
                  <div className="flex justify-between"><span>Moratorium Period:</span><span>3 years</span></div>
                  <div className="flex justify-between"><span>Repayment Period:</span><span>12 years</span></div>
                  <div className="flex justify-between pt-3 border-t text-xl"><span>Monthly EMI:</span><span className="font-bold text-purple-600">₹1,01,250</span></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-lg text-gray-900 mb-4">Interest Paid (First 8 Years):</h4>
                <div className="space-y-2 text-gray-700 text-sm">
                  <div className="flex justify-between"><span>Year 1:</span><span className="font-bold text-red-600">₹8,50,000</span></div>
                  <div className="flex justify-between"><span>Year 2:</span><span className="font-bold">₹7,95,000</span></div>
                  <div className="flex justify-between"><span>Year 3:</span><span className="font-bold">₹7,35,000</span></div>
                  <div className="flex justify-between"><span>Year 4:</span><span className="font-bold">₹6,70,000</span></div>
                  <div className="flex justify-between"><span>Year 5:</span><span className="font-bold">₹6,00,000</span></div>
                  <div className="flex justify-between"><span>Year 6:</span><span className="font-bold">₹5,25,000</span></div>
                  <div className="flex justify-between"><span>Year 7:</span><span className="font-bold">₹4,45,000</span></div>
                  <div className="flex justify-between"><span>Year 8:</span><span className="font-bold">₹3,60,000</span></div>
                  <div className="flex justify-between pt-3 border-t-2 text-base"><span><strong>8-Year Total:</strong></span><span className="font-bold text-red-600">₹49,80,000</span></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="font-bold text-xl text-gray-900 mb-4">Tax Saving (30% Bracket):</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-lg"><span>Total Interest (8 years):</span><span className="font-bold text-red-600">₹49,80,000</span></div>
                <div className="flex justify-between text-lg"><span>Tax Bracket:</span><span className="font-bold">30%</span></div>
                <div className="flex justify-between text-3xl pt-3 border-t-2"><span><strong>Total Tax Saved:</strong></span><span className="font-bold text-green-600">₹14,94,000</span></div>
                <div className="flex justify-between text-lg"><span>Average Per Year:</span><span className="font-bold text-green-600">₹1,86,750</span></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
              <div className="text-lg mb-2">You Save Nearly ₹15 Lakh on Taxes! 🎉</div>
              <div className="text-5xl font-bold mb-2">₹14,94,000</div>
              <div className="text-sm">This significantly reduces your effective education loan cost!</div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Claim */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How to Claim Section 80E Deduction? | कैसे क्लेम करें?
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-600">
            <div className="flex items-start">
              <div className="bg-cyan-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-gray-900 mb-3">Get Interest Certificate from Bank</h4>
                <p className="text-gray-700 mb-3">
                  At the end of each financial year (March 31), request <strong>Interest Certificate</strong> from your bank/lender. 
                  This certificate shows total interest paid during the year.
                </p>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Certificate Contains:</strong> Borrower name, loan account number, principal amount, interest paid, certificate date
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-600">
            <div className="flex items-start">
              <div className="bg-cyan-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-gray-900 mb-3">Fill ITR with Section 80E Deduction</h4>
                <p className="text-gray-700 mb-3">
                  While filing Income Tax Return (ITR), under deductions section, enter interest amount in <strong>Section 80E field</strong>.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">For Salaried (ITR-1):</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Login to income tax e-filing portal</li>
                      <li>• Choose ITR-1 form</li>
                      <li>• Under "Deductions" → "80E"</li>
                      <li>• Enter total interest paid</li>
                      <li>• Upload interest certificate</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-900 mb-2">For Self-Employed (ITR-3/4):</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Use appropriate ITR form</li>
                      <li>• Under Chapter VI-A deductions</li>
                      <li>• Fill Section 80E amount</li>
                      <li>• Attach interest certificate copy</li>
                      <li>• Submit and verify ITR</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-600">
            <div className="flex items-start">
              <div className="bg-cyan-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-gray-900 mb-3">Receive Tax Refund or Reduced TDS</h4>
                <p className="text-gray-700 mb-3">
                  After filing ITR with 80E deduction, you will either get:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-900 mb-2">Option 1: Tax Refund</h5>
                    <p className="text-sm text-gray-700">
                      If you already paid full tax via TDS, you will get refund in bank account within 30-45 days after ITR verification.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">Option 2: Reduced TDS</h5>
                    <p className="text-sm text-gray-700">
                      Inform your employer about education loan. They can reduce TDS monthly, giving you more in-hand salary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Common Mistakes to Avoid | आम गलतियाँ
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3 text-xl">❌ Mistakes People Make:</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Claiming principal + interest:</strong>
                  <p className="text-sm">Only interest is deductible, not principal EMI component</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Missing interest certificate:</strong>
                  <p className="text-sm">Always attach certificate with ITR</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Claiming beyond 8 years:</strong>
                  <p className="text-sm">Benefit stops after 8 years, even if loan continues</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Student claims when parent pays:</strong>
                  <p className="text-sm">Whoever pays EMI should claim (usually parent)</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Claiming for distance education:</strong>
                  <p className="text-sm">Only full-time higher education courses qualify</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 text-xl">✅ Best Practices:</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Request certificate yearly:</strong>
                  <p className="text-sm">Get interest certificate every March from bank</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Keep all loan documents:</strong>
                  <p className="text-sm">Save loan agreement, repayment schedule, certificates</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Inform employer about loan:</strong>
                  <p className="text-sm">They can adjust TDS to give you higher in-hand salary</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>File ITR even with zero tax:</strong>
                  <p className="text-sm">Claim deduction even if total income is below taxable limit</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <strong>Track 8-year countdown:</strong>
                  <p className="text-sm">Know when benefit expires to plan finances</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions | अक्सर पूछे जाने वाले प्रश्न
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-2">Q1: Can I claim Section 80E if my father is paying the loan?</h4>
            <p className="text-gray-700">
              <strong>Answer:</strong> Yes, but your father should claim it (not you). Section 80E benefit goes to whoever is actually paying the EMI. 
              If father pays, father claims in his ITR. If you pay after getting a job, you claim it.
              <br />
              <span className="text-gray-600">हां, लेकिन आपके पिता को क्लेम करना होगा। जो EMI pay करे, वही टैक्स छूट ले सकता है।</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-2">Q2: Is there a maximum limit on interest deduction under 80E?</h4>
            <p className="text-gray-700">
              <strong>Answer:</strong> No! Unlike Section 80C (₹1.5L limit), Section 80E has <strong>no upper limit</strong>. 
              You can claim the entire interest amount, even if it is ₹5 lakh or ₹10 lakh per year.
              <br />
              <span className="text-gray-600">नहीं! 80E में कोई ऊपरी सीमा नहीं है। पूरा ब्याज क्लेम कर सकते हैं।</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-2">Q3: When does the 8-year countdown start?</h4>
            <p className="text-gray-700">
              <strong>Answer:</strong> The 8-year period starts from the year you <strong>begin repaying</strong> the loan (not from when you took the loan). 
              For example, if you took loan in 2023 but started EMI in 2026, the 8 years count from 2026-2033.
              <br />
              <span className="text-gray-600">8 साल की गिनती EMI शुरू करने के साल से होती है, लोन लेने के साल से नहीं।</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-2">Q4: Can I claim 80E for education loan taken for my sibling?</h4>
            <p className="text-gray-700">
              <strong>Answer:</strong> No. Section 80E is available only for education loan taken for <strong>self, spouse, or children</strong>. 
              Loans for siblings, parents, or other relatives don't qualify.
              <br />
              <span className="text-gray-600">नहीं। केवल खुद, पत्नी या बच्चों के लिए लिए गए लोन पर ही छूट मिलती है।</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-2">Q5: What if I prepay the loan before 8 years?</h4>
            <p className="text-gray-700">
              <strong>Answer:</strong> You can still claim 80E deduction for all 8 years from the first repayment year, even if you close the loan early. 
              However, if loan is closed in year 5, you can't claim for years 6-8 (no interest paid).
              <br />
              <span className="text-gray-600">अगर लोन जल्दी बंद हो जाए, तो उतने साल तक ही क्लेम कर सकते हैं।</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-2">Q6: Is 80E available with new tax regime?</h4>
            <p className="text-gray-700">
              <strong>Answer:</strong> No! Section 80E deduction is <strong>NOT available under new tax regime</strong> (introduced in Budget 2020). 
              You must opt for <strong>old tax regime</strong> to claim education loan interest deduction.
              <br />
              <span className="text-gray-600">नहीं! नई टैक्स व्यवस्था में 80E नहीं मिलता। पुरानी व्यवस्था चुननी होगी।</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-2">Q7: Can I claim both 80C and 80E?</h4>
            <p className="text-gray-700">
              <strong>Answer:</strong> Yes! Section 80E is <strong>over and above</strong> Section 80C limit. You can claim:
              <ul className="mt-2 space-y-1 ml-6">
                <li>• 80C: ₹1.5 lakh (PF, ELSS, PPF, etc.)</li>
                <li>• 80D: ₹25,000 (Health insurance)</li>
                <li>• 80E: Full interest (No limit!)</li>
                <li>• Total deduction: ₹1.75L + full education loan interest</li>
              </ul>
            </p>
          </div>
        </div>
      </section>

      {/* Tax Saving Strategies */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Smart Tax Saving Strategies | स्मार्ट रणनीति
        </h2>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-300">
          <h3 className="text-2xl font-bold text-purple-700 mb-6">Maximize Your Tax Benefits:</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow">
              <h5 className="font-bold text-purple-900 mb-2">1. Choose Old Tax Regime</h5>
              <p className="text-gray-700 text-sm">
                If your education loan interest is &gt; ₹1 lakh/year, old tax regime will save more money. 
                Calculate both regimes before choosing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h5 className="font-bold text-purple-900 mb-2">2. Parent Should Pay if in Higher Tax Bracket</h5>
              <p className="text-gray-700 text-sm">
                If parent is in 30% bracket and student is in 0-5% bracket, parent should pay EMI to maximize tax savings. 
                30% benefit &gt; 5% benefit.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h5 className="font-bold text-purple-900 mb-2">3. Don't Prepay Too Aggressively in First 8 Years</h5>
              <p className="text-gray-700 text-sm">
                Since interest gives tax benefit for 8 years, there is less urgency to prepay aggressively. 
                Effective interest = Actual interest - Tax saving. Consider this in prepayment decisions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h5 className="font-bold text-purple-900 mb-2">4. Keep All Documentation Safe</h5>
              <p className="text-gray-700 text-sm">
                Income Tax department can ask for proof anytime within 6 years. Keep: Loan agreement, interest certificates, 
                repayment receipts, admission letter, university fee structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Official Resources | आधिकारिक संसाधन
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-cyan-400">
            <span className="font-semibold text-gray-900">Income Tax E-Filing Portal</span>
            <ExternalLink className="h-5 w-5 text-cyan-600" />
          </a>
          
          <a href="https://www.incometaxindia.gov.in/tutorials/80e-education-loan-deduction.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-cyan-400">
            <span className="font-semibold text-gray-900">Section 80E Guide (PDF)</span>
            <ExternalLink className="h-5 w-5 text-cyan-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <p className="mb-6">Now that you understand tax benefits, learn about repayment strategies:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans/repayment-moratorium" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Next: Repayment & Moratorium</div>
            <div className="text-sm text-cyan-100">When and how to start paying EMI</div>
          </Link>
          
          <Link to="/learn/education-loans/emi-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">EMI Calculator</div>
            <div className="text-sm text-cyan-100">Calculate with tax benefits included</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default TaxBenefits;

