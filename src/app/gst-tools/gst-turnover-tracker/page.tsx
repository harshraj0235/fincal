import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTTurnoverTrackerClient';

export const metadata: Metadata = {
  title: 'GSTTurnover Tracker | MoneyCal India',
  description: "Explore GSTTurnover Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstturnover-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
