import React from 'react';
import GSTRefundChecker from '../../calculators/GSTRefundChecker';
import SEOHelmet from '../../components/SEOHelmet';

const GSTRefundCheckerPage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GST Refund Eligibility Checker 2025 - Check GST Refund Claim Eligibility & Calculate Amount"
        description="Free GST refund eligibility checker. Check if you can claim GST refund for exports, accumulated ITC, excess payment. Calculate estimated refund amount and processing time. Updated 2025."
        keywords="GST refund eligibility, GST refund checker, export refund GST, accumulated ITC refund, GST refund claim, refund calculator GST, GST refund status, ITC refund eligibility, zero rated supply refund, inverted duty refund"
        url="https://moneycal.in/gst-tools/gst-refund-eligibility-checker"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <GSTRefundChecker />
      </div>
    </>
  );
};

export default GSTRefundCheckerPage;
