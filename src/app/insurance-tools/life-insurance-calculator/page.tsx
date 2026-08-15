import React from 'react';
import { Metadata } from 'next';
import LifeInsuranceCalculator from './LifeInsuranceCalculator';

export const metadata: Metadata = {
  title: 'Life Insurance Calculator | MoneyCal India',
  description: 'Use our free Life Insurance Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/life-insurance-calculator'
  }
};

export default function Page() {
  return <LifeInsuranceCalculator />;
}
