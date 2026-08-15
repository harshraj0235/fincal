import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ImprovingApprovalChancesClient';

export const metadata: Metadata = {
  title: 'Improving Approval Chances | MoneyCal India',
  description: "Explore Improving Approval Chances on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/improving-approval-chances'
  }
};

export default function Page() {
  return <ClientComponent />;
}
