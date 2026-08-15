import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundStarRatingsExplorerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Star Ratings Explorer | MoneyCal India',
  description: "Explore Mutual Fund Star Ratings Explorer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-star-ratings-explorer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
