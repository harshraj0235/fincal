import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ScoreRangesClient';

export const metadata: Metadata = {
  title: 'Score Ranges | MoneyCal India',
  description: "Explore Score Ranges on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/score-ranges'
  }
};

export default function Page() {
  return <ClientComponent />;
}
