import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HelpCenterClient';

export const metadata: Metadata = {
  title: 'Help Center | MoneyCal India',
  description: "Explore Help Center on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/help-center'
  }
};

export default function Page() {
  return <ClientComponent />;
}
