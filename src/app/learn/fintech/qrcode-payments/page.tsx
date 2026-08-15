import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './QRCodePaymentsClient';

export const metadata: Metadata = {
  title: 'QRCode Payments | MoneyCal India',
  description: "Explore QRCode Payments on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/fintech/qrcode-payments'
  }
};

export default function Page() {
  return <ClientComponent />;
}
