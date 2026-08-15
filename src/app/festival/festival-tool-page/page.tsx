import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalToolPageClient';

export const metadata: Metadata = {
  title: 'Festival Tool Page | MoneyCal India',
  description: "Explore Festival Tool Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/festival-tool-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
