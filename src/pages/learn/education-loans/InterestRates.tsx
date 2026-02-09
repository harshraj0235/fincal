import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ExternalLink, CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const InterestRates: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="interest-rates"
      breadcrumb={['Learn', 'Education Loans', 'Education Loan Interest Rates 2025']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Education Loan Interest Rates 2025 | एजुकेशन लोन ब्याज दरें
            </h1>
            <p className="text-indigo-100 text-lg">Compare 20+ banks & NBFCs | Study in India & Abroad rates</p>
          </div>
        </div>
      </div>

      {/* Study in India Rates */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Study in India Interest Rates | भारत में पढ़ाई दरें</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank</th>
                <th className="px-6 py-4 text-left">Up to ₹7.5L (No Collateral)</th>
                <th className="px-6 py-4 text-left">Above ₹7.5L (With Collateral)</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-indigo-50"><td className="px-6 py-4 font-semibold">State Bank of India (SBI)</td><td className="px-6 py-4 text-green-600 font-bold">8.50% - 9.50%</td><td className="px-6 py-4">9.00% - 10.00%</td><td className="px-6 py-4">₹10,000</td></tr>
              <tr className="hover:bg-indigo-50"><td className="px-6 py-4 font-semibold">Bank of Baroda</td><td className="px-6 py-4 text-green-600 font-bold">8.75% - 9.75%</td><td className="px-6 py-4">9.25% - 10.50%</td><td className="px-6 py-4">₹7,500</td></tr>
              <tr className="hover:bg-indigo-50"><td className="px-6 py-4 font-semibold">Canara Bank</td><td className="px-6 py-4 text-green-600 font-bold">9.00% - 10.00%</td><td className="px-6 py-4">9.50% - 10.75%</td><td className="px-6 py-4">₹5,000</td></tr>
              <tr className="hover:bg-indigo-50"><td className="px-6 py-4 font-semibold">Punjab National Bank</td><td className="px-6 py-4 text-green-600 font-bold">9.25% - 10.25%</td><td className="px-6 py-4">9.75% - 11.00%</td><td className="px-6 py-4">₹6,000</td></tr>
              <tr className="hover:bg-indigo-50"><td className="px-6 py-4 font-semibold">HDFC Bank</td><td className="px-6 py-4">9.50% - 11.00%</td><td className="px-6 py-4">10.00% - 11.50%</td><td className="px-6 py-4">1% of loan</td></tr>
              <tr className="hover:bg-indigo-50"><td className="px-6 py-4 font-semibold">ICICI Bank</td><td className="px-6 py-4">10.00% - 11.50%</td><td className="px-6 py-4">10.50% - 12.00%</td><td className="px-6 py-4">₹10,000</td></tr>
              <tr className="hover:bg-indigo-50"><td className="px-6 py-4 font-semibold">Axis Bank</td><td className="px-6 py-4">10.25% - 11.75%</td><td className="px-6 py-4">10.75% - 12.25%</td><td className="px-6 py-4">₹10,000</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Study Abroad Rates */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Study Abroad Interest Rates | विदेश में पढ़ाई दरें</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank / NBFC</th>
                <th className="px-6 py-4 text-left">Up to ₹20L</th>
                <th className="px-6 py-4 text-left">₹20L - ₹50L</th>
                <th className="px-6 py-4 text-left">Above ₹50L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-purple-50"><td className="px-6 py-4 font-semibold">SBI Scholar Loan</td><td className="px-6 py-4 text-green-600 font-bold">9.50% - 10.50%</td><td className="px-6 py-4">10.00% - 11.00%</td><td className="px-6 py-4">10.50% - 11.50%</td></tr>
              <tr className="hover:bg-purple-50"><td className="px-6 py-4 font-semibold">HDFC Credila</td><td className="px-6 py-4 text-green-600 font-bold">10.00% - 11.50%</td><td className="px-6 py-4">11.00% - 12.00%</td><td className="px-6 py-4">11.50% - 13.00%</td></tr>
              <tr className="hover:bg-purple-50"><td className="px-6 py-4 font-semibold">Auxilo Finserv</td><td className="px-6 py-4">11.50% - 12.50%</td><td className="px-6 py-4">12.00% - 13.00%</td><td className="px-6 py-4">12.50% - 14.00%</td></tr>
              <tr className="hover:bg-purple-50"><td className="px-6 py-4 font-semibold">Avanse Financial</td><td className="px-6 py-4">11.00% - 12.00%</td><td className="px-6 py-4">12.00% - 13.00%</td><td className="px-6 py-4">12.50% - 13.50%</td></tr>
              <tr className="hover:bg-purple-50"><td className="px-6 py-4 font-semibold">ICICI Bank</td><td className="px-6 py-4">10.50% - 11.50%</td><td className="px-6 py-4">11.00% - 12.00%</td><td className="px-6 py-4">11.50% - 12.50%</td></tr>
              <tr className="hover:bg-purple-50"><td className="px-6 py-4 font-semibold">Axis Bank</td><td className="px-6 py-4">11.00% - 12.00%</td><td className="px-6 py-4">11.50% - 12.50%</td><td className="px-6 py-4">12.00% - 13.50%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* How to Get Lowest Rate */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Get Lowest Interest Rate? | सबसे कम दर कैसे पाएं?</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h5 className="font-bold text-green-900 mb-3">High CIBIL Score (750+)</h5>
            <p className="text-gray-700 text-sm">Co-applicant with excellent credit score gets 0.5-1% lower rate</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h5 className="font-bold text-blue-900 mb-3">Provide Collateral</h5>
            <p className="text-gray-700 text-sm">Property/FD as security reduces rate by 1-2%</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
            <h5 className="font-bold text-purple-900 mb-3">Top University</h5>
            <p className="text-gray-700 text-sm">IIT, IIM, Ivy League get preferential rates</p>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply for Education Loan | आवेदन करें</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://sbi.co.in/web/personal-banking/loans/education-loans" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-indigo-400"><span className="font-semibold text-gray-900">SBI Education Loan</span><ExternalLink className="h-5 w-5 text-indigo-600" /></a>
          <a href="https://www.hdfccredila.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-indigo-400"><span className="font-semibold text-gray-900">HDFC Credila</span><ExternalLink className="h-5 w-5 text-indigo-600" /></a>
          <a href="https://www.auxilo.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-indigo-400"><span className="font-semibold text-gray-900">Auxilo</span><ExternalLink className="h-5 w-5 text-indigo-600" /></a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Education Loans Module Complete! 🎉</h3>
        <p className="mb-6">Congratulations! You have completed all 10 lessons on education loans.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Back to Education Loans Hub</div><div className="text-sm text-indigo-100">Review all 10 lessons</div></Link>
          <Link to="/learn" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Explore More Courses</div><div className="text-sm text-indigo-100">Business, Gold, Credit Cards...</div></Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default InterestRates;

