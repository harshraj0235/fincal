import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DigitalBusinessCardCreatorClient';

export const metadata: Metadata = {
  title: 'Digital Business Card Creator | MoneyCal India',
  description: "Explore Digital Business Card Creator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/digital-business-card-creator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
