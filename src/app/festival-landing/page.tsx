import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalLandingClient';

export const metadata: Metadata = {
  title: 'Festival Landing | MoneyCal India',
  description: "Explore Festival Landing on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival-landing'
  }
};

export default function Page() {
  return <ClientComponent />;
}
