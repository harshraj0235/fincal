import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PDFConvertersHubClient';

export const metadata: Metadata = {
  title: 'PDFConverters Hub | MoneyCal India',
  description: "Explore PDFConverters Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/pdfconverters-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
