import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EligibilityCriteriaClient';

export const metadata: Metadata = {
  title: 'Eligibility Criteria | MoneyCal India',
  description: "Explore Eligibility Criteria on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/eligibility-criteria'
  }
};

export default function Page() {
  return <ClientComponent />;
}
