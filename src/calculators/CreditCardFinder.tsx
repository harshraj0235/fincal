import React, { useState, useEffect } from 'react';
import { Search, Filter, CreditCard, Award, Percent, DollarSign, Tag, Check, Info, ArrowRight, Star, Shield, AlertTriangle } from 'lucide-react';

interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  category: string;
  annualFee: number;
  joiningFee: number;
  interestRate: number;
  minIncomeRequired: number;
  creditScoreRequired: number;
  rewardRate: number;
  rewardType: string;
  benefits: string[];
  idealFor: string[];
  image: string;
  applyCriteria: string[];
  limitRange: string;
}

interface ScoreQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    score: number;
  }[];
}

export const CreditCardFinder: React.FC = () => {
  // Credit Card Finder States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');
  const [minIncome, setMinIncome] = useState<number>(0);
  const [maxAnnualFee, setMaxAnnualFee] = useState<number>(10000);
  const [creditScore, setCreditScore] = useState<number>(650);
  const [rewardPreference, setRewardPreference] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<CreditCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Credit Score Estimator States
  const [showScoreEstimator, setShowScoreEstimator] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [estimatedScore, setEstimatedScore] = useState<number | null>(null);
  const [scoreCategory, setScoreCategory] = useState<string>('');
  const [scoreImprovementTips, setScoreImprovementTips] = useState<string[]>([]);
  
  // Sample credit card data
  useEffect(() => {
    const sampleCards: CreditCard[] = [
      {
        id: 'hdfc-regalia',
        name: 'HDFC Regalia Credit Card',
        issuer: 'HDFC Bank',
        category: 'Travel',
        annualFee: 2500,
        joiningFee: 2500,
        interestRate: 3.49,
        minIncomeRequired: 1200000,
        creditScoreRequired: 750,
        rewardRate: 4,
        rewardType: 'Points',
        benefits: [
          'Complimentary airport lounge access',
          '2X reward points on weekend dining',
          'Milestone benefits up to ₹10,000',
          'Golf privileges at select courses',
          'Travel concierge services',
          'Fuel surcharge waiver up to ₹1,000 per month'
        ],
        idealFor: ['Frequent travelers', 'Dining enthusiasts', 'High spenders'],
        image: 'https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-60 years',
          'Minimum annual income: ₹12 lakhs',
          'Credit score: 750+',
          'Employment: Salaried or self-employed professional'
        ],
        limitRange: '₹3 lakhs - ₹10 lakhs'
      },
      {
        id: 'sbi-simplyclick',
        name: 'SBI SimplyCLICK Credit Card',
        issuer: 'SBI Card',
        category: 'Shopping',
        annualFee: 499,
        joiningFee: 499,
        interestRate: 3.35,
        minIncomeRequired: 600000,
        creditScoreRequired: 700,
        rewardRate: 5,
        rewardType: 'Points',
        benefits: [
          '10X reward points on online shopping',
          'Amazon, BookMyShow, and Cleartrip e-vouchers',
          'Fuel surcharge waiver up to ₹500 per month',
          'Zero liability on lost card',
          'EMI conversion facility'
        ],
        idealFor: ['Online shoppers', 'Movie buffs', 'Millennials'],
        image: 'https://images.pexels.com/photos/6347727/pexels-photo-6347727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-65 years',
          'Minimum annual income: ₹6 lakhs',
          'Credit score: 700+',
          'Employment: Salaried or self-employed'
        ],
        limitRange: '₹1 lakh - ₹5 lakhs'
      },
      {
        id: 'icici-amazon',
        name: 'ICICI Amazon Pay Credit Card',
        issuer: 'ICICI Bank',
        category: 'Shopping',
        annualFee: 500,
        joiningFee: 500,
        interestRate: 3.40,
        minIncomeRequired: 300000,
        creditScoreRequired: 680,
        rewardRate: 5,
        rewardType: 'Cashback',
        benefits: [
          '5% unlimited cashback on Amazon.in',
          '2% cashback on Amazon Pay partner merchants',
          '1% cashback on all other spends',
          'Welcome benefit of ₹500 Amazon Pay balance',
          'Fuel surcharge waiver up to ₹500 per month'
        ],
        idealFor: ['Amazon shoppers', 'Online shoppers', 'Cashback seekers'],
        image: 'https://images.pexels.com/photos/6347725/pexels-photo-6347725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-60 years',
          'Minimum annual income: ₹3 lakhs',
          'Credit score: 680+',
          'Employment: Salaried or self-employed'
        ],
        limitRange: '₹50,000 - ₹4 lakhs'
      },
      {
        id: 'axis-flipkart',
        name: 'Axis Bank Flipkart Credit Card',
        issuer: 'Axis Bank',
        category: 'Shopping',
        annualFee: 500,
        joiningFee: 500,
        interestRate: 3.40,
        minIncomeRequired: 600000,
        creditScoreRequired: 700,
        rewardRate: 5,
        rewardType: 'Cashback',
        benefits: [
          'Unlimited 5% cashback on Flipkart and Myntra',
          '4% unlimited cashback on preferred partners',
          '1.5% unlimited cashback on all other spends',
          'Welcome benefit of ₹500 Flipkart voucher',
          'Fuel surcharge waiver up to ₹500 per month',
          'Movie ticket buy-one-get-one on BookMyShow'
        ],
        idealFor: ['Flipkart shoppers', 'Online shoppers', 'Cashback seekers'],
        image: 'https://images.pexels.com/photos/6347724/pexels-photo-6347724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-60 years',
          'Minimum annual income: ₹6 lakhs',
          'Credit score: 700+',
          'Employment: Salaried or self-employed'
        ],
        limitRange: '₹1 lakh - ₹5 lakhs'
      },
      {
        id: 'amex-platinum',
        name: 'American Express Platinum Card',
        issuer: 'American Express',
        category: 'Premium',
        annualFee: 60000,
        joiningFee: 60000,
        interestRate: 3.50,
        minIncomeRequired: 3000000,
        creditScoreRequired: 800,
        rewardRate: 3,
        rewardType: 'Membership Rewards',
        benefits: [
          'Unlimited airport lounge access worldwide',
          'Taj Hotels & Resorts upgrade and benefits',
          'Marriott Bonvoy Gold Elite status',
          'Hilton Honors Gold status',
          'Annual travel credit of ₹50,000',
          'Concierge services',
          'Golf program with complimentary rounds',
          'Fine dining program with exclusive reservations'
        ],
        idealFor: ['Luxury travelers', 'High net worth individuals', 'Status seekers'],
        image: 'https://images.pexels.com/photos/6347723/pexels-photo-6347723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 25-65 years',
          'Minimum annual income: ₹30 lakhs',
          'Credit score: 800+',
          'By invitation only'
        ],
        limitRange: '₹8 lakhs - No preset limit'
      },
      {
        id: 'yes-prosperity',
        name: 'YES Prosperity Credit Card',
        issuer: 'YES Bank',
        category: 'Lifestyle',
        annualFee: 999,
        joiningFee: 999,
        interestRate: 3.49,
        minIncomeRequired: 500000,
        creditScoreRequired: 700,
        rewardRate: 3,
        rewardType: 'Points',
        benefits: [
          'Complimentary domestic airport lounge access',
          'Buy 1 Get 1 movie ticket on BookMyShow',
          'Dining discounts up to 15% at partner restaurants',
          'Fuel surcharge waiver up to ₹250 per month',
          'Annual fee waiver on spending ₹2 lakhs'
        ],
        idealFor: ['Movie enthusiasts', 'Dining out lovers', 'Mid-range spenders'],
        image: 'https://images.pexels.com/photos/6347722/pexels-photo-6347722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-60 years',
          'Minimum annual income: ₹5 lakhs',
          'Credit score: 700+',
          'Employment: Salaried or self-employed'
        ],
        limitRange: '₹75,000 - ₹4 lakhs'
      },
      {
        id: 'rbl-movieblockbuster',
        name: 'RBL Bank MovieBlockbuster Credit Card',
        issuer: 'RBL Bank',
        category: 'Entertainment',
        annualFee: 2000,
        joiningFee: 2000,
        interestRate: 3.50,
        minIncomeRequired: 360000,
        creditScoreRequired: 680,
        rewardRate: 5,
        rewardType: 'Points',
        benefits: [
          'Buy 1 Get 1 movie ticket every month',
          '1+1 on BookMyShow Stream',
          'Up to 20% off on F&B at select cinemas',
          '5% cashback on entertainment spends',
          '1% cashback on all other spends',
          'Annual fee waiver on spending ₹1.5 lakhs'
        ],
        idealFor: ['Movie buffs', 'Entertainment seekers', 'Young professionals'],
        image: 'https://images.pexels.com/photos/6347721/pexels-photo-6347721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-60 years',
          'Minimum annual income: ₹3.6 lakhs',
          'Credit score: 680+',
          'Employment: Salaried or self-employed'
        ],
        limitRange: '₹50,000 - ₹3 lakhs'
      },
      {
        id: 'indusind-iconia',
        name: 'IndusInd Iconia Amex Credit Card',
        issuer: 'IndusInd Bank',
        category: 'Lifestyle',
        annualFee: 3500,
        joiningFee: 3500,
        interestRate: 3.49,
        minIncomeRequired: 1000000,
        creditScoreRequired: 730,
        rewardRate: 4,
        rewardType: 'Points',
        benefits: [
          'Complimentary domestic airport lounge access',
          'Complimentary golf games',
          'Buy 1 Get 1 movie ticket on BookMyShow',
          'Dining privileges at premium restaurants',
          'Fuel surcharge waiver up to ₹250 per month',
          'Annual fee waiver on spending ₹3 lakhs'
        ],
        idealFor: ['Golf enthusiasts', 'Frequent travelers', 'Dining lovers'],
        image: 'https://images.pexels.com/photos/6347720/pexels-photo-6347720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-65 years',
          'Minimum annual income: ₹10 lakhs',
          'Credit score: 730+',
          'Employment: Salaried or self-employed professional'
        ],
        limitRange: '₹2 lakhs - ₹8 lakhs'
      },
      {
        id: 'kotak-urbane',
        name: 'Kotak Urbane Credit Card',
        issuer: 'Kotak Mahindra Bank',
        category: 'Lifestyle',
        annualFee: 700,
        joiningFee: 700,
        interestRate: 3.50,
        minIncomeRequired: 300000,
        creditScoreRequired: 680,
        rewardRate: 2,
        rewardType: 'Points',
        benefits: [
          '2 reward points per ₹100 spent',
          'Complimentary domestic airport lounge access',
          'Buy 1 Get 1 movie ticket on BookMyShow',
          'Fuel surcharge waiver up to ₹100 per month',
          'Annual fee waiver on spending ₹1 lakh'
        ],
        idealFor: ['First-time credit card users', 'Young professionals', 'Movie enthusiasts'],
        image: 'https://images.pexels.com/photos/6347719/pexels-photo-6347719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-65 years',
          'Minimum annual income: ₹3 lakhs',
          'Credit score: 680+',
          'Employment: Salaried or self-employed'
        ],
        limitRange: '₹50,000 - ₹3 lakhs'
      },
      {
        id: 'citi-premiermiles',
        name: 'Citi PremierMiles Credit Card',
        issuer: 'Citibank',
        category: 'Travel',
        annualFee: 3000,
        joiningFee: 3000,
        interestRate: 3.75,
        minIncomeRequired: 800000,
        creditScoreRequired: 720,
        rewardRate: 4,
        rewardType: 'Miles',
        benefits: [
          '10 miles per ₹100 spent on airlines',
          '4 miles per ₹100 on all other spends',
          'Complimentary airport lounge access',
          'Milestone benefits up to 10,000 bonus miles',
          'Fuel surcharge waiver up to ₹1,000 per month',
          'Annual fee waiver on spending ₹3 lakhs'
        ],
        idealFor: ['Frequent flyers', 'International travelers', 'Miles collectors'],
        image: 'https://images.pexels.com/photos/6347718/pexels-photo-6347718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-60 years',
          'Minimum annual income: ₹8 lakhs',
          'Credit score: 720+',
          'Employment: Salaried or self-employed professional'
        ],
        limitRange: '₹1.5 lakhs - ₹8 lakhs'
      },
      {
        id: 'hsbc-cashback',
        name: 'HSBC Cashback Credit Card',
        issuer: 'HSBC',
        category: 'Cashback',
        annualFee: 750,
        joiningFee: 750,
        interestRate: 3.30,
        minIncomeRequired: 500000,
        creditScoreRequired: 700,
        rewardRate: 1.5,
        rewardType: 'Cashback',
        benefits: [
          '1.5% unlimited cashback on all online spends',
          '1% unlimited cashback on all other spends',
          'Fuel surcharge waiver up to ₹250 per month',
          'Annual fee waiver on spending ₹1.5 lakhs',
          'EMI conversion facility'
        ],
        idealFor: ['Online shoppers', 'Cashback seekers', 'Regular spenders'],
        image: 'https://images.pexels.com/photos/6347717/pexels-photo-6347717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        applyCriteria: [
          'Age: 21-60 years',
          'Minimum annual income: ₹5 lakhs',
          'Credit score: 700+',
          'Employment: Salaried or self-employed'
        ],
        limitRange: '₹75,000 - ₹5 lakhs'
      }
    ];
    
    setCreditCards(sampleCards);
    setFilteredCards(sampleCards);
  }, []);
  
  // Credit score assessment questions
  const scoreQuestions: ScoreQuestion[] = [
    {
      id: 'q1',
      question: 'Do you have any existing credit cards?',
      options: [
        { id: 'a1', text: 'No credit cards', score: 0 },
        { id: 'a2', text: '1 credit card for less than 1 year', score: 20 },
        { id: 'a3', text: '1-2 credit cards for 1-3 years', score: 40 },
        { id: 'a4', text: '2+ credit cards for 3+ years', score: 60 }
      ]
    },
    {
      id: 'q2',
      question: 'Do you have any active loans?',
      options: [
        { id: 'a1', text: 'No loans', score: 30 },
        { id: 'a2', text: 'Home loan with regular payments', score: 50 },
        { id: 'a3', text: 'Multiple loans with regular payments', score: 40 },
        { id: 'a4', text: 'Loans with occasional delayed payments', score: 10 }
      ]
    },
    {
      id: 'q3',
      question: 'How often do you pay your credit card bills?',
      options: [
        { id: 'a1', text: 'Always full payment before due date', score: 100 },
        { id: 'a2', text: 'Minimum payment before due date', score: 40 },
        { id: 'a3', text: 'Occasional delays in payment', score: 10 },
        { id: 'a4', text: 'Frequent delays in payment', score: 0 }
      ]
    },
    {
      id: 'q4',
      question: 'What percentage of your credit limit do you typically use?',
      options: [
        { id: 'a1', text: 'Less than 30%', score: 100 },
        { id: 'a2', text: '30-50%', score: 70 },
        { id: 'a3', text: '50-80%', score: 40 },
        { id: 'a4', text: 'More than 80%', score: 10 }
      ]
    },
    {
      id: 'q5',
      question: 'How many credit inquiries have you had in the last 6 months?',
      options: [
        { id: 'a1', text: 'None', score: 100 },
        { id: 'a2', text: '1-2 inquiries', score: 70 },
        { id: 'a3', text: '3-5 inquiries', score: 30 },
        { id: 'a4', text: 'More than 5 inquiries', score: 0 }
      ]
    },
    {
      id: 'q6',
      question: 'Have you ever defaulted on a loan or credit card payment?',
      options: [
        { id: 'a1', text: 'Never', score: 100 },
        { id: 'a2', text: 'Once, more than 3 years ago', score: 40 },
        { id: 'a3', text: 'Once, within the last 3 years', score: 10 },
        { id: 'a4', text: 'Multiple times', score: 0 }
      ]
    },
    {
      id: 'q7',
      question: 'What is your oldest credit account?',
      options: [
        { id: 'a1', text: 'More than 5 years', score: 100 },
        { id: 'a2', text: '3-5 years', score: 70 },
        { id: 'a3', text: '1-3 years', score: 40 },
        { id: 'a4', text: 'Less than 1 year', score: 20 }
      ]
    }
  ];
  
  // Filter credit cards based on search and filters
  useEffect(() => {
    let result = [...creditCards];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(card => 
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(card => card.category === selectedCategory);
    }
    
    // Apply issuer filter
    if (selectedIssuer !== 'all') {
      result = result.filter(card => card.issuer === selectedIssuer);
    }
    
    // Apply income filter
    result = result.filter(card => card.minIncomeRequired <= minIncome);
    
    // Apply annual fee filter
    result = result.filter(card => card.annualFee <= maxAnnualFee);
    
    // Apply credit score filter
    result = result.filter(card => card.creditScoreRequired <= creditScore);
    
    // Apply reward preference filter
    if (rewardPreference !== 'all') {
      result = result.filter(card => card.rewardType === rewardPreference);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'annualFee':
        result.sort((a, b) => a.annualFee - b.annualFee);
        break;
      case 'rewardRate':
        result.sort((a, b) => b.rewardRate - a.rewardRate);
        break;
      case 'creditScore':
        result.sort((a, b) => a.creditScoreRequired - b.creditScoreRequired);
        break;
      case 'recommended':
      default:
        // Sort by a combination of factors for "recommended"
        result.sort((a, b) => {
          const aScore = (a.rewardRate * 10) - (a.annualFee / 1000) + (a.benefits.length * 5);
          const bScore = (b.rewardRate * 10) - (b.annualFee / 1000) + (b.benefits.length * 5);
          return bScore - aScore;
        });
        break;
    }
    
    setFilteredCards(result);
  }, [
    creditCards,
    searchTerm,
    selectedCategory,
    selectedIssuer,
    minIncome,
    maxAnnualFee,
    creditScore,
    rewardPreference,
    sortBy
  ]);
  
  // Get unique categories
  const categories = ['all', ...new Set(creditCards.map(card => card.category))];
  
  // Get unique issuers
  const issuers = ['all', ...new Set(creditCards.map(card => card.issuer))];
  
  // Get unique reward types
  const rewardTypes = ['all', ...new Set(creditCards.map(card => card.rewardType))];
  
  // Handle card selection
  const handleCardSelect = (card: CreditCard) => {
    setSelectedCard(card);
  };
  
  // Close card details
  const closeCardDetails = () => {
    setSelectedCard(null);
  };
  
  // Handle answer selection in credit score estimator
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId
    });
    
    if (currentQuestion < scoreQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateCreditScore();
    }
  };
  
  // Calculate estimated credit score
  const calculateCreditScore = () => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    // Calculate total score based on answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = scoreQuestions.find(q => q.id === questionId);
      if (question) {
        const selectedOption = question.options.find(o => o.id === answerId);
        if (selectedOption) {
          totalScore += selectedOption.score;
        }
        
        // Calculate max possible score for this question
        const maxScore = Math.max(...question.options.map(o => o.score));
        maxPossibleScore += maxScore;
      }
    });
    
    // Calculate percentage and convert to credit score range (300-900)
    const percentage = totalScore / maxPossibleScore;
    const calculatedScore = Math.round(300 + (percentage * 600));
    
    setEstimatedScore(calculatedScore);
    
    // Determine score category
    if (calculatedScore >= 750) {
      setScoreCategory('Excellent');
      setScoreImprovementTips([
        'Maintain your excellent credit habits',
        'Consider premium credit cards with better rewards',
        'Review your credit report annually to ensure accuracy',
        'Keep your credit utilization below 30%'
      ]);
    } else if (calculatedScore >= 700) {
      setScoreCategory('Good');
      setScoreImprovementTips([
        'Pay all bills on time consistently',
        'Reduce credit utilization to below 30%',
        'Avoid applying for multiple new credit lines',
        'Keep old accounts open to maintain credit history length'
      ]);
    } else if (calculatedScore >= 650) {
      setScoreCategory('Fair');
      setScoreImprovementTips([
        'Focus on paying all bills on time',
        'Reduce outstanding debt',
        'Limit new credit applications',
        'Check your credit report for errors',
        'Consider a secured credit card if you don\'t have one'
      ]);
    } else {
      setScoreCategory('Needs Improvement');
      setScoreImprovementTips([
        'Pay all outstanding debts',
        'Set up automatic payments to avoid missed payments',
        'Consider a secured credit card to build credit',
        'Keep credit utilization below 30%',
        'Check your credit report for errors and dispute any inaccuracies',
        'Become an authorized user on a family member\'s card with good standing'
      ]);
    }
  };
  
  // Reset credit score estimator
  const resetScoreEstimator = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setEstimatedScore(null);
    setScoreCategory('');
    setScoreImprovementTips([]);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Credit Card Finder & Score Estimator</h2>
        <p className="text-neutral-600">
          Find the perfect credit card for your needs and estimate your credit score with our comprehensive tools designed specifically for Indian users.
        </p>
      </div>

      {/* Tool Selector */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => {
            setShowScoreEstimator(false);
            resetScoreEstimator();
          }}
          className={`flex-1 py-4 px-6 rounded-lg flex flex-col items-center justify-center ${
            !showScoreEstimator
              ? 'bg-[--primary-100] border-2 border-[--primary-500] text-[--primary-800]'
              : 'bg-white border border-neutral-200 text-neutral-700 hover:border-[--primary-300]'
          }`}
        >
          <CreditCard className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-semibold">Credit Card Finder</h3>
          <p className="text-sm mt-1">Compare and find the best credit card for your needs</p>
        </button>
        
        <button
          onClick={() => setShowScoreEstimator(true)}
          className={`flex-1 py-4 px-6 rounded-lg flex flex-col items-center justify-center ${
            showScoreEstimator
              ? 'bg-[--primary-100] border-2 border-[--primary-500] text-[--primary-800]'
              : 'bg-white border border-neutral-200 text-neutral-700 hover:border-[--primary-300]'
          }`}
        >
          <Shield className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-semibold">Credit Score Estimator</h3>
          <p className="text-sm mt-1">Estimate your credit score and get improvement tips</p>
        </button>
      </div>

      {!showScoreEstimator ? (
        /* Credit Card Finder */
        <>
          {!selectedCard ? (
            <div>
              {/* Search and Filters */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="w-full md:w-2/3 relative mb-4 md:mb-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search credit cards by name, issuer, or benefits..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input pl-10 w-full"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4 w-full md:w-auto">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input py-1.5 text-sm"
                      >
                        <option value="recommended">Recommended</option>
                        <option value="annualFee">Annual Fee (Low to High)</option>
                        <option value="rewardRate">Reward Rate (High to Low)</option>
                        <option value="creditScore">Credit Score (Low to High)</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="btn btn-outline flex items-center"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                  </div>
                </div>
                
                {showFilters && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Card Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="input"
                      >
                        <option value="all">All Categories</option>
                        {categories.filter(c => c !== 'all').map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Card Issuer
                      </label>
                      <select
                        value={selectedIssuer}
                        onChange={(e) => setSelectedIssuer(e.target.value)}
                        className="input"
                      >
                        <option value="all">All Issuers</option>
                        {issuers.filter(i => i !== 'all').map((issuer) => (
                          <option key={issuer} value={issuer}>{issuer}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Reward Type
                      </label>
                      <select
                        value={rewardPreference}
                        onChange={(e) => setRewardPreference(e.target.value)}
                        className="input"
                      >
                        <option value="all">All Reward Types</option>
                        {rewardTypes.filter(r => r !== 'all').map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Annual Income (₹)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5000000"
                        step="100000"
                        value={minIncome}
                        onChange={(e) => setMinIncome(Number(e.target.value))}
                        className="slider w-full"
                      />
                      <div className="flex justify-between mt-1 text-xs text-neutral-500">
                        <span>₹0</span>
                        <span>{minIncome.toLocaleString('en-IN')}</span>
                        <span>₹50L+</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Max Annual Fee (₹)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="60000"
                        step="1000"
                        value={maxAnnualFee}
                        onChange={(e) => setMaxAnnualFee(Number(e.target.value))}
                        className="slider w-full"
                      />
                      <div className="flex justify-between mt-1 text-xs text-neutral-500">
                        <span>₹0</span>
                        <span>{maxAnnualFee.toLocaleString('en-IN')}</span>
                        <span>₹60,000+</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Credit Score
                      </label>
                      <input
                        type="range"
                        min="300"
                        max="900"
                        step="10"
                        value={creditScore}
                        onChange={(e) => setCreditScore(Number(e.target.value))}
                        className="slider w-full"
                      />
                      <div className="flex justify-between mt-1 text-xs text-neutral-500">
                        <span>300</span>
                        <span>{creditScore}</span>
                        <span>900</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Credit Card Results */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {filteredCards.length} Credit Cards Found
                </h3>
                
                {filteredCards.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neutral-100 text-neutral-500 mb-4">
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Credit Cards Found</h3>
                    <p className="text-neutral-600 mb-4">
                      Try adjusting your filters to see more credit card options.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedIssuer('all');
                        setMinIncome(0);
                        setMaxAnnualFee(10000);
                        setCreditScore(650);
                        setRewardPreference('all');
                      }}
                      className="btn btn-primary"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCards.map((card) => (
                      <div 
                        key={card.id}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleCardSelect(card)}
                      >
                        <div className="h-48 relative overflow-hidden">
                          <img 
                            src={card.image} 
                            alt={card.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex items-center mb-1">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
                                {card.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">{card.name}</h3>
                            <p className="text-white/80 text-sm">{card.issuer}</p>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-neutral-500 mb-1">Annual Fee</p>
                              <p className="font-semibold text-neutral-900">
                                {card.annualFee === 0 ? 'Free' : `₹${card.annualFee.toLocaleString('en-IN')}`}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-neutral-500 mb-1">Reward Rate</p>
                              <p className="font-semibold text-neutral-900">
                                {card.rewardRate}% {card.rewardType}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-neutral-500 mb-1">Min. Income</p>
                              <p className="font-semibold text-neutral-900">
                                ₹{(card.minIncomeRequired / 100000).toFixed(1)}L
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-neutral-500 mb-1">Credit Score</p>
                              <p className="font-semibold text-neutral-900">
                                {card.creditScoreRequired}+
                              </p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-xs text-neutral-500 mb-1">Key Benefits</p>
                            <ul className="space-y-1">
                              {card.benefits.slice(0, 3).map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-4 w-4 text-[--success-500] mt-0.5 mr-1 flex-shrink-0" />
                                  <span className="text-xs text-neutral-700 line-clamp-1">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="text-xs text-neutral-500 mr-1">Ideal for:</span>
                              <span className="text-xs text-[--primary-600]">{card.idealFor[0]}</span>
                            </div>
                            <button className="text-[--primary-600] hover:text-[--primary-800] text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Credit Card Details */
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="relative h-64">
                <img 
                  src={selectedCard.image} 
                  alt={selectedCard.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <button
                  onClick={closeCardDetails}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
                      {selectedCard.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-1">{selectedCard.name}</h2>
                  <p className="text-white/80">{selectedCard.issuer}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Card Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Annual Fee</span>
                        <span className="font-medium text-neutral-900">
                          {selectedCard.annualFee === 0 ? 'Free' : `₹${selectedCard.annualFee.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Joining Fee</span>
                        <span className="font-medium text-neutral-900">
                          {selectedCard.joiningFee === 0 ? 'Free' : `₹${selectedCard.joiningFee.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Interest Rate</span>
                        <span className="font-medium text-neutral-900">{selectedCard.interestRate}% per month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Credit Limit</span>
                        <span className="font-medium text-neutral-900">{selectedCard.limitRange}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Rewards</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Reward Rate</span>
                        <span className="font-medium text-neutral-900">{selectedCard.rewardRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Reward Type</span>
                        <span className="font-medium text-neutral-900">{selectedCard.rewardType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Ideal For</span>
                        <span className="font-medium text-neutral-900">{selectedCard.idealFor.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Eligibility</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Min. Income</span>
                        <span className="font-medium text-neutral-900">₹{(selectedCard.minIncomeRequired / 100000).toFixed(1)}L p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Credit Score</span>
                        <span className="font-medium text-neutral-900">{selectedCard.creditScoreRequired}+</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Key Benefits</h3>
                    <ul className="space-y-2">
                      {selectedCard.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[--success-500] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-neutral-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Application Criteria</h3>
                    <ul className="space-y-2">
                      {selectedCard.applyCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[--primary-500] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-neutral-700">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-[--primary-50] p-6 rounded-lg border border-[--primary-100] mb-8">
                  <div className="flex items-start">
                    <Info className="h-6 w-6 text-[--primary-600] mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-[--primary-900] mb-2">Is This Card Right For You?</h3>
                      <p className="text-[--primary-700] mb-4">
                        This card is ideal for {selectedCard.idealFor.join(', ')}. With a reward rate of {selectedCard.rewardRate}% in {selectedCard.rewardType}, 
                        it offers excellent value for those who spend frequently on {selectedCard.category.toLowerCase()} expenses.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg">
                          <h4 className="font-medium text-neutral-900 mb-1">Pros</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-[--success-500] mt-0.5 mr-1 flex-shrink-0" />
                              <span className="text-sm text-neutral-700">
                                {selectedCard.rewardRate}% {selectedCard.rewardType} on spends
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-[--success-500] mt-0.5 mr-1 flex-shrink-0" />
                              <span className="text-sm text-neutral-700">
                                {selectedCard.benefits[0]}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-[--success-500] mt-0.5 mr-1 flex-shrink-0" />
                              <span className="text-sm text-neutral-700">
                                {selectedCard.benefits[1]}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <h4 className="font-medium text-neutral-900 mb-1">Cons</h4>
                          <ul className="space-y-1">
                            {selectedCard.annualFee > 0 && (
                              <li className="flex items-start">
                                <AlertTriangle className="h-4 w-4 text-[--warning-500] mt-0.5 mr-1 flex-shrink-0" />
                                <span className="text-sm text-neutral-700">
                                  Annual fee of ₹{selectedCard.annualFee.toLocaleString('en-IN')}
                                </span>
                              </li>
                            )}
                            <li className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-[--warning-500] mt-0.5 mr-1 flex-shrink-0" />
                              <span className="text-sm text-neutral-700">
                                Requires credit score of {selectedCard.creditScoreRequired}+
                              </span>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-[--warning-500] mt-0.5 mr-1 flex-shrink-0" />
                              <span className="text-sm text-neutral-700">
                                High interest rate of {selectedCard.interestRate}% per month
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={closeCardDetails}
                    className="btn btn-outline"
                  >
                    Back to Results
                  </button>
                  <a 
                    href={`https://www.${selectedCard.issuer.toLowerCase().replace(/\s+/g, '')}.com/credit-cards`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary flex-grow sm:flex-grow-0 sm:flex-1"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Credit Score Estimator */
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {estimatedScore === null ? (
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Estimate Your Credit Score</h3>
              <p className="text-neutral-600 mb-6">
                Answer a few questions about your credit history to get an estimated credit score. This is not an official CIBIL score but provides a good approximation based on key factors that influence your credit score.
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium text-neutral-900">Question {currentQuestion + 1} of {scoreQuestions.length}</h4>
                  <span className="text-sm text-neutral-500">{Math.round(((currentQuestion + 1) / scoreQuestions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                  <div 
                    className="bg-[--primary-600] h-2.5 rounded-full" 
                    style={{ width: `${((currentQuestion + 1) / scoreQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-lg font-medium text-neutral-900 mb-4">{scoreQuestions[currentQuestion].question}</h4>
                <div className="space-y-3">
                  {scoreQuestions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(scoreQuestions[currentQuestion].id, option.id)}
                      className={`w-full text-left p-4 rounded-lg border ${
                        answers[scoreQuestions[currentQuestion].id] === option.id
                          ? 'border-[--primary-500] bg-[--primary-50]'
                          : 'border-neutral-200 hover:border-[--primary-300] hover:bg-[--primary-50]'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                          answers[scoreQuestions[currentQuestion].id] === option.id
                            ? 'border-[--primary-500] bg-[--primary-500]'
                            : 'border-neutral-300'
                        }`}>
                          {answers[scoreQuestions[currentQuestion].id] === option.id && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-neutral-800">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                  disabled={currentQuestion === 0}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentQuestion === 0
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Previous
                </button>
                
                {currentQuestion === scoreQuestions.length - 1 && Object.keys(answers).length === scoreQuestions.length && (
                  <button
                    onClick={calculateCreditScore}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[--primary-600] text-white hover:bg-[--primary-700]"
                  >
                    Calculate Score
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Your Estimated Credit Score</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="bg-[--primary-50] p-6 rounded-lg border border-[--primary-100] mb-6">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-white mb-3">
                        <div className="text-3xl font-bold text-[--primary-600]">{estimatedScore}</div>
                      </div>
                      <h4 className="text-xl font-semibold text-[--primary-900]">{scoreCategory}</h4>
                      <p className="text-[--primary-700] mt-1">Estimated Credit Score</p>
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-full h-4 bg-neutral-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full relative">
                          <div className="absolute inset-0 flex">
                            <div className="bg-[--error-500] h-full flex-1"></div>
                            <div className="bg-[--warning-500] h-full flex-1"></div>
                            <div className="bg-[--success-500] h-full flex-1"></div>
                          </div>
                          <div 
                            className="absolute h-full w-3 bg-white border-2 border-neutral-700 rounded-full transform -translate-x-1/2"
                            style={{ left: `${((estimatedScore - 300) / 600) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-neutral-500">
                        <span>Poor (300-549)</span>
                        <span>Fair (550-699)</span>
                        <span>Good (700-900)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-neutral-200">
                    <h4 className="text-lg font-semibold text-neutral-900 mb-4">What This Means</h4>
                    <p className="text-neutral-600 mb-4">
                      {scoreCategory === 'Excellent' && 'Your credit score is excellent! You likely qualify for the best credit cards with premium benefits and lowest interest rates.'}
                      {scoreCategory === 'Good' && 'Your credit score is good. You should qualify for most credit cards with competitive rates and good benefits.'}
                      {scoreCategory === 'Fair' && 'Your credit score is fair. You may qualify for many credit cards, but might not get the best rates or premium cards.'}
                      {scoreCategory === 'Needs Improvement' && 'Your credit score needs improvement. You may face challenges getting approved for premium credit cards and might receive higher interest rates.'}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-24 text-sm text-neutral-500">Approval Odds:</div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="w-full bg-neutral-200 rounded-full h-2.5 mr-2">
                              <div 
                                className={`h-full rounded-full ${
                                  scoreCategory === 'Excellent' ? 'bg-[--success-500] w-[90%]' : 
                                  scoreCategory === 'Good' ? 'bg-[--success-500] w-[70%]' : 
                                  scoreCategory === 'Fair' ? 'bg-[--warning-500] w-[50%]' : 
                                  'bg-[--error-500] w-[30%]'
                                }`}
                              ></div>
                            </div>
                            <span className="text-sm text-neutral-700">
                              {scoreCategory === 'Excellent' ? 'Very High' : 
                               scoreCategory === 'Good' ? 'High' : 
                               scoreCategory === 'Fair' ? 'Moderate' : 
                               'Low'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-24 text-sm text-neutral-500">Interest Rates:</div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="w-full bg-neutral-200 rounded-full h-2.5 mr-2">
                              <div 
                                className={`h-full rounded-full ${
                                  scoreCategory === 'Excellent' ? 'bg-[--success-500] w-[90%]' : 
                                  scoreCategory === 'Good' ? 'bg-[--success-500] w-[70%]' : 
                                  scoreCategory === 'Fair' ? 'bg-[--warning-500] w-[40%]' : 
                                  'bg-[--error-500] w-[20%]'
                                }`}
                              ></div>
                            </div>
                            <span className="text-sm text-neutral-700">
                              {scoreCategory === 'Excellent' ? 'Lowest' : 
                               scoreCategory === 'Good' ? 'Low' : 
                               scoreCategory === 'Fair' ? 'Moderate' : 
                               'High'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-24 text-sm text-neutral-500">Credit Limit:</div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="w-full bg-neutral-200 rounded-full h-2.5 mr-2">
                              <div 
                                className={`h-full rounded-full ${
                                  scoreCategory === 'Excellent' ? 'bg-[--success-500] w-[90%]' : 
                                  scoreCategory === 'Good' ? 'bg-[--success-500] w-[60%]' : 
                                  scoreCategory === 'Fair' ? 'bg-[--warning-500] w-[40%]' : 
                                  'bg-[--error-500] w-[20%]'
                                }`}
                              ></div>
                            </div>
                            <span className="text-sm text-neutral-700">
                              {scoreCategory === 'Excellent' ? 'Highest' : 
                               scoreCategory === 'Good' ? 'High' : 
                               scoreCategory === 'Fair' ? 'Moderate' : 
                               'Low'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
                    <h4 className="text-lg font-semibold text-neutral-900 mb-4">Improvement Tips</h4>
                    <ul className="space-y-3">
                      {scoreImprovementTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[--success-500] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-neutral-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[--accent-50] p-6 rounded-lg border border-[--accent-100]">
                    <h4 className="text-lg font-semibold text-[--accent-900] mb-4">Recommended Credit Cards</h4>
                    <div className="space-y-4">
                      {creditCards
                        .filter(card => card.creditScoreRequired <= estimatedScore)
                        .sort((a, b) => {
                          // Sort by a combination of factors
                          const aScore = (a.rewardRate * 10) - (a.annualFee / 1000) + (a.benefits.length * 5);
                          const bScore = (b.rewardRate * 10) - (b.annualFee / 1000) + (b.benefits.length * 5);
                          return bScore - aScore;
                        })
                        .slice(0, 3)
                        .map((card) => (
                          <div key={card.id} className="flex items-start p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 rounded-lg mr-3 flex items-center justify-center overflow-hidden">
                              <CreditCard className="h-6 w-6 text-neutral-500" />
                            </div>
                            <div className="flex-grow">
                              <h5 className="font-medium text-neutral-900">{card.name}</h5>
                              <p className="text-xs text-neutral-500">{card.issuer}</p>
                              <div className="flex items-center mt-1">
                                <Star className="h-3 w-3 text-[--warning-500] mr-1" />
                                <span className="text-xs text-neutral-600">
                                  {card.rewardRate}% {card.rewardType} • Min. Score: {card.creditScoreRequired}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setShowScoreEstimator(false);
                                setSelectedCard(card);
                              }}
                              className="text-[--primary-600] hover:text-[--primary-800] text-sm"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                    </div>
                    <button
                      onClick={() => {
                        setShowScoreEstimator(false);
                        resetScoreEstimator();
                      }}
                      className="mt-4 text-[--primary-600] hover:text-[--primary-800] text-sm font-medium flex items-center"
                    >
                      View All Eligible Cards
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetScoreEstimator}
                  className="btn btn-outline"
                >
                  Retake Assessment
                </button>
                <button
                  onClick={() => {
                    setShowScoreEstimator(false);
                    resetScoreEstimator();
                  }}
                  className="btn btn-primary"
                >
                  Find Credit Cards
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-neutral-900 mb-6">Understanding Credit Cards & Credit Scores</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium text-neutral-900 mb-4">How to Choose the Right Credit Card</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                  <DollarSign className="h-4 w-4 text-[--primary-600]" />
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 mb-1">Consider Your Spending Habits</h5>
                  <p className="text-sm text-neutral-600">
                    Choose a card that rewards your most frequent spending categories. If you travel often, a travel card might be best. If you shop frequently, look for cashback on retail purchases.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                  <Award className="h-4 w-4 text-[--primary-600]" />
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 mb-1">Evaluate the Rewards Program</h5>
                  <p className="text-sm text-neutral-600">
                    Compare reward rates, redemption options, and whether points expire. Some cards offer better value for specific redemptions like travel or merchandise.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                  <Percent className="h-4 w-4 text-[--primary-600]" />
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 mb-1">Understand the Fees</h5>
                  <p className="text-sm text-neutral-600">
                    Consider annual fees, joining fees, and foreign transaction fees. Many cards waive the annual fee if you spend a certain amount each year.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-neutral-900 mb-4">Factors Affecting Your Credit Score</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                  <Tag className="h-4 w-4 text-[--primary-600]" />
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 mb-1">Payment History (35%)</h5>
                  <p className="text-sm text-neutral-600">
                    Your track record of paying bills on time is the most significant factor. Late payments, defaults, and bankruptcies can severely impact your score.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                  <Tag className="h-4 w-4 text-[--primary-600]" />
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 mb-1">Credit Utilization (30%)</h5>
                  <p className="text-sm text-neutral-600">
                    The percentage of your available credit that you're using. Keeping this below 30% is recommended for a good credit score.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                  <Tag className="h-4 w-4 text-[--primary-600]" />
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 mb-1">Credit History Length (15%)</h5>
                  <p className="text-sm text-neutral-600">
                    The longer your credit history, the better. This includes the age of your oldest account, newest account, and average age of all accounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-neutral-900 mb-6">Frequently Asked Questions</h3>
        
        <div className="space-y-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">How is my credit score calculated in India?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>In India, credit scores are primarily calculated by credit bureaus like CIBIL, Experian, Equifax, and CRIF Highmark. The CIBIL score, ranging from 300 to 900, is the most widely used.</p>
              <p className="mt-2">Your score is influenced by several factors:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Payment history (35%): Timely repayment of loans and credit card bills</li>
                <li>Credit utilization (30%): Percentage of available credit you're using</li>
                <li>Credit history length (15%): How long you've been using credit</li>
                <li>Credit mix (10%): Types of credit you have (loans, credit cards, etc.)</li>
                <li>New credit applications (10%): Recent credit inquiries and new accounts</li>
              </ul>
              <p className="mt-2">A score above 750 is generally considered excellent and increases your chances of loan and credit card approvals at favorable terms.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">What's the difference between secured and unsecured credit cards?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p><strong>Unsecured Credit Cards:</strong> These are standard credit cards that don't require any collateral. Approval is based on your credit history, income, and creditworthiness. Most credit cards in India are unsecured.</p>
              <p className="mt-2"><strong>Secured Credit Cards:</strong> These require a security deposit that typically becomes your credit limit. They're easier to qualify for and are designed for people with limited or poor credit history who want to build or rebuild their credit.</p>
              <p className="mt-2">Key differences:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Eligibility:</strong> Secured cards have lower eligibility requirements</li>
                <li><strong>Credit Limit:</strong> For secured cards, it's typically equal to your deposit amount</li>
                <li><strong>Fees:</strong> Secured cards often have higher fees and interest rates</li>
                <li><strong>Rewards:</strong> Unsecured cards typically offer better rewards and benefits</li>
              </ul>
              <p className="mt-2">If you're new to credit or have a low credit score, a secured card can be a good starting point to build your credit history.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">How can I improve my credit score quickly?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>While there's no overnight fix for a credit score, here are some strategies that can help improve your score relatively quickly:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>Pay off outstanding debts:</strong> Reducing your credit utilization ratio can have an immediate positive impact</li>
                <li><strong>Set up automatic payments:</strong> Ensure you never miss a payment deadline</li>
                <li><strong>Become an authorized user:</strong> If a family member has good credit, ask to be added as an authorized user on their card</li>
                <li><strong>Check your credit report for errors:</strong> Dispute any inaccuracies you find</li>
                <li><strong>Reduce credit applications:</strong> Multiple inquiries in a short period can lower your score</li>
                <li><strong>Keep old accounts open:</strong> Longer credit history improves your score</li>
                <li><strong>Increase credit limits:</strong> If possible, request higher limits on existing cards (without using the additional credit)</li>
              </ul>
              <p className="mt-2">Most improvements take at least 30-60 days to reflect in your score, and significant improvements typically take 3-6 months of consistent good credit behavior.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">What happens if I miss a credit card payment?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Missing a credit card payment can have several consequences:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>Late payment fees:</strong> Typically ranges from ₹100 to ₹1,000 depending on the bank and outstanding amount</li>
                <li><strong>Interest charges:</strong> You'll lose the interest-free period and start accruing interest (typically 3-4% per month) on all purchases</li>
                <li><strong>Credit score impact:</strong> Even a single missed payment can lower your credit score by 50-100 points</li>
                <li><strong>Loss of benefits:</strong> You might lose reward points or promotional offers like 0% EMI</li>
                <li><strong>Reporting to credit bureaus:</strong> Payment delays of 30+ days are reported to credit bureaus and stay on your record for up to 7 years</li>
              </ul>
              <p className="mt-2">If you realize you've missed a payment, make the minimum payment as soon as possible to minimize the damage. If it's your first time, you can also call your bank and request a late fee waiver.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">How many credit cards should I have?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>There's no one-size-fits-all answer to how many credit cards you should have. It depends on your financial discipline, spending habits, and ability to manage multiple accounts.</p>
              <p className="mt-2">For most people, 2-3 strategically chosen credit cards can maximize benefits while remaining manageable:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>A primary card for everyday spending with good overall rewards</li>
                <li>A specialized card that offers high rewards in your top spending category (travel, dining, shopping, etc.)</li>
                <li>Optionally, a backup card with no foreign transaction fees or specific benefits</li>
              </ul>
              <p className="mt-2">Benefits of having multiple cards:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Maximizing rewards across different spending categories</li>
                <li>Higher total credit limit, which can lower your credit utilization ratio</li>
                <li>Backup payment option if one card is lost or compromised</li>
              </ul>
              <p className="mt-2">However, having too many cards can lead to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Difficulty tracking payment due dates</li>
                <li>Higher risk of overspending</li>
                <li>Multiple annual fees adding up</li>
                <li>Temporary negative impact on credit score from multiple applications</li>
              </ul>
              <p className="mt-2">Focus on quality over quantity, and only apply for cards that provide significant value for your specific spending patterns.</p>
            </div>
          </details>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-neutral-900 mb-6">Credit Card Guide for Indian Consumers</h3>
        
        <div className="prose max-w-none">
          <h4>Understanding Credit Card Types in India</h4>
          <p>
            The Indian credit card market offers various types of cards tailored to different needs and lifestyles. Understanding these categories can help you choose the right card for your specific requirements.
          </p>
          
          <h5>Rewards Credit Cards</h5>
          <p>
            Rewards cards offer points, miles, or cashback on your spending. These cards are ideal for regular spenders who want to maximize returns on their everyday purchases. Popular options include the HDFC Regalia, SBI SimplyCLICK, and ICICI Amazon Pay Credit Card.
          </p>
          
          <h5>Travel Credit Cards</h5>
          <p>
            Travel cards provide benefits like airport lounge access, air miles, travel insurance, and foreign currency transaction fee waivers. These are perfect for frequent travelers, with cards like HDFC Regalia, Citi PremierMiles, and American Express Platinum Travel Card leading the category.
          </p>
          
          <h5>Lifestyle Credit Cards</h5>
          <p>
            These cards offer benefits related to dining, entertainment, shopping, and other lifestyle expenses. They typically provide discounts, buy-one-get-one offers, and special access to events. Examples include the HDFC Diners Club Black, Yes Prosperity, and IndusInd Iconia.
          </p>
          
          <h5>Fuel Credit Cards</h5>
          <p>
            Fuel cards offer savings on fuel purchases through surcharge waivers and additional rewards. Cards like ICICI HPCL Coral, SBI BPCL, and HDFC Bharat CashBack are popular choices for those with high fuel expenses.
          </p>
          
          <h5>Co-Branded Credit Cards</h5>
          <p>
            These cards are partnerships between banks and retailers or service providers, offering enhanced benefits when used with the partner brand. Examples include the Amazon Pay ICICI Card, Flipkart Axis Bank Card, and Vistara SBI Card.
          </p>
          
          <h5>Business Credit Cards</h5>
          <p>
            Designed for business expenses, these cards offer benefits like expense tracking, higher credit limits, and rewards on business-related spending. HDFC Business Regalia, Axis Bank Business Platinum, and American Express Business Card are popular options.
          </p>
          
          <h5>Secured Credit Cards</h5>
          <p>
            These cards require a security deposit and are ideal for those with limited or poor credit history. They help build credit scores while providing basic credit card functionality. Examples include SBI Unnati Card and ICICI Coral Secured Credit Card.
          </p>
          
          <h4>Credit Score Basics for Indians</h4>
          <p>
            In India, credit scores typically range from 300 to 900, with higher scores indicating better creditworthiness. The most widely recognized score is the CIBIL Score, provided by TransUnion CIBIL, though other bureaus like Experian, Equifax, and CRIF Highmark also operate in India.
          </p>
          
          <p>
            A good credit score in India is generally considered to be 750 or above. With this score, you're likely to get approved for most credit cards and loans with favorable terms. Scores between 650-750 are considered fair, while scores below 650 may limit your options or result in higher interest rates.
          </p>
          
          <h5>How to Check Your Credit Score in India</h5>
          <p>
            You can check your credit score for free once a year from each credit bureau. Additionally, many banks and financial institutions now offer free credit score checks to their customers. Online financial platforms like Paisabazaar, BankBazaar, and CRED also provide free credit score checks.
          </p>
          
          <h4>Responsible Credit Card Usage</h4>
          <p>
            Using credit cards responsibly is essential for maintaining good financial health and a strong credit score. Here are some best practices:
          </p>
          
          <ul>
            <li>Pay your full balance on time every month to avoid interest charges</li>
            <li>Keep your credit utilization below 30% of your total credit limit</li>
            <li>Review your statements regularly for unauthorized charges</li>
            <li>Avoid applying for multiple credit cards in a short period</li>
            <li>Don't use credit cards for cash advances except in emergencies</li>
            <li>Choose cards that align with your spending patterns</li>
            <li>Set up automatic payments to avoid missing due dates</li>
          </ul>
          
          <h4>Credit Card Fees and Charges in India</h4>
          <p>
            Understanding the various fees and charges associated with credit cards can help you avoid unnecessary expenses:
          </p>
          
          <ul>
            <li><strong>Annual Fee:</strong> Ranges from ₹0 to ₹50,000+ depending on the card tier</li>
            <li><strong>Joining Fee:</strong> One-time fee charged when you get the card</li>
            <li><strong>Interest Rate:</strong> Typically 3-4% per month (36-48% annually) on outstanding balances</li>
            <li><strong>Late Payment Fee:</strong> ₹100-1,000 depending on the outstanding amount</li>
            <li><strong>Cash Advance Fee:</strong> 2.5-3.5% of the withdrawn amount</li>
            <li><strong>Foreign Transaction Fee:</strong> 2-3.5% on transactions in foreign currencies</li>
            <li><strong>Over-limit Fee:</strong> Charged when you exceed your credit limit</li>
            <li><strong>Card Replacement Fee:</strong> ₹100-500 for replacing a lost or damaged card</li>
          </ul>
          
          <h4>Credit Card Security in India</h4>
          <p>
            Protecting your credit card information is crucial in the digital age. Follow these security practices:
          </p>
          
          <ul>
            <li>Enable transaction alerts via SMS and email</li>
            <li>Use virtual cards for online transactions when available</li>
            <li>Never share your CVV, PIN, or OTP with anyone</li>
            <li>Regularly monitor your statements for unauthorized transactions</li>
            <li>Use secure, updated browsers for online transactions</li>
            <li>Enable two-factor authentication for online banking</li>
            <li>Report lost or stolen cards immediately</li>
          </ul>
          
          <h4>Credit Card Regulations in India</h4>
          <p>
            The Reserve Bank of India (RBI) regulates credit card operations in India. Some key regulations include:
          </p>
          
          <ul>
            <li>Banks must provide a minimum 3-day notice before the payment due date</li>
            <li>Credit card issuers must obtain explicit consent before increasing credit limits</li>
            <li>Cardholders have the right to dispute unauthorized transactions</li>
            <li>Banks must provide a grace period of at least 3 days after the due date before reporting late payments</li>
            <li>Credit card companies must provide a toll-free number for lost card reporting</li>
          </ul>
          
          <p>
            Understanding these regulations can help you protect your rights as a credit card user in India.
          </p>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100]">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Financial Tools</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/calculators/emi-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">EMI Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate EMIs for your loans and credit card purchases</p>
          </a>
          <a 
            href="/calculators/loan-comparison-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Loan Comparison Calculator</h4>
            <p className="text-xs text-[--primary-600]">Compare different loan offers side by side</p>
          </a>
          <a 
            href="/calculators/credit-card-emi-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Credit Card EMI Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate EMIs for credit card purchases</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreditCardFinder;