import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BlogPostClient';

export const metadata: Metadata = {
  title: 'Blog Post | MoneyCal India',
  description: "Explore Blog Post on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/blog-post'
  }
};

export default function Page() {
  return <ClientComponent />;
}
