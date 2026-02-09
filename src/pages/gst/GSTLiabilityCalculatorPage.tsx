import React from 'react';
import GSTLiabilityCalculator from '../../calculators/GSTLiabilityCalculator';
import SEOHelmet from '../../components/SEOHelmet';

const GSTLiabilityCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GST Liability Calculator India 2025 - Calculate Net GST Payment with ITC Adjustment"
        description="Free GST liability calculator. Calculate net GST payment after ITC adjustment, TDS, TCS deductions. Find cash liability or refund amount. Updated for 2025 with comprehensive calculations."
        keywords="GST liability calculator, net GST calculator, ITC adjustment calculator, GST payment calculator, output tax calculator, input tax credit calculator, GST cash liability, GST refund calculator, TDS TCS adjustment, reverse charge calculator, GST 3B calculator"
        url="https://moneycal.in/gst-tools/gst-liability-calculator"
        image="https://moneycal.in/images/gst-liability-calculator-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GST Liability Calculator",
          "description": "Calculate net GST liability after ITC adjustment, TDS, TCS deductions. Find cash payment requirement or refund amount.",
          "url": "https://moneycal.in/gst-tools/gst-liability-calculator",
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
          { name: 'GST Tools', url: 'https://moneycal.in/gst-tools' },
          { name: 'GST Liability Calculator', url: 'https://moneycal.in/gst-tools/gst-liability-calculator' }
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
