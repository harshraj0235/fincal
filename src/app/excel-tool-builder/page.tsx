import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExcelToolBuilderClient';

export const metadata: Metadata = {
  title: 'Excel Tool Builder | MoneyCal India',
  description: "Explore Excel Tool Builder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/excel-tool-builder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
