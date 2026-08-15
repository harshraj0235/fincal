import React from 'react';
import { Metadata } from 'next';
import ShortTermLossOffsetVisualizer from './ShortTermLossOffsetVisualizer';

export const metadata: Metadata = {
  title: 'Short Term Loss Offset Visualizer | MoneyCal India',
  description: 'Use our free Short Term Loss Offset Visualizer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/short-term-loss-offset-visualizer'
  }
};

export default function Page() {
  return <ShortTermLossOffsetVisualizer />;
}
