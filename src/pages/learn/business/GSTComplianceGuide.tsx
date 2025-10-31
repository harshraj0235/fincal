import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const GSTComplianceGuide: React.FC = () => (
  <>
    <SEOHelmet title="GST Compliance India: Registration Filing Returns Input Credit Composition Scheme 2025 | MoneyCal" description="Complete GST guide. GST registration (mandatory if turnover &gt; ₹40L), GSTR-1/3B filing, input tax credit, composition scheme (turnover <₹1.5Cr), penalties." keywords="GST compliance India, GSTR filing, input tax credit, composition scheme, GST registration, GST अनुपालन" url="/learn/business-finance-entrepreneurship/gst-compliance-india-registration-filing-returns-input-credit-composition-scheme-2025" />
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-orange-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 4 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">GST Compliance: Avoid Penalties, Claim Input Credit!</h1>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">📋 GST Registration (Mandatory if turnover &gt; ₹40L)</h2>
          <ul className="space-y-2 text-sm">
            <li>• Turnover &gt; ₹40L (₹20L for special category states) → GST registration mandatory</li>
            <li>• <strong>GSTR-1:</strong> File by 11th of next month (sales details). Penalty: ₹200/day if late.</li>
            <li>• <strong>GSTR-3B:</strong> File by 20th of next month (summary return + tax payment). Penalty: ₹50/day + 18% interest on unpaid tax.</li>
            <li>• <strong>Input Tax Credit (ITC):</strong> GST paid on purchases can offset GST collected on sales. Example: Paid ₹18K GST on ₹1L raw materials, collected ₹36K GST on ₹2L sales → Pay only ₹18K (₹36K - ₹18K) to govt!</li>
            <li>• <strong>Composition Scheme:</strong> For turnover &lt; ₹1.5Cr. Pay flat 1-6% tax (no ITC benefit). Simple quarterly filing.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default GSTComplianceGuide;


