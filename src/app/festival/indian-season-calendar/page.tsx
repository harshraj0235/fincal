import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IndianSeasonCalendarClient';

export const metadata: Metadata = {
  title: 'Indian Season Calendar | MoneyCal India',
  description: "Explore Indian Season Calendar on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/indian-season-calendar'
  }
};

export default function Page() {
  return <ClientComponent />;
}
