import React, { useState, useMemo } from 'react';
import { Home, Calculator, FileText } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const PropertyCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [state, setState] = useState('maharashtra');

  const stampDutyRates: { [key: string]: number } = {
    maharashtra: 5,
    delhi: 6,
    karnataka: 5,
    tamilnadu: 7,
    gujarat: 4.9,
    rajasthan: 6,
    westbengal: 6,
    telangana: 4
  };

  const calculations = useMemo(() => {
    const stampDuty = (propertyValue * stampDutyRates[state]) / 100;
    const registrationFee = propertyValue * 0.01; // 1%
    const totalCost = propertyValue + stampDuty + registrationFee;

    return {
      stampDuty: Math.round(stampDuty),
      registrationFee: Math.round(registrationFee),
      totalCost: Math.round(totalCost)
    };
  }, [propertyValue, state]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <>
      <SEOHelmet
        title="Property Registration Calculator - Stamp Duty Calculator India | MoneyCal"
        description="Calculate property registration charges, stamp duty for all states in India. Get total cost of property purchase including registration fees."
        keywords="property registration calculator, stamp duty calculator India, property purchase cost, registration charges calculator"
        canonicalUrl="https://moneycal.in/calculators/property-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-black text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            🏘️ Property Registration Calculator
          </h1>
          <p className="text-center text-xl text-gray-700 mb-12">Calculate stamp duty & registration charges</p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
              <div>
                <label className="block font-semibold mb-2">Property Value</label>
                <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl font-bold" />
                <input type="range" min="1000000" max="50000000" step="100000" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full mt-2" />
              </div>

              <div>
                <label className="block font-semibold mb-2">State</label>
                <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 border-2 rounded-xl font-bold">
                  <option value="maharashtra">Maharashtra (5%)</option>
                  <option value="delhi">Delhi (6%)</option>
                  <option value="karnataka">Karnataka (5%)</option>
                  <option value="tamilnadu">Tamil Nadu (7%)</option>
                  <option value="gujarat">Gujarat (4.9%)</option>
                  <option value="rajasthan">Rajasthan (6%)</option>
                  <option value="westbengal">West Bengal (6%)</option>
                  <option value="telangana">Telangana (4%)</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Total Cost</h2>
                <div className="text-5xl font-black">{formatCurrency(calculations.totalCost)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <p className="text-sm text-gray-600 mb-1">Stamp Duty</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(calculations.stampDuty)}</p>
                  <p className="text-xs text-gray-500">{stampDutyRates[state]}% of value</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <p className="text-sm text-gray-600 mb-1">Registration</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(calculations.registrationFee)}</p>
                  <p className="text-xs text-gray-500">1% of value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCalculator;

