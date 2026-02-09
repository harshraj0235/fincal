import React from 'react';
import AuthorProfile from '../components/AuthorProfile';
import SEOHelmet from '../components/SEOHelmet';

const AuthorProfilePage: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Harsh Raj - Author Profile | Software Engineer & Finance Enthusiast"
        description="Meet Harsh Raj, a B.Tech graduate and software engineer passionate about finance education. Learn about his background, expertise, and connect with him on LinkedIn and Twitter."
        keywords="Harsh Raj, author profile, software engineer, finance enthusiast, B.Tech graduate, financial education, technology expert"
        ogTitle="Harsh Raj - Author Profile"
        ogDescription="Software Engineer & Finance Enthusiast sharing educational content"
        ogImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face"
        canonicalUrl="/author/harsh-raj"
      />
      <AuthorProfile isFullPage={true} />
    </>
  );
};

export default AuthorProfilePage; 