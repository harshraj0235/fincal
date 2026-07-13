const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SRC_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const DISCOVER_DATA_FILE = path.join(SRC_DIR, 'data/discover/index.ts');
const STORIES_DATA_FILE = path.join(SRC_DIR, 'data/web-stories/index.ts');
const AD_CLIENT = 'ca-pub-6815277662449747';

let allDiscoverArticles = [];
let allWebStories = [];

function generateDiscoverHTML() {
    generateArticles();
    generateWebStories();
    generateSitemap();
}

function generateArticles() {
    if (!fs.existsSync(DISCOVER_DATA_FILE)) {
        console.log('No discover data found, skipping.');
        return;
    }

    const result = esbuild.buildSync({
        entryPoints: [DISCOVER_DATA_FILE],
        bundle: true,
        write: false,
        format: 'cjs',
        platform: 'node',
        charset: 'utf8'
    });
    const compiledCode = result.outputFiles[0].text;
    const module = { exports: {} };
    eval(compiledCode);
    
    allDiscoverArticles = module.exports.discoverArticles || [];

    const discoverDir = path.join(PUBLIC_DIR, 'discover');
    if (!fs.existsSync(discoverDir)) {
        fs.mkdirSync(discoverDir, { recursive: true });
    }

    allDiscoverArticles.forEach(article => {
        try {
            const articleDir = path.join(discoverDir, article.slug);
            if (!fs.existsSync(articleDir)) {
                fs.mkdirSync(articleDir, { recursive: true });
            }

            const htmlContent = buildHTML(article, allDiscoverArticles);
            fs.writeFileSync(path.join(articleDir, 'index.html'), htmlContent, 'utf-8');
            console.log(`✅ Generated Discover Article: /discover/${article.slug}/`);
        } catch (err) {
            console.error(`❌ SKIPPED article "${article.slug}" — Error: ${err.message}`);
        }
    });
}

function generateWebStories() {
    if (!fs.existsSync(STORIES_DATA_FILE)) {
        console.log('No web stories data found, skipping.');
        return;
    }

    const result = esbuild.buildSync({
        entryPoints: [STORIES_DATA_FILE],
        bundle: true,
        write: false,
        format: 'cjs',
        platform: 'node',
        charset: 'utf8'
    });
    const compiledCode = result.outputFiles[0].text;
    const module = { exports: {} };
    eval(compiledCode);
    
    allWebStories = module.exports.webStories || [];
    const storiesDir = path.join(PUBLIC_DIR, 'web-stories');
    if (!fs.existsSync(storiesDir)) {
        fs.mkdirSync(storiesDir, { recursive: true });
    }

    allWebStories.forEach(story => {
        const storyDir = path.join(storiesDir, story.slug);
        if (!fs.existsSync(storyDir)) {
            fs.mkdirSync(storyDir, { recursive: true });
        }

        const ampContent = buildAMPStoryHTML(story);
        fs.writeFileSync(path.join(storyDir, 'index.html'), ampContent, 'utf-8');
        console.log(`✅ Generated Web Story (AMP): /web-stories/${story.slug}/`);
    });
}

function renderSectionsWithAds(sections) {
    let html = '';
    let paragraphCount = 0;

    sections.forEach(sec => {
        switch (sec.type) {
            case 'p': 
                html += `<p>${sec.content}</p>`; 
                paragraphCount++;
                break;
            case 'h2': html += `<h2>${sec.content}</h2>`; break;
            case 'h3': html += `<h3>${sec.content}</h3>`; break;
            case 'ul': html += `<ul>${sec.content}</ul>`; break;
            case 'image': html += `<img src="${sec.content}" alt="${sec.alt || 'Related visual context for the article'}" class="content-img" loading="lazy" />`; break;
            case 'callout': html += `<div class="callout">${sec.content}</div>`; break;
            case 'quiz': 
                try {
                    const quizData = JSON.parse(sec.content);
                    html += `<div class="quiz-container" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:30px 0;">
                        <h3 style="font-size:1.25rem; color:#0f172a; margin:0 0 20px 0; font-weight:700;">🤔 Quiz Time: ${quizData.question}</h3>
                        <ul style="list-style-type:none; padding:0; margin:0;">
                            ${quizData.options.map((opt, i) => `<li style="padding:14px 20px; background:#fff; border:2px solid #e2e8f0; border-radius:8px; margin-bottom:12px; font-weight:500;">${opt}</li>`).join('')}
                        </ul>
                    </div>`;
                } catch(e) {}
                break;
            default: html += `<p>${sec.content}</p>`; break;
        }

        // Insert Ad every 2 paragraphs
        if (sec.type === 'p' && paragraphCount % 2 === 0) {
            html += `
            <div class="in-article-ad my-6 text-center">
                <span style="font-size:10px; color:#9ca3af; display:block; margin-bottom:4px;">Advertisement</span>
                <ins class="adsbygoogle"
                    style="display:block; text-align:center;"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    data-ad-client="${AD_CLIENT}"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>`;
        }
    });

    return html;
}

function buildHTML(article, allArticles) {
    const articleUrl = `https://moneycal.in/discover/${article.slug}/`;
    // FIX: Don't double-prefix if coverImage is already a full URL
    const coverImg = article.coverImage || '/default-cover.jpg';
    const fullImageUrl = coverImg.startsWith('https://') || coverImg.startsWith('http://')
        ? coverImg
        : `https://moneycal.in${coverImg}`;

    const recommendations = allArticles.filter(a => a.id !== article.id).slice(0, 3);
    let recommendationsHtml = '';
    if (recommendations.length > 0) {
        recommendationsHtml = `
        <div class="recommendations">
            <h3>Read Next</h3>
            <div class="grid-reco">
                ${recommendations.map(r => `
                <a href="/discover/${r.slug}/" class="reco-card">
                    <img src="${r.coverImage}" alt="${sanitizeForAttr(r.title)}" loading="lazy">
                    <h4>${r.title}</h4>
                </a>
                `).join('')}
            </div>
        </div>`;
    }

    const safeTitle = sanitizeForAttr(article.title);
    const safeSnippet = sanitizeForAttr(article.snippet);
    const nowISO = new Date().toISOString();
    // Safe date parsing — fallback to now if article.date is invalid
    const parsedDate = new Date(article.date);
    const articleDateISO = isNaN(parsedDate.getTime()) ? nowISO : parsedDate.toISOString();
    const articleCategory = article.category || "Finance";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["NewsArticle", "Article"],
        "headline": article.title,
        "image": [fullImageUrl],
        "datePublished": articleDateISO,
        "dateModified": nowISO,
        "author": [{
            "@type": "Person",
            "name": article.author,
            "url": "https://moneycal.in/about-us"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "MoneyCal.in",
            "logo": {
                "@type": "ImageObject",
                "url": "https://moneycal.in/android-chrome-512x512.jpg",
                "width": 512,
                "height": 512
            }
        },
        "description": article.snippet,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl
        },
        "isAccessibleForFree": true,
        "isPartOf": {
            "@type": "WebSite",
            "name": "MoneyCal.in",
            "url": "https://moneycal.in"
        }
    };

    // BreadcrumbList schema
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moneycal.in" },
            { "@type": "ListItem", "position": 2, "name": "Discover", "item": "https://moneycal.in/discover" },
            { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl }
        ]
    };

    // FAQ schema — auto-generate 3 FAQs from article content
    const faqItems = [];
    const h2Sections = article.sections.filter(s => s.type === 'h2');
    const pSections = article.sections.filter(s => s.type === 'p');
    if (h2Sections.length >= 1 && pSections.length >= 1) {
        faqItems.push({ "@type": "Question", "name": h2Sections[0].content.replace(/<[^>]*>/g, ''), "acceptedAnswer": { "@type": "Answer", "text": pSections[0].content.replace(/<[^>]*>/g, '').slice(0, 300) } });
    }
    if (h2Sections.length >= 2 && pSections.length >= 3) {
        faqItems.push({ "@type": "Question", "name": h2Sections[1].content.replace(/<[^>]*>/g, ''), "acceptedAnswer": { "@type": "Answer", "text": pSections[2].content.replace(/<[^>]*>/g, '').slice(0, 300) } });
    }
    const faqLd = faqItems.length > 0 ? { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems } : null;

    const allSchemas = [jsonLd, breadcrumbLd];
    if (faqLd) allSchemas.push(faqLd);

    return `<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeTitle} - MoneyCal</title>
    <meta name="description" content="${safeSnippet}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${articleUrl}" />
    
    <!-- RSS Feed -->
    <link rel="alternate" type="application/rss+xml" title="MoneyCal Discover Feed" href="https://moneycal.in/feed.xml" />

    <!-- Hreflang for international SEO -->
    <link rel="alternate" hreflang="x-default" href="${articleUrl}" />
    <link rel="alternate" hreflang="en-IN" href="${articleUrl}" />
    <link rel="alternate" hreflang="hi-IN" href="${articleUrl}" />

    <!-- Date signals for Google Discover freshness -->
    <meta property="article:published_time" content="${articleDateISO}" />
    <meta property="article:modified_time" content="${nowISO}" />
    <meta property="article:author" content="${article.author}" />
    <meta property="article:section" content="${articleCategory}" />
    
    <!-- Open Graph & Twitter -->
    <meta property="og:locale" content="hi_IN" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeSnippet}" />
    <meta property="og:url" content="${articleUrl}" />
    <meta property="og:site_name" content="MoneyCal.in" />
    <meta property="og:image" content="${fullImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeSnippet}" />
    <meta name="twitter:image" content="${fullImageUrl}" />
    <meta name="twitter:site" content="@MoneyCalIN" />

    <!-- Schema.org JSON-LD (multiple schemas) -->
    <script type="application/ld+json">
        ${JSON.stringify(allSchemas)}
    </script>

    <style>
        :root { --primary: #0f172a; --blue: #2563eb; --bg: #f8fafc; --text: #334155; --text-light: #64748b; }
        body { font-family: 'Inter', 'Noto Sans Devanagari', 'Mukta', system-ui, -apple-system, sans-serif; margin: 0; padding: 0; background-color: var(--bg); color: var(--text); line-height: 1.6; }
        
        /* Navbar */
        .navbar { background: #fff; padding: 15px 20px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .logo { font-size: 1.25rem; font-weight: 800; color: var(--blue); text-decoration: none; display: flex; align-items: center; gap: 8px; }
        .logo-icon { width: 28px; height: 28px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 6px; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; }
        .nav-links a { margin-left: 20px; text-decoration: none; color: var(--text); font-weight: 500; font-size: 0.95rem;}
        .nav-links a:hover { color: var(--blue); }

        /* Layout */
        .layout { display: flex; justify-content: center; max-width: 1400px; margin: 0 auto; padding: 20px 10px; gap: 20px; }
        .ad-sidebar { width: 300px; display: none; }
        .container { flex: 1; max-width: 800px; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        
        @media (min-width: 1100px) {
            .ad-sidebar { display: block; position: sticky; top: 80px; height: 600px; }
        }

        /* Article */
        .hero-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
        .article-content { padding: 30px; }
        h1 { font-size: 2rem; color: var(--primary); margin: 0 0 15px 0; line-height: 1.45; font-weight: 800; padding-bottom: 5px; }
        h2 { font-size: 1.5rem; color: var(--primary); margin: 30px 0 15px; }
        h3 { font-size: 1.25rem; color: var(--primary); margin: 25px 0 10px; }
        p { margin-bottom: 20px; font-size: 1.1rem; }
        a { color: var(--blue); text-decoration: none; font-weight: 500; }
        a:hover { text-decoration: underline; }
        .callout { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px 20px; margin: 25px 0; border-radius: 0 8px 8px 0; color: #166534; }
        .content-img { width: 100%; border-radius: 8px; margin: 20px 0; }
        
        /* Recommendations */
        .recommendations { border-top: 1px solid #e2e8f0; margin-top: 40px; padding-top: 30px; }
        .recommendations h3 { margin-top: 0; }
        .grid-reco { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
        .reco-card { background: #f8fafc; border-radius: 8px; overflow: hidden; text-decoration: none; color: inherit; border: 1px solid #e2e8f0; transition: transform 0.2s; }
        .reco-card:hover { transform: translateY(-3px); border-color: var(--blue); }
        .reco-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
        .reco-card h4 { padding: 12px; margin: 0; font-size: 0.95rem; line-height: 1.4; color: var(--primary); font-weight: 600; }

        /* Footer */
        footer { text-align: center; padding: 30px; color: var(--text-light); font-size: 0.9rem; border-top: 1px solid #e2e8f0; background: #fff; margin-top: 40px; }
        .footer-links { margin-bottom: 15px; }
        .footer-links a { color: var(--text-light); margin: 0 10px; text-decoration: none; }
        .footer-links a:hover { color: var(--blue); }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">
            <div class="logo-icon">₹</div> MoneyCal.in
        </a>
        <div class="nav-links">
            <a href="/discover">Discover Hub</a>
            <a href="/ipo">IPO Dashboard</a>
        </div>
    </nav>

    <div class="layout">
        <aside class="ad-sidebar">
            <span style="font-size:10px; color:#9ca3af; text-align:center; display:block;">Advertisement</span>
            <ins class="adsbygoogle"
                 style="display:block; width:300px; height:600px"
                 data-ad-format="auto"
                 data-full-width-responsive="true"
                 data-ad-client="${AD_CLIENT}"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </aside>

        <!-- Main Content -->
        <main class="container">
            <article>
                <img src="${article.coverImage}" alt="${safeTitle}" class="hero-img" fetchpriority="high">
                <div class="article-content">
                    <h1>${article.title}</h1>
                    <div style="color:var(--text-light); font-size:0.9rem; margin-bottom:20px;">By <strong>${article.author}</strong> • ${parsedDate.toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    
                    <div class="content-body">
                        ${renderSectionsWithAds(article.sections)}
                    </div>

                    ${recommendationsHtml}
                </div>
            </article>
        </main>

        <aside class="ad-sidebar">
            <span style="font-size:10px; color:#9ca3af; text-align:center; display:block;">Advertisement</span>
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
        </div>
        <p>&copy; ${new Date().getFullYear()} MoneyCal.in - All Rights Reserved.</p>
    </footer>

    <!-- Deferred AdSense Loading for Core Web Vitals Optimization -->
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

function buildAMPStoryHTML(story) {
    const storyUrl = `https://moneycal.in/web-stories/${story.slug}/`;
    
    let pagesHtml = '';
    story.pages.forEach(page => {
        pagesHtml += `
    <amp-story-page id="${page.id}">
      <amp-story-grid-layer template="fill">
        <amp-img src="${page.image}" width="720" height="1280" layout="responsive" alt="${page.heading}"></amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" class="bottom-gradient">
        <div class="content-wrapper">
            <h1 class="heading" animate-in="fly-in-bottom" animate-in-duration="0.5s">${page.heading}</h1>
            <p class="text" animate-in="fly-in-bottom" animate-in-duration="0.7s" animate-in-delay="0.2s">${page.text}</p>
        </div>
      </amp-story-grid-layer>
    </amp-story-page>`;
    });

    return `<!DOCTYPE html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>${story.title} - MoneyCal Web Stories</title>
    <link rel="canonical" href="${storyUrl}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <script async custom-element="amp-story-auto-ads" src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      amp-story { font-family: 'Helvetica Neue', Arial, sans-serif; }
      .bottom-gradient { align-content: end; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%); }
      .content-wrapper { padding: 32px 24px; color: white; text-align: center; }
      .heading { font-size: 2.2rem; font-weight: 800; line-height: 1.2; margin-bottom: 16px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
      .text { font-size: 1.2rem; line-height: 1.4; font-weight: 500; text-shadow: 0 1px 5px rgba(0,0,0,0.5); }
    </style>
  </head>
  <body>
    <amp-story standalone
        title="${story.title}"
        publisher="${story.publisherName}"
        publisher-logo-src="${story.publisherLogo}"
        poster-portrait-src="${story.coverImage}">
      
      <amp-story-auto-ads>
        <script type="application/json">
          {
            "ad-attributes": {
              "type": "adsense",
              "data-ad-client": "${AD_CLIENT}"
            }
          }
        </script>
      </amp-story-auto-ads>

      ${pagesHtml}
    </amp-story>
  </body>
</html>
<!-- </body> -->`;
}

// Helper to sanitize text for use in HTML attributes (no unescaped quotes)
function sanitizeForAttr(text) {
    return String(text).replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function generateSitemap() {
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Sort newest first so Google crawls latest articles first
    const sortedDiscover = [...allDiscoverArticles].sort((a, b) => {
        const dA = a.date ? new Date(a.date).getTime() : 0;
        const dB = b.date ? new Date(b.date).getTime() : 0;
        return (isNaN(dB) ? 0 : dB) - (isNaN(dA) ? 0 : dA);
    });
    sortedDiscover.forEach(a => {
        let lastModDate = new Date();
        try {
            const filePath = path.join(SRC_DIR, 'data/discover', a.slug + '.ts');
            if (fs.existsSync(filePath)) lastModDate = fs.statSync(filePath).mtime;
        } catch(e) {}
        sitemapContent += `  <url>\n    <loc>https://moneycal.in/discover/${a.slug}/</loc>\n    <lastmod>${lastModDate.toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    
    allWebStories.forEach(s => {
        let lastModDate = new Date();
        try {
            const filePath = path.join(SRC_DIR, 'data/web-stories', s.slug + '.ts');
            if (fs.existsSync(filePath)) lastModDate = fs.statSync(filePath).mtime;
        } catch(e) {}
        sitemapContent += `  <url>\n    <loc>https://moneycal.in/web-stories/${s.slug}/</loc>\n    <lastmod>${lastModDate.toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    sitemapContent += `</urlset>`;
    
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-discover.xml'), sitemapContent, 'utf-8');
    console.log(`✅ Generated Sitemap: /sitemap-discover.xml`);

    // === Generate Google News Sitemap with latest 50 articles ===
    const sorted = [...allDiscoverArticles].sort((a, b) => {
        const dA = a.date ? new Date(a.date).getTime() : 0;
        const dB = b.date ? new Date(b.date).getTime() : 0;
        return (isNaN(dB) ? 0 : dB) - (isNaN(dA) ? 0 : dA);
    }).slice(0, 50);
    let newsXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;
    sorted.forEach(a => {
        let pubDate = new Date().toISOString().split('T')[0];
        if (a.date && !isNaN(new Date(a.date).getTime())) {
            pubDate = new Date(a.date).toISOString().split('T')[0];
        }
        const safeHeadline = sanitizeForAttr(a.title).replace(/&/g, '&amp;');
        newsXml += `  <url>\n    <loc>https://moneycal.in/discover/${a.slug}/</loc>\n    <news:news>\n      <news:publication>\n        <news:name>MoneyCal.in</news:name>\n        <news:language>hi</news:language>\n      </news:publication>\n      <news:publication_date>${pubDate}</news:publication_date>\n      <news:title>${safeHeadline}</news:title>\n    </news:news>\n  </url>\n`;
    });
    newsXml += `</urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-news.xml'), newsXml, 'utf-8');
    console.log(`✅ Generated News Sitemap: /sitemap-news.xml (${sorted.length} articles)`);
}

generateDiscoverHTML();
