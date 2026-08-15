import React from 'react';
import { Metadata } from 'next';
import FXExposureRiskCalculator from './FXExposureRiskCalculator';

export const metadata: Metadata = {
  title: 'F X Exposure Risk Calculator | MoneyCal India',
  description: 'Use our free F X Exposure Risk Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/f-x-exposure-risk-calculator'
  }
};

export default function Page() {
  return <FXExposureRiskCalculator />;
}
