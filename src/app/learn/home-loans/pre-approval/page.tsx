import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PreApprovalClient';

export const metadata: Metadata = {
  title: 'Pre Approval | MoneyCal India',
  description: "Explore Pre Approval on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/pre-approval'
  }
};

export default function Page() {
  return <ClientComponent />;
}
