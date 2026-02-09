<script lang="ts">
  const title = 'MoneyCal India – Financial Calculators & Tools';
  const description = "India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users.";
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

<main class="container">
  <h1>MoneyCal India</h1>
  <p class="lead">Financial Calculators & Tools for India</p>
  <p>{description}</p>
  <nav>
    <ul>
      <li><a href="/calculators">Calculators</a></li>
      <li><a href="/news">News</a></li>
      <li><a href="/learn">Learn</a></li>
      <li><a href="/tools">Tools</a></li>
      <li><a href="/finance-tools">Finance Tools</a></li>
      <li><a href="/tax-tools">Tax Tools</a></li>
      <li><a href="/gst-tools">GST Tools</a></li>
      <li><a href="/insurance-tools">Insurance Tools</a></li>
      <li><a href="/government-schemes">Government Schemes</a></li>
      <li><a href="/crypto">Crypto</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about-us">About</a></li>
      <li><a href="/contact-us">Contact</a></li>
    </ul>
  </nav>
</main>

<style>
  .lead {
    font-size: 1.25rem;
    color: #374151;
  }
  nav ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
</style>
