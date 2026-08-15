import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPMasteryClient';

export const metadata: Metadata = {
  title: 'SIPMastery | MoneyCal India',
  description: "Explore SIPMastery on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/sipmastery'
  }
};

export default function Page() {
  return <ClientComponent />;
}
