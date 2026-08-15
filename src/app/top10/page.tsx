import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './Top10Client';

export const metadata: Metadata = {
  title: 'Top10 | MoneyCal India',
  description: "Explore Top10 on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/top10'
  }
};

export default function Page() {
  return <ClientComponent />;
}
