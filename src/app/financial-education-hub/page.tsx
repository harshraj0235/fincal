import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinancialEducationHubClient';

export const metadata: Metadata = {
  title: 'Financial Education Hub | MoneyCal India',
  description: "Explore Financial Education Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/financial-education-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
