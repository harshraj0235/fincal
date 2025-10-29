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
 * Get current date in ISO format
 */
export const getCurrentDate = (): string => {
  return new Date().toISOString();
};

/**
 * Format date for display
 */
export const formatDisplayDate = (locale: string = 'en-IN'): string => {
  return new Date().toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format short date for display (e.g., "29 Oct 2025")
 */
export const formatShortDate = (locale: string = 'en-IN'): string => {
  return new Date().toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

