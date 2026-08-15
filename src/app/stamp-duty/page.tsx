import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stamp Duty Calculator India - State-wise Rates & Registration Charges | MoneyCal',
  description: 'Calculate stamp duty & registration charges for property in all Indian states. State-wise stamp duty rates, exemptions & guide.',
  keywords: 'stamp duty calculator, registration charges, stamp duty rates India, property registration, stamp duty Maharashtra, stamp duty Delhi',
  alternates: { canonical: 'https://moneycal.in/stamp-duty' }
};

export default function Page() {
  redirect('/calculators/stamp-duty-calculator');
}
