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
        console.log("Projects loaded:", works); // Debug log
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  
    function showPhotos(work) {
      console.log("Show photos for:", work.title); // Debug log
      if (isTransitioning) return;
      isTransitioning = true;
      selectedWork = work.title;
      currentPhotos = work.photos;
      isWhiteBackground = true;
      galleryVisible = true;
      isTransitioning = false;
    }
  
    function closeGallery() {
      console.log("Closing gallery"); // Debug log
      isClosing = true;
      setTimeout(() => {
        isWhiteBackground = false;
        galleryVisible = false;
        isClosing = false;
        selectedWork = null; // Reset selected work
        currentPhotos = []; // Clear current photos
      }, 600); // Adjust the timeout to match the transition duration
    }
  
    function toggleMenu() {
      isOpen = !isOpen;
      console.log("Menu toggled:", isOpen); // Debug log
      if (isOpen) {
        loadProjects();
      }
    }
  
    $: if (isOpen) {
      loadProjects();
    }
  </script>
  
  <button on:click={toggleMenu}>
    {isOpen ? "Close Menu" : "Open Menu"}
  </button>
  
  <div class={`fixed top-0 left-0 w-full h-full flex transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
    <div class="flex-1 bg-white flex flex-col items-center justify-center z-50 mobile:w-full">
      <div class="p-5 text-left w-full relative ml-12 mobile:ml-0">
        {#each works as work}
          <p
            on:click={(event) => { event.stopPropagation(); showPhotos(work); }}
            class="mb-4 cursor-pointer transition-colors duration-300 ${selectedWork === work.title ? 'text-black font-bold' : 'text-gray-500'}"
          >
            {work.title}
          </p>
        {/each}
      </div>
    </div>
    <div class={`flex-1 transition-colors duration-300 z-40 ${isTransitioning ? 'bg-white' : ''} ${isWhiteBackground ? 'bg-white' : ''} ${isClosing ? 'bg-opacity-0' : ''} mobile:hidden`}>
      <!-- Right side content -->
    </div>
  </div>
  
  {#if galleryVisible}
    <!-- Use MobilePhotoGalleryModal on mobile, and PhotoGalleryModal on larger screens -->
    <div class="hidden mobile:block">
      <MobilePhotoGalleryModal {currentPhotos} projectTitle={selectedWork} close={closeGallery} isClosing={isClosing} />
    </div>
    <div class="block mobile:hidden">
      <PhotoGalleryModal {currentPhotos} projectTitle={selectedWork} close={closeGallery} isClosing={isClosing} />
    </div>
  {/if}
  
  <style>
    @media (min-width: 1024px) {
      .desktop\:ml-12 {
        margin-left: 3rem;
      }
    }
  
    @media (max-width: 640px) {
      .mobile\:w-full {
        width: 100%;
      }
  
      .mobile\:ml-0 {
        margin-left: 0;
      }
  
      .mobile\:hidden {
        display: none;
      }
  
      .mobile\:block {
        display: block;
      }
  
      /* Additional mobile-specific styles */
      .modal-content {
        padding: 1rem;
      }
  
      .gallery-photo {
        max-width: 100%;
      }
    }
  </style>
  