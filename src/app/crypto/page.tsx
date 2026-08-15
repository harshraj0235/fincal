import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CryptoClient';

export const metadata: Metadata = {
  title: 'Crypto | MoneyCal India',
  description: "Explore Crypto on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/crypto'
  }
};

export default function Page() {
  return <ClientComponent />;
}
