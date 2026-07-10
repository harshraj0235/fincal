/**
 * generate-news-pages.cjs
 * 
 * Generates static HTML pages for all news articles from src/data/news-articles/*.ts
 * Critical for SEO — Google can crawl these instantly without JS rendering.
 * 
 * Usage: node scripts/generate-news-pages.cjs
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SRC_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const NEWS_DIR = path.join(SRC_DIR, 'data/news-articles');
const AD_CLIENT = 'ca-pub-6815277662449747';

let allNewsArticles = [];

function loadNewsArticles() {
    const files = fs.readdirSync(NEWS_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('index'));
    
    files.forEach(file => {
        const filePath = path.join(NEWS_DIR, file);
        try {
            const result = esbuild.buildSync({
                entryPoints: [filePath],
                bundle: true,
                write: false,
                format: 'cjs',
                platform: 'node',
                charset: 'utf8',
            });
            const code = result.outputFiles[0].text;
            const module = { exports: {} };
            eval(code);
            
            // Get the first exported value (each file exports one article)
            const exportKeys = Object.keys(module.exports);
            for (const key of exportKeys) {
                const article = module.exports[key];
                if (article && article.headline) {
                    // Generate slug from filename
                    const slug = file.replace('.ts', '');
                    article._slug = slug;
                    article._filename = file;
                    allNewsArticles.push(article);
                }
            }
        } catch (err) {
            console.log(`⚠️ Error loading ${file}: ${err.message}`);
        }
    });
    console.log(`📰 Total news articles loaded: ${allNewsArticles.length}`);
}

function renderCoverageTopics(topics) {
    if (!topics || topics.length === 0) return '';
    let html = '';
    topics.forEach(topic => {
        html += `<div class="topic-card">
            <h3>${topic.title}</h3>
            <p>${topic.description}</p>
            ${topic.subtopics ? `<div class="subtopics">${topic.subtopics.map(s => `<span class="tag">${s}</span>`).join('')}</div>` : ''}
        </div>`;
    });
    return html;
}

function renderFacts(facts) {
    if (!facts || facts.length === 0) return '';
    return `<div class="facts-grid">${facts.map(f => `
        <div class="fact-card">
            <div class="fact-label">${f.label}</div>
            <div class="fact-value">${f.value}</div>
            ${f.source ? `<div class="fact-source">${f.source}</div>` : ''}
        </div>`).join('')}</div>`;
}

function renderStatistics(stats) {
    if (!stats || stats.length === 0) return '';
    return `<div class="stats-grid">${stats.map(s => `
        <div class="stat-card">
            <div class="stat-metric">${s.metric}</div>
            <div class="stat-value">${s.value}</div>
            <div class="stat-change">${s.change} | ${s.period}</div>
        </div>`).join('')}</div>`;
}

function renderImpactList(items) {
    if (!items || items.length === 0) return '';
    return `<ul class="impact-list">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
}

function renderActionItems(items, title) {
    if (!items || items.length === 0) return '';
    return `<div class="action-section">
        <h4>${title}</h4>
        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>`;
}

function buildNewsHTML(article) {
    const slug = article._slug;
    const canonicalUrl = `https://moneycal.in/news/${slug}/`;
    const title = article.headline;
    const safeTitle = title.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const description = article.whatsNew?.summary?.slice(0, 160) || '';
    const safeDesc = description.replace(/"/g, '&quot;');
    const coverImage = article.featuredImage?.url || 'https://moneycal.in/android-chrome-512x512.jpg';
    const fullImageUrl = coverImage.startsWith('https://') ? coverImage : `https://moneycal.in${coverImage}`;
    const dateISO = article.whatsNew?.date ? new Date(article.whatsNew.date).toISOString() : new Date().toISOString();
    const nowISO = new Date().toISOString();
    const authorName = article.eeat?.author?.name || 'MoneyCal Team';
    const authorBio = article.eeat?.author?.bio || 'MoneyCal.in पर वित्तीय शिक्षा और निवेश गाइड प्रदान करने वाली विशेषज्ञ टीम।';

    // JSON-LD NewsArticle schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": title,
        "datePublished": dateISO,
        "dateModified": nowISO,
        "author": { "@type": "Person", "name": authorName },
        "publisher": {
            "@type": "Organization",
            "name": "MoneyCal.in",
            "logo": { "@type": "ImageObject", "url": "https://moneycal.in/android-chrome-512x512.jpg", "width": 512, "height": 512 }
        },
        "image": fullImageUrl,
        "description": description,
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
        "isAccessibleForFree": true
    };

    // BreadcrumbList
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moneycal.in" },
            { "@type": "ListItem", "position": 2, "name": "News", "item": "https://moneycal.in/news" },
            { "@type": "ListItem", "position": 3, "name": title.slice(0, 60), "item": canonicalUrl }
        ]
    };

    // FAQ schema from outlook.questions
    let faqLd = null;
    const questions = article.outlook?.questions || [];
    const faqItems = [];
    questions.forEach(q => {
        if (typeof q === 'object' && q.question && q.answer) {
            faqItems.push({
                "@type": "Question",
                "name": q.question.replace(/<[^>]*>/g, ''),
                "acceptedAnswer": { "@type": "Answer", "text": q.answer.replace(/<[^>]*>/g, '').slice(0, 500) }
            });
        }
    });
    // Also add from faq field
    if (article.faq) {
        article.faq.forEach(q => {
            faqItems.push({
                "@type": "Question",
                "name": q.question.replace(/<[^>]*>/g, ''),
                "acceptedAnswer": { "@type": "Answer", "text": q.answer.replace(/<[^>]*>/g, '').slice(0, 500) }
            });
        });
    }
    if (faqItems.length > 0) {
        faqLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems };
    }

    const allSchemas = [jsonLd, breadcrumbLd];
    if (faqLd) allSchemas.push(faqLd);

    // Build body content
    let bodyContent = '';

    // Featured Image
    if (article.featuredImage) {
        bodyContent += `<figure class="hero-image">
            <img src="${article.featuredImage.url}" alt="${article.featuredImage.alt || safeTitle}" loading="eager" width="1200" height="630">
            ${article.featuredImage.caption ? `<figcaption>${article.featuredImage.caption}</figcaption>` : ''}
        </figure>`;
    }

    // What's New Section
    if (article.whatsNew) {
        bodyContent += `<section class="section whats-new">
            <h2>📢 ताज़ा अपडेट</h2>
            <p>${article.whatsNew.summary}</p>
            ${article.whatsNew.source ? `<cite class="source">स्रोत: <a href="${article.whatsNew.source.url || '#'}" rel="noopener">${article.whatsNew.source.name}</a></cite>` : ''}
        </section>`;
    }

    // Why It Matters
    if (article.whyItMatters) {
        bodyContent += `<section class="section why-matters">
            <h2>🎯 यह क्यों मायने रखता है</h2>
            <p>${article.whyItMatters.significance}</p>
            <h3>प्रभाव (Impact)</h3>
            ${renderImpactList(article.whyItMatters.impact)}
            ${article.whyItMatters.stakeholders?.length ? `<h3>प्रभावित पक्ष</h3>${renderImpactList(article.whyItMatters.stakeholders)}` : ''}
        </section>`;
    }

    // Key Data
    if (article.keyData) {
        bodyContent += `<section class="section key-data">
            <h2>📊 प्रमुख आंकड़े</h2>
            ${renderFacts(article.keyData.facts)}
            ${renderStatistics(article.keyData.statistics)}
        </section>`;
    }

    // Coverage Topics
    if (article.coverage?.mainTopics) {
        bodyContent += `<section class="section coverage">
            <h2>📋 विस्तृत विश्लेषण</h2>
            ${renderCoverageTopics(article.coverage.mainTopics)}
        </section>`;
    }

    // Outlook
    if (article.outlook) {
        bodyContent += `<section class="section outlook">
            <h2>🔮 भविष्य का दृष्टिकोण</h2>
            ${article.outlook.whatToWatch?.length ? `<h3>नज़र रखें</h3>${renderImpactList(article.outlook.whatToWatch)}` : ''}
            ${article.outlook.upcomingMilestones?.length ? `<h3>आगामी घटनाएँ</h3><div class="milestones">${article.outlook.upcomingMilestones.map(m => `<div class="milestone ${m.importance || ''}"><span class="date">${m.date}</span><span class="event">${m.event}</span></div>`).join('')}</div>` : ''}
        </section>`;
    }

    // FAQ Section
    if (faqItems.length > 0) {
        bodyContent += `<section class="section faq">
            <h2>❓ अक्सर पूछे जाने वाले सवाल</h2>
            ${questions.filter(q => typeof q === 'object' && q.question).map(q => `
                <details class="faq-item">
                    <summary>${q.question}</summary>
                    <p>${q.answer}</p>
                </details>`).join('')}
        </section>`;
    }

    // Takeaway
    if (article.takeaway) {
        bodyContent += `<section class="section takeaway">
            <h2>✅ आपके लिए क्या करें</h2>
            ${renderActionItems(article.takeaway.forReaders, '📌 पाठकों के लिए')}
            ${renderActionItems(article.takeaway.forInvestors, '💰 निवेशकों के लिए')}
            ${renderActionItems(article.takeaway.forBusinesses, '🏢 व्यवसायों के लिए')}
        </section>`;
    }

    return `<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeTitle} - MoneyCal</title>
    <meta name="description" content="${safeDesc}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${canonicalUrl}" />
    
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en-IN" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="hi-IN" href="${canonicalUrl}" />

    <meta property="article:published_time" content="${dateISO}" />
    <meta property="article:modified_time" content="${nowISO}" />
    <meta property="article:author" content="${authorName}" />
    <meta property="article:section" content="Finance News" />
    
    <meta property="og:locale" content="hi_IN" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="MoneyCal.in" />
    <meta property="og:image" content="${fullImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${fullImageUrl}" />
    <meta name="twitter:site" content="@MoneyCalIN" />

    <script type="application/ld+json">
        ${JSON.stringify(allSchemas)}
    </script>

    <style>
        :root { --primary: #0f172a; --blue: #2563eb; --bg: #f8fafc; --text: #334155; --text-light: #64748b; --green: #059669; --red: #dc2626; --orange: #ea580c; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; background-color: var(--bg); color: var(--text); line-height: 1.7; }
        
        .navbar { background: var(--primary); color: white; padding: 12px 20px; position: sticky; top: 0; z-index: 100; }
        .navbar a { color: white; text-decoration: none; font-weight: 700; font-size: 1.2rem; }
        .nav-links { display: flex; gap: 16px; margin-top: 6px; }
        .nav-links a { font-size: 0.85rem; font-weight: 400; opacity: 0.85; }
        .nav-links a:hover { opacity: 1; }
        
        .container { max-width: 820px; margin: 0 auto; padding: 24px 16px; }
        .breadcrumb { font-size: 0.8rem; color: var(--text-light); margin-bottom: 16px; }
        .breadcrumb a { color: var(--blue); text-decoration: none; }
        
        h1 { font-size: 1.8rem; line-height: 1.3; color: var(--primary); margin-bottom: 12px; font-weight: 800; }
        .subtitle { font-size: 1.05rem; color: var(--text-light); margin-bottom: 20px; line-height: 1.5; }
        .meta { display: flex; gap: 16px; font-size: 0.85rem; color: var(--text-light); margin-bottom: 24px; flex-wrap: wrap; }
        
        .hero-image { margin: 0 -16px 24px; }
        .hero-image img { width: 100%; height: auto; border-radius: 8px; }
        .hero-image figcaption { font-size: 0.8rem; color: var(--text-light); text-align: center; margin-top: 8px; }
        
        .section { margin-bottom: 32px; padding: 24px; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .section h2 { font-size: 1.35rem; color: var(--primary); margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--blue); }
        .section h3 { font-size: 1.1rem; color: var(--primary); margin: 16px 0 8px; }
        .section p { margin-bottom: 12px; }
        
        .impact-list { padding-left: 20px; margin-bottom: 12px; }
        .impact-list li { margin-bottom: 6px; padding-left: 4px; }
        
        .facts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px; }
        .fact-card { background: linear-gradient(135deg, #eff6ff, #f0fdf4); padding: 16px; border-radius: 10px; text-align: center; border: 1px solid #e2e8f0; }
        .fact-label { font-size: 0.8rem; color: var(--text-light); margin-bottom: 4px; }
        .fact-value { font-size: 1.3rem; font-weight: 800; color: var(--primary); }
        .fact-source { font-size: 0.7rem; color: var(--text-light); margin-top: 4px; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
        .stat-card { background: white; padding: 14px; border-radius: 8px; border-left: 4px solid var(--blue); }
        .stat-metric { font-size: 0.85rem; color: var(--text-light); }
        .stat-value { font-size: 1.2rem; font-weight: 700; color: var(--primary); }
        .stat-change { font-size: 0.75rem; color: var(--green); }
        
        .topic-card { background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 16px; border-left: 4px solid var(--blue); }
        .topic-card h3 { margin-top: 0; color: var(--blue); }
        .subtopics { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
        .tag { background: #dbeafe; color: var(--blue); padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 500; }
        
        .milestones { display: flex; flex-direction: column; gap: 8px; }
        .milestone { display: flex; gap: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; align-items: center; }
        .milestone .date { font-weight: 700; color: var(--blue); white-space: nowrap; font-size: 0.9rem; }
        .milestone .event { font-size: 0.9rem; }
        .milestone.high { border-left: 3px solid var(--red); }
        .milestone.medium { border-left: 3px solid var(--orange); }
        
        .faq-item { background: #f8fafc; padding: 14px 18px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; }
        .faq-item summary { font-weight: 600; color: var(--primary); }
        .faq-item p { margin-top: 10px; color: var(--text); }
        
        .action-section h4 { font-size: 1rem; margin-bottom: 8px; }
        .action-section ul { padding-left: 20px; margin-bottom: 16px; }
        .action-section li { margin-bottom: 6px; }
        
        .source { display: block; font-size: 0.8rem; color: var(--text-light); margin-top: 8px; }
        .source a { color: var(--blue); }
        
        .author-box { display: flex; gap: 16px; padding: 20px; background: linear-gradient(135deg, #eff6ff, #faf5ff); border-radius: 12px; margin-top: 24px; align-items: center; }
        .author-avatar { width: 56px; height: 56px; border-radius: 50%; background: var(--blue); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; flex-shrink: 0; }
        .author-info h4 { color: var(--primary); margin-bottom: 2px; }
        .author-info p { font-size: 0.85rem; color: var(--text-light); }
        
        .cta-box { background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; }
        .cta-box p { color: rgba(255,255,255,0.9); margin-bottom: 12px; }
        .cta-box a { display: inline-block; background: white; color: var(--blue); padding: 10px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; margin: 4px; }
        
        footer { text-align: center; padding: 24px; color: var(--text-light); font-size: 0.85rem; border-top: 1px solid #e2e8f0; margin-top: 40px; }
        footer a { color: var(--blue); text-decoration: none; margin: 0 8px; }
        
        @media (max-width: 640px) {
            h1 { font-size: 1.4rem; }
            .facts-grid { grid-template-columns: repeat(2, 1fr); }
            .hero-image { margin: 0 -8px 16px; }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="/">MoneyCal.in</a>
        <div class="nav-links">
            <a href="/calculators/">Calculators</a>
            <a href="/blog/">Blog</a>
            <a href="/news/">News</a>
            <a href="/discover/">Discover</a>
            <a href="/government-schemes/">Schemes</a>
        </div>
    </nav>

    <div class="container">
        <div class="breadcrumb">
            <a href="/">Home</a> › <a href="/news/">News</a> › ${safeTitle.slice(0, 50)}...
        </div>
        
        <article>
            <h1>${title}</h1>
            ${article.subheadline ? `<p class="subtitle">${article.subheadline}</p>` : ''}
            <div class="meta">
                <span>✍️ ${authorName}</span>
                <span>📅 ${new Date(dateISO).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            ${bodyContent}

            <!-- Author Box -->
            <div class="author-box">
                <div class="author-avatar">${authorName[0]}</div>
                <div class="author-info">
                    <h4>${authorName}</h4>
                    <p>${authorBio}</p>
                </div>
            </div>

            <!-- CTA Box -->
            <div class="cta-box">
                <p>अपने पैसों की बेहतर प्लानिंग के लिए MoneyCal के फ्री कैलकुलेटर्स आज़माएं</p>
                <a href="/calculators/sip-calculator/">SIP कैलकुलेटर</a>
                <a href="/calculators/emi-calculator/">EMI कैलकुलेटर</a>
                <a href="/calculators/income-tax-calculator/">Tax कैलकुलेटर</a>
            </div>
        </article>
    </div>

    <footer>
        <div>
            <a href="/about-us">About</a>
            <a href="/contact-us">Contact</a>
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-of-service">Terms</a>
            <a href="/blog/">Blog</a>
            <a href="/discover/">Discover</a>
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

function generateNewsSitemap() {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    allNewsArticles.forEach(article => {
        const slug = article._slug;
        sitemap += `  <url>\n    <loc>https://moneycal.in/news/${slug}/</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    
    sitemap += `</urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-news-articles.xml'), sitemap, 'utf-8');
    console.log(`🗺️ Generated News Sitemap: /sitemap-news-articles.xml (${allNewsArticles.length} URLs)`);
}

function main() {
    console.log('🚀 Starting News Pages Generation...\n');
    
    loadNewsArticles();
    
    if (allNewsArticles.length === 0) {
        console.log('❌ No news articles found. Exiting.');
        return;
    }
    
    // Create news output directory
    const newsDir = path.join(PUBLIC_DIR, 'news');
    if (!fs.existsSync(newsDir)) {
        fs.mkdirSync(newsDir, { recursive: true });
    }
    
    // Generate static HTML for each article
    let successCount = 0;
    allNewsArticles.forEach(article => {
        try {
            const slug = article._slug;
            const postDir = path.join(newsDir, slug);
            if (!fs.existsSync(postDir)) {
                fs.mkdirSync(postDir, { recursive: true });
            }
            
            const html = buildNewsHTML(article);
            fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf-8');
            console.log(`✅ Generated: /news/${slug}/`);
            successCount++;
        } catch (err) {
            console.log(`❌ Error generating ${article._slug}: ${err.message}`);
        }
    });
    
    // Generate sitemap
    generateNewsSitemap();
    
    console.log(`\n🎉 News generation complete! ${successCount}/${allNewsArticles.length} pages generated.`);
}

main();
