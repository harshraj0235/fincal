import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us | MoneyCal India',
  description: "Explore About Us on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/about-us'
  }
};

export default function Page() {
  return <ClientComponent />;
}
