import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AssetAllocationClient';

export const metadata: Metadata = {
  title: 'Asset Allocation | MoneyCal India',
  description: "Explore Asset Allocation on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/asset-allocation'
  }
};

export default function Page() {
  return <ClientComponent />;
}
