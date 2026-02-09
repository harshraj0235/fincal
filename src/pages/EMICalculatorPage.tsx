import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const CE_TAG = 'moneycal-emi-calculator';
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
    question: 'Can I use this EMI calculator for home loan, car loan, or personal loan?',
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

const EMICalculatorPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EMI Calculator for Home Loan, Car Loan, and Personal Loan',
    description:
      'Advanced EMI calculator with prepayment planning, rate reset simulation, and amortization schedule for Indian loans.',
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
        url: 'https://moneycal.in/android-chrome-512x512.png',
      },
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://moneycal.in/calculators/emi-calculator',
    },
  };

  useEffect(() => {
    let mounted = true;
    import('./loan-tools/EMICalculatorWidget.svelte').then((mod: { default: { element?: typeof HTMLElement } }) => {
      if (!mounted) return;
      const component = mod.default;
      if (component?.element && !customElements.get(CE_TAG)) {
        customElements.define(CE_TAG, component.element as unknown as CustomElementConstructor);
      }
      setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current) return;
    const el = containerRef.current.querySelector(CE_TAG);
    if (!el) return;
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ path: string }>;
      if (ev.detail?.path) navigate(ev.detail.path);
    };
    el.addEventListener('navigate', handler);
    return () => el.removeEventListener('navigate', handler);
  }, [ready, navigate]);

  return (
    <>
      <SEOHelmet
        title="EMI Calculator India (Home Loan, Personal Loan, Car Loan)"
        description="Google-friendly EMI calculator for India with prepayment planning, rate reset simulation, amortization schedule, and affordability insights. Plan EMI for home loan, personal loan, or car loan."
        keywords="emi calculator india, loan emi calculator, home loan emi calculator, personal loan emi calculator, car loan emi calculator, reducing balance emi calculator, emi with prepayment, emi affordability, amortization schedule"
        url="/calculators/emi-calculator"
        section="Calculators"
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
          { name: 'Calculators', url: '/calculators' },
          { name: 'EMI Calculator', url: '/calculators/emi-calculator' },
        ]}
        faqData={faqData}
        calculatorData={{
          name: 'EMI Calculator',
          description:
            'Advanced EMI calculator with prepayment planning, rate reset simulation, and a detailed amortization schedule for Indian loans.',
          category: 'Loan Calculators',
          features: [
            'Reducing balance EMI calculation',
            'Part prepayment and extra monthly payment',
            'Rate reset simulation for floating loans',
            'Amortization schedule with export',
            'EMI to income affordability ratio',
          ],
        }}
      />
      <div ref={containerRef} className="min-h-screen bg-slate-50">
        {ready ? (
          React.createElement(CE_TAG)
        ) : (
          <div className="min-h-[60vh] flex items-center justify-center text-slate-500 text-sm">
            Loading EMI calculator...
          </div>
        )}
      </div>
    </>
  );
};

export default EMICalculatorPage;
