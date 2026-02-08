import React from 'react';
import { Navigate } from 'react-router-dom';

/** Akshaya Tritiya Muhurat page - redirects to festival tools. Required default export for Next.js Pages Router. */
function AkshayaTritiyaMuhurat() {
  return <Navigate to="/festival-tools" replace />;
}

export default AkshayaTritiyaMuhurat;
