import React from 'react';
import GSTRefundChecker from '../../calculators/GSTRefundChecker';
import SEOHelmet from '../../components/SEOHelmet';

const GSTRefundCheckerPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GST Refund Eligibility Checker India 2026 | Export, ITC, and Excess Payment | MoneyCal"
        description="Verify GST refund eligibility for export refunds, accumulated ITC, inverted duty structure, and excess payment scenarios."
        keywords="gst refund eligibility checker india, export gst refund calculator, accumulated itc refund checker, inverted duty refund eligibility, gst rfd-01 refund planning tool"
        url="/tools/gst-refund-eligibility-checker"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <GSTRefundChecker />
      </div>
    </>
  );
};

export default GSTRefundCheckerPage;
