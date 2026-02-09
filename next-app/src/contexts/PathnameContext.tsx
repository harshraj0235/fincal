'use client';

import React from 'react';

/** SSR-safe: Next passes pathname when wrapping App; otherwise use window (client only). */
export const PathnameContext = React.createContext<string | undefined>(undefined);

export function usePathnameSafe(): string {
  const fromContext = React.useContext(PathnameContext);
  if (fromContext !== undefined) return fromContext;
  if (typeof window !== 'undefined') return window.location.pathname;
  return '/';
}

/** Base URL for canonical/share links: SSR uses moneycal.in. */
export function useOriginSafe(): string {
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
  return 'https://moneycal.in';
}
