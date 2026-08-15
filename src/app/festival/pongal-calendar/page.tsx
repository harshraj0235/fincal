import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PongalCalendarClient';

export const metadata: Metadata = {
  title: 'Pongal Calendar | MoneyCal India',
  description: "Explore Pongal Calendar on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/pongal-calendar'
  }
};

export default function Page() {
  return <ClientComponent />;
}
