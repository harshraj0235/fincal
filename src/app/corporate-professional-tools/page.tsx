import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CorporateProfessionalToolsClient';

export const metadata: Metadata = {
  title: 'Corporate Professional Tools | MoneyCal India',
  description: "Explore Corporate Professional Tools on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate-professional-tools'
  }
};

export default function Page() {
  return <ClientComponent />;
}
