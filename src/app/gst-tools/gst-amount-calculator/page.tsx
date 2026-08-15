import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTAmountCalculatorPageClient';

export const metadata: Metadata = {
  title: 'GSTAmount Calculator Page | MoneyCal India',
  description: "Explore GSTAmount Calculator Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstamount-calculator-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
