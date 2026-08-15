import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GovardhanPujaFinderClient';

export const metadata: Metadata = {
  title: 'Govardhan Puja Finder | MoneyCal India',
  description: "Explore Govardhan Puja Finder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/govardhan-puja-finder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
