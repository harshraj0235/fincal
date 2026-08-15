import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinTechAppsGuideClient';

export const metadata: Metadata = {
  title: 'Fin Tech Apps Guide | MoneyCal India',
  description: "Explore Fin Tech Apps Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/fintech/fin-tech-apps-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
