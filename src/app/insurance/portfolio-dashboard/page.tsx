import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PortfolioDashboardClient';

export const metadata: Metadata = {
  title: 'Portfolio Dashboard | MoneyCal India',
  description: "Explore Portfolio Dashboard on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/portfolio-dashboard'
  }
};

export default function Page() {
  return <ClientComponent />;
}
