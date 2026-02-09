import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';

const CE_TAG = 'moneycal-emi-calculator';

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

const EMICalculator: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    import('./EMICalculatorWidget.svelte').then((mod: { default: { element?: typeof HTMLElement } }) => {
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
        title="EMI Calculator for Home Loan, Car Loan, and Personal Loan"
        description="Fast EMI calculator with advanced prepayment options, rate reset simulation, and amortization schedule. Plan home loan EMI, personal loan EMI, or car loan EMI with accuracy."
        keywords="emi calculator, loan emi calculator, home loan emi calculator india, personal loan emi calculator, car loan emi calculator, reducing balance emi calculator, emi with prepayment, emi calculation formula, interest rate change emi, amortization schedule"
        url="/loan-tools/emi-calculator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Loan Tools', url: '/loan-tools' },
          { name: 'EMI Calculator', url: '/loan-tools/emi-calculator' },
        ]}
        faqData={faqData}
        calculatorData={{
          name: 'EMI Calculator',
          description:
            'Advanced EMI calculator with prepayment planning, rate reset simulation, and a detailed amortization schedule for Indian loans.',
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

export default EMICalculator;