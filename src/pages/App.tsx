import type { GetServerSideProps } from 'next';

/** Placeholder page - redirects to home. Forces SSR to avoid prerender (useEffect null) on Cloudflare. */
export default function App() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { destination: '/', permanent: false } };
};