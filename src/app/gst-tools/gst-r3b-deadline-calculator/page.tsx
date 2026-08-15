import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTR3BDeadlineCalculatorPageClient';

export const metadata: Metadata = {
  title: 'GSTR3BDeadline Calculator Page | MoneyCal India',
  description: "Explore GSTR3BDeadline Calculator Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstr3bdeadline-calculator-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
