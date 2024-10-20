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
  let layerBackground = "rgba(0, 0, 0, 0)";

  const transitionDuration = 1000;

  // Ensure the layer only becomes visible when needed
  $: {
    if (isOpen && !isFadingOut) {
      setTimeout(() => {
        layerOpacity = 1;
        layerBackground = "rgba(0, 0, 0, 0.6)";
      }, 50);
    } else if (isFadingOut) {
      layerOpacity = 0;
      layerBackground = "rgba(0, 0, 0, 0)";
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
    layerOpacity = 0;
    layerBackground = "rgba(0, 0, 0, 0)";

    setTimeout(() => {
      isFadingOut = false;
      toggleMenu();
    }, transitionDuration);
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

{#if isOpen || isFadingOut}
  <div class={`menu-container ${isOpen ? "open" : ""} ${zIndexClass}`}>
    <!-- Opacity Layer -->
    {#if layerOpacity > 0}
      <div
        class="opacity-layer {layerOpacity > 0 ? 'show' : ''} {isWhiteBackground
          ? 'white-bg'
          : ''}"
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

    <!-- Slideshow Modal -->
    {#if slideshowVisible}
      <SlideshowModal
        {currentPhotos}
        {initialPhotoIndex}
        on:close={closeSlideshowModal}
      />
    {/if}
  </div>
{/if}

<style>
  .menu-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 2000; /* Only active when the menu is open or fading out */
  }

  .menu {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3rem;
    z-index: 2000;
    transform: translate3d(-100%, 0, 0); /* Start off-screen */
    transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .menu-close {
    transform: translate3d(-100%, 0, 0); /* Fully off-screen when closed */
  }

  .menu-open {
    transform: translate3d(0, 0, 0); /* Fully visible when open */
  }

  .opacity-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0; /* Start invisible */
    pointer-events: none; /* Allow clicks to pass through when invisible */
    transition:
      opacity 1s cubic-bezier(0.25, 1, 0.5, 1),
      background-color 1s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .opacity-layer.show {
    pointer-events: auto; /* Intercept clicks when visible */
  }

  .menu-content p {
    display: inline-block;
    margin-bottom: 1em;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
    opacity: 0;
    transform: translate(50%, 0%);
    transition:
      opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1),
      transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .menu-open .menu-content p {
    opacity: 1;
    transform: translate(0%, 0%);
  }
</style>
