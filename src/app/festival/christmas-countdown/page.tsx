import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ChristmasCountdownClient';

export const metadata: Metadata = {
  title: 'Christmas Countdown | MoneyCal India',
  description: "Explore Christmas Countdown on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/christmas-countdown'
  }
};

export default function Page() {
  return <ClientComponent />;
}
