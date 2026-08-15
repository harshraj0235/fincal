import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPVsSWPToolClient';

export const metadata: Metadata = {
  title: 'SIPVs SWPTool | MoneyCal India',
  description: "Explore SIPVs SWPTool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/sipvs-swptool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
