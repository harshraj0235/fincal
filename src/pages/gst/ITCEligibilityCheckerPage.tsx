import React from 'react';
import ITCEligibilityChecker from '../../calculators/ITCEligibilityChecker';
import SEOHelmet from '../../components/SEOHelmet';

const ITCEligibilityCheckerPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="ITC Eligibility Checker 2025 - Check Input Tax Credit Eligibility for GST Purchases"
        description="Free ITC eligibility checker. Verify if you can claim Input Tax Credit on purchases. Comprehensive validation based on GST laws. Check blocked credits, supplier eligibility, documentation requirements."
        keywords="ITC eligibility checker, input tax credit checker, ITC claim eligibility, blocked credit checker, ITC rules, GST credit eligibility, ITC validation tool, can I claim ITC, input tax credit rules"
        url="/gst-tools/itc-eligibility-checker"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <ITCEligibilityChecker />
      </div>
    </>
  );
};

export default ITCEligibilityCheckerPage;
