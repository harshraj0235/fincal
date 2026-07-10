import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';

const schemes = [
  { label: 'Mudra Loan', value: 'mudra', minTurnover: 0, minYears: 0, collateral: false },
  { label: 'CGTMSE', value: 'cgtmse', minTurnover: 1000000, minYears: 1, collateral: false }
];

const MSMELoanEligibilityChecker: React.FC = () => {
  const [scheme, setScheme] = useState('mudra');
  const [businessType, setBusinessType] = useState('Proprietorship');
  const [turnover, setTurnover] = useState(500000);
  const [years, setYears] = useState(1);
  const [collateral, setCollateral] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const selectedScheme = schemes.find(s => s.value === scheme)!;

  // Eligibility logic
  const eligible =
    turnover >= selectedScheme.minTurnover &&
    years >= selectedScheme.minYears &&
    (!selectedScheme.collateral || collateral === true);

  return (
    <>
      <SEOHelmet
        title="MSME Loan Eligibility Checker - Mudra & CGTMSE | Fincal"
        description="Assess loan eligibility for Indian MSMEs under schemes like Mudra or CGTMSE. Fully mobile-friendly, SEO-optimized, and easy to use."
        keywords="msme loan eligibility Calculator India, mudra loan eligibility, cgtmse eligibility, msme loan checker, business loan India"
        url="/calculators/msme-loan-eligibility"
        tags={["msme loan eligibility", "mudra loan", "cgtmse", "business loan", "msme checker"]}
      />
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-2 md:mb-0">MSME Loan Eligibility Checker</h1>
          <button
            className="text-sm text-blue-700 hover:text-blue-900 underline md:ml-4"
            aria-label="Show FAQ"
            onClick={() => setShowFAQ(true)}
          >
            How does this work?
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="scheme-select">Scheme</label>
            <select id="scheme-select" value={scheme} onChange={e => setScheme(e.target.value)} className="input w-full" aria-label="Select Scheme">
              {schemes.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="business-type">Business Type</label>
            <input id="business-type" type="text" value={businessType} onChange={e => setBusinessType(e.target.value)} className="input w-full" aria-label="Business Type" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="turnover">Annual Turnover (₹)</label>
            <input id="turnover" type="number" min="0" value={turnover} onChange={e => setTurnover(Number(e.target.value))} className="input w-full" aria-label="Annual Turnover" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="years">Years in Operation</label>
            <input id="years" type="number" min="0" value={years} onChange={e => setYears(Number(e.target.value))} className="input w-full" aria-label="Years in Operation" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="collateral">Collateral Available?</label>
            <input id="collateral" type="checkbox" checked={collateral} onChange={e => setCollateral(e.target.checked)} className="ml-2" aria-label="Collateral Available" />
          </div>
          <div className="bg-blue-50 rounded-lg p-4 mt-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Eligibility Result</h2>
            {eligible ? (
              <div className="text-green-700 font-medium">You are likely eligible for the selected scheme.</div>
            ) : (
              <div className="text-red-700 font-medium">You may not be eligible for the selected scheme. Please check the requirements.</div>
            )}
          </div>
        </div>
        {/* FAQ Modal */}
        {showFAQ && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700"
                aria-label="Close FAQ"
                onClick={() => setShowFAQ(false)}
              >
                ×
              </button>
              <h3 className="text-xl font-bold mb-4">MSME Loan Eligibility Checker FAQ</h3>
              <ul className="list-disc list-inside text-sm text-neutral-700 space-y-2">
                <li><strong>Which schemes are supported?</strong> Mudra and CGTMSE.</li>
                <li><strong>Are results guaranteed?</strong> No, this is a guidance tool. Please check with your bank for final eligibility.</li>
                <li><strong>Is my data saved?</strong> No, all calculations are done in your browser and not stored.</li>
                <li><strong>Is this tool free?</strong> 100% free for all users.</li>
                <li><strong>Is this mobile-friendly?</strong> Yes, fully responsive and easy to use on any device.</li>
                <li><strong>Where can I get more help?</strong> See the info and notes sections below, or contact us via the site.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MSMELoanEligibilityChecker; 