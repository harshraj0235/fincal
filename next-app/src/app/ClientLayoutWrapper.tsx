'use client';

import { Layout } from '../components/Layout';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
