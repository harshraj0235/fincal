import React from 'react';
import { Metadata } from 'next';
import PanchangToday from './PanchangToday';

export const metadata: Metadata = {
  title: 'Panchang Today | MoneyCal India',
  description: 'Use our free Panchang Today to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/panchang-today'
  }
};

export default function Page() {
  return <PanchangToday />;
}
