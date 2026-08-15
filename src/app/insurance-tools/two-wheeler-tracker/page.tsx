import React from 'react';
import { Metadata } from 'next';
import TwoWheelerTracker from './TwoWheelerTracker';

export const metadata: Metadata = {
  title: 'Two Wheeler Tracker | MoneyCal India',
  description: 'Use our free Two Wheeler Tracker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/two-wheeler-tracker'
  }
};

export default function Page() {
  return <TwoWheelerTracker />;
}
