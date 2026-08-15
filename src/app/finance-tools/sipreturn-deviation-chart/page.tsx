import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPReturnDeviationChartClient';

export const metadata: Metadata = {
  title: 'SIPReturn Deviation Chart | MoneyCal India',
  description: "Explore SIPReturn Deviation Chart on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/sipreturn-deviation-chart'
  }
};

export default function Page() {
  return <ClientComponent />;
}
