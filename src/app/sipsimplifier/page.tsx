import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPSimplifierClient';

export const metadata: Metadata = {
  title: 'SIPSimplifier | MoneyCal India',
  description: "Explore SIPSimplifier on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/sipsimplifier'
  }
};

export default function Page() {
  return <ClientComponent />;
}
