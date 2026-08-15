import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTLiabilityCalculatorPageClient';

export const metadata: Metadata = {
  title: 'GSTLiability Calculator Page | MoneyCal India',
  description: "Explore GSTLiability Calculator Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstliability-calculator-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
