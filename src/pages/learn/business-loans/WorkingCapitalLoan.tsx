import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, IndianRupee, CheckCircle, ExternalLink } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const WorkingCapitalLoan: React.FC = () => {
  return (
    <LearnLayout
      category="business-loans"
      currentLesson="working-capital-loan"
      breadcrumb={['Learn', 'Business Loans', 'Working Capital Loan Guide']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <DollarSign className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Working Capital Loan Guide 2025 | वर्किंग कैपिटल लोन
            </h1>
            <p className="text-orange-100 text-lg">
              Fund daily operations, inventory, salaries - Keep your business running smooth!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Up to ₹10Cr</div>
            <div className="text-sm text-orange-100">Max Loan</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">12-16%</div>
            <div className="text-sm text-orange-100">Interest Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">6M-3Yr</div>
            <div className="text-sm text-orange-100">Tenure</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">3 Days</div>
            <div className="text-sm text-orange-100">Quick Approval</div>
          </div>
        </div>
      </div>

      {/* What is Working Capital */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Working Capital? | वर्किंग कैपिटल क्या है?</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Working Capital</strong> is the money needed to run daily business operations - paying salaries, buying inventory, electricity bills, rent, etc. 
            Working Capital Loan provides this funding for short-term (6 months to 3 years).
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>हिंदी में:</strong> वर्किंग कैपिटल वह पैसा है जो रोजमर्रा के व्यवसाय चलाने के लिए चाहिए - वेतन, इन्वेंटरी, बिजली, किराया आदि।
          </p>
        </div>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Working Capital Loans | प्रकार</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h4 className="font-bold text-xl text-blue-700 mb-4">1. Cash Credit (CC)</h4>
            <p className="text-gray-700 mb-4">Overdraft facility against inventory/receivables</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Withdraw as needed, pay interest only on used amount</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Limit: 20-25% of annual turnover</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Interest: 12-15% p.a.</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" /><span>Renewable annually</span></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h4 className="font-bold text-xl text-green-700 mb-4">2. Overdraft (OD)</h4>
            <p className="text-gray-700 mb-4">Withdraw more than your bank balance up to limit</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Flexibility - use only when needed</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>No EMI - pay interest monthly</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Interest: 13-16% p.a.</span></li>
              <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Repay and reuse repeatedly</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply Now | अभी आवेदन करें</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://sbi.co.in/web/business/sme/loans-and-working-capital/working-capital" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400">
            <span className="font-semibold text-gray-900">SBI Working Capital</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
          
          <a href="https://www.hdfcbank.com/sme/products-solutions/loans/working-capital-finance" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400">
            <span className="font-semibold text-gray-900">HDFC Working Capital</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
          
          <a href="https://www.icicibank.com/business-banking/sme/credit-solutions/working-capital" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-orange-400">
            <span className="font-semibold text-gray-900">ICICI Working Capital</span>
            <ExternalLink className="h-5 w-5 text-orange-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/business-loans/machinery-loan" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Machinery & Equipment Loan</div>
            <div className="text-sm text-orange-100">Finance business assets</div>
          </Link>
          <Link to="/learn/business-loans/emi-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">EMI Calculator</div>
            <div className="text-sm text-orange-100">Calculate business EMI</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default WorkingCapitalLoan;

