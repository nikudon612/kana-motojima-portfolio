<script>
    import { onMount } from "svelte";
    import { fetchProjects } from "../../lib/fetchSanityData"; // Adjust the path accordingly
  
    export let isOpen = false;
    let works = [];
    let currentPhotos = [];
    let galleryVisible = false;
    let selectedWork = null;
  
    async function loadProjects() {
      try {
        works = await fetchProjects();
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  
    function showPhotos(work) {
      currentPhotos = work.photos;
      galleryVisible = true;
      selectedWork = work.title;
    }
  
    $: if (isOpen) {
      loadProjects();
    }
  </script>
  
  <div class="menu {isOpen ? 'open' : ''} {galleryVisible ? 'expanded' : ''}">
    <div class="menu-content">
      {#each works as work}
        <p on:click={() => showPhotos(work)} class:selected={selectedWork === work.title}>{work.title}</p>
      {/each}
    </div>
    
    {#if galleryVisible}
      <div class="photo-gallery">
        {#each currentPhotos as photo, index}
          <img src={photo.url} alt="Project photo" class="gallery-photo photo-{index}" />
        {/each}
      </div>
    {/if}
  </div>
  
  <style>
    .menu {
      position: fixed;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background-color: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
      transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    .menu.open {
      left: 0;
    }
  
    .menu.expanded {
      width: 100%;
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
      z-index: 1001; /* Ensure text is above the images */
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
      z-index: 1000; /* Ensure images are below the text */
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
  