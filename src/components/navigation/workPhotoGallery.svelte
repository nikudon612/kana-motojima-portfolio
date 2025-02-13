<script>
  import { onMount } from "svelte";
  import SlideshowModal from "../navigation/slideshow.svelte";
  import { createEventDispatcher } from "svelte";

  export let currentPhotos = [];
  export let initialPhotoIndex = 0;
  export let close;
  export let isClosing = false;
  export let projectTitle;
  export let galleryVisible = false;
  let slideshowVisible = false;
  // export let initialPhotoIndex;
  let slideshowImages = [];
  let currentIndex = initialPhotoIndex || 0;
  let imagesLoaded = []; // ✅ Keep track of loaded images
  export let fadingOut = false; // ✅ Receive it from parent
  let imageVisible = false;

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

    // ✅ Ensure gallery and slideshow stay open
    galleryVisible = true;
    slideshowVisible = true;

    // ✅ Dispatch event to parent to keep the hovered project active
    dispatch("openSlideshow", {
      images: currentPhotos,
      index: currentIndex,
      title: projectTitle,
      hoveredWork: { title: projectTitle, photos: currentPhotos }, // Preserve hovered project
    });
  }

  function closeSlideshow() {
    slideshowVisible = false;
  }

  $: if (currentPhotos.length > 0) {
    imageVisible = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        imageVisible = true;
      });
    });
  }
</script>

<div class="modal-overlay {isClosing ? 'fade-out' : ''}" on:click={handleClose}>
  <div class="modal-content">
    {#each currentPhotos as photo, index}
      <img
        src={photo.thumbnailUrl}
        alt="Project photo"
        class="gallery-photo {photo.orientation} {index === 0
          ? 'first-photo'
          : ''} {fadingOut ? 'fade-out' : 'fade-in'}"
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
    contain: layout;
  }

  .gallery-photo {
    position: fixed;
    object-fit: cover;
    /* transform: translate(-50%, -50%); */
    transform: translate3d(-50%, -50%, 0); /* ✅ Uses GPU acceleration */
    pointer-events: auto;
    opacity: 0;
    will-change: transform, opacity;
    transition:
      opacity 0.3s ease-in-out,
      transform 0.3s ease-in-out;
    transform: scale(0.95); /* Slight scale down effect */
  }

  .gallery-photo:hover {
    cursor: pointer;
  }

  /* Portrait Images: Fixed height */
  .gallery-photo.portrait {
    height: 325px !important;
    width: auto !important; /* Maintain aspect ratio */
    max-height: 325px !important;
    max-width: none !important;
  }

  /* Landscape Images: Fixed width */
  .gallery-photo.landscape {
    width: 325px !important;
    height: auto !important; /* Maintain aspect ratio */
    max-width: 325px !important;
    max-height: none !important;
  }

  .gallery-photo.fade-in {
    opacity: 1 !important;
    /* transform: scale(1); */
  }

  .gallery-photo.modal-overlay.fade-out {
    opacity: 0 !important;
    /* transform: scale(1.05); */
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
</style>
