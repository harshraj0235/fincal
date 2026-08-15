import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PosterMakerClient';

export const metadata: Metadata = {
  title: 'Poster Maker | MoneyCal India',
  description: "Explore Poster Maker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/poster-maker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
