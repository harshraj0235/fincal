import React from 'react';
import { Metadata } from 'next';
import AmortizationScheduleViewer from './AmortizationScheduleViewer';

export const metadata: Metadata = {
  title: 'Amortization Schedule Viewer | MoneyCal India',
  description: 'Use our free Amortization Schedule Viewer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/amortization-schedule-viewer'
  }
};

export default function Page() {
  return <AmortizationScheduleViewer />;
}
