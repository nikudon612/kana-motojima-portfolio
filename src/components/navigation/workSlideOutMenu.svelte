<script>
  import { onMount } from "svelte";
  import { fetchProjects } from "../../lib/fetchSanityData"; // Adjust the path accordingly

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
      isTransitioning = true;
      selectedWork = work.title;
      setTimeout(() => {
          isWhiteBackground = true;
          isTransitioning = false;
          currentPhotos = work.photos;
          galleryVisible = true;
      }, 300); // Adjust the timeout to match the transition duration
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
          }, 300); // Adjust the timeout to match the transition duration
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

<div class="menu {isOpen ? 'open' : ''} {isOpen && !isClosing ? 'menu-open' : 'menu-close'}">
  <div class="menu-left">
      <div class="menu-content">
          {#each works as work}
              <p on:click={() => showPhotos(work)} class:selected={selectedWork === work.title}>{work.title}</p>
          {/each}
      </div>
  </div>
  <div class="menu-right {isOpen ? 'fade-in' : ''} {isTransitioning ? 'fade-to-white' : ''} {isWhiteBackground ? 'white-bg' : ''} {isClosing ? 'fade-out' : ''}">
      {#if galleryVisible}
          <div class="photo-gallery">
              {#each currentPhotos as photo, index}
                  <img src={photo.url} alt="Project photo" class="gallery-photo photo-{index}" />
              {/each}
          </div>
      {/if}
  </div>
</div>

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
      z-index: 1001;
  }

  .menu-right {
      flex: 1;
      background-color: rgba(0, 0, 0, 0);
      transition: background-color 0.3s ease-in-out;
      z-index: 1000;
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
      padding: 20px;
      text-align: left;
      width: 100%;
      position: relative;
      margin-left: 3rem;
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

  .photo-gallery {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      z-index: 1001; /* Ensure images are above the white background */
      pointer-events: none; /* Allow clicks to pass through to the text */
  }

  .gallery-photo {
      position: absolute;
      object-fit: cover;
      pointer-events: auto; /* Enable interaction with the images */
  }

  /* Example positions for photos */
  .photo-0 { top: 20px; left: calc(50% + 20px); width: 200px; height: 150px; }
  .photo-1 { top: 200px; left: calc(50% + 240px); width: 200px; height: 150px; }
  .photo-2 { top: 400px; left: calc(50% + 20px); width: 200px; height: 150px; }
  .photo-3 { top: 600px; left: calc(50% + 240px); width: 200px; height: 150px; }
  .photo-4 { top: 800px; left: calc(50% + 20px); width: 200px; height: 150px; }
</style>
