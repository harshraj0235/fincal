import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './QRCodeGeneratorClient';

export const metadata: Metadata = {
  title: 'QRCode Generator | MoneyCal India',
  description: "Explore QRCode Generator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/qrcode-generator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
