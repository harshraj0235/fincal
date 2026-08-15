import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InsuranceToolsClient';

export const metadata: Metadata = {
  title: 'INSURANCE TOOLS | MoneyCal',
  description: 'Explore the best financial tools and calculators for insurance tools in India.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
