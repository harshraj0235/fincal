import React from 'react';
import { Metadata } from 'next';
import ScenarioAnalysisSimulator from './ScenarioAnalysisSimulatorClient';

export const metadata: Metadata = {
  title: 'ScenarioAnalysisSimulator | MoneyCal India',
  description: 'Free online ScenarioAnalysisSimulator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/scenario-analysis-simulator',
  }
};

export default function Page() {
  return <ScenarioAnalysisSimulator />;
}
