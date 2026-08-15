import React from 'react';
import { Metadata } from 'next';
import ITRFormTypeHelper from './ITRFormTypeHelper';

export const metadata: Metadata = {
  title: 'I T R Form Type Helper | MoneyCal India',
  description: 'Use our free I T R Form Type Helper to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/i-t-r-form-type-helper'
  }
};

export default function Page() {
  return <ITRFormTypeHelper />;
}
