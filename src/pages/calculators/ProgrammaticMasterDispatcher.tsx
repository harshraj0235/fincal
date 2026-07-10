import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ProgrammaticEmiDispatcher } from './ProgrammaticEmiDispatcher';
import { ProgrammaticIncomeTaxDispatcher } from './ProgrammaticIncomeTaxDispatcher';
import { ProgrammaticSipDispatcher } from './ProgrammaticSipDispatcher';

export const ProgrammaticMasterDispatcher: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/404" replace />;

  if (slug.includes('-emi-calculator')) {
    return <ProgrammaticEmiDispatcher />;
  }

  if (slug.startsWith('income-tax-calculator-salary-')) {
    return <ProgrammaticIncomeTaxDispatcher />;
  }

  if (slug.startsWith('sip-calculator-for-')) {
    return <ProgrammaticSipDispatcher />;
  }

  return <Navigate to="/404" replace />;
};

export default ProgrammaticMasterDispatcher;
