#!/usr/bin/env python3
"""
Generate Clean, Optimized Sitemap
- Removes duplicates
- Adds proper priorities for Google ranking
- Organizes by importance
"""

import re
from datetime import date
from collections import Counter

print("🔍 Analyzing sitemap...")

# Read sitemap
with open('public/sitemap.xml', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all URLs
url_pattern = r'<loc>(.*?)</loc>'
all_urls = re.findall(url_pattern, content)

print(f"📊 Total URLs in sitemap: {len(all_urls)}")

# Get unique URLs
unique_urls = list(dict.fromkeys(all_urls))  # Preserves order, removes duplicates
unique_urls.sort()

print(f"✅ Unique URLs: {len(unique_urls)}")
print(f"🗑️  Duplicates removed: {len(all_urls) - len(unique_urls)}")

def is_indexable(url: str) -> bool:
    u = url.lower()
    blocked = ['/redirect', '/404', '/error', '/duplicate', '/copy', '/admin/', '/private/', '/api/']
    return not any(b in u for b in blocked)

# Remove redirect/non-canonical and blocked URLs
unique_urls = [u for u in unique_urls if is_indexable(u)]
print(f"✅ After filtering blocked patterns: {len(unique_urls)}")

# Function to categorize and prioritize URLs
def get_url_info(url):
    priority = 0.5
    changefreq = "monthly"
    category = "other"
    
    # Homepage - Highest priority
    if url in ["https://moneycal.in/", "https://moneycal.in"]:
        return 1.0, "daily", "homepage"
    
    # Top calculators - Very high priority
    top_calcs = ['emi-calculator', 'sip-calculator', 'income-tax-calculator', 'home-loan-calculator', 
                 'personal-loan-calculator', 'fd-calculator', 'ppf-calculator', 'nps-calculator', 
                 'gst-calculator', 'budget-calculator', 'retirement-calculator', 'mutual-fund-calculator']
    if any(calc in url for calc in top_calcs):
        return 0.9, "weekly", "top-calculator"
    
    # Main hub pages
    if url.endswith(('/tools', '/finance-tools', '/tax-tools', '/gst-tools', '/insurance-tools', 
                     '/corporate-finance', '/loan-tools', '/blog', '/calculators', '/excel-tools', 
                     '/government-schemes', '/crypto', '/astro-finance', '/invoicing-tools')):
        return 0.9, "weekly", "hub"
    
    # All calculators
    if '/calculators/' in url:
        return 0.8, "weekly", "calculator"
    
    # Blog posts
    if '/blog/' in url or '/finance-blog/' in url:
        return 0.7, "weekly", "blog"
    
    # Government schemes
    if '/government-schemes/' in url:
        return 0.7, "monthly", "government-scheme"
    
    # Finance/Tax/GST/Loan/Insurance tools
    if any(tool in url for tool in ['/finance-tools/', '/tax-tools/', '/gst-tools/', '/loan-tools/', '/insurance-tools/']):
        return 0.7, "weekly", "tool"
    
    # Crypto content
    if '/crypto/' in url:
        return 0.6, "monthly", "crypto"
    
    # Excel tools
    if '/excel-tools/' in url or '/exceltool/' in url:
        return 0.6, "monthly", "excel-tool"
    
    # Stock market
    if '/stock-market/' in url:
        return 0.6, "monthly", "stock-market"
    
    # Invoicing tools
    if '/invoicing-tools/' in url:
        return 0.6, "monthly", "invoicing-tool"
    
    # Gold tools
    if '/gold-tools/' in url:
        return 0.6, "weekly", "gold-tool"
    
    # Important static pages
    if url.endswith(('/about-us', '/contact-us', '/privacy-policy', '/terms-of-service', '/disclaimer', '/help-center', '/sitemap')):
        return 0.6, "monthly", "static-page"
    
    # Astro finance
    if '/astro-finance/' in url:
        return 0.5, "monthly", "astro-finance"
    
    # General tools
    if '/tools/' in url:
        return 0.6, "monthly", "tool"
    
    # Festival tools (seasonal - lower priority)
    if '/festival-tools/' in url:
        return 0.4, "yearly", "festival-tool"
    
    # Corporate finance tools
    if '/corporate-finance/' in url:
        return 0.7, "monthly", "corporate-tool"
    
    return priority, changefreq, category

# Categorize all URLs
categorized_urls = []
for url in unique_urls:
    priority, changefreq, category = get_url_info(url)
    categorized_urls.append({
        'url': url,
        'priority': priority,
        'changefreq': changefreq,
        'category': category
    })

# Sort by priority (highest first), then by category
categorized_urls.sort(key=lambda x: (-x['priority'], x['category'], x['url']))

# Generate XML
current_date = date.today().isoformat()

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    '',
    f'  <!-- Generated: {current_date} -->',
    f'  <!-- Total Unique URLs: {len(unique_urls)} (Duplicates removed: {len(all_urls) - len(unique_urls)}) -->',
    '  <!-- Optimized for Google ranking with strategic priorities -->',
    '  <!-- Priority: 1.0=Homepage, 0.9=Top Calculators/Hubs, 0.8=Calculators, 0.7=Blogs/Tools, 0.6=Content, 0.5-0.4=Niche -->',
    ''
]

current_priority = None

for item in categorized_urls:
    # Add comment when priority changes
    if item['priority'] != current_priority:
        priority_labels = {
            1.0: "Homepage - Maximum Priority",
            0.9: "Top Calculators & Hub Pages - Very High Priority",
            0.8: "All Calculators - High Priority",
            0.7: "Blogs, Tools, Government Schemes - High Priority",
            0.6: "Crypto, Excel, Stock Market, Static Pages - Medium Priority",
            0.5: "Astro Finance, Misc - Medium-Low Priority",
            0.4: "Festival Tools (Seasonal) - Low Priority"
        }
        label = priority_labels.get(item['priority'], "Other Pages")
        xml_lines.append(f"\n  <!-- PRIORITY {item['priority']}: {label} -->")
        current_priority = item['priority']
    
    xml_lines.append(f"  <url>")
    xml_lines.append(f"    <loc>{item['url']}</loc>")
    xml_lines.append(f"    <lastmod>{current_date}</lastmod>")
    xml_lines.append(f"    <changefreq>{item['changefreq']}</changefreq>")
    xml_lines.append(f"    <priority>{item['priority']}</priority>")
    xml_lines.append(f"  </url>")

xml_lines.append('</urlset>')

# Join and save
xml_content = '\n'.join(xml_lines)

with open('public/sitemap-clean.xml', 'w', encoding='utf-8') as f:
    f.write(xml_content)

print("\n✅ Clean sitemap generated!")
print(f"📄 File: public/sitemap-clean.xml")
print(f"📊 Unique URLs: {len(unique_urls)}")
print(f"🗑️  Duplicates removed: {len(all_urls) - len(unique_urls)}")

# Show statistics
category_stats = Counter(item['category'] for item in categorized_urls)
print("\n📈 URL Distribution by Category:")
for cat, count in category_stats.most_common():
    print(f"  {cat}: {count} URLs")

# Show priority distribution
priority_stats = Counter(item['priority'] for item in categorized_urls)
print("\n⭐ Priority Distribution:")
for pri in sorted(priority_stats.keys(), reverse=True):
    print(f"  Priority {pri}: {priority_stats[pri]} URLs")

print("\n✅ Done! Review public/sitemap-clean.xml")
print("📝 Next: cp public/sitemap-clean.xml public/sitemap.xml")

