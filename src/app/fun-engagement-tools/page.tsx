import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FunEngagementToolsClient';

export const metadata: Metadata = {
  title: 'Fun Engagement Tools | MoneyCal India',
  description: "Explore Fun Engagement Tools on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/fun-engagement-tools'
  }
};

export default function Page() {
  return <ClientComponent />;
}
