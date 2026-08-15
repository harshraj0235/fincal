import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EmbedPageClient';

export const metadata: Metadata = {
  title: 'Embed Page | MoneyCal India',
  description: "Explore Embed Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/embed-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
