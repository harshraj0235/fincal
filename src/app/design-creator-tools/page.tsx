import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DesignCreatorToolsClient';

export const metadata: Metadata = {
  title: 'Design Creator Tools | MoneyCal India',
  description: "Explore Design Creator Tools on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/design-creator-tools'
  }
};

export default function Page() {
  return <ClientComponent />;
}
