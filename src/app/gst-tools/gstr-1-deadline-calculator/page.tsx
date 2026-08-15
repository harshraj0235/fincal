import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './Gstr1DeadlineCalculatorPageClient';

export const metadata: Metadata = {
  title: 'Gstr1Deadline Calculator Page | MoneyCal India',
  description: "Explore Gstr1Deadline Calculator Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gstr1deadline-calculator-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
