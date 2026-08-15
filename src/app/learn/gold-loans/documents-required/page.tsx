import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DocumentsRequiredClient';

export const metadata: Metadata = {
  title: 'Documents Required | MoneyCal India',
  description: "Explore Documents Required on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/gold-loans/documents-required'
  }
};

export default function Page() {
  return <ClientComponent />;
}
