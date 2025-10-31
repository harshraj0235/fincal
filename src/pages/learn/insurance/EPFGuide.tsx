import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const EPFGuide: React.FC = () => (
  <>
    <SEOHelmet title="EPF Guide: Check PF Balance, Withdrawal Rules, 8.25% Interest India | MoneyCal" description="Complete EPF guide. PF balance check online, withdrawal for house/medical, interest 8.25%, tax rules." keywords="EPF India, PF balance check, EPF withdrawal, employee provident fund, 8.25% interest, EPF गाइड" url="/learn/insurance-retirement/epf-employee-provident-fund-withdrawal-interest-rate-pf-balance-india" />
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-teal-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 6 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">EPF: Employee Provident Fund Guide</h1>
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">✅ EPF Essentials</h2>
          <ul className="space-y-2">
            <li>• Contribution: 12% of basic salary (employer) + 12% (employee) = 24% total saved monthly!</li>
            <li>• Interest: 8.25% p.a. (compounded annually, tax-free if withdrawn after 5 years).</li>
            <li>• Check balance: Login to epfindia.gov.in with UAN (Universal Account Number).</li>
            <li>• Withdrawal: Full withdrawal at retirement. Partial: 90% for house, medical, education.</li>
            <li>• Transfer: When changing jobs, transfer old EPF to new company (don't withdraw early!).</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default EPFGuide;


