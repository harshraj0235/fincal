import React from 'react';
import { Metadata } from 'next';
import MoonPhaseFestivals from './MoonPhaseFestivals';

export const metadata: Metadata = {
  title: 'Moon Phase Festivals | MoneyCal India',
  description: 'Use our free Moon Phase Festivals to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/moon-phase-festivals'
  }
};

export default function Page() {
  return <MoonPhaseFestivals />;
}
