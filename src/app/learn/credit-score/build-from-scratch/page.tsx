import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BuildFromScratchClient';

export const metadata: Metadata = {
  title: 'Build From Scratch | MoneyCal India',
  description: "Explore Build From Scratch on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/build-from-scratch'
  }
};

export default function Page() {
  return <ClientComponent />;
}
