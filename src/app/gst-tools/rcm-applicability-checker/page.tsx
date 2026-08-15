import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RCMApplicabilityCheckerPageClient';

export const metadata: Metadata = {
  title: 'RCMApplicability Checker Page | MoneyCal India',
  description: "Explore RCMApplicability Checker Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/rcmapplicability-checker-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
