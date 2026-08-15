import React from 'react';
import { Metadata } from 'next';
import FXExposureRiskCalculator from './FXExposureRiskCalculatorClient';

export const metadata: Metadata = {
  title: 'FXExposureRiskCalculator | MoneyCal India',
  description: 'Free online FXExposureRiskCalculator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/fx-exposure-risk-calculator',
  }
};

export default function Page() {
  return <FXExposureRiskCalculator />;
}
