# 🎯 YMYL QUICK REFERENCE CARD

**Print this out for quick access during implementation!**

---

## 📦 COMPONENTS AT A GLANCE

### 1️⃣ **EEATSignals** - Author Credentials Display
```tsx
<EEATSignals
  authorName="Expert Name"
  authorCredentials={['CFA', 'MBA']}
  ratingValue={4.8}
  reviewCount={1000}
  trustBadges={['verified', 'certified']}
/>
```
**Use on**: Every calculator and article  
**Purpose**: Display E-E-A-T signals (Expertise, Authoritativeness, Trustworthiness)

---

### 2️⃣ **YMYLDisclaimer** - Legal Notices
```tsx
<YMYLDisclaimer type="investment|tax|loan|insurance|general" />
```
**Use on**: All finance pages  
**Purpose**: Required legal disclaimers  
**Types**: Pick type matching your content

---

### 3️⃣ **SourceCitations** - Government Links
```tsx
<SourceCitations
  showGovernmentLinks={true}
  showIndustryStandards={true}
/>
```
**Use on**: Articles and guides  
**Purpose**: Link to RBI, SEBI, Income Tax  
**Result**: Boosts authoritativeness

---

### 4️⃣ **ExpertAuthor** - Full Author Bio
```tsx
<ExpertAuthor
  name="Dr. Name"
  certifications={['CFA', 'MBA']}
  experience={{ years: 15, description: "..." }}
/>
```
**Use on**: Main blog articles  
**Purpose**: Comprehensive author credibility  
**Impact**: High E-E-A-T signal boost

---

### 5️⃣ **ContentDepthGuide** - Quality Metrics
```tsx
<ContentDepthGuide
  wordCount={2500}
  contentSections={8}
  hasExamples={true}
/>
```
**Use on**: Articles and guides  
**Purpose**: Show content quality score  
**Target**: 80%+ quality score

---

### 6️⃣ **YMYLSchemaGenerator** - Schema Markup
```tsx
<YMYLSchemaGenerator
  contentType="article|calculator|guide"
  authorName="Name"
  wordCount={2500}
/>
```
**Use on**: Every page (in head)  
**Purpose**: Google structured data  
**Validate**: schema.org/validator

---

## 📋 IMPLEMENTATION QUICK GUIDE

### For CALCULATOR PAGES:
```tsx
<SEOHelmet
  title="..." 
  author="Real Name"
  authorCredentials={['Cert']}
/>
<YMYLSchemaGenerator contentType="calculator" />
<EEATSignals {...props} />
{/* Calculator Component */}
<YMYLDisclaimer type="loan|investment|etc" />
<SourceCitations />
```
**Time**: 15-20 minutes  
**Difficulty**: Easy  
**Impact**: High

---

### For BLOG ARTICLES:
```tsx
<SEOHelmet
  author="Real Name"
  authorExpertise={['Area1', 'Area2']}
  authorCredentials={['Cert1', 'Cert2']}
  wordCount={2500}
/>
<YMYLSchemaGenerator contentType="article" />
<ExpertAuthor {...fullBioProps} />
{/* Article Content - 1500+ words */}
<ContentDepthGuide {...metricsProps} />
<YMYLDisclaimer type="specific" />
<SourceCitations />
```
**Time**: 30-45 minutes  
**Difficulty**: Medium  
**Impact**: Very High

---

## ⚡ CRITICAL REQUIREMENTS

### ✅ MUST HAVE:
- [ ] Real author name (NOT "MoneyCal Team")
- [ ] At least 1 certification
- [ ] 1,500+ words for articles
- [ ] Disclaimer on every finance page
- [ ] Last updated date visible
- [ ] Link to official source (RBI/SEBI/IT Dept)

### ✅ SHOULD HAVE:
- [ ] Real author photo
- [ ] Professional background (5+ years)
- [ ] Real examples (Indian context)
- [ ] Case study or scenario
- [ ] Expert quote or review
- [ ] Multiple sections (5+)

### ✅ NICE TO HAVE:
- [ ] Video content
- [ ] Interactive tools
- [ ] Downloadable resources
- [ ] Expert interview
- [ ] Rating/review summary

---

## 🎯 IMPORT PATHS

```tsx
// All YMYL components
import {
  EEATSignals,
  YMYLDisclaimer,
  SourceCitations,
  ExpertAuthor,
  ContentDepthGuide,
} from '@/components/YMYLCompliance';

// Schema generator
import YMYLSchemaGenerator from '@/components/YMYLCompliance/YMYLSchemaGenerator';

// Styling utilities
import ymylStyles, { ymylTheme, presetClasses } 
  from '@/components/YMYLCompliance/styles';
```

---

## 🎨 STYLING QUICK REFERENCE

```tsx
// Use Tailwind classes directly
<div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-600">

// Or use preset classes
<div className={presetClasses.card}>

// Or use style objects
<div className={ymylStyles.disclaimerContainer}>
```

---

## 🔍 VALIDATION TOOLS

| Tool | URL | Purpose |
|------|-----|---------|
| Schema Validator | https://schema.org/validator | Validate JSON-LD |
| Rich Results Test | https://search.google.com/test/rich-results | Test rich snippets |
| Mobile-Friendly | https://search.google.com/test/mobile-friendly | Mobile check |
| Lighthouse | Built into Chrome DevTools | Performance |
| GSC | https://search.google.com/search-console | Indexing issues |

---

## 📊 CONTENT REQUIREMENTS CHECKLIST

| Item | Minimum | Target | Notes |
|------|---------|--------|-------|
| Word Count | 1,200 | 2,000+ | Articles only |
| Reading Time | 5 min | 10-15 min | Articles |
| Sections | 3 | 5-8 | Organized content |
| Examples | 1 | 3+ | Real-world scenarios |
| Sources | 2 | 5+ | Official references |
| Certifications | 1 | 2-3 | Real credentials |
| Experience (years) | 5 | 15+ | Professional background |

---

## 🚀 FASTEST PATH TO IMPLEMENTATION

### Day 1 (2 hours):
1. [ ] Read YMYL_COMPLETE_SUMMARY.md
2. [ ] Review INTEGRATION_EXAMPLES.tsx
3. [ ] Test one component locally

### Day 2-3 (4-6 hours):
1. [ ] Apply to top 3-5 calculators
2. [ ] Validate schema
3. [ ] Deploy & test

### Day 4-7 (6-8 hours):
1. [ ] Apply to main blog articles
2. [ ] Enhance with ExpertAuthor component
3. [ ] Monitor Google Search Console

### Result:
✅ 40-60% better AdSense approval chances  
✅ Improved YMYL compliance  
✅ Better search rankings for finance keywords  

---

## 🎓 QUICK LEARNING

### What is YMYL?
"Your Money or Your Life" - Content affecting finances/health

### What is E-E-A-T?
- **E**xperience: Personal experience
- **E**xpertise: Professional knowledge
- **A**uthoritativeness: Recognized authority
- **T**rustworthiness: Honest, accurate info

### Why Does Google Care?
Because wrong financial advice can cost people money!

### How Do You Signal E-E-A-T?
1. Real author with real credentials
2. Official government sources
3. Expert reviews
4. Real experiences/examples
5. Disclaimers
6. Recent updates

---

## 🔧 TROUBLESHOOTING

### Issue: Component not importing
**Solution**: Check index.ts exists and exports it

### Issue: Schema not validating
**Solution**: Use schema.org/validator, check JSON syntax

### Issue: Looks broken on mobile
**Solution**: Add responsive classes, test on actual device

### Issue: TypeScript errors
**Solution**: Check prop types match interface, run `npm run lint`

---

## 📱 MOBILE CHECKLIST

- [ ] Text is readable (font size ≥ 14px)
- [ ] Buttons are clickable (≥ 44px height)
- [ ] No horizontal scroll
- [ ] Touch-friendly spacing
- [ ] Images are responsive
- [ ] Load time < 3 seconds

---

## 💡 PRO TIPS

1. **Use Real Names**: "Raj Kumar Sharma, CFA" beats "MoneyCal Team"
2. **Show Credentials**: Display certifications prominently
3. **Link Official**: RBI, SEBI, Income Tax links boost trust
4. **Update Old Content**: Monthly updates signal active maintenance
5. **Disclaimers Matter**: They're not optional for finance content
6. **Deep Content Wins**: 2,000+ word articles rank better
7. **Examples Help**: Real Indian scenarios = better engagement
8. **Trust Signals**: Author photo, ratings, expert review, all help

---

## ✨ THE SECRET SAUCE

What makes YMYL pages rank:
1. ✅ **Real expertise** (not AI-generated)
2. ✅ **Real author** (with verified credentials)
3. ✅ **Real sources** (linking official bodies)
4. ✅ **Real examples** (from actual scenarios)
5. ✅ **Real updates** (recent modification dates)
6. ✅ **Real disclaimers** (comprehensive legal notices)

**Golden Rule**: If you wouldn't stake your money on it, don't publish it!

---

## 🎯 SUCCESS METRICS (3 Months)

| Metric | Current | Target | Notes |
|--------|---------|--------|-------|
| CTR | ? | +30% | Click-through rate |
| Impressions | ? | +50% | Search impressions |
| Rankings | ? | +3 pos | Average position |
| Bounce Rate | ? | -15% | Time on page |
| AdSense Status | ? | Approved | Main goal |

---

## 📞 QUICK REFERENCE LINKS

**Documentation:**
- Main Guide: `YMYL_COMPLIANCE_GUIDE.md`
- Checklist: `YMYL_IMPLEMENTATION_CHECKLIST.md`
- Examples: `INTEGRATION_EXAMPLES.tsx`
- Summary: `YMYL_COMPLETE_SUMMARY.md`

**Official Resources:**
- RBI: https://www.rbi.org.in
- SEBI: https://www.sebi.gov.in
- Income Tax: https://www.incometax.gov.in
- Schema.org: https://schema.org/

---

## 🎬 START NOW!

1. Open INTEGRATION_EXAMPLES.tsx
2. Copy "Calculator Page Example"
3. Paste into your first page
4. Replace placeholders
5. Test & deploy
6. Repeat

**You've got everything you need. Let's do this! 🚀**

---

**Quick Reference Card v1.0**  
**February 17, 2026**  
**Keep handy during implementation!**
