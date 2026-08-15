import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ITRFilingGuideClient';

export const metadata: Metadata = {
  title: 'ITRFiling Guide | MoneyCal India',
  description: "Explore ITRFiling Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/taxation/itrfiling-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
