import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IndianHolidayCalendarSyncClient';

export const metadata: Metadata = {
  title: 'Indian Holiday Calendar Sync | MoneyCal India',
  description: "Explore Indian Holiday Calendar Sync on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/indian-holiday-calendar-sync'
  }
};

export default function Page() {
  return <ClientComponent />;
}
