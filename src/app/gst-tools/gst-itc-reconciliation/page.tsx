import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTITCReconciliationClient';

export const metadata: Metadata = {
  title: 'GSTITCReconciliation | MoneyCal India',
  description: "Explore GSTITCReconciliation on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstitcreconciliation'
  }
};

export default function Page() {
  return <ClientComponent />;
}
