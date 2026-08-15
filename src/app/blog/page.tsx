import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog | MoneyCal India',
  description: "Explore Blog on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/blog'
  }
};

export default function Page() {
  return <ClientComponent />;
}
