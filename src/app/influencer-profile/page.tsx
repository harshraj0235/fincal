import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InfluencerProfileClient';

export const metadata: Metadata = {
  title: 'Influencer Profile | MoneyCal India',
  description: "Explore Influencer Profile on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/influencer-profile'
  }
};

export default function Page() {
  return <ClientComponent />;
}
