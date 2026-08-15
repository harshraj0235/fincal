import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NewsReelClient';

export const metadata: Metadata = {
  title: 'News Reel | MoneyCal India',
  description: "Explore News Reel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/news-reel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
