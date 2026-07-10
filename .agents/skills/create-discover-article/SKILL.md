---
name: create-discover-article
description: Create a new Google Discover article for MoneyCal.in. Triggered when the user asks to write, create, or add a discover article, blog post for discover, or any content for the /discover/ section.
---

# Create Discover Article Skill

When triggered, you MUST:

1. **Read the guidelines file FIRST**: Read `discover-guidelines.md` in the workspace root before doing anything else.
2. **Follow every step** in the guidelines — no shortcuts, no skipping.
3. **Research the topic** on Google before writing (use search_web tool).
4. **Generate an image** using the primary keyword (use generate_image tool).
5. **Write 1500+ words** in simple Hindi-English (Hinglish) with real facts.
6. **Use only HTML** for formatting — no markdown syntax in content.
7. **Add 3-5 internal links** to MoneyCal tools inside the article text.
8. **Use fixed date** — never `new Date().toISOString()`.
9. **Author is always** `MoneyCal Team`.
10. **Register** the article in `src/data/discover/index.ts`.
11. **Build and deploy** after creating the article.

The full detailed instructions are in `discover-guidelines.md` — always read that file first.
