import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ipo-hub/IpoHubClient';

export const metadata: Metadata = {
  title: 'IPO Dashboard 2026 - Upcoming IPOs, GMP, Allotment Status | MoneyCal',
  description: 'Track upcoming IPOs, Grey Market Premium (GMP), allotment status, listing date predictions. Real-time IPO dashboard for Indian stock market investors.',
  keywords: 'IPO 2026, upcoming IPO, IPO GMP today, IPO allotment status, IPO listing date, mainboard IPO, SME IPO, IPO grey market premium',
  alternates: { canonical: 'https://moneycal.in/ipo' }
};

export default function Page() {
  return <ClientComponent />;
}
