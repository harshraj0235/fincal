# Blog Auto-Import System

This folder contains individual blog post files that are automatically imported into the blog system.

## How to Add New Blog Posts

### 1. Create a New Blog File
- Copy `template.ts` and rename it to your desired blog ID (e.g., `653.ts`, `654.ts`, etc.)
- The file will be automatically imported - no need to update any index files!

### 2. Update the Blog Content
Edit the copied file and update all the fields marked with `// CHANGE THIS`:

#### Required Fields:
- `id`: Unique blog ID (must be unique across all blogs)
- `slug`: URL-friendly slug (e.g., 'my-blog-post-title')
- `title`: Blog post title
- `author`: Author name
- `date`: Publication date in YYYY-MM-DD format
- `coverImage`: Main image URL
- `excerpt`: Short description
- `categories`: Array of categories
- `content`: Array of content sections

#### Content Types Available:
```typescript
{ type: 'heading', content: 'Your Heading' }
{ type: 'paragraph', content: 'Your paragraph text' }
{ type: 'list', items: ['Item 1', 'Item 2', 'Item 3'] }
{ type: 'image', url: 'image-url', caption: 'Image caption' }
{ type: 'quote', content: 'Quote text', author: 'Author name' }
```

### 3. SEO Optimization
Update these fields for better SEO:
- `metaDescription`: Meta description for search engines
- `keywords`: Array of relevant keywords
- `schema`: Structured data for rich snippets
- `faqSchema`: FAQ structured data
- `openGraph`: Social media sharing data

### 4. Related Posts
The system automatically finds related posts from `blogData1.ts` based on matching categories.

## File Structure
```
src/data/blogs/
├── index.ts          # Auto-imports all blog files
├── template.ts       # Template for new blogs
├── 651.ts           # Green Hydrogen blog
├── 652.ts           # Digital Rupee blog
├── 653.ts           # Your new blog (copy from template)
└── README.md        # This file
```

## Auto-Import Features
- **Automatic Discovery**: Any `.ts` file in this folder is automatically imported
- **Sorting**: Blogs are automatically sorted by ID (newest first)
- **Type Safety**: Full TypeScript support with proper types
- **Error Handling**: Invalid files are filtered out automatically

## Example Usage
1. Copy `template.ts` to `653.ts`
2. Update all the content in `653.ts`
3. Save the file
4. The blog will automatically appear on your blog page at `/blog`
5. Individual blog post will be available at `/blog/your-slug`

## Notes
- Blog IDs must be unique across all blog sources (blogs folder, blogData.ts, blogData1.ts)
- The system automatically refreshes blog dates if they're older than 2 days
- All blogs are optimized for SEO, Google News, and Google Discover
- Related posts are automatically generated based on category matching

## Troubleshooting
If a blog doesn't appear:
1. Check that the `id` field is unique
2. Ensure all required fields are filled
3. Verify the file is saved with `.ts` extension
4. Check browser console for any import errors 