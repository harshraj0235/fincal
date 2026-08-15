import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BrowseAllClient';

export const metadata: Metadata = {
  title: 'Browse All | MoneyCal India',
  description: "Explore Browse All on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/browse-all'
  }
};

export default function Page() {
  return <ClientComponent />;
}
