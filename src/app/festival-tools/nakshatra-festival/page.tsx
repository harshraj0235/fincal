import React from 'react';
import { Metadata } from 'next';
import NakshatraFestival from './NakshatraFestival';

export const metadata: Metadata = {
  title: 'Nakshatra Festival | MoneyCal India',
  description: 'Use our free Nakshatra Festival to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/nakshatra-festival'
  }
};

export default function Page() {
  return <NakshatraFestival />;
}
