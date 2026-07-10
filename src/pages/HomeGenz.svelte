<svelte:options customElement={{ tag: 'moneycal-home', shadow: 'none' }} />

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import {
    buildSearchDatabase,
    calculatorCategories,
    popularCalculators,
    toolsList,
    resourcesList,
    totalCalculators,
  } from '../data/homeSearchData';

  type SearchItem = {
    name: string;
    path: string;
    category: string;
    keywords: string;
    description: string;
  };

  const dispatch = createEventDispatcher<{ navigate: { path: string } }>();

  let searchQuery = '';
  let debouncedQuery = '';
  let selectedIndex = 0;
  let isSearchFocused = false;
  let searchResults: SearchItem[] = [];
  let showPreview = false;
  let debounceTimer: ReturnType<typeof setTimeout>;

  const quickLinks = [
    {
      name: 'All Calculators',
      path: '/calculators',
      category: 'Navigation',
      keywords: 'tools list finance tools india',
      description: 'Browse every finance tool on MoneyCal.',
    },
    {
      name: 'Loan Tools',
      path: '/loan-tools',
      category: 'Navigation',
      keywords: 'loan tools emi prepayment refinancing',
      description: 'EMI, prepayment, affordability, and refinancing tools.',
    },
    {
      name: 'Tax Tools',
      path: '/tax-tools',
      category: 'Navigation',
      keywords: 'tax tools income tax gst tool',
      description: 'Income tax, GST, and compliance tools.',
    },
    {
      name: 'Finance Tools Hub',
      path: '/finance-tools',
      category: 'Navigation',
      keywords: 'finance tools sip returns investment',
      description: 'Investment planning, SIP, and returns tools.',
    },
    {
      name: 'Learn Finance',
      path: '/learn',
      category: 'Navigation',
      keywords: 'financial education learning center',
      description: 'Structured lessons for Indian finance.',
    },
    {
      name: 'MoneyCal News',
      path: '/news',
      category: 'Navigation',
      keywords: 'finance news india markets',
      description: 'Markets, economy, and startup updates.',
    },
    {
      name: 'Blog Guides',
      path: '/blog',
      category: 'Navigation',
      keywords: 'finance guides blog',
      description: 'Deep dives and practical money guides.',
    },
    {
      name: 'Government Schemes',
      path: '/government-schemes',
      category: 'Navigation',
      keywords: 'govt schemes india subsidies',
      description: 'Eligibility and benefits for schemes.',
    },
    {
      name: 'Personal Finance',
      path: '/personal-finance-management',
      category: 'Navigation',
      keywords: 'personal finance management india',
      description: 'Plan budgets, savings, and goals.',
    },
  ];

  const primarySections = [
    {
      name: 'EMI and Loan Calculators',
      path: '/calculators/emi-calculator',
      count: '50+',
      description: 'EMI, home loan, car loan, and affordability tools.',
      icon: ['M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2', 'M8 9h8', 'M8 13h2', 'M14 13h2', 'M8 17h2', 'M14 17h2'],
    },
    {
      name: 'Investment and Wealth',
      path: '/finance-tools',
      count: '40+',
      description: 'SIP, mutual funds, retirement, and wealth planning.',
      icon: ['M4 18l6-6 4 4 6-8', 'M4 4h16v16H4z'],
    },
    {
      name: 'Tax and GST',
      path: '/tax-tools',
      count: '30+',
      description: 'Income tax, GST, deductions, and compliance tools.',
      icon: ['M6 4h12v4H6z', 'M6 10h12v10H6z', 'M9 13h6', 'M9 16h6'],
    },
    {
      name: 'Learn Finance',
      path: '/learn',
      count: '100+',
      description: 'Guided lessons, checklists, and practical explainers.',
      icon: ['M4 5h14a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2z', 'M8 7h10', 'M8 11h10', 'M8 15h6'],
    },
    {
      name: 'News and Research',
      path: '/news',
      count: 'Daily',
      description: 'Market news, economy updates, and analysis.',
      icon: ['M5 4h14v14H5z', 'M8 8h8', 'M8 12h5'],
    },
    {
      name: 'Business and Corporate',
      path: '/corporate-finance',
      count: '20+',
      description: 'Business tools, working capital, and CFO insights.',
      icon: ['M4 10h16v8H4z', 'M6 6h12v4H6z', 'M8 14h4'],
    },
  ];

  const searchDatabase: SearchItem[] = [
    ...buildSearchDatabase(),
    ...toolsList.map((tool) => ({
      name: tool.name,
      path: tool.path,
      category: 'Tools',
      keywords: `${tool.name} tools`,
      description: `${tool.count} tools available in ${tool.name}.`,
    })),
    ...resourcesList.map((res) => ({
      name: res.name,
      path: res.path,
      category: 'Resources',
      keywords: `${res.name} learning`,
      description: `${res.count} items in ${res.name}.`,
    })),
    ...quickLinks,
  ];

  $: if (searchQuery !== undefined) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => (debouncedQuery = searchQuery.trim()), 120);
  }

  $: searchResults =
    debouncedQuery.length >= 2
      ? searchDatabase
          .filter((item) => {
            const q = debouncedQuery.toLowerCase();
            return (
              item.name.toLowerCase().includes(q) ||
              item.category.toLowerCase().includes(q) ||
              item.keywords.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q)
            );
          })
          .slice(0, 12)
      : [];

  $: showPreview = searchResults.length > 0 && debouncedQuery.length >= 2 && isSearchFocused;

  $: debouncedQuery, (selectedIndex = 0);
  $: if (searchResults.length > 0 && selectedIndex >= searchResults.length) {
    selectedIndex = searchResults.length - 1;
  }

  const goTo = (path: string) => {
    searchQuery = '';
    isSearchFocused = false;
    dispatch('navigate', { path });
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (!showPreview) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % searchResults.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex = (searchResults.length + selectedIndex - 1) % searchResults.length;
    } else if (event.key === 'Enter' && searchResults.length > 0) {
      event.preventDefault();
      goTo(searchResults[selectedIndex]?.path ?? searchResults[0].path);
    } else if (event.key === 'Escape') {
      isSearchFocused = false;
    }
  };

  const handleDelegateClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest?.('a[data-navigate]');
    if (target instanceof HTMLAnchorElement && target.href) {
      event.preventDefault();
      const path = new URL(target.href).pathname;
      dispatch('navigate', { path });
    }
  };

  let searchContainer: HTMLDivElement;
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (searchContainer && !searchContainer.contains(target)) {
      isSearchFocused = false;
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
</script>

<main class="home" on:click={handleDelegateClick} aria-label="MoneyCal home page">
  <header class="hero" aria-labelledby="hero-title">
    <div class="hero-left">
      <span class="eyebrow">MoneyCal India - Trusted Finance Tools & Insights</span>
      <h1 id="hero-title">Trusted EMI tools, SIP tools, and tax tools for India</h1>
      <p class="hero-sub">
        MoneyCal helps you plan loans, investments, and taxes with 200+ finance tools and guides. Built with transparent
        assumptions and clear navigation, every section is linked from this home page so users can move with confidence.
      </p>
      <div class="hero-actions">
        <a class="btn primary" href="/calculators/emi-calculator" data-navigate>Try EMI Tool</a>
        <a class="btn ghost" href="/calculators" data-navigate>Browse all tools</a>
        <a class="btn ghost" href="/learn" data-navigate>Start learning finance</a>
      </div>
      <div class="hero-stats">
        <div>
          <strong>{totalCalculators}+</strong>
          <span>Financial tools</span>
        </div>
        <div>
          <strong>200+</strong>
          <span>Tools and utilities</span>
        </div>
        <div>
          <strong>100+</strong>
          <span>Lessons and guides</span>
        </div>
      </div>
    </div>
    <div class="hero-right">
      <div class="search-card" bind:this={searchContainer}>
        <label for="site-search" class="search-label">Search everything on MoneyCal</label>
        <div class="search-bar" role="search">
          <input
            id="site-search"
            type="search"
            placeholder="Search EMI tools, SIP tools, tax tools, learn..."
            bind:value={searchQuery}
            on:focus={() => (isSearchFocused = true)}
            on:keydown={handleKeydown}
            aria-controls="search-preview"
            aria-expanded={showPreview}
            autocomplete="off"
          />
          <button type="button" class="search-button" on:click={() => (searchQuery = '')} aria-label="Clear search">
            Clear
          </button>
        </div>
        {#if showPreview}
          <div class="search-preview" id="search-preview" role="listbox">
            <div class="search-preview-header">
              <span>{searchResults.length} results</span>
              <span class="hint">Use arrow keys, enter, escape</span>
            </div>
            <div class="search-preview-list">
              {#each searchResults as result, index}
                <button
                  type="button"
                  class:selected={index === selectedIndex}
                  on:click={() => goTo(result.path)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <span class="result-name">{result.name}</span>
                  <span class="result-meta">{result.category}</span>
                  <span class="result-desc">{result.description}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}
        <div class="search-hints">
          {#each popularCalculators as calc}
            <a href={calc.path} data-navigate>{calc.name}</a>
          {/each}
        </div>
      </div>
      <div class="hero-panels">
        {#each primarySections as section}
          <a class="panel" href={section.path} data-navigate>
            <div class="panel-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {#each section.icon as path}
                  <path d={path} />
                {/each}
              </svg>
            </div>
            <div>
              <h3>{section.name}</h3>
              <p>{section.description}</p>
              <span>{section.count}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </header>

  <section class="section" id="tools-index">
    <div class="section-header">
      <div>
        <h2>Tool categories</h2>
        <p>Find the exact tool for loans, tax, investments, insurance, and more.</p>
      </div>
      <a class="link" href="/calculators" data-navigate>View all tools</a>
    </div>
    <div class="category-grid">
      {#each calculatorCategories as category}
        <a class="category-card" href={`/calculators/category/${category.id}`} data-navigate>
          <h3>{category.name.replace('Calculators', 'Tools')}</h3>
          <p>{category.description.replace(/calculators/gi, 'tools')}</p>
          <span>{category.calculators.length} tools</span>
          <div class="mini-list">
            {#each category.calculators.slice(0, 4) as calc}
              <span>{calc.name}</span>
            {/each}
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="section" id="tools">
    <div class="section-header">
      <div>
        <h2>Tools and utilities</h2>
        <p>Jump straight into high-impact finance tools built for Indian users.</p>
      </div>
      <a class="link" href="/tools" data-navigate>Explore all tools</a>
    </div>
    <div class="pill-grid">
      {#each toolsList as tool}
        <a class="pill" href={tool.path} data-navigate>
          <strong>{tool.name}</strong>
          <span>{tool.count}</span>
        </a>
      {/each}
    </div>
  </section>

  <section class="section" id="resources">
    <div class="section-header">
      <div>
        <h2>Learn, read, and stay updated</h2>
        <p>Guides, lessons, news, and schemes - all in one finance ecosystem.</p>
      </div>
      <a class="link" href="/learn" data-navigate>Go to learning hub</a>
    </div>
    <div class="resource-grid">
      {#each resourcesList as resource}
        <a class="resource-card" href={resource.path} data-navigate>
          <h3>{resource.name}</h3>
          <p>{resource.count} resources</p>
          <span>Open {resource.name}</span>
        </a>
      {/each}
    </div>
  </section>

  <section class="section" id="directory">
    <div class="section-header">
      <div>
        <h2>MoneyCal navigation directory</h2>
        <p>Every major section, linked for both users and search engines.</p>
      </div>
    </div>
    <div class="directory-grid">
      <div class="directory-card">
        <h3>Quick entry points</h3>
        <ul>
          {#each quickLinks as link}
            <li><a href={link.path} data-navigate>{link.name}</a></li>
          {/each}
        </ul>
      </div>
      <div class="directory-card">
        <h3>Top finance tools</h3>
        <ul>
          <li><a href="/calculators/emi-calculator" data-navigate>EMI tool</a></li>
          <li><a href="/calculators/sip-calculator" data-navigate>SIP tool</a></li>
          <li><a href="/calculators/income-tax-calculator" data-navigate>Income tax tool</a></li>
          <li><a href="/calculators/gst-calculator" data-navigate>GST tool</a></li>
          <li><a href="/calculators/home-loan-calculator" data-navigate>Home loan tool</a></li>
          <li><a href="/calculators/personal-loan-calculator" data-navigate>Personal loan tool</a></li>
        </ul>
      </div>
      <div class="directory-card">
        <h3>Finance learning tracks</h3>
        <ul>
          <li><a href="/learn/loans/what-is-emi" data-navigate>What is EMI</a></li>
          <li><a href="/learn/home-loans/emi-calculator-guide" data-navigate>Home loan EMI guide</a></li>
          <li><a href="/learn/money-management/budgeting-how-to-track-income-expenses-india" data-navigate>Budgeting guide</a></li>
          <li><a href="/learn/investing-wealth" data-navigate>Investing basics</a></li>
          <li>
            <a
              href="/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india"
              data-navigate
            >
              Section 80C guide
            </a>
          </li>
          <li><a href="/learn/savings-bank-products" data-navigate>Savings and banking</a></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section" id="seo">
    <div class="section-header">
      <div>
        <h2>Why MoneyCal is built for Google and for India</h2>
        <p>Clear structure, useful content, and internal links help Google understand and rank MoneyCal.</p>
      </div>
    </div>
    <div class="seo-grid">
      <div class="seo-card">
        <h3>Structured finance content</h3>
        <p>
          MoneyCal organizes every tool and guide under clear categories. This helps Google discover pages like EMI tools
          in India, SIP tools, tax tools, and loan affordability tools. You can reach any page
          from the home directory in one click.
        </p>
      </div>
      <div class="seo-card">
        <h3>Fast, modern, and mobile-ready</h3>
        <p>
          The UI is optimized for speed with lightweight sections, reusable blocks, and adaptive layouts. Animations are
          subtle and respect reduced motion preferences to keep performance high.
        </p>
      </div>
      <div class="seo-card">
        <h3>Intent-focused search</h3>
        <p>
          The search bar surfaces tools, blogs, and learn pages across the codebase. This improves user
          engagement and signals page relevance for finance keywords that Indians search daily.
        </p>
      </div>
      <div class="seo-card">
        <h3>Trusted internal linking</h3>
        <p>
          Internal links connect tools to guides, tools to news, and learning paths to action pages. This
          architecture improves crawl depth and makes it easy for users to navigate the entire finance platform.
        </p>
      </div>
    </div>
  </section>

  <section class="section" id="faq">
    <div class="section-header">
      <div>
        <h2>Frequently asked questions</h2>
        <p>Answers to common questions about MoneyCal and its financial tools.</p>
      </div>
    </div>
    <div class="faq-grid">
      <details>
        <summary>What can I do on MoneyCal?</summary>
        <p>
          You can calculate EMIs, compare loans, plan investments, estimate taxes, read finance guides, and access
          government scheme explainers. All tools are free and optimized for Indian users.
        </p>
      </details>
      <details>
        <summary>How is MoneyCal different from other finance websites?</summary>
        <p>
          MoneyCal combines tools, learning content, and news in one place. Every section is linked from the
          home page, so you can navigate the full codebase quickly without getting lost.
        </p>
      </details>
      <details>
        <summary>Is MoneyCal mobile friendly and fast?</summary>
        <p>
          Yes. The UI uses lightweight sections, CSS animations, and responsive grids to keep the site fast on mobile,
          tablet, and desktop screens.
        </p>
      </details>
      <details>
        <summary>Does MoneyCal include RBI and tax guidance?</summary>
        <p>
          We link to official resources and provide structured learning guides for loans, taxation, savings, and
          investing. Always verify with official sources for compliance.
        </p>
      </details>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
  }
  .home {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #0f172a;
    background: #f8fafc;
  }
  .hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 2.5rem 1.5rem;
    background: radial-gradient(circle at top left, #e0f2fe 0%, #f8fafc 45%, #ede9fe 100%);
    position: relative;
    overflow: hidden;
  }
  .hero::after {
    content: '';
    position: absolute;
    top: -120px;
    right: -120px;
    width: 280px;
    height: 280px;
    background: rgba(59, 130, 246, 0.15);
    filter: blur(0);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
  }
  .hero::before {
    content: '';
    position: absolute;
    bottom: -140px;
    left: -140px;
    width: 320px;
    height: 320px;
    background: rgba(14, 165, 233, 0.12);
    border-radius: 50%;
    animation: float 10s ease-in-out infinite;
  }
  .hero-left {
    position: relative;
    z-index: 2;
  }
  .eyebrow {
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    color: #2563eb;
  }
  .hero-left h1 {
    font-size: clamp(2.1rem, 4vw, 3.2rem);
    margin: 0.5rem 0 1rem;
    line-height: 1.15;
  }
  .hero-sub {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: #475569;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .btn {
    padding: 0.7rem 1.4rem;
    border-radius: 999px;
    font-weight: 600;
    text-decoration: none;
    font-size: 0.9rem;
    border: 1px solid transparent;
  }
  .btn.primary {
    background: #2563eb;
    color: #fff;
  }
  .btn.ghost {
    background: #fff;
    border-color: #c7d2fe;
    color: #1d4ed8;
  }
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .hero-stats div {
    background: #fff;
    border-radius: 1rem;
    padding: 0.9rem 1.1rem;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  }
  .hero-stats strong {
    display: block;
    font-size: 1.3rem;
  }
  .hero-stats span {
    color: #64748b;
    font-size: 0.85rem;
  }
  .hero-right {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 1.5rem;
  }
  .search-card {
    background: #fff;
    border-radius: 1.25rem;
    padding: 1.5rem;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
    position: relative;
  }
  .search-label {
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
  }
  .search-bar {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .search-bar input {
    flex: 1;
    border-radius: 0.8rem;
    border: 1px solid #e2e8f0;
    padding: 0.7rem 0.9rem;
  }
  .search-button {
    border-radius: 0.8rem;
    padding: 0.6rem 0.9rem;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    font-weight: 600;
    color: #1e293b;
  }
  .search-preview {
    position: absolute;
    left: 1.5rem;
    right: 1.5rem;
    top: 110px;
    background: #fff;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    box-shadow: 0 24px 50px rgba(15, 23, 42, 0.18);
    z-index: 20;
    overflow: hidden;
  }
  .search-preview-header {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
    color: #64748b;
    background: #f8fafc;
  }
  .search-preview-list {
    max-height: 320px;
    overflow-y: auto;
  }
  .search-preview-list button {
    display: grid;
    gap: 0.2rem;
    width: 100%;
    text-align: left;
    border: none;
    padding: 0.7rem 1rem;
    background: #fff;
    cursor: pointer;
  }
  .search-preview-list button.selected,
  .search-preview-list button:hover {
    background: #eff6ff;
  }
  .result-name {
    font-weight: 600;
  }
  .result-meta {
    font-size: 0.75rem;
    color: #2563eb;
  }
  .result-desc {
    font-size: 0.8rem;
    color: #64748b;
  }
  .search-hints {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .search-hints a {
    background: #f1f5f9;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    text-decoration: none;
    color: #0f172a;
    font-weight: 600;
  }
  .hero-panels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }
  .panel {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8rem;
    background: #0f172a;
    color: #fff;
    border-radius: 1rem;
    padding: 1rem;
    text-decoration: none;
  }
  .panel span {
    font-size: 0.75rem;
    color: #cbd5f5;
  }
  .panel-icon {
    width: 42px;
    height: 42px;
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.12);
    display: grid;
    place-items: center;
  }
  .panel svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: #fff;
    stroke-width: 1.6;
  }
  .section {
    padding: 2rem 1.5rem;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-end;
    margin-bottom: 1.5rem;
  }
  .section-header h2 {
    margin: 0 0 0.4rem;
  }
  .section-header p {
    margin: 0;
    color: #475569;
  }
  .link {
    text-decoration: none;
    font-weight: 600;
    color: #2563eb;
  }
  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
  .category-card {
    background: #fff;
    padding: 1.2rem;
    border-radius: 1rem;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    text-decoration: none;
    color: inherit;
    display: grid;
    gap: 0.6rem;
  }
  .category-card span {
    font-size: 0.8rem;
    color: #2563eb;
    font-weight: 600;
  }
  .mini-list {
    display: grid;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: #64748b;
  }
  .pill-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.8rem;
  }
  .pill {
    background: #0f172a;
    color: #fff;
    border-radius: 999px;
    padding: 0.6rem 1rem;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }
  .pill span {
    color: #94a3b8;
  }
  .resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }
  .resource-card {
    background: #fff;
    padding: 1.1rem;
    border-radius: 1rem;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  }
  .resource-card span {
    color: #2563eb;
    font-weight: 600;
    font-size: 0.85rem;
  }
  .directory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }
  .directory-card {
    background: #fff;
    padding: 1.2rem;
    border-radius: 1rem;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  }
  .directory-card ul {
    padding-left: 1rem;
    margin: 0.6rem 0 0;
    display: grid;
    gap: 0.4rem;
  }
  .directory-card a {
    text-decoration: none;
    color: #0f172a;
  }
  .seo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }
  .seo-card {
    background: #fff;
    padding: 1.2rem;
    border-radius: 1rem;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  }
  .faq-grid {
    display: grid;
    gap: 1rem;
  }
  .faq-grid details {
    background: #fff;
    border-radius: 0.9rem;
    padding: 0.8rem 1rem;
    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
  }
  .faq-grid summary {
    cursor: pointer;
    font-weight: 600;
  }
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero::before,
    .hero::after {
      animation: none;
    }
  }
  @media (max-width: 768px) {
    .hero,
    .section {
      padding: 1.6rem 1rem;
    }
    .section-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .search-preview {
      position: static;
      margin-top: 1rem;
    }
  }
</style>
