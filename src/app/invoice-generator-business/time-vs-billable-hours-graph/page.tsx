import React from 'react';
import { Metadata } from 'next';
import TimeVsBillableHoursGraph from './TimeVsBillableHoursGraph';

export const metadata: Metadata = {
  title: 'Time Vs Billable Hours Graph | MoneyCal India',
  description: 'Use our free Time Vs Billable Hours Graph to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/time-vs-billable-hours-graph'
  }
};

export default function Page() {
  return <TimeVsBillableHoursGraph />;
}
