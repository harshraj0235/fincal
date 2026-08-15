import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CertificateClient';

export const metadata: Metadata = {
  title: 'Certificate | MoneyCal India',
  description: "Explore Certificate on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/certificate'
  }
};

export default function Page() {
  return <ClientComponent />;
}
