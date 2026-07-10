import React from 'react';
import { Award, Briefcase, BookOpen, Users, Calendar, Linkedin, Mail } from 'lucide-react';

interface ExpertAuthorProps {
  name: string;
  title: string;
  bio: string;
  image?: string;
  certifications?: string[];
  experience?: {
    years: number;
    description: string;
  };
  expertise?: string[];
  achievements?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  lastUpdated?: string;
  reviewedBy?: string;
}

const ExpertAuthor: React.FC<ExpertAuthorProps> = ({
  name,
  title,
  bio,
  image,
  certifications = [],
  experience,
  expertise = [],
  achievements = [],
  socialLinks = {},
  lastUpdated,
  reviewedBy,
}) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-start gap-4">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
            />
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{name}</h2>
            <p className="text-indigo-100 text-lg font-semibold mb-2">{title}</p>
            <div className="flex flex-wrap gap-2">
              {certifications.slice(0, 3).map((cert, idx) => (
                <span
                  key={idx}
                  className="bg-white bg-opacity-20 backdrop-blur px-3 py-1 rounded-full text-xs font-medium border border-white border-opacity-30"
                >
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* Bio */}
        <div>
          <p className="text-gray-700 leading-relaxed text-sm">{bio}</p>
        </div>

        {/* Experience Summary */}
        {experience && (
          <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-600">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase size={18} className="text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Professional Background</h3>
            </div>
            <p className="text-sm text-gray-700 ml-7">
              <span className="font-bold text-lg text-indigo-600">{experience.years}+</span> years
              of experience - {experience.description}
            </p>
          </div>
        )}

        {/* Expertise Areas */}
        {expertise.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-purple-600" />
              Areas of Expertise
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {expertise.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-purple-100 text-purple-900 px-3 py-2 rounded-lg text-sm font-medium"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Qualifications */}
        {certifications.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award size={18} className="text-yellow-600" />
              Certifications & Qualifications
            </h3>
            <ul className="space-y-2">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-yellow-500 text-lg leading-none mt-1">★</span>
                  <span className="text-sm text-gray-700">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Achievements */}
        {achievements.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users size={18} className="text-green-600" />
              Key Achievements
            </h3>
            <ul className="space-y-2">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-green-500 text-lg leading-none mt-1">✓</span>
                  <span className="text-sm text-gray-700">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Credibility Section */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-xs text-blue-900 leading-relaxed">
            <strong>Content Verification:</strong> This content has been researched, written, and reviewed
            by {name} {reviewedBy ? `and verified by ${reviewedBy}` : ''} to ensure accuracy and alignment
            with current financial regulations and best practices.
          </p>
        </div>

        {/* Last Updated & Connect */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {lastUpdated && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar size={14} />
              Last reviewed: {lastUpdated}
            </div>
          )}
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Connect:</span>
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {socialLinks.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="text-red-600 hover:text-red-800"
                  title="Email"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertAuthor;
