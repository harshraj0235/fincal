import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './STCGLTCGClassifierClient';

export const metadata: Metadata = {
  title: 'STCGLTCGClassifier | MoneyCal India',
  description: "Explore STCGLTCGClassifier on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/stcgltcgclassifier'
  }
};

export default function Page() {
  return <ClientComponent />;
}
