import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExcelToolClient';

export const metadata: Metadata = {
  title: 'Excel Tool | MoneyCal India',
  description: "Explore Excel Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/excel-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
