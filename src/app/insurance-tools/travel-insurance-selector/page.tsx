import React from 'react';
import { Metadata } from 'next';
import TravelInsuranceSelector from './TravelInsuranceSelector';

export const metadata: Metadata = {
  title: 'Travel Insurance Selector | MoneyCal India',
  description: 'Use our free Travel Insurance Selector to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/travel-insurance-selector'
  }
};

export default function Page() {
  return <TravelInsuranceSelector />;
}
