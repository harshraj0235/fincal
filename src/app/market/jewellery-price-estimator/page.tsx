import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './JewelleryPriceEstimatorClient';

export const metadata: Metadata = {
  title: 'Jewellery Price Estimator | MoneyCal India',
  description: "Explore Jewellery Price Estimator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/market/jewellery-price-estimator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
