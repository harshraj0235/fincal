import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HSNSACFinderPageClient';

export const metadata: Metadata = {
  title: 'HSNSACFinder Page | MoneyCal India',
  description: "Explore HSNSACFinder Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/hsnsacfinder-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
