<script>
  export let data;
  export let error;
  console.log("homepageGallery in script:", data); // Debugging log
</script>

<svelte:head>
  <title>Kana Motojima</title>
</svelte:head>

{#if error}
  <p>{error}</p>
{:else if data}
  <div>
    <h1>{data.props.data.title}</h1>
    <p>{data.props.data.description}</p>
    <div class="relative w-full h-screen">
      {#each data.props.data.photos as { title, imageUrl }}
        <div class="photo">
          <h2>{title}</h2>
          <img src={imageUrl} alt={title} />
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style>
  .photo {
    position: absolute;
  }
</style>
