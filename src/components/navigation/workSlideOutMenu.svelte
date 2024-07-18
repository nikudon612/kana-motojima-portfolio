<script>
    import { onMount } from "svelte";
    import { fetchProjects } from "../../lib/fetchSanityData"; // Adjust the path accordingly
  
    export let isOpen = false;
    let works = [];
    let currentPhotos = [];
    let galleryVisible = false;
  
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
    }
  
    $: if (isOpen) {
      loadProjects();
    }
  </script>
  
  <div class="menu {isOpen ? 'open' : ''} {galleryVisible ? 'expanded' : ''}">
    <div class="menu-content">
      {#each works as work}
        <p on:click={() => showPhotos(work)}>{work.title}</p>
      {/each}
    </div>
    
    {#if galleryVisible}
      <div class="photo-gallery">
        {#each currentPhotos as photo}
          <img src={photo.url} alt="Project photo" class="gallery-photo" />
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
    }
  
    .menu-content p {
      margin-bottom: 1em;
      cursor: pointer;
    }
  
    .photo-gallery {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 20px;
      overflow-y: auto;
    }
  
    .gallery-photo {
      width: calc(25% - 20px);
      margin: 10px;
      object-fit: cover;
    }
  </style>
  