import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, TrendingUp, ExternalLink, Award } from 'lucide-react';
import { Influencer } from '../data/influencers';

interface InfluencerCardProps {
  influencer: Influencer;
  featured?: boolean;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer, featured = false }) => {
  const cardClasses = featured 
    ? "group relative bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
    : "group relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1";

  return (
    <div className={cardClasses}>
      {featured && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
          <Award className="h-3 w-3" />
          <span>#{influencer.ranking}</span>
        </div>
      )}

      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img
            src={influencer.photo_url}
            alt={influencer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
            {influencer.name}
          </h3>
          <p className="text-slate-600 text-sm font-medium mb-1">{influencer.title}</p>
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{influencer.location}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {influencer.expertise.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {influencer.expertise.length > 3 && (
            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium">
              +{influencer.expertise.length - 3} more
            </span>
          )}
        </div>

        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {influencer.biography.substring(0, 120)}...
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="h-4 w-4 text-blue-600 mr-1" />
            <span className="font-semibold text-slate-900">
              {influencer.social_media.youtube?.subscribers || 
               influencer.social_media.twitter?.followers || 
               influencer.social_media.linkedin?.connections || 'N/A'}
            </span>
          </div>
          <p className="text-xs text-slate-600">Followers</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="font-semibold text-slate-900">
              {influencer.income.estimated_annual}
            </span>
          </div>
          <p className="text-xs text-slate-600">Est. Annual</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link
          to={`/influencer/${influencer.id}`}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          <span>View Profile</span>
          <ExternalLink className="h-3 w-3" />
        </Link>

        <div className="flex items-center space-x-2 text-slate-500">
          {influencer.social_media.youtube && (
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          )}
          {influencer.social_media.twitter && (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
          {influencer.social_media.instagram && (
            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
          )}
          {influencer.social_media.linkedin && (
            <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;
