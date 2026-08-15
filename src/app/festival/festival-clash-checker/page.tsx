import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalClashCheckerClient';

export const metadata: Metadata = {
  title: 'Festival Clash Checker | MoneyCal India',
  description: "Explore Festival Clash Checker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/festival-clash-checker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
