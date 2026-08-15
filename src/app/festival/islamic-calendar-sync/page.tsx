import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IslamicCalendarSyncClient';

export const metadata: Metadata = {
  title: 'Islamic Calendar Sync | MoneyCal India',
  description: "Explore Islamic Calendar Sync on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/islamic-calendar-sync'
  }
};

export default function Page() {
  return <ClientComponent />;
}
