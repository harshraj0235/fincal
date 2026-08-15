import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTEWayDistanceCalculatorClient';

export const metadata: Metadata = {
  title: 'GSTEWay Distance Calculator | MoneyCal India',
  description: "Explore GSTEWay Distance Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gsteway-distance-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
