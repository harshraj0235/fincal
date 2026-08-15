import React from 'react';
import { Metadata } from 'next';
import ParsiNewYear from './ParsiNewYear';

export const metadata: Metadata = {
  title: 'Parsi New Year | MoneyCal India',
  description: 'Use our free Parsi New Year to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/parsi-new-year'
  }
};

export default function Page() {
  return <ParsiNewYear />;
}
