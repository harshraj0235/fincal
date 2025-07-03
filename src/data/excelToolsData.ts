// 10 Excel Tools for Low-Competition Transactional Keywords
// SEO Optimized for Google Ranking #1 - 2025 Guidelines

export interface ExcelTool {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  downloadLink: string;
  features: string[];
  useCases: string[];
  targetAudience: string[];
  seoTitle: string;
  seoDescription: string;
  longTailKeywords: string[];
  internalLinks: string[];
}

// Export functions for data access
export function getExcelToolBySlug(slug: string): ExcelTool | undefined {
  return excelTools.find(tool => tool.slug === slug);
}

export function getExcelToolsByCategory(category: string): ExcelTool[] {
  return excelTools.filter(tool => tool.category === category);
}

export function getExcelToolsByDifficulty(difficulty: string): ExcelTool[] {
  return excelTools.filter(tool => tool.difficulty === difficulty);
}

export function getLowCompetitionTools(): ExcelTool[] {
  return excelTools.filter(tool => tool.competitionLevel === 'Low');
}

export function getHighTrafficTools(): ExcelTool[] {
  return excelTools.filter(tool => tool.estimatedTraffic === 'High');
}

export function searchExcelTools(query: string): ExcelTool[] {
  const lowercaseQuery = query.toLowerCase();
  return excelTools.filter(tool => 
    tool.title.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

export function getRelatedTools(toolId: string, count: number = 5): ExcelTool[] {
  const tool = excelTools.find(t => t.id === toolId);
  if (!tool) return [];
  
  return excelTools
    .filter(t => t.id !== toolId && (
      t.category === tool.category ||
      t.relatedTools.includes(t.slug) ||
      t.relatedTools.includes(tool.slug)
    ))
    .slice(0, count);
}

// Add 30 more unique, SEO-optimized Excel tools below, following the same structure and best practices.
// Each tool should have unique content, cover a new use case, and be focused on low-competition transactional keywords.
// Categories to include: Personal Finance, Business & Accounting, Investment & Wealth Management, Tax & Compliance, Loan & Credit, Real Estate & Property, Productivity, Niche/Other. 