/**
 * prerender-blog-pages.cjs
 * 
 * Pre-renders all blog posts from blogData.ts and blogData1.ts into static HTML files.
 * This is CRITICAL for SEO — React SPA content is invisible to Google crawlers.
 * Static HTML pages get indexed immediately and rank in Google Search.
 * 
 * Usage: node scripts/prerender-blog-pages.cjs
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SRC_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const AD_CLIENT = 'ca-pub-6815277662449747';

// Blog data source files
const BLOG_DATA_FILES = [
    path.join(SRC_DIR, 'data/blogData.ts'),
    path.join(SRC_DIR, 'data/blogData1.ts'),
];

let allBlogPosts = [];

function loadBlogData() {
    BLOG_DATA_FILES.forEach(file => {
        if (!fs.existsSync(file)) {
            console.log(`⚠️ Blog data file not found: ${file}`);
            return;
        }
        try {
            const result = esbuild.buildSync({
                entryPoints: [file],
                bundle: true,
                write: false,
                format: 'cjs',
                platform: 'node',
                charset: 'utf8'
            });
            const code = result.outputFiles[0].text;
            const module = { exports: {} };
            eval(code);
            
            // Try different export names
            const posts = module.exports.blogPosts || module.exports.blogPosts1 || module.exports.default || [];
            if (Array.isArray(posts)) {
                allBlogPosts = allBlogPosts.concat(posts);
                console.log(`📚 Loaded ${posts.length} posts from ${path.basename(file)}`);
            }
        } catch (err) {
            console.log(`⚠️ Error loading ${path.basename(file)}: ${err.message}`);
        }
    });
    console.log(`📊 Total blog posts loaded: ${allBlogPosts.length}`);
}

function renderSection(section) {
    switch (section.type) {
        case 'heading':
            return `<h2>${section.content}</h2>`;
        case 'subheading':
            return `<h3>${section.content}</h3>`;
        case 'subsubheading':
            return `<h4>${section.content}</h4>`;
        case 'minorheading':
            return `<h5>${section.content}</h5>`;
        case 'paragraph':
            return `<p>${section.content}</p>`;
        case 'list':
            if (section.items && section.items.length > 0) {
                return `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
            }
            return '';
        case 'image':
            return `<figure><img src="${section.url || ''}" alt="${section.caption || ''}" loading="lazy" width="800" height="450"><figcaption>${section.caption || ''}</figcaption></figure>`;
        case 'quote':
            return `<blockquote><p>${section.content}</p>${section.author ? `<cite>— ${section.author}</cite>` : ''}</blockquote>`;
        case 'table':
            if (section.headers && section.rows) {
                let tableHtml = '<div class="table-wrapper"><table>';
                tableHtml += '<thead><tr>' + section.headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead>';
                tableHtml += '<tbody>';
                section.rows.forEach(row => {
                    tableHtml += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
                });
                tableHtml += '</tbody></table></div>';
                return tableHtml;
            }
            return '';
        case 'conclusion':
            return `<div class="conclusion"><h2>निष्कर्ष</h2><p>${section.content}</p></div>`;
        default:
            return section.content ? `<p>${section.content}</p>` : '';
    }
}

function renderSectionsWithAds(sections) {
    let html = '';
    let sectionCount = 0;
    const adPositions = [3, 7, 12]; // Insert ads after these section indices
    
    sections.forEach((section, index) => {
        html += renderSection(section);
        sectionCount++;
        
        if (adPositions.includes(sectionCount)) {
            html += `
            <div class="ad-unit in-article-ad">
                <span class="ad-label">विज्ञापन</span>
                <ins class="adsbygoogle"
                     style="display:block; text-align:center;"
                     data-ad-layout="in-article"
                     data-ad-format="fluid"
                     data-ad-client="${AD_CLIENT}"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>`;
        }
    });
    
    return html;
}

function getRecommendations(currentPost) {
    const others = allBlogPosts.filter(p => p.slug !== currentPost.slug).slice(0, 4);
    if (others.length === 0) return '';
    
    let html = '<section class="recommendations"><h3>📖 और पढ़ें (Related Articles)</h3><div class="grid-reco">';
    others.forEach(post => {
        html += `
        <a href="/blog/${post.slug}" class="reco-card">
            ${post.coverImage ? `<img src="${post.coverImage}" alt="${post.title}" loading="lazy" width="400" height="225">` : ''}
            <h4>${post.title}</h4>
        </a>`;
    });
    html += '</div></section>';
    return html;
}

function buildBlogHTML(post) {
    const canonicalUrl = `https://moneycal.in/blog/${post.slug}`;
    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt;
    const coverImage = post.coverImage || '';
    const recommendations = getRecommendations(post);
    const keywords = (post.keywords || post.categories || []).join(', ');
    const fullCoverImage = coverImage.startsWith('http') ? coverImage : (coverImage ? `https://moneycal.in${coverImage}` : 'https://moneycal.in/android-chrome-512x512.jpg');
    
    let dateISO;
    try {
        dateISO = new Date(post.date).toISOString();
    } catch(e) {
        dateISO = new Date().toISOString();
    }
    
    // Breadcrumb Schema
    const breadcrumbSchema = `
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moneycal.in" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://moneycal.in/blog/" },
            { "@type": "ListItem", "position": 3, "name": "${post.title.replace(/"/g, '\\"').slice(0, 60)}", "item": "${canonicalUrl}" }
        ]
    }
    </script>`;
    
    // FAQ Schema - extract Q&A pairs from content
    let faqSchema = '';
    const faqPairs = [];
    for (let i = 0; i < post.content.length - 1; i++) {
        const section = post.content[i];
        const nextSection = post.content[i + 1];
        if (section.content && section.content.startsWith('<strong>Q') && nextSection.content) {
            faqPairs.push({
                question: section.content.replace(/<[^>]+>/g, ''),
                answer: nextSection.content.replace(/<[^>]+>/g, '')
            });
        }
    }
    
    if (faqPairs.length > 0) {
        faqSchema = `
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [${faqPairs.map(faq => `
            {
                "@type": "Question",
                "name": "${faq.question.replace(/"/g, '\\"')}",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${faq.answer.replace(/"/g, '\\"')}"
                }
            }`).join(',')}
        ]
    }
    </script>`;
    }

    return `<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | MoneyCal.in</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="${post.author || 'MoneyCal Team'}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${canonicalUrl}">
    
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en-IN" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="hi-IN" href="${canonicalUrl}" />
    
    <!-- Open Graph / Social -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:site_name" content="MoneyCal.in">
    <meta property="og:image" content="${fullCoverImage}">
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="article:published_time" content="${dateISO}">
    <meta property="article:modified_time" content="${new Date().toISOString()}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${fullCoverImage}">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${post.title.replace(/"/g, '\\"')}",
        "description": "${description.replace(/"/g, '\\"')}",
        "image": "${fullCoverImage}",
        "author": {
            "@type": "Organization",
            "name": "${post.author || 'MoneyCal Team'}",
            "url": "https://moneycal.in/about-us"
        },
        "publisher": {
            "@type": "Organization",
            "name": "MoneyCal",
            "logo": {
                "@type": "ImageObject",
                "url": "https://moneycal.in/android-chrome-512x512.jpg"
            }
        },
        "datePublished": "${dateISO}",
        "dateModified": "${new Date().toISOString()}",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${canonicalUrl}"
        }
    }
    </script>
    ${breadcrumbSchema}
    ${faqSchema}
    
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: #1a1a2e;
            --blue: #2563eb;
            --blue-light: #3b82f6;
            --green: #059669;
            --text: #1e293b;
            --text-light: #64748b;
            --bg: #f8fafc;
            --white: #ffffff;
            --border: #e2e8f0;
            --shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Noto Sans Devanagari', sans-serif; background: var(--bg); color: var(--text); line-height: 1.8; }
        
        /* Navbar */
        .navbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; background: var(--white); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow); }
        .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--primary); font-weight: 800; font-size: 1.3rem; }
        .logo-icon { width: 32px; height: 32px; background: linear-gradient(135deg, var(--blue), var(--green)); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1rem; }
        .nav-links { display: flex; gap: 20px; }
        .nav-links a { color: var(--text-light); text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: color 0.2s; }
        .nav-links a:hover { color: var(--blue); }
        
        /* Breadcrumb */
        .breadcrumb { padding: 12px 24px; font-size: 0.85rem; color: var(--text-light); background: var(--white); border-bottom: 1px solid var(--border); }
        .breadcrumb a { color: var(--blue); text-decoration: none; }
        .breadcrumb span { margin: 0 6px; }
        
        /* Layout */
        .layout { display: grid; grid-template-columns: 1fr minmax(0, 780px) 1fr; gap: 24px; max-width: 1400px; margin: 0 auto; padding: 24px; }
        @media (max-width: 1024px) { .layout { grid-template-columns: 1fr; padding: 16px; } }
        .ad-sidebar { position: sticky; top: 80px; align-self: start; }
        @media (max-width: 1024px) { .ad-sidebar { display: none; } }
        
        /* Article */
        article { background: var(--white); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow); }
        .hero-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
        .article-content { padding: 32px; }
        @media (max-width: 768px) { .article-content { padding: 20px; } }
        
        .article-content h1 { font-size: 1.8rem; font-weight: 800; line-height: 1.3; margin-bottom: 16px; color: var(--primary); }
        .article-content h2 { font-size: 1.4rem; font-weight: 700; margin: 28px 0 14px; color: var(--primary); border-left: 4px solid var(--blue); padding-left: 12px; }
        .article-content h3 { font-size: 1.2rem; font-weight: 600; margin: 22px 0 10px; color: var(--primary); }
        .article-content h4 { font-size: 1.1rem; font-weight: 600; margin: 18px 0 8px; }
        .article-content p { margin-bottom: 16px; font-size: 1.05rem; }
        .article-content a { color: var(--blue); text-decoration: underline; }
        .article-content a:hover { color: var(--blue-light); }
        .article-content ul, .article-content ol { margin: 14px 0 18px 24px; }
        .article-content li { margin-bottom: 8px; font-size: 1.02rem; }
        .article-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; }
        
        /* Table */
        .table-wrapper { overflow-x: auto; margin: 16px 0; }
        table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
        th { background: var(--primary); color: white; padding: 12px; text-align: left; font-weight: 600; }
        td { padding: 10px 12px; border-bottom: 1px solid var(--border); }
        tr:nth-child(even) { background: #f1f5f9; }
        
        /* Blockquote */
        blockquote { border-left: 4px solid var(--blue); background: #eff6ff; padding: 16px 20px; margin: 18px 0; border-radius: 0 8px 8px 0; }
        blockquote p { margin: 0; font-style: italic; }
        blockquote cite { display: block; margin-top: 8px; font-size: 0.9rem; color: var(--text-light); }
        
        /* Conclusion */
        .conclusion { background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border: 1px solid #86efac; border-radius: 12px; padding: 24px; margin: 24px 0; }
        .conclusion h2 { border: none; padding: 0; color: var(--green); }
        
        /* Ads */
        .ad-unit { margin: 24px 0; text-align: center; }
        .ad-label { font-size: 10px; color: #9ca3af; display: block; margin-bottom: 4px; }
        .in-article-ad { background: #fafafa; border-radius: 8px; padding: 12px; border: 1px dashed #e5e7eb; }
        
        /* Recommendations */
        .recommendations { border-top: 1px solid var(--border); margin-top: 40px; padding-top: 30px; }
        .recommendations h3 { margin-top: 0; margin-bottom: 16px; }
        .grid-reco { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; }
        .reco-card { background: var(--bg); border-radius: 8px; overflow: hidden; text-decoration: none; color: inherit; border: 1px solid var(--border); transition: transform 0.2s; }
        .reco-card:hover { transform: translateY(-3px); border-color: var(--blue); }
        .reco-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
        .reco-card h4 { padding: 12px; margin: 0; font-size: 0.9rem; line-height: 1.4; color: var(--primary); font-weight: 600; }
        
        /* Internal Tools CTA */
        .tools-cta { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 24px; border-radius: 12px; margin: 24px 0; text-align: center; }
        .tools-cta h3 { color: white; border: none; padding: 0; margin: 0 0 8px; }
        .tools-cta p { margin: 0 0 16px; opacity: 0.9; }
        .tools-cta a { display: inline-block; background: white; color: var(--blue); padding: 10px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; margin: 4px; }
        
        /* Footer */
        footer { text-align: center; padding: 30px; color: var(--text-light); font-size: 0.9rem; border-top: 1px solid var(--border); background: var(--white); margin-top: 40px; }
        .footer-links { margin-bottom: 15px; }
        .footer-links a { color: var(--text-light); margin: 0 10px; text-decoration: none; }
        .footer-links a:hover { color: var(--blue); }
        
        /* Author Box */
        .author-box { display: flex; gap: 16px; align-items: center; background: #f1f5f9; padding: 20px; border-radius: 12px; margin: 24px 0; }
        .author-avatar { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--blue), var(--green)); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 700; flex-shrink: 0; }
        .author-info h4 { margin: 0 0 4px; }
        .author-info p { margin: 0; font-size: 0.9rem; color: var(--text-light); }
        
        /* Multiplex Ad */
        .multiplex-ad { margin: 30px 0; }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">
            <div class="logo-icon">₹</div> MoneyCal.in
        </a>
        <div class="nav-links">
            <a href="/blog">ब्लॉग</a>
            <a href="/calculators">कैलकुलेटर</a>
            <a href="/ipo">IPO</a>
            <a href="/government-schemes">सरकारी योजनाएं</a>
        </div>
    </nav>

    <div class="breadcrumb">
        <a href="/">होम</a><span>›</span><a href="/blog">ब्लॉग</a><span>›</span>${post.title.substring(0, 50)}...
    </div>

    <div class="layout">
        <aside class="ad-sidebar">
            <span class="ad-label">विज्ञापन</span>
            <ins class="adsbygoogle"
                 style="display:block; width:300px; height:600px"
                 data-ad-format="auto"
                 data-full-width-responsive="true"
                 data-ad-client="${AD_CLIENT}"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </aside>

        <main>
            <article>
                ${coverImage ? `<img src="${coverImage}" alt="${post.title}" class="hero-img" fetchpriority="high" width="1200" height="675">` : ''}
                <div class="article-content">
                    <h1>${post.title}</h1>
                    <div style="color:var(--text-light); font-size:0.9rem; margin-bottom:20px;">
                        By <strong>${post.author || 'MoneyCal Team'}</strong> · 
                        ${new Date(post.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })} · 
                        ${post.readTime || post.readingTime || '10'} मिनट पढ़ें
                    </div>
                    
                    <div class="content-body">
                        ${renderSectionsWithAds(post.content)}
                    </div>

                    <!-- Tools CTA -->
                    <div class="tools-cta">
                        <h3>🧮 फ्री फाइनेंशियल टूल्स का उपयोग करें</h3>
                        <p>अपने पैसों की बेहतर प्लानिंग के लिए MoneyCal के फ्री कैलकुलेटर्स आज़माएं</p>
                        <a href="/calculators/sip-calculator">SIP कैलकुलेटर</a>
                        <a href="/calculators/emi-calculator">EMI कैलकुलेटर</a>
                        <a href="/calculators/income-tax-calculator">Tax कैलकुलेटर</a>
                    </div>

                    <!-- Author Box -->
                    <div class="author-box">
                        <div class="author-avatar">${(post.author || 'M')[0]}</div>
                        <div class="author-info">
                            <h4>${post.author || 'MoneyCal Team'}</h4>
                            <p>${post.authorBio || 'MoneyCal.in पर वित्तीय शिक्षा और निवेश गाइड प्रदान करने वाली विशेषज्ञ टीम।'}</p>
                        </div>
                    </div>

                    ${recommendations}

                    <!-- Multiplex Ad -->
                    <div class="multiplex-ad">
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-format="autorelaxed"
                             data-ad-client="${AD_CLIENT}"></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                    </div>
                </div>
            </article>
        </main>

        <aside class="ad-sidebar">
            <span class="ad-label">विज्ञापन</span>
            <ins class="adsbygoogle"
                 style="display:block; width:300px; height:600px"
                 data-ad-format="auto"
                 data-full-width-responsive="true"
                 data-ad-client="${AD_CLIENT}"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </aside>
    </div>

    <footer>
        <div class="footer-links">
            <a href="/about-us">About Us</a>
            <a href="/contact-us">Contact</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms</a>
            <a href="/sitemap">Sitemap</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} MoneyCal.in - All Rights Reserved.</p>
    </footer>

    <!-- Deferred AdSense Loading -->
    <script>
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
          }
        }, 1500);
      });
    </script>
</body>
</html>`;
}

function generateBlogSitemap() {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    allBlogPosts.forEach(post => {
        sitemap += `  <url>\n    <loc>https://moneycal.in/blog/${post.slug}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });
    
    sitemap += `</urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-blog-static.xml'), sitemap, 'utf-8');
    console.log(`🗺️ Generated Blog Sitemap: /sitemap-blog-static.xml (${allBlogPosts.length} URLs)`);
}

function main() {
    console.log('🚀 Starting Blog Pre-rendering...\n');
    
    loadBlogData();
    
    if (allBlogPosts.length === 0) {
        console.log('❌ No blog posts found. Exiting.');
        return;
    }
    
    // Create blog output directory
    const blogDir = path.join(PUBLIC_DIR, 'blog');
    if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
    }
    
    // Generate static HTML for each post
    let successCount = 0;
    allBlogPosts.forEach(post => {
        try {
            const postDir = path.join(blogDir, post.slug);
            if (!fs.existsSync(postDir)) {
                fs.mkdirSync(postDir, { recursive: true });
            }
            
            const html = buildBlogHTML(post);
            fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf-8');
            console.log(`✅ Generated: /blog/${post.slug}/`);
            successCount++;
        } catch (err) {
            console.log(`❌ Error generating ${post.slug}: ${err.message}`);
        }
    });
    
    // Generate sitemap
    generateBlogSitemap();
    
    console.log(`\n🎉 Pre-rendering complete! ${successCount}/${allBlogPosts.length} blog posts generated as static HTML.`);
    console.log(`📈 These pages are now crawlable by Google and will start getting indexed!`);
}

main();
