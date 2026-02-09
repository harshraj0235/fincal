import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const CE_TAG = 'moneycal-home';

export const HomeSvelteWrapper: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    import('./Home.svelte').then((mod: { default: { element?: typeof HTMLElement } }) => {
      if (!mounted) return;
      const C = mod.default;
      if (C?.element && !customElements.get(CE_TAG)) {
        customElements.define(CE_TAG, C.element as unknown as CustomElementConstructor);
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
        title="MoneyCal.in - Free Financial Calculators & Tools for India | 100+ Calculators"
        description="India's most comprehensive financial platform. 100+ free calculators for EMI, SIP, Income Tax, GST, PPF, FD, Home Loan, and more. Mobile-friendly, fast, and trusted by 1M+ users."
        keywords="financial calculators India, GST calculator, SIP calculator, EMI calculator, income tax calculator, PPF calculator, FD calculator, home loan calculator, tax calculator, investment calculator"
        canonicalUrl="https://moneycal.in"
      />
      <div ref={containerRef} className="min-h-screen">
        {ready ? React.createElement(CE_TAG) : (
          <div className="min-h-[60vh] bg-slate-50/60 flex items-center justify-center">
            <div className="animate-pulse text-slate-500 text-sm">Loading…</div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeSvelteWrapper;
