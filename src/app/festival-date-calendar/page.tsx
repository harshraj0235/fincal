import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalDateCalendarClient';

export const metadata: Metadata = {
  title: 'Festival Date Calendar | MoneyCal India',
  description: "Explore Festival Date Calendar on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival-date-calendar'
  }
};

export default function Page() {
  return <ClientComponent />;
}
