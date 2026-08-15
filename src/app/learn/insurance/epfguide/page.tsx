import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EPFGuideClient';

export const metadata: Metadata = {
  title: 'EPFGuide | MoneyCal India',
  description: "Explore EPFGuide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/insurance/epfguide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
