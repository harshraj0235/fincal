import { useMemo } from 'react';
import { getNewsShorts, type NewsShort, type NewsShortCategory } from '../data/newsShortsData';

export interface UseNewsShortsResult {
  shorts: NewsShort[];
  loading: boolean;
  refetch: () => void;
}

/**
 * Returns the list of news shorts (Inshorts-style). Static for now; can be extended with fetch/custom later.
 */
export function useNewsShorts(): UseNewsShortsResult {
  const shorts = useMemo(() => {
    const list = getNewsShorts();
    return list.sort(
      (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
  }, []);

  return {
    shorts,
    loading: false,
    refetch: () => {},
  };
}
