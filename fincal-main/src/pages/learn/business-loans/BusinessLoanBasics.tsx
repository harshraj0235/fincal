import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Calculator, TrendingUp, CheckCircle, AlertCircle, ExternalLink, Factory, Building } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const BusinessLoanBasics: React.FC = () => {
  return (
    <LearnLayout
      category="business-loans"
      currentLesson="business-loan-basics"
      breadcrumb={['Learn', 'Business Loans', 'Business Loan Basics India 2025']}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Briefcase className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Business Loan Basics India 2025 | बिजनेस लोन की पूरी जानकारी
            </h1>
            <p className="text-blue-100 text-lg">
              Complete guide: Types, eligibility, interest rates, MSME loans, working capital - Grow your business!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹10L-50Cr</div>
            <div className="text-sm text-blue-100">Loan Range</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">11-18%</div>
            <div className="text-sm text-blue-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">1-10 Years</div>
            <div className="text-sm text-blue-100">Tenure</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">7 Days</div>
            <div className="text-sm text-blue-100">Quick Approval</div>
          </div>
        </div>
      </div>

      {/* What is Business Loan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Briefcase className="h-8 w-8 mr-3 text-blue-600" />
          What is Business Loan? | बिजनेस लोन क्या है?
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            A <strong>business loan (बिजनेस लोन)</strong> is financing provided by banks and NBFCs to help businesses meet various needs - expansion, working capital, machinery purchase, inventory, or operations. 
            It can be secured (with collateral) or unsecured (without collateral).
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>बिजनेस लोन हिंदी में:</strong> बिजनेस लोन एक वित्तीय सहायता है जो बैंक और NBFC व्यवसायों को विस्तार, मशीनरी, इन्वेंटरी, या संचालन के लिए देते हैं।
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Key Difference from Personal Loan | मुख्य अंतर
            </h4>
            <p className="text-gray-700">
              <strong>Business loans</strong> are given to registered businesses (proprietorship, partnership, Pvt Ltd, LLP) based on business performance, turnover, and profitability. 
              <strong>Personal loans</strong> are given to individuals based on salary/income.
              <br />
              <span className="text-gray-600">बिजनेस लोन पंजीकृत व्यवसायों को दिया जाता है, पर्सनल लोन व्यक्तियों को।</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3">✅ Uses of Business Loan | उपयोग</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Business expansion</strong> - New branch, bigger shop (विस्तार)</li>
              <li>• <strong>Machinery purchase</strong> - Equipment, tools, vehicles (मशीनरी)</li>
              <li>• <strong>Working capital</strong> - Day-to-day operations, salaries (कार्यशील पूंजी)</li>
              <li>• <strong>Inventory purchase</strong> - Raw materials, stock (इन्वेंटरी)</li>
              <li>• <strong>Marketing & promotion</strong> - Advertising, branding (मार्केटिंग)</li>
              <li>• <strong>Rent/Renovations</strong> - Shop upgrade, office space (किराया)</li>
              <li>• <strong>Technology upgrade</strong> - Software, computers (टेक्नोलॉजी)</li>
              <li>• <strong>Debt consolidation</strong> - Merge multiple business debts (ऋण समेकन)</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3">❌ NOT Allowed Uses | निषिद्ध उपयोग</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Personal expenses</strong> - Family shopping, vacation (व्यक्तिगत खर्च)</li>
              <li>• <strong>Speculation</strong> - Stock trading, gambling (सट्टेबाजी)</li>
              <li>• <strong>Illegal activities</strong> - Any unlawful business (गैरकानूनी)</li>
              <li>• <strong>Real estate investment</strong> - Buy land for profit (रियल एस्टेट)</li>
              <li>• <strong>Lending to others</strong> - Can't re-lend the money (दूसरों को उधार)</li>
              <li>• <strong>Personal assets</strong> - Home, car for family use (पारिवारिक संपत्ति)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Types of Business Loans */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Types of Business Loans | बिजनेस लोन के प्रकार
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
              <Factory className="h-6 w-6 mr-2" />
              1. Term Loan
            </h3>
            <p className="text-gray-700 mb-4">Fixed amount for specific purpose, repaid in monthly EMIs over set tenure.</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Amount:</strong> ₹5L - ₹50Cr</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Tenure:</strong> 1-10 years</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Use:</strong> Expansion, machinery</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Rate:</strong> 11-15% p.a.</span></li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
              <DollarSign className="h-6 w-6 mr-2" />
              2. Working Capital Loan
            </h3>
            <p className="text-gray-700 mb-4">Short-term loan for daily operations, inventory, salaries.</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Amount:</strong> ₹1L - ₹10Cr</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Tenure:</strong> 6 months - 3 years</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Use:</strong> Operations, inventory</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Rate:</strong> 12-16% p.a.</span></li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300 ring-4 ring-purple-100">
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">Popular</div>
            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
              <Award className="h-6 w-6 mr-2" />
              3. Mudra Loan
            </h3>
            <p className="text-gray-700 mb-4">Government scheme for micro/small businesses - NO collateral!</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Amount:</strong> Up to ₹10L</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Tenure:</strong> Up to 5 years</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Use:</strong> Any business need</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Rate:</strong> 8-12% p.a.</span></li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">4. Machinery/Equipment Loan</h4>
            <p className="text-gray-700 mb-3">Loan specifically for purchasing business equipment, machinery, vehicles.</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded"><strong>Amount:</strong> Up to 90% of asset value</div>
              <div className="bg-green-50 p-3 rounded"><strong>Tenure:</strong> 3-7 years</div>
              <div className="bg-purple-50 p-3 rounded"><strong>Use:</strong> CNC machines, vehicles, computers</div>
              <div className="bg-orange-50 p-3 rounded"><strong>Rate:</strong> 12-15% p.a.</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-4">5. Invoice Discounting/Factoring</h4>
            <p className="text-gray-700 mb-3">Get immediate cash (80-90%) against pending customer invoices.</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded"><strong>Amount:</strong> Up to ₹5Cr</div>
              <div className="bg-green-50 p-3 rounded"><strong>Tenure:</strong> 30-180 days</div>
              <div className="bg-purple-50 p-3 rounded"><strong>Use:</strong> Immediate cash flow</div>
              <div className="bg-orange-50 p-3 rounded"><strong>Charges:</strong> 1-3% per month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interest Rates */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-green-600" />
          Business Loan Interest Rates 2025 | ब्याज दरें
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank / NBFC</th>
                <th className="px-6 py-4 text-left">MSME Loan Rate</th>
                <th className="px-6 py-4 text-left">Working Capital</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">State Bank of India (SBI)</td>
                <td className="px-6 py-4 text-green-600 font-bold">11.00% - 14.00%</td>
                <td className="px-6 py-4">12.00% - 15.00%</td>
                <td className="px-6 py-4">1% of loan (min ₹10K)</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">HDFC Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">12.50% - 16.00%</td>
                <td className="px-6 py-4">13.00% - 17.00%</td>
                <td className="px-6 py-4">2% of loan</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">ICICI Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">13.00% - 17.00%</td>
                <td className="px-6 py-4">14.00% - 18.00%</td>
                <td className="px-6 py-4">2% of loan</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">Axis Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">13.50% - 18.00%</td>
                <td className="px-6 py-4">14.50% - 19.00%</td>
                <td className="px-6 py-4">2% of loan</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 font-semibold">Bajaj Finserv</td>
                <td className="px-6 py-4">14.00% - 20.00%</td>
                <td className="px-6 py-4">15.00% - 21.00%</td>
                <td className="px-6 py-4">3% of loan</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <p className="text-gray-700">
            <strong>💡 Rate Factors:</strong> Interest varies based on business turnover, profitability, CIBIL score, collateral, loan amount, and tenure. 
            Established businesses (3+ years) with good GST compliance get lower rates.
            <br />
            <span className="text-gray-600">ब्याज दरें व्यवसाय के टर्नओवर, लाभ, CIBIL स्कोर और कोलैटरल पर निर्भर करती हैं।</span>
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Business Loan Eligibility | पात्रता मानदंड
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-xl text-gray-900 mb-4">Basic Requirements:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Business Vintage:</strong> Minimum 1-3 years operational (पुराना व्यवसाय)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Annual Turnover:</strong> Minimum ₹10-15 lakh/year (वार्षिक टर्नओवर)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Profitability:</strong> Should be profit-making (losses may be rejected)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>GST Registration:</strong> Valid GSTIN for turnover &gt; ₹40L (GST पंजीकरण)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Age:</strong> Owner should be 21-65 years</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>CIBIL Score:</strong> 700+ for business & owner (क्रेडिट स्कोर)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xl text-gray-900 mb-4">Business Type Accepted:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Sole Proprietorship:</strong> Individual business (एकल स्वामित्व)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Partnership Firm:</strong> 2+ partners (साझेदारी फर्म)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Private Limited (Pvt Ltd):</strong> Company registered under Companies Act</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Limited Liability Partnership (LLP):</strong> LLP registered entity</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Public Limited:</strong> Listed/unlisted companies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Registered Trusts/NGOs:</strong> Social enterprises</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Example Calculation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="h-8 w-8 mr-3 text-blue-600" />
          Business Loan Example | उदाहरण
        </h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">Manufacturing Business Expansion Loan</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
              <div className="text-2xl font-bold text-blue-600">₹25,00,000</div>
              <div className="text-xs text-gray-500">For new machinery + shop expansion</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">Interest Rate</div>
              <div className="text-2xl font-bold text-green-600">13% p.a.</div>
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
                <div className="text-3xl font-bold text-blue-600">₹57,113</div>
              </div>
              <div>
                <div className="text-gray-600 mb-2">Total Interest</div>
                <div className="text-3xl font-bold text-red-600">₹9,26,780</div>
              </div>
              <div>
                <div className="text-gray-600 mb-2">Total Payment</div>
                <div className="text-3xl font-bold text-green-600">₹34,26,780</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a href="/calculators/business-loan-calculator" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Your Business EMI | अपना EMI कैलकुलेट करें
            </a>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🔗 Apply for Business Loan | आवेदन करें
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://sbi.co.in/web/business/sme/loans-and-working-capital" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400">
            <span className="font-semibold text-gray-900">SBI MSME Loan</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
          
          <a href="https://www.hdfcbank.com/sme/products-solutions/loans/term-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400">
            <span className="font-semibold text-gray-900">HDFC Business Loan</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
          
          <a href="https://www.udyamimitra.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400">
            <span className="font-semibold text-gray-900">Udyami Mitra Portal</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <p className="mb-6">Explore specific business loan types:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/business-loans/msme-loan-guide" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Next: MSME Loan Complete Guide</div>
            <div className="text-sm text-blue-100">Micro, Small, Medium enterprises</div>
          </Link>
          
          <Link to="/learn/business-loans/mudra-loan" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Mudra Loan Scheme</div>
            <div className="text-sm text-blue-100">Up to ₹10L without collateral</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default BusinessLoanBasics;

