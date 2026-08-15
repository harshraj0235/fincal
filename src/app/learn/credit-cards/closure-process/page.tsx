import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ClosureProcessClient';

export const metadata: Metadata = {
  title: 'Closure Process | MoneyCal India',
  description: "Explore Closure Process on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/closure-process'
  }
};

export default function Page() {
  return <ClientComponent />;
}
