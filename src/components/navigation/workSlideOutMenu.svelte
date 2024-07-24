<script>
  import { onMount } from "svelte";
  import { fetchProjects } from "../../lib/fetchSanityData"; // Adjust the path accordingly
  import PhotoGalleryModal from "../navigation/workPhotoGallery.svelte"; // Import the new modal component
  import MobilePhotoGalleryModal from "../navigation/mobileModalPhotoGallery.svelte"; // Import the new mobile modal component

  export let isOpen = false;
  let works = [];
  let currentPhotos = [];
  let galleryVisible = false;
  let selectedWork = null;
  let isTransitioning = false;
  let isWhiteBackground = false;
  let isClosing = false;

  async function loadProjects() {
    try {
      works = await fetchProjects();
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  function showPhotos(work) {
    if (isTransitioning) return;
    selectedWork = work.title;
    currentPhotos = work.photos;
    galleryVisible = true;
    isWhiteBackground = true;
  }

  function closeMenu() {
    if (galleryVisible || isWhiteBackground) {
      isClosing = true;
      setTimeout(() => {
        isWhiteBackground = false;
        galleryVisible = false;
        isClosing = false;
        isOpen = false;
        selectedWork = null; // Reset selected work
        currentPhotos = []; // Clear current photos
      }, 600); // Adjust the timeout to match the transition duration
    } else {
      isOpen = false;
    }
  }

  $: if (isOpen) {
    loadProjects();
  }

  $: if (!isOpen && (galleryVisible || isWhiteBackground)) {
    closeMenu();
  }
</script>

<div
  class="menu {isOpen ? 'open' : ''} {isOpen && !isClosing
    ? 'menu-open'
    : 'menu-close'}"
>
  <div class="menu-left">
    <div class="menu-content">
      {#each works as work}
        <p
          on:click={() => showPhotos(work)}
          class:selected={selectedWork === work.title}
        >
          {work.title}
        </p>
      {/each}
    </div>
  </div>
  <div
    class="menu-right mobile:hidden {isOpen ? 'fade-in' : ''} {isTransitioning
      ? 'fade-to-white'
      : ''} {isWhiteBackground ? 'white-bg' : ''} {isClosing ? 'fade-out' : ''}"
  >
    <!-- Right side content -->
  </div>
</div>

{#if galleryVisible}
  <!-- Use MobilePhotoGalleryModal on mobile, and PhotoGalleryModal on larger screens -->
  <div class="mobile:block desktop:hidden">
    <MobilePhotoGalleryModal
      {currentPhotos}
      projectTitle={selectedWork}
      close={() => (galleryVisible = false)}
      {isClosing}
    />
  </div>
  <div class="desktop:block mobile:hidden">
    <PhotoGalleryModal
      {currentPhotos}
      projectTitle={selectedWork}
      close={() => (galleryVisible = false)}
      {isClosing}
    />
  </div>
{/if}

<style>
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
    z-index: 1000;
  }

  .menu.menu-open {
    transform: translateX(0);
  }

  .menu.menu-close {
    transform: translateX(-100%);
  }

  .menu-left {
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1002;
    padding-left: 3rem;
  }

  .menu-right {
    flex: 1;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease-in-out;
    z-index: 1001;
  }

  .menu-right.fade-in {
    background-color: rgba(0, 0, 0, 0.6);
    transition-delay: 0.3s;
  }

  .menu-right.fade-to-white {
    background-color: white;
    transition: background-color 0.3s ease-in-out;
  }

  .menu-right.white-bg {
    background-color: white;
  }

  .menu-right.fade-out {
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease-in-out;
  }

  .menu-content {
    text-align: left;
    width: 100%;
    position: relative;
  }

  .menu-content p {
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

  /* Mobile-specific styles */
  @media (max-width: 768px) {
    .menu-left {
      /* padding-left: 1.5rem; */
      padding: 0;
      width: 100%;
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
</style>
