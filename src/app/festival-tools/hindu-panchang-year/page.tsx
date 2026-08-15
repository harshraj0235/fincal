import React from 'react';
import { Metadata } from 'next';
import HinduPanchangYear from './HinduPanchangYear';

export const metadata: Metadata = {
  title: 'Hindu Panchang Year | MoneyCal India',
  description: 'Use our free Hindu Panchang Year to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/hindu-panchang-year'
  }
};

export default function Page() {
  return <HinduPanchangYear />;
}
