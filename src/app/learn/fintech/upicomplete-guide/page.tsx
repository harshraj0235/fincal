import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './UPICompleteGuideClient';

export const metadata: Metadata = {
  title: 'UPIComplete Guide | MoneyCal India',
  description: "Explore UPIComplete Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/fintech/upicomplete-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
