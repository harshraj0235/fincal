import React from 'react';
import { Navigate } from 'react-router-dom';

/** News home revamped - redirects to main news. Required default export for Next.js Pages Router. */
function NewsHomePageRevamped() {
  return <Navigate to="/news" replace />;
}

export default NewsHomePageRevamped;
