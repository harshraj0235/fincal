import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExcelToolHubClient';

export const metadata: Metadata = {
  title: 'Excel Tool Hub | MoneyCal India',
  description: "Explore Excel Tool Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/excel-tool-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
