import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SimpleStockValuationToolClient';

export const metadata: Metadata = {
  title: 'Simple Stock Valuation Tool | MoneyCal India',
  description: "Explore Simple Stock Valuation Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/simple-stock-valuation-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
