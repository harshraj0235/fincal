export interface Influencer {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  joinDate: string;
  followers: number;
  expertise: string[];
  socialLinks: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  achievements: string[];
  profileImage: string;
  coverImage: string;
  verified: boolean;
  rating: number;
  totalPosts: number;
  totalViews: number;
}

export const influencers: Influencer[] = [
  {
    id: 'rakesh-jhunjhunwala',
    name: 'Rakesh Jhunjhunwala',
    title: 'Big Bull of Indian Stock Market',
    bio: 'Legendary investor and trader known for his value investing approach and market predictions. Often called the "Big Bull" of Indian stock markets.',
    location: 'Mumbai, India',
    joinDate: '1985',
    followers: 2500000,
    expertise: ['Value Investing', 'Stock Market Analysis', 'Portfolio Management', 'Market Psychology'],
    socialLinks: {
      twitter: 'https://twitter.com/rakeshjhunjhunwala',
      linkedin: 'https://linkedin.com/in/rakesh-jhunjhunwala'
    },
    achievements: [
      'Built wealth from ₹5,000 to ₹50,000+ crores',
      'Known for early investments in Titan, Lupin, and other multibaggers',
      'Successful contrarian investor',
      'Mentored thousands of investors'
    ],
    profileImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    coverImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=2',
    verified: true,
    rating: 4.9,
    totalPosts: 1250,
    totalViews: 50000000
  },
  {
    id: 'warren-buffett-india',
    name: 'Warren Buffett India',
    title: 'Value Investing Expert',
    bio: 'Indian financial educator specializing in Warren Buffett\'s investment philosophy and value investing principles adapted for Indian markets.',
    location: 'Delhi, India',
    joinDate: '2018',
    followers: 850000,
    expertise: ['Value Investing', 'Fundamental Analysis', 'Long-term Investing', 'Financial Education'],
    socialLinks: {
      youtube: 'https://youtube.com/warrenbuffettindia',
      twitter: 'https://twitter.com/warrenbuffettindia',
      instagram: 'https://instagram.com/warrenbuffettindia'
    },
    achievements: [
      'Educated 100,000+ investors on value investing',
      'Consistent market outperformance',
      'Best-selling author on Indian value investing',
      'Regular speaker at financial conferences'
    ],
    profileImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    coverImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=2',
    verified: true,
    rating: 4.8,
    totalPosts: 890,
    totalViews: 25000000
  },
  {
    id: 'zerodha-varsity',
    name: 'Zerodha Varsity',
    title: 'Financial Education Platform',
    bio: 'Comprehensive financial education platform by Zerodha, providing free courses on stock markets, trading, and personal finance.',
    location: 'Bangalore, India',
    joinDate: '2015',
    followers: 1200000,
    expertise: ['Stock Market Education', 'Trading Strategies', 'Technical Analysis', 'Personal Finance'],
    socialLinks: {
      youtube: 'https://youtube.com/zerodhavarsity',
      twitter: 'https://twitter.com/zerodhavarsity',
      linkedin: 'https://linkedin.com/company/zerodha-varsity'
    },
    achievements: [
      'Free financial education for millions',
      'Comprehensive trading and investing courses',
      'Regular market analysis and insights',
      'Community of 1M+ learners'
    ],
    profileImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    coverImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=2',
    verified: true,
    rating: 4.9,
    totalPosts: 2100,
    totalViews: 75000000
  },
  {
    id: 'financial-literacy-india',
    name: 'Financial Literacy India',
    title: 'Personal Finance Educator',
    bio: 'Dedicated to improving financial literacy in India through practical advice on budgeting, investing, and wealth building.',
    location: 'Mumbai, India',
    joinDate: '2020',
    followers: 450000,
    expertise: ['Personal Finance', 'Budgeting', 'Mutual Funds', 'Tax Planning'],
    socialLinks: {
      youtube: 'https://youtube.com/financialliteracyindia',
      instagram: 'https://instagram.com/financialliteracyindia',
      linkedin: 'https://linkedin.com/in/financial-literacy-india'
    },
    achievements: [
      'Helped 50,000+ families improve their finances',
      'Best-selling personal finance books',
      'Regular contributor to financial magazines',
      'Speaker at financial literacy events'
    ],
    profileImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    coverImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=2',
    verified: true,
    rating: 4.7,
    totalPosts: 650,
    totalViews: 15000000
  }
];

export const getInfluencerById = (id: string): Influencer | undefined => {
  return influencers.find(influencer => influencer.id === id);
};

export const getInfluencersByExpertise = (expertise: string): Influencer[] => {
  return influencers.filter(influencer => 
    influencer.expertise.some(exp => exp.toLowerCase().includes(expertise.toLowerCase()))
  );
};

export const getTopInfluencers = (limit: number = 10): Influencer[] => {
  return influencers
    .sort((a, b) => b.followers - a.followers)
    .slice(0, limit);
};
