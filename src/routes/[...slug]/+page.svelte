<script lang="ts">
  import { page } from '$app/stores';

  const segmentTitles: Record<string, string> = {
    news: 'News',
    learn: 'Learn',
    tools: 'Tools',
    calculators: 'Calculators',
    'finance-tools': 'Finance Tools',
    'tax-tools': 'Tax Tools',
    'gst-tools': 'GST Tools',
    'insurance-tools': 'Insurance Tools',
    'government-schemes': 'Government Schemes',
    crypto: 'Crypto',
    blog: 'Blog',
    'about-us': 'About',
    'contact-us': 'Contact',
    'privacy-policy': 'Privacy Policy',
    disclaimer: 'Disclaimer',
    'cookie-policy': 'Cookie Policy',
    'terms-of-service': 'Terms of Service',
    'editorial-policy': 'Editorial Policy'
  };

  $: slug = $page.params.slug?.split('/').filter(Boolean) ?? [];
  $: first = slug[0] ?? '';
  $: baseTitle = segmentTitles[first] || first || 'MoneyCal India';
  $: title = slug.length <= 1 ? `${baseTitle} | MoneyCal India` : `${baseTitle} – ${slug.slice(1).join(' ')} | MoneyCal India`;
  $: description = `Free financial calculators and tools for India. EMI, SIP, tax, loans, investments, and more.`;
  $: canonical = `https://moneycal.in/${slug.join('/')}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
</svelte:head>

<main class="container">
  <h1>{baseTitle}</h1>
  <p>{description}</p>
  <a href="/">← Home</a>
</main>
