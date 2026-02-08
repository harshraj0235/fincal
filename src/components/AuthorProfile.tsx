import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaFacebookF, FaGraduationCap, FaUserGraduate } from 'react-icons/fa';
import type { BlogAuthor } from '../data/blogAuthors';

const defaultDisclaimer = 'All content shared is for educational purposes only. We are not financial experts. Please consult authorized financial advisors for professional advice.';

interface AuthorProfileProps {
  author: BlogAuthor;
  isFullPage?: boolean;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ author, isFullPage = false }) => {
  const hasLinkedIn = (author.sameAs || []).some((u) => u.toLowerCase().includes('linkedin'));
  const hasFacebook = (author.sameAs || []).some((u) => u.toLowerCase().includes('facebook'));
  const linkedInUrl = (author.sameAs || []).find((u) => u.toLowerCase().includes('linkedin'));
  const facebookUrl = (author.sameAs || []).find((u) => u.toLowerCase().includes('facebook'));

  const content = (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={author.image}
              alt={author.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
              <FaUserGraduate className="text-white text-sm" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{author.name}</h1>
            <p className="text-blue-100 text-lg mb-3">{author.role}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <FaGraduationCap className="text-xs" />
                {author.role}
              </span>
              <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
                Interest in finance
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaUserGraduate className="text-blue-600" />
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{author.bio}</p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-8">
          <div className="flex items-start gap-3">
            <div className="text-amber-600 mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Important Disclaimer</h3>
              <p className="text-amber-700 text-sm">{defaultDisclaimer}</p>
            </div>
          </div>
        </div>

        {(hasLinkedIn || hasFacebook) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect With Me</h2>
            <div className="flex flex-wrap gap-4">
              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <FaLinkedin className="text-xl" />
                  <span>LinkedIn</span>
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <FaFacebookF className="text-xl" />
                  <span>Facebook</span>
                </a>
              )}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Areas of Interest</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Finance</h3>
              <p className="text-gray-600 text-sm">Personal finance, investment basics, and money management</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Content & Learning</h3>
              <p className="text-gray-600 text-sm">Educational content and knowledge sharing for Indian readers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isFullPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Author Profile</h1>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return <div className="max-w-2xl mx-auto">{content}</div>;
};

export default AuthorProfile;
