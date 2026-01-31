import { useState, useEffect, useCallback } from 'react';
import {
  fetchCustomShortsFromServer,
  mergeShorts,
  type NewsShort,
} from '../data/newsShortsData';

export function useNewsShorts(): {
  shorts: NewsShort[];
  loading: boolean;
  refetch: () => Promise<void>;
} {
  const [shorts, setShorts] = useState<NewsShort[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const serverCustom = await fetchCustomShortsFromServer();
      setShorts(mergeShorts(serverCustom));
    } catch (_e) {
      const { getNewsShorts } = await import('../data/newsShortsData');
      setShorts(getNewsShorts());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { shorts, loading, refetch: load };
}
