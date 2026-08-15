import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MoneyBlogClient';

export const metadata: Metadata = {
  title: 'Money Blog | MoneyCal India',
  description: "Explore Money Blog on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/money-blog'
  }
};

export default function Page() {
  return <ClientComponent />;
}
