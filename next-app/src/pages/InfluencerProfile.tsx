import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Award, TrendingUp, ExternalLink, 
  Youtube, Twitter, Instagram, Linkedin, BookOpen, 
  GraduationCap, Target, DollarSign, Users, Star
} from 'lucide-react';
import { getInfluencerById } from '../data/influencers';
import SEOHelmet from '../components/SEOHelmet';

const InfluencerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const influencer = id ? getInfluencerById(id) : null;

  if (!influencer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Influencer Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": influencer.name,
    "jobTitle": influencer.title,
    "description": influencer.biography,
    "image": influencer.photo_url,
    "url": `https://moneycal.in/influencer/${influencer.id}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": influencer.location.split(', ')[0],
      "addressRegion": influencer.location.split(', ')[1] || "India",
      "addressCountry": "IN"
    },
    "knowsAbout": influencer.expertise,
    "alumniOf": influencer.education.map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution
    })),
    "award": influencer.achievements.map(achievement => achievement.title),
    "sameAs": [
      influencer.social_media.youtube?.url,
      influencer.social_media.twitter?.url,
      influencer.social_media.instagram?.url,
      influencer.social_media.linkedin?.url,
      influencer.website
    ].filter(Boolean)
  };

  return (
    <>
      <SEOHelmet
        title={`${influencer.name} - ${influencer.title}`}
        description={`Complete biography of ${influencer.name}, ${influencer.title}. Learn about their career, achievements, income, and investment philosophy. ${influencer.biography.substring(0, 100)}...`}
        keywords={`${influencer.name}, ${influencer.title}, ${influencer.expertise.join(', ')}, Indian finance influencer, biography, net worth`}
        url={`/influencer/${influencer.id}`}
        type="profile"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 to-green-900 py-16">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              <div className="relative">
                <img
                  src={influencer.photo_url}
                  alt={influencer.name}
                  className="w-40 h-40 rounded-2xl object-cover border-4 border-white shadow-2xl"
                />
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>#{influencer.ranking}</span>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {influencer.name}
                </h1>
                <p className="text-xl text-blue-100 mb-4 font-medium">{influencer.title}</p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-6 text-blue-200 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{influencer.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{influencer.age} years old</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {influencer.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Biography */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                  Biography
                </h2>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {influencer.biography}
                </p>
              </div>

              {/* Career Highlights */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Star className="h-6 w-6 mr-3 text-yellow-500" />
                  Career Highlights
                </h2>
                <ul className="space-y-4">
                  {influencer.career_highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                      <p className="text-slate-700 leading-relaxed">{highlight}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Investment Philosophy */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border border-blue-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-3 text-green-600" />
                  Investment Philosophy
                </h2>
                <p className="text-slate-700 leading-relaxed text-lg italic">
                  "{influencer.investment_philosophy}"
                </p>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3 text-purple-600" />
                  Education
                </h2>
                <div className="space-y-4">
                  {influencer.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-6">
                      <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-600">{edu.institution}</p>
                      <p className="text-sm text-slate-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Award className="h-6 w-6 mr-3 text-orange-600" />
                  Achievements & Awards
                </h2>
                <div className="space-y-6">
                  {influencer.achievements.map((achievement, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-slate-900">{achievement.title}</h3>
                        <span className="text-sm text-slate-500 bg-white px-2 py-1 rounded-full">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-slate-700">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Stats Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Ranking</span>
                    <span className="font-bold text-orange-600">#{influencer.ranking}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Age</span>
                    <span className="font-semibold text-slate-900">{influencer.age}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Location</span>
                    <span className="font-semibold text-slate-900 text-right text-sm">
                      {influencer.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Income Details */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  Income Details
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                    <p className="text-sm text-slate-600 mb-1">Estimated Annual Income</p>
                    <p className="text-2xl font-bold text-green-600">{influencer.income.estimated_annual}</p>
                  </div>
                  
                  {influencer.income.business_valuation && (
                    <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                      <p className="text-sm text-slate-600 mb-1">Business Valuation</p>
                      <p className="text-xl font-bold text-blue-600">{influencer.income.business_valuation}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Income Sources:</p>
                    <ul className="space-y-1">
                      {influencer.income.sources.map((source, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Social Media
                </h3>
                <div className="space-y-4">
                  {influencer.social_media.youtube && (
                    <a
                      href={influencer.social_media.youtube.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <Youtube className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium text-slate-900">{influencer.social_media.youtube.channel}</p>
                          <p className="text-sm text-slate-600">{influencer.social_media.youtube.subscribers} subscribers</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                    </a>
                  )}

                  {influencer.social_media.twitter && (
                    <a
                      href={influencer.social_media.twitter.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <Twitter className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-slate-900">{influencer.social_media.twitter.handle}</p>
                          <p className="text-sm text-slate-600">{influencer.social_media.twitter.followers} followers</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                    </a>
                  )}

                  {influencer.social_media.instagram && (
                    <a
                      href={influencer.social_media.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <div>
                          <p className="font-medium text-slate-900">{influencer.social_media.instagram.handle}</p>
                          <p className="text-sm text-slate-600">{influencer.social_media.instagram.followers} followers</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                    </a>
                  )}

                  {influencer.social_media.linkedin && (
                    <a
                      href={influencer.social_media.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <Linkedin className="h-5 w-5 text-blue-700" />
                        <div>
                          <p className="font-medium text-slate-900">{influencer.social_media.linkedin.profile}</p>
                          <p className="text-sm text-slate-600">{influencer.social_media.linkedin.connections} connections</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                    </a>
                  )}
                </div>
              </div>

              {/* Popular Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Popular Content</h3>
                <ul className="space-y-3">
                  {influencer.popular_content.map((content, index) => (
                    <li key={index} className="text-sm text-slate-700 flex items-start">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {content}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Website */}
              {influencer.website && (
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Official Website</h3>
                  <a
                    href={influencer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors px-4 py-3 rounded-lg flex items-center justify-between group"
                  >
                    <span className="font-medium">Visit Website</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerProfile;
