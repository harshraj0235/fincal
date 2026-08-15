import React from 'react';
import { Metadata } from 'next';
import MSMELoanEligibilityChecker from './MSMELoanEligibilityCheckerClient';

export const metadata: Metadata = {
  title: 'MSMELoanEligibilityChecker | MoneyCal India',
  description: 'Free online MSMELoanEligibilityChecker tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/calculators/msme-loan-eligibility',
  }
};

export default function Page() {
  return <MSMELoanEligibilityChecker />;
}
