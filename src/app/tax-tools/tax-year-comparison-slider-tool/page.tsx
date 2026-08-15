import React from 'react';
import { Metadata } from 'next';
import TaxYearComparisonSliderTool from './TaxYearComparisonSliderTool';

export const metadata: Metadata = {
  title: 'Tax Year Comparison Slider Tool | MoneyCal India',
  description: 'Use our free Tax Year Comparison Slider Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/tax-year-comparison-slider-tool'
  }
};

export default function Page() {
  return <TaxYearComparisonSliderTool />;
}
