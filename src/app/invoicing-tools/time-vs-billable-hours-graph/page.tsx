import React from 'react';
import { Metadata } from 'next';
import TimeVsBillableHoursGraph from './TimeVsBillableHoursGraphClient';

export const metadata: Metadata = {
  title: 'TimeVsBillableHoursGraph | MoneyCal India',
  description: 'Free online TimeVsBillableHoursGraph tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/time-vs-billable-hours-graph',
  }
};

export default function Page() {
  return <TimeVsBillableHoursGraph />;
}
