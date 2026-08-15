import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CustomFestivalReminderClient';

export const metadata: Metadata = {
  title: 'Custom Festival Reminder | MoneyCal India',
  description: "Explore Custom Festival Reminder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/custom-festival-reminder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
