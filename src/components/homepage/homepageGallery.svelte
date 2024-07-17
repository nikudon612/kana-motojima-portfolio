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
  
  <div>
    <div class="w-full h-screen gallery">
      {#each images as { title, imageUrl, x, y }, index}
        <div class="photo" style="left: {x}px; top: {y}px;" on:click={() => handleImageClick(index)}>
          <img src={imageUrl} alt={title} class="photo-image" />
        </div>
      {/each}
    </div>
  </div>
  
  {#if showModal}
    <SlideshowModal {images} {currentIndex} on:close={closeModal} />
  {/if}
  
  <style>
    .photo {
      position: absolute;
      cursor: pointer;
    }
  
    .photo-image {
      max-width: 275px;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  
    .gallery {
      z-index: 1; /* Ensure this is lower than the navbar */
      position: relative;
    }
  </style>
  