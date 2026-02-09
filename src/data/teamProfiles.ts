export interface TeamProfile {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export const teamProfiles: TeamProfile[] = [
  {
    id: 'raushan-kumar',
    name: 'Raushan Kumar',
    role: 'Financial Writer',
    bio: 'Financial analyst and writer specializing in market trends and economic analysis.',
    socialProfiles: {
      facebook: 'https://www.facebook.com/share/1CQ2QYi3hJ/',
      instagram: 'https://www.instagram.com/raushanraj45512?igsh=a3R0YTd1bjAyeXV0'
    }
  },
  {
    id: 'saurabh-kumar',
    name: 'Saurabh Kumar',
    role: 'Business Analyst',
    bio: 'Business analyst with expertise in corporate finance and investment strategies.',
    socialProfiles: {
      facebook: 'https://www.facebook.com/share/1AN1aqYijR/',
      instagram: 'https://www.instagram.com/ankitsaurabh2397?igsh=MWVxMXp5M3NieXRxZw=='
    }
  },
  {
    id: 'harsh-raj',
    name: 'Harsh Raj',
    role: 'Senior Financial Analyst',
    bio: 'Senior analyst covering business trends, startups, and economic developments.',
  },
  {
    id: 'vikram-kumar',
    name: 'Vikram Kumar',
    role: 'Investment Analyst',
    bio: 'Analyst specializing in startup investments and venture capital.',
    socialProfiles: {
      facebook: 'https://www.facebook.com/share/1D31EUK18w/',
      instagram: 'https://www.instagram.com/vikram_gupta777?igsh=cjRobjJzazZxYmRv'
    }
  },
];

