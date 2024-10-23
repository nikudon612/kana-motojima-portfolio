<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fetchProjects } from "../../lib/fetchSanityData";
  import PhotoGalleryModal from "../navigation/workPhotoGallery.svelte";
  import MobilePhotoGalleryModal from "../navigation/mobileModalPhotoGallery.svelte";
  import SlideshowModal from "./slideshow.svelte";

  export let isWorkOpen = false;
  export let isClosing = false;

  const dispatch = createEventDispatcher();

  let works = [];
  let selectedWork = null;
  let currentPhotos = [];
  let galleryVisible = false;
  let slideshowVisible = false;
  let initialPhotoIndex = 0;

  onMount(async () => {
    await loadProjects();
  });

  async function loadProjects() {
    try {
      works = await fetchProjects();
      console.log("Projects loaded:", works);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // Show the first image in the slideshow when the project title is clicked
  function showPhotos(work) {
    if (work.photos && work.photos.length > 0) {
      selectedWork = work.title;
      currentPhotos = work.photos;
      initialPhotoIndex = 0; // Start from the first photo
      slideshowVisible = true; // Show the slideshow
    }
  }

  // Close the slideshow modal
  function closeSlideshowModal() {
    slideshowVisible = false;
  }
</script>

<!-- Menu Wrapper -->
<div
  class={`menu-content ${isWorkOpen ? (isClosing ? "slide-out" : "slide-in") : ""}`}
  style="z-index: {isWorkOpen || isClosing
    ? 2000
    : 0}; pointer-events: {isWorkOpen || isClosing ? 'auto' : 'none'};"
  on:click|stopPropagation
>
  <!-- Menu Content -->
  <div class="menu">
    <div class="menu-left">
      <div class={`menu-content-list ${isWorkOpen ? "menu-open" : ""}`}>
        {#each works as work, index (work._id || index)}
          <p
            class="work-title hover:text-black"
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

<!-- Slideshow Modal -->
{#if slideshowVisible}
  <div class="slideshow-modal">
    <SlideshowModal
      slideshowImages={currentPhotos}
      projectTitle={selectedWork}
      currentIndex={initialPhotoIndex}
      on:close={closeSlideshowModal}
    />
  </div>
{/if}

<style>
  .menu {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3rem;
  }

  .menu-content {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: white;
    transform: translateX(-100%);
    transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .slide-in {
    transform: translateX(0);
  }

  .slide-out {
    transform: translateX(-100%);
  }

  .menu-content-list {
    padding: 2rem;
  }

  .work-title {
    font-size: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    opacity: 0;
    transform: translate(50%, 0%);
    transition:
      opacity 1s cubic-bezier(0.25, 1, 0.5, 1),
      transform 1s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .menu-open .work-title {
    opacity: 1;
    transform: translate(0%, 0%);
  }

  .hover\:text-black:hover {
    color: black;
  }

  .slideshow-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3000;
    pointer-events: auto;
  }
</style>
