<script>
    import { onMount } from 'svelte';
    import { fetchProjects } from '../../lib/fetchSanityData'; // Adjust the path accordingly
  
    export let isOpen = false;
    let works = [];
    let currentPhotos = [];
  
    async function loadProjects() {
      try {
        works = await fetchProjects();
        currentPhotos = works.length > 0 ? works[0].photos : [];
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
  
    function showPhotos(work) {
      currentPhotos = work.photos;
    }
  
    $: if (isOpen) {
      loadProjects();
    }
  </script>
  
  <div class="menu {isOpen ? 'open' : ''}">
    <div class="menu-content">
      {#each works as work}
        <p on:mouseenter={() => showPhotos(work)}>{work.title}</p>
      {/each}
    </div>
  </div>
  
  <div class="photo-gallery">
    <!-- {#each currentPhotos as photo}
      <img src={photo} alt="" class="gallery-photo" />
    {/each} -->
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
      transition: left 0.3s ease-in-out;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .menu.open {
      left: 0;
    }
  
    .menu-content {
      padding: 20px;
      text-align: left;
    }
  
    .menu-content p {
      margin-bottom: 1em;
      cursor: pointer;
    }
  
    .photo-gallery {
      position: fixed;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      background-color: white;
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      overflow-y: auto;
      z-index: 999;
    }
  
    .gallery-photo {
      width: calc(50% - 20px);
      margin: 10px;
      object-fit: cover;
    }
  </style>
  