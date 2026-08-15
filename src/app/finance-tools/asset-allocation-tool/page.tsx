import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AssetAllocationToolClient';

export const metadata: Metadata = {
  title: 'Asset Allocation Tool | MoneyCal India',
  description: "Explore Asset Allocation Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/asset-allocation-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
