import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NewsHomePageRevampedClient';

export const metadata: Metadata = {
  title: 'News Home Page Revamped | MoneyCal India',
  description: "Explore News Home Page Revamped on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/news/news-home-page-revamped'
  }
};

export default function Page() {
  return <ClientComponent />;
}
