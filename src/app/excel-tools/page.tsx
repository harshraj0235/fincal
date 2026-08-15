import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Excel Templates & Financial Spreadsheets India | MoneyCal',
  description: 'Download free Excel templates - budget tracker, EMI calculator, salary slip, invoice template, stock portfolio tracker & more financial spreadsheets.',
  keywords: 'free Excel templates, financial spreadsheet, budget tracker Excel, EMI calculator Excel, salary slip template, invoice template Excel',
  alternates: { canonical: 'https://moneycal.in/excel-tools' }
};

export default function Page() {
  redirect('/excel-tools-page');
}
