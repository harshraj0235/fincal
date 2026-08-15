import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GoldToolsClient';

export const metadata: Metadata = {
  title: 'Gold & Silver Tools | MoneyCal',
  description: 'Track live gold rates, purity, and plan your precious metal investments.',
  alternates: {
    canonical: 'https://moneycal.in/gold-tools'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
