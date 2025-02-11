<script>
  import HomepageGallery from "../components/homepage/homepageGallery.svelte";
  console.log("Built by Nick Bechtel - https://www.nickbechtel.com");

  export let data;
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/dpd3bwl.css">
  <title>Kana Motojima</title>
</svelte:head>

{#if !data}
  <p>Failed to load homepage gallery. Please try again later.</p>
{:else}
  <HomepageGallery {data} />
{/if}


