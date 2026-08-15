import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BuildingEmergencyFundClient';

export const metadata: Metadata = {
  title: 'Building Emergency Fund | MoneyCal India',
  description: "Explore Building Emergency Fund on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/money-management/building-emergency-fund'
  }
};

export default function Page() {
  return <ClientComponent />;
}
