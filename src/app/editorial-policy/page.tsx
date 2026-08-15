import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EditorialPolicyClient';

export const metadata: Metadata = {
  title: 'Editorial Policy | MoneyCal India',
  description: "Explore Editorial Policy on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/editorial-policy'
  }
};

export default function Page() {
  return <ClientComponent />;
}
