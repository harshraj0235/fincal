import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GKCategoryPageClient';

export const metadata: Metadata = {
  title: 'GKCategory Page | MoneyCal India',
  description: "Explore GKCategory Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gk/gkcategory-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
