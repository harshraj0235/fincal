import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTCalculatorClient';

export const metadata: Metadata = {
  title: 'GSTCalculator | MoneyCal India',
  description: "Explore GSTCalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstcalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
