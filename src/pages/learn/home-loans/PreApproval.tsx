import React from 'react';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const PreApproval: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Home Loan Pre-Approval: Get Approved Before House Hunting 2025 | MoneyCal"
        description="What is home loan pre-approval in India? How to get it, benefits, validity, and documents needed. Gain negotiation power with sellers!"
        keywords="home loan pre-approval, home loan pre-qualification, pre-approved home loan, loan approval letter"
        canonicalUrl="https://moneycal.in/learn/home-loans/pre-approval"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="pre-approval"
        breadcrumb={['Learn', 'Home Loans', 'Pre-Approval']}
      >
        {/* What is Pre-Approval */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What is Pre-Approval?</h2>
            <p className="text-gray-700 text-lg">
              <strong>Pre-approval</strong> is when a bank officially confirms how much home loan they'll give you BEFORE you find a property. It's like getting a "yes" from the bank upfront!
            </p>
          </div>

          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
            <h3 className="font-bold text-green-900 mb-3">Benefits:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span className="text-gray-700"><strong>Know your budget:</strong> Don't waste time looking at ₹80L properties if you're eligible for ₹40L only</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span className="text-gray-700"><strong>Seller confidence:</strong> Sellers take you seriously (you're not "just looking")</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span className="text-gray-700"><strong>Faster closing:</strong> Once you find property, disbursement in 10-15 days (vs 30-45)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span className="text-gray-700"><strong>Negotiation power:</strong> Can negotiate better price (seller knows you're ready buyer)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Get */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Get Pre-Approval (3 Steps)</h2>
          
          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
              <div className="flex items-center mb-2">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</div>
                <h3 className="font-bold text-gray-900">Submit Basic Documents</h3>
              </div>
              <ul className="ml-11 text-gray-700 list-disc">
                <li>PAN, Aadhaar</li>
                <li>Last 3 salary slips</li>
                <li>Last 6 months bank statement</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-green-300 rounded-lg p-5">
              <div className="flex items-center mb-2">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</div>
                <h3 className="font-bold text-gray-900">Bank Does Quick Check</h3>
              </div>
              <ul className="ml-11 text-gray-700 list-disc">
                <li>Verifies income</li>
                <li>Soft CIBIL check (doesn't affect score)</li>
                <li>Calculates eligibility</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-purple-300 rounded-lg p-5">
              <div className="flex items-center mb-2">
                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</div>
                <h3 className="font-bold text-gray-900">Get Pre-Approval Letter (2-5 days)</h3>
              </div>
              <p className="ml-11 text-gray-700">
                Letter states: "You're eligible for home loan up to ₹40 lakhs, valid for 60 days"
              </p>
            </div>
          </div>
        </section>

        {/* Pre-Approval vs Pre-Qualification */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pre-Approval vs Pre-Qualification</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3 text-left">Pre-Qualification</th>
                  <th className="border border-gray-300 p-3 text-left">Pre-Approval</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3">Documents</td>
                  <td className="border border-gray-300 p-3">Self-declared info</td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>Verified documents</strong></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">CIBIL Check</td>
                  <td className="border border-gray-300 p-3">Soft/no check</td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>Soft check done</strong></td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3">Binding?</td>
                  <td className="border border-gray-300 p-3">NO</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">Conditional YES</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Validity</td>
                  <td className="border border-gray-300 p-3">30 days</td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>60-90 days</strong></td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3">Seller Impact</td>
                  <td className="border border-gray-300 p-3">Low confidence</td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>High confidence</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Pre-approval confirms loan amount BEFORE property selection</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Valid for 60-90 days, helps negotiation with sellers</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Faster closing (10-15 days vs 30-45) once property selected</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Takes 2-5 days to get, requires basic docs + soft CIBIL check</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Co-Applicant Benefits Next! 👥</h2>
          <p className="text-blue-100 mb-6">
            Learn how adding a co-applicant can boost your loan by 40-60% and double tax benefits!
          </p>
          <a
            href="/learn/home-loans/co-applicant-benefits"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Co-Applicant Benefits →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default PreApproval;



