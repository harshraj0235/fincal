import React from 'react';
import GSTAmountCalculator from '../../calculators/GSTAmountCalculator';
import SEOHelmet from '../../components/SEOHelmet';

const GSTAmountCalculatorPage: React.FC = () => {
  const faqData = [
    {
      question: 'How do I calculate GST amount from base price?',
      answer: 'Multiply the base amount by the GST rate and divide by 100. GST Amount = Base × (Rate ÷ 100).'
    },
    {
      question: 'How do I remove GST from an inclusive price?',
      answer: 'Divide the total by (1 + Rate/100) to get the base amount, then subtract the base from total to get GST.'
    },
    {
      question: 'What is the difference between CGST, SGST, and IGST?',
      answer: 'CGST and SGST apply to intra-state transactions and split the GST equally. IGST applies to inter-state transactions and is a single tax.'
    },
    {
      question: 'Is GST calculated before or after discount?',
      answer: 'GST is calculated on the discounted price. Apply the discount first, then compute GST on the reduced base.'
    },
    {
      question: 'Which GST rate should I use in 2026?',
      answer: 'Most goods and services fall into 0%, 5%, 12%, 18%, or 28% slabs. Use the rate prescribed for your product or service.'
    }
  ];
  return (
    <>
      <SEOHelmet
        title="GST Amount Calculator India 2026 - GST, CGST, SGST, IGST, Discount"
        description="GST amount calculator India 2026. Add or remove GST, calculate CGST, SGST, IGST, discounts, and invoice-ready breakup for all GST slabs. Mobile-friendly and instant."
        keywords="gst amount calculator india 2026, gst calculator india, cgst sgst igst calculator, gst inclusive exclusive calculator, gst discount calculator, gst rate 5 12 18 28 calculator, add remove gst calculator, gst tax calculator india, gst breakup calculator, gst amount calculator online"
        url="/gst-tools/gst-amount-calculator"
        image="/images/gst-amount-calculator-og.jpg"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GST Amount Calculator India 2026",
          "description": "GST amount calculator India 2026. Add or remove GST and get CGST, SGST, IGST breakup with discount support.",
          "url": "/gst-tools/gst-amount-calculator",
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
          { name: 'Home', url: '/' },
          { name: 'GST Tools', url: '/gst-tools' },
          { name: 'GST Amount Calculator', url: '/gst-tools/gst-amount-calculator' }
        ]}
        faqData={faqData}
        calculatorData={{
          name: 'GST Amount Calculator India 2026',
          description: 'Calculate GST amount, CGST, SGST, IGST, and total payable for any transaction in India.',
          category: 'Tax Calculators',
          features: [
            'Add or remove GST instantly',
            'CGST/SGST/IGST breakup',
            'Discount support',
            'All GST rate slabs',
            'Mobile-friendly interface'
          ],
          authorName: 'MoneyCal Editorial Team'
        }}
      />
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <GSTAmountCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTAmountCalculatorPage;
export { GSTAmountCalculatorPage };
