import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ToolsPracticalApplicationClient';

export const metadata: Metadata = {
  title: 'Tools Practical Application | MoneyCal India',
  description: "Explore Tools Practical Application on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools-practical-application'
  }
};

export default function Page() {
  return <ClientComponent />;
}
