import { useState, useEffect } from 'react';
import { formatReviewedDate } from '../utils/formatReviewedDate';

const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Returns the current date formatted as "11 Feb 2026", auto-refreshes every 24 hours
 */
export function useReviewedDate(): string {
  const [date, setDate] = useState(() => formatReviewedDate(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(formatReviewedDate(new Date()));
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return date;
}
