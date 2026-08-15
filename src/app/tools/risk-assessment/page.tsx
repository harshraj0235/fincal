import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RiskAssessmentClient';

export const metadata: Metadata = {
  title: 'Risk Assessment | MoneyCal India',
  description: "Explore Risk Assessment on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/risk-assessment'
  }
};

export default function Page() {
  return <ClientComponent />;
}
