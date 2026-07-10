import React from 'react';
import ReverseGSTCalculator from '../../calculators/ReverseGSTCalculator';
import SEOHelmet from '../../components/SEOHelmet';

const ReverseGSTCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Reverse GST Calculator India 2025 - Calculate Base Amount from GST Inclusive Price"
        description="Free reverse GST Calculator for India. Calculate base amount from GST inclusive price. Separate CGST, SGST, IGST components. Perfect for invoice analysis and tax calculations. Updated for 2025."
        keywords="reverse GST Calculator, GST inclusive Calculator, base amount Calculator, GST separation Calculator, CGST SGST Calculator, IGST Calculator, GST reverse calculation, GST exclusive Calculator, GST component separation, invoice GST Calculator, GST tax separation, GST breakdown calculator"
        url="/gst-tools/reverse-gst-calculator"
        image="/images/reverse-gst-calculator-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Reverse GST Calculator",
          "description": "Free reverse GST Calculator for India. Calculate base amount from GST inclusive price. Separate CGST, SGST, IGST components.",
          "url": "/gst-tools/reverse-gst-calculator",
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
            "Calculate base amount from GST inclusive price",
            "Separate GST components (CGST, SGST, IGST)",
            "Support for all GST rates",
            "Intra-state and inter-state transaction support",
            "Quick examples for common scenarios",
            "Verification of calculations",
            "Calculation history tracking",
            "Real-time updates"
          ]
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://moneycal.in' },
          { name: 'GST Tools', url: '/gst-tools' },
          { name: 'Reverse GST Calculator', url: '/gst-tools/reverse-gst-calculator' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <ReverseGSTCalculator />
        </div>
      </div>
    </>
  );
};

export default ReverseGSTCalculatorPage;
export { ReverseGSTCalculatorPage };
