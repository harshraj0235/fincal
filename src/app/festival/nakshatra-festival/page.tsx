import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NakshatraFestivalClient';

export const metadata: Metadata = {
  title: 'Nakshatra Festival | MoneyCal India',
  description: "Explore Nakshatra Festival on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/nakshatra-festival'
  }
};

export default function Page() {
  return <ClientComponent />;
}
