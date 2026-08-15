import React from 'react';
import { Metadata } from 'next';
import ToolsHubClient from './ToolsHubClient';

export const metadata: Metadata = {
  title: '200+ Free Financial Tools & Calculators | MoneyCal',
  description: 'Explore India\'s largest collection of free financial calculators. SIP, EMI, Income Tax, PPF, NPS, GST, and more.',
  alternates: {
    canonical: 'https://moneycal.in/tools'
  }
};

export default function ToolsHubPage() {
  return <ToolsHubClient />;
}
