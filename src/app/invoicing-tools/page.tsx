import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Invoice Generator & Billing Tools India | MoneyCal',
  description: 'Free online invoice generator, GST invoice maker, billing tools for Indian freelancers & small businesses. Download PDF invoices instantly.',
  keywords: 'invoice generator free, GST invoice maker, billing software India, free invoice template, online invoice generator',
  alternates: { canonical: 'https://moneycal.in/invoicing-tools' }
};

export default function Page() {
  redirect('/invoice-generator-business');
}
