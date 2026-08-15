import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TermInsurancePlannerClient';

export const metadata: Metadata = {
  title: 'Term Insurance Planner | MoneyCal India',
  description: "Explore Term Insurance Planner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/term-insurance-planner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
