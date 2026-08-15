import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CryptoSectionClient';

export const metadata: Metadata = {
  title: 'Crypto Section | MoneyCal India',
  description: "Explore Crypto Section on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/crypto-section'
  }
};

export default function Page() {
  return <ClientComponent />;
}
