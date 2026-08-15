import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTCompositionEligibilityClient';

export const metadata: Metadata = {
  title: 'GSTComposition Eligibility | MoneyCal India',
  description: "Explore GSTComposition Eligibility on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstcomposition-eligibility'
  }
};

export default function Page() {
  return <ClientComponent />;
}
