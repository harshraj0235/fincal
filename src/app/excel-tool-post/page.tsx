import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExcelToolPostClient';

export const metadata: Metadata = {
  title: 'Excel Tool Post | MoneyCal India',
  description: "Explore Excel Tool Post on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/excel-tool-post'
  }
};

export default function Page() {
  return <ClientComponent />;
}
