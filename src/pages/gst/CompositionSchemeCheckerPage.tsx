import React from 'react';
import CompositionSchemeChecker from '../../calculators/CompositionSchemeChecker';
import SEOHelmet from '../../components/SEOHelmet';

const CompositionSchemeCheckerPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Composition Scheme Eligibility Checker India 2026 | GST Small Business Tool | MoneyCal"
        description="Determine whether your business qualifies for GST composition scheme and compare estimated tax under normal vs composition setup."
        keywords="composition scheme eligibility checker india, gst composition scheme calculator, small business gst scheme checker, composition tax rate comparison, gstr-4 eligibility tool"
        url="/tools/composition-scheme-eligibility-checker"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <CompositionSchemeChecker />
      </div>
    </>
  );
};

export default CompositionSchemeCheckerPage;
