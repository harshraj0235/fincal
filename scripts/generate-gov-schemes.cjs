/**
 * generate-gov-schemes.cjs
 * 
 * Generates static HTML pages for all government schemes.
 * Also creates a master hub page with all schemes categorized.
 * 
 * Usage: node scripts/generate-gov-schemes.cjs
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SRC_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const AD_CLIENT = 'ca-pub-6815277662449747';

let allSchemes = [];

function loadSchemeData() {
    const files = [
        path.join(SRC_DIR, 'data/governmentSchemesData.ts'),
        path.join(SRC_DIR, 'data/comprehensiveGovernmentSchemes.ts'),
        path.join(SRC_DIR, 'data/newSchemesData.ts')
    ];
    
    const seenSlugs = new Set();
    
    files.forEach(file => {
        if (!fs.existsSync(file)) return;
        try {
            const result = esbuild.buildSync({
                entryPoints: [file],
                bundle: true,
                write: false,
                format: 'cjs',
                platform: 'node',
                charset: 'utf8',
            });
            const code = result.outputFiles[0].text;
            const module = { exports: {} };
            eval(code);
            
            const schemes = module.exports.governmentSchemes || module.exports.comprehensiveGovernmentSchemes || module.exports.newSchemesData || [];
            if (Array.isArray(schemes)) {
                schemes.forEach(s => {
                    if (s.slug && !seenSlugs.has(s.slug)) {
                        seenSlugs.add(s.slug);
                        allSchemes.push(s);
                    }
                });
                console.log(`📋 Loaded ${schemes.length} schemes from ${path.basename(file)}`);
            }
        } catch (err) {
            console.log(`⚠️ Error loading ${path.basename(file)}: ${err.message}`);
        }
    });
    console.log(`📊 Total unique schemes: ${allSchemes.length}`);
}

function renderSchemeContent(content) {
    if (!content || !Array.isArray(content)) return '';
    return content.map(section => {
        switch (section.type) {
            case 'heading': return `<h2>${section.content}</h2>`;
            case 'subheading': return `<h3>${section.content}</h3>`;
            case 'paragraph': return `<p>${section.content}</p>`;
            case 'list':
                if (section.items && section.items.length > 0) {
                    return `<ul>${section.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
                }
                return '';
            case 'image':
                return `<figure><img src="${section.url || ''}" alt="${section.caption || ''}" loading="lazy" width="800" height="450"><figcaption>${section.caption || ''}</figcaption></figure>`;
            case 'quote':
                return `<blockquote><p>${section.content}</p>${section.author ? `<cite>— ${section.author}</cite>` : ''}</blockquote>`;
            case 'table':
                if (section.tableData) {
                    let t = '<div class="table-wrap"><table>';
                    t += '<thead><tr>' + section.tableData.headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead>';
                    t += '<tbody>';
                    section.tableData.rows.forEach(row => {
                        t += '<tr>' + row.map(c => `<td>${c}</td>`).join('') + '</tr>';
                    });
                    t += '</tbody></table></div>';
                    return t;
                }
                return '';
            case 'highlight':
                return `<div class="highlight-box">${section.content}</div>`;
            default:
                return section.content ? `<p>${section.content}</p>` : '';
        }
    }).join('\n');
}

function buildSchemeHTML(scheme) {
    const canonicalUrl = `https://moneycal.in/government-schemes/${scheme.slug}/`;
    const title = scheme.seoTitle || scheme.title;
    const safeTitle = title.replace(/"/g, '&quot;');
    const description = scheme.seoDescription || scheme.excerpt;
    const safeDesc = description.replace(/"/g, '&quot;').slice(0, 160);
    const coverImage = scheme.coverImage?.startsWith('https://') ? scheme.coverImage : `https://moneycal.in${scheme.coverImage || '/android-chrome-512x512.jpg'}`;
    const nowISO = new Date().toISOString();
    const dateISO = scheme.lastUpdated ? new Date(scheme.lastUpdated).toISOString() : nowISO;

    // GovernmentService + Article JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "GovernmentService",
        "name": scheme.title,
        "description": description,
        "url": canonicalUrl,
        "provider": { "@type": "GovernmentOrganization", "name": "Government of India" },
        "areaServed": { "@type": "Country", "name": "India" },
        "audience": { "@type": "Audience", "audienceType": (scheme.targetAudience || []).join(', ') }
    };

    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "datePublished": dateISO,
        "dateModified": nowISO,
        "author": { "@type": "Organization", "name": "MoneyCal.in" },
        "publisher": { "@type": "Organization", "name": "MoneyCal.in", "logo": { "@type": "ImageObject", "url": "https://moneycal.in/android-chrome-512x512.jpg" } },
        "image": coverImage,
        "mainEntityOfPage": canonicalUrl
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moneycal.in" },
            { "@type": "ListItem", "position": 2, "name": "Government Schemes", "item": "https://moneycal.in/government-schemes/" },
            { "@type": "ListItem", "position": 3, "name": title.slice(0, 60), "item": canonicalUrl }
        ]
    };

    // FAQ from scheme data
    let faqLd = null;
    if (scheme.faqSchema && scheme.faqSchema.length > 0) {
        faqLd = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": scheme.faqSchema.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
        };
    }

    const allSchemas = [jsonLd, articleLd, breadcrumbLd];
    if (faqLd) allSchemas.push(faqLd);

    // Build body
    const statusBadge = scheme.status === 'active' ? '🟢 Active' : scheme.status === 'upcoming' ? '🟡 Upcoming' : '🔴 Past';
    const statusClass = scheme.status || 'active';

    return `<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeTitle} - MoneyCal</title>
    <meta name="description" content="${safeDesc}">
    <meta name="keywords" content="${(scheme.keywords || []).join(', ')}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en-IN" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="hi-IN" href="${canonicalUrl}" />
    <meta property="article:published_time" content="${dateISO}" />
    <meta property="article:modified_time" content="${nowISO}" />
    <meta property="article:section" content="Government Schemes" />
    <meta property="og:locale" content="hi_IN" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="MoneyCal.in" />
    <meta property="og:image" content="${coverImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:image" content="${coverImage}" />
    <script type="application/ld+json">${JSON.stringify(allSchemas)}</script>

    <style>
        :root { --primary: #0f172a; --blue: #2563eb; --bg: #f8fafc; --text: #334155; --text-light: #64748b; --green: #059669; --orange: #ea580c; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; }
        .navbar { background: var(--primary); color: white; padding: 12px 20px; position: sticky; top: 0; z-index: 100; }
        .navbar a { color: white; text-decoration: none; font-weight: 700; font-size: 1.2rem; }
        .nav-links { display: flex; gap: 16px; margin-top: 6px; }
        .nav-links a { font-size: 0.85rem; font-weight: 400; opacity: 0.85; }
        .container { max-width: 900px; margin: 0 auto; padding: 24px 16px; }
        .breadcrumb { font-size: 0.8rem; color: var(--text-light); margin-bottom: 16px; }
        .breadcrumb a { color: var(--blue); text-decoration: none; }
        h1 { font-size: 1.7rem; line-height: 1.3; color: var(--primary); margin-bottom: 8px; font-weight: 800; }
        .hindi-title { font-size: 1.1rem; color: var(--text-light); margin-bottom: 16px; }
        .meta-bar { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; }
        .badge { padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.8rem; }
        .badge.active { background: #dcfce7; color: #166534; }
        .badge.upcoming { background: #fef9c3; color: #854d0e; }
        .badge.past { background: #fee2e2; color: #991b1b; }
        .badge.category { background: #dbeafe; color: var(--blue); }
        .cover-img { width: 100%; border-radius: 12px; margin-bottom: 24px; }
        .excerpt { font-size: 1.05rem; color: var(--text); margin-bottom: 24px; padding: 16px; background: linear-gradient(135deg, #eff6ff, #f0fdf4); border-radius: 10px; border-left: 4px solid var(--blue); }
        .info-card { background: white; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .info-card h2 { font-size: 1.3rem; color: var(--primary); margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid var(--blue); }
        .info-card ul { padding-left: 20px; }
        .info-card li { margin-bottom: 8px; padding-left: 4px; }
        .info-card ol { padding-left: 20px; }
        .info-card ol li { margin-bottom: 10px; }
        .content-body h2 { font-size: 1.3rem; color: var(--primary); margin: 24px 0 12px; }
        .content-body h3 { font-size: 1.1rem; margin: 16px 0 8px; }
        .content-body p { margin-bottom: 12px; }
        .content-body ul { padding-left: 20px; margin-bottom: 12px; }
        .content-body li { margin-bottom: 6px; }
        .highlight-box { background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid var(--orange); margin: 16px 0; font-weight: 500; }
        .table-wrap { overflow-x: auto; margin: 16px 0; }
        .table-wrap table { width: 100%; border-collapse: collapse; }
        .table-wrap th, .table-wrap td { padding: 10px 14px; border: 1px solid #e2e8f0; text-align: left; }
        .table-wrap th { background: var(--primary); color: white; font-size: 0.85rem; }
        .links-bar { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
        .links-bar a { display: inline-block; padding: 8px 18px; background: var(--blue); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
        .links-bar a.secondary { background: white; color: var(--blue); border: 1px solid var(--blue); }
        .faq-item { background: #f8fafc; padding: 14px 18px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; }
        .faq-item summary { font-weight: 600; color: var(--primary); }
        .faq-item p { margin-top: 10px; }
        .related-schemes { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; margin-top: 12px; }
        .related-card { background: white; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; text-decoration: none; color: var(--text); }
        .related-card:hover { border-color: var(--blue); }
        .cta-box { background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; }
        .cta-box a { display: inline-block; background: white; color: var(--blue); padding: 10px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; margin: 4px; }
        footer { text-align: center; padding: 24px; color: var(--text-light); font-size: 0.85rem; border-top: 1px solid #e2e8f0; margin-top: 40px; }
        footer a { color: var(--blue); text-decoration: none; margin: 0 8px; }
        @media (max-width: 640px) { h1 { font-size: 1.3rem; } .meta-bar { flex-direction: column; gap: 6px; } }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="/">MoneyCal.in</a>
        <div class="nav-links">
            <a href="/calculators/">Calculators</a>
            <a href="/blog/">Blog</a>
            <a href="/news/">News</a>
            <a href="/government-schemes/">Schemes</a>
        </div>
    </nav>

    <div class="container">
        <div class="breadcrumb">
            <a href="/">Home</a> › <a href="/government-schemes/">Government Schemes</a> › ${scheme.category}
        </div>

        <h1>${scheme.title}</h1>
        ${scheme.titleHindi ? `<p class="hindi-title">${scheme.titleHindi}</p>` : ''}
        
        <div class="meta-bar">
            <span class="badge ${statusClass}">${statusBadge}</span>
            <span class="badge category">${scheme.category}</span>
            ${scheme.launchDate ? `<span>📅 Launched: ${scheme.launchDate}</span>` : ''}
            ${scheme.budget ? `<span>💰 Budget: ${scheme.budget}</span>` : ''}
            ${scheme.beneficiaries ? `<span>👥 Beneficiaries: ${scheme.beneficiaries}</span>` : ''}
        </div>

        ${scheme.coverImage ? `<img src="${scheme.coverImage}" alt="${scheme.title}" class="cover-img" width="900" height="500" loading="eager">` : ''}
        
        <div class="excerpt">${scheme.excerpt}</div>

        <!-- Benefits -->
        ${scheme.benefits?.length ? `<div class="info-card">
            <h2>✅ लाभ (Benefits)</h2>
            <ul>${scheme.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>` : ''}

        <!-- Eligibility -->
        ${scheme.eligibility?.length ? `<div class="info-card">
            <h2>📋 पात्रता (Eligibility)</h2>
            <ul>${scheme.eligibility.map(e => `<li>${e}</li>`).join('')}</ul>
        </div>` : ''}

        <!-- Required Documents -->
        ${scheme.documents?.length ? `<div class="info-card">
            <h2>📄 आवश्यक दस्तावेज़ (Documents)</h2>
            <ul>${scheme.documents.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>` : ''}

        <!-- Application Process -->
        ${scheme.applicationProcess?.length ? `<div class="info-card">
            <h2>📝 आवेदन प्रक्रिया (How to Apply)</h2>
            <ol>${scheme.applicationProcess.map(a => `<li>${a}</li>`).join('')}</ol>
        </div>` : ''}

        <!-- Official Links -->
        <div class="links-bar">
            ${scheme.officialWebsite ? `<a href="${scheme.officialWebsite}" target="_blank" rel="noopener">🌐 Official Website</a>` : ''}
            ${scheme.helpline ? `<a href="tel:${scheme.helpline}" class="secondary">📞 Helpline: ${scheme.helpline}</a>` : ''}
        </div>

        <!-- Detailed Content -->
        ${scheme.content ? `<div class="info-card content-body">${renderSchemeContent(scheme.content)}</div>` : ''}

        <!-- FAQ Section -->
        ${scheme.faqSchema?.length ? `<div class="info-card">
            <h2>❓ अक्सर पूछे जाने वाले सवाल (FAQ)</h2>
            ${scheme.faqSchema.map(faq => `<details class="faq-item"><summary>${faq.question}</summary><p>${faq.answer}</p></details>`).join('')}
        </div>` : ''}

        <!-- Related Schemes -->
        ${scheme.relatedSchemes?.length ? `<div class="info-card">
            <h2>🔗 Related Schemes</h2>
            <div class="related-schemes">
                ${scheme.relatedSchemes.map(rs => `<a href="/government-schemes/${rs}/" class="related-card">${rs.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</a>`).join('')}
            </div>
        </div>` : ''}

        <div class="cta-box">
            <p>फ्री कैलकुलेटर्स से अपनी फाइनेंशियल प्लानिंग करें</p>
            <a href="/calculators/sip-calculator/">SIP Calculator</a>
            <a href="/calculators/emi-calculator/">EMI Calculator</a>
            <a href="/calculators/income-tax-calculator/">Tax Calculator</a>
        </div>
    </div>

    <footer>
        <div>
            <a href="/about-us">About</a>
            <a href="/contact-us">Contact</a>
            <a href="/privacy-policy">Privacy</a>
            <a href="/government-schemes/">All Schemes</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} MoneyCal.in - All Rights Reserved.</p>
    </footer>

    <script>
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const s = document.createElement('script');
            s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}';
            s.async = true; s.crossOrigin = 'anonymous';
            document.body.appendChild(s);
          }
        }, 1500);
      });
    </script>
</body>
</html>`;
}

function buildHubPage() {
    // Group by category
    const categories = {};
    allSchemes.forEach(s => {
        const cat = s.category || 'Other';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(s);
    });
    
    const categoryNames = Object.keys(categories).sort();
    
    let categoryLinksHtml = categoryNames.map(c => `<a href="#${c.replace(/[^a-zA-Z0-9]/g, '-')}" class="cat-link">${c} (${categories[c].length})</a>`).join('');
    
    let schemesHtml = '';
    categoryNames.forEach(cat => {
        const id = cat.replace(/[^a-zA-Z0-9]/g, '-');
        schemesHtml += `<section class="cat-section" id="${id}">
            <h2>${cat} (${categories[cat].length} Schemes)</h2>
            <div class="schemes-grid">
                ${categories[cat].map(s => `
                    <a href="/government-schemes/${s.slug}/" class="scheme-card">
                        <span class="badge ${s.status}">${s.status === 'active' ? '🟢' : '🟡'}</span>
                        <h3>${s.title.slice(0, 80)}</h3>
                        <p>${s.excerpt?.slice(0, 100) || ''}...</p>
                    </a>`).join('')}
            </div>
        </section>`;
    });

    return `<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>200+ Government Schemes India 2026 - Complete List & Guide | MoneyCal</title>
    <meta name="description" content="Complete list of 200+ Indian government schemes 2026. PM Kisan, Ayushman Bharat, PM Awas Yojana, Mudra Loan & more. Check eligibility, benefits, and how to apply.">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="https://moneycal.in/government-schemes/" />
    <link rel="alternate" hreflang="x-default" href="https://moneycal.in/government-schemes/" />
    <link rel="alternate" hreflang="en-IN" href="https://moneycal.in/government-schemes/" />
    <link rel="alternate" hreflang="hi-IN" href="https://moneycal.in/government-schemes/" />
    <meta property="og:title" content="200+ Government Schemes India 2026 - Complete Guide" />
    <meta property="og:description" content="Complete list of all Indian government schemes. Check eligibility, benefits, documents required, and how to apply." />
    <meta property="og:url" content="https://moneycal.in/government-schemes/" />
    <meta property="og:type" content="website" />
    <script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Government Schemes India 2026",
        "description": "Complete list of 200+ Indian government schemes",
        "url": "https://moneycal.in/government-schemes/",
        "publisher": { "@type": "Organization", "name": "MoneyCal.in" },
        "numberOfItems": allSchemes.length
    })}</script>
    <style>
        :root { --primary: #0f172a; --blue: #2563eb; --bg: #f8fafc; --text: #334155; --text-light: #64748b; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
        .navbar { background: var(--primary); color: white; padding: 12px 20px; position: sticky; top: 0; z-index: 100; }
        .navbar a { color: white; text-decoration: none; font-weight: 700; font-size: 1.2rem; }
        .nav-links { display: flex; gap: 16px; margin-top: 6px; }
        .nav-links a { font-size: 0.85rem; font-weight: 400; opacity: 0.85; }
        .container { max-width: 1100px; margin: 0 auto; padding: 24px 16px; }
        .hero { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; border-radius: 16px; margin-bottom: 32px; }
        .hero h1 { font-size: 2rem; margin-bottom: 12px; }
        .hero p { font-size: 1.1rem; opacity: 0.9; max-width: 700px; margin: 0 auto; }
        .hero .count { font-size: 3rem; font-weight: 900; margin: 16px 0; }
        .search-box { max-width: 500px; margin: 20px auto 0; }
        .search-box input { width: 100%; padding: 14px 20px; border: none; border-radius: 10px; font-size: 1rem; outline: none; }
        .cat-nav { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; justify-content: center; }
        .cat-link { padding: 6px 16px; background: white; border: 1px solid #e2e8f0; border-radius: 20px; text-decoration: none; color: var(--text); font-size: 0.85rem; font-weight: 500; transition: all 0.2s; }
        .cat-link:hover { background: var(--blue); color: white; border-color: var(--blue); }
        .cat-section { margin-bottom: 40px; }
        .cat-section h2 { font-size: 1.4rem; color: var(--primary); margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--blue); }
        .schemes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        .scheme-card { background: white; padding: 20px; border-radius: 12px; text-decoration: none; color: var(--text); box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: transform 0.2s, box-shadow 0.2s; display: block; border: 1px solid #e2e8f0; }
        .scheme-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-color: var(--blue); }
        .scheme-card h3 { font-size: 1rem; color: var(--primary); margin: 8px 0; line-height: 1.4; }
        .scheme-card p { font-size: 0.85rem; color: var(--text-light); }
        .scheme-card .badge { font-size: 0.75rem; }
        footer { text-align: center; padding: 24px; color: var(--text-light); font-size: 0.85rem; border-top: 1px solid #e2e8f0; margin-top: 40px; }
        footer a { color: var(--blue); text-decoration: none; margin: 0 8px; }
        @media (max-width: 640px) {
            .hero h1 { font-size: 1.5rem; }
            .hero .count { font-size: 2rem; }
            .schemes-grid { grid-template-columns: 1fr; }
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
            <a href="/government-schemes/">Schemes</a>
        </div>
    </nav>

    <div class="container">
        <div class="hero">
            <h1>🇮🇳 भारत सरकार की योजनाएं</h1>
            <div class="count">${allSchemes.length}+</div>
            <p>Complete guide to all Indian government schemes. Check eligibility, benefits, documents, and how to apply.</p>
            <div class="search-box">
                <input type="text" id="schemeSearch" placeholder="🔍 Search schemes... (e.g., PM Kisan, Ayushman Bharat)" oninput="filterSchemes(this.value)">
            </div>
        </div>

        <nav class="cat-nav">
            ${categoryLinksHtml}
        </nav>

        <div id="schemesContainer">
            ${schemesHtml}
        </div>
    </div>

    <footer>
        <div>
            <a href="/about-us">About</a>
            <a href="/contact-us">Contact</a>
            <a href="/privacy-policy">Privacy</a>
            <a href="/blog/">Blog</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} MoneyCal.in - All Rights Reserved.</p>
    </footer>

    <script>
        function filterSchemes(query) {
            const q = query.toLowerCase();
            document.querySelectorAll('.scheme-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(q) ? 'block' : 'none';
            });
        }
    </script>
    <script>
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const s = document.createElement('script');
            s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}';
            s.async = true; s.crossOrigin = 'anonymous';
            document.body.appendChild(s);
          }
        }, 1500);
      });
    </script>
</body>
</html>`;
}

function generateSchemesSitemap() {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    sitemap += `  <url>\n    <loc>https://moneycal.in/government-schemes/</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    allSchemes.forEach(scheme => {
        sitemap += `  <url>\n    <loc>https://moneycal.in/government-schemes/${scheme.slug}/</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    sitemap += `</urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-gov-schemes.xml'), sitemap, 'utf-8');
    console.log(`🗺️ Generated Gov Schemes Sitemap: /sitemap-gov-schemes.xml (${allSchemes.length + 1} URLs)`);
}

function main() {
    console.log('🚀 Starting Government Schemes Page Generation...\n');
    
    loadSchemeData();
    
    if (allSchemes.length === 0) {
        console.log('❌ No schemes found. Exiting.');
        return;
    }
    
    const schemesDir = path.join(PUBLIC_DIR, 'government-schemes');
    if (!fs.existsSync(schemesDir)) {
        fs.mkdirSync(schemesDir, { recursive: true });
    }
    
    // Generate individual scheme pages
    let successCount = 0;
    allSchemes.forEach(scheme => {
        try {
            const postDir = path.join(schemesDir, scheme.slug);
            if (!fs.existsSync(postDir)) {
                fs.mkdirSync(postDir, { recursive: true });
            }
            const html = buildSchemeHTML(scheme);
            fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf-8');
            console.log(`✅ Generated: /government-schemes/${scheme.slug}/`);
            successCount++;
        } catch (err) {
            console.log(`❌ Error: ${scheme.slug}: ${err.message}`);
        }
    });
    
    // Generate hub page
    const hubHtml = buildHubPage();
    fs.writeFileSync(path.join(schemesDir, 'index.html'), hubHtml, 'utf-8');
    console.log(`✅ Generated Hub: /government-schemes/`);
    
    // Generate sitemap
    generateSchemesSitemap();
    
    console.log(`\n🎉 Gov Schemes generation complete! ${successCount}/${allSchemes.length} pages + 1 hub page.`);
}

main();
