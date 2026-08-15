import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FlexiSIPPlannerClient';

export const metadata: Metadata = {
  title: 'Flexi SIPPlanner | MoneyCal India',
  description: "Explore Flexi SIPPlanner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/flexi-sipplanner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
