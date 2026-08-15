import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TermsOfServiceClient';

export const metadata: Metadata = {
  title: 'Terms Of Service | MoneyCal India',
  description: "Explore Terms Of Service on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/terms-of-service'
  }
};

export default function Page() {
  return <ClientComponent />;
}
