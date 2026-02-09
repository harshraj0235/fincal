<script lang="ts">
  const title = 'MoneyCal.in – Free Tax, Gold, GST & Finance Calculators | 200+ Tools India';
  const description = "India's #1 financial tools hub. Free EMI, SIP, Income Tax, GST, Gold, PPF, FD calculators. Tax tools, loan tools, festival tools. Easy to find any calculator – user & Google friendly.";

  let searchQuery = '';
  let activeTab: 'calculators' | 'tools' | 'resources' = 'calculators';
  let selectedCategory: string | null = null;

  const totalCalculators = 200;

  const QUICK_LINKS = [
    { name: 'Calculators', path: '/calculators', icon: '📊' },
    { name: 'Learn', path: '/learn', icon: '📖' },
    { name: 'Blog', path: '/blog', icon: '📝' },
    { name: 'News', path: '/news', icon: '📰' },
    { name: 'Govt Schemes', path: '/government-schemes', icon: '🎁' },
    { name: 'Crypto', path: '/crypto', icon: '₿' },
  ];

  const TOOL_HUB_LINKS = [
    { name: 'Tax Tools', path: '/tax-tools', keywords: 'income tax, TDS, GST', color: 'emerald' },
    { name: 'Gold Tools', path: '/gold-tools', keywords: 'gold loan, gold price', color: 'amber' },
    { name: 'GST Tools', path: '/gst-tools', keywords: 'GST, invoice', color: 'violet' },
    { name: 'Finance Tools', path: '/finance-tools', keywords: 'SIP, mutual fund, FD', color: 'blue' },
    { name: 'Excel Tools', path: '/excel-tools', keywords: 'Excel, spreadsheet', color: 'green' },
    { name: 'Bank Tools', path: '/bank-tools', keywords: 'IFSC, ATM, bank', color: 'cyan' },
    { name: 'Loan Tools', path: '/loan-tools', keywords: 'EMI, home loan, personal loan', color: 'rose' },
    { name: 'Insurance Tools', path: '/insurance-tools', keywords: 'term, health insurance', color: 'pink' },
    { name: 'Festival Tools', path: '/festival-tools', keywords: 'festival dates, panchang', color: 'orange' },
    { name: 'All Tools', path: '/tools', keywords: '200+ tools', color: 'slate' },
  ];

  const popularCalculators = [
    { id: 'emi-calculator', name: 'EMI Calculator', path: '/calculators/emi-calculator' },
    { id: 'sip-calculator', name: 'SIP Calculator', path: '/calculators/sip-calculator' },
    { id: 'income-tax-calculator', name: 'Income Tax', path: '/calculators/income-tax-calculator' },
    { id: 'gst-calculator', name: 'GST Calculator', path: '/calculators/gst-calculator' },
    { id: 'ppf-calculator', name: 'PPF Calculator', path: '/calculators/ppf-calculator' },
    { id: 'fd-calculator', name: 'FD Calculator', path: '/calculators/fd-calculator' },
    { id: 'home-loan-calculator', name: 'Home Loan', path: '/calculators/home-loan-calculator' },
    { id: 'gold-investment-calculator', name: 'Gold Investment', path: '/calculators/gold-investment-calculator' },
  ];

  const calculatorCategories = [
    { id: 'loan', name: 'Loan Calculators', count: 12 },
    { id: 'investment', name: 'Investment Calculators', count: 15 },
    { id: 'tax', name: 'Tax Calculators', count: 10 },
    { id: 'retirement', name: 'Retirement Calculators', count: 6 },
    { id: 'business', name: 'Business Calculators', count: 8 },
  ];

  const resources = [
    { name: 'Learn Finance', path: '/learn', desc: 'Loans, credit, investment guides' },
    { name: 'Blog', path: '/blog', desc: 'Articles & tips' },
    { name: 'News', path: '/news', desc: 'Market & business news' },
    { name: 'Govt Schemes', path: '/government-schemes', desc: 'Subsidies & schemes' },
    { name: 'Crypto', path: '/crypto', desc: 'Crypto guides' },
    { name: 'Astro Finance', path: '/astro-finance', desc: 'Horoscope & finance' },
  ];

  const whyCards = [
    { title: '100% Free', desc: 'All tools free forever' },
    { title: 'Secure', desc: 'No data stored' },
    { title: 'SEO friendly', desc: 'Easy to find any tool' },
    { title: 'Fast', desc: 'Lightning-fast search' },
  ];
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="https://moneycal.in/" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://moneycal.in" />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="home">
  <!-- Hero -->
  <section class="hero">
    <div class="hero-pattern"></div>
    <div class="hero-inner">
      <div class="badge">🔥 {totalCalculators}+ free tools • Tax, Gold, GST, Loans & more</div>
      <h1 class="hero-title">Find any financial tool <span class="gradient-text">in one search</span></h1>
      <p class="hero-sub">Calculators, tax tools, gold, GST, loans, insurance – everything for India. Fast, free, SEO-friendly.</p>
      <form class="search-form" on:submit|preventDefault>
        <input type="search" bind:value={searchQuery} placeholder="Search calculators, tax, gold, GST, blog, news..." class="search-input" aria-label="Search all tools" />
      </form>
    </div>
  </section>

  <!-- Quick nav -->
  <section class="quick-nav">
    <div class="quick-nav-inner">
      <a href="/news/shorts" class="btn-shorts">▶ Money Shorts</a>
      {#each QUICK_LINKS as link}
        <a href={link.path} class="quick-link">{link.icon} {link.name}</a>
      {/each}
    </div>
  </section>

  <!-- Money Shorts CTA -->
  <section class="money-shorts">
    <div class="money-shorts-inner">
      <div class="money-shorts-text">
        <span class="tag">News in 60 seconds</span>
        <h2>Money Shorts</h2>
        <p>Swipe through finance news like Inshorts. One card per story — markets, RBI, economy.</p>
      </div>
      <a href="/news/shorts" class="btn-open">Open & scroll</a>
    </div>
  </section>

  <!-- About -->
  <section class="about">
    <h2 id="about-heading">About MoneyCal.in – Free Financial Calculators & Tools for India</h2>
    <div class="prose">
      <p>MoneyCal is India's free hub for financial calculators and tools. Whether you need to plan a home loan EMI, compare SIP returns, estimate income tax under the new slabs, or calculate GST on an invoice, you can do it here without sign-up or fees.</p>
      <p>We offer 200+ tools across tax, gold, GST, loans, insurance, banking, and investments. Our <strong>Blog</strong> and <strong>Learn</strong> sections publish original articles and guides. <strong>News</strong> and <strong>Money Shorts</strong> keep you updated on markets, RBI, and economy.</p>
      <p>Use the search bar above to find any calculator or article, or browse by category. See our <a href="/about-us">About Us</a>, <a href="/contact-us">Contact</a>, <a href="/privacy-policy">Privacy Policy</a>, and <a href="/disclaimer">Disclaimer</a>.</p>
    </div>
  </section>

  <!-- Explore by category -->
  <section class="explore" id="explore">
    <h2>Explore by category</h2>
    <div class="tool-grid">
      {#each TOOL_HUB_LINKS as tool}
        <a href={tool.path} class="tool-card tool-{tool.color}">
          <span class="tool-name">{tool.name}</span>
          <span class="tool-keywords">{tool.keywords}</span>
        </a>
      {/each}
    </div>
  </section>

  <!-- Tabs -->
  <section class="tabs-wrap">
    <div class="tabs">
      <button class="tab" class:active={activeTab === 'calculators'} on:click={() => activeTab = 'calculators'}>📊 Calculators ({totalCalculators}+)</button>
      <button class="tab" class:active={activeTab === 'tools'} on:click={() => activeTab = 'tools'}>🔧 Tools</button>
      <button class="tab" class:active={activeTab === 'resources'} on:click={() => activeTab = 'resources'}>📁 Resources</button>
    </div>
  </section>

  {#if activeTab === 'calculators'}
    <section class="section" id="calculators-section">
      <div class="section-head">
        <h2>Popular calculators</h2>
        <a href="/calculators">View all →</a>
      </div>
      <div class="calc-grid">
        {#each popularCalculators as c}
          <a href={c.path} class="calc-card">{c.name}</a>
        {/each}
      </div>
      <div class="category-pills">
        <button class="pill" class:active={selectedCategory === null} on:click={() => selectedCategory = null}>All</button>
        {#each calculatorCategories as cat}
          <button class="pill" class:active={selectedCategory === cat.id} on:click={() => selectedCategory = cat.id}>{cat.name.split(' ')[0]} ({cat.count})</button>
        {/each}
      </div>
      {#each calculatorCategories.filter(c => !selectedCategory || c.id === selectedCategory) as cat}
        <h3 class="cat-title">{cat.name} ({cat.count})</h3>
        <p class="cat-desc">Use the Calculators page to see all {cat.name.toLowerCase()}.</p>
      {/each}
    </section>
  {/if}

  {#if activeTab === 'tools'}
    <section class="section">
      <h2>All tool hubs</h2>
      <div class="tool-list">
        {#each TOOL_HUB_LINKS as tool}
          <a href={tool.path} class="tool-row">
            <span class="tool-name">{tool.name}</span>
            <span class="tool-keywords">{tool.keywords}</span>
            <span class="arrow">→</span>
          </a>
        {/each}
      </div>
      <p class="internal-link">Use the search bar above to find tax, gold, GST, loan, or any tool. Every tool is linked from the <a href="/tools">Tools Hub</a>.</p>
    </section>
  {/if}

  {#if activeTab === 'resources'}
    <section class="section">
      <h2>Discover more</h2>
      <div class="resource-grid">
        {#each resources as r}
          <a href={r.path} class="resource-card">
            <h3>{r.name}</h3>
            <p>{r.desc}</p>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Why MoneyCal -->
  <section class="why" id="why">
    <h2>Why users & Google love MoneyCal</h2>
    <div class="why-grid">
      {#each whyCards as card}
        <div class="why-card">
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .home {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #fff, rgba(239, 246, 255, 0.3));
  }

  .hero {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #0f172a, #1e3a8a, #312e81);
    color: white;
    padding: clamp(2.5rem, 8vw, 5rem) 1rem clamp(2rem, 5vw, 3rem);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  }
  .hero-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.6;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-inner {
    position: relative;
    max-width: 56rem;
    margin: 0 auto;
    text-align: center;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  .hero-title {
    font-size: clamp(2rem, 5vw, 3.75rem);
    font-weight: 800;
    letter-spacing: -0.025em;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  .gradient-text {
    display: block;
    background: linear-gradient(90deg, #fcd34d, #fef3c7, #fcd34d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: 1.125rem;
    color: #cbd5e1;
    max-width: 42rem;
    margin: 0 auto 2rem;
  }
  .search-form {
    max-width: 42rem;
    margin: 0 auto;
  }
  .search-input {
    width: 100%;
    padding: 1rem 3rem;
    border-radius: 1rem;
    border: none;
    background: white;
    color: #0f172a;
    font-size: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  .search-input::placeholder {
    color: #94a3b8;
  }

  .quick-nav {
    position: sticky;
    top: 3.5rem;
    z-index: 30;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    padding: 0.75rem 1rem;
  }
  .quick-nav-inner {
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .btn-shorts {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    min-height: 44px;
    box-sizing: border-box;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    background: linear-gradient(90deg, #f59e0b, #f97316);
    color: white;
    text-decoration: none;
    box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.3);
  }
  .btn-shorts:hover {
    opacity: 0.95;
  }
  .quick-link {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1rem;
    min-height: 44px;
    box-sizing: border-box;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #334155;
    text-decoration: none;
  }
  .quick-link:hover {
    background: #f1f5f9;
    color: #2563eb;
  }

  .money-shorts {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #0f172a, #1e293b, rgba(120, 53, 15, 0.3));
    padding: 2.5rem 1rem;
    border-bottom: 1px solid #e2e8f0;
  }
  .money-shorts-inner {
    position: relative;
    max-width: 56rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .money-shorts-inner {
      flex-direction: row;
    }
  }
  .tag {
    display: inline-block;
    color: #fbbf24;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }
  .money-shorts h2 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }
  .money-shorts p {
    color: #cbd5e1;
    max-width: 36rem;
  }
  .btn-open {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
    background: #f59e0b;
    color: #0f172a;
    font-weight: 700;
    font-size: 1.125rem;
    text-decoration: none;
    box-shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.4);
  }
  .btn-open:hover {
    background: #fbbf24;
  }

  .about {
    padding: 2.5rem 1rem;
    background: white;
    border-bottom: 1px solid #f1f5f9;
  }
  .about h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1rem;
  }
  .prose {
    max-width: 56rem;
    margin: 0 auto;
    color: #334155;
    line-height: 1.75;
  }
  .prose p {
    margin-bottom: 1rem;
  }
  .prose a {
    color: #2563eb;
    font-weight: 500;
  }
  .prose a:hover {
    text-decoration: underline;
  }

  .explore {
    padding: 2.5rem 1rem;
    background: white;
    border-bottom: 1px solid #f1f5f9;
  }
  .explore h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .tool-grid {
    max-width: 80rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
  .tool-card {
    padding: 1.25rem;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    text-decoration: none;
    color: #0f172a;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .tool-card:hover {
    border-color: transparent;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  }
  .tool-name {
    display: block;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  .tool-keywords {
    font-size: 0.75rem;
    color: #64748b;
  }

  .tabs-wrap {
    background: rgba(248, 250, 252, 0.5);
    border-bottom: 1px solid #f1f5f9;
  }
  .tabs {
    max-width: 80rem;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
  }
  .tab {
    padding: 0.75rem 1.5rem;
    min-height: 44px;
    box-sizing: border-box;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    white-space: nowrap;
    border: 1px solid #e2e8f0;
    background: white;
    color: #475569;
    cursor: pointer;
  }
  .tab:hover {
    background: #f1f5f9;
  }
  .tab.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
  }

  .section {
    padding: 2rem 1rem;
    background: white;
  }
  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  .section h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }
  .section-head a {
    font-size: 0.875rem;
    font-weight: 500;
    color: #2563eb;
  }
  .section-head a:hover {
    color: #1d4ed8;
  }
  .calc-grid {
    max-width: 80rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .calc-card {
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    text-align: center;
    text-decoration: none;
    color: #0f172a;
    font-weight: 600;
    font-size: 0.875rem;
  }
  .calc-card:hover {
    border-color: #93c5fd;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  .category-pills {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .pill {
    padding: 0.625rem 1rem;
    min-height: 44px;
    box-sizing: border-box;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    border: 1px solid #e2e8f0;
    background: white;
    color: #475569;
    cursor: pointer;
  }
  .pill.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
  }
  .cat-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }
  .cat-desc {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 1.5rem;
  }
  .tool-list {
    max-width: 80rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }
  .tool-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    border-radius: 1rem;
    border: 2px solid #e2e8f0;
    text-decoration: none;
    color: #0f172a;
  }
  .tool-row:hover {
    border-color: #3b82f6;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }
  .tool-row .arrow {
    margin-left: auto;
    color: #94a3b8;
  }
  .internal-link {
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #475569;
  }
  .internal-link a {
    color: #2563eb;
  }
  .resource-grid {
    max-width: 80rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
  .resource-card {
    padding: 1.25rem;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    text-decoration: none;
    color: #0f172a;
  }
  .resource-card:hover {
    border-color: #93c5fd;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }
  .resource-card h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  .resource-card p {
    font-size: 0.875rem;
    color: #64748b;
  }

  .why {
    padding: 3rem 1rem;
    background: linear-gradient(135deg, #f8fafc, rgba(239, 246, 255, 0.3));
    border-top: 1px solid #e2e8f0;
  }
  .why h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    text-align: center;
    margin-bottom: 2rem;
  }
  .why-grid {
    max-width: 80rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  .why-card {
    text-align: center;
    padding: 1rem;
    border-radius: 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  .why-card h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }
  .why-card p {
    font-size: 0.875rem;
    color: #475569;
  }
</style>
