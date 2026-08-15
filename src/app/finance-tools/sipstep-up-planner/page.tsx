import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPStepUpPlannerClient';

export const metadata: Metadata = {
  title: 'SIPStep Up Planner | MoneyCal India',
  description: "Explore SIPStep Up Planner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/sipstep-up-planner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
