<script>
  import { onMount } from "svelte";
  import { fetchProjects } from "../../lib/fetchSanityData"; // Adjust the path accordingly
  import PhotoGalleryModal from "../navigation/workPhotoGallery.svelte"; // Import the new modal component
  import MobilePhotoGalleryModal from "../navigation/mobileModalPhotoGallery.svelte"; // Import the new mobile modal component

  export let isOpen = false;
  export let toggleMenu;
  export let isFadingOut = false; // New prop for fading out state
  let works = [];
  let currentPhotos = [];
  let galleryVisible = false;
  let selectedWork = null;
  let isWhiteBackground = false;

  async function loadProjects() {
    try {
      works = await fetchProjects();
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  function showPhotos(work) {
    selectedWork = work.title;
    currentPhotos = work.photos;
    galleryVisible = true;
    isWhiteBackground = true;
  }

  function closeMenu() {
    isFadingOut = true; // Trigger fade out
    setTimeout(() => {
      isFadingOut = false;
      isWhiteBackground = false; // Reset background color on close
      galleryVisible = false; // Ensure gallery is closed
      selectedWork = null; // Reset selected work
      currentPhotos = []; // Clear current photos
      isOpen = false; // Close the menu
      toggleMenu();
    }, 300); // Delay to match the fade out transition duration
  }

  $: if (isOpen) {
    loadProjects();
  }
</script>

<div class="menu-container {isOpen ? 'open' : ''}">
  {#if isOpen}
    <div
      class="opacity-layer {isFadingOut ? 'fade-out' : 'fade-in'} {isWhiteBackground ? 'white-bg' : ''}"
      on:click={closeMenu}
    ></div>
  {/if}
  <div class="menu {isOpen ? 'menu-open' : 'menu-close'} {galleryVisible ? 'full-width' : ''}">
    <div class="menu-left">
      <div class="menu-content">
        {#each works as work}
          <p
            class="hover:!text-black/100"
            on:click={() => showPhotos(work)}
            class:selected={selectedWork === work.title}
          >
            {work.title}
          </p>
        {/each}
      </div>
    </div>

    {#if galleryVisible}
      <!-- Use MobilePhotoGalleryModal on mobile, and PhotoGalleryModal on larger screens -->
      <div class="mobile:block desktop:hidden">
        <MobilePhotoGalleryModal
          {currentPhotos}
          projectTitle={selectedWork}
          close={() => {
            galleryVisible = false;
            isWhiteBackground = false; // Reset background color on close
          }}
        />
      </div>
      <div class="desktop:block mobile:hidden">
        <PhotoGalleryModal
          {currentPhotos}
          projectTitle={selectedWork}
          close={() => {
            galleryVisible = false;
            isWhiteBackground = false; // Reset background color on close
          }}
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
    z-index: 1000; /* Set this to ensure it covers the screen but is below the menu */
  }

  .opacity-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.5s ease-in-out; /* Increased duration */
    z-index: 0; /* Ensure this is below the menu */
    cursor: pointer;
  }

  .opacity-layer.fade-in {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .opacity-layer.fade-out {
    background-color: rgba(0, 0, 0, 0);
  }

  .opacity-layer.white-bg {
    background-color: white;
  }

  .menu {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3rem; /* Reverted padding */
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    z-index: 1; /* Ensure this is above the opacity layer */
  }

  .menu.full-width {
    width: 100%;
  }

  .menu-open {
    transform: translateX(0);
  }

  .menu-close {
    transform: translateX(-100%);
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
    .menu {
      width: 100%;
      padding: 0;
    }
    .menu-content {
      padding: 1.5rem; /* Reverted padding */
    }
    .mobile\:hidden {
      display: none;
    }
    .mobile\:block {
      display: block;
    }
  }
</style>
