// src/data/newExcelData.ts
import { ExcelToolBlogPost } from './exceltooldata';

export const newExcelToolBlogPosts: ExcelToolBlogPost[] = [
  {
    id: '11',
    slug: 'how-to-create-a-monthly-budget-in-excel',
    title: 'How to Create a Monthly Budget in Excel: Step-by-Step Guide',
    excerpt: 'Learn how to create a comprehensive monthly budget in Excel from scratch. This guide will walk you through setting up your budget, tracking expenses, and analyzing your spending habits to achieve your financial goals.',
    coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-30',
    author: 'Priya Sharma',
    authorImage: '/images/priya-sharma.jpg',
    authorTitle: 'Personal Finance Expert',
    authorBio: 'Priya is a chartered accountant who specializes in personal finance and helps people take control of their financial lives.',
    categories: ['Personal Finance & Budgeting', 'Excel Templates'],
    keywords: ['monthly budget', 'excel budget', 'personal finance', 'expense tracking', 'budgeting template'],
    downloadLink: '/excel-templates/monthly-budget-template.xlsx',
    readingTime: 15,
    content: [
      {
        type: 'paragraph',
        content: 'Creating a monthly budget is the first step towards taking control of your financial life. An Excel spreadsheet is a powerful tool to build a personalized budget that suits your needs. This guide will show you how to do it, step by step.'
      },
      {
        type: 'heading',
        content: 'Step 1: Setting Up Your Excel Sheet'
      },
      {
        type: 'paragraph',
        content: 'Open a new Excel spreadsheet. Create columns for: Date, Category (e.g., food, transport), Income, and Expense. This basic structure will be the foundation of your budget.'
      },
      {
        type: 'heading',
        content: 'Step 2: List Your Income Sources'
      },
      {
        type: 'paragraph',
        content: 'In the Income column, list all your sources of monthly income. This includes your salary, any side hustle income, and other earnings. Use the SUM function to get a total monthly income.'
      },
      {
        type: 'heading',
        content: 'Step 3: Track Your Expenses'
      },
      {
        type: 'paragraph',
        content: 'This is the most crucial part. Diligently record every expense. Categorize them to understand where your money is going. At the end of the month, sum up the expenses for each category.'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Tracking expenses in an Excel sheet is key to a successful budget.'
      },
      {
        type: 'heading',
        content: 'Step 4: Analyze and Adjust'
      },
      {
        type: 'paragraph',
        content: 'Subtract your total expenses from your total income. If you have a surplus, you can allocate it to savings or investments. If you have a deficit, it's time to review your spending and make cuts.'
      },
      {
        type: 'quote',
        content: 'Budgeting is telling your money where to go instead of wondering where it went.',
        author: 'Dave Ramsey'
      }
    ]
  },
  {
    id: '12',
    slug: 'best-excel-templates-for-family-budgeting-in-india',
    title: 'Best Excel Templates for Family Budgeting in India',
    excerpt: 'Discover the best Excel templates designed for family budgeting in the Indian context. Manage joint accounts, track expenses for kids, and plan for family goals like weddings and education.',
    coverImage: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-29',
    author: 'Priya Sharma',
    categories: ['Personal Finance & Budgeting', 'Excel Templates'],
    keywords: ['family budget', 'excel templates india', 'budgeting for family', 'indian finance'],
    downloadLink: '/excel-templates/family-budget-template-india.xlsx',
    readingTime: 12,
    content: []
  },
  {
    id: '13',
    slug: 'how-to-track-your-daily-expenses-using-excel',
    title: 'How to Track Your Daily Expenses Using Excel',
    excerpt: 'A simple, effective method to track your daily expenses with Excel. Learn to categorize spending, create insightful summaries, and stay on top of your finances day by day.',
    coverImage: 'https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-28',
    author: 'Priya Sharma',
    categories: ['Personal Finance & Budgeting', 'Excel Templates'],
    keywords: ['daily expense tracker', 'excel expense tracker', 'track spending'],
    downloadLink: '/excel-templates/daily-expense-tracker.xlsx',
    readingTime: 8,
    content: []
  },
  {
    id: '14',
    slug: 'top-10-budgeting-mistakes-indians-make-and-how-to-fix-them',
    title: 'Top 10 Budgeting Mistakes Indians Make (and How to Fix Them)',
    excerpt: 'From ignoring small expenses to not having a financial goal, we cover the top 10 budgeting mistakes common in India and provide practical Excel-based solutions to fix them.',
    coverImage: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-27',
    author: 'Priya Sharma',
    categories: ['Personal Finance & Budgeting'],
    keywords: ['budgeting mistakes', 'indian finance', 'personal finance tips'],
    readingTime: 10,
    content: []
  },
  {
    id: '15',
    slug: 'simple-ways-to-automate-your-savings-with-excel',
    title: 'Simple Ways to Automate Your Savings with Excel',
    excerpt: 'Use the power of Excel to automate your savings plan. Learn formulas and techniques to calculate savings potential and set up automatic tracking of your financial goals.',
    coverImage: 'https://images.pexels.com/photos/787625/pexels-photo-787625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-26',
    author: 'Priya Sharma',
    categories: ['Personal Finance & Budgeting', 'Excel Templates'],
    keywords: ['automate savings', 'excel for savings', 'financial goals'],
    downloadLink: '/excel-templates/savings-automation-planner.xlsx',
    readingTime: 9,
    content: []
  },
  {
    id: '16',
    slug: 'how-to-calculate-home-loan-emi-in-excel',
    title: 'How to Calculate Home Loan EMI in Excel (With Free Template)',
    excerpt: 'A detailed guide on calculating your home loan EMI using Excel\'s financial formulas like PMT. Understand the components of your EMI and use our free template to plan your loan.',
    coverImage: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-25',
    author: 'Ravi Kumar',
    categories: ['Loans & EMI Calculators', 'Excel Templates'],
    keywords: ['home loan emi', 'excel emi calculator', 'pmt formula', 'loan calculator'],
    downloadLink: '/excel-templates/home-loan-emi-calculator.xlsx',
    readingTime: 14,
    content: []
  },
  {
    id: '17',
    slug: 'difference-between-reducing-and-flat-rate-emi-calculators',
    title: 'Difference Between Reducing and Flat Rate EMI Calculators',
    excerpt: 'Understand the crucial difference between reducing balance and flat rate interest calculations for your loans. Use our Excel sheet to see the impact on your EMI and total interest paid.',
    coverImage: 'https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-24',
    author: 'Ravi Kumar',
    categories: ['Loans & EMI Calculators', 'Excel Templates'],
    keywords: ['reducing vs flat rate', 'emi calculator', 'loan interest', 'personal finance india'],
    downloadLink: '/excel-templates/reducing-vs-flat-rate-calculator.xlsx',
    readingTime: 11,
    content: []
  },
  {
    id: '18',
    slug: 'best-practices-for-managing-multiple-loans-in-one-excel-sheet',
    title: 'Best Practices for Managing Multiple Loans in One Excel Sheet',
    excerpt: 'Learn how to consolidate and manage multiple loans in a single Excel dashboard. Track due dates, outstanding balances, and create a smart repayment strategy.',
    coverImage: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-23',
    author: 'Ravi Kumar',
    categories: ['Loans & EMI Calculators', 'Excel Templates'],
    keywords: ['manage multiple loans', 'loan consolidation', 'excel dashboard', 'debt management'],
    downloadLink: '/excel-templates/multiple-loan-manager.xlsx',
    readingTime: 13,
    content: []
  },
  {
    id: '19',
    slug: 'how-to-compare-personal-loan-offers-using-excel',
    title: 'How to Compare Personal Loan Offers Using Excel',
    excerpt: 'Don\'t just look at the interest rate. Use our Excel template to compare personal loan offers based on EMI, processing fees, pre-payment charges, and other hidden costs.',
    coverImage: 'https://images.pexels.com/photos/4968635/pexels-photo-4968635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-22',
    author: 'Ravi Kumar',
    categories: ['Loans & EMI Calculators', 'Excel Templates'],
    keywords: ['compare personal loans', 'loan comparison', 'excel loan template', 'personal finance'],
    downloadLink: '/excel-templates/personal-loan-comparison-tool.xlsx',
    readingTime: 10,
    content: []
  },
  {
    id: '20',
    slug: 'step-by-step-guide-prepaying-your-home-loan-with-excel-analysis',
    title: 'Step-by-Step Guide: Prepaying Your Home Loan with Excel Analysis',
    excerpt: 'Thinking of prepaying your home loan? Use our Excel sheet to analyze the benefits, calculate interest saved, and see the impact on your loan tenure. Make an informed decision.',
    coverImage: 'https://images.pexels.com/photos/8867431/pexels-photo-8867431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2024-07-21',
    author: 'Ravi Kumar',
    categories: ['Loans & EMI Calculators', 'Excel Templates'],
    keywords: ['home loan prepayment', 'excel loan analysis', 'save on home loan', 'loan prepayment calculator'],
    downloadLink: '/excel-templates/home-loan-prepayment-analyzer.xlsx',
    readingTime: 15,
    content: []
  }
];
 