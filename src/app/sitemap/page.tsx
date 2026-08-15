import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SitemapClient';

export const metadata: Metadata = {
  title: 'Sitemap | MoneyCal India',
  description: "Explore Sitemap on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/sitemap'
  }
};

export default function Page() {
  return <ClientComponent />;
}
