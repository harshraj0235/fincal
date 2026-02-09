import React from 'react';
import GSTAmountCalculator from '../../calculators/GSTAmountCalculator';
import SEOHelmet from '../../components/SEOHelmet';

const GSTAmountCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GST Amount Calculator India 2025 - Calculate GST, CGST, SGST, IGST with Discount Support"
        description="Free GST amount calculator for India. Calculate GST, CGST, SGST, IGST on any amount with discount support. Intra-state and inter-state transactions. Updated for 2025 GST rates with advanced features."
        keywords="GST amount calculator, GST calculator, CGST calculator, SGST calculator, IGST calculator, GST calculation, GST rate calculator, GST tax calculator, GST inclusive calculator, GST exclusive calculator, GST discount calculator, intra state GST, inter state GST, GST 2025, GST rates India"
        url="https://moneycal.in/gst-tools/gst-amount-calculator"
        image="https://moneycal.in/images/gst-amount-calculator-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GST Amount Calculator",
          "description": "Free GST amount calculator for India. Calculate GST, CGST, SGST, IGST on any amount with discount support.",
          "url": "https://moneycal.in/gst-tools/gst-amount-calculator",
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
            "Calculate GST amount on any base amount",
            "Support for all GST rates (0%, 5%, 12%, 18%, 28%)",
            "Intra-state and inter-state transaction support",
            "CGST and SGST calculation for intra-state",
            "IGST calculation for inter-state",
            "Discount support (percentage and fixed)",
            "Real-time calculation updates",
            "Calculation history tracking"
          ]
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://moneycal.in' },
          { name: 'GST Tools', url: 'https://moneycal.in/gst-tools' },
          { name: 'GST Amount Calculator', url: 'https://moneycal.in/gst-tools/gst-amount-calculator' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <GSTAmountCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTAmountCalculatorPage;
export { GSTAmountCalculatorPage };
