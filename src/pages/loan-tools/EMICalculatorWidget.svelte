<svelte:options customElement={{ tag: 'moneycal-emi-calculator', shadow: 'none' }} />

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type ScheduleRow = {
    month: number;
    dateLabel: string;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
    extra: number;
    rate: number;
  };

  interface ScheduleParams {
    principal: number;
    annualRate: number;
    totalMonths: number;
    extraMonthlyPayment: number;
    lumpSumPayment: number;
    lumpSumMonth: number;
    rateResetEnabled: boolean;
    rateResetAfterMonths: number;
    rateAfterReset: number;
    startMonthValue: string;
  }

  const dispatch = createEventDispatcher<{ navigate: { path: string } }>();

  let loanAmount = 1500000;
  let interestRate = 8.75;
  let tenureYears = 20;
  let tenureExtraMonths = 0;

  let monthlyIncome = 100000;

  const now = new Date();
  let startMonthValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  let showAdvanced = false;
  let extraMonthlyPayment = 0;
  let lumpSumPayment = 0;
  let lumpSumMonth = 12;

  let rateResetEnabled = false;
  let rateResetAfterMonths = 24;
  let rateAfterReset = 9.5;

  let includeProcessingFee = false;
  let processingFeePercent = 0.5;
  let processingFeeFlat = 0;

  let showFullSchedule = false;

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(amount));

  const formatNumber = (amount: number) => new Intl.NumberFormat('en-IN').format(Math.round(amount));

  const parseMonthInput = (value: string) => {
    const [year, month] = value.split('-').map(Number);
    return new Date(year || now.getFullYear(), (month || 1) - 1, 1);
  };

  const addMonths = (date: Date, months: number) => new Date(date.getFullYear(), date.getMonth() + months, 1);

  const formatMonth = (date: Date) => date.toLocaleString('en-IN', { month: 'short', year: 'numeric' });

  const calcEmi = (principal: number, monthlyRate: number, months: number) => {
    if (principal <= 0 || months <= 0) return 0;
    if (monthlyRate === 0) return principal / months;
    const pow = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * pow) / (pow - 1);
  };

  const buildSchedule = (params: ScheduleParams, includeSchedule = true) => {
    const schedule: ScheduleRow[] = [];
    const totalMonths = Math.max(1, Math.floor(params.totalMonths));
    if (params.principal <= 0 || totalMonths <= 0) {
      return {
        schedule,
        totalInterest: 0,
        totalPaid: 0,
        initialEmi: 0,
        revisedEmi: null as number | null,
        months: 0,
        finalEmi: 0,
      };
    }

    let balance = params.principal;
    let currentRate = params.annualRate;
    let monthlyRate = currentRate / 12 / 100;
    let remainingMonths = totalMonths;
    let emi = calcEmi(balance, monthlyRate, remainingMonths);
    const initialEmi = emi;
    let revisedEmi: number | null = null;
    let totalInterest = 0;
    let totalPaid = 0;
    let actualMonths = 0;

    const startDate = parseMonthInput(params.startMonthValue);

    for (let month = 1; month <= totalMonths; month += 1) {
      if (params.rateResetEnabled && params.rateResetAfterMonths > 0 && month === params.rateResetAfterMonths + 1) {
        currentRate = params.rateAfterReset;
        monthlyRate = currentRate / 12 / 100;
        remainingMonths = totalMonths - (month - 1);
        emi = calcEmi(balance, monthlyRate, remainingMonths);
        revisedEmi = emi;
      }

      const interest = balance * monthlyRate;
      let principalPayment = emi - interest;
      let extra = 0;

      if (params.extraMonthlyPayment > 0) extra += params.extraMonthlyPayment;
      if (params.lumpSumPayment > 0 && month === params.lumpSumMonth) extra += params.lumpSumPayment;

      if (principalPayment + extra > balance) {
        extra = Math.max(0, balance - principalPayment);
      }

      const totalPrincipal = principalPayment + extra;
      balance = Math.max(0, balance - totalPrincipal);
      totalInterest += interest;
      totalPaid += emi + extra;

      if (includeSchedule) {
        schedule.push({
          month,
          dateLabel: formatMonth(addMonths(startDate, month - 1)),
          emi,
          principal: totalPrincipal,
          interest,
          balance,
          extra,
          rate: currentRate,
        });
      }

      if (balance <= 0.01) {
        actualMonths = month;
        break;
      }
    }

    if (actualMonths === 0) actualMonths = totalMonths;

    return {
      schedule,
      totalInterest,
      totalPaid,
      initialEmi,
      revisedEmi,
      months: actualMonths,
      finalEmi: emi,
    };
  };

  const handleDelegateClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest?.('a[data-navigate]');
    if (target instanceof HTMLAnchorElement && target.href) {
      event.preventDefault();
      const path = new URL(target.href).pathname;
      dispatch('navigate', { path });
    }
  };

  const downloadCSV = (schedule: ScheduleRow[]) => {
    if (!schedule.length) return;
    const headers = ['Month', 'Date', 'EMI', 'Principal', 'Interest', 'Extra', 'Balance', 'Rate'];
    const rows = schedule.map((row) => [
      row.month,
      row.dateLabel,
      Math.round(row.emi),
      Math.round(row.principal),
      Math.round(row.interest),
      Math.round(row.extra),
      Math.round(row.balance),
      row.rate.toFixed(2),
    ]);
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'emi-amortization-schedule.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  $: totalMonths = clamp(tenureYears * 12 + tenureExtraMonths, 1, 480);

  $: scheduleResult = buildSchedule({
    principal: loanAmount,
    annualRate: interestRate,
    totalMonths,
    extraMonthlyPayment,
    lumpSumPayment,
    lumpSumMonth,
    rateResetEnabled,
    rateResetAfterMonths,
    rateAfterReset,
    startMonthValue,
  });

  $: baselineResult = buildSchedule(
    {
      principal: loanAmount,
      annualRate: interestRate,
      totalMonths,
      extraMonthlyPayment: 0,
      lumpSumPayment: 0,
      lumpSumMonth,
      rateResetEnabled,
      rateResetAfterMonths,
      rateAfterReset,
      startMonthValue,
    },
    false
  );

  $: interestSaved = Math.max(0, baselineResult.totalInterest - scheduleResult.totalInterest);
  $: monthsSaved = Math.max(0, baselineResult.months - scheduleResult.months);
  $: processingFee = includeProcessingFee ? loanAmount * (processingFeePercent / 100) + processingFeeFlat : 0;
  $: totalCost = scheduleResult.totalPaid + processingFee;
  $: emiToIncome = monthlyIncome > 0 ? (scheduleResult.initialEmi / monthlyIncome) * 100 : 0;
  $: interestRatio = scheduleResult.totalPaid > 0 ? scheduleResult.totalInterest / scheduleResult.totalPaid : 0;
  $: payoffDateLabel =
    scheduleResult.months > 0 ? formatMonth(addMonths(parseMonthInput(startMonthValue), scheduleResult.months - 1)) : '-';

  $: rateUpEmi = calcEmi(loanAmount, (interestRate + 0.5) / 12 / 100, totalMonths);
  $: rateDownEmi = calcEmi(loanAmount, Math.max(interestRate - 0.5, 0.1) / 12 / 100, totalMonths);
  $: shorterTenureMonths = Math.max(12, totalMonths - 24);
  $: shorterTenureEmi = calcEmi(loanAmount, interestRate / 12 / 100, shorterTenureMonths);
</script>

<main class="emi-page" on:click={handleDelegateClick} aria-label="EMI calculator page">
  <section class="hero" aria-labelledby="emi-hero-title">
    <div class="hero-content">
      <span class="eyebrow">Fast EMI Calculator for India</span>
      <h1 id="emi-hero-title">EMI Calculator for Home Loan, Personal Loan, and Car Loan</h1>
      <p>
        Plan your monthly loan repayment with a fast EMI calculator built for Indian borrowers. This advanced EMI
        calculator uses the reducing balance method, supports prepayment planning, and simulates rate resets for floating
        loans. Whether you need a home loan EMI calculator, a personal loan EMI calculator with prepayment, or a car loan
        EMI calculator for new and used vehicles, you can model accurate cash flow and compare loan scenarios in one
        place.
      </p>
      <div class="hero-actions">
        <a class="btn primary" href="/loan-tools/loan-affordability" data-navigate>Check loan affordability</a>
        <a class="btn ghost" href="/loan-tools/prepayment-calculator" data-navigate>Plan prepayment savings</a>
        <a class="btn ghost" href="/calculators/home-loan-emi-calculator" data-navigate>Home loan EMI</a>
      </div>
      <div class="hero-highlights">
        <div>
          <strong>Instant results</strong>
          <span>EMI, interest, and payoff date update instantly</span>
        </div>
        <div>
          <strong>Advanced options</strong>
          <span>Rate reset, extra EMI, and processing fee analysis</span>
        </div>
        <div>
          <strong>Made for India</strong>
          <span>INR formatting, common tenure ranges, and affordability ratio</span>
        </div>
      </div>
    </div>
    <div class="hero-panel">
      <div class="panel-card">
        <p class="panel-label">Estimated EMI</p>
        <p class="panel-value">{formatCurrency(scheduleResult.initialEmi)}</p>
        <p class="panel-meta">for {formatNumber(loanAmount)} INR over {totalMonths} months</p>
      </div>
      <div class="panel-grid">
        <div>
          <span>Total interest</span>
          <strong>{formatCurrency(scheduleResult.totalInterest)}</strong>
        </div>
        <div>
          <span>Payoff date</span>
          <strong>{payoffDateLabel}</strong>
        </div>
        <div>
          <span>EMI to income</span>
          <strong>{emiToIncome.toFixed(1)}%</strong>
        </div>
        <div>
          <span>Interest share</span>
          <strong>{(interestRatio * 100).toFixed(1)}%</strong>
        </div>
      </div>
    </div>
  </section>

  <section class="calculator-grid" aria-label="EMI calculator">
    <div class="card input-card">
      <h2>Loan inputs</h2>
      <p class="card-subtitle">Update values to calculate EMI with reducing balance method.</p>

      <div class="input-group">
        <label for="loanAmount">Loan amount (INR)</label>
        <div class="input-row">
          <input
            id="loanAmount"
            type="number"
            min="50000"
            step="1000"
            bind:value={loanAmount}
          />
          <span class="input-hint">{formatCurrency(loanAmount)}</span>
        </div>
        <input
          type="range"
          min="50000"
          max="50000000"
          step="50000"
          bind:value={loanAmount}
        />
      </div>

      <div class="input-group">
        <label for="interestRate">Interest rate (annual %)</label>
        <div class="input-row">
          <input
            id="interestRate"
            type="number"
            min="0"
            max="30"
            step="0.05"
            bind:value={interestRate}
          />
          <span class="input-hint">{interestRate.toFixed(2)}% per year</span>
        </div>
        <input
          type="range"
          min="4"
          max="20"
          step="0.05"
          bind:value={interestRate}
        />
      </div>

      <div class="input-group">
        <label>Loan tenure</label>
        <div class="input-row two">
          <div>
            <input type="number" min="0" max="40" step="1" bind:value={tenureYears} />
            <span class="input-hint">Years</span>
          </div>
          <div>
            <input type="number" min="0" max="11" step="1" bind:value={tenureExtraMonths} />
            <span class="input-hint">Months</span>
          </div>
        </div>
        <p class="micro">Total tenure: {totalMonths} months</p>
      </div>

      <div class="input-group">
        <label for="monthlyIncome">Net monthly income (optional)</label>
        <div class="input-row">
          <input id="monthlyIncome" type="number" min="0" step="500" bind:value={monthlyIncome} />
          <span class="input-hint">EMI ratio: {emiToIncome.toFixed(1)}%</span>
        </div>
      </div>

      <div class="input-group">
        <label for="startMonth">Loan start month</label>
        <div class="input-row">
          <input id="startMonth" type="month" bind:value={startMonthValue} />
          <span class="input-hint">Payoff: {payoffDateLabel}</span>
        </div>
      </div>

      <button class="toggle" type="button" on:click={() => (showAdvanced = !showAdvanced)}>
        {showAdvanced ? 'Hide' : 'Show'} advanced options
      </button>

      {#if showAdvanced}
        <div class="advanced-grid">
          <div class="input-group">
            <label>Extra monthly payment (optional)</label>
            <div class="input-row">
              <input type="number" min="0" step="500" bind:value={extraMonthlyPayment} />
              <span class="input-hint">Reduces tenure faster</span>
            </div>
          </div>

          <div class="input-group">
            <label>One time prepayment</label>
            <div class="input-row two">
              <input type="number" min="0" step="1000" bind:value={lumpSumPayment} />
              <input type="number" min="1" max={totalMonths} step="1" bind:value={lumpSumMonth} />
            </div>
            <p class="micro">Prepay {formatCurrency(lumpSumPayment)} at month {lumpSumMonth}</p>
          </div>

          <div class="input-group toggle-row">
            <label>
              <input type="checkbox" bind:checked={rateResetEnabled} />
              Simulate rate reset (floating rate)
            </label>
          </div>
          {#if rateResetEnabled}
            <div class="input-row two">
              <div>
                <input type="number" min="1" max={totalMonths - 1} step="1" bind:value={rateResetAfterMonths} />
                <span class="input-hint">Reset after months</span>
              </div>
              <div>
                <input type="number" min="0" max="30" step="0.05" bind:value={rateAfterReset} />
                <span class="input-hint">New rate (%)</span>
              </div>
            </div>
          {/if}

          <div class="input-group toggle-row">
            <label>
              <input type="checkbox" bind:checked={includeProcessingFee} />
              Include processing fee
            </label>
          </div>
          {#if includeProcessingFee}
            <div class="input-row two">
              <div>
                <input type="number" min="0" max="5" step="0.1" bind:value={processingFeePercent} />
                <span class="input-hint">Percent of loan</span>
              </div>
              <div>
                <input type="number" min="0" step="100" bind:value={processingFeeFlat} />
                <span class="input-hint">Flat fee (INR)</span>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <div class="card result-card">
      <h2>EMI results</h2>
      <p class="card-subtitle">Understand monthly EMI, total interest, and payoff details.</p>

      <div class="result-hero">
        <div>
          <span>Monthly EMI</span>
          <strong>{formatCurrency(scheduleResult.initialEmi)}</strong>
        </div>
        <div>
          <span>Loan payoff date</span>
          <strong>{payoffDateLabel}</strong>
        </div>
      </div>

      <div class="result-grid">
        <div>
          <span>Total payment</span>
          <strong>{formatCurrency(scheduleResult.totalPaid)}</strong>
        </div>
        <div>
          <span>Total interest</span>
          <strong>{formatCurrency(scheduleResult.totalInterest)}</strong>
        </div>
        <div>
          <span>Tenure after prepayment</span>
          <strong>{scheduleResult.months} months</strong>
        </div>
        <div>
          <span>Interest saved</span>
          <strong>{formatCurrency(interestSaved)}</strong>
        </div>
      </div>

      {#if scheduleResult.revisedEmi}
        <div class="notice">
          Rate reset changes EMI to {formatCurrency(scheduleResult.revisedEmi)} after {rateResetAfterMonths} months.
        </div>
      {/if}

      <div class="ratio">
        <div class="ratio-bar">
          <div class="ratio-interest" style="width: {(interestRatio * 100).toFixed(2)}%"></div>
        </div>
        <div class="ratio-labels">
          <span>Principal</span>
          <span>Interest</span>
        </div>
      </div>

      <div class="result-grid">
        <div>
          <span>EMI to income</span>
          <strong>{emiToIncome.toFixed(1)}%</strong>
        </div>
        <div>
          <span>Months saved</span>
          <strong>{monthsSaved} months</strong>
        </div>
        <div>
          <span>Processing fee</span>
          <strong>{formatCurrency(processingFee)}</strong>
        </div>
        <div>
          <span>Total cost</span>
          <strong>{formatCurrency(totalCost)}</strong>
        </div>
      </div>

      <div class="scenario-card">
        <h3>Quick what if comparisons</h3>
        <div class="scenario-grid">
          <div>
            <span>Rate +0.5%</span>
            <strong>{formatCurrency(rateUpEmi)}</strong>
          </div>
          <div>
            <span>Rate -0.5%</span>
            <strong>{formatCurrency(rateDownEmi)}</strong>
          </div>
          <div>
            <span>Tenure -24 months</span>
            <strong>{formatCurrency(shorterTenureEmi)}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="schedule card" aria-label="Amortization schedule">
    <div class="schedule-header">
      <div>
        <h2>Amortization schedule</h2>
        <p class="card-subtitle">See month wise EMI split between principal and interest.</p>
      </div>
      <div class="schedule-actions">
        <button type="button" class="btn ghost" on:click={() => (showFullSchedule = !showFullSchedule)}>
          {showFullSchedule ? 'Show first 24 months' : 'Show full schedule'}
        </button>
        <button type="button" class="btn primary" on:click={() => downloadCSV(scheduleResult.schedule)}>
          Download CSV
        </button>
      </div>
    </div>

    <div class="table-wrap">
      <table aria-label="EMI amortization schedule table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Date</th>
            <th>EMI</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Extra</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {#each (showFullSchedule ? scheduleResult.schedule : scheduleResult.schedule.slice(0, 24)) as row}
            <tr>
              <td>{row.month}</td>
              <td>{row.dateLabel}</td>
              <td>{formatCurrency(row.emi)}</td>
              <td class="positive">{formatCurrency(row.principal)}</td>
              <td class="negative">{formatCurrency(row.interest)}</td>
              <td>{formatCurrency(row.extra)}</td>
              <td>{formatCurrency(row.balance)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="micro">
      Showing {showFullSchedule ? scheduleResult.schedule.length : Math.min(24, scheduleResult.schedule.length)} of
      {scheduleResult.schedule.length} months. Use the CSV export for full details.
    </p>
  </section>

  <nav class="toc card" aria-label="EMI guide table of contents">
    <h2>EMI calculator guide: read before you borrow</h2>
    <p class="card-subtitle">
      Use this detailed guide to understand EMI calculation, loan cost, and strategies to reduce interest. It includes
      long tail keyword coverage so you can compare home loan EMI, personal loan EMI, and car loan EMI in one place.
    </p>
    <div class="toc-grid">
      <a href="#emi-basics">What is EMI and why it matters</a>
      <a href="#emi-formula">EMI formula and reducing balance method</a>
      <a href="#how-to-use">How to use this EMI calculator</a>
      <a href="#advanced-features">Advanced features and scenarios</a>
      <a href="#loan-types">EMI for home loan, personal loan, car loan</a>
      <a href="#prepayment">Prepayment strategy and interest savings</a>
      <a href="#rate-reset">Rate reset and refinancing choices</a>
      <a href="#affordability">EMI affordability ratio and eligibility</a>
      <a href="#reduce-emi">How to reduce EMI legally and safely</a>
      <a href="#faq">EMI calculator FAQs</a>
      <a href="#internal-links">Related calculators and internal links</a>
    </div>
  </nav>

  <article class="content card" aria-label="EMI calculator guide">
    <section id="emi-basics">
      <h2>What is EMI and why it matters for every loan in India</h2>
      <p>
        EMI means Equated Monthly Installment, which is the fixed monthly payment you make to repay a loan. For most loans
        in India, the EMI includes both principal and interest. You can use an EMI calculator to understand how much cash
        you need every month and how much the loan will cost over the full tenure. This is essential for home loans,
        personal loans, car loans, education loans, and even business loans. A reliable EMI calculator lets you compare
        lenders, plan budgets, and avoid taking a loan that feels affordable on day one but strains cash flow later.
      </p>
      <p>
        EMI is not just a single number. It affects your savings rate, emergency fund, insurance planning, and your
        ability to invest in SIPs or mutual funds. The right EMI should leave enough room for essentials, future goals,
        and unexpected expenses. When you compare EMI across different tenures and interest rates, you can choose a plan
        that balances total interest cost with monthly affordability. This page offers a complete EMI calculator for India
        with long tail keyword coverage so you can learn about EMI calculation, EMI formula, and the impact of prepayment
        without switching tools.
      </p>
    </section>

    <section id="emi-formula">
      <h2>EMI formula and the reducing balance method explained simply</h2>
      <p>
        The most common EMI calculation in India follows the reducing balance method. This means interest is calculated on
        the outstanding principal, not on the original loan amount. The standard EMI formula is:
      </p>
      <p class="formula">EMI = P x r x (1 + r)^n / ((1 + r)^n - 1)</p>
      <p>
        Here, P is the loan amount or principal, r is the monthly interest rate (annual rate divided by 12 and 100), and
        n is the number of months. The EMI stays the same each month, but the interest portion is high in the early months
        and reduces later. That is why you see a larger interest share at the start of the amortization schedule and a
        higher principal share near the end. This EMI calculator uses the reducing balance formula so the results match
        most bank loan statements and standard EMI schedules.
      </p>
      <p>
        A flat rate EMI calculation is different because it calculates interest on the full principal for the entire
        tenure. The flat method is less transparent and usually more expensive when converted into an effective annual
        rate. If you need a flat rate comparison, use our
        <a href="/loan-tools/flat-rate-calculator" data-navigate>flat rate calculator</a> and compare the effective cost.
      </p>
    </section>

    <section id="how-to-use">
      <h2>How to use this EMI calculator step by step</h2>
      <p>
        Start by entering your loan amount, interest rate, and tenure in years and months. You can use the sliders for a
        fast estimate or type exact values for precise planning. Next, enter your net monthly income to see the EMI to
        income ratio. This ratio is a quick affordability check, especially for first time borrowers in India who want to
        keep EMI below 40 percent of income.
      </p>
      <p>
        If you know the expected loan start month, select it to get a realistic payoff date. Then open the advanced
        options if you want to add extra monthly payment, a one time prepayment, or a rate reset for floating loans. The
        calculator will instantly update the EMI, total interest, and amortization schedule. Use the "Download CSV" option
        to save the EMI schedule for your financial planner or bank discussion. This is especially useful when comparing
        home loan EMI offers or negotiating a personal loan with a lower rate.
      </p>
    </section>

    <section id="advanced-features">
      <h2>Advanced EMI calculator features for serious borrowers</h2>
      <p>
        This EMI calculator includes advanced inputs that go beyond basic tools. You can model extra monthly payments to
        reduce tenure, add a one time prepayment for bonus income, or simulate a floating rate reset that changes EMI in
        the future. These options are critical for real world loans because rates change and borrowers often prepay to
        save interest. The calculator also estimates processing fees to show the effective loan cost, which matters when
        comparing lenders with similar EMI but different fees.
      </p>
      <p>
        We also provide quick scenario comparisons so you can see how a 0.5 percent rate change impacts EMI, or how
        shortening tenure by 24 months increases EMI but reduces total interest. These insights help you choose a plan
        based on both cash flow and long term savings. If you want a detailed breakdown, open the amortization schedule or
        export the CSV for analysis. For deeper planning, explore the
        <a href="/loan-tools/refinancing-calculator" data-navigate>refinancing calculator</a> and
        <a href="/loan-tools/amortization-schedule-viewer" data-navigate>amortization schedule viewer</a> from our loan
        tools hub.
      </p>
    </section>

    <section id="loan-types">
      <h2>EMI calculator for home loan, personal loan, car loan, and more</h2>
      <p>
        A home loan EMI calculator in India often needs longer tenure, usually 10 to 30 years, and lenders apply
        collateral and a lower rate compared to unsecured loans. This tool supports long tenures and helps you evaluate
        the interest cost difference between a 20 year and a 25 year home loan. Use the
        <a href="/calculators/home-loan-emi-calculator" data-navigate>home loan EMI calculator</a> for a focused version,
        or compare with the
        <a href="/calculators/loan-calculator" data-navigate>loan calculator</a> for general planning.
      </p>
      <p>
        Personal loan EMI calculation typically involves shorter tenure, higher rates, and a strong focus on affordability
        because these loans are unsecured. With our personal loan EMI calculator, you can test how a higher interest rate
        impacts the monthly installment and total interest, and whether a prepayment plan can save money. Try the
        <a href="/calculators/personal-loan-emi-calculator" data-navigate>personal loan EMI calculator</a> for a quick view.
      </p>
      <p>
        Car loan EMI calculation depends on down payment, vehicle cost, and tenure. A lower tenure usually reduces total
        interest, but increases EMI. This EMI calculator helps you compare new car loan EMI and used car loan EMI using the
        same formula. Use the
        <a href="/calculators/car-loan-emi-calculator" data-navigate>car loan EMI calculator</a> to focus on vehicle
        specific assumptions.
      </p>
      <p>
        You can also apply this EMI calculator to education loans, business loans, and gold loans because the core EMI
        formula remains the same. The key is to use correct rate and tenure. If you need guidance on terms and loan types,
        read
        <a href="/learn/loans/what-is-emi" data-navigate>what is EMI</a> and
        <a href="/learn/loans/types-of-loans" data-navigate>types of loans</a> in our learning center.
      </p>
    </section>

    <section id="emi-example">
      <h2>EMI calculation example for common Indian loan sizes</h2>
      <p>
        A practical EMI example helps you see how the formula behaves in real life. Suppose you take a 20 lakh home loan
        in India at 8.5 percent for 20 years. The EMI is roughly 17,356 INR per month, and the total interest can exceed
        the principal over such a long tenure. Now compare this with a 20 lakh home loan EMI over 15 years. The EMI rises,
        but the total interest drops significantly. This is exactly why an EMI calculator for home loan India should show
        both the monthly cash flow and the total interest cost.
      </p>
      <p>
        For a personal loan EMI example, consider a 5 lakh personal loan at 13 percent for 4 years. The EMI will be higher
        because of the shorter tenure and higher rate, but the total interest stays controlled. A car loan EMI calculator
        example might use a 7 lakh loan at 9 percent for 5 years, which produces a moderate EMI and a total interest that
        is lower than long tenure home loans. These examples show why comparing tenure, interest rate, and prepayment is
        critical before signing any loan agreement.
      </p>
      <ul>
        <li>Home loan EMI calculator India example: 20,00,000 INR at 8.5 percent for 20 years.</li>
        <li>Personal loan EMI calculator example: 5,00,000 INR at 13 percent for 4 years.</li>
        <li>Car loan EMI calculator example: 7,00,000 INR at 9 percent for 5 years.</li>
      </ul>
    </section>

    <section id="prepayment">
      <h2>Prepayment strategy to reduce EMI interest and tenure</h2>
      <p>
        Prepayment is one of the most effective ways to reduce total interest paid on a loan. By paying extra monthly EMI
        or making a one time part prepayment, you reduce the outstanding principal faster. Since interest is calculated on
        the outstanding principal, the total interest over the loan tenure drops. Most Indian banks keep EMI constant and
        reduce tenure when you prepay. This calculator follows that approach to give a realistic view of interest savings.
      </p>
      <p>
        Use prepayment wisely. If your loan interest rate is higher than the returns you can earn from safe investments,
        prepaying can be a good choice. On the other hand, if you have higher return opportunities or tax benefits, you
        might prefer to invest instead of prepaying. Use the prepayment input to test a range of options and compare the
        interest saved. For a detailed analysis, use the
        <a href="/loan-tools/prepayment-calculator" data-navigate>prepayment calculator</a> and
        <a href="/loan-tools/debt-strategies" data-navigate>debt strategies guide</a>.
      </p>
    </section>

    <section id="rate-reset">
      <h2>Rate reset, floating rates, and refinancing decisions</h2>
      <p>
        Many loans in India use floating interest rates that reset periodically based on a benchmark. A small rate change
        can significantly alter the EMI over a long tenure. Use the rate reset option to simulate a higher or lower rate
        after a set number of months. This helps you stress test your monthly budget and identify a safe EMI level. When
        rates fall, you can consider refinancing or negotiating a lower rate with the lender to save interest.
      </p>
      <p>
        If you plan to refinance, compare the revised EMI, processing fees, and the remaining tenure. Refinancing makes
        sense when the interest rate drop is large enough to cover fees and still reduce total cost. The
        <a href="/loan-tools/refinancing-calculator" data-navigate>refinancing calculator</a> can help you decide, and the
        amortization schedule will show exactly how the balance changes after the rate reset.
      </p>
    </section>

    <section id="affordability">
      <h2>EMI affordability ratio and eligibility basics</h2>
      <p>
        Banks in India typically prefer an EMI to income ratio between 30 and 40 percent. A higher ratio can reduce your
        eligibility or increase risk during emergencies. This calculator provides an EMI to income ratio so you can test
        different loan amounts and tenures. If the ratio is too high, consider a longer tenure, a lower loan amount, or a
        higher down payment. Another option is to increase income by adding a co-applicant, which can improve eligibility.
      </p>
      <p>
        Use our
        <a href="/calculators/loan-eligibility" data-navigate>loan eligibility calculator</a> and
        <a href="/loan-tools/loan-affordability" data-navigate>loan affordability checker</a> to assess whether you qualify
        for the EMI you target. For home loans, also check
        <a href="/learn/home-loans/home-loan-eligibility" data-navigate>home loan eligibility</a> and understand the role
        of CIBIL score, income stability, and existing obligations.
      </p>
    </section>

    <section id="reduce-emi">
      <h2>How to reduce EMI legally and safely</h2>
      <p>
        Reducing EMI is not only about lowering the interest rate. You can reduce EMI by increasing the down payment,
        choosing a longer tenure, or refinancing at a better rate. However, a longer tenure increases total interest, so
        use it strategically. If you expect a salary increase, you can choose a longer tenure now and prepay later to
        reduce total cost.
      </p>
      <p>
        Another option is to select a loan with a balance transfer or rate reset feature. You can also use prepayment
        bonuses, such as yearly performance incentives, to reduce principal. Always compare the effective cost including
        processing fee, foreclosure charges, and prepayment penalties if any. This EMI calculator lets you include
        processing fees so you can estimate the real cost.
      </p>
      <ul>
        <li>Increase down payment to reduce principal and EMI.</li>
        <li>Use prepayment to reduce tenure and total interest.</li>
        <li>Compare floating and fixed rates based on expected trends.</li>
        <li>Check eligibility and avoid over leveraging income.</li>
        <li>Review insurance and emergency fund before finalizing EMI.</li>
      </ul>
    </section>

    <section id="faq">
      <h2>EMI calculator FAQs for Indian borrowers</h2>
      <p>
        These frequently asked questions address common EMI doubts for home loan, personal loan, and car loan borrowers.
        If you need more help, explore our loan learning center and calculators.
      </p>
      <div class="faq-grid">
        <details>
          <summary>Is this EMI calculator accurate for banks in India?</summary>
          <p>
            Yes. It uses the standard reducing balance EMI formula used by Indian banks. Actual EMI may vary slightly
            based on rounding or daily interest calculations, but the results are very close to bank schedules.
          </p>
        </details>
        <details>
          <summary>Does the EMI change when interest rates change?</summary>
          <p>
            For floating rate loans, EMI can change when the rate resets. This calculator simulates a rate reset so you
            can see how EMI changes after a specific number of months.
          </p>
        </details>
        <details>
          <summary>Should I reduce EMI or tenure when I prepay?</summary>
          <p>
            Most borrowers prefer to reduce tenure while keeping EMI constant because it saves more interest. This tool
            models that approach by default.
          </p>
        </details>
        <details>
          <summary>How do I decide the best tenure for EMI?</summary>
          <p>
            Choose a tenure that keeps EMI affordable but does not inflate total interest. Compare multiple tenures and
            check your EMI to income ratio for safety.
          </p>
        </details>
        <details>
          <summary>Can I use this for education loan EMI calculation?</summary>
          <p>
            Yes. Enter the loan amount, rate, and tenure for your education loan to calculate EMI and total interest.
          </p>
        </details>
      </div>
    </section>

    <section id="internal-links">
      <h2>Related EMI calculators and internal links for deeper planning</h2>
      <p>
        For complete planning, explore these internal links across the MoneyCal codebase. Each tool focuses on a specific
        loan or repayment decision and supports long tail searches such as "home loan EMI calculator India", "personal loan
        EMI calculator with prepayment", and "EMI affordability calculator".
      </p>
      <div class="link-grid">
        <a href="/calculators/emi-calculator" data-navigate>EMI calculator (quick)</a>
        <a href="/calculators/home-loan-emi-calculator" data-navigate>Home loan EMI calculator</a>
        <a href="/calculators/personal-loan-emi-calculator" data-navigate>Personal loan EMI calculator</a>
        <a href="/calculators/car-loan-emi-calculator" data-navigate>Car loan EMI calculator</a>
        <a href="/loan-tools/prepayment-calculator" data-navigate>Prepayment calculator</a>
        <a href="/loan-tools/loan-affordability" data-navigate>Loan affordability checker</a>
        <a href="/loan-tools/amortization-schedule-viewer" data-navigate>Amortization schedule viewer</a>
        <a href="/loan-tools/refinancing-calculator" data-navigate>Refinancing calculator</a>
        <a href="/calculators/loan-eligibility" data-navigate>Loan eligibility calculator</a>
        <a href="/learn/loans/what-is-emi" data-navigate>What is EMI guide</a>
        <a href="/learn/home-loans/emi-calculator-guide" data-navigate>Home loan EMI guide</a>
        <a href="/tools/emi-affordability" data-navigate>EMI affordability tool</a>
      </div>
    </section>
  </article>
</main>

<style>
  :global(body) {
    margin: 0;
  }
  .emi-page {
    background: #f8fafc;
    color: #0f172a;
  }
  .hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 2.5rem 1.5rem 2rem;
    background: linear-gradient(135deg, #e0f2fe 0%, #ede9fe 100%);
  }
  .hero-content h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin: 0.5rem 0 1rem;
  }
  .hero-content p {
    line-height: 1.7;
    margin: 0 0 1.5rem;
  }
  .eyebrow {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #2563eb;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .btn {
    border-radius: 999px;
    padding: 0.65rem 1.25rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .btn.primary {
    background: #2563eb;
    color: #fff;
  }
  .btn.ghost {
    background: #fff;
    color: #2563eb;
    border-color: #c7d2fe;
  }
  .hero-highlights {
    display: grid;
    gap: 1rem;
  }
  .hero-highlights div {
    background: #fff;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  }
  .hero-highlights strong {
    display: block;
    margin-bottom: 0.3rem;
  }
  .hero-panel {
    background: #0f172a;
    color: #fff;
    border-radius: 1.5rem;
    padding: 1.5rem;
    display: grid;
    gap: 1.5rem;
  }
  .panel-card {
    background: rgba(255, 255, 255, 0.08);
    padding: 1.25rem;
    border-radius: 1rem;
  }
  .panel-label {
    font-size: 0.9rem;
    color: #cbd5f5;
  }
  .panel-value {
    font-size: 2rem;
    font-weight: 700;
    margin: 0.3rem 0;
  }
  .panel-meta {
    color: #e2e8f0;
    font-size: 0.85rem;
  }
  .panel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }
  .panel-grid span {
    color: #cbd5f5;
    font-size: 0.8rem;
  }
  .panel-grid strong {
    display: block;
    margin-top: 0.4rem;
  }

  .calculator-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem;
  }
  .card {
    background: #fff;
    border-radius: 1.25rem;
    padding: 1.5rem;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  }
  .card h2 {
    margin: 0 0 0.5rem;
  }
  .card-subtitle {
    margin: 0 0 1.5rem;
    color: #475569;
    font-size: 0.95rem;
  }
  .input-group {
    margin-bottom: 1.25rem;
  }
  .input-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .input-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .input-row.two {
    align-items: flex-start;
  }
  .input-row.two > div {
    flex: 1;
  }
  input[type='number'],
  input[type='month'] {
    width: 100%;
    padding: 0.65rem 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid #cbd5f5;
    font-size: 1rem;
  }
  input[type='range'] {
    width: 100%;
    margin-top: 0.5rem;
  }
  .input-hint {
    font-size: 0.8rem;
    color: #64748b;
    white-space: nowrap;
  }
  .micro {
    font-size: 0.8rem;
    color: #64748b;
  }
  .toggle {
    background: #e0e7ff;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 999px;
    font-weight: 600;
    color: #1e40af;
    cursor: pointer;
  }
  .advanced-grid {
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
  }
  .toggle-row label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .result-card .result-hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    background: #eff6ff;
    padding: 1rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
  .result-hero span {
    color: #475569;
    font-size: 0.85rem;
  }
  .result-hero strong {
    font-size: 1.4rem;
  }
  .result-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .result-grid span {
    font-size: 0.8rem;
    color: #64748b;
  }
  .result-grid strong {
    display: block;
    margin-top: 0.3rem;
  }
  .notice {
    padding: 0.75rem 1rem;
    background: #fef3c7;
    border-radius: 0.75rem;
    color: #92400e;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  .ratio {
    margin: 1rem 0;
  }
  .ratio-bar {
    height: 10px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
  }
  .ratio-interest {
    height: 100%;
    background: linear-gradient(90deg, #f97316, #ef4444);
  }
  .ratio-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 0.4rem;
  }
  .scenario-card {
    background: #f8fafc;
    border-radius: 1rem;
    padding: 1rem;
  }
  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 0.75rem;
  }
  .scenario-grid span {
    font-size: 0.8rem;
    color: #64748b;
  }
  .scenario-grid strong {
    display: block;
    margin-top: 0.3rem;
  }

  .schedule {
    margin: 0 1.5rem 1.5rem;
  }
  .schedule-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .schedule-actions {
    display: flex;
    gap: 0.75rem;
  }
  .table-wrap {
    overflow-x: auto;
    margin-top: 1rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  th,
  td {
    padding: 0.65rem;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
  }
  th {
    background: #f1f5f9;
    font-weight: 600;
  }
  .positive {
    color: #16a34a;
  }
  .negative {
    color: #dc2626;
  }

  .toc {
    margin: 0 1.5rem 1.5rem;
  }
  .toc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
  }
  .toc-grid a {
    padding: 0.6rem 0.75rem;
    background: #f8fafc;
    border-radius: 0.75rem;
    text-decoration: none;
    color: #1e3a8a;
    font-weight: 600;
  }

  .content {
    margin: 0 1.5rem 2rem;
  }
  .content section {
    margin-bottom: 2rem;
  }
  .content h2 {
    margin-top: 0;
  }
  .content p {
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  .formula {
    font-weight: 700;
    font-size: 1.05rem;
    background: #f1f5f9;
    padding: 0.75rem;
    border-radius: 0.75rem;
  }
  .faq-grid {
    display: grid;
    gap: 1rem;
  }
  .faq-grid details {
    background: #f8fafc;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
  }
  .link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.75rem;
  }
  .link-grid a {
    background: #eef2ff;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    text-decoration: none;
    color: #1e3a8a;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .hero,
    .calculator-grid {
      padding: 1.5rem 1rem;
    }
    .schedule,
    .toc,
    .content {
      margin: 0 1rem 1.5rem;
    }
    .hero-actions {
      flex-direction: column;
      align-items: stretch;
    }
    .schedule-actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
