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
      <div class="relative w-full h-screen">
        {#each data.props.data.photos as { title, imageUrl, x, y }}
          <div class="photo" style="left: {x}px; top: {y}px;">
            <img
              src={imageUrl}
              alt={title}
              class="photo-image"
            />
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
  
    .photo-image {
      max-width: 320px;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  
    .relative {
      position: relative;
    }
  </style>
  