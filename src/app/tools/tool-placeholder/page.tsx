import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ToolPlaceholderClient';

export const metadata: Metadata = {
  title: 'Tool Placeholder | MoneyCal India',
  description: "Explore Tool Placeholder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/tool-placeholder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
