import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LifeInsuranceCalculatorClient';

export const metadata: Metadata = {
  title: 'Life Insurance Calculator | MoneyCal India',
  description: "Explore Life Insurance Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/life-insurance-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
