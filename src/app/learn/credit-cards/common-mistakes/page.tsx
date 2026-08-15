import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CommonMistakesClient';

export const metadata: Metadata = {
  title: 'Common Mistakes | MoneyCal India',
  description: "Explore Common Mistakes on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/common-mistakes'
  }
};

export default function Page() {
  return <ClientComponent />;
}
