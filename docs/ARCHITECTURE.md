# Moneycal – Architecture (2026-Ready)

Content-first, server-rendered financial platform running at the edge.

## Rendering Strategy

| Content Type    | Rendering       | Revalidate |
|-----------------|-----------------|------------|
| News            | ISR             | 30 min     |
| Learn           | ISR             | 7 days     |
| Blog            | ISR             | 1 hour     |
| Calculators     | force-dynamic   | -          |
| Tax / GST Tools | ISR             | 24h        |
| Government      | ISR             | 7 days     |
| Crypto          | ISR             | 24h        |

## Folder Structure

```
app/(main)/
├── news/[[...segments]]/     # ISR 30 min
├── learn/[[...segments]]/    # ISR 7 days
├── blog/[slug]/              # ISR 1 hour
├── calculators/              # force-dynamic
│   ├── page.tsx
│   └── [id]/
├── finance-tools/[[...segments]]/
├── tax-tools/[[...segments]]/
├── gst-tools/[[...segments]]/
├── insurance-tools/[[...segments]]/
├── government-schemes/[[...segments]]/
├── crypto/[[...segments]]/
└── tools/[[...segments]]/
```

## Internal Linking (Hub → Cluster → Leaf)

- Footer: hub-only links (Calculators | Tools | Learn | Blog | News | Government)
- `getRelatedContent()`: auto-related links per page type
- `LINK_RULES`: golden linking matrix (news→blog+tool, blog→calculator+learn, etc.)

## lib/seo

- `contentMeta.ts`: ContentMeta type, LINK_RULES
- `getRelatedContent.ts`: scoring algorithm
- `revalidateConfig.ts`: category → revalidate map
