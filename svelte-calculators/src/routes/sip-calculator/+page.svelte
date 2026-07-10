<script lang="ts">
  import { onMount } from 'svelte';

  let monthlyInvestment = 5000;
  let expectedReturn = 12;
  let years = 10;

  let invested = 0;
  let estReturns = 0;
  let totalValue = 0;
  let yearly: Array<{ year: number; investment: number; value: number }> = [];

  const formatCurrency = (v: number) =>
    '₹' + v.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  $: {
    const months = years * 12;
    const r = expectedReturn / 100 / 12;
    let value = 0;
    let totalInvested = 0;
    const rows: Array<{ year: number; investment: number; value: number }> = [];
    for (let m = 1; m <= months; m++) {
      totalInvested += monthlyInvestment;
      value = (value + monthlyInvestment) * (1 + r);
      if (m % 12 === 0) {
        rows.push({
          year: m / 12,
          investment: monthlyInvestment * (m / 12) * 12,
          value
        });
      }
    }
    invested = totalInvested;
    totalValue = value;
    estReturns = value - totalInvested;
    yearly = rows;
  }

  onMount(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'SIP Calculator – Systematic Investment Plan (India)',
      applicationCategory: 'FinanceApplication',
      description: 'Free SIP calculator for Indian mutual funds. Calculate SIP returns and corpus.'
    });
    document.head.appendChild(script);
  });
</script>

<svelte:head>
  <title>SIP Calculator India – Systematic Investment Plan Returns</title>
  <meta name="description" content="Mobile-friendly SIP calculator for Indian mutual funds. See returns and year-wise growth." />
</svelte:head>

<main class="calc-page">
  <a href="/" class="back">← Home</a>
  <header class="calc-header">
    <h1>SIP Calculator – Systematic Investment Plan (India)</h1>
    <p>See how your monthly SIP can grow over time with compounding.</p>
  </header>

  <div class="calc-grid">
    <div class="panel inputs">
      <label>Monthly SIP (₹) <input type="number" bind:value={monthlyInvestment} min="500" max="100000" step="500" /></label>
      <label>Expected return (% p.a.) <input type="number" bind:value={expectedReturn} min="6" max="20" step="0.5" /></label>
      <label>Years <input type="number" bind:value={years} min="1" max="30" /></label>
    </div>
    <div class="panel summary dark">
      <h2>SIP Summary</h2>
      <div class="stats">
        <div><span class="label">Invested</span><span class="val">{formatCurrency(invested)}</span></div>
        <div><span class="label">Est. returns</span><span class="val accent">{formatCurrency(estReturns)}</span></div>
        <div><span class="label">Total value</span><span class="val">{formatCurrency(totalValue)}</span></div>
      </div>
    </div>
  </div>

  <section class="table-wrap">
    <h2>Year-wise growth</h2>
    <div class="table-scroll">
      <table>
        <thead>
          <tr><th>Year</th><th>Invested (₹)</th><th>Value (₹)</th><th>Growth %</th></tr>
        </thead>
        <tbody>
          {#each yearly as row}
            <tr>
              <td>{row.year}</td>
              <td>{formatCurrency(row.investment)}</td>
              <td>{formatCurrency(row.value)}</td>
              <td>{((row.value / row.investment - 1) * 100).toFixed(2)}%</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <article class="content-block">
    <h2>What is a SIP Calculator?</h2>
    <p>A SIP calculator estimates how much wealth you can build by investing a fixed amount every month in mutual funds. It uses the standard SIP formula and shows total investment, estimated returns and final corpus. Use the <a href="/income-tax-calculator">Income Tax Calculator</a> to plan tax and the main <a href="https://moneycal.in">MoneyCal</a> site for more tools.</p>
  </article>
</main>

<style>
  .calc-page { max-width: 56rem; margin: 0 auto; padding: 1rem; }
  .back { display: inline-block; margin-bottom: 1rem; color: #0ea5e9; text-decoration: none; font-size: 0.9rem; }
  .calc-header { text-align: center; margin-bottom: 1.5rem; }
  .calc-header h1 { font-size: clamp(1.5rem, 3vw, 2rem); margin: 0 0 0.5rem; }
  .calc-header p { color: #64748b; margin: 0; }
  .calc-grid { display: grid; gap: 1.5rem; grid-template-columns: 1fr 1fr; }
  @media (max-width: 640px) { .calc-grid { grid-template-columns: 1fr; } }
  .panel { padding: 1.25rem; border-radius: 1rem; border: 1px solid #e2e8f0; background: #fff; }
  .panel.dark { background: #0f172a; color: #f8fafc; border-color: #334155; }
  .panel label { display: block; margin-bottom: 0.75rem; font-size: 0.9rem; }
  .panel input { width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; box-sizing: border-box; }
  .panel h2 { margin: 0 0 1rem; font-size: 1.1rem; }
  .stats { display: grid; gap: 0.5rem; }
  .stats .label { font-size: 0.8rem; color: #94a3b8; }
  .stats .val { font-weight: 600; }
  .stats .val.accent { color: #86efac; }
  .table-wrap { margin-top: 2rem; }
  .table-wrap h2 { font-size: 1.1rem; margin: 0 0 0.75rem; }
  .table-scroll { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  th, td { padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
  th { background: #f1f5f9; font-weight: 600; }
  .content-block { margin-top: 2rem; padding: 1.5rem; background: #f8fafc; border-radius: 1rem; }
  .content-block h2 { margin: 0 0 0.75rem; font-size: 1.25rem; }
  .content-block p { margin: 0; line-height: 1.6; color: #475569; }
  .content-block a { color: #0ea5e9; }
</style>
