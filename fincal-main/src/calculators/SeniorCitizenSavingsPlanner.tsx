import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';

const schemes = [
  { label: 'Senior Citizen Savings Scheme (SCSS)', value: 'scss', rate: 8.2, max: 1500000, tenure: 5 },
  { label: 'Pradhan Mantri Vaya Vandana Yojana (PMVVY)', value: 'pmvvy', rate: 7.4, max: 1500000, tenure: 10 }
];

const SeniorCitizenSavingsPlanner: React.FC = () => {
  const [scheme, setScheme] = useState('scss');
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(schemes[0].rate);
  const [tenure, setTenure] = useState(schemes[0].tenure);
  const [showFAQ, setShowFAQ] = useState(false);

  const selectedScheme = schemes.find(s => s.value === scheme)!;

  // Calculate maturity and interest
  const interest = principal * (rate / 100) * tenure;
  const maturity = principal + interest;
  const taxBenefit = Math.min(principal, 150000); // Section 80C

  return (
    <>
      <SEOHelmet
        title="Senior Citizen Savings Planner - SCSS & PMVVY Calculator | Fincal"
        description="Design savings plans for SCSS or PMVVY with interest and tax benefit projections. Fully mobile-friendly, SEO-optimized, and easy to use."
        keywords="senior citizen savings calculator India, SCSS calculator, PMVVY calculator, senior citizen tax benefit, best savings for seniors"
        url="/calculators/senior-citizen-savings-planner"
        tags={["senior citizen savings", "SCSS calculator", "PMVVY calculator", "tax benefit", "retirement savings"]}
      />
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-2 md:mb-0">Senior Citizen Savings Planner</h1>
          <button
            className="text-sm text-green-700 hover:text-green-900 underline md:ml-4"
            aria-label="Show FAQ"
            onClick={() => setShowFAQ(true)}
          >
            How does this work?
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="scheme-select">Scheme</label>
            <select id="scheme-select" value={scheme} onChange={e => {
              setScheme(e.target.value);
              const s = schemes.find(s => s.value === e.target.value)!;
              setRate(s.rate);
              setTenure(s.tenure);
            }} className="input w-full" aria-label="Select Scheme">
              {schemes.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="principal">Principal (₹)</label>
            <input id="principal" type="number" min="1000" max={selectedScheme.max} value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="input w-full" aria-label="Principal Amount" />
            <p className="text-xs text-gray-500 mt-1">Max: ₹{selectedScheme.max.toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="rate">Interest Rate (%)</label>
            <input id="rate" type="number" min="0" max="20" step="0.01" value={rate} onChange={e => setRate(Number(e.target.value))} className="input w-full" aria-label="Interest Rate" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="tenure">Tenure (years)</label>
            <input id="tenure" type="number" min="1" max="20" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="input w-full" aria-label="Tenure" />
          </div>
          <div className="bg-green-50 rounded-lg p-4 mt-4">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Results</h2>
            <div className="flex flex-col gap-2">
              <div><span className="font-medium">Total Interest:</span> ₹{interest.toLocaleString()}</div>
              <div><span className="font-medium">Maturity Amount:</span> ₹{maturity.toLocaleString()}</div>
              <div><span className="font-medium">Tax Benefit (Sec 80C):</span> ₹{taxBenefit.toLocaleString()}</div>
            </div>
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
              <h3 className="text-xl font-bold mb-4">Senior Citizen Savings Planner FAQ</h3>
              <ul className="list-disc list-inside text-sm text-neutral-700 space-y-2">
                <li><strong>Which schemes are supported?</strong> SCSS and PMVVY.</li>
                <li><strong>Are rates up to date?</strong> Yes, but you can adjust them manually.</li>
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

export default SeniorCitizenSavingsPlanner; 