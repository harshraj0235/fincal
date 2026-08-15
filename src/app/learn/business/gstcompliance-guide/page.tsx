import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTComplianceGuideClient';

export const metadata: Metadata = {
  title: 'GSTCompliance Guide | MoneyCal India',
  description: "Explore GSTCompliance Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business/gstcompliance-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
