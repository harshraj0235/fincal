import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BuyNowPayLaterGuideClient';

export const metadata: Metadata = {
  title: 'Buy Now Pay Later Guide | MoneyCal India',
  description: "Explore Buy Now Pay Later Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/fintech/buy-now-pay-later-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
