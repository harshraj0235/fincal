import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalInformationHistoryClient';

export const metadata: Metadata = {
  title: 'Festival Information History | MoneyCal India',
  description: "Explore Festival Information History on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival-information-history'
  }
};

export default function Page() {
  return <ClientComponent />;
}
