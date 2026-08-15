import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EMISimplifierClient';

export const metadata: Metadata = {
  title: 'EMISimplifier | MoneyCal India',
  description: "Explore EMISimplifier on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/emisimplifier'
  }
};

export default function Page() {
  return <ClientComponent />;
}
