import React from 'react';
import { Metadata } from 'next';
import STCGLTCGClassifier from './STCGLTCGClassifier';

export const metadata: Metadata = {
  title: 'S T C G L T C G Classifier | MoneyCal India',
  description: 'Use our free S T C G L T C G Classifier to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/s-t-c-g-l-t-c-g-classifier'
  }
};

export default function Page() {
  return <STCGLTCGClassifier />;
}
