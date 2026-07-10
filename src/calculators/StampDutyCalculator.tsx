import React, { useState, useMemo } from 'react';
import SEOHelmet from '../components/SEOHelmet';

// State-wise stamp duty and registration charge data for India
const stateData: Record<string, { stampDutyMale: number; stampDutyFemale: number; stampDutyJoint: number; registration: number; notes: string }> = {
  'Delhi': { stampDutyMale: 6, stampDutyFemale: 4, stampDutyJoint: 5, registration: 1, notes: 'Women get 2% lower stamp duty. 1% registration charge.' },
  'Maharashtra': { stampDutyMale: 6, stampDutyFemale: 5, stampDutyJoint: 6, registration: 1, notes: 'Mumbai has additional 1% metro cess. Women save 1% on stamp duty.' },
  'Karnataka': { stampDutyMale: 5, stampDutyFemale: 5, stampDutyJoint: 5, registration: 1, notes: 'Flat 5% for all. Extra surcharge of 2% in BBMP limits.' },
  'Tamil Nadu': { stampDutyMale: 7, stampDutyFemale: 7, stampDutyJoint: 7, registration: 4, notes: 'Highest combined charges at 11%. No gender-based concession.' },
  'Uttar Pradesh': { stampDutyMale: 7, stampDutyFemale: 6, stampDutyJoint: 7, registration: 1, notes: 'Women get 1% concession. Registration is 1% of property value.' },
  'Rajasthan': { stampDutyMale: 6, stampDutyFemale: 5, stampDutyJoint: 5.5, registration: 1, notes: 'Women get 1% concession. Registration charge is 1%.' },
  'Gujarat': { stampDutyMale: 4.9, stampDutyFemale: 4.9, stampDutyJoint: 4.9, registration: 1, notes: 'Among the lowest in India. No gender benefit.' },
  'Telangana': { stampDutyMale: 5, stampDutyFemale: 5, stampDutyJoint: 5, registration: 0.5, notes: 'Hyderabad properties may have higher circle rates. Low registration.' },
  'West Bengal': { stampDutyMale: 6, stampDutyFemale: 6, stampDutyJoint: 6, registration: 1, notes: 'Additional 1% for properties in Kolkata. No gender concession.' },
  'Madhya Pradesh': { stampDutyMale: 7.5, stampDutyFemale: 6, stampDutyJoint: 7, registration: 3, notes: 'One of the highest. Women get 1.5% discount.' },
  'Punjab': { stampDutyMale: 7, stampDutyFemale: 5, stampDutyJoint: 6, registration: 1, notes: 'Women get 2% concession. Urban areas may vary.' },
  'Haryana': { stampDutyMale: 7, stampDutyFemale: 5, stampDutyJoint: 6, registration: 1, notes: 'Women get 2% discount. Gurugram circle rates higher.' },
  'Kerala': { stampDutyMale: 8, stampDutyFemale: 8, stampDutyJoint: 8, registration: 2, notes: 'Highest stamp duty in India. No gender-based concession.' },
  'Bihar': { stampDutyMale: 6, stampDutyFemale: 5.5, stampDutyJoint: 6, registration: 2, notes: 'Women get 0.5% concession. Registration is 2%.' },
  'Odisha': { stampDutyMale: 5, stampDutyFemale: 4, stampDutyJoint: 5, registration: 1, notes: 'Women save 1%. One of the more affordable states.' },
  'Jharkhand': { stampDutyMale: 4, stampDutyFemale: 3, stampDutyJoint: 3.5, registration: 3, notes: 'Lowest stamp duty but high registration charges.' },
  'Chhattisgarh': { stampDutyMale: 5, stampDutyFemale: 4, stampDutyJoint: 5, registration: 4, notes: 'Women get 1% discount. High registration charges.' },
  'Assam': { stampDutyMale: 8.25, stampDutyFemale: 8.25, stampDutyJoint: 8.25, registration: 3, notes: 'Very high combined charges. No gender concession.' },
  'Goa': { stampDutyMale: 3.5, stampDutyFemale: 3, stampDutyJoint: 3.5, registration: 1, notes: 'Among the lowest. Women get 0.5% concession.' },
  'Himachal Pradesh': { stampDutyMale: 6, stampDutyFemale: 4, stampDutyJoint: 5, registration: 2, notes: 'Women get 2% concession in hill state.' },
  'Uttarakhand': { stampDutyMale: 5, stampDutyFemale: 3.75, stampDutyJoint: 5, registration: 2, notes: 'Women get 1.25% discount. Dehradun rates higher.' },
  'Andhra Pradesh': { stampDutyMale: 5, stampDutyFemale: 5, stampDutyJoint: 5, registration: 0.5, notes: 'Low registration charge. Flat stamp duty.' },
};

const stateNames = Object.keys(stateData).sort();

export const StampDutyCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [gender, setGender] = useState<string>('male');

  const calculations = useMemo(() => {
    const state = stateData[selectedState];
    if (!state) return null;

    let stampDutyRate: number;
    if (gender === 'female') stampDutyRate = state.stampDutyFemale;
    else if (gender === 'joint') stampDutyRate = state.stampDutyJoint;
    else stampDutyRate = state.stampDutyMale;

    const stampDutyAmount = Math.round((propertyValue * stampDutyRate) / 100);
    const registrationAmount = Math.round((propertyValue * state.registration) / 100);
    const totalCost = stampDutyAmount + registrationAmount;
    const totalPropertyCost = propertyValue + totalCost;

    return {
      stampDutyRate,
      stampDutyAmount,
      registrationRate: state.registration,
      registrationAmount,
      totalCost,
      totalPropertyCost,
      notes: state.notes
    };
  }, [propertyValue, selectedState, gender]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SEOHelmet
        title="Stamp Duty Calculator 2026 — All Indian States"
        description="Calculate exact stamp duty and registration charges for property purchase in all Indian states. Compare rates for men, women, and joint registration. Updated 2026."
        canonicalUrl="https://moneycal.in/tools/stamp-duty-calculator"
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stamp Duty & Registration Charges Calculator</h1>
        <p className="text-gray-600">Find the exact stamp duty and registration charges you'll pay when buying property in any Indian state. Women buyers often get discounts!</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Input Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#fdf4ff] border border-[#e9d5ff] rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#6b21a8] border-b border-[#e9d5ff] pb-2">Property Details</h2>

            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-[#f3e8ff]">
                  <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="propertyValue">Property Value (₹)</label></td>
                  <td className="py-3">
                    <input
                      id="propertyValue"
                      type="number"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#9333ea]"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#f3e8ff]">
                  <td className="py-3 pr-2 font-medium"><label htmlFor="state">State</label></td>
                  <td className="py-3">
                    <select
                      id="state"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-[#9333ea]"
                    >
                      {stateNames.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-2 font-medium"><label>Buyer Gender</label></td>
                  <td className="py-3">
                    <div className="flex gap-3 flex-wrap">
                      {[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'joint', label: 'Joint' }].map((opt) => (
                        <label key={opt.value} className={`flex items-center gap-1 px-3 py-1.5 rounded border cursor-pointer text-sm ${gender === opt.value ? 'bg-[#9333ea] text-white border-[#9333ea]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                          <input type="radio" name="gender" value={opt.value} checked={gender === opt.value} onChange={(e) => setGender(e.target.value)} className="sr-only" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Results */}
        <div className="w-full md:w-1/2">
          {calculations && (
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[#6b21a8] border-b border-gray-200 pb-2">Cost Breakup — {selectedState}</h2>

              <div className="bg-[#fdf4ff] p-4 rounded-lg mb-4 text-center border border-[#e9d5ff]">
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Extra Cost on Purchase</p>
                <p className="text-4xl font-bold text-[#6b21a8] my-1">{formatCurrency(calculations.totalCost)}</p>
                <p className="text-xs text-gray-500">{((calculations.totalCost / propertyValue) * 100).toFixed(1)}% of property value</p>
              </div>

              <table className="w-full text-left text-sm mt-4 border-collapse">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">Property Value:</td>
                    <td className="py-2 font-semibold text-right">{formatCurrency(propertyValue)}</td>
                  </tr>
                  <tr className="border-b border-gray-100 text-red-600">
                    <td className="py-2 pl-2 text-sm">+ Stamp Duty ({calculations.stampDutyRate}%):</td>
                    <td className="py-2 text-right">{formatCurrency(calculations.stampDutyAmount)}</td>
                  </tr>
                  <tr className="border-b border-gray-100 text-red-600">
                    <td className="py-2 pl-2 text-sm">+ Registration ({calculations.registrationRate}%):</td>
                    <td className="py-2 text-right">{formatCurrency(calculations.registrationAmount)}</td>
                  </tr>
                  <tr className="font-bold text-[#6b21a8] bg-[#fdf4ff]">
                    <td className="py-3 px-1 rounded-l">Total Cost to Buy Property:</td>
                    <td className="py-3 px-1 text-right rounded-r">{formatCurrency(calculations.totalPropertyCost)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 border-l-4 border-[#9333ea]">
                <strong>Note for {selectedState}:</strong> {calculations.notes}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* State-wise Comparison Table */}
      <div className="mt-12 overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Stamp Duty & Registration Charges — All States Comparison (2026)</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">State</th>
              <th className="border border-gray-300 p-2 text-center">Male (%)</th>
              <th className="border border-gray-300 p-2 text-center">Female (%)</th>
              <th className="border border-gray-300 p-2 text-center">Joint (%)</th>
              <th className="border border-gray-300 p-2 text-center">Registration (%)</th>
              <th className="border border-gray-300 p-2 text-center">Total (Male)</th>
            </tr>
          </thead>
          <tbody>
            {stateNames.map((s) => {
              const d = stateData[s];
              return (
                <tr key={s} className={s === selectedState ? 'bg-purple-50 font-semibold' : 'hover:bg-gray-50'}>
                  <td className="border border-gray-300 p-2">{s}</td>
                  <td className="border border-gray-300 p-2 text-center">{d.stampDutyMale}%</td>
                  <td className="border border-gray-300 p-2 text-center">{d.stampDutyFemale}%</td>
                  <td className="border border-gray-300 p-2 text-center">{d.stampDutyJoint}%</td>
                  <td className="border border-gray-300 p-2 text-center">{d.registration}%</td>
                  <td className="border border-gray-300 p-2 text-center font-bold">{d.stampDutyMale + d.registration}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SEO Content */}
      <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
        <h2>What is Stamp Duty?</h2>
        <p>
          Stamp duty is a tax levied by the state government on property transactions. When you buy a house, flat, plot, or any immovable property, you must pay stamp duty and registration charges to legally transfer ownership. Without paying stamp duty, the sale deed is not legally valid and cannot be registered.
        </p>

        <h3>How to Save Money on Stamp Duty</h3>
        <ol>
          <li><strong>Register in a Woman's Name:</strong> States like Delhi, Haryana, Punjab, and Rajasthan offer 1-2% concession for women buyers. On a ₹50 lakh property, that's ₹50,000 to ₹1,00,000 saved!</li>
          <li><strong>Claim Under Section 80C:</strong> Stamp duty and registration charges (up to ₹1.5 lakh) can be claimed as a tax deduction under Section 80C of the Income Tax Act.</li>
          <li><strong>Buy During Government Rebate Periods:</strong> States like Maharashtra periodically announce stamp duty reductions (e.g., the COVID-era 2-3% reduction in 2020-21).</li>
          <li><strong>Under-Construction vs Ready:</strong> Stamp duty on under-construction properties can sometimes be lower since the land component is valued differently.</li>
        </ol>

        <h3>Stamp Duty vs Registration Charges — What's the Difference?</h3>
        <table className="w-full border-collapse border border-gray-300 my-4 text-left text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Feature</th>
              <th className="border border-gray-300 p-2">Stamp Duty</th>
              <th className="border border-gray-300 p-2">Registration Charges</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">What is it?</td>
              <td className="border border-gray-300 p-2">Tax on the property transaction document</td>
              <td className="border border-gray-300 p-2">Fee to register the document with the Sub-Registrar</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Varies by?</td>
              <td className="border border-gray-300 p-2">State, gender, property type, location</td>
              <td className="border border-gray-300 p-2">Usually fixed % by state</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Tax Deductible?</td>
              <td className="border border-gray-300 p-2">Yes, under Section 80C (up to ₹1.5 lakh)</td>
              <td className="border border-gray-300 p-2">Yes, under Section 80C (combined limit)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
