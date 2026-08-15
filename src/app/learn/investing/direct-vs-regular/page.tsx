import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DirectVsRegularClient';

export const metadata: Metadata = {
  title: 'Direct Vs Regular | MoneyCal India',
  description: "Explore Direct Vs Regular on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/direct-vs-regular'
  }
};

export default function Page() {
  return <ClientComponent />;
}
