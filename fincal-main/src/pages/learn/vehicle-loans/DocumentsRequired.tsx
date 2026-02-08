import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const DocumentsRequired: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="documents-required"
      breadcrumb={['Learn', 'Vehicle Loans', 'Vehicle Loan Documents Required']}
    >
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center">
          <FileText className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Vehicle Loan Documents Required | आवश्यक दस्तावेज
            </h1>
            <p className="text-cyan-100 text-lg">Complete checklist for car and bike loan application</p>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Checklist | दस्तावेज सूची</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Salaried Individuals | नौकरीपेशा</h3>
            <ul className="space-y-3">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>PAN Card</strong> - Mandatory</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Aadhaar Card</strong> - Identity & address proof</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Salary Slips</strong> - Last 3 months</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Bank Statements</strong> - Last 6 months</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Form 16</strong> - Latest year</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Passport Photo</strong> - 2 copies</span></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">Self-Employed | स्व-रोजगार</h3>
            <ul className="space-y-3">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>PAN Card</strong> - Mandatory</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Aadhaar Card</strong> - Identity proof</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>ITR</strong> - Last 2-3 years</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Business Proof</strong> - GST, Shop Act</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Bank Statements</strong> - Last 6-12 months</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span><strong>Passport Photo</strong> - 2 copies</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Vehicle Documents | वाहन दस्तावेज</h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200">
          <ul className="space-y-3 text-lg">
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" /><span><strong>Proforma Invoice</strong> - From dealer (vehicle quotation)</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" /><span><strong>Down Payment Receipt</strong> - Proof of payment</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" /><span><strong>Insurance Copy</strong> - Comprehensive insurance</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" /><span><strong>RC (For used car)</strong> - Registration certificate</span></li>
          </ul>
        </div>
      </section>

      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Apply? | आवेदन करने के लिए तैयार?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/application-process" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Application Process</div>
            <div className="text-sm text-cyan-100">Step-by-step guide</div>
          </Link>
          <a href="/calculators/car-loan-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Calculate EMI First</div>
            <div className="text-sm text-cyan-100">Check affordability</div>
          </a>
        </div>
      </div>
    </LearnLayout>
  );
};

export default DocumentsRequired;

