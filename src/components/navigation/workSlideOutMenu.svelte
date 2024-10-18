<script>
  import { onMount } from "svelte";
  import { fetchProjects } from "../../lib/fetchSanityData";
  import PhotoGalleryModal from "../navigation/workPhotoGallery.svelte";
  import MobilePhotoGalleryModal from "../navigation/mobileModalPhotoGallery.svelte";
  import SlideshowModal from "./slideshow.svelte";

  export let isOpen = false;
  export let toggleMenu;
  export let isFadingOut = false;
  let works = [];
  let currentPhotos = [];
  let galleryVisible = false;
  let selectedWork = null;
  let isWhiteBackground = false;
  let isMobile = false;
  let zIndexClass = "";
  let initialPhotoIndex = 0;
  let slideshowVisible = false;
  let firstImageOfProject = "";
  let layerOpacity = 0;
  let layerBackground = "rgba(0, 0, 0, 0)"; // Start with a transparent background

  const transitionDuration = 1000; // Transition duration for both fade-out and slide

  // Handle fade-in and fade-out logic
  $: {
    if (isOpen && !isFadingOut) {
      setTimeout(() => {
        layerOpacity = 1;
        layerBackground = "rgba(0, 0, 0, 0.6)"; // Transition to dark background
      }, 50);
    } else if (isFadingOut) {
      layerOpacity = 0; // Start fade-out immediately
      layerBackground = "rgba(0, 0, 0, 0)"; // Reset background
    }
  }

  onMount(() => {
    const checkScreenSize = () => {
      isMobile = window.innerWidth <= 768;
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  });

  async function loadProjects() {
    try {
      works = await fetchProjects();
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  function closeSlideshowModal() {
    slideshowVisible = false;
  }

  function closeMenu() {
    isFadingOut = true;
    layerOpacity = 0; // Start fade-out immediately
    layerBackground = "rgba(0, 0, 0, 0)"; // Reset background

    // Start menu slide-out and opacity fade-out simultaneously
    setTimeout(() => {
      isFadingOut = false;
      toggleMenu(); // Hide the menu at the end of the fade-out and slide-out
    }, transitionDuration); // Match the fade-out duration
  }

  $: if (isOpen) {
    if (works.length === 0) {
      loadProjects();
    }
    zIndexClass = "z-index-top";
  } else if (!isOpen && !isFadingOut) {
    zIndexClass = "";
  }
</script>

<div class={`menu-container ${isOpen ? "open" : ""} ${zIndexClass}`}>
  {#if isOpen}
    <div
      class="opacity-layer {isWhiteBackground ? 'white-bg' : ''}"
      style="opacity: {layerOpacity}; background-color: {layerBackground}; transition: opacity {transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1), background-color {transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1);"
      on:click={closeMenu}
    ></div>
  {/if}

  <!-- Menu Content -->
  <div
    class={`menu ${isOpen ? "menu-open" : "menu-close"} ${galleryVisible ? "full-width" : ""}`}
    style="transition: transform {transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1);"
  >
    <div class="menu-left">
      <div class="menu-content">
        {#each works as work, index (work._id || index)}
          <p
            class="hover:!text-black/100"
            on:mouseover={() => openPhotoGalleryModal(work)}
            on:click={() => showPhotos(work)}
            class:selected={selectedWork === work.title}
          >
            {work.title}
          </p>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .menu-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 2000;
  }

  .bg-white {
    transform: translateX(100%);
    transition:
      transform 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
  }

  .bg-white.isOpen {
    transform: translateX(0);
  }

  .bg-white.isClosing {
    transform: translateX(100%);
  }

  .opacity-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0; /* Start invisible */
  }

  .opacity-layer.white-bg {
    background-color: rgba(255, 255, 255, 0.6); /* Semi-transparent white */
  }

  .opacity-layer.dark-bg {
    background-color: rgba(0, 0, 0, 0.6); /* Dark background by default */
  }

  /* The white background and text should only slide, no fade */
   .menu {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: white; /* No opacity changes */
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3rem;
    z-index: 2000;
    transform: translate3d(0, 0, 0); /* Start fully visible */
    transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .menu-close {
    transform: translate3d(-100%, 0, 0); /* Slide out of view */
  }

  .menu-open {
    transform: translate3d(0, 0, 0); /* Slide into view */
  }

  .menu.full-width {
    width: 100%;
  }

  .menu-content {
    text-align: left;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .menu-content p {
    display: inline-block;
    margin-bottom: 1em;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
    opacity: 0; /* Start hidden */
    transform: translate(50%, 0%) matrix(1, 0, 0, 1, 0, 0); /* Move back off-screen */
    transition:
      opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1),
      transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .menu-open .menu-content p {
    opacity: 1; /* Fade in */
    transform: translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0); /* Move into place */
  }

  .menu-content p.selected {
    color: black;
    font-weight: bold;
  }

  .menu-content p:not(.selected) {
    color: grey;
  }

  @media (max-width: 768px) {
    .menu {
      width: 100%;
      padding: 0;
    }
    .menu-content {
      padding: 1.5rem;
    }
    .mobile\:hidden {
      display: none;
    }
    .mobile\:block {
      display: block;
    }
  }

  .z-index-top {
    z-index: 2000;
  }
</style>
