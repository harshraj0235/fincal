import React from 'react';
import GSTLiabilityCalculator from '../../calculators/GSTLiabilityCalculator';
import SEOHelmet from '../../components/SEOHelmet';

const GSTLiabilityCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GST Liability Calculator India 2025 - Calculate Net GST Payment with ITC Adjustment"
        description="Free GST liability calculator. Calculate net GST payment after ITC adjustment, TDS, TCS deductions. Find cash liability or refund amount. Updated for 2025 with comprehensive calculations."
        keywords="GST liability Calculator, net GST Calculator, ITC adjustment Calculator, GST payment Calculator, output tax Calculator, input tax credit Calculator, GST cash liability, GST refund Calculator, TDS TCS adjustment, reverse charge Calculator, GST 3B calculator"
        url="/gst-tools/gst-liability-calculator"
        image="/images/gst-liability-calculator-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GST Liability Calculator",
          "description": "Calculate net GST liability after ITC adjustment, TDS, TCS deductions. Find cash payment requirement or refund amount.",
          "url": "/gst-tools/gst-liability-calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          },
          "creator": {
            "@type": "Organization",
            "name": "MoneyCal",
            "url": "https://moneycal.in"
          },
          "featureList": [
            "Calculate net GST liability",
            "ITC utilization calculation",
            "TDS and TCS adjustment",
            "Reverse charge tax support",
            "Cash payment calculation",
            "Refund amount determination",
            "ITC efficiency analysis",
            "Real-time calculations"
          ]
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://moneycal.in' },
          { name: 'GST Tools', url: '/gst-tools' },
          { name: 'GST Liability Calculator', url: '/gst-tools/gst-liability-calculator' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <GSTLiabilityCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTLiabilityCalculatorPage;
export { GSTLiabilityCalculatorPage };
