import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AdSenseVerificationClient';

export const metadata: Metadata = {
  title: 'Ad Sense Verification | MoneyCal India',
  description: "Explore Ad Sense Verification on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/ad-sense-verification'
  }
};

export default function Page() {
  return <ClientComponent />;
}
