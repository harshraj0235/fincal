import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const NISMGuide: React.FC = () => (
  <>
    <SEOHelmet title="NISM Certification: Investment Advisor Guide India | MoneyCal" description="NISM Series V-A, X-A certification guide. Become investment advisor. Career in finance." keywords="NISM certification, investment advisor India, Series V-A, Series X-A, finance career, NISM प्रमाणपत्र" url="/learn/investing-wealth/nism-certification-investment-advisor-mutual-fund-india" />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-purple-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 9 of 10</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">NISM Certifications: Become Investment Advisor</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="space-y-4">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Series V-A: MF Distributors</h3>
              <ul className="text-sm space-y-1">
                <li>• Exam Fee: ₹1,500</li>
                <li>• Duration: 2 hours, 100 MCQs</li>
                <li>• Passing: 50% (50 correct)</li>
                <li>• Career: Sell mutual funds, earn commission</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-purple-900 mb-2">Series X-A: Investment Advisers (RIA)</h3>
              <ul className="text-sm space-y-1">
                <li>• Exam Fee: ₹1,500</li>
                <li>• Duration: 2 hours, 100 MCQs</li>
                <li>• Passing: 60% (60 correct)</li>
                <li>• Career: Registered Investment Advisor, charge fee for advice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default NISMGuide;


