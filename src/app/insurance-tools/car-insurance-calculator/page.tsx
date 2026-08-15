import React from 'react';
import { Metadata } from 'next';
import CarInsuranceCalculator from './CarInsuranceCalculator';

export const metadata: Metadata = {
  title: 'Car Insurance Calculator | MoneyCal India',
  description: 'Use our free Car Insurance Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/car-insurance-calculator'
  }
};

export default function Page() {
  return <CarInsuranceCalculator />;
}
