<svelte:options customElement="moneycal-home" />

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import {
    buildSearchDatabase,
    calculatorCategories,
    totalCalculators,
    popularCalculators,
    toolsList,
    resourcesList,
  } from '../data/homeSearchData';

  const dispatch = createEventDispatcher<{ navigate: { path: string } }>();

  let searchQuery = '';
  let debouncedQuery = '';
  let selectedIndex = 0;
  let isSearchFocused = false;
  let selectedCategory: string | null = null;
  let activeTab: 'calculators' | 'tools' | 'resources' = 'calculators';
  let searchContainer: HTMLDivElement;

  const searchDatabase = buildSearchDatabase();
  let debounceTimer: ReturnType<typeof setTimeout>;

  $: if (searchQuery !== undefined) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => (debouncedQuery = searchQuery.trim()), 120);
  }

  $: searchResults =
    debouncedQuery.length >= 2
      ? searchDatabase
          .filter(
            (item) =>
              item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              item.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              (item.keywords && item.keywords.toLowerCase().includes(debouncedQuery.toLowerCase())) ||
              (item.description && item.description.toLowerCase().includes(debouncedQuery.toLowerCase())) ||
              item.path.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
          .slice(0, 12)
      : [];

  $: showPreview = searchResults.length > 0 && searchQuery.length >= 2 && isSearchFocused;

  $: debouncedQuery, (selectedIndex = 0);
  $: if (searchResults.length > 0 && selectedIndex >= searchResults.length) selectedIndex = searchResults.length - 1;

  $: filteredCategories = selectedCategory
    ? calculatorCategories.filter((c) => c.id === selectedCategory)
    : calculatorCategories;

  function goTo(path: string) {
    searchQuery = '';
    isSearchFocused = false;
    dispatch('navigate', { path });
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!showPreview) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % searchResults.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (searchResults.length + selectedIndex - 1) % searchResults.length;
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      goTo(searchResults[selectedIndex]?.path ?? searchResults[0].path);
    } else if (e.key === 'Escape') {
      isSearchFocused = false;
    }
  }

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as Node;
    if (searchContainer && !searchContainer.contains(target)) isSearchFocused = false;
  }

  function handleDelegateClick(e: MouseEvent) {
    const target = (e.target as HTMLElement).closest?.('a[data-navigate]');
    if (target instanceof HTMLAnchorElement && target.href) {
      e.preventDefault();
      const path = new URL(target.href).pathname;
      dispatch('navigate', { path });
    }
  }

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });
  onDestroy(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });
</script>

<div class="home min-h-screen bg-slate-50/60" onclick={handleDelegateClick} role="presentation">
  <!-- Hero -->
  <section class="hero relative overflow-hidden pt-6 pb-8 sm:pt-8 sm:pb-10 safe-top">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="hero-inner relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="hero-title">
          Free financial tools
          <span class="text-emerald-600"> for India</span>
        </h1>
        <p class="hero-sub">{totalCalculators}+ calculators • Expert guides • Always free</p>

        <!-- Search: preview ABOVE the bar -->
        <div class="search-wrap" bind:this={searchContainer} role="search">
          <form
            class="search-form"
            onsubmit={(e) => {
              e.preventDefault();
              if (searchResults.length > 0) goTo(searchResults[selectedIndex]?.path ?? searchResults[0].path);
            }}
          >
            <!-- Preview panel ABOVE search bar -->
            {#if showPreview}
              <div class="search-preview" id="search-preview" role="listbox">
                <div class="search-preview-header">
                  <span>{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
                  <span class="hint">↑↓ navigate · Enter open · Esc close</span>
                </div>
                <div class="search-preview-list">
                  {#each searchResults as result, i}
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === selectedIndex}
                      class="search-preview-item"
                      class:selected={i === selectedIndex}
                      onclick={() => goTo(result.path)}
                    >
                      <span class="item-content">
                        <span class="item-name">{result.name}</span>
                        <span class="item-cat">{result.category}</span>
                      </span>
                      <span class="item-chevron" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                      </span>
                    </button>
                  {/each}
                </div>
              </div>
            {/if}

            <div class="search-bar">
              <span class="search-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </span>
              <input
                type="search"
                bind:value={searchQuery}
                onfocus={() => (isSearchFocused = true)}
                onkeydown={handleKeydown}
                placeholder="Search calculators, tools, articles…"
                class="search-input"
                autocomplete="off"
                aria-label="Search calculators and articles"
                aria-expanded={showPreview}
                aria-controls="search-preview"
              />
              {#if searchQuery}
                <button
                  type="button"
                  class="search-clear"
                  aria-label="Clear search"
                  onclick={() => (searchQuery = '')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              {/if}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Tabs -->
  <section class="tabs sticky top-16 z-30 safe-top">
    <div class="tabs-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="tabs-row">
        <button
          type="button"
          class="tab"
          class:active={activeTab === 'calculators'}
          onclick={() => (activeTab = 'calculators')}
        >
          <span class="tab-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 12h8M8 18h4"/></svg></span>
          Calculators ({totalCalculators}+)
        </button>
        <button type="button" class="tab" class:active={activeTab === 'tools'} onclick={() => (activeTab = 'tools')}>
          <span class="tab-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span>
          Tools
        </button>
        <button type="button" class="tab" class:active={activeTab === 'resources'} onclick={() => (activeTab = 'resources')}>
          <span class="tab-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></span>
          Resources
        </button>
      </div>
    </div>
  </section>

  {#if activeTab === 'calculators'}
    <section class="section section-white">
      <div class="section-inner">
        <div class="section-head">
          <h2 class="section-title">Popular</h2>
          <a href="/calculators" class="section-link" data-navigate>View all →</a>
        </div>
        <div class="popular-grid">
          {#each popularCalculators as calc}
            <a href={calc.path} class="popular-card" data-navigate>
              <span class="popular-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/></svg>
              </span>
              <span class="popular-name">{calc.name}</span>
            </a>
          {/each}
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="section-inner">
        <div class="chips">
          <button type="button" class="chip" class:active={selectedCategory === null} onclick={() => (selectedCategory = null)}>All</button>
          {#each calculatorCategories as category}
            <button
              type="button"
              class="chip"
              class:active={selectedCategory === category.id}
              onclick={() => (selectedCategory = category.id)}
            >
              {category.name.split(' ')[0]} ({category.calculators.length})
            </button>
          {/each}
        </div>
      </div>
    </section>

    <section class="section section-white">
      <div class="section-inner">
        {#each filteredCategories as category}
          <div class="category-block">
            <h3 class="category-title">{category.name} <span class="category-count">({category.calculators.length})</span></h3>
            <div class="calc-grid">
              {#each category.calculators as calc}
                <a href="/calculators/{calc.id}" class="calc-card" data-navigate>
                  <span class="calc-name">{calc.name}</span>
                  <span class="calc-desc">{calc.description}</span>
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  {#if activeTab === 'tools'}
    <section class="section section-white">
      <div class="section-inner">
        <div class="tools-grid">
          {#each toolsList as tool}
            <a href={tool.path} class="tool-card" data-navigate>
              <span class="tool-name">{tool.name}</span>
              <span class="tool-count">{tool.count}</span>
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if activeTab === 'resources'}
    <section class="section section-white">
      <div class="section-inner">
        <div class="tools-grid">
          {#each resourcesList as res}
            <a href={res.path} class="tool-card" data-navigate>
              <span class="tool-name">{res.name}</span>
              <span class="tool-count">{res.count}</span>
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <section class="section section-why safe-bottom">
    <div class="section-inner">
      <h2 class="why-title">Why MoneyCal.in</h2>
      <div class="why-grid">
        <div class="why-card"><span class="why-icon">✓</span><h3>100% Free</h3><p>No signup, no limits</p></div>
        <div class="why-card"><span class="why-icon">🛡</span><h3>Secure</h3><p>Data stays in your browser</p></div>
        <div class="why-card"><span class="why-icon">★</span><h3>Expert verified</h3><p>Reliable calculations</p></div>
        <div class="why-card"><span class="why-icon">⚡</span><h3>Fast</h3><p>Lightweight & quick</p></div>
      </div>
    </div>
  </section>
</div>

<style>
  .home {
    --tw-bg-opacity: 0.6;
  }
  .safe-top {
    padding-top: env(safe-area-inset-top, 0);
  }
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .hero {
    background: linear-gradient(to bottom, rgba(236, 253, 245, 0.8), white, rgba(248, 250, 252, 0.4));
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.12), transparent);
    pointer-events: none;
  }
  .hero-title {
    font-size: clamp(1.875rem, 5vw, 3rem);
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
  }
  .hero-sub {
    color: #475569;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 640px) {
    .hero-sub { font-size: 1.125rem; margin-bottom: 2rem; }
  }

  .search-wrap {
    position: relative;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }
  .search-form {
    position: relative;
  }
  .search-preview {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    margin-bottom: 0.5rem;
    z-index: 50;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 1px solid #e2e8f0;
    max-height: min(70vh, 320px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .search-preview-header {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    color: #64748b;
    background: rgba(248, 250, 252, 0.95);
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hint {
    display: none;
  }
  @media (min-width: 640px) {
    .hint { display: inline; }
  }
  .search-preview-list {
    overflow-y: auto;
    padding: 0.25rem 0;
  }
  .search-preview-item {
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 48px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: background 0.15s;
    font: inherit;
  }
  .search-preview-item:hover,
  .search-preview-item.selected {
    background: #ecfdf5;
    color: #065f46;
  }
  .item-content {
    flex: 1;
    min-width: 0;
  }
  .item-name {
    display: block;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-cat {
    display: block;
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.125rem;
  }
  .item-chevron {
    flex-shrink: 0;
    color: #cbd5e1;
  }
  .search-preview-item.selected .item-chevron {
    color: #059669;
  }

  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .search-bar:focus-within {
    box-shadow: 0 0 0 2px #10b981;
    border-color: #10b981;
  }
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    padding: 0.875rem 3rem 0.875rem 2.75rem;
    font-size: 1rem;
    border: none;
    border-radius: 1rem;
    background: transparent;
    color: #0f172a;
    min-height: 48px;
  }
  @media (min-width: 640px) {
    .search-input { min-height: 52px; padding: 1rem 3rem 1rem 2.75rem; }
  }
  .search-input::placeholder {
    color: #94a3b8;
  }
  .search-input:focus {
    outline: none;
  }
  .search-clear {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.375rem;
    border: none;
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
    border-radius: 0.5rem;
  }
  .search-clear:hover {
    color: #475569;
    background: #f1f5f9;
  }

  .tabs {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  }
  .tabs-inner {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    .tabs-inner { padding: 0 1.5rem; }
  }
  @media (min-width: 1024px) {
    .tabs-inner { padding: 0 2rem; }
  }
  .tabs-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    overflow-x: auto;
    padding: 0.75rem 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .tabs-row::-webkit-scrollbar {
    display: none;
  }
  .tab {
    min-height: 44px;
    min-width: 44px;
    padding: 0.625rem 1.25rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    background: #f1f5f9;
    color: #334155;
  }
  .tab:hover {
    background: #e2e8f0;
  }
  .tab.active {
    background: #059669;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.25);
  }
  .tab-icon {
    display: inline-flex;
    margin-right: 0.5rem;
  }

  .section {
    padding: 1.5rem 0;
  }
  @media (min-width: 640px) {
    .section { padding: 2rem 0; }
  }
  .section-white {
    background: white;
    border-bottom: 1px solid #f1f5f9;
  }
  .section-gray {
    background: rgba(248, 250, 252, 0.5);
    border-bottom: 1px solid #f1f5f9;
  }
  .section-inner {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    .section-inner { padding: 0 1.5rem; }
  }
  @media (min-width: 1024px) {
    .section-inner { padding: 0 2rem; }
  }
  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }
  @media (min-width: 640px) {
    .section-title { font-size: 1.5rem; }
  }
  .section-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: #059669;
    text-decoration: none;
  }
  .section-link:hover {
    color: #047857;
  }

  .popular-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  @media (min-width: 640px) {
    .popular-grid { grid-template-columns: repeat(4, 1fr); }
  }
  @media (min-width: 1024px) {
    .popular-grid { grid-template-columns: repeat(8, 1fr); }
  }
  .popular-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1rem;
    text-align: center;
    text-decoration: none;
    color: #0f172a;
    transition: all 0.2s;
    min-height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .popular-card:hover {
    border-color: #6ee7b7;
    box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1);
    transform: translateY(-2px);
  }
  .popular-icon {
    width: 2.75rem;
    height: 2.75rem;
    background: #d1fae5;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #059669;
  }
  .popular-card:hover .popular-icon {
    background: #059669;
    color: white;
  }
  .popular-name {
    font-size: 0.75rem;
    font-weight: 600;
  }
  @media (min-width: 640px) {
    .popular-name { font-size: 0.875rem; }
  }

  .chips {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .chips::-webkit-scrollbar {
    display: none;
  }
  .chip {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    min-height: 40px;
    border: 1px solid #e2e8f0;
    background: white;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s;
  }
  .chip:hover {
    background: #f8fafc;
  }
  .chip.active {
    background: #059669;
    color: white;
    border-color: #059669;
  }

  .category-block {
    margin-bottom: 2rem;
  }
  .category-block:last-child {
    margin-bottom: 0;
  }
  .category-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .category-count {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 400;
  }
  .calc-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  @media (min-width: 640px) {
    .calc-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (min-width: 1024px) {
    .calc-grid { grid-template-columns: repeat(4, 1fr); }
  }
  @media (min-width: 1280px) {
    .calc-grid { grid-template-columns: repeat(5, 1fr); }
  }
  .calc-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 0.75rem;
    text-decoration: none;
    color: #0f172a;
    transition: all 0.2s;
    min-height: 44px;
  }
  .calc-card:hover {
    border-color: #6ee7b7;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
  .calc-name {
    font-weight: 600;
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .calc-card:hover .calc-name {
    color: #047857;
  }
  .calc-desc {
    font-size: 0.75rem;
    color: #475569;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 0.25rem;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  @media (min-width: 640px) {
    .tools-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (min-width: 1024px) {
    .tools-grid { grid-template-columns: repeat(4, 1fr); }
  }
  @media (min-width: 1280px) {
    .tools-grid { grid-template-columns: repeat(5, 1fr); }
  }
  .tool-card {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1rem;
    text-align: center;
    text-decoration: none;
    color: #0f172a;
    transition: all 0.2s;
    min-height: 44px;
  }
  .tool-card:hover {
    border-color: #6ee7b7;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  .tool-name {
    font-weight: 600;
    font-size: 0.875rem;
    display: block;
    margin-bottom: 0.25rem;
  }
  .tool-card:hover .tool-name {
    color: #047857;
  }
  .tool-count {
    font-size: 0.75rem;
    color: #64748b;
  }

  .section-why {
    background: linear-gradient(to bottom, #f8fafc, white);
    border-top: 1px solid #f1f5f9;
    padding: 2.5rem 0;
  }
  @media (min-width: 640px) {
    .section-why { padding: 3.5rem 0; }
  }
  .why-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 640px) {
    .why-title { font-size: 1.5rem; margin-bottom: 2rem; }
  }
  .why-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (min-width: 768px) {
    .why-grid { grid-template-columns: repeat(4, 1fr); }
  }
  .why-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  }
  .why-icon {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 auto 0.5rem;
    background: #d1fae5;
    border-radius: 0.75rem;
    line-height: 2.5rem;
    font-size: 1.25rem;
  }
  .why-card h3 {
    font-weight: 600;
    font-size: 0.875rem;
    color: #0f172a;
    margin: 0 0 0.25rem;
  }
  .why-card p {
    font-size: 0.75rem;
    color: #475569;
    margin: 0;
  }
</style>
