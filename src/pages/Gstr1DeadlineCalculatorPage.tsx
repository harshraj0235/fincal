import React from 'react';
import { Gstr1DeadlineCalculator } from '../calculators/Gstr1DeadlineCalculator';
import { SEOHelmet } from '../components/SEOHelmet';

export const Gstr1DeadlineCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GSTR-1 Deadline Calculator India 2025 - GST Return Filing Date, Penalty & Interest Calculator"
        description="Free GSTR-1 deadline calculator for GST return filing in India. Calculate due dates, penalties, interest charges for late filing. Monthly & quarterly filers. Updated for 2025 with accurate penalty calculations."
        keywords="GSTR-1 deadline calculator, GST return filing date, GSTR-1 due date, GST penalty calculator, GST interest calculator, late filing penalty, GST return deadline, monthly GST filing, quarterly GST filing, GST compliance, GST return calculator, GST filing date, GST late fee calculator, GSTR-1 filing deadline, GST return due date calculator, GST penalty for late filing, GST interest on late payment, GST return filing calculator, GST compliance calculator, GST filing reminder, GST return date calculator"
        canonicalUrl="https://moneycal.in/tools/gstr-1-deadline-calculator"
        ogTitle="GSTR-1 Deadline Calculator - Calculate GST Return Filing Dates & Penalties"
        ogDescription="Calculate your GSTR-1 filing deadline, penalties, and interest charges. Stay compliant with GST return filing requirements for 2025. Free, accurate, and instant results."
        ogImage="https://moneycal.in/images/gstr-1-deadline-calculator-og.jpg"
        twitterTitle="GSTR-1 Deadline Calculator - GST Return Filing Date & Penalty Calculator"
        twitterDescription="Free GSTR-1 deadline calculator for GST return filing. Calculate due dates, penalties, interest charges for late filing. Monthly & quarterly filers."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GSTR-1 Deadline Calculator",
          "description": "Free GSTR-1 deadline calculator for GST return filing in India. Calculate due dates, penalties, interest charges for late filing.",
          "url": "https://moneycal.in/tools/gstr-1-deadline-calculator",
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
          { name: 'Tools', url: 'https://moneycal.in/tools' },
          { name: 'GSTR-1 Deadline Calculator', url: 'https://moneycal.in/tools/gstr-1-deadline-calculator' }
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
