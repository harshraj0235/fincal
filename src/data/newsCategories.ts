export interface NewsCategory {
  slug: string;
  name: string;
  description: string;
  icon?: string;
}

export const newsCategories: NewsCategory[] = [
  { slug: 'markets', name: 'Markets', description: 'Stock market news, IPOs, and investment insights' },
  { slug: 'business', name: 'Business', description: 'Corporate news, revenue, and business trends' },
  { slug: 'business-analysis', name: 'Business Analysis', description: 'In-depth analysis of business strategies and market trends' },
  { slug: 'startups', name: 'Startups', description: 'Startup news, funding rounds, and entrepreneurship' },
  { slug: 'economy', name: 'Economy', description: 'Economic news, policies, and macroeconomic trends' },
  { slug: 'tech-business', name: 'Tech Business', description: 'AI, automation, digital transformation, and technology trends' },
];

