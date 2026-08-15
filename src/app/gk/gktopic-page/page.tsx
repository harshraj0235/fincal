import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GKTopicPageClient';

export const metadata: Metadata = {
  title: 'GKTopic Page | MoneyCal India',
  description: "Explore GKTopic Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gk/gktopic-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
