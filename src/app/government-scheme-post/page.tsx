import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GovernmentSchemePostClient';

export const metadata: Metadata = {
  title: 'Government Scheme Post | MoneyCal India',
  description: "Explore Government Scheme Post on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/government-scheme-post'
  }
};

export default function Page() {
  return <ClientComponent />;
}
