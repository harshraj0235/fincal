import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from '../../blog-post/BlogPostClient';

import { loadAllBlogData } from '@/data/lazyBlogData';

// Astro blogs are hardcoded in BlogPostClient, let's include their slugs too
import { astroBlog1 } from '@/data/astroBlogs/astroBlog1';
import { astroBlog2 } from '@/data/astroBlogs/astroBlog2';
import { astroBlog3 } from '@/data/astroBlogs/astroBlog3';
import { astroBlog4 } from '@/data/astroBlogs/astroBlog4';
import { astroBlog5 } from '@/data/astroBlogs/astroBlog5';
import { astroBlog6 } from '@/data/astroBlogs/astroBlog6';

const allAstroBlogs = [
  astroBlog1, astroBlog2, astroBlog3, astroBlog4, astroBlog5, astroBlog6
];

export async function generateStaticParams() {
  const posts = await loadAllBlogData();
  const slugs = posts.filter(p => p && p.slug).map(p => ({ slug: p.slug }));
  
  // Add astro blogs
  allAstroBlogs.forEach(b => {
    if (b && b.slug) slugs.push({ slug: b.slug });
  });

  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const posts = await loadAllBlogData();
  let post = posts.find((p: any) => p && p.slug === resolvedParams.slug);
  
  if (!post) {
    post = allAstroBlogs.find(b => b.slug === resolvedParams.slug);
  }
  
  if (!post) {
    return { title: 'Post Not Found | MoneyCal Blog' };
  }

  const title = `${post.title || 'Finance Blog'} | MoneyCal`;
  const description = post.excerpt || post.title || 'Read the latest finance blogs on MoneyCal.';
  const url = `https://moneycal.in/blog/${resolvedParams.slug}/`;
  const imageUrl = post.coverImage || post.featuredImage || 'https://moneycal.in/images/og-default.jpg';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'MoneyCal Blog',
      locale: 'en_IN',
      type: 'article',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const posts = await loadAllBlogData();
  let post = posts.find((p: any) => p && p.slug === resolvedParams.slug);
  
  if (!post) {
    post = allAstroBlogs.find(b => b.slug === resolvedParams.slug);
  }
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient />;
}
