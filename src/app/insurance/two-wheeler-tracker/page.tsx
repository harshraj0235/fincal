import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TwoWheelerTrackerClient';

export const metadata: Metadata = {
  title: 'Two Wheeler Tracker | MoneyCal India',
  description: "Explore Two Wheeler Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/two-wheeler-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
