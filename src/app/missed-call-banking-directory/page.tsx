import React from 'react';
import { Metadata } from 'next';
import MissedCallBankingDirectory from './MissedCallBankingDirectoryClient';

export const metadata: Metadata = {
  title: 'MissedCallBankingDirectory | MoneyCal India',
  description: 'Free online MissedCallBankingDirectory tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/missed-call-banking-directory',
  }
};

export default function Page() {
  return <MissedCallBankingDirectory />;
}
