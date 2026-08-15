import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './OnamDateReminderClient';

export const metadata: Metadata = {
  title: 'Onam Date Reminder | MoneyCal India',
  description: "Explore Onam Date Reminder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/onam-date-reminder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
