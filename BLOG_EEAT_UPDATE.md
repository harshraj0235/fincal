# Blog EEAT & structure update

## What was done

### 1. **Authors (EEAT)**
- **blogAuthors.ts**: Four authors only – **Harsh Raj**, **Saurabh Kumar**, **Vikram**, **Raushan** (name, slug, role, bio, image, sameAs).
- Every blog post is assigned one of these authors (round-robin) via `authorSlug` in **allBlogData**.
- **BlogPost.tsx**: Shows author byline, author box with image/role/bio, link to `/author/{slug}`, and schema `author` (Person with name, url, image, sameAs).

### 2. **Fresh content & dates**
- Each post has **lastUpdated** (defaults to `post.date`). Use this for “Last updated” in UI and for `dateModified` in schema.
- To **auto-update every 24 hours**: run a daily job that sets `lastUpdated` to today for posts you want to mark fresh (e.g. update a JSON or a few key posts in source).

### 3. **Searchable keywords**
- **allBlogData** enriches each post with **searchableKeywords** (categories + title words + “personal finance India”, “investment tips”, “money management”).
- **BlogPost** passes these to SEOHelmet `keywords` and to schema `keywords` for better discoverability.
- For **Hindi search terms**: add Hindi phrases to `searchableKeywords` in the enrichment (e.g. “निवेश टिप्स”, “पर्सनल फाइनेंस”) or per-post in source data.

### 4. **Blog index (/blog)**
- **Recent posts**: Latest 5 articles (when “All” and no search).
- **New this week**: Posts with `date` in the last 7 days.
- **Suggested by category**: When a category is selected, first 4 posts in that category.
- **Featured**: Top 3 posts (unchanged).
- Category-wise navigation: existing category pills with counts; filter and URL `?category=X`.

### 5. **Blog post page**
- **Author**: From registry (Harsh Raj, Saurabh Kumar, Vikram, Raushan); byline + author box + schema.
- **Last updated**: Uses `lastUpdated` (or `post.date`); shown in byline and in schema `dateModified`.
- **Suggested for you**: Related posts (same category, then by date); 4 posts in sidebar.
- **Internal links**: “More in this topic” – links to `/blog?category=X` for the post’s categories.
- **Keywords**: From `searchableKeywords` into meta and schema.

### 6. **Related posts logic**
- **getRelatedPosts** in allBlogData: same category first, then by date; returns up to 4 posts.

## What you can do next

1. **Hindi keywords**: In **allBlogData** enrichment, extend `searchableKeywords` with Hindi terms (e.g. by category or a small Hindi keyword list) so Hindi queries can match.
2. **Daily “fresh” date**: Add a script (e.g. Node or GitHub Action) that runs daily and updates `lastUpdated` for selected posts (e.g. in a small JSON file that the app reads, or by editing source files).
3. **Charts/images**: Add more `type: 'image'` (and optional chart images) in post `content` arrays in blogData / blogData1 / blogs for key posts; or use a shared “market snapshot” image URL that you replace periodically.
4. **Author pages**: Ensure routes like `/author/harsh-raj` exist and show author bio + list of posts (using `authorSlug` from posts).

## Files changed

- **src/data/blogAuthors.ts** (new)
- **src/data/allBlogData.ts** (enrichment: authorSlug, lastUpdated, searchableKeywords; getRelatedPosts improved)
- **src/pages/BlogPost.tsx** (author from registry, lastUpdated, keywords, “More in this topic”, schema)
- **src/pages/Blog.tsx** (Recent posts, New this week, Suggested by category)
