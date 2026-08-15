import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RamadanTimetableClient';

export const metadata: Metadata = {
  title: 'Ramadan Timetable | MoneyCal India',
  description: "Explore Ramadan Timetable on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/ramadan-timetable'
  }
};

export default function Page() {
  return <ClientComponent />;
}
