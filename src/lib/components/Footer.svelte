<script lang="ts">
  const footerSections = [
    {
      title: 'Tools & Calculators',
      links: [
        { href: '/', label: 'Home' },
        { href: '/calculators', label: 'Calculators' },
        { href: '/tools', label: 'All Tools' },
        { href: '/tax-tools', label: 'Tax Tools' },
        { href: '/gst-tools', label: 'GST Tools' },
        { href: '/gold-tools', label: 'Gold Tools' },
        { href: '/loan-tools', label: 'Loan Tools' },
        { href: '/insurance-tools', label: 'Insurance Tools' },
      ],
    },
    {
      title: 'Learn & News',
      links: [
        { href: '/learn', label: 'Learn' },
        { href: '/blog', label: 'Blog' },
        { href: '/news', label: 'News' },
        { href: '/news/shorts', label: 'Money Shorts' },
        { href: '/government-schemes', label: 'Govt Schemes' },
        { href: '/crypto', label: 'Crypto' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about-us', label: 'About Us' },
        { href: '/contact-us', label: 'Contact' },
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/terms-of-service', label: 'Terms of Service' },
        { href: '/disclaimer', label: 'Disclaimer' },
      ],
    },
  ];
</script>

<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <div class="footer-brand">
      <a href="/" class="footer-logo">MoneyCal.in</a>
      <p class="footer-tagline">Free financial calculators & tools for India. Tax, Gold, GST, Loans & more.</p>
    </div>
    <div class="footer-grid">
      {#each footerSections as section}
        <div class="footer-col">
          <h3 class="footer-title">{section.title}</h3>
          <ul class="footer-links">
            {#each section.links as link}
              <li>
                <a href={link.href} class="footer-link">{link.label}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
    <div class="footer-bottom">
      <p>© {new Date().getFullYear()} MoneyCal.in. All tools free. No sign-up required.</p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background: linear-gradient(180deg, #f8fafc, #f1f5f9);
    border-top: 1px solid #e2e8f0;
    padding: 2.5rem 1rem 1.5rem;
    margin-top: auto;
  }
  .footer-inner {
    max-width: 80rem;
    margin: 0 auto;
  }
  .footer-brand {
    margin-bottom: 2rem;
  }
  .footer-logo {
    display: inline-block;
    font-weight: 800;
    font-size: 1.25rem;
    color: #0f172a;
    text-decoration: none;
    margin-bottom: 0.5rem;
  }
  .footer-logo:hover {
    color: #2563eb;
  }
  .footer-tagline {
    font-size: 0.875rem;
    color: #64748b;
    max-width: 28rem;
    margin: 0;
  }
  .footer-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .footer-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .footer-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .footer-title {
    font-size: 0.875rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.75rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .footer-links {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .footer-links li {
    margin-bottom: 0.5rem;
  }
  .footer-link {
    display: inline-block;
    padding: 0.25rem 0;
    padding: 0.35rem 0;
    font-size: 0.9375rem;
    color: #475569;
    text-decoration: none;
  }
  .footer-link:hover {
    color: #2563eb;
    text-decoration: underline;
  }
  .footer-bottom {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
    text-align: center;
  }
  .footer-bottom p {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }
</style>
