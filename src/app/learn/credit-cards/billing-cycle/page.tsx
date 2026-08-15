import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BillingCycleClient';

export const metadata: Metadata = {
  title: 'Billing Cycle | MoneyCal India',
  description: "Explore Billing Cycle on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/billing-cycle'
  }
};

export default function Page() {
  return <ClientComponent />;
}
