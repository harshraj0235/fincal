import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTHSNSACFinderClient';

export const metadata: Metadata = {
  title: 'GSTHSNSACFinder | MoneyCal India',
  description: "Explore GSTHSNSACFinder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gsthsnsacfinder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
