import React from 'react';
import HSNSACFinder from '../../calculators/HSNSACFinder';
import SEOHelmet from '../../components/SEOHelmet';

const HSNSACFinderPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="HSN SAC Code Finder India 2025 - Find HSN SAC Codes with GST Rates | Free Search Tool"
        description="Free HSN/SAC code finder for India. Search HSN codes for products and SAC codes for services with applicable GST rates. Comprehensive database updated for 2025. Find codes by product name, service, category, or description."
        keywords="HSN code finder, SAC code finder, HSN SAC search, GST code finder, HSN code list, SAC code list, product HSN code, service SAC code, GST rate finder, HSN classification, SAC classification, GST invoice codes, HSN database, SAC database, harmonized system code"
        url="https://moneycal.in/gst-tools/gst-hsn-sac-finder"
        image="https://moneycal.in/images/hsn-sac-finder-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "HSN/SAC Code Finder",
          "description": "Find HSN codes for products and SAC codes for services with applicable GST rates. Comprehensive searchable database.",
          "url": "https://moneycal.in/gst-tools/gst-hsn-sac-finder",
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
            "Search HSN codes for products",
            "Search SAC codes for services",
            "Find applicable GST rates",
            "Filter by category and type",
            "Comprehensive database",
            "Recent searches tracking",
            "Product examples included",
            "Real-time search results"
          ]
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://moneycal.in' },
          { name: 'GST Tools', url: 'https://moneycal.in/gst-tools' },
          { name: 'HSN/SAC Finder', url: 'https://moneycal.in/gst-tools/gst-hsn-sac-finder' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <HSNSACFinder />
        </div>
      </div>
    </>
  );
};

export default HSNSACFinderPage;
export { HSNSACFinderPage };
