import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PublicHolidayFinderClient';

export const metadata: Metadata = {
  title: 'Public Holiday Finder | MoneyCal India',
  description: "Explore Public Holiday Finder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/public-holiday-finder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
