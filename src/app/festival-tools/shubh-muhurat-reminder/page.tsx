import React from 'react';
import { Metadata } from 'next';
import ShubhMuhuratReminder from './ShubhMuhuratReminder';

export const metadata: Metadata = {
  title: 'Shubh Muhurat Reminder | MoneyCal India',
  description: 'Use our free Shubh Muhurat Reminder to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/shubh-muhurat-reminder'
  }
};

export default function Page() {
  return <ShubhMuhuratReminder />;
}
