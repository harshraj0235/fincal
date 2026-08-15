import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CategoryPageClient';

export const metadata: Metadata = {
  title: 'Category Page | MoneyCal India',
  description: "Explore Category Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/category-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
