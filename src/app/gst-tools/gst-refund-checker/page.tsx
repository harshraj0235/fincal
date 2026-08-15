import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTRefundCheckerPageClient';

export const metadata: Metadata = {
  title: 'GSTRefund Checker Page | MoneyCal India',
  description: "Explore GSTRefund Checker Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstrefund-checker-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
