import React from 'react';
import { Metadata } from 'next';
import PortfolioDashboard from './PortfolioDashboard';

export const metadata: Metadata = {
  title: 'Portfolio Dashboard | MoneyCal India',
  description: 'Use our free Portfolio Dashboard to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/portfolio-dashboard'
  }
};

export default function Page() {
  return <PortfolioDashboard />;
}
