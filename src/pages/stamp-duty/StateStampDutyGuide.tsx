import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { Home, IndianRupee, FileText } from 'lucide-react';

const StateStampDutyGuide: React.FC = () => {
  const { state } = useParams();
  const s = String(state || '').toLowerCase();
  const title = `Stamp Duty Guide — ${s.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}`;
  const description = `Comprehensive stamp duty and registration charges guide for ${title}. Includes concessions, document types, local cess, and calculator integration.`;
  return (
    <div className="space-y-6">
      <SEOHelmet
        title={`${title} | MoneyCal India`}
        description={description}
        keywords={[
          'stamp duty',
          'registration charges',
          s,
          'property registration',
          'local cess',
          'women concession',
          'sale deed',
          'gift deed'
        ]}
        url={`/stamp-duty/state/${s}`}
        image="/images/calculator-default.jpg"
        type="article"
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 flex items-center">
          <Home className="w-6 h-6 mr-2 text-[--primary-600]" />
          {title}
        </h1>
        <Link to="/calculators/stamp-duty-calculator" className="px-4 py-2 rounded bg-[--primary-600] hover:bg-[--primary-700] text-white text-sm">
          Open Calculator
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[--primary-600]" />
              Overview
            </h2>
            <p className="text-neutral-700 text-sm">
              This guide explains typical stamp duty ranges, registration charges, and local municipal cess applicable in {title}. Actual rates depend on property type, document classification, ownership, and location-specific surcharges.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Indicative Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-left text-sm">
                <thead>
                  <tr>
                    <th className="border px-3 py-2">Category</th>
                    <th className="border px-3 py-2">{title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">Residential Duty</td>
                    <td className="border px-3 py-2">~4–7% (varies)</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Commercial Duty</td>
                    <td className="border px-3 py-2">~6–8% (varies)</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Registration</td>
                    <td className="border px-3 py-2">~1% (caps may apply)</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Local Cess</td>
                    <td className="border px-3 py-2">City/local body specific</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2 flex items-center">
              <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
              Indicative Ranges
            </h2>
            <ul className="list-disc list-inside text-sm text-neutral-700 space-y-2">
              <li>Residential: typically 4–7% depending on concessions</li>
              <li>Commercial: typically 6–8% depending on usage</li>
              <li>Registration charges: around 1% with caps as applicable</li>
              <li>Local cess: varies by city or local body</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Concessions</h2>
            <ul className="list-disc list-inside text-sm text-neutral-700 space-y-2">
              <li>Women buyers may receive reduced rates in certain scenarios</li>
              <li>Joint ownership can lead to partial concessions depending on rules</li>
              <li>Gift deed and lease classifications often carry different duty slabs</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Examples</h2>
            <div className="space-y-2 text-sm text-neutral-700">
              <div>
                Residential sale deed with women ownership:
                <Link className="ml-2 text-[--primary-700] hover:underline" to={`/calculators/stamp-duty-calculator?mode=property&state=${s}&propertyType=residential&documentType=sale&ownership=female&propertyValue=5000000`}>
                  Try this scenario
                </Link>
              </div>
              <div>
                Commercial lease in a major city:
                <Link className="ml-2 text-[--primary-700] hover:underline" to={`/calculators/stamp-duty-calculator?mode=property&state=${s}&propertyType=commercial&documentType=lease&ownership=male&propertyValue=8000000&selectedCity=${encodeURIComponent('City')}&localCess=1`}>
                  Try this scenario
                </Link>
              </div>
              <div>
                Pre-filled state and city cess:
                <Link className="ml-2 text-[--primary-700] hover:underline" to={`/calculators/stamp-duty-calculator?mode=property&state=${s}&selectedCity=${encodeURIComponent('City')}&localCess=1&propertyValue=6000000`}>
                  Try this scenario
                </Link>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Use the Calculator</h2>
            <p className="text-neutral-700 text-sm">
              To obtain an indicative total cost, use the linked calculator. Select state, property type, document type, and ownership. You can also apply a city/local-body cess preset and export a summary as PDF or share a link.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-[--primary-700] hover:underline" to="/calculators/stamp-duty-calculator">Stamp Duty Calculator</Link></li>
              <li><Link className="text-[--primary-700] hover:underline" to={`/calculators/stamp-duty-calculator?mode=property&state=${s}`}>Pre-fill State</Link></li>
              <li><Link className="text-[--primary-700] hover:underline" to="/calculators/property-calculator">Property Calculator</Link></li>
              <li><Link className="text-[--primary-700] hover:underline" to="/calculators/home-loan-emi-calculator">Home Loan EMI</Link></li>
              <li><Link className="text-[--primary-700] hover:underline" to="/calculators/hra-calculator">HRA Calculator</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-sm text-gray-500">
        No Short Code Provided.
      </div>
    </div>
  );
};

export default StateStampDutyGuide;
