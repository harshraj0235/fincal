import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ScholarshipsAlternativesClient';

export const metadata: Metadata = {
  title: 'Scholarships Alternatives | MoneyCal India',
  description: "Explore Scholarships Alternatives on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/education-loans/scholarships-alternatives'
  }
};

export default function Page() {
  return <ClientComponent />;
}
