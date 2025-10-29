import { getAllCalculators } from '../data/calculatorData';

/**
 * Get random calculators for article recommendations
 * @param count Number of calculators to return (default: 4)
 * @param seed Optional seed string for consistent randomization (e.g., article ID)
 * @returns Array of calculator IDs
 */
export const getRandomCalculators = (count: number = 4, seed?: string): string[] => {
  const allCalculators = getAllCalculators();
  
  // Use seed for consistent randomization if provided
  let randomSeed = seed ? hashCode(seed) : Date.now();
  
  // Fisher-Yates shuffle with seeded random
  const shuffled = [...allCalculators];
  for (let i = shuffled.length - 1; i > 0; i--) {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    const j = Math.floor((randomSeed / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, Math.min(count, shuffled.length)).map(calc => calc.id);
};

/**
 * Simple hash function for string seeds
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get current date in ISO format (for dateModified in schema)
 */
export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};

/**
 * Format "Latest Update" timestamp - DYNAMIC (updates daily)
 * Example: "Latest Update • 10/30/2025"
 */
export const formatLatestUpdate = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();
  return `${month}/${day}/${year}`;
};

/**
 * Format static date from ISO string for display
 * @param isoDate - ISO date string from article metadata
 */
export const formatStaticDate = (isoDate: string, locale: string = 'en-IN'): string => {
  return new Date(isoDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format static short date from ISO string
 * @param isoDate - ISO date string from article metadata
 */
export const formatStaticShortDate = (isoDate: string, locale: string = 'en-IN'): string => {
  return new Date(isoDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

