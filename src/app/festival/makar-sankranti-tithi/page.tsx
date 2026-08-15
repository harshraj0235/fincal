import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MakarSankrantiTithiClient';

export const metadata: Metadata = {
  title: 'Makar Sankranti Tithi | MoneyCal India',
  description: "Explore Makar Sankranti Tithi on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/makar-sankranti-tithi'
  }
};

export default function Page() {
  return <ClientComponent />;
}
