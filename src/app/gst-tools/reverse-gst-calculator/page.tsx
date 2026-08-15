import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ReverseGSTCalculatorPageClient';

export const metadata: Metadata = {
  title: 'Reverse GSTCalculator Page | MoneyCal India',
  description: "Explore Reverse GSTCalculator Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/reverse-gstcalculator-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
