import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AuthorProfilePageClient';

export const metadata: Metadata = {
  title: 'Author Profile Page | MoneyCal India',
  description: "Explore Author Profile Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/author-profile-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
