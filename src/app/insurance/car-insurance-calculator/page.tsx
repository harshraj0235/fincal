import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CarInsuranceCalculatorClient';

export const metadata: Metadata = {
  title: 'Car Insurance Calculator | MoneyCal India',
  description: "Explore Car Insurance Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/car-insurance-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
