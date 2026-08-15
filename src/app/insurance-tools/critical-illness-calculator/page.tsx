import React from 'react';
import { Metadata } from 'next';
import CriticalIllnessCalculator from './CriticalIllnessCalculator';

export const metadata: Metadata = {
  title: 'Critical Illness Calculator | MoneyCal India',
  description: 'Use our free Critical Illness Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/critical-illness-calculator'
  }
};

export default function Page() {
  return <CriticalIllnessCalculator />;
}
