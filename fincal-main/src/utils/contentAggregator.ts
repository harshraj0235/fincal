// Content Aggregator - Pulls real data from entire website
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';
import { calculatorCategories } from '../data/calculatorData';
import { governmentSchemes } from '../data/governmentSchemesData';

export interface AggregatedContent {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  type: 'calculator' | 'blog' | 'scheme' | 'tool' | 'guide';
  date?: string;
  author?: string;
  image?: string;
  badge?: string;
}

export const getAllWebsiteContent = (): AggregatedContent[] => {
  const allContent: AggregatedContent[] = [];

  // 1. Get all Blog Posts
  const allBlogs = [...blogPosts0, ...blogPosts1];
  allBlogs.forEach(post => {
    allContent.push({
      id: `blog-${post.id}`,
      title: post.title,
      description: post.excerpt,
      category: post.categories[0] || 'Finance',
      url: `/blog/${post.slug}`,
      type: 'blog',
      date: post.date,
      author: post.author,
      image: post.coverImage,
      badge: 'Article'
    });
  });

  // 2. Get all Calculators from all categories
  calculatorCategories.forEach(category => {
    category.calculators.forEach(calc => {
      allContent.push({
        id: `calc-${calc.id}`,
        title: calc.name,
        description: calc.description,
        category: category.name,
        url: `/calculators/${calc.id}`,
        type: 'calculator',
        badge: calc.isPopular ? 'Popular' : undefined
      });
    });
  });

  // 3. Get all Government Schemes
  governmentSchemes.forEach(scheme => {
    allContent.push({
      id: `scheme-${scheme.id}`,
      title: scheme.title,
      description: scheme.seoDescription || scheme.description,
      category: scheme.category || 'सरकारी योजना',
      url: `/government-schemes/${scheme.slug}`,
      type: 'scheme',
      badge: 'Govt Scheme'
    });
  });

  // 4. GST Tools (manually added as they're in different structure)
  const gstTools = [
    {
      id: 'gst-1',
      title: 'HSN/SAC Code Finder',
      description: 'Find correct HSN and SAC codes for GST filing with 1000+ database',
      category: 'GST Tools',
      url: '/tools/gst-hsn-sac-finder',
      type: 'tool' as const,
      badge: 'Premium'
    },
    {
      id: 'gst-2',
      title: 'GSTR-1 Deadline Calculator',
      description: 'Calculate GSTR-1 filing deadlines and late filing penalties',
      category: 'GST Tools',
      url: '/tools/gstr-1-deadline-calculator',
      type: 'tool' as const,
      badge: 'Updated'
    },
    {
      id: 'gst-3',
      title: 'GSTR-3B Calculator',
      description: 'Calculate GSTR-3B deadlines and summary return requirements',
      category: 'GST Tools',
      url: '/tools/gstr-3b-deadline-calculator',
      type: 'tool' as const
    },
    {
      id: 'gst-4',
      title: 'GST Amount Calculator',
      description: 'Calculate GST on any amount with all tax slabs',
      category: 'GST Tools',
      url: '/tools/gst-amount-calculator',
      type: 'tool' as const
    },
    {
      id: 'gst-5',
      title: 'Reverse GST Calculator',
      description: 'Find base price from GST inclusive amount',
      category: 'GST Tools',
      url: '/tools/reverse-gst-calculator',
      type: 'tool' as const
    },
    {
      id: 'gst-6',
      title: 'GST Slab Calculator',
      description: 'Find GST rate slab for products and services',
      category: 'GST Tools',
      url: '/tools/gst-slab-calculator',
      type: 'tool' as const
    },
    {
      id: 'gst-7',
      title: 'ITC Eligibility Checker',
      description: 'Check if you can claim Input Tax Credit on purchases',
      category: 'GST Tools',
      url: '/tools/itc-eligibility-checker',
      type: 'tool' as const
    },
    {
      id: 'gst-8',
      title: 'GST Liability Calculator',
      description: 'Calculate total GST liability for the month',
      category: 'GST Tools',
      url: '/tools/gst-liability-calculator',
      type: 'tool' as const
    },
    {
      id: 'gst-9',
      title: 'Composition Scheme Checker',
      description: 'Check eligibility for GST composition scheme',
      category: 'GST Tools',
      url: '/tools/composition-scheme-checker',
      type: 'tool' as const
    },
    {
      id: 'gst-10',
      title: 'RCM Applicability Checker',
      description: 'Check if Reverse Charge Mechanism applies',
      category: 'GST Tools',
      url: '/tools/rcm-applicability-checker',
      type: 'tool' as const
    }
  ];
  allContent.push(...gstTools);

  // 5. Finance Tools
  const financeTools = [
    {
      id: 'fin-1',
      title: 'XIRR Calculator',
      description: 'Calculate returns for irregular investments like SIP with different amounts',
      category: 'Finance Tools',
      url: '/finance-tools/xirr-calculator',
      type: 'tool' as const,
      badge: 'Advanced'
    },
    {
      id: 'fin-2',
      title: 'Retirement Planner',
      description: 'Plan your retirement corpus with inflation and life expectancy',
      category: 'Finance Tools',
      url: '/finance-tools/retirement-planner',
      type: 'tool' as const,
      badge: 'Essential'
    },
    {
      id: 'fin-3',
      title: 'Goal Based Investment Planner',
      description: 'Plan investments for specific financial goals with timelines',
      category: 'Finance Tools',
      url: '/finance-tools/goal-based-investment-allocator',
      type: 'tool' as const
    },
    {
      id: 'fin-4',
      title: 'Asset Allocation Planner',
      description: 'Optimize your portfolio allocation across asset classes',
      category: 'Finance Tools',
      url: '/finance-tools/asset-allocation-planner',
      type: 'tool' as const
    },
    {
      id: 'fin-5',
      title: 'Risk Appetite Assessment',
      description: 'Assess your investment risk tolerance with detailed questionnaire',
      category: 'Finance Tools',
      url: '/finance-tools/risk-appetite-assessment',
      type: 'tool' as const
    }
  ];
  allContent.push(...financeTools);

  // 6. Tax Tools
  const taxTools = [
    {
      id: 'tax-1',
      title: 'Section 80C Calculator',
      description: 'Calculate tax savings under Section 80C deductions',
      category: 'Tax Tools',
      url: '/calculators/section-80c-calculator',
      type: 'tool' as const,
      badge: 'Save Tax'
    },
    {
      id: 'tax-2',
      title: 'HRA Calculator',
      description: 'Calculate House Rent Allowance tax exemption',
      category: 'Tax Tools',
      url: '/calculators/hra-calculator',
      type: 'tool' as const
    },
    {
      id: 'tax-3',
      title: 'Advance Tax Calculator',
      description: 'Calculate quarterly advance tax payment schedule',
      category: 'Tax Tools',
      url: '/tax-tools/advance-tax-calculator',
      type: 'tool' as const
    },
    {
      id: 'tax-4',
      title: 'Tax Regime Comparison',
      description: 'Compare old vs new tax regime for FY 2024-25',
      category: 'Tax Tools',
      url: '/calculators/income-tax-regime-comparison-calculator',
      type: 'tool' as const,
      badge: 'Updated'
    }
  ];
  allContent.push(...taxTools);

  // 7. Insurance Tools
  const insuranceTools = [
    {
      id: 'ins-1',
      title: 'Life Insurance Calculator',
      description: 'Calculate required life insurance coverage for your family',
      category: 'Insurance',
      url: '/calculators/life-insurance-calculator',
      type: 'tool' as const,
      badge: 'Essential'
    },
    {
      id: 'ins-2',
      title: 'Health Insurance Estimator',
      description: 'Estimate health insurance coverage needed',
      category: 'Insurance',
      url: '/insurance-tools/health-insurance-estimator',
      type: 'tool' as const
    },
    {
      id: 'ins-3',
      title: 'Car Insurance Calculator',
      description: 'Calculate car insurance premium and coverage',
      category: 'Insurance',
      url: '/insurance-tools/car-insurance-calculator',
      type: 'tool' as const
    }
  ];
  allContent.push(...insuranceTools);

  // 8. Banking Tools
  const bankTools = [
    {
      id: 'bank-1',
      title: 'IFSC Code Finder',
      description: 'Find bank IFSC codes for NEFT, RTGS, IMPS transfers',
      category: 'Banking',
      url: '/calculators/bank-ifsc-finder',
      type: 'tool' as const
    },
    {
      id: 'bank-2',
      title: 'Interest Rate Comparison',
      description: 'Compare interest rates across different banks',
      category: 'Banking',
      url: '/calculators/interest-rates-comparison',
      type: 'tool' as const
    },
    {
      id: 'bank-3',
      title: 'ATM Locator',
      description: 'Find nearest ATMs with real-time availability',
      category: 'Banking',
      url: '/calculators/atm-locator',
      type: 'tool' as const
    }
  ];
  allContent.push(...bankTools);

  // 9. Corporate Finance Tools
  const corpTools = [
    {
      id: 'corp-1',
      title: 'Business Loan Calculator',
      description: 'Calculate business loan EMI and total interest payable',
      category: 'Corporate Finance',
      url: '/calculators/business-loan-calculator',
      type: 'tool' as const
    },
    {
      id: 'corp-2',
      title: 'Brokerage Calculator',
      description: 'Calculate stock trading brokerage and charges',
      category: 'Corporate Finance',
      url: '/calculators/brokerage-calculator',
      type: 'tool' as const
    }
  ];
  allContent.push(...corpTools);

  // 10. Astro Finance
  const astroTools = [
    {
      id: 'astro-1',
      title: 'Auspicious Investment Days',
      description: 'Find lucky muhurat for investments based on astrology',
      category: 'Astro Finance',
      url: '/astro-finance',
      type: 'tool' as const,
      badge: 'Unique'
    }
  ];
  allContent.push(...astroTools);

  // 11. Festival Tools
  const festivalTools = [
    {
      id: 'fest-1',
      title: 'Diwali Budget Planner',
      description: 'Plan Diwali expenses, gifts, and celebrations budget',
      category: 'Festival',
      url: '/festival-tools',
      type: 'tool' as const,
      badge: 'Seasonal'
    }
  ];
  allContent.push(...festivalTools);

  // 12. Educational Content
  const educationContent = [
    {
      id: 'edu-1',
      title: 'Financial Literacy Course',
      description: 'Complete beginner to advanced personal finance course',
      category: 'Education',
      url: '/financial-education',
      type: 'guide' as const,
      badge: 'Free Course'
    },
    {
      id: 'edu-2',
      title: 'Investment Basics Guide',
      description: 'Learn fundamentals of investing in stocks, mutual funds, and bonds',
      category: 'Education',
      url: '/financial-education',
      type: 'guide' as const
    }
  ];
  allContent.push(...educationContent);

  return allContent;
};

// Get random N items from content
export const getRandomContent = (count: number = 15): AggregatedContent[] => {
  const allContent = getAllWebsiteContent();
  const shuffled = [...allContent].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get content by type
export const getContentByType = (type: string, count?: number): AggregatedContent[] => {
  const allContent = getAllWebsiteContent();
  const filtered = allContent.filter(item => item.type === type);
  if (count) {
    return filtered.slice(0, count);
  }
  return filtered;
};

// Get content by category
export const getContentByCategory = (category: string, count?: number): AggregatedContent[] => {
  const allContent = getAllWebsiteContent();
  const filtered = allContent.filter(item => 
    item.category.toLowerCase().includes(category.toLowerCase())
  );
  if (count) {
    return filtered.slice(0, count);
  }
  return filtered;
};

