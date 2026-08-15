import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DiwaliDateFinderClient';

export const metadata: Metadata = {
  title: 'Diwali Date Finder | MoneyCal India',
  description: "Explore Diwali Date Finder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/diwali-date-finder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
