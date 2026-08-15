import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LiquidFundCalculatorClient';

export const metadata: Metadata = {
  title: 'Liquid Fund Calculator | MoneyCal India',
  description: "Explore Liquid Fund Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/liquid-fund-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
