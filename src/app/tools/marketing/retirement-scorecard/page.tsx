import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RetirementScorecardClient';

export const metadata: Metadata = {
  title: 'Retirement Scorecard | MoneyCal India',
  description: "Explore Retirement Scorecard on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/retirement-scorecard'
  }
};

export default function Page() {
  return <ClientComponent />;
}
