# YMYL Implementation Action Checklist

## Status: READY FOR IMPLEMENTATION
**Created Date**: February 17, 2026  
**Last Updated**: February 17, 2026

---

## 📋 PHASE 1: IMMEDIATE ACTIONS (Week 1)

### ✅ Component Setup Complete
- [x] Created EEATSignals component
- [x] Created YMYLDisclaimer component  
- [x] Created SourceCitations component
- [x] Created ExpertAuthor component
- [x] Created ContentDepthGuide component
- [x] Created YMYLSchemaGenerator component
- [x] Updated SEOHelmet with YMYL support
- [x] Created index file for component exports

### 📝 Documentation Complete
- [x] YMYL_COMPLIANCE_GUIDE.md created
- [x] INTEGRATION_EXAMPLES.tsx created
- [x] This checklist created

### 🎯 HIGH PRIORITY - Apply to Top 10 Calculators

**Target Pages:**
- [ ] EMI Calculator
- [ ] SIP Calculator
- [ ] CAGR Calculator
- [ ] Mutual Fund Calculator
- [ ] Stock Profit Calculator
- [ ] Tax Calculator
- [ ] Loan Calculator
- [ ] Insurance Premium Calculator
- [ ] Investment Returns Calculator
- [ ] Budget Planner

**Implementation for each:**
```tsx
1. Add SEOHelmet with:
   - authorExpertise prop
   - authorCredentials prop
   - calculatorData.ratingValue
   - calculatorData.reviewCount

2. Add YMYLSchemaGenerator

3. Add EEATSignals component below title

4. Add YMYLDisclaimer before footer

5. Add SourceCitations before footer
```

---

## 📊 PHASE 2: MAIN CONTENT PAGES (Week 2)

### Blog Articles Needing Enhancement

**Investment Category Articles:**
- [ ] "Complete Guide to Stock Market Investing"
- [ ] "Mutual Funds for Beginners"
- [ ] "Understanding Index Funds"
- [ ] "SIP vs Lump Sum Investment"
- [ ] "Portfolio Diversification Strategy"

**Tax Planning Articles:**
- [ ] "Tax Saving Investment Strategies"
- [ ] "Income Tax Deductions Guide"
- [ ] "Tax Planning for Self-Employed"
- [ ] "Capital Gains Tax Guide"
- [ ] "HRA and Tax Benefits"

**Personal Finance Articles:**
- [ ] "Emergency Fund Planning"
- [ ] "Budget Planning Guide"
- [ ] "Debt Management Strategy"
- [ ] "Retirement Planning"
- [ ] "Insurance Planning Guide"

**Implementation Checklist for Each Article:**

```tsx
1. SEOHelmet:
   ✓ title (compelling)
   ✓ description (200 char)
   ✓ author (real name)
   ✓ authorExpertise
   ✓ authorCredentials
   ✓ articlePublishedTime
   ✓ articleModifiedTime
   ✓ wordCount (minimum 1500)

2. YMYLSchemaGenerator:
   ✓ contentType: "article"
   ✓ All fields filled

3. ExpertAuthor Component:
   ✓ Name and title
   ✓ Bio (200+ words)
   ✓ Certifications
   ✓ Experience details
   ✓ Expertise areas
   ✓ Achievements

4. ContentDepthGuide:
   ✓ Actual word count
   ✓ Section count
   ✓ hasExamples: true
   ✓ hasCaseStudies: true
   ✓ hasExpertQuotes: true
   ✓ Update frequency

5. YMYLDisclaimer:
   ✓ Type: "investment", "tax", etc.
   ✓ Not in compact mode
   ✓ showLegal: true

6. SourceCitations:
   ✓ Government links enabled
   ✓ Industry standards enabled
   ✓ Custom references added

7. Content Quality:
   ✓ 1500+ words
   ✓ 5+ sections
   ✓ Real examples
   ✓ Case studies
   ✓ Expert quotes
   ✓ Last updated date
```

---

## 🏦 PHASE 3: FINANCIAL TOOLS (Week 3)

### Investment Tools
- [ ] Stock Screener
- [ ] Portfolio Tracker
- [ ] Mutual Fund Analyzer
- [ ] ETF Comparison
- [ ] Options Calculator

### Tax Tools
- [ ] IT Filing Guide
- [ ] Tax Estimation Tool
- [ ] HRA Calculator
- [ ] Medical Expense Tracker
- [ ] NPS Calculator

### Loan & Banking Tools
- [ ] Home Loan Calculator
- [ ] Personal Loan Calculator
- [ ] Auto Loan Calculator
- [ ] Bank Account Tracker
- [ ] Cheque Bounce Penalty Calculator

### Insurance Tools
- [ ] Term Insurance Calculator
- [ ] Health Insurance Premium Calculator
- [ ] Life Insurance Planner
- [ ] Medical Emergency Fund Calculator
- [ ] Disability Insurance Calculator

**For Each Tool:**
- [ ] Add E-E-A-T signals
- [ ] Update ratings and reviews
- [ ] Add type-specific disclaimer
- [ ] Include government source links
- [ ] Document methodology (1000+ words)
- [ ] Last updated date visible

---

## 📚 PHASE 4: LEARN PLATFORM (Week 4)

### Lesson Content Enhancement

**Banking & Savings (10 lessons)**
- [ ] High-Interest Savings Accounts
- [ ] Fixed Deposits (FD) Guide
- [ ] Savings Account Features
- [ ] Sweep-in Accounts
- [ ] Senior Citizen Schemes
- [ ] Recurring Deposits
- [ ] Emergency Fund Planning
- [ ] Savings Goals Setting
- [ ] Money Market Funds
- [ ] Liquidity Management

**Insurance (10 lessons)**
- [ ] Term Insurance Fundamentals
- [ ] Health Insurance Explained
- [ ] Life Insurance Planning
- [ ] Critical Illness Coverage
- [ ] Disability Insurance
- [ ] Travel Insurance
- [ ] Car Insurance
- [ ] Home Insurance
- [ ] Claims Process Guide
- [ ] Insurance Myths Debunked

**Investing (10 lessons)**
- [ ] Stock Market Basics
- [ ] Mutual Fund Guide
- [ ] Index Funds & ETFs
- [ ] Bonds & Fixed Income
- [ ] Portfolio Diversification
- [ ] Risk Assessment
- [ ] Investment Strategy
- [ ] Technical Analysis
- [ ] Fundamental Analysis
- [ ] Market Psychology

**Taxes (10 lessons)**
- [ ] Income Tax Basics
- [ ] Tax Deductions Guide
- [ ] Capital Gains Tax
- [ ] Tax Planning Strategy
- [ ] NRI Tax Guide
- [ ] Business Income Tax
- [ ] Investment Tax Optimization
- [ ] Penalty & Compliance
- [ ] E-filing Guide
- [ ] Recent Tax Changes

**For Each Lesson:**
- [ ] Minimum 1500 words
- [ ] ExpertAuthor component
- [ ] ContentDepthGuide with metrics
- [ ] YMYLDisclaimer (type-appropriate)
- [ ] SourceCitations with govt links
- [ ] Real-world Indian examples
- [ ] Case study included
- [ ] Expert quote included
- [ ] Last updated timestamp
- [ ] Content quality score ≥80%

---

## 🔍 PHASE 5: CONTENT QUALITY AUDIT (Week 4-5)

### Depth Verification
- [ ] Count words in each article
- [ ] Check section organization (min 5)
- [ ] Verify Indian context examples
- [ ] Validate case studies
- [ ] Check expert quotes
- [ ] Verify source citations
- [ ] Check update dates

### Schema Validation
- [ ] Use schema.org validator
- [ ] Check Google Rich Results Test
- [ ] Validate all JSON-LD
- [ ] Test in Search Console
- [ ] Check mobile rendering

### E-E-A-T Verification
- [ ] All authors listed
- [ ] Credentials displayed
- [ ] Expertise highlighted
- [ ] Trust badges present
- [ ] Rating/review info complete
- [ ] Disclaimer visible
- [ ] Sources linked

---

## 🎯 TARGETED IMPLEMENTATION ORDER

### Week 1 - Top 10 High-Traffic Pages
```
Priority 1 (Do First):
1. Home Page - Add site-wide schema
2. EMI Calculator - Complete example
3. SIP Calculator
4. Popular Blog Article

Priority 2 (Follow):
5. CAGR Calculator
6. Mutual Fund Calculator
7. Stock Calculator
8. Tax-related Article
```

### Week 2 - Investment Content
- All investment lesson pages
- Portfolio tracking pages
- Market analysis articles

### Week 3 - Tax & Banking Content
- Tax planning articles
- Banking guide content
- Insurance pages

### Week 4 - Polish & Optimization
- Content depth audit
- Schema validation
- E-E-A-T signal verification
- Performance optimization

---

## 📋 IMPLEMENTATION TEMPLATE

For each page, copy-paste this template:

```tsx
import React from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import {
  YMYLDisclaimer,
  SourceCitations,
  ContentDepthGuide,
  EEATSignals,
} from '@/components/YMYLCompliance';
import YMYLSchemaGenerator from '@/components/YMYLCompliance/YMYLSchemaGenerator';

const YourPage = () => {
  return (
    <>
      {/* SEO & Schema */}
      <SEOHelmet
        title="Your Title | MoneyCal India"
        description="200 character description"
        keywords="key1, key2, key3"
        author="Author Name"
        authorExpertise={['Area 1', 'Area 2', 'Area 3']}
        authorCredentials={['CFA', 'MBA', 'Experience']}
        articlePublishedTime="2026-02-17"
        articleModifiedTime="2026-02-17"
        isFinanceContent={true}
        wordCount={YOUR_WORD_COUNT}
        contentQualityScore={YOUR_SCORE}
      />

      <YMYLSchemaGenerator
        contentType="article|calculator|guide"
        title="Your Title"
        description="Your description"
        authorName="Author Name"
        authorTitle="Title"
        publishedDate="2026-02-17"
        modifiedDate="2026-02-17"
        wordCount={YOUR_WORD_COUNT}
      />

      <div className="container">
        {/* Author Info */}
        <EEATSignals
          authorName="Name"
          authorCredentials={['List', 'Credentials']}
          expertiseAreas={['Area 1', 'Area 2']}
          ratingValue={4.8}
          reviewCount={1000}
        />

        {/* Main Content */}
        <div className="content">
          {/* Your content here - 1500+ words */}
        </div>

        {/* Content Quality */}
        <ContentDepthGuide
          wordCount={YOUR_WORD_COUNT}
          readingTime={MINUTES}
          contentSections={NUM_SECTIONS}
          hasExamples={true}
          hasCaseStudies={true}
          hasExpertQuotes={true}
          lastUpdated="February 17, 2026"
        />

        {/* Disclaimers */}
        <YMYLDisclaimer type="investment|tax|loan|insurance|general" />

        {/* Sources */}
        <SourceCitations
          showGovernmentLinks={true}
          showIndustryStandards={true}
        />
      </div>
    </>
  );
};

export default YourPage;
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before Going Live:
- [ ] All components properly imported
- [ ] No TypeScript errors
- [ ] SEO props correctly populated
- [ ] Schema validates at schema.org
- [ ] Mobile responsive
- [ ] Links all working
- [ ] Images optimized
- [ ] Performance tested (Lighthouse)
- [ ] Manual review of content
- [ ] Final QA pass

---

## 📊 MONITORING POST-IMPLEMENTATION

### Weekly Tasks
- [ ] Check Google Search Console
- [ ] Monitor impressions and CTR
- [ ] Check for new crawl issues
- [ ] Review manual actions

### Monthly Tasks
- [ ] Update article dates
- [ ] Audit E-E-A-T signals
- [ ] Check ranking improvements
- [ ] Content quality audit

### Quarterly Tasks
- [ ] Full site audit
- [ ] Schema validation check
- [ ] E-E-A-T assessment
- [ ] AdSense performance review

---

## 🎯 SUCCESS METRICS

### Target Achievements (in 3 months)
- [ ] 50% increase in CTR
- [ ] 30% increase in impressions
- [ ] All pages with E-E-A-T signals
- [ ] 100% of calculators with disclaimer
- [ ] AdSense approval (if pending)
- [ ] No manual actions in GSC
- [ ] Average position improvement

---

## 📞 SUPPORT REFERENCES

- Schema.org: https://schema.org/
- Google E-E-A-T: https://developers.google.com/search/docs/beginner/
- SEBI: https://www.sebi.gov.in
- RBI: https://www.rbi.org.in
- Income Tax: https://www.incometax.gov.in

---

## 🎬 GETTING STARTED

1. **Start with Week 1 Phase 1**
   - Use EMI Calculator as template
   - Apply to next 4 top pages
   - Test thoroughly

2. **Review Components**
   - Open each component file
   - Read inline documentation
   - Check INTEGRATION_EXAMPLES.tsx

3. **Create First Page**
   - Copy template
   - Fill in your details
   - Add content
   - Validate schema
   - Deploy

4. **Repeat & Scale**
   - 2-3 pages per day
   - Weekly validation
   - Monthly audit

---

**Status**: Ready to implement  
**Estimated Duration**: 4-5 weeks (full site)  
**Team Resources Needed**: 1-2 developers  
**Priority**: HIGH - Critical for AdSense approval  

Last Updated: February 17, 2026
