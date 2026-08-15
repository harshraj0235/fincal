import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EMIAffordabilityCheckerClient';

export const metadata: Metadata = {
  title: 'EMIAffordability Checker | MoneyCal India',
  description: "Explore EMIAffordability Checker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/emiaffordability-checker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
