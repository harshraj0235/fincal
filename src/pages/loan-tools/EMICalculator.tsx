import React from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { EmiCalculator } from '../../calculators/EmiCalculator';
import { IndianRupee } from 'lucide-react';

const publishedDate = '2026-02-09T00:00:00+05:30';

const faqData = [
  {
    question: 'How is EMI calculated for a reducing balance loan?',
    answer:
      'EMI uses a reducing balance formula that applies interest on the outstanding principal each month. The standard EMI formula is P x r x (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly rate, and n is number of months.',
  },
  {
    question: 'Does prepayment reduce EMI or tenure?',
    answer:
      'In most Indian banks, part prepayment keeps EMI constant and reduces the remaining tenure. This calculator models prepayment that reduces tenure while keeping EMI unchanged.',
  },
  {
    question: 'What is a good EMI to income ratio?',
    answer:
      'A safe EMI to income ratio is usually 30 to 40 percent of net monthly income. Lower ratios improve approval chances and protect cash flow.',
  },
  {
    question: 'Is the EMI different for fixed and floating interest rates?',
    answer:
      'Yes. Fixed rate EMI stays the same for the fixed period, while floating rates can change when the benchmark rate changes. This tool lets you simulate a rate reset.',
  },
  {
    question: 'Do processing fees change the EMI?',
    answer:
      'Processing fees are usually paid upfront, so they do not change the EMI. They do increase the effective cost of the loan, which this calculator highlights.',
  },
  {
    question: 'Can I use this EMI Calculator for home loan, car loan, or personal loan?',
    answer:
      'Yes. The EMI formula is the same for most secured and unsecured loans. You can set the loan amount, rate, and tenure to match your product.',
  },
  {
    question: 'Why does the interest portion look high in early months?',
    answer:
      'Interest is calculated on the outstanding principal. In the early period, the balance is high, so interest is a bigger share of the EMI. Over time the principal share increases.',
  },
  {
    question: 'What inputs do I need for accurate EMI results?',
    answer:
      'You need the loan amount, annual interest rate, tenure in months or years, and any prepayment plan. Optional inputs like processing fees help estimate total cost.',
  },
];

const EMICalculator: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EMI Calculator for Home Loan, Car Loan, and Personal Loan',
    description:
      'Advanced EMI Calculator with prepayment planning, rate reset simulation, and amortization schedule for Indian loans.',
    author: {
      '@type': 'Organization',
      name: 'MoneyCal India',
      url: 'https://moneycal.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MoneyCal India',
      url: 'https://moneycal.in',
      logo: {
        '@type': 'ImageObject',
        url: '/android-chrome-512x512.png',
      },
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': '/loan-tools/emi-calculator',
    },
  };

  return (
    <>
      <SEOHelmet
        title="EMI Calculator for Home Loan, Car Loan, and Personal Loan"
        description="Fast EMI Calculator with advanced prepayment options, rate reset simulation, and amortization schedule. Plan home loan EMI, personal loan EMI, or car loan EMI with accuracy."
        keywords="emi calculator, loan emi calculator, home loan emi calculator india, personal loan emi calculator, car loan emi calculator, reducing balance emi calculator, emi with prepayment, emi calculation formula, interest rate change emi, amortization schedule"
        url="/loan-tools/emi-calculator"
        section="Loan Tools"
        tags={[
          'EMI calculator',
          'Home loan EMI',
          'Personal loan EMI',
          'Car loan EMI',
          'Loan affordability',
          'Prepayment',
        ]}
        articlePublishedTime={publishedDate}
        articleModifiedTime={publishedDate}
        structuredData={structuredData}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Loan Tools', url: '/loan-tools' },
          { name: 'EMI Calculator', url: '/loan-tools/emi-calculator' },
        ]}
        faqData={faqData}
        calculatorData={{
          name: 'EMI Calculator',
          description:
            'Advanced EMI Calculator with prepayment planning, rate reset simulation, and a detailed amortization schedule for Indian loans.',
          category: 'Loan Tools',
          features: [
            'Reducing balance EMI calculation',
            'Part prepayment and extra monthly payment',
            'Rate reset simulation for floating loans',
            'Amortization schedule with export',
            'EMI to income affordability ratio',
          ],
        }}
      />
      <div className="min-h-screen bg-slate-50">
        <EmiCalculator />
      </div>
    </>
  );
};

export default EMICalculator;
