import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ToolsHubNewClient';

export const metadata: Metadata = {
  title: 'Tools Hub New | MoneyCal India',
  description: "Explore Tools Hub New on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools-hub-new'
  }
};

export default function Page() {
  return <ClientComponent />;
}
