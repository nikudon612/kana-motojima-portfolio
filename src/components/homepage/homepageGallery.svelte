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

  // Find the image with the largest `y` value
  let maxYImage = images.reduce(
    (prev, curr) => (curr.y > prev.y ? curr : prev),
    images[0]
  );
  console.log("Last Image Y Position:", maxYImage.y);
</script>

<div class="gallery-container">
  {#each images as { title, imageUrl, x, y }, index}
    <div
      class="image-container"
      style="--delay: {index * delayIncrement}s; left: {x}px; top: {y}px;"
      on:click={() => handleImageClick(index)}
      class:last-image={y === maxYImage.y}
    >
      <img
        src={imageUrl}
        alt={title}
        class="image"
        style="animation-delay: {index * delayIncrement}s;"
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

  /* 🚀 This ensures space at the bottom */
  .image-container.last-image {
    padding-bottom: 3rem;
  }

  .image-container {
    position: absolute;
    cursor: pointer;
  }

  .image {
    max-width: 275px;
    width: 100%;
    height: auto;
    object-fit: contain;
    opacity: 0; /* Initial opacity */
    animation: fadeIn 1s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* @media (min-width: 1700px) {
    .image {
      max-width: 400px;
    }
  }
  
  @media (min-width: 2000px) {
    .image {
      max-width: 500px;
    }
  } */

  /* Mobile Layout */
  @media (max-width: 768px) {
    .gallery-container {
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    .image-container {
      position: static;
      /* margin-bottom: 1rem; */
      left: auto;
      top: auto;
      z-index: 1001;
    }
    /* 🚀 This ensures space at the bottom */
    .image-container.last-image {
      padding-bottom: 0rem;
    }

    .image {
      max-width: 100%;
      width: auto;
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
