import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GKHubClient';

export const metadata: Metadata = {
  title: 'GKHub | MoneyCal India',
  description: "Explore GKHub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gk/gkhub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
