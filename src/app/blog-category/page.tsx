import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BlogCategoryClient';

export const metadata: Metadata = {
  title: 'Blog Category | MoneyCal India',
  description: "Explore Blog Category on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/blog-category'
  }
};

export default function Page() {
  return <ClientComponent />;
}
