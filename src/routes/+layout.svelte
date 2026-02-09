<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<div class="layout">
  <Header />
  <main id="main-content" class="main">
    <slot />
  </main>
  <Footer />
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .main {
    flex: 1 0 auto;
  }
</style>
