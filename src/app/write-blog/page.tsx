import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WriteBlogClient';

export const metadata: Metadata = {
  title: 'Write Blog | MoneyCal India',
  description: "Explore Write Blog on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/write-blog'
  }
};

export default function Page() {
  return <ClientComponent />;
}
