import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GamesHubClient';

export const metadata: Metadata = {
  title: 'Games Hub | MoneyCal India',
  description: "Explore Games Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/games/games-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
