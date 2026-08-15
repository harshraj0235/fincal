import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTRCMCalculatorClient';

export const metadata: Metadata = {
  title: 'GSTRCMCalculator | MoneyCal India',
  description: "Explore GSTRCMCalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstrcmcalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
