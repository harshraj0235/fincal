import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StateStampDutyGuideClient';

export const metadata: Metadata = {
  title: 'State Stamp Duty Guide | MoneyCal India',
  description: "Explore State Stamp Duty Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/stamp-duty/state-stamp-duty-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
