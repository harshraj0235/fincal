import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GovernmentSchemeCategoryPageClient';

export const metadata: Metadata = {
  title: 'Government Scheme Category Page | MoneyCal India',
  description: "Explore Government Scheme Category Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/government-scheme-category-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
