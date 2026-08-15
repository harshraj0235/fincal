import React from 'react';
import { Metadata } from 'next';
import GoldToolPage from './GoldToolPage';

export const metadata: Metadata = {
  title: 'Gold Tool Page | MoneyCal India',
  description: 'Use our free Gold Tool Page to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/gold-tools/gold-tool-page'
  }
};

export default function Page() {
  return <GoldToolPage />;
}
