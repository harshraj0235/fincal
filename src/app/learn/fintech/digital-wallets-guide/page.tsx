import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DigitalWalletsGuideClient';

export const metadata: Metadata = {
  title: 'Digital Wallets Guide | MoneyCal India',
  description: "Explore Digital Wallets Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/fintech/digital-wallets-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
