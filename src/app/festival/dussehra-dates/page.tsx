import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DussehraDatesClient';

export const metadata: Metadata = {
  title: 'Dussehra Dates | MoneyCal India',
  description: "Explore Dussehra Dates on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/dussehra-dates'
  }
};

export default function Page() {
  return <ClientComponent />;
}
