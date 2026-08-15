import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTPenaltyInterestCalculatorClient';

export const metadata: Metadata = {
  title: 'GSTPenalty Interest Calculator | MoneyCal India',
  description: "Explore GSTPenalty Interest Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstpenalty-interest-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
