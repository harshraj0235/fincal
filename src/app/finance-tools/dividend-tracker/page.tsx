import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DividendTrackerClient';

export const metadata: Metadata = {
  title: 'Dividend Tracker | MoneyCal India',
  description: "Explore Dividend Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/dividend-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
