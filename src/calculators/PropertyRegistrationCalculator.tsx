import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { DollarSign, FileText } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

export const PropertyRegistrationCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [state, setState] = useState<string>('maharashtra');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [includeStampDuty, setIncludeStampDuty] = useState<boolean>(true);
  
  const [stampDuty, setStampDuty] = useState<number>(0);
  const [registrationCharges, setRegistrationCharges] = useState<number>(0);
  const [legalCharges, setLegalCharges] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const stateRateMap: Record<string, { stampResidential: number; stampCommercial: number; registration: number; legalEstimate: number }> = {
    maharashtra: { stampResidential: 5, stampCommercial: 6, registration: 1, legalEstimate: 0.5 },
    karnataka: { stampResidential: 5.6, stampCommercial: 6.6, registration: 1, legalEstimate: 0.6 },
    delhi: { stampResidential: 6, stampCommercial: 7, registration: 1, legalEstimate: 0.6 },
    tamilnadu: { stampResidential: 7, stampCommercial: 7, registration: 1, legalEstimate: 0.7 },
    gujarat: { stampResidential: 4.9, stampCommercial: 5.9, registration: 1, legalEstimate: 0.5 },
  };
  
  useEffect(() => {
    // Calculate registration costs
    const selected = stateRateMap[state] || stateRateMap.maharashtra;
    const stampDutyRate = propertyType === 'residential' ? selected.stampResidential / 100 : selected.stampCommercial / 100;
    const registrationRate = selected.registration / 100;
    const legalRate = selected.legalEstimate / 100;

    const calculatedStampDuty = includeStampDuty ? propertyValue * stampDutyRate : 0;
    const calculatedRegistration = Math.min(propertyValue * registrationRate, 30000);
    const calculatedLegal = Math.min(propertyValue * legalRate, 50000);
    
    setStampDuty(calculatedStampDuty);
    setRegistrationCharges(calculatedRegistration);
    setLegalCharges(calculatedLegal);
    setTotalCost(propertyValue + calculatedStampDuty + calculatedRegistration + calculatedLegal);
  }, [propertyValue, state, propertyType, includeStampDuty]);
  
  const contentData = {
    title: 'Property Registration Charges Calculator India',
    description:
      'Calculate total property registration cost in India including stamp duty, registration charges, and legal cost estimate. Compare state-wise assumptions for a practical home-buying budget.',
    benefits: [
      'Estimate total property registration charges before deal closure',
      'See stamp duty, registration fee, and legal charges separately',
      'Compare residential vs commercial registration cost impact',
      'Use state-level rate assumptions for realistic planning',
      'Helpful for budgeting down payment plus transaction costs',
      'Prevents underestimation of total acquisition outflow',
    ],
    howToSteps: [
      { step: 'Enter property value', details: 'Input agreement value or planning value used for budgeting.' },
      { step: 'Select state and property type', details: 'Rates differ by state and asset category.' },
      { step: 'Choose stamp-duty inclusion', details: 'Toggle to isolate mandatory registration and legal costs.' },
      { step: 'Review breakup and total cost', details: 'Use total to finalize budget and financing requirement.' },
    ],
    examples: [
      {
        scenario: 'Apartment purchase in metro city',
        inputs: [
          { label: 'Property value', value: '₹75,00,000' },
          { label: 'State', value: 'Maharashtra' },
          { label: 'Type', value: 'Residential' },
        ],
        result: 'High stamp duty impact; registration + legal add-on visible clearly',
        explanation: 'This helps buyers plan non-loan costs beyond agreement value.',
      },
      {
        scenario: 'Commercial office unit purchase',
        inputs: [
          { label: 'Property value', value: '₹1,20,00,000' },
          { label: 'State', value: 'Karnataka' },
          { label: 'Type', value: 'Commercial' },
        ],
        result: 'Commercial rates generally push total registration overhead higher',
        explanation: 'Useful for business capital planning and cash-flow scheduling.',
      },
    ],
    tips: [
      'Always check latest state notification before final registration.',
      'Include legal and documentation expenses in pre-purchase budget.',
      'Plan total outflow, not just property agreement value.',
      'Use this estimate before applying home-loan amount.',
      'Maintain a buffer for valuation and document processing delays.',
    ],
    mistakes: [
      'Budgeting only for down payment and ignoring registration costs',
      'Using outdated stamp duty assumptions',
      'Skipping legal verification cost in planning',
      'Not comparing post-registration total affordability',
    ],
    faqs: [
      {
        question: 'What is included in property registration charges?',
        answer:
          'Typical costs include stamp duty, registration fee, and legal/documentation cost. Actual structure varies by state and property type.',
      },
      {
        question: 'Is stamp duty calculated on agreement value or circle rate?',
        answer:
          'In many cases, authorities consider prescribed valuation benchmarks; use conservative assumptions and verify local rules before payment.',
      },
      {
        question: 'Can registration charges affect loan planning?',
        answer:
          'Yes. Registration outflow is usually separate from sanctioned loan amount, so it should be planned as upfront cash requirement.',
      },
    ],
    relatedCalculators: [
      { name: 'Stamp Duty Calculator', url: '/calculators/stamp-duty-calculator', description: 'Check stamp duty specifically' },
      { name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator', description: 'Estimate EMI and loan burden' },
      { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'Compare tenure and monthly repayment' },
    ],
    lastUpdated: '2026-02-12',
  };

  return (
    <>
      <SEOHelmet
        title="Property Registration Charges Calculator India 2026 | MoneyCal"
        description="Property registration charges calculator for India to estimate stamp duty, registration fees, and legal costs with state-wise assumptions."
        keywords="property registration charges calculator india, stamp duty and registration fee calculator, state wise property registration charges india, home registration cost calculator india, property transfer charges calculator"
        url="/calculators/property-registration-charges-calculator"
      />
      <CalculatorSchema
        name="Property Registration Charges Calculator India"
        description="Estimate stamp duty, registration fees, legal charges, and total property transaction cost."
        url="/calculators/property-registration-charges-calculator"
        features={[
          'Stamp duty estimate',
          'Registration fee estimate',
          'Legal charge estimate',
          'Residential vs commercial mode',
          'State-wise assumptions',
          'Total acquisition cost summary',
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-12"
        rating={{ value: 4.8, count: 7410 }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[--primary-600]" />
          Registration Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="property-value" className="text-sm font-medium text-neutral-700">
                Property Value (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(propertyValue)}
              </span>
            </div>
            <input 
              type="range" 
              id="property-value"
              min="1000000" 
              max="50000000" 
              step="100000" 
              value={propertyValue} 
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input"
            >
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="delhi">Delhi</option>
              <option value="tamilnadu">Tamil Nadu</option>
              <option value="gujarat">Gujarat</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Property Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  propertyType === 'residential'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPropertyType('residential')}
              >
                Residential
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  propertyType === 'commercial'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPropertyType('commercial')}
              >
                Commercial
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-stamp-duty"
              checked={includeStampDuty}
              onChange={(e) => setIncludeStampDuty(e.target.checked)}
              className="rounded border-neutral-300 text-[--primary-600] focus:ring-[--primary-500]"
            />
            <label htmlFor="include-stamp-duty" className="text-sm font-medium text-neutral-700">
              Include Stamp Duty in Calculation
            </label>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Registration Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Registration Cost</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalCost)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Additional Charges</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatCurrency(stampDuty + registrationCharges + legalCharges)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <DollarSign className="w-5 h-5 mr-2 text-[--primary-600]" />
            Cost Breakup
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Charges Breakup</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Property Value</span>
                  <span className="font-medium">{formatCurrency(propertyValue)}</span>
                </div>
                {includeStampDuty && (
                  <div className="flex justify-between">
                    <span>Stamp Duty</span>
                    <span className="font-medium">{formatCurrency(stampDuty)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Registration Charges</span>
                  <span className="font-medium">{formatCurrency(registrationCharges)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Legal Charges</span>
                  <span className="font-medium">{formatCurrency(legalCharges)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span className="font-medium">Total Cost</span>
                  <span className="font-medium">{formatCurrency(totalCost)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Required Documents</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Sale Deed / Agreement</li>
                <li>Property Title Documents</li>
                <li>Identity Proof</li>
                <li>Address Proof</li>
                <li>PAN Card</li>
                <li>Photographs</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Registration must be done within 4 months of execution</li>
                <li>All parties must be present during registration</li>
                <li>Carry original documents for verification</li>
                <li>Payment modes may vary by state</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 mt-12">
        <CalculatorContentWrapper {...contentData} />
      </div>
    </>
  );
};