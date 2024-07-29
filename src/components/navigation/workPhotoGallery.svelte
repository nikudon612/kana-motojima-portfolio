<script>
  import { onMount, afterUpdate } from "svelte";
  import SlideshowModal from "./slideshow.svelte";

  export let currentPhotos = [];
  export let close;
  export let isClosing = false;
  export let projectTitle;
  let slideshowVisible = false;
  let slideshowImages = [];
  let currentIndex = 0;
  let previousPhotos = [];

  function handleClose(event) {
    event.stopPropagation(); // Prevent click from closing menu
    if (!slideshowVisible) {
      // console.log("Handle close called");
      close(); // Emit close event to parent
    }
  }

  function openSlideshow(index) {
    // console.log("Opening slideshow");
    slideshowImages = currentPhotos.map((photo) => ({
      imageUrl: photo.url,
      title: "",
    }));
    currentIndex = index;
    slideshowVisible = true;
    // console.log("Slideshow opened:", slideshowVisible, currentIndex);
  }

  function closeSlideshow() {
    // console.log("Closing slideshow");
    slideshowVisible = false;
    // console.log("Slideshow closed:", slideshowVisible);
  }

  function fadeInPhotos() {
    const photos = document.querySelectorAll('.gallery-photo');
    if (previousPhotos !== currentPhotos) {
      photos.forEach(photo => {
        photo.style.opacity = '0'; // Ensure starting opacity is 0
      });
      setTimeout(() => {
        photos.forEach(photo => {
          // console.log('Changing opacity to 1 for:', photo);
          photo.style.opacity = '1';
        });
      }, 300); // Delay before changing the opacity
    }
    previousPhotos = currentPhotos;
  }

  // Run fadeInPhotos on mount and after each update
  onMount(fadeInPhotos);
  afterUpdate(fadeInPhotos);
</script>

<div class="modal-overlay {isClosing ? 'fade-out' : ''}" on:click={handleClose}>
  <div class="modal-content">
    {#each currentPhotos as photo, index}
      <img
        src={photo.url}
        alt="Project photo"
        class="gallery-photo"
        style="top: {photo.Work_Y}%; left: {photo.Work_X}%;"
        on:click={() => openSlideshow(index)}
      />
    {/each}
  </div>
</div>

{#if slideshowVisible}
  <SlideshowModal {slideshowImages} {projectTitle} {currentIndex} on:close={closeSlideshow} />
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 1000;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
  }

  .modal-overlay.fade-out {
    opacity: 0;
  }

  .modal-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    pointer-events: none;
  }

  .gallery-photo {
    position: absolute;
    object-fit: cover;
    transform: translate(-50%, -50%);
    max-width: 250px;
    width: 100%;
    pointer-events: auto;
    opacity: 0; /* Start with opacity 0 */
    transition: opacity 1s ease-in-out;
  }
</style>
