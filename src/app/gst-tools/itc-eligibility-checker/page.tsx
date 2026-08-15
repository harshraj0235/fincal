import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ITCEligibilityCheckerPageClient';

export const metadata: Metadata = {
  title: 'ITCEligibility Checker Page | MoneyCal India',
  description: "Explore ITCEligibility Checker Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/itceligibility-checker-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
