import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BihuDateCalendarClient';

export const metadata: Metadata = {
  title: 'Bihu Date Calendar | MoneyCal India',
  description: "Explore Bihu Date Calendar on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/bihu-date-calendar'
  }
};

export default function Page() {
  return <ClientComponent />;
}
