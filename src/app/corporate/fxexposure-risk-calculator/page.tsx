import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FXExposureRiskCalculatorClient';

export const metadata: Metadata = {
  title: 'FXExposure Risk Calculator | MoneyCal India',
  description: "Explore FXExposure Risk Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/fxexposure-risk-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
