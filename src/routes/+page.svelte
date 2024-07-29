<script>
  import HomepageGallery from "../components/homepage/homepageGallery.svelte";

  export let data;
  export let error;
  // console.log("homepageGallery in script:", data); // Debugging log
</script>

<svelte:head>
  <title>Kana Motojima</title>
</svelte:head>

{#if error}
  <p>{error}</p>
{:else if data}
  <HomepageGallery {data} />
{:else}
  <p>Loading...</p>
{/if}
