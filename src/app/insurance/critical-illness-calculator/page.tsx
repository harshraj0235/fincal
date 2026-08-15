import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CriticalIllnessCalculatorClient';

export const metadata: Metadata = {
  title: 'Critical Illness Calculator | MoneyCal India',
  description: "Explore Critical Illness Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/critical-illness-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
