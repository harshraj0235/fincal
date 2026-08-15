import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NavratriDatesFinderClient';

export const metadata: Metadata = {
  title: 'Navratri Dates Finder | MoneyCal India',
  description: "Explore Navratri Dates Finder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/navratri-dates-finder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
