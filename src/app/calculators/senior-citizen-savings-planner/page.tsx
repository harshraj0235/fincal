import React from 'react';
import { Metadata } from 'next';
import SeniorCitizenSavingsPlanner from './SeniorCitizenSavingsPlannerClient';

export const metadata: Metadata = {
  title: 'SeniorCitizenSavingsPlanner | MoneyCal India',
  description: 'Free online SeniorCitizenSavingsPlanner tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/calculators/senior-citizen-savings-planner',
  }
};

export default function Page() {
  return <SeniorCitizenSavingsPlanner />;
}
