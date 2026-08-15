import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Finance Hub - Budgeting, Savings & Money Management | MoneyCal',
  description: 'Personal finance tools & guides - budget planner, expense tracker, savings calculator, net worth calculator, financial planning India.',
  keywords: 'personal finance India, budget planner, expense tracker, savings calculator, money management, financial planning',
  alternates: { canonical: 'https://moneycal.in/personal-finance' }
};

export default function Page() {
  redirect('/personal-finance-management');
}
