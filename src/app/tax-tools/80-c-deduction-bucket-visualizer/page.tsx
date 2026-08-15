import React from 'react';
import { Metadata } from 'next';
import _80CDeductionBucketVisualizer from './80CDeductionBucketVisualizer';

export const metadata: Metadata = {
  title: '80 C Deduction Bucket Visualizer | MoneyCal India',
  description: 'Use our free 80 C Deduction Bucket Visualizer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/80-c-deduction-bucket-visualizer'
  }
};

export default function Page() {
  return <_80CDeductionBucketVisualizer />;
}
