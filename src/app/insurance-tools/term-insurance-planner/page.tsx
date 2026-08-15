import React from 'react';
import { Metadata } from 'next';
import TermInsurancePlanner from './TermInsurancePlanner';

export const metadata: Metadata = {
  title: 'Term Insurance Planner | MoneyCal India',
  description: 'Use our free Term Insurance Planner to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/term-insurance-planner'
  }
};

export default function Page() {
  return <TermInsurancePlanner />;
}
