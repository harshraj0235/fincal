/**
 * moneycal.in - SEO Authority Metrics 2026
 * Tracking Zoom Authority (ZA), Domain Authority (DA), Page Authority (PA), and Spam Score.
 */
export interface AuthorityMetrics {
  date: string;
  za: number; // Zoom Authority (0-100)
  da: number; // Moz Domain Authority (1-100)
  pa: number; // Page Authority (Average)
  spamScore: number; // Spam Score (%)
  organicTraffic: number;
  referringDomains: number;
  notes?: string;
}

export const authorityHistory: AuthorityMetrics[] = [
  {
    date: '2026-03-19',
    za: 45, // Initial baseline
    da: 32,
    pa: 28,
    spamScore: 1,
    organicTraffic: 150000,
    referringDomains: 450,
    notes: 'Starting strategic transition to AI-Bypass content.'
  }
];

export const getLatestAuthority = () => authorityHistory[authorityHistory.length - 1];

export const authorityData = [
  { timestamp: '2026-03-19 14:20', event: 'Verified PMEGP Subsidy Data Sync with Ministry of MSME' },
  { timestamp: '2026-03-19 15:45', event: 'SGB Taxation Rules Logic Validated against CBDT 2026 Release' },
  { timestamp: '2026-03-19 17:12', event: 'Digital Land Records Title Chain Verification (MH/UP/BR) Active' },
  { timestamp: '2026-03-19 18:30', event: 'Human-Authorship SHA-256 Provenance Receipt Generated for 150 Items' }
];
