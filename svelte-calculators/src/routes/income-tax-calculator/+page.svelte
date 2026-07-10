<script lang="ts">
  import { onMount } from 'svelte';

  type Regime = 'old' | 'new';
  type AgeBand = 'below60' | '60to80' | 'above80';

  let regime: Regime = 'new';
  let age: AgeBand = 'below60';
  let annualIncome = 1_000_000;
  let section80C = 150_000;
  let section80D = 25_000;
  let hra = 0;
  let homeLoanInterest = 0;

  let taxableIncome = 0;
  let totalDeductions = 0;
  let totalTax = 0;
  let effectiveRate = 0;
  let oldRegimeTax = 0;
  let newRegimeTax = 0;
  let betterRegime: Regime = 'new';
  let regimeSavings = 0;

  const formatCurrency = (v: number) =>
    '₹' + v.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  function calcOldTax(taxable: number, band: AgeBand) {
    if (band === 'above80') {
      if (taxable <= 500_000) return 0;
      if (taxable <= 1_000_000) return (taxable - 500_000) * 0.2;
      return 100_000 + (taxable - 1_000_000) * 0.3;
    }
    if (band === '60to80') {
      if (taxable <= 300_000) return 0;
      if (taxable <= 500_000) return (taxable - 300_000) * 0.05;
      if (taxable <= 1_000_000) return 10_000 + (taxable - 500_000) * 0.2;
      return 110_000 + (taxable - 1_000_000) * 0.3;
    }
    if (taxable <= 250_000) return 0;
    if (taxable <= 500_000) return (taxable - 250_000) * 0.05;
    if (taxable <= 1_000_000) return 12_500 + (taxable - 500_000) * 0.2;
    return 112_500 + (taxable - 1_000_000) * 0.3;
  }

  function calcNewTax(taxable: number) {
    if (taxable <= 300_000) return 0;
    if (taxable <= 600_000) return (taxable - 300_000) * 0.05;
    if (taxable <= 900_000) return 15_000 + (taxable - 600_000) * 0.1;
    if (taxable <= 1_200_000) return 45_000 + (taxable - 900_000) * 0.15;
    if (taxable <= 1_500_000) return 90_000 + (taxable - 1_200_000) * 0.2;
    return 150_000 + (taxable - 1_500_000) * 0.3;
  }

  $: {
    const stdDeduction = 50_000;
    const oldDed80C = Math.min(150_000, Math.max(0, section80C));
    const oldDed80D = Math.min(100_000, Math.max(0, section80D));
    const oldHome = Math.min(200_000, Math.max(0, homeLoanInterest));
    const gross = annualIncome;
    const deductionsOld =
      (regime === 'old' ? oldDed80C + oldDed80D + hra + oldHome : 0) + stdDeduction;
    totalDeductions = deductionsOld;
    taxableIncome = Math.max(0, gross - deductionsOld);
    const taxBase = regime === 'old' ? taxableIncome : Math.max(0, gross - stdDeduction);
    const taxLiab = regime === 'old' ? calcOldTax(taxableIncome, age) : calcNewTax(taxBase);
    const cess = taxLiab * 0.04;
    totalTax = taxLiab + cess;
    effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;
    const oldT = calcOldTax(Math.max(0, gross - deductionsOld), age);
    const newT = calcNewTax(Math.max(0, gross - stdDeduction));
    oldRegimeTax = oldT + oldT * 0.04;
    newRegimeTax = newT + newT * 0.04;
    if (oldRegimeTax <= newRegimeTax) {
      betterRegime = 'old';
      regimeSavings = newRegimeTax - oldRegimeTax;
    } else {
      betterRegime = 'new';
      regimeSavings = oldRegimeTax - newRegimeTax;
    }
  }

  onMount(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Income Tax Calculator – Old vs New Regime (India)',
      applicationCategory: 'FinanceApplication',
      description: 'Free income tax calculator for India FY 2024-25. Compare old vs new regime.'
    });
    document.head.appendChild(script);
  });
</script>

<svelte:head>
  <title>Income Tax Calculator India – Old vs New Regime (FY 2024–25)</title>
  <meta name="description" content="Mobile-friendly income tax calculator for India. Compare old vs new tax regime, see slabs and total tax for FY 2024-25." />
</svelte:head>

<main class="calc-page">
  <a href="/" class="back">← Home</a>
  <header class="calc-header">
    <h1>Income Tax Calculator India (Old vs New Regime)</h1>
    <p>Calculate tax for FY 2024–25. Compare regimes and see which saves more.</p>
  </header>

  <div class="calc-grid">
    <div class="panel inputs">
      <div class="toggles">
        <button class:selected={regime === 'old'} onclick={() => (regime = 'old')}>Old Regime</button>
        <button class:selected={regime === 'new'} onclick={() => (regime = 'new')}>New Regime</button>
      </div>
      <div class="toggles">
        <button class:selected={age === 'below60'} onclick={() => (age = 'below60')}>&lt; 60</button>
        <button class:selected={age === '60to80'} onclick={() => (age = '60to80')}>60–80</button>
        <button class:selected={age === 'above80'} onclick={() => (age = 'above80')}>80+</button>
      </div>
      <label>Annual Income (₹) <input type="number" bind:value={annualIncome} min="300000" max="5000000" step="50000" /></label>
      {#if regime === 'old'}
        <label>Section 80C (₹) <input type="number" bind:value={section80C} min="0" max="150000" /></label>
        <label>Section 80D (₹) <input type="number" bind:value={section80D} min="0" max="100000" /></label>
        <label>HRA (₹) <input type="number" bind:value={hra} min="0" /></label>
        <label>Home loan interest (₹) <input type="number" bind:value={homeLoanInterest} min="0" max="300000" /></label>
      {/if}
    </div>
    <div class="panel summary dark">
      <h2>Tax Summary</h2>
      <p class="muted">FY 2024–25</p>
      <div class="stats">
        <div><span class="label">Taxable Income</span><span class="val">{formatCurrency(taxableIncome)}</span></div>
        <div><span class="label">Total Deductions</span><span class="val">{formatCurrency(totalDeductions)}</span></div>
        <div><span class="label">Total Tax (incl. cess)</span><span class="val">{formatCurrency(totalTax)}</span></div>
        <div><span class="label">Effective rate</span><span class="val">{effectiveRate.toFixed(2)}%</span></div>
      </div>
      <div class="regime-compare">
        <p>Old regime: {formatCurrency(oldRegimeTax)} · New regime: {formatCurrency(newRegimeTax)}</p>
        <p class="recommend">Better: <strong>{betterRegime === 'old' ? 'Old' : 'New'} Regime</strong> (saves {formatCurrency(regimeSavings)})</p>
      </div>
    </div>
  </div>

  <article class="content-block">
    <h2>What is an Income Tax Calculator?</h2>
    <p>An income tax calculator for India estimates how much tax you pay for a financial year based on your income, age, tax regime and deductions. This tool compares the <strong>old tax regime</strong> (with 80C, 80D, HRA, home loan interest) and the <strong>new tax regime</strong> (lower rates, fewer deductions) so you can choose the better option.</p>
    <p>Use the inputs above to see your taxable income, total tax and effective rate. For more tools, see our <a href="/sip-calculator">SIP Calculator</a> and the main <a href="https://moneycal.in">MoneyCal</a> site.</p>
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
  .toggles { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .toggles button { padding: 0.4rem 0.8rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; }
  .toggles button.selected { background: #059669; color: #fff; border-color: #059669; }
  .panel label { display: block; margin-bottom: 0.75rem; font-size: 0.9rem; }
  .panel input { width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; box-sizing: border-box; }
  .panel h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
  .muted { font-size: 0.8rem; color: #94a3b8; margin: 0 0 1rem; }
  .stats { display: grid; gap: 0.5rem; }
  .stats .label { font-size: 0.8rem; color: #94a3b8; }
  .stats .val { font-weight: 600; }
  .regime-compare { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #334155; font-size: 0.9rem; }
  .recommend { color: #86efac; margin: 0.5rem 0 0; }
  .content-block { margin-top: 2rem; padding: 1.5rem; background: #f8fafc; border-radius: 1rem; }
  .content-block h2 { margin: 0 0 0.75rem; font-size: 1.25rem; }
  .content-block p { margin: 0 0 0.5rem; line-height: 1.6; color: #475569; }
  .content-block a { color: #0ea5e9; }
</style>
