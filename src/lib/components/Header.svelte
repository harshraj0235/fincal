<script lang="ts">
  import { page } from '$app/stores';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/calculators', label: 'Calculators' },
    { href: '/tools', label: 'Tools' },
    { href: '/learn', label: 'Learn' },
    { href: '/news', label: 'News' },
    { href: '/news/shorts', label: 'Money Shorts' },
    { href: '/blog', label: 'Blog' },
    { href: '/government-schemes', label: 'Govt Schemes' },
    { href: '/crypto', label: 'Crypto' },
    { href: '/tax-tools', label: 'Tax Tools' },
    { href: '/gst-tools', label: 'GST Tools' },
    { href: '/contact-us', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy' },
    { href: '/terms-of-service', label: 'Terms' },
  ];

  let menuOpen = false;
</script>

<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="/" class="logo" aria-label="MoneyCal India – Home">
      <span class="logo-text">MoneyCal.in</span>
    </a>
    <button
      type="button"
      class="menu-toggle"
      aria-expanded={menuOpen}
      aria-controls="main-nav"
      aria-label="Toggle menu"
      on:click={() => menuOpen = !menuOpen}
    >
      <span class="hamburger"></span>
    </button>
    <nav id="main-nav" class="nav" class:open={menuOpen} aria-label="Main navigation">
      <ul class="nav-list">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              class="nav-link"
              class:current={$page.url.pathname === link.href || ($page.url.pathname === '/' && link.href === '/')}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.9);
    padding: 0.75rem 1rem;
  }
  .header-inner {
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .logo {
    text-decoration: none;
    font-weight: 800;
    font-size: 1.25rem;
    color: #0f172a;
    white-space: nowrap;
  }
  .logo:hover {
    color: #2563eb;
  }
  .logo-text {
    background: linear-gradient(90deg, #1e3a8a, #2563eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    padding: 0;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    color: #334155;
  }
  .menu-toggle:hover {
    background: #f8fafc;
  }
  @media (min-width: 1024px) {
    .menu-toggle {
      display: none;
    }
  }
  .hamburger {
    display: block;
    width: 1.25rem;
    height: 2px;
    background: currentColor;
    box-shadow: 0 -6px 0 currentColor, 0 6px 0 currentColor;
  }
  .nav {
    position: fixed;
    top: 3.5rem;
    left: 0;
    right: 0;
    max-height: calc(100vh - 3.5rem);
    overflow-y: auto;
    background: white;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    display: none;
  }
  .nav.open {
    display: block;
  }
  @media (min-width: 1024px) {
    .nav {
      position: static;
      max-height: none;
      overflow: visible;
      background: transparent;
      border: none;
      box-shadow: none;
      display: block;
    }
  }
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  @media (min-width: 1024px) {
    .nav-list {
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0;
      gap: 0.25rem;
      justify-content: flex-end;
    }
  }
  .nav-link {
    display: block;
    padding: 0.75rem 1rem;
    min-height: 44px;
    box-sizing: border-box;
    border-radius: 0.5rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: #334155;
    text-decoration: none;
  }
  @media (min-width: 1024px) {
    .nav-link {
      display: inline-block;
      padding: 0.5rem 0.75rem;
      min-height: auto;
    }
  }
  .nav-link:hover {
    background: #f1f5f9;
    color: #2563eb;
  }
  .nav-link.current {
    color: #2563eb;
    font-weight: 600;
  }
</style>
