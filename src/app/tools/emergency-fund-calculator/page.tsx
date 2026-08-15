import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EmergencyFundCalculatorClient';

export const metadata: Metadata = {
  title: 'Emergency Fund Calculator | MoneyCal India',
  description: "Explore Emergency Fund Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/emergency-fund-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
