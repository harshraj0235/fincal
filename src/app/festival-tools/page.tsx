import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalToolsClient';

export const metadata: Metadata = {
  title: 'Festival & Muhurat Tools | MoneyCal',
  description: 'Find auspicious dates, panchang details, and plan your festival budget easily.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
