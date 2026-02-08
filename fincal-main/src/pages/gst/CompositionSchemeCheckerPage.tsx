import React from 'react';
import CompositionSchemeChecker from '../../calculators/CompositionSchemeChecker';
import SEOHelmet from '../../components/SEOHelmet';

const CompositionSchemeCheckerPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GST Composition Scheme Eligibility Checker 2025 - Check Eligibility & Calculate Tax Savings"
        description="Free GST Composition Scheme eligibility checker. Check if you qualify for composition scheme, calculate tax savings, compare rates. For traders, manufacturers, restaurants, service providers. Updated 2025."
        keywords="composition scheme eligibility, GST composition scheme, composition scheme calculator, composition tax rates, GST scheme checker, small business GST, simplified GST, GSTR-4, composition dealer, turnover limit composition scheme"
        url="https://moneycal.in/gst-tools/composition-scheme-eligibility-checker"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <CompositionSchemeChecker />
      </div>
    </>
  );
};

export default CompositionSchemeCheckerPage;
