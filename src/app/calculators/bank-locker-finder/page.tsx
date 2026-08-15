import React from 'react';
import { Metadata } from 'next';
import BankLockerFinder from './BankLockerFinderClient';

export const metadata: Metadata = {
  title: 'BankLockerFinder | MoneyCal India',
  description: 'Free online BankLockerFinder tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/calculators/bank-locker-finder',
  }
};

export default function Page() {
  return <BankLockerFinder />;
}
