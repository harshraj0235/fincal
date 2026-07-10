import React from 'react';
import GSTR3BDeadlineCalculator from '../../calculators/GSTR3BDeadlineCalculator';
import SEOHelmet from '../../components/SEOHelmet';

const GSTR3BDeadlineCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GSTR-3B Filing Deadline Calculator India 2026 | QRMP and Late Fee | MoneyCal"
        description="Monitor GSTR-3B due dates with QRMP logic, late fee, and interest estimation for GST filing compliance planning."
        keywords="gstr-3b filing deadline calculator india, gstr3b due date qrmp checker, gstr 3b late fee calculator, gst return interest calculator india, pmt-06 due date tool"
        url="/tools/gstr-3b-deadline-calculator"
        image="/images/gstr-3b-deadline-calculator-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GSTR-3B Deadline Calculator",
          "description": "Calculate GSTR-3B filing deadlines with penalty and interest calculations. Supports monthly and QRMP scheme taxpayers.",
          "url": "/gst-tools/gstr-3b-deadline-calculator",
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
            "Calculate GSTR-3B filing deadlines",
            "Support for monthly and QRMP scheme",
            "Late filing penalty calculation",
            "Interest calculation on delayed payment",
            "Turnover-based eligibility check",
            "QRMP due date automation",
            "Real-time deadline tracking",
            "Calculation history"
          ]
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://moneycal.in' },
          { name: 'GST Tools', url: '/gst-tools' },
          { name: 'GSTR-3B Deadline Calculator', url: '/gst-tools/gstr-3b-deadline-calculator' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <GSTR3BDeadlineCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTR3BDeadlineCalculatorPage;
export { GSTR3BDeadlineCalculatorPage };
