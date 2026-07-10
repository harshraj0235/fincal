/**
 * Aggregates all learn lessons for site search. Lazy-loaded from Home search.
 */
import { allLoansLessons } from './learn/loansLessons';
import { moneyManagementLessons } from './learn/moneyManagementLessons';
import { moneyManagementCategory } from './learn/moneyManagementLessons';
import { savingsBankLessons } from './learn/savingsBankLessons';
import { savingsBankCategory } from './learn/savingsBankLessons';
import { investingLessons } from './learn/investingLessons';
import { investingCategory } from './learn/investingLessons';
import { insuranceRetirementLessons } from './learn/insuranceRetirementLessons';
import { insuranceRetirementCategory } from './learn/insuranceRetirementLessons';
import { taxationLessons } from './learn/taxationLessons';
import { taxationCategory } from './learn/taxationLessons';
import { fintechLessons } from './learn/fintechLessons';
import { fintechCategory } from './learn/fintechLessons';
import { behaviouralFinanceLessons } from './learn/behaviouralFinanceLessons';
import { behaviouralFinanceCategory } from './learn/behaviouralFinanceLessons';
import { businessFinanceLessons } from './learn/businessFinanceLessons';
import { businessFinanceCategory } from './learn/businessFinanceLessons';
import { advancedFinanceLessons } from './learn/advancedFinanceLessons';
import { advancedFinanceCategory } from './learn/advancedFinanceLessons';

export interface LearnSearchItem {
  name: string;
  path: string;
  category: string;
  keywords: string;
  description: string;
}

function toItem(
  title: string,
  path: string,
  keywords: string[] | undefined,
  description: string
): LearnSearchItem {
  return {
    name: title,
    path,
    category: 'Learn',
    keywords: keywords?.join(' ') || title,
    description: description || title,
  };
}

export function getLearnSearchItems(): LearnSearchItem[] {
  const items: LearnSearchItem[] = [];

  // Loans: lessons have category + slug
  allLoansLessons.forEach((lesson: { title: string; category: string; slug: string; keywords?: string[] }) => {
    items.push(
      toItem(
        lesson.title,
        `/learn/${lesson.category}/${lesson.slug}`,
        lesson.keywords,
        lesson.title
      )
    );
  });

  // Other categories: use category slug from file + lesson slug
  const otherCategories: [unknown[], { slug: string }][] = [
    [moneyManagementLessons, moneyManagementCategory],
    [savingsBankLessons, savingsBankCategory],
    [investingLessons, investingCategory],
    [insuranceRetirementLessons, insuranceRetirementCategory],
    [taxationLessons, taxationCategory],
    [fintechLessons, fintechCategory],
    [behaviouralFinanceLessons, behaviouralFinanceCategory],
    [businessFinanceLessons, businessFinanceCategory],
    [advancedFinanceLessons, advancedFinanceCategory],
  ];

  otherCategories.forEach(([lessons, cat]) => {
    const list = lessons as { title: string; slug: string; tags?: string[]; description?: string }[];
    const categorySlug = (cat as { slug: string }).slug;
    list.forEach((lesson) => {
      items.push(
        toItem(
          lesson.title,
          `/learn/${categorySlug}/${lesson.slug}`,
          lesson.tags,
          lesson.description || lesson.title
        )
      );
    });
  });

  return items;
}
