import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EligibilityCalculatorClient';

export const metadata: Metadata = {
  title: 'Eligibility Calculator | MoneyCal India',
  description: "Explore Eligibility Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/eligibility-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
