<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Page Not Found</title>
</svelte:head>

<div class="error-page">
  <h1 class="font-bold text-2xl">{$page.status}: {$page.error.message}</h1>
  <p>Sorry, the page you are looking for does not exist.</p>
  <a href="/">Go back to the homepage</a>
</div>

<style>
  .error-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    z-index: 9999;
    text-align: center;
  }

  .error-page h1 {
    margin-bottom: 1rem;
  }

  .error-page a {
    color: blue;
    text-decoration: underline;
  }

  .error-page a:hover {
    text-decoration: none;
  }
</style>
