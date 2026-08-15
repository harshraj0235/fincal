"use client";
import React from 'react';
import { redirect, useParams } from 'next/navigation';
import { ProgrammaticEmiDispatcher } from '@/app/calculators/programmatic-emi-dispatcher/ProgrammaticEmiDispatcherClient';
import { ProgrammaticIncomeTaxDispatcher } from '@/app/calculators/programmatic-income-tax-dispatcher/ProgrammaticIncomeTaxDispatcherClient';
import { ProgrammaticSipDispatcher } from '@/app/calculators/programmatic-sip-dispatcher/ProgrammaticSipDispatcherClient';

export const ProgrammaticMasterDispatcher: React.FC = () => {
  const { slug } = (useParams<{ slug: string }>() || {});

  if (!slug) return ((() => { return null; return null; })());

  if (slug.includes('-emi-calculator')) {
    return <ProgrammaticEmiDispatcher />;
  }

  if (slug.startsWith('income-tax-calculator-salary-')) {
    return <ProgrammaticIncomeTaxDispatcher />;
  }

  if (slug.startsWith('sip-calculator-for-')) {
    return <ProgrammaticSipDispatcher />;
  }

  return ((() => { return null; return null; })());
};

export default ProgrammaticMasterDispatcher;
