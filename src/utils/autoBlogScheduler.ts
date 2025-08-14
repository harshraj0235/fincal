import { BlogGenerator } from './blogGenerator';
import { BlogPost } from '../data/blogs/types';
import * as fs from 'fs';
import * as path from 'path';

export class AutoBlogScheduler {
  private generator: BlogGenerator;
  private blogsDir: string;
  private indexFile: string;
  private isRunning: boolean = false;

  constructor() {
    this.generator = new BlogGenerator({
      targetWordCount: 1200,
      includeImages: false,
      seoOptimized: true,
      plagiarismFree: true
    });
    
    this.blogsDir = path.join(process.cwd(), 'src', 'data', 'blogs');
    this.indexFile = path.join(this.blogsDir, 'index.ts');
  }

  async startScheduler(): Promise<void> {
    console.log('🚀 Auto Blog Scheduler started');
    console.log('⏰ Will run daily at 6:00 AM Indian Time');
    
    // Run immediately if it's the first time
    await this.runDailyBlogGeneration();
    
    // Schedule daily runs at 6 AM Indian time
    this.scheduleDailyRuns();
  }

  private scheduleDailyRuns(): void {
    const now = new Date();
    const indianTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // IST is UTC+5:30
    const targetTime = new Date(indianTime);
    targetTime.setHours(6, 0, 0, 0); // 6 AM
    
    // If it's already past 6 AM today, schedule for tomorrow
    if (indianTime.getHours() >= 6) {
      targetTime.setDate(targetTime.getDate() + 1);
    }
    
    const timeUntilNextRun = targetTime.getTime() - indianTime.getTime();
    
    console.log(`📅 Next run scheduled for: ${targetTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
    
    setTimeout(() => {
      this.runDailyBlogGeneration();
      this.scheduleDailyRuns(); // Schedule next run
    }, timeUntilNextRun);
  }

  async runDailyBlogGeneration(): Promise<void> {
    if (this.isRunning) {
      console.log('⚠️ Blog generation already in progress, skipping...');
      return;
    }

    this.isRunning = true;
    console.log('🔄 Starting daily blog generation...');

    try {
      // Generate 20 new blog posts
      const newBlogs = await this.generator.generateDailyBlogs();
      console.log(`✅ Generated ${newBlogs.length} new blog posts`);

      // Save each blog to individual files
      await this.saveBlogFiles(newBlogs);
      console.log('💾 Blog files saved successfully');

      // Update the index.ts file
      await this.updateIndexFile(newBlogs);
      console.log('📝 Index file updated successfully');

      // Commit and push changes
      await this.commitAndPushChanges();
      console.log('🚀 Changes committed and pushed to repository');

      console.log('🎉 Daily blog generation completed successfully!');
    } catch (error) {
      console.error('❌ Error during blog generation:', error);
    } finally {
      this.isRunning = false;
    }
  }

  private async saveBlogFiles(blogs: BlogPost[]): Promise<void> {
    for (const blog of blogs) {
      const filename = `${blog.id}.ts`;
      const filepath = path.join(this.blogsDir, filename);
      
      const fileContent = this.generateBlogFileContent(blog);
      
      fs.writeFileSync(filepath, fileContent, 'utf8');
      console.log(`📄 Created blog file: ${filename}`);
    }
  }

  private generateBlogFileContent(blog: BlogPost): string {
    const contentString = JSON.stringify(blog.content, null, 2)
      .replace(/"/g, "'")
      .replace(/'/g, "\\'");

    return `import { BlogPost } from './types';
import { blogPosts } from '../blogData1';

export const blog${blog.id}: BlogPost = ${JSON.stringify(blog, null, 2)};

// Get related blog posts from blogData1 for internal linking
export const relatedBlogPosts = blogPosts.filter(post => 
  post.categories?.some(cat => 
    blog${blog.id}.categories.includes(cat)
  )
).slice(0, 3);

export default blog${blog.id};`;
  }

  private async updateIndexFile(newBlogs: BlogPost[]): Promise<void> {
    // Read current index file
    const currentContent = fs.readFileSync(this.indexFile, 'utf8');
    
    // Extract existing imports and exports
    const importLines: string[] = [];
    const exportLines: string[] = [];
    const blogArrayItems: string[] = [];
    
    // Add existing blog651
    importLines.push("import { blog651 } from './651';");
    exportLines.push("export { blog651 } from './651';");
    blogArrayItems.push("blog651");
    
    // Add new blogs
    for (const blog of newBlogs) {
      importLines.push(`import { blog${blog.id} } from './${blog.id}';`);
      exportLines.push(`export { blog${blog.id} } from './${blog.id}';`);
      blogArrayItems.push(`blog${blog.id}`);
    }
    
    // Generate new index content
    const newIndexContent = `import { BlogPost } from './types';

// Auto-generated blog imports
${importLines.join('\n')}

// Auto-generated blog array
export const blogs: BlogPost[] = [
  ${blogArrayItems.join(',\n  ')},
];

// Auto-update blog dates
export function autoUpdateBlogDates() {
  const currentDate = new Date().toISOString().split('T')[0];
  blogs.forEach(blog => {
    if (blog.lastModified !== currentDate) {
      blog.lastModified = currentDate;
    }
  });
}

// Export individual blogs
${exportLines.join('\n')}
`;
    
    fs.writeFileSync(this.indexFile, newIndexContent, 'utf8');
  }

  private async commitAndPushChanges(): Promise<void> {
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);

    try {
      // Add all changes
      await execAsync('git add .');
      console.log('✅ Git add completed');

      // Commit changes
      const commitMessage = `Auto-generated ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })} - ${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
      await execAsync(`git commit -m "${commitMessage}"`);
      console.log('✅ Git commit completed');

      // Push changes
      await execAsync('git push origin main');
      console.log('✅ Git push completed');
    } catch (error) {
      console.error('❌ Git operations failed:', error);
      throw error;
    }
  }

  // Method to manually trigger blog generation (for testing)
  async triggerManualGeneration(): Promise<void> {
    console.log('🔧 Manual blog generation triggered');
    await this.runDailyBlogGeneration();
  }

  // Method to check scheduler status
  getStatus(): { isRunning: boolean; nextRunTime?: string } {
    const now = new Date();
    const indianTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const targetTime = new Date(indianTime);
    targetTime.setHours(6, 0, 0, 0);
    
    if (indianTime.getHours() >= 6) {
      targetTime.setDate(targetTime.getDate() + 1);
    }
    
    return {
      isRunning: this.isRunning,
      nextRunTime: targetTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
  }
}

// Export singleton instance
export const autoBlogScheduler = new AutoBlogScheduler();
