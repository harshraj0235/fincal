/**
 * Unified learn content registry for server-side rendering.
 * Aggregates lessons from all category files for SEO.
 */

export interface LearnLessonMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryName?: string;
  relatedCalculators?: string[];
  relatedLessons?: string[];
  duration?: string;
  difficulty?: string;
}

type LessonSource = { slug: string; title: string; description?: string; relatedCalculators?: string[]; relatedLessons?: string[] };

function normalizeSlug(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-');
}

function collectLessons(): Array<{ category: string; categoryName?: string; lessons: LessonSource[] }> {
  const out: Array<{ category: string; categoryName?: string; lessons: LessonSource[] }> = [];

  try {
    const { loanCategories } = require('../data/learn/loansLessons');
    for (const cat of loanCategories || []) {
      const id = (cat as { id?: string }).id || '';
      const lessons = ((cat as { lessons?: Array<{ slug?: string; title?: string; description?: string; relatedLessons?: string[] }> }).lessons || []).map((l) => ({
        slug: l.slug || '',
        title: l.title || '',
        description: (l as { description?: string }).description,
        relatedLessons: (l as { relatedLessons?: string[] }).relatedLessons,
      }));
      if (lessons.length) out.push({ category: id, categoryName: (cat as { name?: string }).name, lessons });
    }
  } catch {
    /* ignore */
  }

  const metaCategories: Array<{
    slug: string;
    lessons: Array<{ slug: string; title: string; description?: string; relatedCalculators?: string[] }>;
    name?: string;
  }> = [];

  try {
    const { businessFinanceLessons, businessFinanceCategory } = require('../data/learn/businessFinanceLessons');
    metaCategories.push({
      slug: 'business-finance',
      name: businessFinanceCategory?.name,
      lessons: (businessFinanceLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  try {
    const { taxationLessons, taxationCategory } = require('../data/learn/taxationLessons');
    metaCategories.push({
      slug: 'taxation-compliance',
      name: taxationCategory?.name,
      lessons: (taxationLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  try {
    const { investingLessons, investingCategory } = require('../data/learn/investingLessons');
    metaCategories.push({
      slug: 'investing-wealth',
      name: investingCategory?.name,
      lessons: (investingLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  try {
    const { savingsBankLessons, savingsBankCategory } = require('../data/learn/savingsBankLessons');
    metaCategories.push({
      slug: (savingsBankCategory as { id?: string })?.id || 'savings-bank',
      name: (savingsBankCategory as { name?: string })?.name,
      lessons: (savingsBankLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  try {
    const { moneyManagementLessons, moneyManagementCategory } = require('../data/learn/moneyManagementLessons');
    metaCategories.push({
      slug: 'money-management',
      name: (moneyManagementCategory as { name?: string })?.name,
      lessons: (moneyManagementLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  try {
    const { insuranceRetirementLessons, insuranceRetirementCategory } = require('../data/learn/insuranceRetirementLessons');
    metaCategories.push({
      slug: 'insurance-retirement',
      name: (insuranceRetirementCategory as { name?: string })?.name,
      lessons: (insuranceRetirementLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  try {
    const { fintechLessons, fintechCategory } = require('../data/learn/fintechLessons');
    metaCategories.push({
      slug: 'fintech',
      name: (fintechCategory as { name?: string })?.name,
      lessons: (fintechLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  try {
    const { behaviouralFinanceLessons, behaviouralFinanceCategory } = require('../data/learn/behaviouralFinanceLessons');
    metaCategories.push({
      slug: 'behavioural-finance',
      name: (behaviouralFinanceCategory as { name?: string })?.name,
      lessons: (behaviouralFinanceLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  try {
    const { advancedFinanceLessons, advancedFinanceCategory } = require('../data/learn/advancedFinanceLessons');
    metaCategories.push({
      slug: 'advanced-finance',
      name: (advancedFinanceCategory as { name?: string })?.name,
      lessons: (advancedFinanceLessons || []).map((l: { slug: string; title: string; description?: string; relatedCalculators?: string[] }) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        relatedCalculators: l.relatedCalculators,
      })),
    });
  } catch {
    /* ignore */
  }

  for (const c of metaCategories) {
    out.push({ category: c.slug, categoryName: c.name, lessons: c.lessons });
  }

  return out;
}

const allCategories = collectLessons();

/** Category slug aliases: URL segment -> data category */
const categoryAliases: Record<string, string> = {
  taxation: 'taxation-compliance',
  investing: 'investing-wealth',
  insurance: 'insurance-retirement',
  business: 'business-finance',
  'savings-bank': 'savings-bank-products',
};

export function getLearnLesson(categorySlug: string, lessonSlug: string): LearnLessonMeta | null {
  const normLesson = normalizeSlug(lessonSlug);
  const resolvedCategory = categoryAliases[categorySlug] || categorySlug;

  for (const cat of allCategories) {
    if (cat.category !== resolvedCategory && cat.category !== categorySlug) continue;
    const lesson = cat.lessons.find((l) => normalizeSlug(l.slug) === normLesson || l.slug === lessonSlug);
    if (lesson) {
      return {
        id: lesson.slug,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description || lesson.title,
        category: cat.category,
        categoryName: cat.categoryName,
        relatedCalculators: lesson.relatedCalculators,
        relatedLessons: lesson.relatedLessons,
      };
    }
  }
  return null;
}
