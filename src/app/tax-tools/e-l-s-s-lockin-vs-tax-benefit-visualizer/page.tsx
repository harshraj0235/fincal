import React from 'react';
import { Metadata } from 'next';
import ELSSLockinVsTaxBenefitVisualizer from './ELSSLockinVsTaxBenefitVisualizer';

export const metadata: Metadata = {
  title: 'E L S S Lockin Vs Tax Benefit Visualizer | MoneyCal India',
  description: 'Use our free E L S S Lockin Vs Tax Benefit Visualizer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/e-l-s-s-lockin-vs-tax-benefit-visualizer'
  }
};

export default function Page() {
  return <ELSSLockinVsTaxBenefitVisualizer />;
}
