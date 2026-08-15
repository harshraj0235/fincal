import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HealthInsuranceGuideClient';

export const metadata: Metadata = {
  title: 'Health Insurance Guide | MoneyCal India',
  description: "Explore Health Insurance Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/insurance/health-insurance-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
