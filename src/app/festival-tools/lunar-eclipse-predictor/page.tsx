import React from 'react';
import { Metadata } from 'next';
import LunarEclipsePredictor from './LunarEclipsePredictor';

export const metadata: Metadata = {
  title: 'Lunar Eclipse Predictor | MoneyCal India',
  description: 'Use our free Lunar Eclipse Predictor to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/lunar-eclipse-predictor'
  }
};

export default function Page() {
  return <LunarEclipsePredictor />;
}
