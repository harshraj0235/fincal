/**
 * YMYL Compliance Integration Examples
 * Shows how to integrate YMYL components into calculator and blog pages
 */

// ============================================================================
// EXAMPLE 1: Calculator Page with Full YMYL Compliance
// ============================================================================

import React from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import {
  EEATSignals,
  YMYLDisclaimer,
  SourceCitations,
  ContentDepthGuide,
} from '@/components/YMYLCompliance';
import YMYLSchemaGenerator from '@/components/YMYLCompliance/YMYLSchemaGenerator';

export const CalculatorPageExample = () => {
  const calculatorName = 'EMI Calculator';

  return (
    <>
      {/* SEO & Schema Setup */}
      <SEOHelmet
        title="EMI Calculator - Calculate Monthly Loan Installments"
        description="Free online EMI calculator to calculate monthly loan installments. Works for home loans, personal loans, auto loans, and educational loans."
        keywords="EMI calculator, loan calculator, home loan EMI, monthly installment"
        image="/calculator-emi.jpg"
        type="article"
        author="Raj Kumar Sharma"
        authorExpertise={['Loan Management', 'Financial Planning', 'Interest Calculation']}
        authorCredentials={['CFA', 'MBA Finance', '15+ Years Banking Experience']}
        expertReviewerName="Dr. Priya Gupta"
        expertReviewerTitle="CFP, Certified Financial Planner"
        isFinanceContent={true}
        calculatorData={{
          name: 'EMI Calculator',
          description: 'Calculate monthly loan installments with interest breakdown',
          category: 'Loan Tools',
          features: [
            'Instant calculation',
            'Amortization schedule',
            'Comparison tool',
            'PDF download',
          ],
          ratingValue: 4.9,
          reviewCount: 5200,
          authorName: 'MoneyCal Financial Team',
        }}
      />

      {/* Schema Markup */}
      <YMYLSchemaGenerator
        contentType="calculator"
        title={calculatorName}
        description="Calculate your monthly loan installment with our advanced EMI calculator"
        authorName="MoneyCal Financial Team"
        publishedDate="2025-12-15"
        modifiedDate="2026-02-17"
        wordCount={2500}
        ratingValue={4.9}
        reviewCount={5200}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">EMI Calculator</h1>
          <p className="text-gray-600 text-lg">
            Calculate your monthly loan installment instantly with our free online calculator
          </p>
        </div>

        {/* E-E-A-T Signals */}
        <div className="mb-8">
          <EEATSignals
            authorName="Raj Kumar Sharma"
            authorCredentials={['CFA', 'MBA Finance', '15+ Years Banking Experience']}
            authorBio="Senior financial advisor with extensive experience in loan management and personal finance planning. Has helped 10,000+ individuals understand EMI calculations and choose optimal loan structures."
            expertiseAreas={['EMI Calculations', 'Loan Management', 'Interest Rates', 'Financial Planning']}
            reviewCount={5200}
            ratingValue={4.9}
            trustBadges={['verified', 'expert', 'trusted']}
          />
        </div>

        {/* Main Calculator Component */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Your calculator JSX here */}
          <p>EMI Calculator Form</p>
        </div>

        {/* Content Depth Information */}
        <div className="mb-8">
          <ContentDepthGuide
            wordCount={2500}
            readingTime={12}
            contentSections={7}
            hasExamples={true}
            hasCaseStudies={true}
            hasExpertQuotes={true}
            updateFrequency="Monthly"
            lastUpdated="February 17, 2026"
          />
        </div>

        {/* Type-Specific Disclaimer */}
        <div className="mb-8">
          <YMYLDisclaimer type="loan" compact={false} showLegal={true} />
        </div>

        {/* Source References */}
        <div className="mb-8">
          <SourceCitations
            showGovernmentLinks={true}
            showIndustryStandards={true}
            customReferences={[
              {
                title: 'RBI Guidelines on Housing Loans',
                url: 'https://www.rbi.org.in/scripts/FAQView.aspx?Id=66',
                source: 'RBI',
                type: 'regulation',
              },
              {
                title: 'Personal Loan Interest Rate Standards',
                url: 'https://www.sebi.gov.in',
                source: 'SEBI',
                type: 'regulation',
              },
            ]}
          />
        </div>

        {/* FAQ Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          {/* FAQ items */}
        </div>
      </div>
    </>
  );
};

// ============================================================================
// EXAMPLE 2: Blog Article Page with Full YMYL Compliance
// ============================================================================

import { ExpertAuthor } from '@/components/YMYLCompliance';

export const BlogArticleExample = () => {
  return (
    <>
      {/* SEO & Schema */}
      <SEOHelmet
        title="Complete Guide to Investment Planning for Beginners - 2026"
        description="Comprehensive investment planning guide for Indian beginners. Learn about stocks, bonds, mutual funds, and building a diversified portfolio."
        author="Dr. Priya Gupta"
        authorExpertise={['Investment Planning', 'Portfolio Management', 'Risk Assessment', 'Asset Allocation']}
        authorCredentials={['CFA Level III', 'CFP', 'MBA Finance']}
        articlePublishedTime="2026-01-15T10:30:00Z"
        articleModifiedTime="2026-02-17T14:20:00Z"
        isFinanceContent={true}
        wordCount={3500}
        contentQualityScore={92}
      />

      <YMYLSchemaGenerator
        contentType="guide"
        title="Complete Guide to Investment Planning for Beginners - 2026"
        description="Comprehensive investment planning guide covering stocks, bonds, mutual funds, and portfolio diversification."
        authorName="Dr. Priya Gupta"
        authorTitle="CFA, CFP - Certified Financial Planner"
        publishedDate="2026-01-15"
        modifiedDate="2026-02-17"
        wordCount={3500}
        ratingValue={4.9}
        reviewCount={850}
        expertReview={{
          reviewerName: 'Dr. Rajesh Sharma',
          reviewerTitle: 'Head of Investment Advisory, Global Finance Institute',
          reviewRating: 5,
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Expert Author Info */}
        <div className="mb-8">
          <ExpertAuthor
            name="Dr. Priya Gupta"
            title="Certified Financial Planner (CFP), CFA Level III Charterholder"
            bio="Dr. Priya Gupta is a renowned financial planning expert with 18 years of experience in investment advisory and wealth management. She has helped over 5,000 clients build sustainable investment portfolios and achieve their financial goals. Her expertise spans equity analysis, mutual fund selection, and portfolio diversification strategies."
            image="/authors/priya-gupta.jpg"
            certifications={[
              'CFA Level III (Chartered Financial Analyst)',
              'CFP (Certified Financial Planner - India)',
              'PhD in Finance, Delhi University',
              'NISM Series X-A (Investment Advisor)',
            ]}
            experience={{
              years: 18,
              description: 'Senior Investment Advisor and Head of Portfolio Management at leading financial advisory firm',
            }}
            expertise={[
              'Equity Analysis',
              'Mutual Fund Selection',
              'Portfolio Diversification',
              'Risk Management',
              'Asset Allocation',
              'Retirement Planning',
            ]}
            achievements={[
              'Recognized as Top Investment Advisor by SEBI',
              'Published 60+ articles in Economic Times, Hindustan Times',
              'Speaker at National Investment Conference 2025',
              'Helped clients build portfolios averaging 14% annual returns',
              'Featured on CNBC Awaaz and ET Money',
            ]}
            lastUpdated="February 17, 2026"
            reviewedBy="Dr. Rajesh Sharma, CFA"
          />
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Complete Guide to Investment Planning for Beginners - 2026
          </h1>
          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <span>Published: January 15, 2026</span>
            <span>Updated: February 17, 2026</span>
            <span>Reading Time: 15 minutes</span>
          </div>
        </div>

        {/* Content Depth Metrics */}
        <div className="mb-8">
          <ContentDepthGuide
            wordCount={3500}
            readingTime={15}
            contentSections={8}
            hasExamples={true}
            hasCaseStudies={true}
            hasExpertQuotes={true}
            updateFrequency="Quarterly"
            lastUpdated="February 17, 2026"
          />
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            <li><a href="#intro" className="text-blue-600">1. Introduction to Investment Planning</a></li>
            <li><a href="#goals" className="text-blue-600">2. Setting Investment Goals</a></li>
            <li><a href="#assets" className="text-blue-600">3. Understanding Asset Classes</a></li>
            <li><a href="#portfolio" className="text-blue-600">4. Building Your Portfolio</a></li>
            <li><a href="#diversity" className="text-blue-600">5. Diversification Strategy</a></li>
            <li><a href="#risk" className="text-blue-600">6. Risk Management</a></li>
            <li><a href="#monitoring" className="text-blue-600">7. Monitoring and Rebalancing</a></li>
            <li><a href="#mistakes" className="text-blue-600">8. Common Mistakes to Avoid</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-8">
          {/* Your article content here - ensure 3000+ words */}
          <section id="intro">
            <h2>Introduction to Investment Planning</h2>
            {/* Detailed introduction with examples */}
          </section>

          {/* More sections... */}
        </div>

        {/* Comprehensive Disclaimer */}
        <div className="mb-8">
          <YMYLDisclaimer type="investment" compact={false} showLegal={true} />
        </div>

        {/* Source References */}
        <div className="mb-8">
          <SourceCitations
            showGovernmentLinks={true}
            showIndustryStandards={true}
            customReferences={[
              {
                title: 'SEBI Guidelines for Investment Advisors',
                url: 'https://www.sebi.gov.in/filings',
                source: 'SEBI Official',
                type: 'regulation',
              },
              {
                title: 'RBI Monetary Policy and Interest Rates',
                url: 'https://www.rbi.org.in',
                source: 'RBI',
                type: 'official',
              },
              {
                title: 'Mutual Fund Selection Criteria - AMFI',
                url: 'https://www.amfiindia.com',
                source: 'AMFI',
                type: 'guide',
              },
            ]}
          />
        </div>

        {/* FAQ Section */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          {/* FAQ items */}
        </div>
      </div>
    </>
  );
};

// ============================================================================
// EXAMPLE 3: Minimal Implementation for Existing Pages
// ============================================================================

export const MinimalYMYLImplementation = () => {
  return (
    <>
      <SEOHelmet
        title="Tool/Article Title"
        description="Description"
        author="Author Name"
        authorExpertise={['Expertise Area 1', 'Expertise Area 2']}
        authorCredentials={['Certification 1', 'Certification 2']}
      />

      <YMYLDisclaimer type="general" compact={true} />
      <SourceCitations showGovernmentLinks={true} />
    </>
  );
};

// ============================================================================
// USAGE NOTES
// ============================================================================

/*
QUICK INTEGRATION STEPS:

1. Import components:
   - import SEOHelmet from '@/components/SEOHelmet'
   - import { YMYLDisclaimer, SourceCitations, ... } from '@/components/YMYLCompliance'

2. Add to page head:
   - <SEOHelmet /> with YMYL props
   - <YMYLSchemaGenerator /> for schema

3. Add to page body:
   - <EEATSignals /> or <ExpertAuthor /> for author info
   - <YMYLDisclaimer /> before footer
   - <SourceCitations /> before footer

4. Ensure content meets:
   - Minimum 1,500 words for articles
   - Real-world examples from Indian context
   - Expert quotes or references
   - Update date clearly displayed

5. Test:
   - Validate schema: schema.org/validator
   - Check Google Rich Results Test
   - Review in Google Search Console
*/
