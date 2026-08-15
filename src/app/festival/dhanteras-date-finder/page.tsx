import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DhanterasDateFinderClient';

export const metadata: Metadata = {
  title: 'Dhanteras Date Finder | MoneyCal India',
  description: "Explore Dhanteras Date Finder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/dhanteras-date-finder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
