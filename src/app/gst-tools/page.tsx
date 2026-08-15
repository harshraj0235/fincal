import { Metadata } from 'next';
import GSTToolsClient from './GSTToolsClient';

export const metadata: Metadata = {
  title: 'GST Tools Hub | MoneyCal',
  description: 'Explore our comprehensive suite of GST calculators and compliance tools.',
  alternates: { canonical: 'https://moneycal.in/gst-tools' }
};

export default function GSTToolsPage() {
  return <GSTToolsClient />;
}
