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
  let initialPhotoIndex = 0; // Tracks the initial index for slideshow
  let slideshowVisible = false; // Used to trigger the slideshow modal
  let firstImageOfProject = "";
  $: galleryVisible = galleryVisible; // Force reactivity
  $: slideshowVisible = slideshowVisible; // Force reactivity
  $: isWhiteBackground = isWhiteBackground;

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

  // Show photos on hover but don't trigger the modal
  function openPhotoGalleryModal(work) {
    if (work.photos && work.photos.length > 0) {
      selectedWork = work.title;
      currentPhotos = work.photos;
      galleryVisible = true; // Show the gallery photos on hover
      isWhiteBackground = true;
      console.log("openphoto");
    } else {
      galleryVisible = false;
      isWhiteBackground = false;
      selectedWork = null;
      currentPhotos = [];
    }
  }

  // Show the first image in the slideshow when the project title is clicked
  function showPhotos(work) {
    if (!isMobile) {
      if (work.photos && work.photos.length > 0) {
        selectedWork = work.title;
        currentPhotos = work.photos;
        initialPhotoIndex = 0; // Always start from the first photo
        firstImageOfProject = currentPhotos[0].url;
        slideshowVisible = true;
        console.log("currentPhotos:", currentPhotos);
        console.log("title", selectedWork);
        console.log("showphotos");
      }
    } else {
      console.log("window is too small");
    }
  }

  // Close the slideshow modal
  function closeSlideshowModal() {
    slideshowVisible = false;
  }

  function closeMenu() {
    setTimeout(() => {
      isFadingOut = false;
      isOpen = false;
      galleryVisible = false;
      slideshowVisible = false;
      selectedWork = null;
      currentPhotos = [];
      toggleMenu();
      zIndexClass = "";
    }, 300); // Duration of the fade-out animation
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
      class={`opacity-layer ${isFadingOut ? "fade-out" : "fade-in"} ${isWhiteBackground ? "white-bg" : ""}`}
      on:click={closeMenu}
    ></div>
  {/if}
  <div
    class={`menu ${isOpen ? "menu-open" : "menu-close"} ${galleryVisible ? "full-width" : ""}`}
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

    {#if galleryVisible && !slideshowVisible}
      <div class="mobile:block desktop:hidden">
        <MobilePhotoGalleryModal
          {currentPhotos}
          projectTitle={selectedWork}
          initialPhotoIndex={0}
          close={() => {
            galleryVisible = false;
            isWhiteBackground = false;
          }}
        />
      </div>
      <div class="mobile:hidden tablet:hidden desktop:block">
        <PhotoGalleryModal
          {currentPhotos}
          projectTitle={selectedWork}
          initialPhotoIndex={0}
          close={() => {
            galleryVisible = false;
            isWhiteBackground = false;
          }}
        />
      </div>
    {/if}

    <!-- Slideshow modal will be shown only if slideshowVisible is true -->
    {#if slideshowVisible}
      <div class="mobile:hidden tablet:block">
        <SlideshowModal
          slideshowImages={currentPhotos}
          projectTitle={selectedWork}
          currentIndex={initialPhotoIndex}
          on:close={closeSlideshowModal}
        />
      </div>
    {/if}
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
    background-color: rgba(0, 0, 0, 0); /* Start transparent */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s ease-in-out; /* Smooth transition for background color */
    z-index: 1000; /* Below the menu */
  }

  .opacity-layer.fade-in {
    background-color: rgba(
      0,
      0,
      0,
      0.6
    ); /* When the menu opens, fade to dark */
  }

  .opacity-layer.fade-out {
    background-color: rgba(0, 0, 0, 0); /* Fade out to transparent */
  }

  .opacity-layer.white-bg {
    background-color: white; /* Turns white when the gallery is visible */
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
    transition: transform 0.3s ease-in-out; /* Only slide, no fading */
    z-index: 2000; /* Ensure it stays on top of opacity layer */
    transform: translateX(-100%); /* Initially off-screen */
  }

  .menu-open {
    transform: translateX(0); /* Slide into view */
  }

  .menu-close {
    transform: translateX(-100%); /* Slide out of view */
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
