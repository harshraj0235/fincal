import React from 'react';
import RCMApplicabilityChecker from '../../calculators/RCMApplicabilityChecker';
import SEOHelmet from '../../components/SEOHelmet';

const RCMApplicabilityCheckerPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="RCM Applicability Checker 2025 - Check Reverse Charge Mechanism GST Liability"
        description="Free RCM applicability checker. Check if Reverse Charge Mechanism applies to your GST transaction. For GTA, legal services, imports, unregistered suppliers. Calculate RCM tax liability. Updated 2025."
        keywords="RCM applicability checker, reverse charge mechanism, RCM GST, reverse charge GST, GTA RCM, legal services RCM, import services RCM, unregistered dealer RCM, RCM calculator, reverse charge calculator"
        url="https://moneycal.in/gst-tools/rcm-applicability-checker"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <RCMApplicabilityChecker />
      </div>
    </>
  );
};

export default RCMApplicabilityCheckerPage;
