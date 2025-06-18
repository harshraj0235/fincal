// src/pages/ExcelPost.tsx

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, Bookmark, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '../data/exceldata';

const ExcelPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(slug || '');
  const relatedPosts = getRelatedPosts(slug || '', 3);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Blog Post Not Found</h1>
        <p className="text-neutral-600 mb-8">The blog post you're looking for doesn't exist or may have been moved.</p>
        <button 
          onClick={() => navigate('/excel')}
          className="btn btn-primary"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/excel')} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Blog</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <article>
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-neutral-500 mb-6">
                <div className="flex items-center mr-6">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center mr-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  {post.categories.map(category => (
                    <span 
                      key={category} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden mb-8">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {post.content.map((section, index) => (
                <div key={index} className="mb-8">
                  {section.type === 'paragraph' && <p>{section.content}</p>}
                  {section.type === 'heading' && <h2 className="text-2xl font-bold mt-8 mb-4">{section.content}</h2>}
                  {section.type === 'subheading' && <h3 className="text-xl font-semibold mt-6 mb-3">{section.content}</h3>}
                  {section.type === 'list' && (
                    <ul className="list-disc pl-6 space-y-2">
                      {section.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.type === 'image' && (
                    <figure className="my-6">
                      <img 
                        src={section.url} 
                        alt={section.caption || ''} 
                        className="w-full rounded-lg"
                      />
                      {section.caption && (
                        <figcaption className="text-sm text-neutral-500 text-center mt-2">
                          {section.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  {section.type === 'quote' && (
                    <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-6 text-neutral-700 italic">
                      {section.content}
                      {section.author && (
                        <footer className="text-sm text-neutral-500 mt-2">— {section.author}</footer>
                      )}
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
            
            <div className="border-t border-b border-neutral-200 py-6 my-8">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Share this article</h4>
                  <div className="flex space-x-4">
                    <button className="text-neutral-600 hover:text-[#1877F2]">
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button className="text-neutral-600 hover:text-[#1DA1F2]">
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button className="text-neutral-600 hover:text-[#0A66C2]">
                      <Linkedin className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div>
                  <button className="flex items-center text-neutral-700 hover:text-primary-600">
                    <Bookmark className="h-5 w-5 mr-2" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-neutral-300 overflow-hidden mr-4">
                  <img 
                    src={post.authorImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                    alt={post.author} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">{post.author}</h4>
                  <p className="text-sm text-neutral-600">{post.authorTitle || "Financial Expert"}</p>
                </div>
              </div>
              <p className="text-neutral-700">
                {post.authorBio || "Financial expert with years of experience in the industry. Passionate about helping people make informed financial decisions."}
              </p>
            </div>
          </article>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/excel/${relatedPost.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                        <img 
                          src={relatedPost.coverImage} 
                          alt={relatedPost.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-primary-700 mb-4">
                Get the latest Excel tips and templates delivered straight to your inbox.
              </p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="input w-full"
                />
                <button 
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelPost;
