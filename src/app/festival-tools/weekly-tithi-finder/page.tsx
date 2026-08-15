import React from 'react';
import { Metadata } from 'next';
import WeeklyTithiFinder from './WeeklyTithiFinder';

export const metadata: Metadata = {
  title: 'Weekly Tithi Finder | MoneyCal India',
  description: 'Use our free Weekly Tithi Finder to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/weekly-tithi-finder'
  }
};

export default function Page() {
  return <WeeklyTithiFinder />;
}
