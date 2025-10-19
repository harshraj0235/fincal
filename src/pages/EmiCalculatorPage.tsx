import React from 'react';
import EmiCalculator from '../calculators/EmiCalculator';
import SEOHelmet from '../components/SEOHelmet';

const EmiCalculatorPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="EMI Calculator 2025 - Loan EMI Calculator India | Home, Car, Personal Loan"
        description="Free EMI calculator for home loan, car loan, personal loan. Calculate monthly EMI, total interest, and payment schedule instantly. Updated with latest 2025 interest rates."
        keywords="EMI calculator, loan EMI calculator, home loan EMI, car loan EMI, personal loan EMI, EMI calculation formula, how to calculate EMI, loan calculator India 2025"
        url="https://moneycal.in/calculators/emi-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "EMI Calculator",
          "description": "Calculate EMI for home loans, car loans, personal loans with detailed breakup and payment schedule",
          "url": "https://moneycal.in/calculators/emi-calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          }
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://moneycal.in' },
          { name: 'Calculators', url: 'https://moneycal.in/calculators' },
          { name: 'EMI Calculator', url: 'https://moneycal.in/calculators/emi-calculator' }
        ]}
      />
      <EmiCalculator />
    </>
  );
};

export default EmiCalculatorPage;

