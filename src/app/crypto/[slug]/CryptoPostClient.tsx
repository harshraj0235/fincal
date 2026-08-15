"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { CryptoBlogPost } from '@/data/crypto/types';
import WhatsAppBanner from '@/components/WhatsAppBanner';

interface Props {
  post: CryptoBlogPost;
}

const CryptoPostClient: React.FC<Props> = ({ post }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/crypto" className="hover:text-blue-600 transition-colors">Crypto Guides</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>

        {/* Back Button */}
        <Link 
          href="/crypto"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          सभी क्रिप्टो लेख देखें
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 sm:p-10 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50/30">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="font-medium text-gray-900">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{new Date(post.publishedDate).toLocaleDateString('hi-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 font-medium">शेयर करें:</span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Banner */}
          <div className="px-8 sm:px-10 py-6 bg-gray-50/50">
            <WhatsAppBanner />
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="w-full">
              <img src={post.coverImage} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}

          {/* Content */}
          <div className="p-8 sm:p-10 prose prose-lg prose-blue max-w-none">
            {post.content.map((block, index) => {
              switch (block.type) {
                case 'heading':
                  return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{block.text}</h2>;
                case 'subheading':
                  return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-8 mb-4">{block.text}</h3>;
                case 'paragraph':
                  return <p key={index} className="text-gray-700 leading-relaxed mb-6">{block.text}</p>;
                case 'list':
                  const listItems = block.text.split('\n').filter(Boolean);
                  return (
                    <ul key={index} className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                      {listItems.map((item, i) => (
                        <li key={i}>{item.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="px-8 sm:px-10 pb-10">
              <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                <span className="text-gray-500 font-medium mr-2 flex items-center">Tags:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

      </div>
    </div>
  );
};

export default CryptoPostClient;
