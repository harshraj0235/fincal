import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ImproveScoreClient';

export const metadata: Metadata = {
  title: 'Improve Score | MoneyCal India',
  description: "Explore Improve Score on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/improve-score'
  }
};

export default function Page() {
  return <ClientComponent />;
}
