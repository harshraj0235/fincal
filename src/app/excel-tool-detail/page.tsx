import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExcelToolDetailClient';

export const metadata: Metadata = {
  title: 'Excel Tool Detail | MoneyCal India',
  description: "Explore Excel Tool Detail on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/excel-tool-detail'
  }
};

export default function Page() {
  return <ClientComponent />;
}
