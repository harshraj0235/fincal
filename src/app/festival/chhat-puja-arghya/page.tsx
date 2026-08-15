import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ChhatPujaArghyaClient';

export const metadata: Metadata = {
  title: 'Chhat Puja Arghya | MoneyCal India',
  description: "Explore Chhat Puja Arghya on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/chhat-puja-arghya'
  }
};

export default function Page() {
  return <ClientComponent />;
}
