<script>
  import SlideshowModal from "./slideshowModal.svelte";

  export let data;
  let showModal = false;
  let currentIndex = 0;
  let images = data.props.data.photos;
  let delayIncrement = 0.1;

  function handleImageClick(index) {
    currentIndex = index;
    showModal = true;
  }

  function closeModal() {
    console.log("Modal closed");
    showModal = false;
  }
</script>

<div class="gallery-container">
  {#each images as { title, imageUrl, x, y }, index}
    <div
      class="image-container"
      style="--delay: {index * delayIncrement}s; left: {x}px; top: {y}px;"
      on:click={() => handleImageClick(index)}
    >
      <img
        src={imageUrl}
        alt={title}
        class="image"
      />
    </div>
  {/each}
</div>

{#if showModal}
  <SlideshowModal {images} {currentIndex} on:close={closeModal} />
{/if}

<style>
  .gallery-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1000;
  }

  .image-container {
    position: absolute;
    cursor: pointer;
    animation: fadeIn 1s forwards;
    animation-delay: var(--delay);
  }

  .image {
    max-width: 275px;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .kana-text a {
    color: black;
    mix-blend-mode: difference;
    background: transparent;
    padding: 0.5rem;
    border-radius: 5px;
  }
</style>
