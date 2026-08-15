import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CIBILScoreImpactClient';

export const metadata: Metadata = {
  title: 'CIBILScore Impact | MoneyCal India',
  description: "Explore CIBILScore Impact on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/cibilscore-impact'
  }
};

export default function Page() {
  return <ClientComponent />;
}
