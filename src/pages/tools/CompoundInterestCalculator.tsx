import React from 'react';
import { Navigate } from 'react-router-dom';

/** Compound interest calculator - redirects to tools. Required default export for Next.js Pages Router. */
function CompoundInterestCalculator() {
  return <Navigate to="/tools" replace />;
}

export default CompoundInterestCalculator;
