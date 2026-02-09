<script lang="ts">
  const title = 'News | MoneyCal India';
  const description = 'Latest news and short updates on economy, markets, startups, and personal finance.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="https://moneycal.in/news" />
</svelte:head>

<main class="container">
  <h1>News</h1>
  <p>{description}</p>
  <a href="/">← Home</a>
</main>
