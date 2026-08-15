import React from 'react';
import { Metadata } from 'next';
import AuspiciousMarriageDays from './AuspiciousMarriageDays';

export const metadata: Metadata = {
  title: 'Auspicious Marriage Days | MoneyCal India',
  description: 'Use our free Auspicious Marriage Days to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/auspicious-marriage-days'
  }
};

export default function Page() {
  return <AuspiciousMarriageDays />;
}
