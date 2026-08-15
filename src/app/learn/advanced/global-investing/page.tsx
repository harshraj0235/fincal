import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GlobalInvestingClient';

export const metadata: Metadata = {
  title: 'Global Investing | MoneyCal India',
  description: "Explore Global Investing on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/advanced/global-investing'
  }
};

export default function Page() {
  return <ClientComponent />;
}
