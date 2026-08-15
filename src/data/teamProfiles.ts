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
      linkedin: 'https://www.linkedin.com/in/raushan-kumar',
      twitter: 'https://twitter.com/raushan_finance',
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
      linkedin: 'https://www.linkedin.com/in/saurabh-kumar',
      facebook: 'https://www.facebook.com/share/1AN1aqYijR/',
      instagram: 'https://www.instagram.com/ankitsaurabh2397?igsh=MWVxMXp5M3NieXRxZw=='
    }
  },
  {
    id: 'harsh-raj',
    name: 'Harsh Raj',
    role: 'Software Engineer',
    bio: 'Software engineer with expertise in financial tools, full-stack development, and fintech solutions.',
    socialProfiles: {
      linkedin: 'https://www.linkedin.com/in/harshitpatel9',
      twitter: 'https://twitter.com/harshitx'
    }
  },
  {
    id: 'vikram-kumar',
    name: 'Vikram Kumar',
    role: 'Investment Analyst',
    bio: 'Analyst specializing in startup investments and venture capital.',
    socialProfiles: {
      linkedin: 'https://www.linkedin.com/in/vikram-kumar',
      facebook: 'https://www.facebook.com/share/1D31EUK18w/',
      instagram: 'https://www.instagram.com/vikram_gupta777?igsh=cjRobjJzazZxYmRv'
    }
  },
];

