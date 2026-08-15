import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './Section80CGuideClient';

export const metadata: Metadata = {
  title: 'Section80CGuide | MoneyCal India',
  description: "Explore Section80CGuide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/taxation/section80cguide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
