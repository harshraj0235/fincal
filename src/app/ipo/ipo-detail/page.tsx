import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IpoDetailClient';

export const metadata: Metadata = {
  title: 'Ipo Detail | MoneyCal India',
  description: "Explore Ipo Detail on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/ipo/ipo-detail'
  }
};

export default function Page() {
  return <ClientComponent />;
}
