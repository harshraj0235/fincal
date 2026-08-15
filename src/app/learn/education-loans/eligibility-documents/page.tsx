import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EligibilityDocumentsClient';

export const metadata: Metadata = {
  title: 'Eligibility Documents | MoneyCal India',
  description: "Explore Eligibility Documents on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/education-loans/eligibility-documents'
  }
};

export default function Page() {
  return <ClientComponent />;
}
