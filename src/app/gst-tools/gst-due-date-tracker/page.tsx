import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTDueDateTrackerClient';

export const metadata: Metadata = {
  title: 'GSTDue Date Tracker | MoneyCal India',
  description: "Explore GSTDue Date Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstdue-date-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
