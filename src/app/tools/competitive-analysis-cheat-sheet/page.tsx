import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CompetitiveAnalysisCheatSheetClient';

export const metadata: Metadata = {
  title: 'Competitive Analysis Cheat Sheet | MoneyCal India',
  description: "Explore Competitive Analysis Cheat Sheet on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/competitive-analysis-cheat-sheet'
  }
};

export default function Page() {
  return <ClientComponent />;
}
