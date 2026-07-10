<script lang="ts">
  import { goto } from '$app/navigation';

  const quickLinks = [
    { name: 'All Calculators', path: '/calculators' },
    { name: 'Loan Tools', path: '/loan-tools' },
    { name: 'Tax Tools', path: '/tax-tools' },
    { name: 'Finance Tools', path: '/finance-tools' },
    { name: 'Learn Finance', path: '/learn' },
    { name: 'Blog', path: '/blog' }
  ];

  const primarySections = [
    { name: 'EMI & Loan Calculators', path: '/calculators/emi-calculator', count: '50+', desc: 'EMI, home loan, car loan.' },
    { name: 'Investment & Wealth', path: '/finance-tools', count: '40+', desc: 'SIP, mutual funds, retirement.' },
    { name: 'Tax & GST', path: '/tax-tools', count: '30+', desc: 'Income tax, GST, compliance.' },
    { name: 'Learn Finance', path: '/learn', count: '100+', desc: 'Guided lessons.' },
    { name: 'News & Research', path: '/news', count: 'Daily', desc: 'Market news.' },
    { name: 'Business & Corporate', path: '/corporate-finance', count: '20+', desc: 'Business tools.' }
  ];

  const popularCalcs = [
    { name: 'EMI Calculator', path: '/calculators/emi-calculator' },
    { name: 'SIP Calculator', path: '/sip-calculator' },
    { name: 'Income Tax Calculator', path: '/income-tax-calculator' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator' }
  ];
</script>

<svelte:head>
  <title>MoneyCal India – Finance Calculators, Tools & Learning</title>
  <meta name="description" content="EMI calculator, SIP calculator, tax calculator & finance tools — all in one Indian money hub. Plan loans, investments and taxes with 200+ tools." />
</svelte:head>

<main class="home">
  <section class="hero">
    <div class="hero-inner">
      <p class="eyebrow">MoneyCal India · Finance Hub</p>
      <h1 class="title">
        EMI calculator, SIP calculator, tax calculator & finance tools — all in one Indian money hub
      </h1>
      <p class="subtitle">
        Plan loans, investments, taxes and cash flow with 200+ finance tools and guides. Built for India.
      </p>
    </div>

    <div class="cta-block">
      <a href="/income-tax-calculator" class="btn btn-primary">Income Tax Calculator</a>
      <a href="/sip-calculator" class="btn btn-secondary">SIP Calculator</a>
      <a href="/calculators" class="btn btn-ghost">All Calculators</a>
    </div>

    <div class="quick-pills">
      {#each popularCalcs as calc}
        <a href={calc.path} class="pill">{calc.name}</a>
      {/each}
    </div>
  </section>

  <section class="sections">
    <h2 class="section-head">Explore by category</h2>
    <div class="grid">
      {#each primarySections as sec}
        <a href={sec.path} class="card">
          <span class="card-count">{sec.count}</span>
          <h3 class="card-title">{sec.name}</h3>
          <p class="card-desc">{sec.desc}</p>
        </a>
      {/each}
    </div>
  </section>

  <section class="quick-links">
    <h2 class="section-head">Quick links</h2>
    <div class="links">
      {#each quickLinks as link}
        <a href={link.path} class="link">{link.name}</a>
      {/each}
    </div>
  </section>
</main>

<style>
  .home {
    min-height: 100vh;
    background: linear-gradient(to bottom, #0f172a, #1e293b);
    color: #f8fafc;
  }
  .hero {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1rem 3rem;
    text-align: center;
  }
  .eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #7dd3fc;
    margin: 0 0 0.75rem;
  }
  .title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 1rem;
  }
  .subtitle {
    font-size: 1rem;
    color: #cbd5e1;
    max-width: 36rem;
    margin: 0 auto 2rem;
    line-height: 1.5;
  }
  .cta-block {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .btn {
    display: inline-block;
    padding: 0.625rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-primary {
    background: #0ea5e9;
    color: #0f172a;
  }
  .btn-secondary {
    background: rgba(255,255,255,0.15);
    color: #f8fafc;
    border: 1px solid rgba(255,255,255,0.2);
  }
  .btn-ghost {
    color: #94a3b8;
  }
  .btn:hover {
    transform: translateY(-2px);
  }
  .quick-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  .pill {
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 500;
    background: rgba(255,255,255,0.08);
    color: #e2e8f0;
    text-decoration: none;
  }
  .pill:hover {
    background: rgba(255,255,255,0.15);
  }
  .sections, .quick-links {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  .section-head {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 1rem;
    color: #f8fafc;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }
  .card {
    padding: 1.25rem;
    border-radius: 1rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .card:hover {
    border-color: rgba(255,255,255,0.15);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  .card-count {
    font-size: 0.75rem;
    color: #64748b;
  }
  .card-title {
    font-size: 1.1rem;
    margin: 0.25rem 0 0.35rem;
  }
  .card-desc {
    font-size: 0.9rem;
    color: #94a3b8;
    margin: 0;
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .link {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: #e2e8f0;
    text-decoration: none;
    font-weight: 500;
  }
  .link:hover {
    background: rgba(255,255,255,0.1);
  }
</style>
