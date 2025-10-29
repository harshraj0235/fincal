export interface TeamProfile {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
  };
}

export const teamProfiles: TeamProfile[] = [
  {
    id: 'raushan-kumar',
    name: 'Raushan Kumar',
    role: 'Financial Writer',
    bio: 'Financial analyst and writer specializing in market trends and economic analysis.',
  },
  {
    id: 'saurabh-kumar',
    name: 'Saurabh Kumar',
    role: 'Business Analyst',
    bio: 'Business analyst with expertise in corporate finance and investment strategies.',
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
  },
];

