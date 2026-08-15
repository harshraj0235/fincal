import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ShubhMuhuratReminderClient';

export const metadata: Metadata = {
  title: 'Shubh Muhurat Reminder | MoneyCal India',
  description: "Explore Shubh Muhurat Reminder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/shubh-muhurat-reminder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
