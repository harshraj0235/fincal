import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BhaiDoojDateFinderClient';

export const metadata: Metadata = {
  title: 'Bhai Dooj Date Finder | MoneyCal India',
  description: "Explore Bhai Dooj Date Finder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/bhai-dooj-date-finder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
