'use client';

import React, { createContext, useContext } from 'react';
import type { ServerContent } from '../lib/serverContent';

const ServerContentContext = createContext<ServerContent | null>(null);

export function ServerContentProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ServerContent | null;
}) {
  return (
    <ServerContentContext.Provider value={value}>
      {children}
    </ServerContentContext.Provider>
  );
}

export function useServerContent(): ServerContent | null {
  return useContext(ServerContentContext);
}
