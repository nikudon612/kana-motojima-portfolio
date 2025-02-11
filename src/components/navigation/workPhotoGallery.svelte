<script>
  import { onMount } from "svelte";
  import SlideshowModal from "../navigation/slideshow.svelte";
  import { createEventDispatcher } from "svelte";

  export let currentPhotos = [];
  export let initialPhotoIndex = 0;
  export let close;
  export let isClosing = false;
  export let projectTitle;
  let slideshowVisible = false;
  // export let initialPhotoIndex;
  let slideshowImages = [];
  let currentIndex = initialPhotoIndex || 0;

  const dispatch = createEventDispatcher();

  function handleClose(event) {
    event.stopPropagation(); // Prevent click from closing menu
    if (!slideshowVisible) {
      close(); // Emit close event to parent
    }
  }

  // Function to handle image click
  function handleImageClick(index) {
    currentIndex = index;
    console.log("Gallery Clicked image index:", index);
    // Dispatch an event to open the slideshow with the current images and index
    dispatch("openSlideshow", {
      images: currentPhotos,
      index: currentIndex,
      title: projectTitle, // Replace with the actual project title if available
    });
  }

  function closeSlideshow() {
    slideshowVisible = false;
  }

  // $: if (!slideshowVisible) {
  //   setTimeout(() => {
  //     slideshowImages = [...currentPhotos]; // Update images after fade-out
  //   }, 300); // Delay matches transition duration
  // }
</script>

<div class="modal-overlay {isClosing ? 'fade-out' : ''}" on:click={handleClose}>
  <div class="modal-content delay-appearance">
    {#each currentPhotos as photo, index}
      <img
        src={photo.url}
        alt="Project photo"
        class="gallery-photo"
        style="top: {photo.Work_Y}%; left: {photo.Work_X}%;"
        on:click={() => handleImageClick(index)}
      />
    {/each}
  </div>
</div>

<!-- {#if slideshowVisible}
  <div class="slideshow-modal">
    <SlideshowModal
      slideshowImages={currentPhotos}
      {currentIndex}
      {projectTitle}
      on:close={closeSlideshow}
    />
  </div>
{/if} -->

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 2010;
    pointer-events: none;
    opacity: 1;
  }

  .modal-overlay.fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .modal-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    pointer-events: none;
  }

  .gallery-photo {
    position: fixed;
    object-fit: cover;
    transform: translate(-50%, -50%);
    max-width: 250px;
    width: 100%;
    pointer-events: auto;
    opacity: 0;
    transition:
      opacity 0.6s ease-in-out 0.3s,
      /* 300ms delay for fade-in */ transform 0.6s ease-in-out;
    transform: scale(0.95); /* Slight scale down effect */
  }

  .gallery-photo.fade-in {
    opacity: 1;
    transform: scale(1); /* Scale back to normal */
  }

  .gallery-photo.modal-overlay.fade-out {
    opacity: 0;
    transform: scale(1.05); /* Scale slightly up before disappearing */
  }

  .slideshow-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999; /* Highest z-index to sit above other elements */
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto; /* Enable interaction */
  }

  .delay-appearance .gallery-photo {
    opacity: 1; /* Set to visible after delay */
  }
</style>
