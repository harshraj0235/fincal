import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTSlabCalculatorPageClient';

export const metadata: Metadata = {
  title: 'GSTSlab Calculator Page | MoneyCal India',
  description: "Explore GSTSlab Calculator Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstslab-calculator-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
