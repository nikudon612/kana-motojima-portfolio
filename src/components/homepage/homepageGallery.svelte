<script>
  import SlideshowModal from "./slideshowModal.svelte";
  export let data;
  let showModal = false;
  let currentIndex = 0;
  let images = data.props.data.photos;

  function handleImageClick(index) {
    currentIndex = index;
    showModal = true;
  }

  function closeModal() {
    console.log("Modal closed");
    showModal = false;
  }
</script>

<div class="w-full h-screen relative mobile:flex mobile:flex-col mobile:items-center">
  {#each images as { title, imageUrl, x, y }, index}
    <div class="absolute mobile:static cursor-pointer w-full" style="left: {x}px; top: {y}px;" on:click={() => handleImageClick(index)}>
      <img src={imageUrl} alt={title} class="w-full h-auto object-cover" />
    </div>
  {/each}
  <div class="hidden mobile:block fixed right-[-3rem] bottom-[6rem] text-lg font-bold z-2001 -rotate-90 kana-text">
    <a href="/">Kana Motojima</a>
  </div>
</div>

{#if showModal}
  <SlideshowModal {images} {currentIndex} on:close={closeModal} />
{/if}

<style>
  .mobile\:gap-0 {
    gap: 0 !important;
  }
  .mobile\:px-0 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .kana-text a {
    color: rgb(238, 238, 238); /* Set initial color to white */
    mix-blend-mode: exclusion; /* This will invert the color based on the background */
    background: transparent; /* Ensure background is transparent */
    padding: 0.5rem; /* Optional: add padding for better visibility */
    border-radius: 5px; /* Optional: add border radius for aesthetics */
    white-space: nowrap; /* Ensure the text doesn't wrap */
  }
</style>
