import dynamic from 'next/dynamic';

const App = dynamic(() => import('../App'), { ssr: false });

/** ISR: revalidate home every hour */
export const revalidate = 3600;

export default function HomePage() {
  return <App pathname="/" skipLayout />;
}
