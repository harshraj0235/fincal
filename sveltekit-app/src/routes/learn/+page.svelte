<script lang="ts">
  const title = 'Learn | MoneyCal India';
  const description = 'Free guides on personal finance, loans, insurance, investing, tax, and money management for India.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="https://moneycal.in/learn" />
</svelte:head>

<main class="container">
  <h1>Learn</h1>
  <p>{description}</p>
  <a href="/">← Home</a>
</main>
