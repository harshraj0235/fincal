import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ScoreVsReportClient';

export const metadata: Metadata = {
  title: 'Score Vs Report | MoneyCal India',
  description: "Explore Score Vs Report on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/score-vs-report'
  }
};

export default function Page() {
  return <ClientComponent />;
}
