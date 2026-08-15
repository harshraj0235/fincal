import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ChooseBestCardClient';

export const metadata: Metadata = {
  title: 'Choose Best Card | MoneyCal India',
  description: "Explore Choose Best Card on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/choose-best-card'
  }
};

export default function Page() {
  return <ClientComponent />;
}
