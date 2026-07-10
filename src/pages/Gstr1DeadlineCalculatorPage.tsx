import React from 'react';
import Gstr1DeadlineCalculator from '../calculators/Gstr1DeadlineCalculator';
import SEOHelmet from '../components/SEOHelmet';

const Gstr1DeadlineCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GSTR-1 Filing Deadline Calculator India 2026 | Late Fee and Interest | MoneyCal"
        description="Track GSTR-1 due dates, late fee, and interest exposure with monthly and quarterly filing support for Indian GST taxpayers."
        keywords="gstr-1 filing deadline calculator india, gstr 1 due date checker, gst return late fee calculator gstr1, gstr1 interest calculator india, monthly quarterly gstr1 due date tool"
        url="/tools/gstr-1-deadline-calculator"
        image="/images/gstr-1-deadline-calculator-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GSTR-1 Filing Deadline Calculator",
          "description": "Track GSTR-1 due dates and estimate late fee and interest risk for delayed filing.",
          "url": "/tools/gstr-1-deadline-calculator",
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
            "Calculate GSTR-1 filing deadline",
            "Calculate late filing penalties",
            "Calculate interest on late payment",
            "Monthly and quarterly filing support",
            "Real-time penalty calculation",
            "GST compliance guidance"
          ]
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://moneycal.in' },
          { name: 'Tools', url: '/tools' },
          { name: 'GSTR-1 Deadline Calculator', url: '/tools/gstr-1-deadline-calculator' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Gstr1DeadlineCalculator />
        </div>
      </div>
    </>
  );
};

export default Gstr1DeadlineCalculatorPage;
export { Gstr1DeadlineCalculatorPage };
