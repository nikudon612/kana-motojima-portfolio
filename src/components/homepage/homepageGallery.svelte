<script>
  import SlideshowModal from './slideshowModal.svelte';
  export let data;
  let showModal = false;
  let currentIndex = 0;
  let images = data.props.data.photos;

  function handleImageClick(index) {
    currentIndex = index;
    showModal = true;
  }

  function closeModal() {
    console.log('Modal closed');
    showModal = false;
  }
</script>

<div class="w-full h-screen relative mobile:flex mobile:flex-col mobile:items-center mobile:gap-2.5">
  {#each images as { title, imageUrl, x, y }, index}
    <div class="absolute mobile:static cursor-pointer" style="left: {x}px; top: {y}px;" on:click={() => handleImageClick(index)}>
      <img src={imageUrl} alt={title} class="desktop:max-w-[275px] w-full h-auto object-contain" />
    </div>
  {/each}
</div>

{#if showModal}
  <SlideshowModal {images} {currentIndex} on:close={closeModal} />
{/if}
