import React from 'react';
import HSNSACFinder from '../../calculators/HSNSACFinder';
import SEOHelmet from '../../components/SEOHelmet';

const HSNSACFinderPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="HSN/SAC Finder India 2026 | GST Code and Rate Lookup Tool | MoneyCal"
        description="Search HSN codes for goods and SAC codes for services with GST rates, categories, examples, and filing guidance for India."
        keywords="hsn sac finder india, gst hsn code search tool, sac code finder for services india, hsn code with gst rate lookup, gst invoice code finder"
        url="/tools/gst-hsn-sac-finder"
        image="/images/hsn-sac-finder-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "HSN/SAC Code Finder",
          "description": "Find HSN codes for products and SAC codes for services with applicable GST rates. Comprehensive searchable database.",
          "url": "/gst-tools/gst-hsn-sac-finder",
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
          { name: 'GST Tools', url: '/gst-tools' },
          { name: 'HSN/SAC Finder', url: '/gst-tools/gst-hsn-sac-finder' }
        ]}
      />
      <HSNSACFinder />
    </>
  );
};

export default HSNSACFinderPage;
export { HSNSACFinderPage };
