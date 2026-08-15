import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PriceTagLabelCreatorClient';

export const metadata: Metadata = {
  title: 'Price Tag Label Creator | MoneyCal India',
  description: "Explore Price Tag Label Creator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/price-tag-label-creator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
