import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTSlabFinderClient';

export const metadata: Metadata = {
  title: 'GSTSlab Finder | MoneyCal India',
  description: "Explore GSTSlab Finder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstslab-finder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
