import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GovernmentSchemesClient';

export const metadata: Metadata = {
  title: 'Government Schemes | MoneyCal India',
  description: "Explore Government Schemes on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/government-schemes'
  }
};

export default function Page() {
  return <ClientComponent />;
}
