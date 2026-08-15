import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ReferralMessageBuilderClient';

export const metadata: Metadata = {
  title: 'Referral Message Builder | MoneyCal India',
  description: "Explore Referral Message Builder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/referral-message-builder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
