import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExcelToolsPageClient';

export const metadata: Metadata = {
  title: 'Excel Tools Page | MoneyCal India',
  description: "Explore Excel Tools Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/excel-tools-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
