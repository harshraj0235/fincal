import React from 'react';
import GSTSlabCalculator from '../../calculators/GSTSlabCalculator';
import SEOHelmet from '../../components/SEOHelmet';

const GSTSlabCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GST Slab Calculator India 2025 - Find GST Rate for Any Product or Service with HSN Code"
        description="Free GST slab calculator for India. Find applicable GST rate (0%, 5%, 12%, 18%, 28%) for any product or service. Search by item name, category, or HSN code. Updated for 2025 with comprehensive database."
        keywords="GST slab calculator, GST rate finder, HSN code finder, GST rate India, GST slab rates, product GST rate, service GST rate, 0% GST items, 5% GST items, 12% GST items, 18% GST items, 28% GST items, GST exemption, GST tax rate, GST product search, HSN classification"
        url="https://moneycal.in/gst-tools/gst-slab-calculator"
        image="https://moneycal.in/images/gst-slab-calculator-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GST Slab Calculator",
          "description": "Find applicable GST rate for any product or service in India. Search by item name, category, or HSN code.",
          "url": "https://moneycal.in/gst-tools/gst-slab-calculator",
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
            "Find GST rate for any product or service",
            "Search by item name, description, or HSN code",
            "Filter by category and GST rate",
            "Comprehensive database of products and services",
            "HSN code classification",
            "Exempt items identification",
            "All 5 GST slabs (0%, 5%, 12%, 18%, 28%)",
            "Real-time search and filtering"
          ]
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://moneycal.in' },
          { name: 'GST Tools', url: 'https://moneycal.in/gst-tools' },
          { name: 'GST Slab Calculator', url: 'https://moneycal.in/gst-tools/gst-slab-calculator' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <GSTSlabCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTSlabCalculatorPage;
export { GSTSlabCalculatorPage };
