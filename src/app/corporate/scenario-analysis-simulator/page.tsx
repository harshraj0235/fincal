import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ScenarioAnalysisSimulatorClient';

export const metadata: Metadata = {
  title: 'Scenario Analysis Simulator | MoneyCal India',
  description: "Explore Scenario Analysis Simulator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/scenario-analysis-simulator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
