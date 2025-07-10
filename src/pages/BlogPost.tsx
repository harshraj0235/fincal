import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Calendar, User, Tag, Share2, Bookmark,
  Facebook, Twitter, Linkedin, Copy
} from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '../data/allBlogData';

const AUTHOR_NAME = "Harsh Raj";
const AUTHOR_LINKEDIN = "https://www.linkedin.com/in/harshitpatel9/";
const AUTHOR_TWITTER = "https://x.com/harshitx9";
const AUTHOR_IMAGE = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const AUTHOR_TITLE = "Software Engineer & Content Creator";
const AUTHOR_BIO = "Harsh Raj is a Software Engineer with years of experience helping people make smart investment decisions. Passionate about financial literacy and transparent, trustworthy guidance.";

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = getBlogPostBySlug(slug || '');
  const relatedPosts = getRelatedPosts(slug || '', 3);

  function shareOn(platform: 'facebook' | 'twitter' | 'linkedin') {
    const url = window.location.href;
    const text = post?.title || "Check out this blog on Fincal!";
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }
    window.open(shareUrl, '_blank', 'noopener');
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Blog Post Not Found</h1>
        <p className="text-neutral-600 mb-8">The blog post you're looking for doesn't exist or may have been moved.</p>
        <button
          onClick={() => navigate('/blog')}
          className="btn btn-primary"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Blog
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main blog section */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-sm p-4 sm:p-8">
              {/* Blog header */}
              <header className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-2 leading-tight">{post.title}</h1>
                <div className="flex flex-wrap items-center text-sm text-neutral-500 gap-x-6 gap-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{AUTHOR_NAME}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
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
                {post.coverImage && (
                  <div className="mt-6 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full aspect-[16/9] object-cover"
                    />
                  </div>
                )}
              </header>
              {/* Blog content */}
              <div className="prose prose-lg max-w-none mb-8">
                {post.content.map((section, index) => (
                  <div key={index} className="mb-8">
                    {section.type === 'paragraph' && <p>{section.content}</p>}
                    {section.type === 'heading' && <h2 className="text-2xl font-bold mt-8 mb-4">{section.content}</h2>}
                    {section.type === 'subheading' && <h3 className="text-xl font-semibold mt-6 mb-3">{section.content}</h3>}
                    {section.type === 'list' && (
                      <ul className="list-disc pl-6 space-y-2">
                        {section.items.map((item, i) => (
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
              {/* Social Share & Save */}
              <div className="border-t border-b border-neutral-200 py-6 my-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Share this article</h4>
                  <div className="flex space-x-3">
                    <button
                      aria-label="Share on Facebook"
                      onClick={() => shareOn('facebook')}
                      className="text-neutral-600 hover:text-[#1877F2] transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Share on Twitter"
                      onClick={() => shareOn('twitter')}
                      className="text-neutral-600 hover:text-[#1DA1F2] transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Share on LinkedIn"
                      onClick={() => shareOn('linkedin')}
                      className="text-neutral-600 hover:text-[#0A66C2] transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Copy link"
                      onClick={copyLink}
                      className="text-neutral-600 hover:text-primary-500 transition-colors"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div>
                  <button className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                    <Bookmark className="h-5 w-5 mr-2" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
              {/* Author box */}
              <section
                className="bg-neutral-50 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-4"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 shadow">
                  <img
                    src={AUTHOR_IMAGE}
                    alt={AUTHOR_NAME}
                    className="h-full w-full object-cover"
                    itemProp="image"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-900 flex items-center gap-2" itemProp="name">
                    {AUTHOR_NAME}
                    <a
                      href={AUTHOR_LINKEDIN}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Harsh Raj on LinkedIn"
                      className="ml-2 hover:text-[#0A66C2]"
                    >
                      <Linkedin className="inline h-5 w-5" />
                    </a>
                    <a
                      href={AUTHOR_TWITTER}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Harsh Raj on Twitter/X"
                      className="ml-2 hover:text-[#1DA1F2]"
                    >
                      <Twitter className="inline h-5 w-5" />
                    </a>
                  </h4>
                  <p className="text-sm text-neutral-600" itemProp="jobTitle">{AUTHOR_TITLE}</p>
                  <p className="text-neutral-700 mt-1" itemProp="description">{AUTHOR_BIO}</p>
                </div>
              </section>
            </article>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Related Articles */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
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
            </section>
            {/* Calculators */}
            <section className="bg-[--success-50] rounded-xl p-6 border border-[--success-100]">
              <h3 className="text-xl font-semibold text-[--success-900] mb-4">Government Scheme Calculators</h3>
              <p className="text-sm text-[--success-700] mb-4">
                Use our calculators to plan your investments in government schemes and maximize your returns.
              </p>
              <ul className="space-y-3">
                <li>
                  <Link to="/calculators/sukanya-samriddhi-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                    <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                    Sukanya Samriddhi Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/nps-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                    <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                    NPS Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/post-office-schemes-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                    <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                    Post Office Schemes Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/ppf-calculator" className="text-sm text-[--success-800] hover:text-[--success-900] font-medium flex items-center">
                    <span className="h-5 w-5 rounded-full bg-[--success-200] text-[--success-700] flex items-center justify-center flex-shrink-0 mr-2">→</span>
                    PPF Calculator
                  </Link>
                </li>
              </ul>
            </section>
            {/* Newsletter */}
            <section className="bg-primary-50 rounded-xl p-6 border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-primary-700 mb-4">
                Get the latest financial tips and insights delivered straight to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input w-full"
                  required
                  aria-label="Your email address"
                />
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Subscribe
                </button>
              </form>
            </section>
          </aside>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-900">
          <strong>Disclaimer:</strong> This content is for educational purposes only. I am not a certified financial expert or advisor. All information is based on personal experience, research, and knowledge, and should not be considered as professional or legal advice. Please consult with a qualified expert before making any financial decisions. All risks associated with your actions are your own responsibility. If you find any mistakes or inaccuracies, please contact me as soon as possible so I can make corrections. I try my best to comply with all applicable laws in India.
        </div>
      </div>
    </>
  );
};

export default BlogPost;
