// Sample blog post data
export interface BlogPostSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'image' | 'quote';
  content?: string;
  items?: string[];
  url?: string;
  caption?: string;
  author?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  authorTitle?: string;
  authorBio?: string;
  authorImage?: string;
  categories: string[];
  tags: string[];
  excerpt: string;
  coverImage: string;
  content: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'sukanya-samriddhi-yojana-guide',
    title: 'Sukanya Samriddhi Yojana: A Comprehensive Guide',
    date: 'June 10, 2025',
    author: 'Priya Sharma',
    authorTitle: 'Financial Advisor',
    categories: ['Government Schemes', 'Investment'],
    tags: ['sukanya samriddhi', 'girl child', 'tax saving', 'investment'],
    excerpt: 'Everything you need to know about SSY - eligibility, benefits, tax advantages, and how to maximize returns.',
    coverImage: 'https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Sukanya Samriddhi Yojana (SSY) is one of the most beneficial government-backed savings schemes in India, specifically designed for the girl child. Launched in 2015 as part of the "Beti Bachao, Beti Padhao" campaign, this scheme offers attractive interest rates and tax benefits to encourage parents to save for their daughter\'s future education and marriage expenses.'
      },
      {
        type: 'heading',
        content: 'Key Features of Sukanya Samriddhi Yojana'
      },
      {
        type: 'list',
        items: [
          'Account can be opened for girls up to the age of 10 years',
          'Minimum deposit of ₹250 and maximum of ₹1.5 lakh per financial year',
          'Current interest rate of 8.2% (as of 2025), which is reviewed quarterly',
          'Maturity period of 21 years from the date of opening',
          'Partial withdrawal allowed for education purposes after the girl turns 18',
          'Complete tax exemption under EEE (Exempt-Exempt-Exempt) status'
        ]
      }
    ]
  },
  {
    id: '2',
    slug: 'nps-tier1-vs-tier2-comparison',
    title: 'NPS Tier 1 vs Tier 2: A Detailed Comparison',
    date: 'May 28, 2025',
    author: 'Rajesh Kumar',
    authorTitle: 'Retirement Planning Specialist',
    categories: ['Government Schemes', 'Retirement Planning'],
    tags: ['nps', 'pension', 'retirement', 'investment'],
    excerpt: 'Detailed comparison of NPS Tier 1 and Tier 2 accounts - features, benefits, tax implications, and investment strategies.',
    coverImage: 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'The National Pension System (NPS) offers two types of accounts - Tier 1 and Tier 2. While both are government-sponsored retirement savings vehicles, they have significant differences in terms of liquidity, tax benefits, and withdrawal rules. This comprehensive guide will help you understand which account type best suits your financial goals.'
      },
      {
        type: 'heading',
        content: 'NPS Tier 1: The Core Pension Account'
      },
      {
        type: 'paragraph',
        content: 'Tier 1 is the primary NPS account designed specifically for retirement savings. It comes with tax benefits but has restrictions on withdrawals to ensure the corpus is preserved for retirement.'
      }
    ]
  },
  {
    id: '3',
    slug: 'post-office-savings-schemes-comparison',
    title: 'Post Office Savings Schemes: Which One is Right for You?',
    date: 'May 15, 2025',
    author: 'Ananya Desai',
    authorTitle: 'Investment Analyst',
    categories: ['Government Schemes', 'Investment'],
    tags: ['post office', 'savings', 'fixed income', 'government schemes'],
    excerpt: 'Compare KVP, NSC, SCSS, MIS, and other post office schemes to find the best option for your financial goals.',
    coverImage: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Post Office savings schemes have been the backbone of fixed-income investments for generations of Indians. These government-backed schemes offer security, reasonable returns, and various tax benefits. However, with multiple options available, it can be challenging to determine which scheme best aligns with your financial objectives.'
      },
      {
        type: 'heading',
        content: 'Overview of Post Office Savings Schemes'
      },
      {
        type: 'paragraph',
        content: 'The Indian Post Office offers several savings schemes catering to different investment horizons, risk appetites, and financial goals. Let\'s examine each scheme\'s unique features, benefits, and limitations.'
      }
    ]
  },
  {
    id: '4',
    slug: 'pm-vaya-vandana-yojana-guide',
    title: 'PM Vaya Vandana Yojana: Pension Scheme for Senior Citizens',
    date: 'April 22, 2025',
    author: 'Vikram Mehta',
    authorTitle: 'Senior Financial Planner',
    categories: ['Government Schemes', 'Retirement Planning'],
    tags: ['pension', 'senior citizens', 'retirement income', 'government schemes'],
    excerpt: 'A detailed look at PMVVY - benefits, eligibility, comparison with other senior citizen schemes, and application process.',
    coverImage: 'https://images.pexels.com/photos/7876381/pexels-photo-7876381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Pradhan Mantri Vaya Vandana Yojana (PMVVY) is a government-backed pension scheme specifically designed for senior citizens in India. Launched to provide financial security to elderly citizens, this scheme offers a guaranteed pension for a specified period, making it an attractive option for retirees seeking stable income streams.'
      },
      {
        type: 'heading',
        content: 'What is PM Vaya Vandana Yojana?'
      },
      {
        type: 'paragraph',
        content: 'PMVVY is a social security scheme for senior citizens aged 60 years and above. Administered by the Life Insurance Corporation of India (LIC), it provides an assured return on investment, offering financial protection against inflation and market fluctuations.'
      }
    ]
  },
  {
    id: '5',
    slug: 'national-pension-system-guide',
    title: 'National Pension System: A Complete Guide',
    date: 'April 10, 2025',
    author: 'Sanjay Gupta',
    authorTitle: 'Retirement Planning Expert',
    categories: ['Government Schemes', 'Retirement Planning'],
    tags: ['nps', 'pension', 'retirement', 'tax saving'],
    excerpt: 'Everything you need to know about NPS - structure, benefits, tax advantages, and investment strategies.',
    coverImage: 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to enable systematic savings during the working life of a subscriber. Regulated by the Pension Fund Regulatory and Development Authority (PFRDA), NPS aims to provide financial security during retirement through market-linked returns and tax benefits.'
      },
      {
        type: 'heading',
        content: 'Structure of the National Pension System'
      },
      {
        type: 'paragraph',
        content: 'NPS follows a multi-layered structure involving various stakeholders to ensure transparency, security, and efficient management of pension funds.'
      }
    ]
  },
  {
    id: '6',
    slug: 'tax-saving-investment-options',
    title: 'Tax-Saving Investment Options: Beyond Section 80C',
    date: 'March 15, 2025',
    author: 'Neha Kapoor',
    authorTitle: 'Tax Consultant',
    categories: ['Tax Planning', 'Investment'],
    tags: ['tax saving', 'section 80C', 'tax deduction', 'investment'],
    excerpt: 'Explore tax-saving options beyond the traditional Section 80C investments - maximize deductions and optimize your tax planning.',
    coverImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'While Section 80C investments are the most well-known tax-saving instruments in India, they represent just one piece of the tax-saving puzzle. With a capped deduction limit of ₹1.5 lakh, savvy taxpayers should look beyond Section 80C to maximize their tax benefits. This comprehensive guide explores additional tax-saving avenues available to Indian taxpayers.'
      },
      {
        type: 'heading',
        content: 'Beyond the ₹1.5 Lakh Limit: Additional Tax Deduction Opportunities'
      },
      {
        type: 'paragraph',
        content: "Once you've exhausted your Section 80C limit, several other sections of the Income Tax Act offer additional deduction opportunities that can significantly reduce your tax liability."
      }
    ]
  },
  {
    id: '7',
    slug: 'financial-scams-awareness',
    title: 'Financial Scams Awareness: Protect Yourself in the Digital Age',
    date: 'February 28, 2025',
    author: 'Arjun Singh',
    authorTitle: 'Cybersecurity Expert',
    categories: ['Financial Inclusion', 'Banking'],
    tags: ['scams', 'fraud', 'digital security', 'online banking'],
    excerpt: 'Learn to identify and protect yourself from common financial scams in India - from UPI fraud to investment scams and phishing attacks.',
    coverImage: 'https://images.pexels.com/photos/5699376/pexels-photo-5699376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'As India rapidly digitizes its financial infrastructure, financial scams have unfortunately evolved and proliferated. From sophisticated phishing attempts to UPI fraud and investment scams, bad actors are constantly developing new methods to target unsuspecting victims. This guide will help you identify common financial scams in India and provide practical steps to protect yourself and your hard-earned money.'
      },
      {
        type: 'heading',
        content: 'The Growing Threat of Financial Scams in India'
      },
      {
        type: 'paragraph',
        content: 'According to the National Crime Records Bureau, cybercrimes in India increased by 63.5% in the last year, with financial fraud being the most common category. The RBI reported that digital payment frauds accounted for over ₹200 crore in losses, affecting thousands of Indians across all demographics.'
      }
    ]
  },
  {
    id: '8',
    slug: 'credit-card-comparison-guide',
    title: 'The Ultimate Credit Card Comparison Guide for Indian Consumers in 2025',
    date: 'June 12, 2025',
    author: 'Aditya Sharma',
    authorTitle: 'Personal Finance Expert',
    categories: ['Banking', 'Personal Finance'],
    tags: ['credit cards', 'comparison', 'rewards', 'fees', 'benefits'],
    excerpt: 'Finding the right credit card in India\'s crowded marketplace can feel overwhelming. This comprehensive guide will help you navigate the complex world of credit cards to find your perfect financial companion.',
    coverImage: 'https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Finding the right credit card in India\'s crowded marketplace can feel overwhelming. With hundreds of options featuring different reward structures, annual fees, and eligibility criteria, how do you determine which card truly aligns with your spending habits and lifestyle? This comprehensive guide will help you navigate the complex world of credit cards to find your perfect financial companion.'
      },
      {
        type: 'heading',
        content: 'Why Comparing Credit Cards Is Essential for Smart Financial Planning'
      },
      {
        type: 'paragraph',
        content: 'The difference between choosing the right credit card versus settling for whatever comes your way can translate to thousands of rupees saved annually. Beyond just the immediate benefits, the right card can help build your credit history, provide emergency financial backup, and offer lifestyle perks that enhance your daily experiences.'
      }
    ]
  },
  {
    id: '9',
    slug: 'improve-credit-score-tips',
    title: '10 Proven Strategies to Improve Your Credit Score in 2025: An Indian Consumer\'s Guide',
    date: 'June 5, 2025',
    author: 'Meera Patel',
    authorTitle: 'Credit Analyst',
    categories: ['Banking', 'Personal Finance'],
    tags: ['credit score', 'CIBIL', 'credit improvement', 'financial health'],
    excerpt: 'Your credit score is more than just a three-digit number—it\'s the key that unlocks financial opportunities in India's growing credit ecosystem. Learn proven strategies to boost your score.',
    coverImage: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Your credit score is more than just a three-digit number—it\'s the key that unlocks financial opportunities in India's growing credit ecosystem. Whether you\'re planning to apply for a home loan, looking for a premium credit card, or negotiating better interest rates, a strong credit score can save you lakhs of rupees over your lifetime and open doors to exclusive financial products.'
      },
      {
        type: 'paragraph',
        content: 'In this comprehensive guide, we\'ll explore actionable strategies specifically tailored for Indian consumers to boost their credit scores in 2025, taking into account the unique aspects of India's credit reporting system.'
      }
    ]
  },
  {
    id: '10',
    slug: 'best-credit-cards-for-beginners',
    title: 'Best Credit Cards for First-Time Users in India: A Complete Guide for 2025',
    date: 'May 28, 2025',
    author: 'Rahul Verma',
    authorTitle: 'Financial Educator',
    categories: ['Banking', 'Personal Finance'],
    tags: ['credit cards', 'beginners', 'first credit card', 'building credit'],
    excerpt: 'Stepping into the world of credit cards for the first time can be both exciting and intimidating. This guide helps first-time users choose the perfect starter card based on their specific needs.',
    coverImage: 'https://images.pexels.com/photos/5699424/pexels-photo-5699424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: [
      {
        type: 'paragraph',
        content: 'Stepping into the world of credit cards for the first time can be both exciting and intimidating. With the right first credit card, you can build a solid credit history, enjoy useful benefits, and develop healthy financial habits. But choosing incorrectly could lead to high fees, unsuitable features, and potential credit score damage.'
      },
      {
        type: 'paragraph',
        content: 'This comprehensive guide will walk you through everything first-time credit card users in India need to know in 2025—from understanding eligibility requirements to selecting the perfect starter card based on your specific needs and lifestyle.'
      }
    ]
  }
];

// Function to get a blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get related posts
export const getRelatedPosts = (slug: string, limit: number = 3): BlogPost[] => {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];
  
  // Find posts with similar categories or tags
  const relatedPosts = blogPosts
    .filter(post => post.slug !== slug) // Exclude current post
    .map(post => {
      // Calculate relevance score based on shared categories and tags
      const sharedCategories = post.categories.filter(cat => 
        currentPost.categories.includes(cat)
      ).length;
      
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      ).length;
      
      const relevanceScore = (sharedCategories * 2) + sharedTags;
      
      return { post, relevanceScore };
    })
    .filter(item => item.relevanceScore > 0) // Only include posts with some relevance
    .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
    .slice(0, limit) // Limit to specified number
    .map(item => item.post); // Extract just the post objects
  
  // If not enough related posts, add recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = blogPosts
      .filter(post => 
        post.slug !== slug && 
        !relatedPosts.some(relatedPost => relatedPost.slug === post.slug)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit - relatedPosts.length);
    
    return [...relatedPosts, ...recentPosts];
  }
  
  return relatedPosts;
};