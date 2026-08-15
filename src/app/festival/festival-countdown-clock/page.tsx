import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalCountdownClockClient';

export const metadata: Metadata = {
  title: 'Festival Countdown Clock | MoneyCal India',
  description: "Explore Festival Countdown Clock on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/festival-countdown-clock'
  }
};

export default function Page() {
  return <ClientComponent />;
}
