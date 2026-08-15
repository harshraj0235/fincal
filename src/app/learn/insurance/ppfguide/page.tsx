import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PPFGuideClient';

export const metadata: Metadata = {
  title: 'PPFGuide | MoneyCal India',
  description: "Explore PPFGuide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/insurance/ppfguide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
