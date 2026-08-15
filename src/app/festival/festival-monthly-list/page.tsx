import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalMonthlyListClient';

export const metadata: Metadata = {
  title: 'Festival Monthly List | MoneyCal India',
  description: "Explore Festival Monthly List on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/festival-monthly-list'
  }
};

export default function Page() {
  return <ClientComponent />;
}
