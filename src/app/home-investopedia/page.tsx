import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HomeInvestopediaClient';

export const metadata: Metadata = {
  title: 'Home Investopedia | MoneyCal India',
  description: "Explore Home Investopedia on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/home-investopedia'
  }
};

export default function Page() {
  return <ClientComponent />;
}
