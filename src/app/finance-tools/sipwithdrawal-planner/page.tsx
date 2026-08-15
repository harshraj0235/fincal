import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPWithdrawalPlannerClient';

export const metadata: Metadata = {
  title: 'SIPWithdrawal Planner | MoneyCal India',
  description: "Explore SIPWithdrawal Planner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/sipwithdrawal-planner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
