import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StartupFundingGuideClient';

export const metadata: Metadata = {
  title: 'Startup Funding Guide | MoneyCal India',
  description: "Explore Startup Funding Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business/startup-funding-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
