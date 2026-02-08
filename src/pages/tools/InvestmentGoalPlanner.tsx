import React from 'react';
import { Navigate } from 'react-router-dom';

/** Investment goal planner - redirects to tools. Required default export for Next.js Pages Router. */
function InvestmentGoalPlanner() {
  return <Navigate to="/tools" replace />;
}

export default InvestmentGoalPlanner;
