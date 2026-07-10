import React from 'react';
import RCMApplicabilityChecker from '../../calculators/RCMApplicabilityChecker';
import SEOHelmet from '../../components/SEOHelmet';

const RCMApplicabilityCheckerPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="RCM Applicability Checker India 2026 | Reverse Charge GST Tool | MoneyCal"
        description="Check whether RCM applies for your transaction type and estimate reverse charge tax liability with practical compliance steps."
        keywords="rcm applicability checker india, reverse charge gst calculator, gta legal services rcm tool, import services rcm check, unregistered supplier rcm applicability"
        url="/tools/rcm-applicability-checker"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <RCMApplicabilityChecker />
      </div>
    </>
  );
};

export default RCMApplicabilityCheckerPage;
