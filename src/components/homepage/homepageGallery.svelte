<script>
  import SlideshowModal from "./slideshowModal.svelte";

  export let data;
  let showModal = false;
  let currentIndex = 0;
  let images = data.props.data.photos;
  let delayIncrement = 0.1; // seconds

  function handleImageClick(index) {
    currentIndex = index;
    showModal = true;
  }

  function closeModal() {
    console.log("Modal closed");
    showModal = false;
  }
</script>

<div
  class="w-full h-screen relative mobile:flex mobile:flex-col mobile:items-center mobile:gap-0 mobile:px-0"
>
  {#each images as { title, imageUrl, x, y }, index}
    <div
      class="absolute mobile:static cursor-pointer fade-in image-container"
      style="--delay: {index * delayIncrement}s; left: {x}px; top: {y}px;"
      on:click={() => handleImageClick(index)}
    >
      <img
        src={imageUrl}
        alt={title}
        class="desktop:max-w-[275px] w-full h-auto object-contain"
      />
    </div>
  {/each}
  <!-- <div
    class="kana-text hidden mobile:block fixed right-[-3rem] bottom-[6rem] text-lg font-bold z-2001 -rotate-90"
  >
    <a href="/" class="">Kana Motojima</a>
  </div> -->
</div>

{#if showModal}
  <SlideshowModal {images} {currentIndex} on:close={closeModal} />
{/if}

<style>
  .fade-in {
    opacity: 0;
    animation: fadeIn 1s forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .image-container {
    animation-delay: var(--delay);
  }

  .kana-text a {
    color: black;
    mix-blend-mode: difference;
    background: transparent;
    padding: 0.5rem;
    border-radius: 5px;
    white-space: nowrap;
  }
</style>
