import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NewsHubClient';

export const metadata: Metadata = {
  title: 'News Hub | MoneyCal India',
  description: "Explore News Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/news-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
