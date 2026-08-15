import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RakshaBandhanMuhuratClient';

export const metadata: Metadata = {
  title: 'Raksha Bandhan Muhurat | MoneyCal India',
  description: "Explore Raksha Bandhan Muhurat on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/raksha-bandhan-muhurat'
  }
};

export default function Page() {
  return <ClientComponent />;
}
